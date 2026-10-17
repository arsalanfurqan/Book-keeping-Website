import {
  Browser,
  sleep,
} from "../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";
import { createServer } from "../server/index.mjs";
import { mkdtemp, readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
import { services } from "../shared/content.mjs";
await mkdir(".qa", { recursive: true });
const dataDir = await mkdtemp(resolve(".qa", "browser-data-"));
const server = createServer({ dataDir, rateLimit: 100 });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await Browser.launch();
const results = [];
try {
  const page = await browser.newPage({ width: 1440, height: 900 });
  for (const path of [
    "/",
    "/services",
    ...services.map((s) => "/services/" + s.slug),
    "/industries",
    "/about",
    "/contact",
    "/book-consultation",
    "/privacy-policy",
    "/terms",
    "/credits",
    "/missing",
  ]) {
    await page.goto(origin + path, { settleMs: 120 });
    const info = await page.eval(() => ({
      h1: document.querySelector("h1")?.textContent,
      overflow: document.documentElement.scrollWidth > innerWidth,
      title: document.title,
    }));
    assert.ok(info.h1, `${path} has no heading`);
    assert.equal(info.overflow, false, `${path} desktop overflow`);
    results.push({ path, ...info });
  }
  for (const width of [320, 390, 768]) {
    await page.setViewport({ width, height: 844 });
    for (const path of [
      "/",
      "/services",
      "/services/accounts-payable-receivable",
      "/services/budgeting-forecasting",
      "/about",
      "/industries",
      "/contact",
    ]) {
      await page.goto(origin + path, { settleMs: 120 });
      assert.equal(
        await page.eval(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${path} overflow at ${width}`,
      );
    }
  }
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(origin);
  await page.eval(() => document.querySelector(".menu-toggle").click());
  assert.equal(
    await page.eval(() =>
      document.querySelector(".menu-toggle").getAttribute("aria-expanded"),
    ),
    "true",
  );
  await page.send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  assert.equal(
    await page.eval(() =>
      document.querySelector(".menu-toggle").getAttribute("aria-expanded"),
    ),
    "false",
  );
  await page.eval(() =>
    document.querySelectorAll(".need-options button")[1].click(),
  );
  assert.ok(
    await page.eval(() =>
      document
        .querySelector(".need-result .button")
        .getAttribute("href")
        .includes("payroll"),
    ),
  );
  await page.eval(() => document.querySelector(".faq-item button").click());
  assert.equal(
    await page.eval(() =>
      document.querySelector(".faq-item button").getAttribute("aria-expanded"),
    ),
    "true",
  );
  await page.goto(origin + "/book-consultation?service=payroll");
  assert.equal(
    await page.eval(() => document.querySelector("#service").value),
    "payroll",
  );
  assert.ok(
    await page.eval(() => !!document.querySelector("#employeeCountRange")),
  );
  assert.equal(
    await page.eval(() => document.querySelector("form").checkValidity()),
    false,
  );
  await page.eval(() => {
    for (const [name, value] of Object.entries({
      name: "Browser QA",
      email: "qa@example.test",
      message: "Please discuss monthly payroll support.",
    })) {
      const el = document.getElementById(name),
        proto =
          el.tagName === "TEXTAREA"
            ? HTMLTextAreaElement.prototype
            : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }
    document.querySelector("[name=consent]").click();
  });
  await sleep(100);
  await page.screenshot({ path: ".qa/contact-mobile.jpg", fullPage: true });
  await page.eval(() => document.querySelector("form").requestSubmit());
  for (let i = 0; i < 30; i++) {
    if (await page.eval(() => location.pathname === "/thank-you")) break;
    await sleep(100);
  }
  assert.equal(await page.eval(() => location.pathname), "/thank-you");
  assert.match(
    await page.eval(() => document.querySelector(".reference").textContent),
    /ENQ-/,
  );
  const leads = JSON.parse(
    await readFile(resolve(dataDir, "enquiries.json"), "utf8"),
  );
  assert.equal(leads.length, 1);
  assert.equal(leads[0].service, "payroll");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(origin + "/contact");
  await page.screenshot({ path: ".qa/contact-desktop.jpg", fullPage: true });
  assert.deepEqual(page.consoleErrors, []);
  await writeFile(
    ".qa/browser-results.json",
    JSON.stringify(
      {
        passed: true,
        routes: results,
        checks: [
          "desktop routes",
          "320/390/768 responsive overflow",
          "mobile menu and Escape",
          "service selector",
          "FAQ expansion",
          "payroll preselection",
          "native validation",
          "successful form submission and disk persistence",
          "no JS exceptions",
        ],
      },
      null,
      2,
    ),
  );
  console.log(
    "Browser checks passed: 22 routes, responsive layouts, menu, service finder, FAQ and actual enquiry submission.",
  );
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
