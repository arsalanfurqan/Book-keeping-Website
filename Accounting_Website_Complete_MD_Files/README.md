# Accounting Services Website — Complete Markdown Documentation

**Version:** 1.0 | **Date:** 14 October 2026 | **Product type:** Accounting services company website (lead generation), not accounting SaaS.

## Vision
A premium, minimalist, responsive website that helps startups, freelancers, e-commerce sellers and SMEs understand accounting services and book consultations.

## Documentation index
| Document | Purpose |
|---|---|
| `docs/01-PRD.md` | Full product requirements, priorities and acceptance criteria |
| `docs/02-DESIGN-SYSTEM.md` | Colors, typography, layout, responsive rules and components |
| `docs/03-SITEMAP-AND-PAGES.md` | Navigation, page structure, SEO and homepage wireframe |
| `docs/04-SERVICES.md` | Complete service catalog including payroll |
| `docs/05-USER-FLOWS.md` | Visitor, consultation and lead management journeys |
| `docs/06-FEATURE-REQUIREMENTS.md` | Functional and non-functional requirements |
| `content/07-WEBSITE-COPY.md` | Starter homepage and service messaging |
| `content/08-FAQ-AND-LEGAL.md` | FAQs and legal-policy content checklist |
| `technical/09-ARCHITECTURE.md` | Suggested stack, integrations, security and CMS |
| `technical/10-DATA-MODEL-API.md` | Lead, service, booking entities and API contracts |
| `planning/11-ROADMAP-AND-TASKS.md` | Phased implementation plan and task checklist |
| `planning/12-QA-AND-LAUNCH.md` | Test cases, acceptance and deployment checklist |
| `planning/13-OPEN-DECISIONS.md` | Business choices to finalize before go-live |
| `docs/14-FUTURE-CLIENT-PORTAL.md` | Optional future payroll/accounting portal, out of MVP scope |

## Decisions assumed in this pack
- Marketing/services website with enquiry and consultation booking (not real payroll calculations).
- No specific firm name, pricing, credentials, or service geography supplied; placeholders are deliberate.
- Services such as payroll/tax require local regulatory review before publication.
- Recommended MVP: Next.js + Tailwind + CMS + hosted booking integration, but platform choice is flexible.

## How to use
1. Read `01-PRD.md`, then finalize the inputs in `13-OPEN-DECISIONS.md`.
2. Designer follows `02-DESIGN-SYSTEM.md` and `03-SITEMAP-AND-PAGES.md`.
3. Copywriter updates the `content/` drafts; legal reviewer checks compliance.
4. Developer uses `technical/` and `planning/` as handoff checklists.

**Status:** Developer-ready draft, subject to business decisions and legal review.
