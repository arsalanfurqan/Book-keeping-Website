import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import {
  createNotifier,
  smtpConfiguration,
} from "../server/services/notifications.mjs";
import { createServer } from "../server/app.mjs";
import { addMetadata, serveSeo } from "../server/http/seo.mjs";
import { pageMetadata, sitemapPaths } from "../shared/seo.mjs";
import { backup, restore } from "../scripts/backup.mjs";

test("SEO serves escaped route metadata, valid sitemap and launch gating", () => {
  const config = {
    name: "Books & Co",
    siteUrl: "https://books.example",
    launchReady: true,
  };
  const page = addMetadata(
    '<head><title>Old</title><meta name="description" content="old"></head>',
    "/services/payroll",
    config,
  );
  assert.match(page.html, /<title>Payroll support \| Books &amp; Co<\/title>/);
  assert.match(page.html, /https:\/\/books.example\/services\/payroll/);
  assert.equal(page.status, 200);
  assert.equal(pageMetadata("/missing", config).status, 404);
  assert.equal(pageMetadata("/thank-you", config).indexable, false);
  assert.equal(
    pageMetadata("/", { ...config, launchReady: false }).indexable,
    false,
  );
  assert.ok(!sitemapPaths().includes("/thank-you"));
  const response = {
    writeHead(code, headers) {
      this.code = code;
      this.headers = headers;
    },
    end(body) {
      this.body = body;
    },
  };
  serveSeo({ method: "GET" }, response, "/sitemap.xml", config);
  assert.equal(response.code, 200);
  assert.match(response.body, /<urlset/);
  serveSeo({ method: "GET" }, response, "/robots.txt", {
    ...config,
    launchReady: false,
  });
  assert.match(response.body, /Disallow: \//);
});

test("email notification uses TLS, minimizes personal data and reports delivery failures", async () => {
  const env = {
    SMTP_HOST: "smtp.example",
    SMTP_USER: "user",
    SMTP_PASS: "test-only",
    SMTP_FROM: "from@example.test",
    ENQUIRY_TO: "inbox@example.test",
  };
  assert.equal(smtpConfiguration(env).requireTLS, true);
  assert.throws(() => smtpConfiguration({ SMTP_HOST: "smtp.example" }));
  let sent;
  const notifier = createNotifier({
    env,
    transport: {
      async sendMail(message) {
        sent = message;
        return { accepted: ["inbox@example.test"] };
      },
    },
  });
  assert.deepEqual(
    await notifier.send({
      id: "ENQ-123",
      service: "payroll",
      email: "private@example.test",
      message: "private details",
    }),
    { email: "delivered" },
  );
  assert.equal(sent.to, env.ENQUIRY_TO);
  assert.ok(!JSON.stringify(sent).includes("private@example.test"));
  assert.ok(!JSON.stringify(sent).includes("private details"));
  const failed = createNotifier({
    env,
    transport: {
      async sendMail() {
        throw new Error("offline");
      },
    },
  });
  assert.deepEqual(await failed.send({ id: "ENQ-123", service: "payroll" }), {
    email: "failed",
  });
});

test("notification failure preserves successful submission and duplicate does not resend", async () => {
  const dir = await mkdtemp(join(tmpdir(), "launch-notification-"));
  let calls = 0;
  const server = createServer({
    dataDir: dir,
    notifier: {
      configured: true,
      async send() {
        calls++;
        return { email: "failed" };
      },
    },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const url = `http://127.0.0.1:${server.address().port}`;
    const data = {
      name: "Test",
      email: "test@example.test",
      service: "payroll",
      message: "Please discuss payroll support.",
      consent: true,
      requestId: randomUUID(),
    };
    const post = () =>
      fetch(url + "/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    assert.equal((await post()).status, 201);
    assert.equal((await post()).status, 200);
    assert.equal(calls, 1);
    const saved = JSON.parse(
      await readFile(join(dir, "enquiries.json"), "utf8"),
    );
    assert.equal(saved.length, 1);
    assert.equal(saved[0].notification, "failed");
    assert.equal((await fetch(url + "/missing")).status, 404);
    assert.match(
      await (await fetch(url + "/services/payroll")).text(),
      /<title>Payroll support/,
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await rm(dir, { recursive: true, force: true });
  }
});

test("encrypted backups restore exactly and reject tampering and overwrites", async () => {
  const dir = await mkdtemp(join(tmpdir(), "backup-test-")),
    key = "ab".repeat(32);
  try {
    const source = join(dir, "source.json"),
      archive = join(dir, "backup.json"),
      output = join(dir, "restored.json");
    await writeFile(
      source,
      JSON.stringify([{ id: "ENQ-test", email: "private@example.test" }]),
    );
    await backup(source, archive, key);
    assert.ok(
      !(await readFile(archive, "utf8")).includes("private@example.test"),
    );
    await restore(archive, output, key);
    assert.equal(
      await readFile(output, "utf8"),
      await readFile(source, "utf8"),
    );
    await assert.rejects(() => restore(archive, output, key), {
      code: "EEXIST",
    });
    await assert.rejects(() =>
      restore(archive, join(dir, "wrong-key.json"), "cd".repeat(32)),
    );
    const envelope = JSON.parse(await readFile(archive, "utf8"));
    envelope.tag = "00".repeat(16);
    await writeFile(archive, JSON.stringify(envelope));
    await assert.rejects(() =>
      restore(archive, join(dir, "tampered.json"), key),
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
