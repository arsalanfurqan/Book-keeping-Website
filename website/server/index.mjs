import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "./app.mjs";

export { createServer } from "./app.mjs";
export { validate } from "./validation/enquiry.mjs";

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const port = Number(process.env.PORT || 3001),
    host = process.env.HOST || "127.0.0.1";
  createServer().listen(port, host, () =>
    console.log(`Node backend: http://${host}:${port}`),
  );
}
