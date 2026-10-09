# Research slice 3, governance, prompt practice and collaboration: requirements

**Planner card:** [UX] Desk research, slice 3, governance, prompt practice, collaboration : 180
**Owner:** Zac Clarkson (UX)
**Slot in the plan:** third of three desk-research slices. Planned for Friday of week 2; the card carried no due date when checked on 2 Sep 2026. Proposed due date Thursday 4 Sep, with D3 (assemble and reconcile the slices) moved behind it to Saturday 6 Sep.
**Output location:** `docs/research/slice3-governance.md`, own branch off `main`, PR to `main`. Not stacked on PR #21; cites slice 2 by path.
**Unblocks:** D3 (Zac), Ahmed (requirements pass 3), Sidney (board breakdown for slice 3), and the governance and token model deliverable named in the capstone brief.

---

## 1. What this deliverable is

Slice 1 tested the map's colours. Slice 2 went inside the build stages. Slice 3 covers what sits around and across every stage: how people work together when an agent is in the loop, what a guardrail is and is not, what AI work costs, who is answerable for it, how a prompt is written, and which external rules bind NBN Co before any of that starts. The card's own notes: the four collaboration patterns the workshop teams invented, plus token accounting, liability, code authorship, and how a prompt is taught.

Same rule as the other slices. Nothing is invented. Every claim is documented practice (cited), observed in the workshop record (D2 v2), demonstrated in our repository, or practitioner input from Leon (26 and 31 Aug, recorded). Where a source is a policy or a piece of legislation, it is fetched and quoted, and the fetch date is recorded.

## 2. Acceptance criteria (from the card checklist, transcribed 2 Sep)

| # | Criterion | How to satisfy it |
|---|---|---|
| 1 | Committed the day it is agreed, with a comment naming who it unblocks | PR merged the day the module list is agreed; card comment tags Ahmed, Sidney, Zac (D3) |
| 2 | At least three concrete mechanics per module, not stage labels | Each of the six modules lists three things a person or a hook actually does, with the source. Where none exists, say so |
| 3 | Prompt practice covered: how prompts are written, stored, versioned, shared | Module 5 has to cover all four verbs. Stored and versioned means prompts as files in the repository (skills, CLAUDE.md, issue templates); shared means the Cowork plugin path D1 s2.6 describes and the sharing gap Leon observed at NBN |
| 4 | Does not re-cut the spine slice 1 fixed | Cite slice 1 by section; restate no verdict. Where the Guidance for AI Adoption supersedes a source slice 1 cites, record it as a note to slice 1, not a change to it |
| 5 | Committed to /docs/research | `docs/research/slice3-governance.md` via PR to `main` |
| 6 | Update Master Doc | Entry using the existing template, Git URL = the PR |

Card notes, verbatim: "Wk3 - The four collaboration patterns the workshop teams invented. Adds token accounting, liability, code authorship, and how prompts are written, stored, versioned and shared."

Criterion 3 widens Module 5 beyond what section 3 first proposed. Prompt practice is still time-boxed, but "stored, versioned, shared" makes it a mechanics module, not a section: the repository's `.claude/skills/`, `CLAUDE.md`, `.github/pull_request_template.md` and issue templates are the storage and versioning mechanics, and the plugin path is the sharing mechanic.

### What D3 needs from this slice

D3 (assemble and reconcile the slices, due 4 Sep on the card, proposed 6 Sep) has twelve checklist items. Four of them depend on things that do not yet exist and are recorded here so they are not discovered on the day:

- A comparison table across Google, Atlassian, Microsoft and Anthropic. There are source notes for Google and Microsoft only. Anthropic can be covered from D1 (the certification is the Anthropic source) and from the Claude Code documentation slice 2 cites. Atlassian has no source at all; either a short source note is written before D3 or the table records the column as not researched.
- The module list agreed by the whole team at the Thursday reconvene. That meeting is the gate for criterion 1 above.
- Interview findings incorporated. Ahmed's developer interviews; none recorded as complete on 2 Sep.
- Anything that changes a requirement Ahmed already wrote raised with him first. Module 2 (guardrails) and Module 6 (regulation) are the likely places.

D3's path is `docs/reports/D3-sdlc-research.md`, not `docs/research/`.

