# Stickr — Crayon demo app (⚠️ intentionally insecure)

A tiny sticky-notes app that exists **only** as a test fixture for the `/crayon` command.
Every security problem in here is planted on purpose so the Crayon Book has something to
teach. **Never deploy this. Never copy patterns from it.** All keys are fake placeholders.

## Try it

Open Claude Code in this folder and run `/crayon` → it writes `CRAYON_BOOK.html` here.
Compare what it flags against the answer key below. A pre-generated copy of the result
lives at [`../example-crayon-book.html`](../example-crayon-book.html).

## Answer key — what `/crayon` should flag

| File | Planted finding | Expected |
|---|---|---|
| `public/app.js` | Supabase service-role-style key hardcoded in browser code | 🔴 |
| `public/app.js` | `innerHTML` renders raw note text (stored XSS) | 🟠 |
| `routes/billing.js` | Stripe webhook handled without signature verification | 🔴 |
| `routes/notes.js` | SQL built by string concatenation (×2) | 🟠 |
| `routes/notes.js` | Trusts `userId` from query/body — no auth check | 🟠 |
| `routes/notes.js` | No input validation on note body/color | 🟠 |
| `server.js` | CORS `origin: '*'` across the whole API | 🟡 |
| `lib/ai.js` | Note text leaves the app for a third party (worth knowing) | 🟡 |
| `lib/db.js`, `lib/supabase.js`, `utils/format.js`, `tests/*` | clean | ✅ |

Services it should detect: **Supabase, Stripe, OpenAI, Postgres (pg), Express/Node.**
