import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { root } from "../config.mjs";
import { json } from "./json.mjs";
import { addMetadata } from "./seo.mjs";
export async function serveStatic(req, res, url) {
  if (!["GET", "HEAD"].includes(req.method))
    return json(res, 405, { error: "Method not allowed." });
  const dist = resolve(root, "dist");
  let file = resolve(dist, "." + decodeURIComponent(url.pathname));
  if (file !== dist && !file.startsWith(dist + sep))
    return json(res, 403, { error: "Forbidden." });
  try {
    if (!(await stat(file)).isFile()) file = resolve(dist, "index.html");
  } catch {
    if (extname(file)) return json(res, 404, { error: "File not found." });
    file = resolve(dist, "index.html");
  }
  let bytes = await readFile(file);
  let status = 200;
  if (extname(file) === ".html") {
    const page = addMetadata(bytes.toString("utf8"), url.pathname);
    bytes = page.html;
    status = page.status;
  }
  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".txt": "text/plain",
    ".json": "application/json",
  };
  res.writeHead(status, {
    "Content-Type": types[extname(file)] || "application/octet-stream",
    "Cache-Control": file.includes(`${sep}assets${sep}`)
      ? "public,max-age=31536000,immutable"
      : "no-cache",
  });
  res.end(req.method === "HEAD" ? undefined : bytes);
}
