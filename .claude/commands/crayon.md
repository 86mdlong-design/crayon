Build a "Crayon Book" — a plain-language TEACHING tool that explains this entire codebase so a "vibe coder" (builds with AI, limited backend/security knowledge) gains real understanding, not just syntax.

**First, read `.claude/commands/crayon-reference.md`** — it contains the ELI-level rubric, the six mental models, the service-detection table, and the security checklist. Apply them.

## Steps
1. Scan the repo. Ignore: node_modules, .git, dist, build, .next, vendor, lockfiles, binaries, images. DO note that .env files exist and which secrets/env vars they hold — never print values.
2. Order files like a book by role: config → entry points → routes/pages → components → services/utils → tests. This ordering IS the table of contents.
3. For EACH code file, write a chapter that answers the SIX MENTAL MODELS (see reference) and contains:
   - **What language/format** it's written in (JSON, Python, TS, etc.).
   - **Tech stack / dependencies** used on this page.
   - **External services** it talks to (Supabase, Stripe, Google Cloud, Cloudflare, etc.) — detect via the reference table; include a LINK to each service's docs when relevant to this file.
   - **The explanation at FOUR ELI levels (5/10/15/20)** per the rubric — each level assumes more and explains less; higher levels are genuinely different, not reworded. Cover: what the file does, what connects to it, and a short explanation of every function.
   - **Security — "attack surfaces that live here":** apply the per-file checklist from the reference. Flag any 🔴/🟠/🟡 concern in plain language, or state "No obvious attack surfaces on this page." Name env vars/keys, never values.

## Output — CRAYON_BOOK.html (single self-contained file, inline CSS/JS, no network)
- **Use the template:** read `.claude/commands/crayon-template.html` and follow the fill instructions in its header comment — replace the `¤PROJECT¤`/`¤SUBTITLE¤`/`¤DATE¤`/`¤COUNT¤` tokens, fill the `CRAYON:TOC` and `CRAYON:CHAPTERS` marked regions with real content, delete the instruction comment. Keep the template's CSS/JS/layout exactly as shipped. **If the template file is missing**, generate an equivalent page yourself from the bullets below.
- Left sidebar = clickable book index. Main pane = chapters. Smooth-scroll anchors.
- Readable: generous line-height, ~70ch text width, monospace for code/filenames.
- **ELI dial** on each chapter: slider 5/10/15/20, DEFAULT 5, labeled "Explain it like I'm ___". Sliding shows that level, hides others (inline JS).
- First chapter = project overview: what the app is, its pieces, a **secrets & keys table** (which files use which env vars — values never shown), and the **overall stack + external services** with doc links.
- Per chapter, show a small **badges row**: language, services (linked), and a security status dot (🔴/🟠/🟡/✅).
- Header logo: inline SVG of a crayon box with crayons sticking out, one crayon with a bite taken out of the tip. Simple, on-brand, no external image.

## Security — LOCAL ONLY
- CRAYON_BOOK.html exposes code internals — NEVER publish or commit.
- Add `CRAYON_BOOK.html` to `.gitignore` (create if missing); confirm it's ignored.
- Red banner at top of the book: "⚠️ Local only — contains code internals. Do not commit or share."
- Never write secret VALUES into the book — only NAMES.

Write CRAYON_BOOK.html to the repo root. Then report: how many files documented, and any 🔴 security concerns found.
