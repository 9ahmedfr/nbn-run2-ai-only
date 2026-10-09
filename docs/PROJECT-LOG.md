# Project Log — Group 20, SDLC Using AI (NBN)

Master record for the capstone. Maintained by the PM; anyone may add, nothing is deleted.

**Client:** Alessio Bonti · **Technical supervisor:** Dr Ben Philip · **UX/design supervisor:** Leon Gouletsas
**Team:** Sidney Zeng (PM), Ahmed Falulur Rahuman (BA), Zac Clarkson (UX), Chirag Wadehra (Dev), Zafir Hasan (Dev)
**Repository:** `Peepachuu/nbn-sdlc-demo` · **Deployed:** `nbn-sdlc-demo-frontend.vercel.app`

**Last updated:** 12 September 2026

---

## 1. What the project is

An operational manual for how a development team builds software with AI in the loop, and where the human checkpoints sit so AI-generated work stays accountable.

Target users: developers, testers and architects in organisations with 100 or more developers. The work presents to NBN but nothing in it is NBN-specific.

Four deliverables named in the client brief of 15 August:

1. Technical white paper — an operational manual, feature request to production
2. Practical demonstration — a proof-of-concept run through the proposed lifecycle
3. Governance and token model — token consumption, API usage, and human liability for AI-generated code
4. Dual-audience learning path — enterprise developers, and juniors or students

---

## 2. Decision log

Newest first. Each decision records who proposed it, what else was considered, and why.

### D-012 · Defer the audience decision to the end of Sprint 1
**Date:** 20 Aug · **Proposed by:** Sidney · **Status:** Still open with the client

The brief names two audiences. Rather than choosing at the start, the decision was deferred so it would rest on the research and interviews. Recorded in the proposal as an exit condition of Sprint 1 and as a question to Alessio.

### D-011 · Colour sits on the task, not the stage
**Date:** 31 Aug · **Proposed by:** Zac, endorsed by Leon · **Applied in:** D4

A stage banner would show orange everywhere and carry no information. One stage holds green copywriting and red brand decisions at the same time. Leon suggested reframing the axis as autonomy versus intervention rather than a traffic light per stage.

### D-010 · Present the baseline and the proposal as two separate maps
**Date:** 2 Sep · **Proposed by:** Zac

Draft 1 reproduces Alessio's classification faithfully with challenges recorded beside it but nothing changed. Draft 2 applies the team's recommendations. Alternative rejected: silently correcting the client's framework. Stated on the artefact: "This is the position Team 2 puts to Alessio, not a correction of his framework."

### D-009 · Propose Stage 2 moves from green to amber
**Date:** 2 Sep · **Basis:** Peer-reviewed RE research

Stage 2 was the only green in the baseline — AI drafting user stories unsupervised. Quattrocchi et al. 2025 across ten LLMs found generated stories match human coverage and style but are less diverse and meet acceptance criteria less often. Microsoft's Definition of Ready keeps a human gate. Recorded as a challenge for the client to decide, not a change.

### D-008 · Keep the inherited stack rather than selecting one
**Date:** 3 Sep · **Decided by:** Chirag · **Record:** `docs/adr/001-stack.md`

Next.js 16.2.12, TypeScript 5, Tailwind 4, Firebase, pnpm. Alternatives considered: replace with a JavaScript application or different framework; do nothing. The stack was inherited from the RMIT boilerplate rather than chosen, and the ADR records that honestly rather than inventing a rationale. Risk recorded: not evaluated against the requirements of an AI-agent platform, since none are scoped.

### D-007 · Secret scanning uses a deterministic tool, not AI
**Date:** 9 Sep · **Decided by:** Zafir

Secret detection is well served by rule-based scanners using regular expressions, known credential formats and entropy checks. AI would add unpredictability, external dependency and privacy exposure for no gain. Gitleaks selected. Recorded as evidence for the broader principle that AI belongs where it beats existing approaches, not everywhere.

