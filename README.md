# nbn-sdlc-demo

> Team 2's working repository for the RMIT industry capstone **20-NBN, Software Development Lifecycle Using AI**.

The repository holds two things, and they serve one purpose:

1. **The project's research and deliverables**, in [`docs/`](docs/). These examine how an AI-assisted software development lifecycle actually works, stage by stage, and what has to be true before NBN Co runs one.
2. **A working Next.js + Firebase application**, the Garage Boilerplate, used as the demonstration codebase. Its commit history, hooks, CI runs and pull requests are the material the research examines, so claims about the lifecycle can be checked against a real repository instead of asserted.

Here for the research? Start with [research slice 1, the spine](docs/research/slice1-spine.md). Here to run the app? Start with [the beginner guide](docs/GUIDE.md).

## Project documentation

### Research

| Document | What it covers | Owner |
|----------|----------------|-------|
| [Slice 1, the spine](docs/research/slice1-spine.md) | The NBN Co eight-stage AI-SDLC map tested stage by stage against Google and Microsoft published practice, with a colour judgement and a reconciliation line per stage. [Requirements](docs/research/slice1-spine-requirements.md) | Zac Clarkson |
| [Slice 2, build modules](docs/research/slice2-build-modules.md) | Six modules going inside the build stages at the depth of commands and gates: how a commit is made, how branches become merges, how harnesses are used, each with its human gate and failure mode. [Requirements](docs/research/slice2-build-modules-requirements.md) | Zac Clarkson |
| Slice 3, governance | What sits around every stage: guardrails, cost, accountability, prompt practice, collaboration, and the external rules binding NBN Co. Drafted, in review, not yet merged | Zac Clarkson |
| [Citation audit](docs/research/citation-audit.md) | Independent verification of the slice 1 citations, 63 falsifiable claims opened and checked against live sources, recorded one by one | Zac Clarkson |
| [Google source note](docs/research/google-research.md) | Google's published AI-assisted development practice | Zafir Hasan |
| [Microsoft source note](docs/research/microsoft-research.md) | Microsoft's published AI-assisted development practice | Chirag Wadehra |
| [Developer interview guide](docs/research/interviews/developer-interview-guide.md) | Discussion guide and outreach plan for the developer interviews | Ahmed Falulur Rahuman |

### Requirements, reports and decisions

| Document | What it covers | Owner |
|----------|----------------|-------|
| [SDLC model requirements](docs/requirements.md) | Requirements for the SDLC model, first pass taken off slice 1 | Ahmed Falulur Rahuman |
| [D1, Claude certification report](docs/reports/D1-claude-certification.md) | What Claude Code can be relied on to do across the lifecycle, with a capability inventory and a "where it stops" column for each mechanism | Sidney Zeng |
| [ADR-001, technology stack](docs/adr/001-stack.md) | Why the Garage Boilerplate stack was adopted for the demonstration | Project team |
| [Templates](docs/templates/) | ADR, source note, spike log and user story templates used across the project documents | Project team |

Research documents are the working source. Word copies circulated in Teams for review are snapshots; edits belong here first.

---

The rest of this README describes the demonstration application.

## Stack

| | |
|-|-|
| **Frontend** | Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind v4 |
| **Backend** | Firebase Cloud Functions v2 · Express (single "fat lambda") |
| **Database / Auth** | Firestore · Firebase Authentication (free Spark plan) |
| **Package manager** | pnpm workspaces — always `pnpm`, never `npm`/`yarn` |
| **Testing** | Vitest · Testing Library · supertest |
| **Quality gates** | Lefthook (Conventional Commits, lint, format) · GitHub Actions CI |

There's no local emulator and no Docker — the app always talks to a real (free) Firebase project. Firebase Cloud Storage isn't used either, since real usage requires the paid Blaze plan; store file metadata in Firestore or use a free third-party host if a feature needs uploads.

The system diagrams are in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Quick Start

