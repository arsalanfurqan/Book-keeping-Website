# Suggested Technical Architecture

## Recommended MVP approach
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **CMS:** Sanity / Contentful / WordPress headless (choose one) for services, FAQs, testimonials and article pages.
- **Backend:** Next.js server actions/API handlers for basic enquiry; dedicated email/CRM provider via server-to-server calls.
- **Hosting:** Managed platform with SSL, CDN and logging.
- **Booking:** Calendly or equivalent, linked/embedded according to provider capabilities.
- **Analytics:** Privacy-configured GA4 or a lightweight alternative, respecting local consent requirements.

## Architecture diagram
```text
Visitor browser
  ↓ HTTPS
Next.js website (CDN + server rendering)
  ├── CMS content API (public read-only content)
  ├── Quote/contact endpoint (server-side validation)
  │    ├── Spam/rate-limit middleware
  │    ├── CRM or database (minimal lead fields)
  │    └── Transactional mail notifications
  ├── Booking provider (external link/integration)
  └── Analytics (consent controlled)
```

## Rendering guidance
Use static generation or incremental regeneration for services, FAQ, legal pages and articles; dynamic server submission for forms. Protect CMS preview and admin endpoints.

## Security checklist
- Never expose email/CRM API keys in client-side bundles.
- Apply request limits, size limits, CSRF protection as appropriate and schema validation on the server.
- Use HTTPS, secure admin roles, MFA, dependency vulnerability scanning and secret rotation.
- Encrypt sensitive records at rest where applicable; secure data in transit.
- Do not store employee bank details or pay slips on the marketing site.
- Restrict dashboards and integration credentials to designated staff.
- Define log and lead retention; privacy-deletion processes.

## CMS collections
`service`, `faq`, `siteSettings`, `navigation`, `testimonial` (requires approval), `industry`, `article` (P1), `teamMember` (optional and consented).

## Environments
Development, staging and production; use distinct keys/data and prevent staging indexing. Production rollout includes DNS, domain validation, SSL, backups, monitoring, robots and sitemap.

## Alternative lower-complexity stack
WordPress with a lightweight custom theme, reputable form/booking plugin and security hardening is acceptable for a service-only website.
