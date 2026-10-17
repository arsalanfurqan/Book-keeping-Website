# Product Requirements Document (PRD)

**Product:** [Firm Name] accounting services website  
**Version:** 1.0  
**Owner:** [Project Owner]  
**Status:** Draft for approval

## 1. Problem and opportunity
Owners of small businesses often struggle to understand which bookkeeping, payroll, compliance and financial reporting services they need. The site should explain offerings in plain English, establish trust and make contacting the firm effortless.

## 2. Product vision
Build a clean, fast, accessible, mobile-first accounting-services website that communicates value in 10 seconds and converts visitors to qualified consultation requests.

## 3. Goals / KPIs
- Primary: qualified consultation submissions and completed bookings.
- Secondary: service-page engagement, contact clicks, organic leads.
- Track: form completion rate; click-to-book rate; qualified-lead rate; response time; mobile conversions.
- Initial numeric targets: **TBD after baseline data**, not invented.

## 4. Personas
| Persona | Needs | Most relevant service |
|---|---|---|
| Solo founder | Bookkeeping, monthly reporting | Bookkeeping |
| SME manager | Reliable reconciliations and tax readiness | Accounting & Tax |
| Growing employer | Payslips and routine payroll administration | Payroll |
| E-commerce seller | Settlement reconciliation, multi-channel reports | E-commerce accounting |
| CFO / owner | Cash-flow visibility and budgets | Advisory |

## 5. Scope
### P0: MVP must-have
- Responsive homepage, about, contact, industries, services index and service-detail pages.
- Services: bookkeeping, payroll, tax support, financial statements, AP/AR, business compliance support, forecasting and advisory.
- Enquiry form with validation, bot controls, consent where needed, secure routing and confirmation.
- Consultation scheduling via third-party integration **or** enquiry-to-schedule workflow.
- Clear CTAs, accessible mobile navigation, verified trust information, FAQ and SEO basics.
- Privacy and terms pages; analytics with consent handling as applicable.

### P1: Phase 2
- Resource/blog CMS, testimonials and case studies with permissions.
- Downloadable checklists, multilingual content if appropriate, CRM automation.
- Industry-specific landing pages and advanced search/filtering.

### P2: Future product
- Authenticated client portal, document exchange, engagement status, invoices.
- Payroll processing, payment initiation, accounting ledger and tax engine **only after separate security/regulatory/product specifications**.

## 6. Out of scope for MVP
- Actual payroll runs, salary calculations or banking payments.
- Filing returns with authorities from within the site.
- Employee self-service, storing IDs/payroll records, tax calculation engine.
- Customer billing and accounting SaaS dashboards.

## 7. Stakeholders and roles
- Business owner: scope and business accuracy.
- Design lead: UI system, responsive layouts, accessibility.
- Developer: frontend, backend/form delivery, CMS and integrations.
- Content owner: service copy and SEO.
- Legal/compliance reviewer: tax/payroll promises and privacy statements.
- Ops owner: receives and responds to leads.

## 8. Requirements and acceptance
| ID | Priority | Requirement | Acceptance criterion |
|---|---|---|---|
| PRD-01 | P0 | Informative home hero | Value statement and primary CTA visible without scrolling on common desktop viewport |
| PRD-02 | P0 | Service detail pages | Each listed core service has overview, deliverables, fit, process, CTA and FAQ |
| PRD-03 | P0 | Contact form | Valid submissions saved or delivered; invalid ones show readable errors; success message displayed |
| PRD-04 | P0 | Payroll enquiry | Payroll page explains scope and captures employee-count/pay-frequency as optional fields |
| PRD-05 | P0 | Mobile responsive | No horizontal scroll, tap targets usable, nav/CTA accessible at 320px+ |
| PRD-06 | P0 | Privacy | No confidential payroll uploads on generic contact form by default |
| PRD-07 | P0 | CMS | Authorized editor can update services and FAQs without deployment |
| PRD-08 | P0 | Analytics | Form submit, booking click, contact click tracked with no sensitive payload |
| PRD-09 | P0 | Speed | Optimize for Core Web Vitals; measure on staging and production |
| PRD-10 | P1 | Testimonials | Only authorized/verified testimonials published |

## 9. Content principles
Use direct language, real benefits and honest claims. Avoid fabricating certifications, awards, customer counts or promises of guaranteed tax savings.

## 10. Dependencies
Brand identity, operating country, services actually offered, approved regulatory wording, pricing policy, booking provider, lead recipient, domain and privacy contact.

## 11. Release gate
All P0 acceptance criteria met, forms tested, legal text approved, performance/accessibility reviewed, security configuration checked, backups and monitoring enabled.
