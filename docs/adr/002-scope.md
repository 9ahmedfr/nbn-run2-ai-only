# ADR-002: Stages 6 and 7 in full depth, stages 5 and 8 to their handoffs, stages 1 to 4 assumed

**Status:** Proposed
**Date:** 20 Sep 2026
**Deciders:** Sidney Zeng (proposer). Ahmed Falulur Rahuman, Zac Clarkson, Zafir Hasan and Chirag Wadehra (agreed)
**Consulted:** Leon Gouletsas (supervisor guidance that scope must narrow, recorded in `PROJECT-LOG.md`). Alessio Bonti, client (17 Sep 2026: heard stages 5 to 8 on team-structure grounds and raised no objection)

---

## Context
The client brief of 15 August asks for an operational manual that takes a feature request to production, a demonstration run through that lifecycle, a governance and token model, and a learning path. Sprint 1 produced the lifecycle map (D4): the eight stages from D2, 44 tasks, colour set at task level.

| Stage | Baseline colour (D2) | After Sprint 1 |
|---|---|---|
| 1. Ideation and business case | Red, with an AI first draft at amber | No change proposed |
| 2. Requirements and discovery | Green | Amber proposed (slice 1) |
| 3. Solution design and architecture | Red; amber if context improves | Confirmed (slice 1) |
| 4. UX design and prototyping | Green for journey mapping, red for brand and design | Journey mapping to amber proposed |
| 5. Development planning | Amber | Confirmed (slice 1) |
| 6. Development and build | Amber | Confirmed (slice 1) |
| 7. Testing and QA | Amber | Confirmed (slice 1) |
| 8. Deployment and iteration | Not reached at the workshop | Amber for execution, red for incident judgement proposed |

These facts shaped the decision:

- **Depth.** A real stage holds ten to fifteen items. D4 averages five or six per stage. Specifying all eight stages at operational depth is not possible for five people in the two sprints left.
- **Supervisor guidance.** Narrow the scope, say why, and state that the earlier stages are assumed to have been handled well. The reasoning is assessed, not only the choice.
- **Evidence.** The published evidence the team found is almost entirely about code. Both developers independently found human approval gates to be the load-bearing mechanism at Google and Microsoft. Slice 1 confirmed stages 5 to 7 against that practice; stage 8 could only be classified from external evidence, because the workshop never reached deployment.
- **Existing research.** Slice 2 researched stages 5 to 8 at operational depth in six build modules. Stages 1 to 4 have no equivalent.
- **The team's own practice.** Two of the team's three findings sit in stage 6: no commit carried AI attribution, and a branch rule requiring two approvals targeted no branches, so pull requests merged with none.
- **Environment.** Unlike the workshop, the team has a live pipeline: the RMIT Garage boilerplate deployed on Vercel, with CI on every pull request. Stage 8 can be demonstrated rather than inferred.
- **Demonstration.** The proof-of-concept has to take one feature through the chosen stages in Sprint 2 Week 3.
- **Client tooling.** On 17 September 2026 Alessio advised that NBN has standardised on GitHub Copilot, so the specifications and the demonstration use Copilot rather than Claude Code. The stage choice is unaffected: the gates sit in the platform, not in the assistant.
- **Audience and deadline.** The same meeting set the learning path at junior developers and raised an NBN workshop in October that may use this material.
- **External reference.** Anthropic's AI-Native SDLC Playbook, published 21 August 2026, places 9 of its 12 plays in build, test and deploy, and locates the bottleneck in planning, review and deployment once build speeds up.

## Options considered
### Option A: Stages 5 to 8 in full

The case first made during Sprint 2 planning.

- Pro: slice 2 already covers these stages, and the demonstration runs from planning to production.
- Con: four stages at ten to fifteen items each is 40 to 60 specified tasks, more than two sprints hold. Half the lifecycle does not read as narrow.

### Option B: Stages 5 to 7
- Pro: narrower. All three were walked at the workshop and confirmed by slice 1.
- Con: stops before production, which the client brief asks for, and leaves the live pipeline and the proposed stage 8 colours untested.

### Option C: Stages 6 and 7 only
- Pro: the narrowest option, and where the evidence and the team's own findings concentrate.
- Con: no defined entry or exit. The demonstration could not show what the agent is handed or what happens once the change ships.

### Option D: Stages 6 and 7 in full, stages 5 and 8 to their handoffs
- Pro: keeps the depth of Option C while completing the journey from an agreed story to production. Each end adds only the tasks the demonstration exercises.
- Con: the line at each end has to be stated precisely. Prioritisation and incident response are named but not specified.

### Option E: Stages 1 to 4
- Pro: less crowded ground than code generation, and it holds most of the baseline's red classifications.
- Con: little published evidence about AI in these stages, and no operational research yet. The demonstration could not show a feature reaching production.

### Option F: Do nothing
Keep all eight stages at D4's current depth.

- Pro: matches the full lifecycle in the client brief, with nothing left out.
- Con: five or six items per stage where a real stage holds ten to fifteen. Broad and shallow, in a field the whole industry is working on.

## Decision
We will specify stages 6 and 7 in full, specify stages 5 and 8 only as far as their handoffs, and assume stages 1 to 4 were handled well.

| Stage | Depth | Why |
|---|---|---|
| 5. Development planning | **To the handoff:** from an agreed story to an agent-ready issue, including an approved implementation plan. Prioritisation (MoSCoW) and story-to-role assignment are assumed. | The issue is what the agent is handed, so its quality decides what gets built. Slice 2 Module 1 covers it. |
| 6. Development and build | **Full** | AI writes the code here. The published evidence concentrates here, and so do two of the team's own findings. |
| 7. Testing and QA | **Full** | The workshop left "are all the tests correct?" open, and an agent that writes both the code and its tests passes its own tests. |
| 8. Deployment and iteration | **To the handoff:** from an approved merge to a verified deployment, and how it is rolled back. Iteration and incident response are named, not specified; incident judgement stays with a person. | The brief ends at production, and the team's live pipeline means this stage can be demonstrated rather than inferred. |

