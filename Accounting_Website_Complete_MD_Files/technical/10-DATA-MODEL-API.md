# Data Models and API Outline

**Important:** These contracts are an implementation starting point, not an implemented backend. Avoid keeping contact details longer than necessary.

## Entity: Service
```ts
type Service = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  body: string;
  benefits: string[];
  deliverables: string[];
  faqIds: string[];
  seoTitle: string;
  seoDescription: string;
  published: boolean;
};
```

## Entity: Lead
```ts
type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  organization?: string;
  service: string;
  message: string;
  employeeCountRange?: '1-10'|'11-50'|'51-200'|'201+';
  payFrequency?: 'weekly'|'biweekly'|'monthly'|'other';
  consent: boolean;
  status: 'new'|'contacted'|'qualified'|'consultation_scheduled'|'proposal_sent'|'won'|'lost'|'spam'|'duplicate';
  createdAt: string; // ISO 8601
};
```

## Entity: FAQ / Page settings
```ts
type FAQ = { id: string; question: string; answer: string; relatedServiceId?: string; order: number };
type SiteSettings = { companyName: string; contactEmail: string; serviceRegions: string[]; bookingUrl?: string; whatsappUrl?: string };
```

## Proposed endpoint
### `POST /api/leads`
Example request:
```json
{
  "name": "Sample Visitor",
  "email": "visitor@example.com",
  "service": "payroll",
  "message": "Interested in monthly payroll support.",
  "employeeCountRange": "11-50",
  "payFrequency": "monthly",
  "consent": true
}
```

**Validation:** max lengths, email format, allowlisted service/frequency, server-side consent rules and rate limits. Reject attachments and unknown/sensitive fields. Implement operational anti-spam controls.

**Success (201):**
```json
{ "ok": true, "reference": "ENQ-EXAMPLE", "message": "Enquiry received" }
```

**Validation (400/422):**
```json
{ "ok": false, "code": "VALIDATION_ERROR", "fieldErrors": { "email": "Enter a valid email" } }
```

**Failure (500/503):** generic message; no internal details. Do not claim success unless storage/routing succeeded. Use idempotency or a short duplicate-protection window.

## Internal lead access
Admin-only role-based CRM views; audit user access where possible. Prefer existing CRM instead of custom admin in MVP.

## Event schema
`{ event, pagePath, serviceSlug, timestamp }` — **no personal identifiers** in analytics payload.
