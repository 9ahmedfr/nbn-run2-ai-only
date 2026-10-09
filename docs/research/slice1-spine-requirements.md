# Research Slice 1, the spine: requirements

**Planner card:** [UX] - Desk research, research slice 1, the spine : 240
**Owner:** Zac Clarkson (UX)
**Due:** 26 Aug 2026 on the card, 27 Aug per Sidney's chat comment. Confirm which.
**Status:** Blocked on Zafir (Google) and Chirag (Microsoft) source notes. Skeleton and mechanics can start now.
**Output location:** `docs/research/` in the nbn-sdlc-demo repo, on a `feature/*` branch, draft PR to `main`.

---

## 1. What this deliverable is

One document that takes the eight lifecycle stages, their order, and the red/amber/green classification per stage from D2 v2 (section 4.1) and checks each against the Google and Microsoft source notes. Every stage ends up marked **confirmed** or **challenged**, with the evidence cited.

Nothing is invented. No new stages, no new colours. If the sources disagree with D2, that is recorded as a challenge, not silently changed.

This is the first of three desk research slices. It unblocks Ahmed (requirements pass 1), Sidney (board breakdown for slice 1) and Zac (UX-1 benchmark, lifecycle map).

## 2. Acceptance criteria (from the card checklist)

| # | Criterion | How to satisfy it |
|---|---|---|
| 1 | Committed to `/docs/research` | File lands in `docs/research/` via PR, merged to `main` |
| 2 | Card comment names who it unblocks | On completion, comment on the Planner card tagging Ahmed, Sidney, Zac |
| 3 | At least three concrete mechanics per module (commands, branch names, etc.) | Each of the eight stages lists three specific things a developer actually does or runs, with the source |
| 4 | Committed to `/docs` | Duplicate of item 1 (template leftover). Confirm with Sidney, do not commit twice |
| 5 | Update master doc | Add an entry for this task in the Sprint 1 master doc using the existing entry template |

"Concrete mechanics" is Alessio's 15 Aug clarification: operational depth, "how a commit is done, how branches are made, how harnesses are used", not a diagram-level description.

## 3. Inputs

| Input | Where | Needed for |
|---|---|---|
| D2 v2, section 4.1 (eight stages table) | `D2 - NBN Workshop Review Report (DRAFT v2).docx`, Team Documents folder | The baseline being tested. Reproduced in section 5 below |
| D2 v2, section 4 intro (migration claim) | Same | The amber-to-green migration claim, also part of the spine |
| Zafir's Google source note | `docs/research/` (not yet committed) | Confirm/challenge verdicts, mechanics |
| Chirag's Microsoft source note | `docs/research/` (not yet committed) | Confirm/challenge verdicts, mechanics |
| Source note template | `docs/research/sourceNoteTemplate.md` | Shows which sections of their notes map to which criteria here |

Mapping from their template to this document: their section 2 (lifecycle stages in their words) feeds stage order; sections 3 and 5 (approval gates, where AI appears) feed the colour verdicts; section 4 (mechanics inside each stage) feeds criterion 3; section 7 (borrow) feeds open questions.

If either note comes back with section 4 thin, criterion 3 is still blocked. Check that first when they land.

## 4. Document structure

1. Purpose and scope (three lines)
2. Sources table (D2 v2, both source notes, any primary docs read directly)
3. The migration claim: one paragraph restating it, with verdict
4. Stage-by-stage, one section each, same shape:
   - Stage name and order position
   - D2 v2 classification and Alessio's reasoning (quoted)
   - Verdict: confirmed / challenged, by which source, and why
   - Three concrete mechanics, each with a source citation
5. Order of stages: confirmed or challenged as a sequence
6. Open questions for slices 2 and 3
7. Who this unblocks and what they should take from it

## 5. Baseline from D2 v2, section 4.1 (do not alter, test against sources)

| # | Stage | D2 v2 classification | Alessio's reasoning |
|---|---|---|---|
| 1 | Ideation and business case | Red, with an amber first draft | "Today this stage is almost entirely human." AI drafts the business case; stakeholder alignment and sign-off stay human |
| 2 | Requirements and discovery | Green for the first draft of user stories | Only green in the walkthrough. "Everything that was probably supposed to be invented has already been invented" |
| 3 | Solution design and architecture | Red as delivered, amber if context improves | "If you have a good knowledge of the existing infrastructure, this will probably go down to amber" |
| 4 | UX design and prototyping | Green for journey mapping, red for brand and design decisions | Journey map then usability/accessibility critique. "You are not the user" |
| 5 | Development planning | Amber | MoSCoW, story-to-role assignment, dependency flagging, output to GitHub issues |
| 6 | Development and build | Amber | Issue-driven. Claude Code reads issue, confirms ACs, plans, branches, implements, tests, opens PR |
| 7 | Testing and QA | Amber | Review command runs adversarial pass, human decides, iterates. "Are all the tests correct?" still open |
| 8 | Deployment and iteration | Not reached | Never demonstrated, no environment to deploy to |

Colour definitions (D2 v2 section 4): Red = human decision, judgement and approval. Amber = AI assists, drafts, human approves. Green = AI automates, executes, human monitors.

Migration claim: stages move from red toward green as governance and context improve. Not a static map. Test whether either organisation's published practice supports or contradicts this.

Known gaps to carry forward: stage 8 has no D2 evidence at all, so its colour must come entirely from the source notes or be left open. Stage 4 carries two colours; decide whether that is one stage with a split or should be noted as a challenge.

## 6. What can be done before the source notes land

- Create the branch and the file with the section 4 structure filled from section 5 above
- Read Google's engineering practices docs and Microsoft's engineering playbook directly and draft the three mechanics per stage with citations. When the notes arrive, reconcile rather than start over
- Write one line per stage on why D2 gave it that colour, so the comparison is mechanical
- Open the draft PR so the card can move to In progress

What must wait: the verdict column, empirical paper backing, anything from the "borrow" lists.

## 7. Constraints

- Conventional Commits on every commit (hook enforced). Use `docs:` prefix
- Branch from `main`, never commit to `main`
- Cite every mechanic. Ben's warning from the template applies: a blog post alone does not count
- Keep the document portable Markdown, no embedded binaries

## 8. Definition of done

All five checklist items ticked, PR merged, card comment posted naming Ahmed, Sidney and Zac, master doc entry written, and Sidney has confirmed whether item 4 is a duplicate.
