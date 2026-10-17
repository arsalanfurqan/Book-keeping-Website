# User Flows and Lead Journey

## Flow A — Visitor to lead
```text
Landing page → choose service → read service detail
→ click Request a Quote → complete form → validation
→ consent where required → submit → confirmation
→ secure notification / CRM record → team follows up
```

**Failure handling:** If delivery fails, surface a generic error; prevent duplicates, log server-side error without storing sensitive payload in analytics, provide email fallback.

## Flow B — Payroll lead
```text
Homepage / search → Payroll page → scope and FAQs
→ Get Payroll Quote → select employee count range
→ select pay frequency → explain needs → submit
→ Payroll-tagged lead → assigned follow-up
```

## Flow C — Booking
```text
CTA → scheduling provider or booking request
→ user selects time (only if live calendar connected)
→ booking confirmed by provider → confirmation
→ internal calendar/CRM notification
```
Do not show fabricated appointment availability.

## Flow D — WhatsApp
Service CTA → WhatsApp deep link with short prefilled **service name only** → user chooses send → team replies. Do not prefill personal data.

## Flow E — Editing content
Authorized staff → CMS login with MFA → edit preview → approval (if configured) → publish → cache invalidation → audit log.

## Lead status lifecycle
`new → contacted → qualified → consultation_scheduled → proposal_sent → won/lost` (also `spam`, `duplicate`).

## Notifications
Lead confirmation to visitor (if configured); internal lead alert; overdue follow-up alert optional. Avoid embedding form messages or personal financial data in unencrypted third-party channels.
