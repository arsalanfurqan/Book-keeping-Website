# Functional and Non-functional Requirements

## Functional: must build
| ID | Requirement | Notes |
|---|---|---|
| FR-01 | Desktop/mobile navigation | Dropdown/menu keyboard accessible |
| FR-02 | Service detail pages | CMS-driven reusable template |
| FR-03 | Responsive CTA buttons | Lead to working form or booking integration |
| FR-04 | Contact and quote forms | Server validation + clear UX |
| FR-05 | Anti-spam and rate limits | Honeypot / CAPTCHA if needed; IP protections |
| FR-06 | Email / CRM delivery | Reliable, monitored integration |
| FR-07 | Success/error states | No silent failure or duplicate submit |
| FR-08 | CMS editing | Services, FAQs, hero, SEO and contacts |
| FR-09 | SEO metadata + sitemap | Server-rendered where possible |
| FR-10 | Cookie consent | Apply when analytics cookies require consent in target markets |
| FR-11 | Payroll interest fields | Optional employee range, frequency; no sensitive records |
| FR-12 | Accessibility | Semantic HTML, labels, focus states, error semantics |

## Nice to have (P1)
Resource library, searchable articles, case studies, industry landing pages, downloadable checklists, multi-language support, live chat if staffing is available.

## Nonfunctional
- **Security:** HTTPS, secret storage, server-side validation, CSP/security headers, least-privilege access, managed dependency patches.
- **Privacy:** data minimization, retention policy, opt-in rules, deletion process; avoid sensitive payroll documents until secure portal exists.
- **Availability:** hosting monitoring, form integration alerts, backup and restoration test.
- **Speed:** compress assets, cache content, lazy-load noncritical images, minimize scripts.
- **Accessibility:** WCAG 2.2 AA target with keyboard and screen-reader QA.
- **SEO:** semantic metadata, schema only where applicable, robots/sitemap and redirect management.
- **Observability:** log errors, form delivery failures, alert owner; never log bank/payroll records.

## Event tracking (no PII)
`cta_click`, `service_view`, `contact_start`, `contact_submit_success`, `contact_submit_error`, `booking_click`, `whatsapp_click` — include anonymized service identifier and page path, not name/email/message.

## Form behavior
- Validate required name, email, service and message.
- Phone optional; country optional; business-size optional.
- Error states associated with fields; preserve input after validation errors.
- Disclose processing purpose and link to privacy policy.
- Sanitize user input; implement rate limiting.
- Uploads **disabled for MVP**; secure document collection is separate work.
