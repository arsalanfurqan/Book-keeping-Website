# QA, Acceptance Tests and Launch Checklist

## Test matrix
| Test | Steps | Expected |
|---|---|---|
| Navigation | Open site on desktop and mobile; use keyboard | Menus and every link reachable |
| Service URLs | Visit every listed service route | Correct page, hero, CTA, metadata |
| Form valid | Submit realistic valid enquiry | Real record/notification + success state |
| Form invalid | Omit required fields, malformed email | Inline accessible errors, no submission |
| Form spam | Rapid repeated/automated posts | Controlled rate limit / spam mitigation |
| Payroll form | Select payroll + optional employee range | Fields captured safely; no payroll records requested |
| Form provider down | Simulate failed integration | Safe error/fallback; no false success |
| Booking | Open provider; book test slot if permitted | Verified booking or correct external workflow |
| Analytics | Click CTA, submit form | Correct event, without PII |
| CMS | Edit and publish service from admin | Change appears; no unauthorized edit |
| Mobile | Test 320, 375, 768, 1024, 1440px | No overflow or clipped text |
| Keyboard | Tab through every interactive element | Clear focus order and visible focus |
| Screen reader | Inspect labels, headings, status | Content and errors understandable |
| SEO | Check meta, sitemap, robots, canonical | Correct and no staging pages indexed |
| Privacy | Inspect data disclosures and consent | Policy matches actual data processing |

## Content quality gate
- [ ] Brand details accurate; no placeholder text left.
- [ ] Payroll/tax qualifications and jurisdiction claims independently reviewed.
- [ ] Testimonials and trust logos documented/authorized.
- [ ] Prices only published when approved.
- [ ] Contact details, opening hours and region tested.

## Security and performance gate
- [ ] HTTPS and security headers configured.
- [ ] Admin MFA/role settings implemented.
- [ ] API keys kept server-side.
- [ ] Rate limiting, validation and error monitoring checked.
- [ ] Form spam response and retention/deletion workflow defined.
- [ ] Production backups and restore procedure confirmed.
- [ ] Core Web Vitals and WCAG 2.2 AA audit performed; issues triaged.

## Launch-day smoke test
On the live domain, open all main pages, test one complete enquiry/lead notification, test booking destination, check contact channels and confirm site indexing rules. Assign an owner for lead follow-up.
