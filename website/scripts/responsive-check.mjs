import {
  Browser,
  sleep,
} from "../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";
import { createServer } from "../server/app.mjs";
import { mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
await mkdir(".qa", { recursive: true });
const server = createServer({ notifier: { configured: false } });
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await Browser.launch();
try {
  const page = await browser.newPage({ width: 1440, height: 900 });
  await page.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  for (const width of [
    320, 390, 521, 600, 768, 820, 1000, 1024, 1440, 1920, 2560,
  ]) {
    await page.setViewport({ width, height: 900 });
    for (const path of [
      "/",
      "/services",
      "/services/accounts-payable-receivable",
      "/industries",
      "/about",
      "/contact",
      "/book-consultation?service=payroll",
    ]) {
      await page.goto(origin + path, { settleMs: 100 });
      const result = await page.eval(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        heading: document.querySelector("h1")?.textContent,
      }));
      assert.equal(result.overflow, false, `${path} overflows at ${width}px`);
      assert.ok(result.heading);
    }
    console.log(`Responsive routes passed at ${width}px`);
  }
  await page.setViewport({ width: 820, height: 500 });
  await page.goto(origin);
  await page.eval(() => document.querySelector(".menu-toggle").click());
  assert.equal(
    await page.eval(
      () =>
        document.querySelector("nav").getBoundingClientRect().bottom <=
        innerHeight,
    ),
    true,
  );
  await page.eval(() =>
    document
      .querySelector(".hero h1")
      .dispatchEvent(new PointerEvent("pointerdown", { bubbles: true })),
  );
  assert.equal(
    await page.eval(() =>
      document.querySelector(".menu-toggle").getAttribute("aria-expanded"),
    ),
    "false",
  );
  await page.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
  });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(origin);
  await page.eval(() =>
    document
      .querySelector(".service-grid")
      .scrollIntoView({ behavior: "instant" }),
  );
  await sleep(180);
  assert.equal(
    await page.eval(
      () =>
        getComputedStyle(document.querySelector(".service-card")).animationName,
    ),
    "rise",
  );
  await page.eval(() => document.querySelector(".faq-item button").click());
  await sleep(350);
  assert.ok(
    await page.eval(
      () =>
        document.querySelector(".faq-answer.is-open").getBoundingClientRect()
          .height > 20,
    ),
  );
  await page.eval(() => document.querySelector(".faq-item button").click());
  await sleep(350);
  assert.equal(
    await page.eval(
      () =>
        document.querySelector(".faq-answer").getBoundingClientRect().height,
    ),
    0,
  );
  await page.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  assert.equal(
    await page.eval(
      () =>
        getComputedStyle(document.querySelector(".service-card")).animationName,
    ),
    "none",
  );
  for (const width of [390, 820, 1440]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(origin);
    await page.eval(async () => {
      const photos = [...document.querySelectorAll("img")];
      photos.forEach((img) => {
        img.loading = "eager";
      });
      await Promise.all(photos.map((img) => img.decode()));
      if (!photos.every((img) => img.naturalWidth > 0))
        throw new Error("A photograph did not load");
    });
    await page.screenshot({ path: `.qa/responsive-home-${width}.jpg` });
    await page.goto(origin + "/contact");
    await page.screenshot({ path: `.qa/responsive-contact-${width}.jpg` });
  }
  assert.deepEqual(page.consoleErrors, []);
  console.log(
    "Passed 77 responsive route checks, landscape menu, accordion motion and reduced-motion behavior.",
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
