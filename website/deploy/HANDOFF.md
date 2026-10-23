# Ledgerlyapps handoff — 23 October 2026

## Completed locally

- React frontend and Node backend; Ledgerlyapps logo, CPA Firm branding, phone, emails and office address.
- Service pages, consultation form, mobile navigation, FAQ and service finder.
- Franchise storefront image and caption; Sarah Crow / The UPS Store #2041 / Missouri and Won Lee / The UPS Store #0180 / California details supplied by the client. No invented testimonials, ratings or customer portraits.
- Slider with swipe, arrow/dot controls, Home/End/arrow-key navigation, active-slide height, screen-reader state and reduced-motion support.
- Server-side enquiry validation/storage, SMTP integration, optional Tawk.to integration, metadata, encrypted-backup tooling and deployment templates.

## Verification

Production build and formatting checks passed. Seven automated backend tests, 22 browser route checks and 77 responsive route checks passed. The browser suite exercises an actual enquiry submission in isolated test storage. Additional slider checks cover 320, 390, 820 and 1440px, image loading, all controls, keyboard, adaptive height, resizing and reduced motion.

The existing approved fonts, colors, icon service cards and page photography are intentionally preserved. This is a polish pass, not a new design direction. Visual QA found and fixed excess blank space caused by equal-height carousel slides, small pagination targets and cramped profile details. Local browser screenshots are generated in ignored `.qa/`.

The design inspector's icon-card and outlined-card preferences are intentionally overridden to preserve the service cards specifically requested by the client. Horizontal scrolling is intentional in the requested carousel. Font-size variety follows the existing design; no video has been added because none was provided and the client requested restrained imagery. Existing photography credits remain on `/credits`; the logo and UPS storefront image were supplied by the client.

## Account-dependent items before permanent launch

| Item | Required input/action | Current status |
| --- | --- | --- |
| Hosting and HTTPS | Node-compatible hosting access, domain and persistent private data directory | Not deployed to permanent hosting |
| Email alerts | SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, ENQUIRY_TO in server environment; confirm one or both inboxes | Enquiries save; no email delivery configured |
| Tawk.to | Public Property ID and Widget ID in shared/chat.mjs, then rebuild/restart and test notifications | Integration prepared, widget inactive |
| Privacy and terms | Confirm business/operator details, retention/deletion process and final wording | Draft pages remain visible |
| Backups | Generate BACKUP_KEY on target host; schedule backups and copy off-server | Backup/restore tooling tested, schedule not configured |
| Search indexing | Confirm HTTPS siteUrl, then enable launchReady after the above work | Preview remains noindex |

Use hosting collaborator access rather than sharing passwords in chat. Keep SMTP passwords and backup keys out of Git. Run `npm run launch:check` on the host; it validates configuration but cannot verify DNS, inbox delivery, external widgets or scheduled jobs.

## Deployment package

The handoff ZIP contains the production `dist/`, Node server, shared config, package manifests, scripts and deployment notes. It excludes credentials, enquiry data, backups, developer tools and node_modules. On a Node 22.13+ host, install production dependencies with `npm ci --omit=dev`, configure environment variables and run `npm start`. Run one Node process with persistent storage. Follow `deploy/README.md` for the reverse proxy, TLS and backups.

Source and public assets are included for rebuilding. To make a fresh ZIP on Windows after a successful build, run `powershell -NoProfile -File scripts/package-release.ps1`. The script validates the destination, uses portable ZIP paths and refuses to overwrite an existing archive.

The included build reflects the current preview configuration. Changes to shared/chat.mjs, shared/content.mjs or frontend content require a new frontend build as well as a Node restart. Configure them in the source project, run `npm run build`, and replace the deployed build/config together. Temporary Cloudflare links depend on the local computer and tunnel; they are not permanent hosting.
