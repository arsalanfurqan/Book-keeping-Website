# Deployment and operations

The site still needs real business details, a domain and hosting credentials. These
files prepare deployment; they do not purchase hosting or publish anything.

## Configure

1. Copy `.env.example` to `.env`. Keep secrets on the server, never in React or Git.
2. Set the brand, email, region, HTTPS `siteUrl` and optional booking URL in
   `shared/content.mjs`. Finalize the existing draft privacy/terms for the real
   operator, jurisdiction and retention policy. Then set `launchReady: true`.
3. Set `SMTP_HOST`, `SMTP_PORT` (587 or 465), `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
   and `ENQUIRY_TO` using your email provider. Both addresses must be single plain
   email addresses. Complete any sender/domain verification required by the provider.
4. Generate a 32-byte backup key with
   `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
   Store it in `BACKUP_KEY` and a separate password manager. Losing it makes the
   encrypted backups unreadable.
5. Run `npm run launch:check`. This checks configuration without sending messages.

Notifications contain only enquiry reference and service, matching the privacy
notice. Full contact details remain in the private server-side enquiry store.
Each channel's delivery result is stored in the record. A failed notification
does not discard an enquiry or return a false form failure. There is no automatic
retry worker; inspect failed/pending records on the server. A successful SMTP
submission means provider acceptance, not guaranteed inbox delivery.

## Docker + HTTPS

Requires a server with Docker Compose, a real domain pointing to it and inbound
ports 80/443. Set `SITE_DOMAIN` (hostname only) in `.env`, matching `brand.siteUrl`.

```sh
docker compose up -d --build
docker compose ps
docker compose logs --tail=100 app
```

The Node service runs as a non-root user. Only Caddy exposes ports; the Node port
must remain private when `TRUST_PROXY=true`. Caddy handles HTTPS certificates and
redirects. Persistent named volumes hold enquiry records, encrypted backups and
certificates. Do not use `docker compose down -v`: it deletes these volumes.
Use one app instance; file-backed storage is not a distributed database.

Docker was not available in the development environment, so validate the container
build and HTTPS on the target host before launch. The Node build and integration
tests are run locally.

## Backups and recovery

```sh
docker compose exec -T app npm run backup
```

Schedule that command on the host, for example daily, and copy the encrypted
backup files to separate storage. A backup on the same disk alone is insufficient
for disk failure. Retention/deletion timing must follow the actual business policy.
No schedule or offsite account is configured by this repository.

```sh
npm run backup:restore -- backups/enquiries-backup.json restored/enquiries.json
```

Restore decrypts and verifies integrity into a **new** file and refuses to overwrite
existing data. Inspect the restored file privately. Stop the application before
replacing the active enquiry store, preserve its current copy, then restart and
verify. Automated tests exercise round-trip recovery, wrong keys, tampering and
overwrite refusal using test data only.

## SEO

Node adds page titles, descriptions, canonical links and social metadata to HTML
responses. React updates them on client-side navigation. Unknown pages return HTTP
404. `/sitemap.xml` and crawlable `/robots.txt` activate only with a valid HTTPS
`siteUrl` and `launchReady`. Until then previews remain noindex. Page body content
is still client-rendered React; full server-side rendering is not implemented.
After launch submit the sitemap in your own Google Search Console account.

Implementation references: [Nodemailer SMTP](https://nodemailer.com/smtp),
[Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[Caddy HTTPS](https://caddyserver.com/docs/quick-starts/https),
[Docker volumes](https://docs.docker.com/reference/compose-file/volumes/).