### D-006 · Reuse the client's red/amber/green framework rather than inventing one
**Date:** 14 Aug · **Proposed by:** Zac

The workshop material already classifies every SDLC stage. Extending an existing framework the client understands beats replacing it. Alessio's migration claim — that boundaries drift toward green as governance and context improve — gives a mechanism rather than a static picture.

### D-005 · Release research in three slices, not one report
**Date:** 13 Aug · **Proposed by:** Zac

A single report at the end of Week 2 would leave four people idle. Slicing means requirements and the first build start in Week 1. Evidence: the one workshop team that avoided idle time did exactly this, using Git as the shared medium.

### D-004 · Certification is Anthropic Academy, not cloud
**Date:** 13 Aug · **Source:** `NBN_Claude_Study_Plan_.docx`

The client meeting transcript rendered this as "CLOID certification" and the team read it as AWS or Azure. The study plan names specific Anthropic Academy courses. Four courses per person, split by role.

### D-003 · Squash and merge, with `Co-authored-by:` on multi-contributor branches
**Date:** 12 Aug · **Decided by:** Sidney

Keeps `main` readable at one commit per feature. Co-author lines preserve attribution, which the client requires for liability. **Note:** slice 2 later found `main` carries ten merge commits and no squashes, and no commit carries a co-author trailer. See O-002.

### D-002 · Documents live in Git; Word converted to PDF before committing
**Date:** 19 Aug · **Guidance:** Ben

Word is acceptable provided output is converted to PDF before it goes into the repository, so it cannot be modified in place. Ben's preference is LaTeX via Overleaf. In practice the team uses markdown for working documents and Word for client-facing deliverables.

### D-001 · Mock sprint role sequence: BA → UX → BA review → Dev 1 build → Dev 2 test → PM sign-off
**Date:** 5 Aug · **Decided by:** Team

Per the assignment sheet. Developers do not test their own work; only the PM marks a task Done.

---

## 3. Client and supervisor guidance

Recorded close to verbatim, with source and date, so it can be traced and quoted.

| Date | Source | Guidance |
|---|---|---|
| 10 Aug | Alessio | Sprint 1 is the lifecycle storyboard. Sprint 2 defines what is inside each box. Sprint 3 polishes it into a presentation-ready format. |
| 10 Aug | Alessio | A paper prototype in an SDLC project is a map of the lifecycle, not a UI mockup. "I am a developer, this is how I am going to develop today's feature." |
| 10 Aug | Alessio | Governance: if the machine wrote the code, how do we know it was done correctly, and who is liable? Raised twice, unprompted. |
| 10 Aug | Alessio | Target user is a developer, tester or architect in an organisation with 100+ developers. Findings should generalise: "it doesn't need to be NBN." |
| 10 Aug | Alessio | No access to NBN developers. Use Leon and Ben as proxies. |
| 10 Aug | Alessio | No per-document AI referencing required, but card authorship must be attributed for liability. |
| 15 Aug | Alessio (brief) | The white paper is "an operational manual for engineering teams." Not the stage diagram taught at university — how a commit is done, how branches are made, how harnesses are used. |
| 19 Aug | Ben | Company AI practice is largely proprietary. Narrow the research question. Blog posts are not research; use Google Scholar and arXiv. |
| 12 Aug | Ben | Manager is the job you are given; leader is the title you earn. Leadership is proposing the approach nobody thought of and bringing the team to it. |
| 12 Aug | Ben | Supervisor sessions run as sprint reviews: achievements, blockers, resolutions, next sprint plans. |
| 31 Aug | Leon | Colours belong to tasks, not stages. A stage can hold green copy and red decisions at once. |
| 31 Aug | Leon | Design systems are deterministic. Enforce them as tool-chain constraints, closer to RPA than generation. The fear case is a hallucinated off-brand logo. |
| 31 Aug | Leon | Identify which regulations bind NBN Co first and codify them as hard limits before design work begins. First Nations inclusive-design policy is the first UX rule to codify. |
| 31 Aug | Leon | Start with what is known to be real as fixed anchors; let AI generate only in gaps deliberately left open; research every generated hypothesis before treating it as real. |
| 11 Sep | Leon | Each stage needs ten to fifteen points, not three, with plain-English worked examples. |
| 11 Sep | Leon | The brief is extraordinarily broad. Pick a small number of stages, state why, and explicitly assume the earlier ones happened well. The area chosen matters less than being clear about why. |
| 11 Sep | Leon | Success metrics are the main gap and the route to a higher mark: for each gated step, how do you know it was done successfully, what are the industry benchmarks, where does the process typically fail. |
| 11 Sep | Leon | Operational cost belongs alongside success metrics. Projects are commonly presented as though budget were unlimited. |
| 11 Sep | Alessio | There are no shared tasks. Duplicate the task if needed, making sure deliverables are well in evidence. Meetings are not billable hours against the four-hour expectation. |

