import { writeFile } from "node:fs/promises";
for (const [name, url] of [
  [
    "manrope",
    "https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf",
  ],
  [
    "inter",
    "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf",
  ],
]) {
  const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw Error(`Font request failed: ${r.status}`);
  await writeFile(
    `public/fonts/${name}.ttf`,
    Buffer.from(await r.arrayBuffer()),
  );
  const license = await fetch(
    `https://raw.githubusercontent.com/google/fonts/main/ofl/${name}/OFL.txt`,
  );
  if (!license.ok) throw Error("Font license unavailable");
  await writeFile(`public/fonts/${name}-OFL.txt`, await license.text());
  console.log(`Saved variable ${name} and license`);
}