### 0. Prerequisites

- **Node.js 22** — [nodejs.org](https://nodejs.org)
- **pnpm** — `npm install -g pnpm`
- No Firebase CLI install needed — `npx firebase-tools` runs it on demand for rule deploys

### 1. Bootstrap

```bash
git clone https://github.com/Peepachuu/nbn-sdlc-demo
cd nbn-sdlc-demo
pnpm run bootstrap
```

> **Easiest path:** open the project in Claude Code and run **`/bootstrap`** — it does everything below, walks you through creating a free Firebase project, handles the common failure modes, and finishes with a verified auth smoke test.

Bootstrap installs dependencies, creates the root `.env` from `.env.example` (only if missing), and generates the per-package env files.

### 2. Connect Firebase — one env file

**All env values live in the root `.env`.** `frontend/.env.local` and `backend/.env` are generated from it by `pnpm run env:sync` (runs automatically before `pnpm run dev`) — never edit them by hand.

Create a project at [console.firebase.google.com](https://console.firebase.google.com) — the free Spark plan is enough, no billing required — then:

1. Enable **Authentication** (Email/Password + Google) and create a **Firestore** database
2. Register a **web app** (Project settings → Your apps → Web) and copy each `firebaseConfig` value into the matching `NEXT_PUBLIC_FIREBASE_*` variable in `.env`
3. Generate a **service account key** (Project settings → Service accounts), base64-encode it, and set `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64` in `.env`:
   ```bash
   # macOS (BSD base64 — no -w flag)
   base64 -i service-account.json | tr -d '\n'
   # Linux (GNU base64)
   base64 -w 0 service-account.json
   # Windows PowerShell (single quotes around the path)
   [Convert]::ToBase64String([IO.File]::ReadAllBytes('C:\path\to\service-account.json'))
   ```
4. Set `NEXT_PUBLIC_FIREBASE_PROJECT_ID` in `.env` and the same id in `.firebaserc` (`projects.default`)

Full variable reference: [docs/ENV-VARS.md](docs/ENV-VARS.md). The secrets already configured for this repository's own deployment and CI pipeline are listed in [docs/local-setup.md](docs/local-setup.md).

### 3. Run

```bash
pnpm run dev
```

- App → [http://localhost:3000](http://localhost:3000)

Restart the dev server after changing `.env` — `NEXT_PUBLIC_*` variables are baked in at startup.

## Troubleshooting

| Symptom | What to try |
|--------|-------------|
| `auth/invalid-api-key` | Fill every `NEXT_PUBLIC_FIREBASE_*` value in the root `.env`, run `pnpm run env:sync`, then restart the dev server. |
| "Firebase web config is incomplete" on Vercel | A `NEXT_PUBLIC_FIREBASE_*` env var is missing in Vercel. Add it under Project Settings → Environment Variables (same names as your local `.env`), then redeploy — existing deployments don't pick up new env vars automatically. See [docs/CI-CD.md § Vercel Setup](docs/CI-CD.md#vercel-setup-frontend). |
| `Invalid project id: REPLACE_WITH_...` | Set the real project id in `.firebaserc`. |
| `'next' is not recognized` / `Command "next" not found` | Run `pnpm install` from the **repo root**. If it persists, delete all `node_modules` folders and reinstall. |
| Ignored build scripts warning from pnpm | Build approvals live in `pnpm-workspace.yaml` (`allowBuilds`) — re-run `pnpm install`. |
| "Missing or insufficient permissions" | Firestore security rules don't allow that access — add rules in `firebase/firestore.rules`, then deploy them (`npx firebase-tools deploy --only firestore:rules`). |
| Commit rejected | Message must be Conventional Commits (`feat: …`, `fix: …`). |
| Your PR shows a red **Security Scan** check | `pnpm audit --audit-level=high` failed. Two known high-severity findings have a documented fix: see [Known `pnpm audit` findings](#known-pnpm-audit-findings-manual-fix). |

More beginner-oriented pitfalls: [docs/GUIDE.md § Common pitfalls](docs/GUIDE.md#6-common-pitfalls).

## Project Structure

```
/
├── frontend/          Next.js 16 App Router
│   └── src/
│       ├── app/       Pages (route groups: (auth), (dashboard))
│       ├── components/ UI components (layout, shared)
│       ├── features/  Feature modules (one folder per business domain)
│       ├── lib/       Firebase client/admin (lazy init), validations, utils
│       ├── hooks/     Custom React hooks
│       ├── providers/ React context providers
│       ├── actions/   Next.js Server Actions
│       └── types/     TypeScript type definitions
├── backend/           Cloud Functions v2 — Express fat-lambda
│   └── src/
│       ├── app.ts     Express app factory
│       ├── routes/    One file per resource
│       ├── middleware/ auth (ID token → req.user), errorHandler (RFC 9457)
│       └── lib/       firebase (Admin singleton), errors (HttpError), zodConverter
├── firebase/          Firestore rules, indexes
├── docs/              Boilerplate guides, and the project's own documents:
│   ├── research/      Research slices, source notes, citation audit, interviews
│   ├── reports/       Numbered project deliverables (D1 …)
│   ├── adr/           Architectural decision records
│   └── templates/     Document templates (ADR, source note, spike log, user story)
└── .claude/           Claude Code harness (agents, skills, MCP, hooks)
```

## Commands

```bash
pnpm run bootstrap        # First-time: install deps, env templates
pnpm run dev              # Frontend dev server (talks to your real Firebase project)
pnpm run build            # Build all packages
pnpm run test             # Backend unit tests (mocked Firebase Admin)
pnpm run test:component   # Frontend unit tests
pnpm run test:all         # All tests
pnpm run lint             # ESLint across all packages
pnpm run format           # Prettier across all packages
pnpm run typecheck        # TypeScript check across all packages
pnpm run env:sync         # Regenerate frontend/backend env files from root .env
pnpm run validate         # Check for unreplaced template placeholders
```

## Security

Security is enforced in independent layers — Claude Code guard hooks, HTTP hardening (helmet/CORS/rate limits), token + session-cookie auth, Zod input validation, default-deny Firestore rules, and CI scanning (`pnpm audit`). See [docs/SECURITY.md](docs/SECURITY.md).

### Known `pnpm audit` findings (manual fix)

CI runs `pnpm audit --audit-level=high` as the **Security Scan** job, so an outstanding high-severity finding turns that check red on every pull request. Two are currently flagged, both transitive and dev/build-time only, neither runtime-reachable:

| Package | Issue | Pulled in by |
|---------|-------|--------------|
| `js-yaml` | CVE-2026-59870 — quadratic CPU DoS on `!!omap` resolution | eslint's dependency chain (lint-time only) |
| `nanoid` | Infinite loop when a custom generator's `size` is 0 | postcss, used by Tailwind/Next/Vitest builds (build-time only) |

To patch: add these two lines under `overrides:` in `pnpm-workspace.yaml`, then run `pnpm install`:

```yaml
  js-yaml: '^4.3.1'
  nanoid: '^3.3.18'
```

Confirm with `pnpm audit` — should show 0 high/critical findings.

## Git Workflow

| Branch | Purpose |
|--------|---------|
| `main` | Integration branch, changes arrive by pull request |
| `feature/*` | New features → PR back to `main` |
| `hotfix/*` | Urgent fixes → PR back to `main` |
| `docs/*` | Project documents → PR back to `main` |

Use the Claude Code skills `/git-feature`, `/git-hotfix`, `/git-release`. Details: [docs/GIT-WORKFLOW.md](docs/GIT-WORKFLOW.md).

> **Enforcement gap, checked 3 September 2026.** The table above is the agreed process, not a rule the server applies. The repository has one ruleset, named "main", and it is active, but its branch target list is empty and it carries no required status checks, so nothing currently stops a direct push to `main` or a merge on a failing CI run. The live gates are the lefthook commit-msg check and the four CI jobs as advisory status. Fixing the ruleset needs repository admin. Full finding and evidence: [research slice 2, "Gaps recorded", item 3](docs/research/slice2-build-modules.md#gaps-recorded).

## Claude Code Harness

The repo ships a pre-configured harness: three MCP servers (**context7** for live library docs, **firebase** for Firestore/deploy tooling, **stitch** for design-to-code), three sub-agents (**security-reviewer**, **doc-auditor**, **test-writer**), enforcement hooks (blocks `any`, secret prefixes, direct pushes to `main`, unapproved deploys), and skills for scaffolding and quality:

| Category | Skills |
|----------|--------|
| Setup | `/bootstrap` — guided end-to-end local setup with verification |
| Scaffolding | `/new-feature` · `/new-page` · `/new-component` · `/firebase-collection` · `/add-auth-provider` · `/add-route` · `/evolve-schema` · `/add-env-var` |
| Quality | `/verify` · `/checkpoint` · `/save-session` · `/resume-session` |
| Git | `/git-feature` · `/git-hotfix` · `/git-release` |

See [CLAUDE.md](CLAUDE.md) for the full harness reference.

## Boilerplate Documentation

| Topic | Link |
|-------|------|
| **Beginner guide (start here)** | [docs/GUIDE.md](docs/GUIDE.md) |
| Verified walkthrough (all steps + code) | [docs/TUTORIAL-WALKTHROUGH.md](docs/TUTORIAL-WALKTHROUGH.md) |
| Copy-paste setup (no AI, exact steps) | [docs/COPY-PASTE-SETUP.md](docs/COPY-PASTE-SETUP.md) |
| Copy-paste feature build (no AI, exact file paths) | [docs/COPY-PASTE-FEATURE.md](docs/COPY-PASTE-FEATURE.md) |
| Slide deck — system overview + AI tooling | [docs/garage-boilerplate-guide.pptx](docs/garage-boilerplate-guide.pptx) |
| Slide deck — the notes feature, step by step | [docs/notes-feature-tutorial.pptx](docs/notes-feature-tutorial.pptx) |
| Architecture + diagrams | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Frontend conventions | [docs/FRONTEND.md](docs/FRONTEND.md) |
| Backend conventions | [docs/BACKEND.md](docs/BACKEND.md) |
| Design system | [docs/DESIGN.md](docs/DESIGN.md) |
| Firestore schema | [docs/FIRESTORE-SCHEMA.md](docs/FIRESTORE-SCHEMA.md) |
| Environment variables | [docs/ENV-VARS.md](docs/ENV-VARS.md) |
| Testing | [docs/TESTING.md](docs/TESTING.md) |
| Security | [docs/SECURITY.md](docs/SECURITY.md) |
| Git workflow | [docs/GIT-WORKFLOW.md](docs/GIT-WORKFLOW.md) |
| CI/CD & deployment | [docs/CI-CD.md](docs/CI-CD.md) |
| Deploying to Vercel | [docs/DEPLOY-TO-VERCEL.md](docs/DEPLOY-TO-VERCEL.md) |

## Deployment

The frontend deploys to **Vercel** (free Hobby tier, no billing account needed — this app is server-rendered, so it needs a server host, not static hosting). Step-by-step: [docs/DEPLOY-TO-VERCEL.md](docs/DEPLOY-TO-VERCEL.md).

## Forking for a Client Project

Follow the checklist in [CLAUDE.md — Forking for a New Client Project](CLAUDE.md#forking-for-a-new-client-project), then run `pnpm run validate` to confirm no template placeholders remain.

## Credits

Original boilerplate by **Duc Gia Tin Huynh** ([LinkedIn](https://www.linkedin.com/in/huynhducgiatin/)).
