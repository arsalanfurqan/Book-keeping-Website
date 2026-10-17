import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";
import { root } from "../server/config.mjs";

function keyBytes(key) {
  if (!/^[a-f\d]{64}$/i.test(key || ""))
    throw new Error(
      "BACKUP_KEY must contain 64 hex characters. Keep it separately from backups.",
    );
  return Buffer.from(key, "hex");
}
export async function backup(source, destination, key) {
  const bytes = await readFile(source);
  if (!Array.isArray(JSON.parse(bytes.toString("utf8"))))
    throw new Error("Invalid enquiry store.");
  const iv = randomBytes(12),
    cipher = createCipheriv("aes-256-gcm", keyBytes(key), iv);
  const ciphertext = Buffer.concat([cipher.update(bytes), cipher.final()]);
  const envelope = {
    version: 1,
    iv: iv.toString("hex"),
    tag: cipher.getAuthTag().toString("hex"),
    data: ciphertext.toString("base64"),
  };
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, JSON.stringify(envelope), {
    flag: "wx",
    mode: 0o600,
  });
}
export async function restore(source, destination, key) {
  const envelope = JSON.parse(await readFile(source, "utf8"));
  if (envelope.version !== 1) throw new Error("Unsupported backup format.");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    keyBytes(key),
    Buffer.from(envelope.iv, "hex"),
  );
  decipher.setAuthTag(Buffer.from(envelope.tag, "hex"));
  const bytes = Buffer.concat([
    decipher.update(Buffer.from(envelope.data, "base64")),
    decipher.final(),
  ]);
  if (!Array.isArray(JSON.parse(bytes.toString("utf8"))))
    throw new Error("Invalid backup data.");
  await mkdir(dirname(destination), { recursive: true });
  // Never overwrite the active enquiry store, even when called by mistake.
  await writeFile(destination, bytes, { flag: "wx", mode: 0o600 });
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const [command, ...args] = process.argv.slice(2);
    if (command === "restore") {
      if (args.length !== 2)
        throw new Error(
          "Usage: npm run backup:restore -- backup.json new-output.json",
        );
      await restore(resolve(args[0]), resolve(args[1]), process.env.BACKUP_KEY);
      console.log(
        "Backup restored to a new file. Existing records were not overwritten.",
      );
    } else {
      const destination = resolve(
        process.env.BACKUP_DIR || resolve(root, "backups"),
        `enquiries-${new Date().toISOString().replace(/[:.]/g, "-")}-${randomBytes(3).toString("hex")}.json`,
      );
      await backup(
        resolve(
          process.env.DATA_DIR || resolve(root, "data"),
          "enquiries.json",
        ),
        destination,
        process.env.BACKUP_KEY,
      );
      console.log(`Encrypted backup created: ${destination}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
