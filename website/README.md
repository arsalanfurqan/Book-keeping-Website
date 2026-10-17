# Accounting-services website

React.js + Vite frontend and standalone Node.js backend. This is a public-facing services website, with no client portal, accounting ledger or management dashboard.

## Run on Windows

Requires Node.js 22.13 or newer. In this directory:

```powershell
npm.cmd install
npm.cmd run dev
```

Frontend: http://127.0.0.1:5173. Backend: http://127.0.0.1:3001. The Vite development proxy connects the enquiry form to Node.

To run the production build locally:

```powershell
npm.cmd run build
npm.cmd start
```

Open http://127.0.0.1:3001. Node serves both the built React site and its API, including direct navigation to nested routes.

## Included

- Responsive homepage, services index and 12 service-detail pages.
- Industries, About, Contact and consultation-request pages.
- Working service selector, mobile menu and accessible FAQ accordion.
- Payroll-specific optional fields and validated enquiry form.
- Server-side validation, request-size limits, honeypot, rate limiting, same-origin checks and duplicate protection.
- Atomic server-side enquiry storage; a success message is returned only after saving.
- Draft privacy/terms pages, photography credits, self-hosted fonts and reduced-motion support.

## Project structure

```text
src/
  main.jsx                 React entry point
  App.jsx                  Routes and shared page layout
  pages/                   Individual website pages
  components/
    layout/                Header, footer and brand
    ui/                    Buttons, icons and page headings
    sections/              FAQ, service finder, process and CTA
    services/              Service grid
    industries/            Industry grid
    routing/               Page metadata, focus and scroll effects
  hooks/                   Consultation form state and submission
  data/                    Service finder options
  styles/                  Base, layout, page and responsive styles
server/
  index.mjs                Node startup and compatibility exports
  app.mjs                  Server creation and request routing
  config.mjs               Environment and project paths
  routes/                  Enquiry endpoint
  validation/              Enquiry field validation
  storage/                 Serialized, atomic enquiry persistence
  http/                    JSON responses, security and static serving
shared/content.mjs         Business content used by React and Node
tests/                     Backend integration tests
scripts/                   Development, assets and browser verification
```

Edit a page in `src/pages/`, a shared element in `src/components/`, or the
corresponding stylesheet in `src/styles/`. `styles/index.css` preserves the CSS
cascade with responsive overrides loaded last. Form state and submission live
in `src/hooks/useConsultationForm.js`; backend routing and storage are separate.

Run `npm.cmd run format` to format source files, or `npm.cmd run format:check`
to check formatting without changing files.

## Content and business details

Edit `shared/content.mjs` to set the company name, email, phone, service region, booking URL, services and FAQs. **Clearstead is a temporary name.** Prices, credentials, client logos and testimonials have not been invented. Empty contact details stay hidden.

The consultation form is an enquiry-to-schedule flow, not a live calendar. Setting a real HTTPS `bookingUrl` adds a scheduling link. A CMS is not connected; content is currently edited in the shared file.

## Enquiries

`POST /api/leads` validates and saves enquiries to `data/enquiries.json`. The data directory is ignored by Git and never served by the web server. There is deliberately no public endpoint or management dashboard for reading enquiries. The operator can review the server-side file using appropriate filesystem access.

Copy `.env.example` to `.env` if configuration is needed. SMTP email notifications and an optional HTTPS `LEAD_WEBHOOK_URL` send only the reference and service identifier after storage. No notifications are sent until configured. Failed notifications are marked in the saved record; saved enquiries still return success.

This file-backed implementation is intended for a single Node process on a persistent disk. Before public production: provision persistent storage and backups, configure HTTPS, configure real enquiry follow-up, replace draft legal text and brand details, and define a retention/deletion process. A multi-instance deployment should use a shared database and distributed rate limiting. Do not place the data directory inside `dist/`.

## Verification

```powershell
npm.cmd test
npm.cmd run build
node scripts/browser-check.mjs
```

The browser check uses the installed project's taste-skill CDP helper and local Chrome/Edge. It runs an isolated temporary server and saves test enquiries only inside ignored `.qa/`, not the real enquiry store.

## Assets and launch

Photos and licenses: `public/images/credits.json` and `/credits`. Fonts are Manrope and Inter from Google Fonts, with SIL Open Font License files in `public/fonts/`. Images are illustrative, not company premises, staff or clients.

Node provides route-specific HTML metadata, canonical links, social metadata, real 404 responses and a generated sitemap. React updates metadata on navigation. Set the real HTTPS `brand.siteUrl` and enable `brand.launchReady` only after finalizing company/legal details; previews remain noindex until then. Page bodies remain client-rendered. No analytics, tracking pixels or advertising cookies are added.

See [deployment and operations](deploy/README.md) for SMTP setup, Docker/Caddy hosting, encrypted backup/restore, and remaining account configuration. `npm run launch:check` lists missing launch settings without sending email. `node scripts/responsive-check.mjs` checks 11 screen widths, mobile navigation, accordion motion and reduced-motion behavior.

No external deployment was made. The requested backend uses a real Node server, not a Cloudflare Worker.
