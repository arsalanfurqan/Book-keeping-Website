import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
export function createEnquiryStore(dataDir) {
  let queue = Promise.resolve();
  async function readLeads() {
    try {
      return JSON.parse(
        await readFile(resolve(dataDir, "enquiries.json"), "utf8"),
      );
    } catch (e) {
      if (e.code === "ENOENT") return [];
      throw e;
    }
  }
  function exclusive(fn) {
    const next = queue.then(fn);
    queue = next.catch(() => {});
    return next;
  }
  async function save(leads) {
    await mkdir(dataDir, { recursive: true });
    const target = resolve(dataDir, "enquiries.json"),
      temp = target + "." + randomUUID() + ".tmp";
    await writeFile(temp, JSON.stringify(leads, null, 2), { mode: 0o600 });
    await rename(temp, target);
  }

  return { readLeads, exclusive, save };
}