## 3. Proposed module list

Six modules. The first four are written from material already in the record; the fifth is short by design; the sixth is the one that needs new research.

1. **Collaboration patterns with an agent in the loop.** The four patterns the workshop teams invented (D2 v2 s7.3): skeleton first then pipeline the pages; the screenshot as the specification; accessibility encoded as a skill; acceptance criteria as a shared artifact in version control. Plus the two questions left open on the floor (s7.5): is collaboration less necessary under an agentic model, and does documentation stop being the artifact. Plus the NBN constraints that broke collaboration (s9): Git is not universal, tenants block file exchange, Jira and Confluence hold the requirements. Each pattern gets the slice 2 treatment: story, mechanics, gate, failure mode. Sources: D2 s7.1, s7.3, s7.5, s9; slice 2 Module 1 (the AC-in-repo pattern already written up); Leon's 26 Aug observation of private, unshared GenAI use at NBN; D1 s2.6 (Cowork plugins as the taught sharing mechanism) and s6 (the mechanism exists and is not used).
2. **Guardrails: what holds and what only shapes.** Alessio's position that a rules file is not a control (D2 s4.5), the hook and separation-of-duties mechanisms he offered, the context-competition trap (governance context eats working context), and D1's capability ladder (hook enforces, human judges, everything else shapes). Slice 2 Module 4 already has the operational half; this module writes the governance half: which of the six mechanisms can be named in a policy as a control, and what the policy has to say instead for the rest. Sources: D2 s4.5; D1 s2.4 and s3; slice 2 M4; Claude Code hooks and permissions docs (already verified in slice 2).
3. **Token accounting and cost.** How it was taught (D2 s4.4: the 3,000-token heading, 14 percent of quota with one document at 7 percent, five-hour windows, top-ups in real time), the client brief's requirement for a governance and token model, and D1's finding that the certification path says nothing about cost (s6). What a per-task cost record looks like and where it lives (the spike log template already asks for generating time against reviewing time; add tokens per task). Sources: D2 s4.4; D1 s6; `docs/templates/spikeLogTemplate.md`; Zafir's INF-6a log when it lands (marked slot).
4. **Liability, provenance and code authorship.** Who is answerable for AI-assisted work, in the vocabulary the certification already gives us (D1 s2.3, Diligence). The audit trail that does not yet exist: Leon's "nutrition label" (which model, prompt and configuration produced an output; D1 s6), the git trailer as the smallest available record (slice 2 M2), the S4 "confidence card" proposal (plan, assumptions, alternatives, known edge cases; Zafir's note s6), and the post-merge survival data that says responsibility does not end at approval (Liu et al., 24.2 percent of AI-introduced issues still at HEAD, security 41.1 percent; Zafir's note s5.2). Sources: D1 s2.3, s6; Zafir's note s5, s6, s8; slice 1 open questions 1 and 2; slice 2 M2, M3.
5. **Prompt practice.** The client brief names a prompt practice module. D1 s2.3 anchors it to the Description competency and the describe, evaluate, refine loop; D2 s4.2 lists the practices Alessio taught (write the issue properly, state what is out of scope, ask for options not an answer, context is the output, skills stop the reinvention). This module records those as a short taught sequence for the junior layer and cites Anthropic's own prompting documentation for the mechanics. It is a section, not a research question, and is time-boxed to that. Sources: D1 s2.3; D2 s4.2; docs.claude.com prompt engineering overview (to fetch).
6. **Regulatory codification for NBN Co.** Leon's instruction (31 Aug): identify which regulations bind NBN Co first, codify them as hard limits in system prompts and tool chains before design work begins, with First Nations inclusive-design policy as the first UX rule. Preliminary findings from 2 Sep fetches, to be written up with quotes and dates:
   - NBN Co is a wholly owned Government Business Enterprise under the National Broadband Network Companies Act 2011, directed by a Statement of Expectations from its Shareholder Ministers (current statement issued December 2024; the department also publishes the 2021 one). It is a corporate Commonwealth entity, not a department.
   - The Digital Transformation Agency's Policy for the responsible use of AI in government (version 2.0) binds non-corporate Commonwealth entities. On the fetched text it does not bind GBEs. So the accountable-official, AI-use-register and transparency-statement requirements are the nearest applicable model for NBN Co rather than an obligation, and the slice has to say so rather than assume.
   - The Voluntary AI Safety Standard (5 Sep 2024, ten guardrails) was superseded on 21 Oct 2025 by the Guidance for AI Adoption and its six essential practices: decide who is accountable; understand impacts and plan accordingly; measure and manage risks; share essential information; test and monitor; maintain human control. Any source still citing the ten guardrails is out of date. (Checked: neither slice 1 nor slice 2 cites it.)
   - Fetched 2 Sep and written into Module 6 (see the citation record in the draft): the Privacy Act 1988 and the Australian Privacy Principles as they apply to NBN Co as an organisation; the Telecommunications Act 1997 obligations relevant to customer data; the Disability Discrimination Act 1992 and the WCAG 2.2 expectation the workshop already treated as definition of done (D2 s9, Siteimprove); NBN Co's Reconciliation Action Plan and any First Nations design policy it publishes; the Security of Critical Infrastructure Act 2018 (NBN is critical infrastructure). Not fetched: the Telecommunications Act 1997 customer-data obligations; Module 6 covers customer data through the Privacy Act and the APPs only, and the Telecommunications Act is recorded as an open item for D3.
   The module ends with the codification: for each binding rule, the mechanism that holds it (hook, deny rule, CI check, or a human sign-off) per D1 s3, and a plain statement of which rules cannot be codified and stay red.

Marked slot, all modules: Leon's "Trust in AI Design" deck (clarity, control and ongoing trust; model cards, audit logs, fallback and escalation, user override, multi-agent critique, feedback loops, responsible AI policy, version control). Named as a slice 3 source in slice 1. Not in the team folder as of 2 Sep; requested. The draft does not wait for it; its outline from the 26 Aug meeting is cited as practitioner input until the file arrives.

## 4. What slice 3 adds beyond slices 1 and 2

Slice 1 raised governance as open questions (approval-gate design, auditability, thresholds, injection risk, regulatory codification). Slice 2 answered the mechanical half inside the build stages. Slice 3 answers the organisational half: who is accountable, what a control is, what it costs, what the law requires, and how a team shares what works. It also closes the loop on the capstone brief, which names a governance and token model as a deliverable in its own right.

## 5. Inputs

| Input | Status |
|---|---|
| D2 v2 s4.2, 4.4, 4.5, 7.1, 7.3, 7.5, 9, 10 | done |
| D1 s2.3, 2.4, 2.6, 3, 6 (`docs/reports/D1-claude-certification.md`) | merged to `main` 4 Sep (7de8574); section numbers rechecked against the merged file, all resolve |
| Slice 1 open questions and recommendations 4, 6, 8 | merged |
| Slice 2 Modules 1, 2, 4 and Gaps recorded | PR #21 |
| Zafir's Google note s5, s6, s8; Chirag's Microsoft note s5, s7 | merged |
| Leon, 26 and 31 Aug meeting records | recorded |
| Leon's Trust in AI Design deck | not in team folder; requested; marked slot |
| DTA policy v2.0, Guidance for AI Adoption (Oct 2025), NBN Companies Act 2011, Statement of Expectations | fetched 2 Sep, quotes to be captured in the draft |
| Privacy Act and APPs, DDA and WCAG, SOCI Act, NBN Co RAP, First Nations Digital Inclusion Plan | fetched 2 Sep, quoted in Module 6 |
| Telecommunications Act 1997 | not fetched; open item for D3 |
| Anthropic prompt engineering overview, Claude Code skills documentation | fetched 2 Sep, quoted in Module 5 |
| Zafir's spike log tokens per task | not started; marked slot |

## 6. Where it stands

All six modules are drafted (2 Sep). What remains is process: the module list agreed at the Thursday reconvene, the PR, the card comment naming who it unblocks, and the master doc entry pointed at the PR. Nothing is blocked on another person; the deck and the spike log are marked slots.

## 7. Constraints

Same as slices 1 and 2: Conventional Commits, `docs:` prefix, branch from `main`, cite every claim, plain Markdown, plain-English worked example before the mechanics in every module, no em dashes. Policy and legislation quoted verbatim with the fetch date, since these change; the Voluntary AI Safety Standard being superseded eleven months after publication is the reason.