---

## 4. Open questions

| # | Question | Raised | Owner | Status |
|---|---|---|---|---|
| Q-01 | Which audience layer is developed first | 10 Aug | Sidney | Open — deferred deliberately, for Sprint 2 planning with the client |
| Q-02 | What the demonstration actually is: boilerplate, fault reporting tool, or a platform | 10 Aug | Sidney | Open — raised repeatedly, unanswered |
| Q-03 | Were NBN's real SDLC stage names ever confirmed by Vivek and Mahesh | 14 Aug | Sidney | Open — Chapter 3 of the workshop material shows placeholders |
| Q-04 | Are the four workshop recordings the complete set | 14 Aug | Sidney | Open — no session 1 for either cohort, nothing for Wednesday |
| Q-05 | Is the post-workshop survey available | 14 Aug | Sidney | Open |
| Q-06 | Access to NBN practitioners for interviews | 10 Aug | Leon | Open — Leon has raised it with Alessio twice without a clear answer |
| Q-07 | Which regulations bind NBN Co and how they are codified | 31 Aug | Zac | Partially answered in slice 3 Module 6; Telecommunications Act 1997 not fetched |
| Q-08 | Who authored D2 | 18 Aug | Sidney | **Open** — the proposal lists Ahmed as owner; Zac's hours record him drafting it |
| Q-09 | Does extending Alessio's framework satisfy "our own model" | 14 Aug | Sidney | Open |
| Q-10 | At what measured threshold may a stage move from amber to green | 2 Sep | Zac | Open — no source gives a numeric gate |

---

## 5. Observations for the white paper

Findings from the team's own practice. Each is first-hand evidence for the model being designed.

### O-001 · A fabricated citation in the team's own AI-assisted research
**Date:** 26 Aug · **Source:** `docs/research/citation-audit.md`

Sixty-three claims in research slice 1 were extracted and each fetched live to confirm the identifier resolved and the quoted wording matched. Result: 48 verified, 14 partial, 1 mismatched, 0 invented identifiers — but one quoted sentence attributed to a named industry report was not in that report, and one quote attributed to Microsoft came from a third-party blog.

**Why it matters:** the failure mode was predicted by the certification. Zac's own certification note of 20 August records that hallucination clusters in exact details — names, dates, citations, URLs — and that a source note needs the link sitting next to the claim. Six days later the team's own research demonstrated it. It was caught only because systematic verification was run afterwards.

### O-002 · No commit carries AI attribution
**Date:** 2 Sep · **Source:** slice 2, Module 2 and Gaps recorded

Claude Code adds a `Co-Authored-By` trailer to every commit it makes, on by default, controlled by one settings key. Every commit on `main` has a human author and no trailer, including those written with Claude Code open, because attribution was never enabled.

**Why it matters:** the client's stated requirement is knowing who wrote what, for liability. The team is building a governance model on that premise and not attributing its own AI-assisted work. Slice 3 Module 4 escalates this from a gap to a liability finding.

