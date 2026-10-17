import "../server/config.mjs";
import { brand } from "../shared/content.mjs";
import { siteOrigin } from "../shared/seo.mjs";
import { smtpConfiguration } from "../server/services/notifications.mjs";
const missing = [];
if (!brand.name || brand.name === "Clearstead")
  missing.push("Replace temporary company name in shared/content.mjs.");
if (!brand.email) missing.push("Add the public business email.");
if (!brand.region) missing.push("Add the business location/service region.");
if (!siteOrigin()) missing.push("Set siteUrl to the real HTTPS domain.");
if (!brand.launchReady)
  missing.push(
    "Finalize legal content and company details, then enable launchReady.",
  );
try {
  if (!smtpConfiguration())
    missing.push("Configure SMTP email notification credentials.");
} catch (error) {
  missing.push(error.message);
}
if (!/^[a-f\d]{64}$/i.test(process.env.BACKUP_KEY || ""))
  missing.push("Set BACKUP_KEY and arrange scheduled off-server backups.");
for (const item of missing) console.log(`PENDING: ${item}`);
console.log(
  missing.length
    ? `${missing.length} launch configuration items remain.`
    : "Configuration checks passed. Verify DNS, HTTPS, email delivery and backup schedule on the actual host.",
);
process.exitCode = missing.length ? 1 : 0;
