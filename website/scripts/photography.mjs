import { readFile, writeFile } from "node:fs/promises";
const photos = [
  {
    id: 3184292,
    file: "advisory.jpg",
    title: "People discussing graphs and reports",
    author: "fauxels",
    url: "https://www.pexels.com/photo/people-discuss-about-graphs-and-rates-3184292/",
  },
  {
    id: 8296970,
    file: "bookkeeping.jpg",
    title: "A person examining documents",
    author: "Mikhail Nilov",
    url: "https://www.pexels.com/photo/a-person-examining-documents-8296970/",
  },
  {
    id: 8297220,
    file: "accounting-detail.jpg",
    title: "Working on documents using a calculator",
    author: "Mikhail Nilov",
    url: "https://www.pexels.com/photo/a-person-working-on-the-documents-using-a-calculator-8297220/",
  },
];
const credits = JSON.parse(
  await readFile("public/images/credits.json", "utf8"),
);
for (const photo of photos) {
  const response = await fetch(
    `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=1400`,
    { signal: AbortSignal.timeout(30000) },
  );
  if (
    !response.ok ||
    !response.headers.get("content-type")?.startsWith("image/")
  )
    throw new Error(`Could not download ${photo.file}`);
  await writeFile(
    `public/images/${photo.file}`,
    Buffer.from(await response.arrayBuffer()),
  );
  const record = {
    ...photo,
    provider: "Pexels",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
  };
  const index = credits.findIndex((item) => item.file === photo.file);
  if (index >= 0) credits[index] = record;
  else credits.push(record);
  console.log(`Saved ${photo.file}`);
}
await writeFile("public/images/credits.json", JSON.stringify(credits, null, 2));
