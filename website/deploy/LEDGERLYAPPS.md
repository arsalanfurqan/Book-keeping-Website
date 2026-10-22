# Ledgerlyapps setup

Company details are centralized in `shared/content.mjs`. The slogan is CPA Firm.

## Contact form

The Node backend validates and saves enquiries in the private data directory. It does not email anyone until SMTP is configured. Set SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS, SMTP_FROM and ENQUIRY_TO in the hosting environment. Keep passwords out of Git and chat.

ENQUIRY_TO supports a single email or both inboxes separated by a comma: `Shayan@ledgerlyapps.com,Michael.Startin@ledgerlyapps.com`. Notifications contain the reference and selected service; full enquiries remain in the private server store. Choose recipients before enabling delivery. This is a consultation request, not an automatic calendar booking.

## Tawk.to

In Tawk.to Administration > Channels > Chat Widget, copy the Property ID and Widget ID into `shared/chat.mjs`. These identifiers are public. Rebuild the frontend and restart Node together. No chat script or visitor tracking loads while IDs are blank. Conditional server CSP and privacy disclosure are included; verify the real widget and notifications once connected.

Tawk.to's basic live chat is free. Visitor monitoring is visible in its dashboard; browser/mobile notification permissions and operator settings affect alerts. Visitors are not automatically identified by name or email. Ad blockers or blocked scripts can prevent monitoring. Optional paid add-ons are separate.

## Preview and production

Run `npm run build` then `npm start` for the full website and form API. A temporary tunnel can share the local server for review; the link stops when the computer/server/tunnel stops. It is not permanent hosting.

Before the Hostinger release, confirm Node.js hosting support, domain, mail configuration, persistent data storage, backup settings and final legal wording. Follow `deploy/README.md`; set the canonical URL and launchReady only when ready.
