# Design System — Premium Minimal Accounting Website

## 1. Visual personality
Calm, credible, clean, premium and professional. Large white space, restrained teal accents, precise grid, subtle borders, minimal decoration. Avoid busy gradients, stock-photo overload, accounting clip art, intrusive animations and dark blocks everywhere.

## 2. Color tokens
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F8FAF9` | Main page background |
| `--surface` | `#FFFFFF` | Cards/forms |
| `--ink` | `#142B32` | Headings/text |
| `--accent` | `#327E79` | Primary CTA, highlights |
| `--muted` | `#69747C` | Supporting text |
| `--line` | `#E3E9E7` | Borders/dividers |
| `--success` | `#236B4F` | Form success |
| `--error` | `#B42318` | Form validation |

Contrast must be tested against WCAG 2.2 AA; avoid teal text on white at small sizes until checked.

## 3. Typography
- Headings: **Manrope** or **Plus Jakarta Sans** (fallback system sans).
- Body: **Inter** or system sans.
- H1: clamp(2.5rem, 5vw, 4.5rem), line height 1.08.
- H2: clamp(2rem, 3.5vw, 3rem), line height 1.15.
- H3: 1.25–1.5rem. Body: 16–18px. Small: 14px minimum for normal text.
- Sentence case headings. Emphasize 1–2 words per section, not whole paragraphs.

## 4. Spacing and grid
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Max content width: 1200px; page gutters 20px mobile / 32px tablet / 48px desktop.
- Section padding: 56px mobile, 96px desktop.
- Cards: 16px radius, 1px border, subtle shadow only on hover.
- Buttons: minimum 44px high, 12px radius, obvious focus state.

## 5. Responsive breakpoints
- Mobile: 320–767px (single column).
- Tablet: 768–1023px (two-column service grid).
- Desktop: 1024px+ (three-column service grid, two-column hero).

## 6. Component library
| Component | Specs |
|---|---|
| Header | Sticky or static based on testing; 80px desktop, clear mobile menu |
| Primary button | Teal fill, white label, visible hover/focus/disabled |
| Secondary button | Outline or text arrow link, distinct from primary |
| Service card | Small line icon, heading, 1–2 lines, arrow link |
| Process step | Step number, short title, brief description |
| FAQ accordion | Accessible keyboard support and aria-expanded |
| Form field | Persistent label, hint/error text, autofill support |
| Testimonial | Name/role/company only with permission |
| Footer | Site links, contacts, legal, service region |

## 7. Motion and imagery
- Use understated 150–250ms hover transitions. Respect `prefers-reduced-motion`.
- Prefer simple geometric diagrams, real team photography (permissioned) and subtle abstract linework.
- Do not use fake dashboard screenshots or unverified logos.

## 8. Example homepage composition
```text
┌─────────────────────────────────────────────────────────┐
│ LOGO     Home  Services  Industries  About    [Book]   │
├─────────────────────────────────────────────────────────┤
│ ACCOUNTING MADE CLEAR.      [Minimal illustration]      │
│ GROWTH MADE EASIER.          [statement / chart motif]  │
│ Short pitch. [Book call] [Explore services]              │
├─────────────────────────────────────────────────────────┤
│ Verified trust strip (if available)                     │
│ Services: [Bookkeeping] [Payroll] [Tax]                 │
│           [Reporting]   [AP/AR]   [Advisory]            │
│ How it works: 01 → 02 → 03                              │
│ Industries / Why us / FAQs / Final CTA                  │
│ Footer                                                  │
└─────────────────────────────────────────────────────────┘
```
