# Future Client Portal / Accounting Software — Separate Scope

**This is NOT part of the marketing website MVP.** Include only if the business plans to let clients log in and manage their accounting or payroll.

## Discovery questions
- Which countries and payroll tax rules? What regulatory sign-offs are required?
- Is the portal read-only or capable of initiating financial transactions?
- Which accounting systems, banks and payroll providers should integrate?
- Who can view employee payroll data and who must approve pay runs?

## Possible modules (subject to future PRD)
1. Client organizations and multi-tenant authentication.
2. Secure upload and document vault with retention policies.
3. Invoices, bills, expense categorization, reconciliation.
4. Dashboards, ledger and financial statements.
5. Employee onboarding, payroll periods, payslips, deductions and approvals.
6. Audit logs, role permissions, MFA, notification center.
7. Tax jurisdiction engine and filings only after qualified review.
8. Subscription/billing and support center.

## Essential safeguards
Tenant isolation, independent penetration test, strong encryption, fine-grained role controls, audit trails, secure handling of personally identifiable information and banking data, explicit payroll-approval controls, legal/compliance review, and a formal disaster-recovery plan.

## Example approval workflow
`Draft payroll → review inputs → calculate using verified jurisdiction rules → authorized approval → bank/provider handoff → reconcile → store audit record`.

**No money movement, sensitive document storage or regulatory calculation should be implemented based solely on this high-level appendix.** Produce a separate technical, legal and payroll-engine specification first.