### O-003 · A branch protection rule that protected nothing
**Date:** 3 Sep · **Found by:** Zac, reviewing D1

A GitHub ruleset named "main" existed, active, created 19 August, requiring two approving reviews plus delete and force-push protection. Its branch target list was empty, so it applied to nothing and GitHub reported zero rules in effect. The history confirms it: pull requests merged with no approvals. No required status checks are configured either, so a failing CI job does not block a merge.

**Why it matters:** D1 had described both as live controls. The distinction between a control that exists and a control that is switched on is not something the certification teaches, and it was found by someone opening the settings page rather than taking the document's word.

### O-004 · The same shape, three times
**Date:** 3 Sep

O-001, O-002 and O-003 are one finding repeated. In each case the mechanism existed, the team understood it, and nobody switched it on.

This is the problem Leon described at NBN — individuals with tools and no institutional practice — reproduced by a five-person team actively studying it. It is the strongest evidence the team has that the gap is real.

### O-005 · First exposure to a tool or role runs estimates 2–3× over
**Date:** 15 Aug · **Source:** mock sprint hour reporting

Four independent reports, all attributing the overrun to unfamiliarity rather than scope: Zac 4 hrs against 2 (Figma), Ahmed roughly double (first time in a BA role), Chirag 5 against 2 (Tailwind) and 3 against 1 (Playwright), Zafir 3 against 1 where the implementation itself took the allocated hour and two hours went on learning the framework.

**Why it matters:** the project is designing an SDLC partly for inexperienced teams. Any estimation guidance has to account for a learning multiplier, and this is measured evidence rather than assumption.

### O-006 · Toolchains do not compose by default
**Date:** 16 Aug

A Playwright end-to-end test was added to a repository configured for Vitest. Vitest collected the Playwright file and the run failed. Neither tool was misconfigured in isolation; the conflict existed only at the seam.

**Why it matters:** an agent can generate a correct test in either framework and still break the build. Verification has to check integration, not only correctness of the generated artefact.

### O-007 · An agent can write and merge code, but a human must place the credential
**Date:** 15 Aug

The deployment workflow decodes a service account key from a repository secret. Everything downstream runs automatically. The credential itself had to be generated, encoded and pasted in by a person, once, deliberately — and then granted IAM roles the default service account did not carry.

**Why it matters:** a concrete red-tier boundary discovered by hitting it rather than theorising it.

### O-008 · Dependency maintenance is cheap continuously and expensive deferred
**Date:** 15 Aug

Two transitive vulnerabilities blocked the CI audit gate. Both were fixed by pinning patched versions via workspace overrides rather than lowering the audit threshold. Dependabot had been offering equivalent updates for weeks; they were left unmerged.

**Why it matters:** deciding when to accept automated dependency updates is a human judgement an agent cannot make. Also a worked example of fixing a gate rather than disabling it.

### O-009 · Unverified version tags in a security control
**Date:** 9 Sep

The Gitleaks CI integration was written with `gitleaks-action@v3` and `actions/checkout@v6`, neither confirmed against a release page, in a job whose purpose is catching exposed credentials. The rest of the workflow uses `@v4`.

**Why it matters:** version tags are exactly where a model's training cutoff surfaces, and they look entirely normal in a diff. If the action does not resolve, the job fails to start and the scan silently never runs — a control that appears configured and does nothing. Same shape as O-003.

### O-010 · Collaboration is the unsolved problem, and the teams solved it themselves
**Date:** 13 Aug · **Source:** D2, section 7.3

Every workshop team named collaboration as their biggest obstacle. No method was taught. By the second afternoon four patterns had been invented independently: acceptance criteria committed to the repository and referenced by path; a screenshot used as the specification; skeleton screens generated first then built page by page in a pipeline; and a review finding encoded as a reusable skill.

**Why it matters:** Alessio stated there is a significant opportunity here because nobody is looking at it. The patterns came from practitioners under time pressure rather than from documentation, which is an argument for their practicality.

