import { mkdir, readFile, writeFile } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
await mkdir("public/fonts", { recursive: true });
const pictures = [
  { id: 180, file: "workspace.jpg", title: "Laptop and notebook" },
  { id: 1060, file: "commerce.jpg", title: "Coffee preparation" },
  { id: 0, file: "studio.jpg", title: "Laptop workspace" },
  { id: 48, file: "team.jpg", title: "Workspace detail" },
];
const existingCredits = await readFile("public/images/credits.json", "utf8")
  .then(JSON.parse)
  .catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
const credits = existingCredits.filter(
  (credit) => !pictures.some((picture) => picture.file === credit.file),
);
for (const p of pictures) {
  const info = await fetch(`https://picsum.photos/id/${p.id}/info`, {
    signal: AbortSignal.timeout(30000),
  });
  if (!info.ok) throw Error("Photo metadata unavailable");
  const data = await info.json();
  const response = await fetch(`https://picsum.photos/id/${p.id}/900/700`, {
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw Error("Photo unavailable");
  await writeFile(
    "public/images/" + p.file,
    Buffer.from(await response.arrayBuffer()),
  );
  credits.push({
    ...p,
    author: data.author,
    url: data.url,
    license: "Unsplash License",
  });
  console.log("Saved " + p.file);
}
await writeFile("public/images/credits.json", JSON.stringify(credits, null, 2));
for (const [family, file] of [
  ["Manrope:wght@200..800", "manrope"],
  ["Inter:wght@100..900", "inter"],
]) {
  const response = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36" } },
  );
  if (!response.ok) throw Error("Font stylesheet unavailable");
  const css = await response.text();
  const url = [...css.matchAll(/url\((https:\/\/[^)]+)\)/g)].at(-1)?.[1];
  if (!url) throw Error("Font URL unavailable");
  const font = await fetch(url);
  if (!font.ok) throw Error("Font unavailable");
  await writeFile(
    `public/fonts/${file}.woff2`,
    Buffer.from(await font.arrayBuffer()),
  );
  console.log("Saved " + file);
}
