import {
  Browser,
  sleep,
} from "../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";
import { createServer } from "../server/app.mjs";
import { mkdir } from "node:fs/promises";
import assert from "node:assert/strict";

await mkdir(".qa", { recursive: true });
const server = createServer();
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const browser = await Browser.launch();
try {
  const page = await browser.newPage({ width: 1440, height: 1000 });
  const waitForSlide = async (index) => {
    const deadline = Date.now() + 8000;
    while (Date.now() < deadline) {
      const settled = await page.eval((index) => {
        const track = document.querySelector(".reviews-grid");
        return (
          document.querySelector(".reviews-count").textContent ===
            `${index + 1} / 3` &&
          Math.abs(track.scrollLeft - index * (track.clientWidth + 24)) < 2
        );
      }, index);
      if (settled) return;
      await sleep(100);
    }
    assert.fail(`Slider did not settle on slide ${index + 1}`);
  };
  for (const width of [1440, 820, 390, 320]) {
    await page.setViewport({ width, height: 1000 });
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.eval(async () => { document.querySelector('.franchise-section').scrollIntoView({ behavior: 'instant' }); await document.querySelector('.franchise-photo img').decode(); });
    await page.eval(() =>
      document
        .querySelector(".reviews-section")
        .scrollIntoView({ behavior: "instant" }),
    );
    await sleep(300);
    await page.eval(() =>
      document.querySelector('[aria-label="Next service highlight"]').click(),
    );
    await waitForSlide(1);
    assert.equal(
      await page.eval(
        () => document.querySelector(".reviews-count").textContent,
      ),
      "2 / 3",
    );
    await page.eval(() =>
      document.querySelector('[aria-label="Show service highlight 3"]').click(),
    );
    await waitForSlide(2);
    const info = await page.eval(async () => {
      await document.querySelector(".franchise-photo img").decode();
      const track = document.querySelector(".reviews-grid");
      return {
        height: track.getBoundingClientRect().height,
        cardHeight: track.children[2].getBoundingClientRect().height,
        count: document.querySelector(".reviews-count").textContent,
        overflow: document.documentElement.scrollWidth > innerWidth,
        hidden: document.querySelectorAll('.review-card[aria-hidden="true"]')
          .length,
        disabled: document.querySelector(
          '[aria-label="Next service highlight"]',
        ).disabled,
        minTarget: Math.min(
          ...[...document.querySelectorAll(".reviews-controls button")].map(
            (b) => b.getBoundingClientRect().width,
          ),
        ),
      };
    });
    assert.equal(info.count, "3 / 3");
    assert.equal(info.overflow, false);
    assert.equal(info.hidden, 2);
    assert.equal(info.disabled, true);
    assert.ok(info.minTarget >= 44);
    assert.ok(Math.abs(info.height - info.cardHeight) < 2);

    await page.eval(() => document.querySelector('.franchise-section').scrollIntoView({ behavior: 'instant' }));
    const feature = await page.eval(() => {
      const section = document.querySelector('.franchise-section');
      return { outside: !section.closest('.reviews-grid'), names: section.textContent.includes('Sarah Crow') && section.textContent.includes('Won Lee'), image: section.querySelector('img').naturalWidth, overflow: document.documentElement.scrollWidth > innerWidth };
    });
    assert.equal(feature.outside, true);
    assert.equal(feature.names, true);
    assert.equal(feature.image, 468);
    assert.equal(feature.overflow, false);
    await page.screenshot({ path: `.qa/final-franchise-${width}.jpg` });
    await page.eval(() => document.querySelector('.reviews-section').scrollIntoView({ behavior: 'instant' }));
    await page.eval(() =>
      document.querySelector(".reviews-grid").focus({ preventScroll: true }),
    );
    await page.send("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Home",
      code: "Home",
      windowsVirtualKeyCode: 36,
    });
    await page.send("Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "Home",
      code: "Home",
      windowsVirtualKeyCode: 36,
    });
    await waitForSlide(0);
    assert.equal(
      await page.eval(
        () => document.querySelector(".reviews-count").textContent,
      ),
      "1 / 3",
    );
    await page.screenshot({ path: `.qa/final-slider-${width}.jpg` });
    console.log(
      `Slider passed at ${width}px: controls, keyboard, height, photo and overflow.`,
    );
  }
  await page.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await page.eval(() =>
    document.querySelector('[aria-label="Show service highlight 3"]').click(),
  );
  await sleep(150);
  assert.equal(
    await page.eval(() => document.querySelector(".reviews-count").textContent),
    "3 / 3",
  );
  await page.setViewport({ width: 1440, height: 1000 });
  await sleep(300);
  assert.equal(
    await page.eval(() => document.querySelector(".reviews-count").textContent),
    "3 / 3",
  );
  assert.deepEqual(page.consoleErrors, []);
  console.log(
    "Reduced motion, resize alignment and browser console checks passed.",
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
