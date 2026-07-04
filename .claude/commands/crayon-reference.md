# Crayon Reference — rubrics & tables (used by /crayon)

## ELI DIAL — level rubric (map to Dreyfus skill stages)
Each level ASSUMES more and EXPLAINS less. Same fact, four depths.

| Level | Reader = | Assumes | Explains | Vocabulary | Style |
|---|---|---|---|---|---|
| **ELI-5** | Novice, non-coder | Nothing | Everything | Zero jargon | Pure analogy ("this file is like a recipe card") |
| **ELI-10** | Advanced beginner | Basic idea of files/variables | Most terms, lightly | Common terms defined on first use | Analogy + light real terms |
| **ELI-15** | Competent dev | Knows JSON, functions, APIs, client/server | Only project-specific logic | Normal dev vocab, undefined | Precise, minimal analogy |
| **ELI-20** | Proficient/expert | Fluent in the stack | Only non-obvious design/tradeoffs | Native jargon, no hand-holding | Terse, technical, assumes fluency |

**Rule:** never explain at level N what level N-1's reader already knows. ELI-20 does NOT define JSON, env vars, HTTP, or async. ELI-5 defines all of them.

### Worked example — "an API call to Supabase"
- **5:** This asks another computer on the internet (named Supabase) to fetch or save something, like mailing a letter and waiting for a reply.
- **10:** This calls Supabase — an online service that stores our data — and waits for it to send data back before continuing.
- **15:** Async query to Supabase (our Postgres backend) via the JS client; awaits the response and handles the error case.
- **20:** `supabase.from(...).select()` — RLS-scoped read on the Postgres pool; note the round-trip and error branch.

### Worked example — "environment variable"
- **5:** A secret note the app reads that isn't written in the code itself, so strangers can't see it.
- **10:** A setting (like a password) kept outside the code in a `.env` file so it stays private.
- **15:** An env var — config/secret injected at runtime, not hardcoded.
- **20:** `process.env.X` — runtime-injected secret; must be server-only if sensitive.

## SIX MENTAL MODELS every crayon doc should reinforce
1. **What is this file for** (its job)
2. **Where it runs** (user's phone / browser / server / edge)
3. **What talks to it** (imports, exports, callers)
4. **What happens when it runs** (data flow: in → process → out)
5. **What it depends on** (stack, libraries, external services)
6. **What could break / what's exposed** (failure + security)

## TECH-STACK / SERVICE DETECTION — signal → service → docs link
Detect from imports, package deps, env var names, SDK init, endpoint URLs.

| Signals | Service | Docs URL |
|---|---|---|
| `@supabase/supabase-js`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `service_role`, `.from().select()` | Supabase | https://supabase.com/docs |
| `stripe`, `STRIPE_SECRET_KEY`, `pk_`/`sk_`, `webhooks.constructEvent` | Stripe | https://docs.stripe.com |
| `@google-cloud/*`, `GOOGLE_APPLICATION_CREDENTIALS`, KMS/Cloud Run/Storage | Google Cloud | https://cloud.google.com/docs |
| `wrangler.toml`, `CLOUDFLARE_*`, Pages/Workers | Cloudflare | https://developers.cloudflare.com |
| `firebase`, `FIREBASE_*`, `initializeApp` | Firebase | https://firebase.google.com/docs |
| `aws-sdk`, `@aws-sdk/*`, `AWS_ACCESS_KEY_ID`, S3/Lambda | AWS | https://docs.aws.amazon.com |
| `expo`, `react-native`, `app.json`/`eas.json` | Expo / RN | https://docs.expo.dev |
| `next`, `pages/`/`app/`, `NEXT_PUBLIC_` | Next.js | https://nextjs.org/docs |
| `@anthropic-ai/sdk`, `ANTHROPIC_API_KEY` | Anthropic | https://docs.anthropic.com |
| `openai`, `OPENAI_API_KEY` | OpenAI | https://platform.openai.com/docs |
| `pg`, `postgres`, `DATABASE_URL` | Postgres | https://www.postgresql.org/docs |
| `redis`, `ioredis`, `REDIS_URL` | Redis | https://redis.io/docs |
| `@vercel/*`, `vercel.json` | Vercel | https://vercel.com/docs |

## PER-FILE SECURITY CHECKLIST (flag "attack surfaces that live here")
For each file, check and plainly explain any hit. Map to OWASP where noted.

| Check | Detect signal | Plain-language flag |
|---|---|---|
| **Secret in client code** 🔴 | `sk_`, `service_role`, private keys, `SERVICE`/`SECRET` env in app/web bundle | "A password to your backend is sitting in code that ships to users. Anyone can read it." |
| **service_role key client-side** 🔴 | `service_role` outside server/edge | "This key bypasses ALL data protection and it's in the frontend." |
| **Missing RLS** 🔴 | Supabase table access without Row Level Security | "Nothing stops one user from reading another user's rows." |
| **Unverified webhook** 🔴 | Stripe/webhook handler w/o `constructEvent`/signature check | "Anyone can fake a 'payment succeeded' message here." |
| **No auth check on endpoint** 🟠 | route/handler trusting a user id from the request body | "This trusts whoever calls it — a user could act as someone else." |
| **Missing input validation** 🟠 | raw req body used directly, no schema check | "Bad/oversized input isn't rejected." (OWASP: Injection) |
| **SQL injection** 🟠 | string-concatenated SQL | "User text is glued into a database command." |
| **CORS wide open** 🟡 | `Access-Control-Allow-Origin: *` on authed API | "Any website can call this API." |
| **Hardcoded credentials** 🔴 | literal passwords/tokens in source | "Login secret written directly in the file." |
| **Secret in git history** 🟠 | key pattern anywhere in tracked history | "A key was committed once — still recoverable even if deleted." |

**Rule:** name env vars/keys, NEVER print their values. If a file is clean, say so ("No obvious attack surfaces on this page").