### O-011 · The sharing mechanism exists and is taught; it is not used
**Date:** 3 Sep · **Source:** D1 section 6

An earlier assumption that the certification says nothing about team knowledge-sharing was wrong. The Cowork course covers plugins as a way to encode team expertise, a validation step before a skill is shared, and distribution across a team.

**Why it matters:** Leon observed NBN staff running separate instances with no process for sharing what they learn and unable to describe how institutional knowledge develops. The mechanism is taught and not adopted, which makes this an enablement gap rather than a tooling gap.

### O-012 · A superseded standard, caught by re-fetching
**Date:** 2 Sep · **Source:** slice 3 Module 6

The Voluntary AI Safety Standard and its ten guardrails, published 5 September 2024, were replaced on 21 October 2025 by the Guidance for AI Adoption and its six essential practices. The slice 3 requirements file written the same morning had planned to cite the ten guardrails.

**Why it matters:** policy sources change and commentary lags. The defence is a fetch date on every policy citation and a rule that they are re-fetched each slice.

### O-013 · The Commonwealth AI policy does not bind NBN Co
**Date:** 2 Sep · **Source:** slice 3 Module 6

The DTA's Policy for the responsible use of AI in government applies to non-corporate Commonwealth entities. NBN Co is a corporate Commonwealth entity and a Government Business Enterprise, so it is encouraged but not mandated to comply.

**Why it matters:** everyone assumes it applies. A governance document citing it as an obligation would be corrected by the first lawyer who read it, and the correction would take the rest of the document's credibility with it.

---

## 6. Timeline

| Date | Event |
|---|---|
| 31 Jul | Team formed, roles assigned |
| 5 Aug | Mock sprint planning |
| 10 Aug | Client meeting with Alessio — scope, target users, three-sprint structure |
| 12 Aug | Supervisor scope session with Ben |
| 15 Aug | Capstone brief circulated — four deliverables named |
| 17 Aug | Sprint 1 opens |
| 18 Aug | Mock sprint submitted |
| 19 Aug | Supervisor session — research question narrowed |
| 26 Aug | Research slice 1 released |
| 27 Aug | Introduction meeting with Leon |
| 31 Aug | Leon reviews the spine — task-level colour rule |
| 2 Sep | Slices 2 and 3 released |
| 4 Sep | Leon advisory session — depth and scope feedback |
| 6 Sep | D1, D2, D3 complete |
| 11 Sep | Mock playback with Leon |
| 12 Sep | Sprint 1 playback with Dr Ben |
| ~14 Sep | Sprint 1 closes |

---

## 7. Artefact index

| Artefact | Owner | Location |
|---|---|---|
| D1 Claude Certification Report | Sidney | `docs/reports/D1-claude-certification.md` |
| D2 NBN Workshop Review Report | [confirm] | **Not in the repository** |
| D3 SDLC Research Report | Zac | `docs/reports/D3-sdlc-research.md` |
| D4 Lifecycle Task Map | Zac | `docs/research/lifecycle-task-map.md` |
| Research slice 1, the spine | Zac | `docs/research/slice1-spine.md` |
| Research slice 2, build modules | Zac | `docs/research/slice2-build-modules.md` |
| Research slice 3, governance | Zac | `docs/research/slice3-governance.md` |
| Citation audit | Zac | `docs/research/citation-audit.md` |
| Google source note | Zafir | `docs/research/google-research.md` |
| Microsoft source note | Chirag | `docs/research/microsoft-research.md` |
| Developer interview guide | Ahmed | `docs/research/interviews/` |
| Requirements | Ahmed | `docs/requirements.md` |
| ADR 001, technical stack | Chirag | `docs/adr/001-stack.md` |
| Client proposal and Sprint 1 plan | Zac | Team folder |
| Deployed application | Zafir | `nbn-sdlc-demo-frontend.vercel.app` |
