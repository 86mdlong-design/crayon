# 🖍️ Crayon Docs — Project State

> Living tracker for this repo. Update the **Milestones** checkboxes and append to the
> **Worklog** every working session. Keep decisions in the **Decision log** so we don't
> re-litigate them.

## What this project is

A Claude Code slash command (`/crayon`) that reads an entire codebase and generates one
self-contained local `CRAYON_BOOK.html` that *teaches* the code to "vibe coders":
book-ordered chapters per file, an ELI 5/10/15/20 dial, per-file tech-stack + external
service detection with doc links, and a plain-language security section per chapter.
Distribution model: users copy the `.claude/` folder into their own project. No API key,
no server, no build step — the product IS the prompt files (plus template + demo assets).

## Inventory (current)

| Path | Role | Status |
|---|---|---|
| `README.md` | Landing page / install & use docs | ✅ v1.1 (example book linked) |
| `LICENSE` | MIT (copyright line has no name yet) | ⚠️ needs author name |
| `PROJECT_STATE.md` | This tracker | ✅ |
| `.claude/commands/crayon.md` | The `/crayon` command spec | ✅ v1.1 (template-aware) |
| `.claude/commands/crayon-reference.md` | ELI rubric, six mental models, service table, security checklist | ✅ v1 |
| `.claude/commands/crayon-template.html` | Canonical book chrome (CSS/JS/logo) the command fills in | ✅ v1 |
| `examples/demo-app/` | Tiny intentionally-insecure fixture app to exercise the tool | ✅ v1 |
| `examples/example-crayon-book.html` | Sample book generated from the demo app | ✅ v1 |
| `.gitignore` | Ignores generated books + node_modules | ✅ |

## Decision log

- **2026-07-04 — Ship a canonical HTML template** instead of regenerating page chrome
  from prose every run. The command fills marked regions (`CRAYON:*` markers); content
  stays model-authored, chrome stays deterministic. Fallback: if the template file is
  missing, the command still generates equivalent structure from the spec (so a partial
  copy of `.claude/` degrades gracefully rather than breaking).
- **2026-07-04 — Template lives in `.claude/commands/`** so the install story stays
  "copy one folder." Claude Code only registers `.md` files as commands; the `.html`
  sits there as an inert asset.
- **2026-07-04 — Demo fixture is intentionally insecure** (fake keys only, loudly
  labeled). It exists so every row of the security checklist and several rows of the
  service-detection table have a real trigger to test against. All planted secrets use
  obviously-fake `..._FAKE_DEMO_...` values.
- **2026-07-04 — The example book IS committed** (unlike real books). The "local only /
  never commit" rule protects *users' real codebases*; the example is generated from the
  fake demo app, so publishing it is safe and it doubles as the README's product demo.
- **2026-07-04 — Stay a slash command, not a skill folder** (`.claude/skills/`), for
  compatibility with older Claude Code versions and the simplest possible install.

## Milestones

- [x] **M0 — Concept & prompts v1** (pre-existing): README, LICENSE, `crayon.md`, `crayon-reference.md`
- [x] **M1 — Project tracker**: this file
- [x] **M2 — Book template**: `crayon-template.html` with sidebar/TOC, ELI dial (per-chapter + global sync), badges row, security dots, red local-only banner, bitten-crayon SVG logo, light/dark, mobile layout; `crayon.md` updated to use it with graceful fallback
- [x] **M3 — Demo fixture**: `examples/demo-app` — small Express + Supabase + Stripe + OpenAI notes app with planted 🔴/🟠/🟡 findings and clean ✅ files
- [x] **M4 — Dogfood run**: example book generated from the fixture using the template; validates ordering, ELI levels, service links, security flags
- [x] **M5 — README v1.1**: 3-file install tree, demo + example-book sections
- [ ] **M6 — Repo hygiene**: `git init` + first commit, author name in LICENSE, push to GitHub
- [ ] **M7 — Field test**: run `/crayon` on 2–3 real repos (different stacks); tune reference tables from what it misses
- [ ] **M8 — v1.2 ideas (backlog)**: search box in sidebar; "what to learn next" pointers between chapters; optional per-chapter quiz; Python/Go/Rust service-detection rows; screenshot/GIF for README

## Worklog

- **2026-07-04** — Session 1 (Claude): Reviewed repo, wrote this tracker. Built
  `crayon-template.html` (chrome + dial JS + logo) and wired it into `crayon.md` with a
  no-template fallback. Built `examples/demo-app` fixture (12 files, planted findings:
  client-side service_role 🔴, hardcoded key 🔴, unverified Stripe webhook 🔴, SQL
  string-concat 🟠, trusted body userId 🟠, no input validation 🟠, CORS `*` 🟡, plus
  clean ✅ files). Generated `examples/example-crayon-book.html` from the fixture as the
  dogfood run. Updated README. M1–M5 done.

## Next up

1. **M6**: `git init`, add author name to LICENSE, first commit, create GitHub repo.
2. **M7**: field-test `/crayon` on a real mid-size repo; log gaps in this file.
3. Triage M8 backlog after field-test feedback.
