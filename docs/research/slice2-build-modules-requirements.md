# Research slice 2, build modules at operational depth: requirements

**Owner:** Zac Clarkson (UX)
**Slot in the plan:** second of three desk-research slices. Originally due Tuesday of week 2; the schedule slipped a week behind slice 1. Planner card due date 2 Sep 2026; all six modules drafted that day.
**Output location:** `docs/research/slice2-build-modules.md`, same branch/PR flow as slice 1.
**Unblocks:** Ahmed (requirements pass 2), Sidney (board breakdown for slice 2), Zafir (spike INF-6a second pass).

---

## 1. What this deliverable is

Slice 1 established the spine: eight stages, colours, verdicts. Slice 2 goes inside the build stages (5, 6, 7 of the map, plus the deploy mechanics of 8) at the operational depth Alessio asked for on 15 Aug: "how a commit is done, how branches are made, how harnesses are used", not the university diagram. Where slice 1 asked "is this stage amber?", slice 2 asks "what does an amber stage look like on a Tuesday": the actual commands, file formats, gates and handoffs a junior developer follows when an AI agent is in the loop.

Nothing is invented, same rule as slice 1. Every mechanic is either documented practice (cited), observed in the workshop record (D2), or demonstrated in our own repo.

## 2. Acceptance criteria (mirror the slice 1 card until Sidney cuts the real one)

1. Committed to `docs/research/` via PR, merged to `main`.
2. Card comment names who it unblocks: Ahmed, Sidney, Zafir.
3. Operational depth per module: each module carries the concrete commands/configs, the human gate, and the failure mode. If a module has no command, that gap is stated, not padded.
4. Master doc entry using the existing template.
5. Reconciliation lines against the sources used, same pattern as slice 1.

## 3. Proposed module list

Six modules, mapped to the spine's build stages:

1. **Issue to branch.** How a task becomes work: issue templates, acceptance criteria as a committed artifact (the D2 7.3 pattern: ACs in the repo as Markdown, referenced by name in prompts), branch naming, who may open a branch. Sources: our repo's GIT-WORKFLOW.md, GitHub coding-agent docs, D2 s7.3.
2. **How a commit is done.** Conventional Commits (hook-enforced in our repo), small-change discipline (Google small-CL rule; Watanabe's 40% multi-purpose agentic PRs as the reason), co-authorship trailers for agent-assisted commits and why the audit trail wants them. Sources: eng-practices, our own repo history (PR #9 was expected to be a live example of trailers; it is not, see the modules document's "Gaps recorded"), D1 s3 (the hook row: a lefthook commit-msg check is the textbook deterministic gate) and D1 s6 (the provenance gap the trailers partly close).
3. **How branches become merges.** PR flow with an agent in the loop: draft PR early, human review gate (LGTM/OWNERS at Google, non-author review in Microsoft SDL), @-mention iteration with the agent, what a reviewer actually checks on an AI-authored diff (the approval-gate open question made concrete). Sources: slice 1 Stage 6, both source notes.
4. **How harnesses are used.** Test harnesses and CI as the adversarial layer: pre-commit hooks (Alessio's invented-citation hook from D2 4.5), branch protection, the two-stage presubmit/postsubmit split (Google TAP), secret scanning, and the "are the tests correct" check (mutation-style evaluation). The module's spine is D1's capability inventory: a hook enforces, a skill or CLAUDE.md only shapes, a sub-agent checking an agent is not an oracle. Each harness gets sorted into one of those three before its commands are written up. Sources: slice 1 Stage 7, D2 4.5, dora.dev CI capability, D1 s3 and s2.4.
5. **Design-system enforcement in build.** The UX module. Leon's two mechanics from the 31 Aug meeting: enforce the design system as tool-chain constraints rather than generating brand assets, and the overlay-diff check (generate the layout, load the real design-system CSS after, whatever shifts is the violation). Plus the workshop's WCAG-skill pattern as the accessibility harness. Sources: Leon (practitioner input, 31 Aug meeting), D2 7.3, ScreenAudit CHI 2025.
6. **Deploy mechanics.** What our own repo now demonstrates: Firebase/Vercel deploy, secrets documented in docs/local-setup.md for handover, preview deployments on PRs (PR #9 got one automatically). Rings/canary from slice 1 Stage 8 as the scale-up story. Sources: Zafir's deploy work, Microsoft SDP, DORA.

## 4. What slice 2 adds beyond slice 1

Slice 1 already lists three mechanics per stage, so slice 2 must not restate them. The additions: full worked sequences (issue to merged PR, end to end, using our repo's actual commands), the failure modes at each gate, Leon's design-system enforcement module (absent from slice 1, which flagged the brand half as source-silent), and the spike data once Zafir's INF-6a timings land (generating time vs reviewing time per task, the ratio Sidney's template asks for).

One more thing slice 2 adds, taken from D1: every gate in every module is labelled with the mechanism that holds it. Slice 1 now carries the rule (the mechanism ladder under "Reading the colours"); slice 2 applies it. A gate is a hook, a CI check, or a human. If a module's only gate is a skill or a CLAUDE.md instruction, that is written down as no gate.

## 5. Inputs

| Input | Status |
|---|---|
| Slice 1 spine (stages 5-8 sections) | merged material, PR #9 |
| D2 v2 sections 4.2, 4.5, 7.3 | done |
| Zafir's Google note s2.2-2.4 (Critique, TAP, Rapid mechanics) | merged |
| Chirag's Microsoft note s4 (SDL development/testing mechanics) | merged |
| Sidney's D1 certification report s2.4, s3, s6 (`docs/reports/D1-claude-certification.md`, branch `docs/D1_claudeReport`) | drafted, PR pending; cite by section, re-check when merged |
| Our repo: GIT-WORKFLOW.md, TESTING.md, CI-CD.md, deploy PR #14 | in repo |
| Zafir's spike log timings | not started, do not block on it; leave a marked slot |
| Leon's colour write-up | offered 31 Aug, chase; leave a marked slot |

## 6. What can start today

The module skeletons and modules 1, 2, 5 and 6 are writable now from merged material plus the meeting record. Module 3 and 4 need a re-read of the two source notes but nothing new. Nothing in slice 2 is blocked on another person; the two marked slots (spike timings, Leon's write-up) get filled when they arrive and the slice does not wait for them.

## 7. Constraints

Same as slice 1: Conventional Commits, `docs:` prefix, branch from `main`, cite every mechanic, plain Markdown. Plus Leon's presentation note from the 31 Aug meeting, which applies here even more than to the spine: every module opens with a plain-English worked example (a human story: "a junior dev picks up issue #41...") before the command detail.
