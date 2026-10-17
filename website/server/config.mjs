import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
export const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
try {
  process.loadEnvFile(resolve(root, ".env"));
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}