Full depth means every task carries its steps, its gate and the mechanism that holds it (hook, CI check or human, per D1 section 3), its failure mode, a worked example, and how a team would know it was done successfully.

Because the evidence and the accountability risk both concentrate where AI writes and ships code, and the demonstration has to show one feature going from request to production. Stages 6 and 7 are where both hold. Stages 5 and 8 come in only as far as that journey needs.

### Stages assumed
Each statement is what the stage must have produced. Together they form the entry gate to stage 5: work that arrives without all four goes back, and this manual does not cover producing them.

| Stage | Handled well means | Proof-of-concept stand-in |
|---|---|---|
| 1. Ideation and business case | A business case a named person approved: the problem, who it is for, and the expected value. An AI first draft is acceptable; the approval is human. | The feature agreed with Alessio ([DD Mon YYYY]) |
| 2. Requirements and discovery | User stories with acceptance criteria that someone other than the author can check, and open questions recorded rather than guessed. | Requirements pass 3 and its Given/When/Then criteria |
| 3. Solution design and architecture | Architecture and technology decisions recorded with a human approver, including the constraints the build must respect. | ADR-001 (stack) and this record |
| 4. UX design and prototyping | Journey maps agreed, and brand and design decisions made by a person. Where the feature has an interface, an approved design to build against. | The boilerplate's existing interface; no new design work |

### D3 modules
| Module (source) | Treatment | Where it lands |
|---|---|---|
| Issue to branch (slice 2, Module 1) | Full, at the stage 5 to 6 handoff | Code generation specification (Sprint 2) |
| How a commit is done (slice 2, Module 2) | Full | Git commits specification (Sprint 2) |
| How branches become merges (slice 2, Module 3) | Full | Git commits specification (Sprint 2) |
| How harnesses are used (slice 2, Module 4) | Full | Testing and verification module (complete) |
| Design-system enforcement in build (slice 2, Module 5) | Named, not specified | Testing module, as one harness. It enforces stage 4 decisions, which are assumed. |
| Deploy mechanics (slice 2, Module 6) | To the stage 8 handoff | Infrastructure specification (Sprint 3) |
| Collaboration patterns (slice 3, Module 1) | Context only | White paper framing. It describes how the workshop teams organised, not a gated task. |
| Guardrails by mechanism (slice 3, Module 2) | Across stages 5 to 8 | Governance and token model |
| Token accounting (slice 3, Module 3) | Across stages 5 to 8 | Recorded in the proof-of-concept; analysed in Sprint 3 |
| Liability, provenance and authorship (slice 3, Module 4) | Across stages 5 to 8 | Governance and token model, and the repository fixes |
| Prompt practice (slice 3, Module 5) | Full, across stages 5 to 7 | Prompt practice specification (Sprint 2) |
| Regulatory codification (slice 3, Module 6) | Across stages 5 to 8 | Constraints carried into the governance and token model |

## AI involvement
- **Was AI used to reach this decision?** Yes.
- **If yes:** Claude Opus 5 (claude.ai) drafted this record from the Sprint 2 handover brief, the Planner exports of 15 and 17 September, D2's stage list, the 17 September client meeting transcript and earlier project conversations. It proposed Option D, the "handled well" statements and the module treatments.

## Consequences

**Accepted:**
- The white paper makes no operational claims about AI in stages 1 to 4. It shows them on the map and states the entry gate, nothing more.
- Prioritisation and role assignment (stage 5), and iteration and incident response (stage 8), are named but not specified.
- Design-system enforcement and collaboration patterns get no specifications of their own.
- The colour challenges for stages 2 and 4 still go to Alessio for the map's accuracy, but they do not affect this scope. Stage 8's is in scope.
- D4's design-versus-repository items in the scoped stages (6.2, 6.3, 6.4, 7.5, 8.2) are decided before the build. Item 4.5 sits in an assumed stage and stays open.
- The manual's guidance holds only for work that passes the entry gate.
- The specifications and the demonstration are written for GitHub Copilot. Mechanisms that exist only in Claude Code are named as equivalents, not as requirements.

**Gained:**
- Room for ten to fifteen specified items in each of stages 6 and 7.
- One feature demonstrated from an agent-ready issue to a verified deployment, including the pipeline the workshop never reached.
- Success metrics defined only for the gated steps in stages 5 to 8.
- The assumption about stages 1 to 4 becomes a checkpoint in its own right.

**Phasing:**
- **Sprint 2:** the prompt practice, code generation and git commits specifications; the proof-of-concept build and run; the success metrics; the governance and token model.
- **Sprint 3:** the infrastructure specification; the token and cost analysis from the proof-of-concept; independent verification of the completed demonstration; D3's follow-ups (the Atlassian source note and the Telecommunications Act 1997).

**Reversal cost:** Moderate. Dropping the bounded ends later is cheap. Adding any of stages 1 to 4 needs research the remaining sprints cannot absorb.

## Revisit when
- Alessio amends or rejects this scope.
- The proof-of-concept cannot reach a verified deployment by the end of Sprint 2. Stage 8 then drops to named, not specified.
- The developer interviews show the failures practitioners care about sit mainly in stages 1 to 4.
- A stage 6 or 7 task cannot be specified from published evidence. Record the gap rather than widening the scope.
- The NBN workshop date or audience changes what the demonstration has to show.
