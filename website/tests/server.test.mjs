import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { createServer, validate } from "../server/index.mjs";
const valid = () => ({
  name: "Test Visitor",
  email: "visitor@example.test",
  service: "payroll",
  message: "Please discuss monthly payroll support.",
  employeeCountRange: "11-50",
  payFrequency: "monthly",
  consent: true,
  requestId: randomUUID(),
});
test("validates fields, consent, allowlists and unexpected sensitive data", () => {
  assert.equal(Object.keys(validate(valid()).errors).length, 0);
  for (const patch of [
    { email: "invalid" },
    { consent: false },
    { service: "fake" },
    { payFrequency: "daily" },
    { salary: 100 },
    { name: "x".repeat(101) },
    { website: "spam.test" },
  ])
    assert.ok(Object.keys(validate({ ...valid(), ...patch }).errors).length);
});
test("saves once, survives restart, isolates private data and rejects cross-origin requests", async () => {
  const dir = await mkdtemp(join(tmpdir(), "clearstead-test-"));
  let server = createServer({ dataDir: dir, rateLimit: 50 });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let origin = `http://127.0.0.1:${server.address().port}`;
  const post = (data, headers = {}) =>
    fetch(origin + "/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(data),
    });
  try {
    assert.equal((await post({ ...valid(), email: "bad" })).status, 422);
    assert.equal(
      (await post(valid(), { Origin: "https://other.example" })).status,
      403,
    );
    const data = valid();
    const responses = await Promise.all([post(data), post(data)]);
    assert.deepEqual(responses.map((r) => r.status).sort(), [200, 201]);
    const a = await responses[0].json(),
      b = await responses[1].json();
    assert.equal(a.reference, b.reference);
    assert.equal(
      JSON.parse(await readFile(join(dir, "enquiries.json"), "utf8")).length,
      1,
    );
    assert.equal((await fetch(origin + "/api/leads")).status, 404);
    assert.equal((await fetch(origin + "/data/enquiries.json")).status, 404);
    await new Promise((r) => server.close(r));
    server = createServer({ dataDir: dir });
    await new Promise((r) => server.listen(0, "127.0.0.1", r));
    origin = `http://127.0.0.1:${server.address().port}`;
    assert.equal((await post(data)).status, 200);
    await writeFile(join(dir, "enquiries.json"), "invalid");
    assert.equal(
      (await post({ ...valid(), message: "A different valid message." }))
        .status,
      503,
    );
  } finally {
    await new Promise((r) => server.close(r));
    await rm(dir, { recursive: true, force: true });
  }
});
test("rate limits repeated submissions", async () => {
  const dir = await mkdtemp(join(tmpdir(), "clearstead-rate-"));
  const server = createServer({ dataDir: dir, rateLimit: 1 });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  try {
    const url = `http://127.0.0.1:${server.address().port}/api/leads`;
    const send = () =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valid()),
      });
    assert.equal((await send()).status, 201);
    assert.equal((await send()).status, 429);
  } finally {
    await new Promise((r) => server.close(r));
    await rm(dir, { recursive: true, force: true });
  }
});
