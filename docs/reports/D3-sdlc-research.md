# D3: SDLC research report. One lifecycle, task-level colours, and the team's position

**Owner:** Zac Clarkson (UX)
**Planner card:** [UX] - Assemble D3 and reconcile the slices : 120
**Status:** Draft for team review, 5 Sep 2026. Branch `docs/d3-sdlc-research`, built on `docs/lifecycle-task-map`.
**Repo path:** `docs/reports/D3-sdlc-research.md`

> What this document is. Sprint 1 produced three research slices, a task-level lifecycle map, a certification report, two vendor source notes and a first requirements pass. Leon's review on 4 Sep was that three separate slices are hard to navigate, and this report is the answer: one narrative that says what we set out to check, what the desk research and the repository inspection found, where we departed from the brief and why, what the lifecycle looks like at task level, which modules the team has agreed to build but has not yet exercised, and where the slices disagreed with each other and how each disagreement was settled. The slices stay on `main` as the evidence record and are cited by path and section; this report does not repeat their citations. Where a fact is stated here without a citation, it is stated with the slice and section that carries the citation.

> What it is not. It is not a re-cut of the evidence and it does not change any colour in the D2 v2 baseline. Every departure from the baseline is a proposal to Alessio, listed in section 10. It also does not carry the developer interviews, because none has been held; section 9 records what that means. It is not a demonstration. No module has been run or measured; the first empirical result is the Sprint 2 benchmark in section 11.

> Status against the card checklist (12 items). Done in this draft: all three slices and their source notes incorporated and attributed (sections 3 to 7, appendix A); comparison table across Google, Atlassian, Microsoft and Anthropic (section 4, with the Atlassian column marked as a D3 desk check rather than a source note); module list as agreed at the 3 Sep reconvene (section 6); collaboration included as a module (6.7); prompt practice included as a module (6.11); every contradiction between slices resolved or recorded as open (section 7); changes to requirements Ahmed already wrote listed for him (section 8); interview status recorded (section 9); audience decision stated with evidence and limits (section 2); closing position (section 11). Left to the process steps after this file lands on `main`: the PR, the master doc entry, the Word copy for Teams.

---

## 1. Summary

The brief gave us an eight-stage software development lifecycle with each stage coloured red, amber or green for how much of it AI should carry. We checked the colours against Google's and Microsoft's published engineering practice, then went inside the build stages at the depth of commands and hooks, then around the stages into collaboration, guardrails, cost, liability, prompts and regulation. The colours did not hold at stage level. Most stages came out amber, the one wholly green stage (first-draft user stories) was challenged by the requirements-engineering literature, and the one stage with two colours (UX) turned out to be how every stage looks once you look inside it. The supervisor review on 4 Sep put it plainly: colour every stage and you get orange everywhere.

So the map moved. Colours now sit on tasks, not stages. Each of the eight stages is expanded into the five to eight tasks that happen inside it, each task carries one colour and one holder, and each stage carries a profile (leans intervention, mixed, leans autonomous) derived from its tasks. The stages themselves are unchanged in name and order, and they are read as concerns that recur throughout delivery. Google's and Microsoft's own practice reads the same way.

Three findings run through everything. First, green means a hook. A task is only green where a deterministic check stands behind the automation, and our own repository showed us the difference between a control that exists and one that is switched on. Second, the shape of every stage is human, AI, human: a red framing task, amber or green generation in the middle, a red decision at the end. Third, the lever that moves a task toward green is context written into the repository, and that is itself a task: documenting the system, committing acceptance criteria, folding production learning back into rules files. The model does not supply it.

The team's position, stated in full in section 11: we are building a task-level lifecycle map with a junior layer first, for developers, testers and architects in organisations of a hundred or more developers, grounded in two NBN stories, with twelve modules behind it. We reject stage-level colours, we reject any rules file or skill as a governance control, we reject synthetic users as a substitute for real ones, and we reject the idea that AI adoption moves a stage toward green on its own.

---

## 2. The brief, the audience, and the decision on both

The capstone brief names four deliverables: a white paper, a practical demonstration, a governance and token model, and a dual-audience learning path for enterprise developers and for juniors or students. Alessio's clarifications on 15 Aug fixed the depth ("how a commit is done, how branches are made, how harnesses are used") and left the audience split as the team's call, with Sprint 1 to end in an opinionated point of view (Sprint 1 plan, section on Alessio's clarifications).

The audience decision. The team is building one lifecycle with two layers, and the junior layer first. The decision was taken in the Sprint 1 plan and is carried into Ahmed's requirements pass 1 as the target user statement: "developers, testers and architects working in organisations with 100+ developers. We are using one shared lifecycle for everyone, with different levels of detail for junior and experienced users. For now, the junior layer comes first" (`docs/requirements.md`).

The evidence for it. The workshop record is the strongest input. Attendees on their second day with the tool invented four working collaboration patterns under time pressure, and D2 v2 reads that as an argument for the practicality of a junior-facing method (slice 3, module 1). The empirical literature points the same way from the other side: gains from AI assistance are measured for greenfield and boilerplate work and negative for expert work on complex mature codebases (slice 1, "Empirical evidence": Peng +55.8 percent on a bounded task, METR minus 19 percent for experienced developers on their own repositories). A junior working on a well-scoped issue is exactly the case where the tools help, and the case where the gates matter most because the person cannot yet judge the output alone. The Anthropic certification the whole team completed uses the same vocabulary (delegation, description, discernment, diligence) and NBN staff who complete it will already have it, which makes the junior layer cheaper to teach than one built on invented terms (D1, section 2.3).

The limits of the decision. Three. The audience evidence is second-hand: no NBN developer has been interviewed, and the interview guide's first question (current tooling) is the one that would confirm or overturn the as-is scenarios in the map (section 9). The junior layer assumes Git and a repository the agent can read; the workshop record says Git is not universal at NBN and requirements live in Jira and Confluence (D2 v2, section 9), so the enterprise layer has to solve a sync problem the junior layer can ignore. And the two source bodies we checked against, Google and Microsoft, describe practice at a scale and with a review culture that a junior team does not have, so their gates are borrowed as targets. They do not describe where NBN is today.

The environment. NBN Co is a wholly owned Government Business Enterprise, wholesale-only, selling to retail service providers and never to end customers, under a regulatory framework the ACCC oversees (map, "Two grounding stories"). That fact shaped the report more than any other single input, because it decides which rules bind (section 6.12) and it gave us the two stories that make every technical feature legible to an NBN reader: technician dispatch with a rebate liability behind it, and change notifications to retailers, which are contractually important where the same notice from a consumer brand would be spam.

---

## 3. The framework as given, and what the desk research found

### 3.1 The baseline

D2 v2 section 4.1 recorded Alessio's eight stages and their colours from the workshop walkthrough. Red means a human decides, judges or approves. Amber means AI drafts or assists and a human approves. Green means AI executes and a human monitors. The migration claim sits beside the table: stages move from red toward green as governance and context improve.

| # | Stage | D2 v2 colour | Alessio's reasoning |
|---|---|---|---|
| 1 | Ideation and business case | Red, amber first draft | "Today this stage is almost entirely human" |
| 2 | Requirements and discovery | Green, first-draft stories | "Everything that was probably supposed to be invented has already been invented" |
| 3 | Solution design and architecture | Red, amber if context improves | "If you have a good knowledge of the existing infrastructure, this will probably go down to amber" |
| 4 | UX design and prototyping | Green journey mapping, red brand and design | "You are not the user" |
| 5 | Development planning | Amber | MoSCoW, story-to-role, dependencies, GitHub issues |
| 6 | Development and build | Amber | Issue-driven agent to PR |
| 7 | Testing and QA | Amber | Adversarial review pass; "are all the tests correct?" open |
| 8 | Deployment and iteration | Not reached | No environment to deploy to |

### 3.2 The verdicts, stage by stage

Slice 1 checked each colour against Google's engineering practice and DORA, Microsoft's SDL and Code With Engineering Playbook, the two source notes, and the peer-reviewed literature. The verdicts, condensed; the evidence is in slice 1 under each stage heading.

| Stage | Verdict on the baseline colour | What decided it |
|---|---|---|
| 1 | Plausible, source-silent | Neither Google nor Microsoft says anything about business-case authorship. Microsoft's Planning phase is the nearest human-owned analogue |
| 2 | Challenged: green to amber | LLM user stories are stylistically comparable to human ones, less diverse, and meet acceptance criteria less often (Quattrocchi et al. 2025); Definition of Ready is a human gate in the playbook |
| 3 | Confirmed, both halves | Google requires an approved design doc before code; Microsoft front-loads decisions into ADRs and puts threat modelling in design. The amber-if-context hedge is supported by Microsoft's design-review economics |
| 4 | Green half challenged, red half confirmed | Synthetic users idealise and fabricate (NN/g 2024, CoMPosT 2023); AI accessibility critique catches about two thirds of expert findings with a real false-positive rate (ScreenAudit 2025); Microsoft Inclusive Design keeps brand and inclusion human |
| 5 | Confirmed | DORA's small-batches capability; agentic PRs bundle purposes at over three times the human rate (Watanabe et al.) |
| 6 | Confirmed, best-evidenced | Google's LGTM and OWNERS, Microsoft's non-author review, GitHub's coding-agent docs all require a human merge gate; field data shows agent and human iterate together |
| 7 | Confirmed, with a hard ceiling | Median 48 percent of LLM-generated tests pass; about half of generated assertions are wrong. The human oracle is structural, not a model-quality limit (D1, section 3) |
| 8 | Classified from external evidence: amber execution, red incident judgement | DORA deployment automation and progressive delivery; Google's role-gated release approvals; Microsoft's ring-based Safe Deployment Process. Unvalidated in the baseline |

Two structural findings came with the verdicts. The stage order holds as a set of concerns and fails as a sequence: Google's own lifecycle has five stages, Microsoft's seven, trunk-based development collapses plan, build and test, and continuous discovery runs the front four stages alongside delivery (slice 1, "The stage order"). And the migration claim is supported in direction and constrained hard: DORA 2025 finds AI amplifies what a team already has, and finds AI adoption still negatively related to delivery stability; Veracode found models chose the insecure option 45 percent of the time; Liu et al. found 24.2 percent of AI-introduced issues still at repository head with security issues the most likely to survive (slice 1, "The migration claim"). A stage moves toward green only where the governance preconditions are present, and a rules file is not one of them.

### 3.3 Inside the build stages

Slice 2 went into Stages 5 to 8 at the depth Alessio asked for, using our own repository as the demonstration. Six modules, each with a story, mechanics, the human gate, the failure mode, and the colour at task level: issue to branch, how a commit is done, how branches become merges, how harnesses are used, design-system enforcement in build, and deploy mechanics. The single most useful thing it produced was not a mechanic but a finding about ourselves. `docs/GIT-WORKFLOW.md` said `main` was protected; the ruleset on GitHub existed, was active, and targeted no branch. Three PRs had merged with zero approvals against a two-approval rule. D1's candidate applications had been written with the push-to-main block and the CI merge gate as live controls; they were not (slice 2, gaps recorded, item 3; D1, section 5). That finding is the reason this report says green means a hook, and then asks whether the hook is switched on.

### 3.4 Around the stages

Slice 3 covered what sits around every stage: collaboration with an agent in the loop, guardrails, token accounting, liability and provenance, prompt practice, and regulatory codification for NBN Co. Its three headline findings shape sections 6 and 11: NBN Co is a corporate Commonwealth entity, so the Commonwealth AI-in-government policy is a model for it and not an obligation; the Voluntary AI Safety Standard's ten guardrails were replaced in October 2025 by six essential practices, the sixth being "maintain human control"; and every governance rule has one of three holders (hook or CI check, human, or nothing), and a policy that names a skill or a rules file as its control has named nothing.

---

## 4. The comparison: Google, Atlassian, Microsoft, Anthropic

The brief asked for a benchmark across the four. Two have full source notes (Zafir's Google note, Chirag's Microsoft note), both reconciled into slice 1 stage by stage. Anthropic is covered by D1 (the certification is the Anthropic source) and by the Claude Code documentation slices 2 and 3 fetched and verified. Atlassian had no source note and no time was allocated to one; the column below is a desk check done for this report on 5 Sep 2026 from four Atlassian pages, listed in appendix B with what was verified, and it stands in for a Sprint 2 source note. It is thinner than the other three columns and the cells say so. Each cell says where the fact comes from.

| Dimension | Google | Atlassian | Microsoft | Anthropic |
|---|---|---|---|---|
| Lifecycle as published | Five stages: design, development, testing, deployment, maintenance. Described across eng-practices, the SWE book and the SRE book (Google note, s2) | No lifecycle document of its own. Publishes workflow tutorials (feature branch workflow: "all feature development should take place in a dedicated branch instead of the main branch") and product guidance (Rovo Dev) | Seven stages: planning, analysis, design, development, testing, deployment, maintenance (Microsoft note, s2) | No lifecycle. Publishes a tool (Claude Code) with an Explore, Plan, Code, Commit workflow and a customisation model of CLAUDE.md, sub-agents, skills, MCP and hooks (D1, s2.5) |
| Gate before code is written | Approved design document, reviewed and debated before any code review; domain experts sign off on their sections (Google note, s2.1, s3) | Not documented in the pages checked | SDL: security and privacy requirements defined by the team at the front; threat model in design, reviewed before release (Microsoft note, s3, s4) | Plan Mode and the plan command, which routes to a stronger model; a human confirms the plan before code (D2 v2 s4.2; map, task 6.1) |
| Gate before merge | No CL submits without a human LGTM; OWNERS files add a directory-level second approval; disagreement escalates through a defined human chain (Google note, s3) | Pull requests "give other developers the opportunity to sign off on a feature before it gets integrated"; Rovo Dev's reviewer comments on the PR and "the final decision to accept or decline a suggestion rests solely with the human reviewer" (appendix B) | Review "by someone other than the engineer who wrote the code" before check-in to a release branch; final security and privacy review before release (Microsoft note, s3) | No server-side rule. Human review of agent output is taught as the Discernment competency; separation of duties (an agent may surveil another agent, "definitely not itself") is a team agreement with no mechanism behind it (D1, s2.3, s3; slice 2, M3) |
| Deploy gating | Role-gated approvals for source changes, build proposal, cherry-picks and "authorizing the actual deployment"; rollout pace matched to service risk; human on-call and blameless postmortem (Google note, s2.4, s3) | Not documented in the pages checked | Safe Deployment Process: rings from the development team out to all customers; rollback strategies required before deploying (Microsoft note, s4) | Not in scope of the tool. A command (human-fired) is the mechanism D1 places at the deploy decision (D1, s5, item 7) |
| Where AI appears in the published practice | Nowhere in the lifecycle sources; the automation is deterministic (TAP, Rapid, Sisyphus). AI evidence comes from external papers on public repos (Google note, s4, s5) | In review: an AI reviewer that comments on PRs, filtered by an LLM judge and an actionability model; Atlassian reports a 30.8 percent reduction in median PR cycle time across more than 1,900 internal repositories (vendor, self-reported, April 2026; appendix B) | Described as efficiency across the lifecycle with examples of plans, code and PRs; not assigned to stages; automated security tooling is not described as AI (Microsoft note, s5) | Everywhere the tool is pointed, which is the point: the certification's job is to say where each mechanism stops (D1, s3) |
| What we borrowed | Small-CL discipline applied harder to agent PRs; the design-doc habit extended to delegated tasks as a confidence card (Google note, s6) | The PR as the unit of review and discussion, which our repository already runs | Independent human approval before release; automated verification plus human review, never either alone; gradual deployment (Microsoft note, s7) | The mechanism ladder: a hook can enforce, only a human can judge, everything else shapes (D1, s3). The 4D vocabulary (D1, s2.3) |
| What we rejected | Delegating regardless of task type: task type predicts acceptance far better than which agent did the work (Google note, s7, Pinna et al.) | Nothing; the column is too thin to reject from | Assuming functional code is safe code: about 30 percent of AI snippets carried a weakness and Copilot Chat fixed at most 55.5 percent (Microsoft note, s6, s8); applying AI uniformly to every stage | A skill, a rules file or a sub-agent as a control (D1, s3) |
| Source strength | Official documentation plus three peer-reviewed or preprint empirical studies | Vendor documentation and a vendor blog; no independent evidence | Official documentation plus two peer-reviewed empirical studies | Vendor training and documentation; internal certification record |

What the table says when read across. All four keep a human before merge, and the three that document deployment keep a human before production. None of the four assigns AI to a stage; the two that describe AI at all (Microsoft, Atlassian) describe it as a reviewer or an assistant that a person overrules. They disagree about stage count and agree about gates, which is the recurring-concerns finding from a fourth direction. And the only vendor to publish a productivity figure for AI review (Atlassian's 30.8 percent) is the same shape as GitHub's self-reported authoring gains in slice 1: internal, and measuring cycle time, where defect detection is the quantity the Amro and Alalfi preprint measured and found wanting.

---

## 5. The pivot: the lifecycle at task level

This section is the map chapter. The full text, with a how-it-would-work paragraph and an as-is scenario for every stage, is `docs/research/lifecycle-task-map.md`; what follows is the profile and the task table for each stage, so that a reader of this report has the whole map in one place, plus the departures from the baseline stated on the row where they occur.

### 5.1 Why we departed from the brief

Slice 1 found most stages amber. The 31 Aug review added that one stage can hold green copy and red decisions at the same time, so colours belong to tasks. The 4 Sep review took that to its end: once the task view exists, the stage banner adds nothing ("otherwise you're just going to have orange everywhere, for every stage gate"), and the team should say so. Three presentation changes follow, each a proposal to Alessio: stage banner colours are removed and replaced by a profile line; every stage is expanded into its tasks, each with a colour, a holder and a gate; every task has a worked example and every stage an as-is scenario (map, "What changed").

### 5.2 How to read a row

Colour is the delegation decision for the task, on the D2 v2 definitions. Holder is the mechanism that carries it, from D1 section 3: a human decision or a human-fired command is red territory; a skill, rules file or sub-agent drafting is amber; green is defensible only where a hook or an equivalent deterministic check (a CI job, a design-system constraint) stands behind the automation. Two general rules apply to every row: the anchor rule (start from what is known to be real, let AI generate only in the gaps deliberately left open, research every generated hypothesis before treating it as real) and the exposure rule (verification rigour scales with exposure, from internal concept to customer-facing production asset). Both are practitioner input from the 31 Aug review and are consistent with the NN/g hypothesis-map guidance and the Veracode and METR cautions in slice 1.

### 5.3 The two stories

Every example on the map runs on one of two grounded NBN scenarios, plus the workshop's fault-reporting exercise as the base case (map, "Two grounding stories").

Story A, technician dispatch. A retailer raises a request through the maintenance portal for a technician at a customer premises; the system matches fault to technician and equipment and schedules the visit. Under the enforceable undertaking NBN Co gave the ACCC on 11 September 2018, NBN Co pays a $25 rebate for every late connection or fault rectification and a $25 rebate for each missed appointment. A scheduling defect is a rebate liability with a regulator behind it.

Story B, retailer notifications. NBN Co is wholesale-only. When it changes a service, schedules maintenance or updates an API, the people who need to know first are the retailers' engineering, sales and legal teams. The same undertaking commits NBN Co to faster reporting to retailers on service performance. Story B is a notification and API-documentation pipeline for retailers.

Four assumed business rules sit under the stories, written as rules a tool chain could check and marked to verify in the interviews: A1, every appointment has a committed window and a missed window is a reportable event with a rebate; A2, service-affecting changes are notified to affected retailers before the change with an audit trail; A3, some code bases and the retailer-facing API documentation are subject to external review, so their change history has to be readable outside NBN; A4, at the workshop Alessio asked people not to put the NBN name or company material into the personal AI accounts in use, and not to put company secrets into Claude, which is a rule about the account rather than the tool, with whether an enterprise account changes it and which systems if any are off limits left as interview questions (A4 is observed in D2 v2 section 9 with that narrow scope; A1 to A3 are assumptions).

### 5.4 The eight stages

**Stage 1, Ideation and business case. Profile: leans intervention.** Baseline red with an amber first draft; sources silent. At task level the framing and the decision are human and the divergent drafting between them is where the automation lives. Task structure from Leon's description of how the stage runs and from the GV Design Sprint's Monday (map, "Google's Design Sprint as a task scaffold").

| Task | Colour | Holder |
|---|---|---|
| 1.1 Frame the brief: context, goals, what is troubling, what is on the horizon | Red | Human |
| 1.2 Contextual inquiry: narrow from organisation to team to process | Amber | AI drafts the environment scan, human selects |
| 1.3 Generate divergent business-case options with industry examples | Green | AI generates, human monitors |
| 1.4 Back the preferred option with evidence | Amber | AI compiles and cites, hook verifies citations, human runs interviews |
| 1.5 Refine, align stakeholders, sign off | Red | Human |

Departure: 1.3 is green where the baseline had an amber draft, because generating options for internal comparison is the exploration case the 31 Aug review called green and nothing ships from it. The moment one option is chosen and evidence attached, the work is amber then red.

**Stage 2, Requirements and discovery. Profile: mixed.** Baseline green for first-draft stories; slice 1 challenged it to amber. The task view dissolves the disagreement: drafting is green, the Definition of Ready gate is red, and the workshop and the literature were describing the same stage from different rows. Leon on 4 Sep: for drafting stories you can be AI-forward, but at the end you verify against the Definition of Ready.

| Task | Colour | Holder |
|---|---|---|
| 2.1 Fix the anchor set: known users, tasks, pains, existing evidence | Red | Human |
| 2.2 Draft user stories from the anchor set | Green | AI generates, human monitors |
| 2.3 Draft acceptance criteria and the out-of-scope list per story | Amber | AI drafts, human edits |
| 2.4 Verify against the Definition of Ready, prioritise, accept | Red | Human |
| 2.5 Commit accepted stories and criteria to the repo as Markdown | Green | Hook (CI check that the file exists and parses) |

**Stage 3, Solution design and architecture. Profile: leans intervention, with the largest amber-if-context lever in the lifecycle.** Baseline red as delivered, amber if context improves; both halves confirmed. The lever is task 3.1: the better the documented context, the more of 3.2 and 3.5 the AI can carry.

| Task | Colour | Holder |
|---|---|---|
| 3.1 Document the existing system: infrastructure map, APIs, patterns | Amber | AI reads and drafts, human corrects |
| 3.2 Generate candidate architectures against the approved tool list | Amber | AI drafts three to five options, human selects |
| 3.3 Trade study and architecture decision record | Red | Human |
| 3.4 Threat model, security and privacy requirements | Red | Human, AI-assisted checklist |
| 3.5 Technical spike on the riskiest unknown | Amber | AI agent runs the spike, human reads the log |

**Stage 4, UX design and prototyping. Profile: mixed, and deliberately split.** Baseline green journey mapping, red brand and design; the green half challenged to amber, the red half confirmed and sharpened by both supervisor reviews into a deterministic rule. This is the team's own stage.

| Task | Colour | Holder |
|---|---|---|
| 4.1 Fix the anchor set: known users, historical evidence, known tasks and pains | Red | Human |
| 4.2 Hypothesis journey map and proto-personas in the gaps left open | Amber | AI drafts, human researcher validates |
| 4.3 Skeleton screens straight from the acceptance criteria | Green | AI generates, human monitors |
| 4.4 Brand and design-system decisions | Red | Human; the design system is the rule set |
| 4.5 Brand compliance check by overlay diff | Green | Hook (design-system CSS overrides generated CSS; visible shift fails) |
| 4.6 Usability and accessibility critique | Amber | AI first-pass triage feeding a human expert |
| 4.7 Inclusion decisions, including First Nations inclusive-design policy | Red | Human; codified as a hard limit before design starts |
| 4.8 Test with real users | Red | Human; synthetic users not a substitute |

What we chose not to do, as design. Because accessibility is a hard requirement at NBN (Siteimprove in use, WCAG 2.2 AAA treated as part of done, screen readers), the design system the agent generates against has less motion, no auto-dismissing pop-ups, no information carried by colour alone, and a keyboard path through every flow, and those choices are enforced in 4.5 rather than reviewed in 4.6. On story A the technician-matching screen shows the equipment requirement as text and an icon, never as a coloured badge alone.

**Stage 5, Development planning. Profile: mixed.** Baseline amber, confirmed. The most important row is the one the workshop put the most weight on: writing the issue properly, because the out-of-scope list is what prevents the thirty-five-file change.

| Task | Colour | Holder |
|---|---|---|
| 5.1 Slice the work into minimal, single-purpose issues | Amber | AI proposes, human adjusts |
| 5.2 Prioritise, assign to roles, flag dependencies and complexity | Amber | AI drafts, human edits |
| 5.3 Write each issue properly: acceptance criteria and out-of-scope list | Red | Human (the instructing role) |
| 5.4 Commit the sprint plan | Red | Human |
| 5.5 Push the issues into the repo host | Green | Hook (issue template validation) |

**Stage 6, Development and build. Profile: leans autonomous, with a red gate at the end.** Baseline amber, confirmed as the best-evidenced stage. Slice 2 modules 1 to 3 carry the operational detail.

| Task | Colour | Holder |
|---|---|---|
| 6.1 Agent reads the issue, confirms each acceptance criterion, plans | Amber | AI plans, human confirms |
| 6.2 Branch, implement, commit | Green | AI executes; hooks enforce lint, format, conventional commit, secret scan |
| 6.3 Open a draft PR with description and provenance | Green | AI executes; hook checks the provenance trailer |
| 6.4 Human code review and merge approval | Red | Human, not the author; CI green |
| 6.5 Iterate on review comments | Amber | AI revises, human re-reviews |

Carried from the map: 6.3's trailer is not enforced in our repository and 6.4's merge gate rests on a ruleset that targets no branch, so today 6.3 is amber in practice and 6.4 is a convention. Both are recorded as gaps and the colours describe the design.

**Stage 7, Testing and QA. Profile: mixed, with a hard ceiling.** Baseline amber with the open question "are the tests correct?"; confirmed, and the open question is validated by measurement. Slice 2 module 4 has the mechanics.

| Task | Colour | Holder |
|---|---|---|
| 7.1 Generate unit tests alongside the change | Amber | AI writes, human reads |
| 7.2 Run the CI suite: lint, typecheck, unit tests, audit | Green | Hook (CI) |
| 7.3 Adversarial review pass by a separate agent | Amber | Sub-agent reviews, human decides on findings |
| 7.4 Judge whether the tests are correct | Red | Human, with mutation-style tooling as evidence |
| 7.5 Security scan and dependency audit | Green | Hook (CI) |

**Stage 8, Deployment and iteration. Profile: leans autonomous for execution, intervention for judgement.** Baseline not reached. Classified from slice 1's external evidence, slice 2's deploy mechanics and slice 3's SOCI finding; marked unvalidated on the map.

| Task | Colour | Holder |
|---|---|---|
| 8.1 Preview deployment on every PR | Green | Hook (CI, hosting platform) |
| 8.2 Progressive rollout: flags, canary rings, metric-gated automatic rollback | Green | Hook (rollout controller) |
| 8.3 Production promotion approval | Red | Human (release owner; regulated where SOCI applies) |
| 8.4 Monitoring and alert triage | Amber | AI summarises signals, human decides |
| 8.5 Incident response and post-incident review | Red | Human |
| 8.6 Fold the learning back into context: rules files, skills, design system, ADRs | Amber | AI drafts the update, human approves |

Story B lives here: a service-affecting change (A2) triggers a notification to affected retailers before the ring rollout begins, drafted from the PR and the change record, approved by a human, sent through a channel that logs delivery; the notification, the API-documentation publish and the deploy are one release event under 8.3's approval. Story A: the rebate-relevant scheduling change rolls out to one ring first, and the metric the rollback watches is missed-appointment rate, because that is the number the undertaking prices.

### 5.5 Reading across the stages

Three patterns hold in every stage once the colours sit on tasks. The shape is human, AI, human. Green means a hook, and where the hook is not in force in our repository the row says so. The migration lever is context, and it is a task: 3.1 in design, 2.5 in requirements, 8.6 in iteration, each writing what a human learned into a file the next generation reads from. That is the operational meaning of Alessio's "context is the output", and it is what the map points at when someone asks how a stage gets greener (map, "Reading across the stages").

---

## 6. The modules

The module list below is the twelve modules of slices 2 and 3 as written, agreed by the whole team at the 3 Sep reconvene without change. Each entry gives what the module is, the gate mechanism per D1 section 3, where it lands on the map, and the one thing it changed in the team's thinking. The full treatment (story, mechanics, gate, failure mode, colour) is in the slice cited.

### Build modules (slice 2)

**6.1 Issue to branch.** The issue and a committed acceptance-criteria file are the two artifacts that exist before any agent touches anything; prompts point at the file by name. Gate: human (Definition of Ready is a checklist a person walks). Map: 5.3, 6.1. What it changed: the pattern came from the workshop floor, and it is the one that makes Git the shared memory the chat tool does not provide.

**6.2 How a commit is done.** Conventional Commits enforced by a lefthook commit-msg hook; one logical change per commit as a human rule with the reviewer as its check; the co-author trailer as the smallest provenance record. Gate: hook for format, human for size and boundary. Map: 6.2. What it changed: every commit on our `main` had a human author and no trailer, so the "live example" the requirements named was a live example of absence.

**6.3 How branches become merges.** PR template, four CI jobs, non-author approval, the agent answering review comments on the same branch; what a reviewer checks first on an agent diff (does it match how we already do this, is it one change, did it update what it touched, and only then correctness). Gate: CI check and human. Map: 6.3, 6.4, 6.5. What it changed: branch protection was documented and not in force, and the reconciliation in section 7 starts there.

**6.4 How harnesses are used.** Two hook layers (git and agent), the deny list, CI, mutation testing as the operational answer to "are the tests correct", and two sub-agents that are assists and not gates. Gate: hook, CI check, human for adequacy. Map: 7.1 to 7.5. What it changed: the green suite that tests nothing is the specific failure a sub-agent cannot catch because it would write the same test.

**6.5 Design-system enforcement in build.** Tokens as the rule set, the overlay-diff check as a Playwright visual comparison, the axe scan, the accessibility skill as the amber assist beside it, and the regulatory rule placed ahead of design. Gate: CI check (screenshot diff, axe) and human (the designer, who now reviews a diff rather than a screen). Map: 4.4 to 4.7. What it changed: generation is the wrong tool for enforcing a deterministic system, and the fix for the workshop's wrong colours went into the context instead of the slide.

**6.6 Deploy mechanics.** Merge is deploy in our setup because the hosting platform has no gate of its own; the Firestore rules workflow is renamed out of use; rollback is a person promoting a previous deployment. Gate: human (merge approval, manual rules deploy, revert) and CI check. Map: 8.1 to 8.3. What it changed: the last human decision before production in this repository is the PR approval, which is a reason to take module 6.3 more seriously than the branch rule alone suggests.

### Governance modules (slice 3)

**6.7 Collaboration with an agent in the loop.** The four patterns the workshop teams invented (acceptance criteria as a shared artifact in version control, the screenshot as the specification, skeleton first then pipeline the pages, a review finding encoded as a skill), each with the NBN constraint it has to survive, and the sharing mechanism D1 shows is taught and not used. Gate: human throughout; the accessibility skill is an assist and the axe scan behind it is the CI check. Map: 2.5, 4.3, 4.6, 8.6. What it changed: parallelism came from the repository, and the team that pipelined its pages paid for it in review time, which is the decision-load problem and the reason this module needs 6.8 and 6.9 around it.

**6.8 Guardrails, what holds and what only shapes.** Every control named in a governance document states its holder; a document that names a skill or rules file as a control is sent back. Separation of duties widens coverage without certifying anything. Every rule added to CLAUDE.md costs working context and decays with session length, so anything that must hold moves into a hook, where it costs no context. The regulator says the same thing once: "maintain human control", matched to autonomy and stakes. Gate: hook and CI check for pattern-matchable rules, human for judgement, an explicit "no gate" label for anything that lives only in a prompt. Map: every row's holder column. What it changed: the one test a junior needs for any rule in a policy is "if the model ignores this, what happens?"

**6.9 Token accounting and cost.** Three numbers per task in the spike log: generating time, reviewing time, tokens consumed. Alessio's rule of chat during exploration and documents only at handover. A register that records who owns each AI use and what it consumes per task, which satisfies both the Commonwealth policy's register requirement and the Guidance for AI Adoption's, and answers the brief's governance and token model. Gate: human; the platform's quota limit is the only hard stop and it arrives with no warning. Map: 3.5 (the spike). What it changed: the certification says nothing about cost (D1, section 6), so this module is built from the workshop record and the team's own spike, and the review-time figure is what makes the decision-load problem visible instead of a speed-up that reviewers paid for.

**6.10 Liability, provenance and code authorship.** Accountability in the vocabulary we already have (Diligence; "decide who is accountable"). Provenance from smallest to largest: the trailer, the confidence card on the PR (plan, assumptions, alternatives, known edge cases), the nutrition label (model, prompt, configuration) that does not exist anywhere yet. Responsibility runs past merge. Authorship stated as four names: committer, agent co-author, non-requesting approver, accountable owner in the register. Copyright and licence in agent-written code recorded as open for counsel. Gate: human, backed by one hook the repository could add in an afternoon (a commit-msg check that refuses an agent commit without a trailer). Map: 6.3, 6.4. What it changed: none of the mechanics is switched on in our repository today, and that is the gap the team should be embarrassed by before Alessio is.

**6.11 Prompt practice: written, stored, versioned, shared.** Written: the describe, evaluate, refine loop; Alessio's taught practices (write the issue properly, state what is out of scope, ask for options at design stages, context is the output); Anthropic's precondition that success criteria and a way to test against them exist first. Stored: a prompt that matters is a file, and our repository has five kinds (CLAUDE.md, skills, agent definitions, the PR template, acceptance files). Versioned: because they are files they go through the same PR and review as code. Shared: project skill, then plugin, then nothing, and the enablement gap at NBN is the distance between the last and the first. Gate: human review on the PR and the CI check that already runs on every file. Map: 5.3, 8.6. What it changed: the thirty-five-file change and the prompt that worked once and was never seen again are the same failure, the absence of the file.

**6.12 Regulatory codification for NBN Co.** What binds NBN Co as of 2 Sep 2026 and the holder for each rule. NBN Co is a corporate Commonwealth entity, so the Commonwealth policy for responsible AI in government (v2.0, effective 15 Dec 2025) is the model, not an obligation; the Voluntary AI Safety Standard was superseded on 21 Oct 2025 by six essential practices. Seven rules, each with its holder: no personal or sensitive information into a public model (Privacy Act, OAIC: hook where the pattern is known, human for the rest); an accountable owner and register entry per use case (human); meaningful human oversight matched to autonomy and stakes (the map itself, human, with CI as the floor); deploys to critical-infrastructure assets inside a written risk management program with incident reporting (SOCI Act: human); WCAG AA minimum, AAA where NBN already sets it (DDA, AHRC: CI check plus human); First Nations audiences, generated artifacts are hypotheses until validated with the community (Stretch RAP VI 2026 to 2029, the First Nations Digital Inclusion Plan: human, and a system-prompt line saying so); security and resilience integral to operations (Statement of Expectations: CI check plus human). Two of the seven can be held wholly or partly by a hook or CI check; five are held by people. Gate: human for five, hook or CI check for two. Map: 4.7, 8.3, and the A4 assumption. What it changed: the first thing on the list of what binds NBN Co is an absence, and a governance document that cites the Commonwealth policy as an obligation will be corrected by the first lawyer who reads it.

---

## 7. Reconciliation: where the slices disagreed, and what was decided

The card's note is right that the reconciliation is the real work, because the map inherits every contradiction not caught here. The list below is every place two team documents say different things, with the resolution or, where D3 cannot settle it, the open question and who owns it. Items 1 to 5 are the list slice 3 handed over; the rest were found in assembling this report.

| # | The contradiction | Resolution |
|---|---|---|
| 1 | Slice 1 recommends Stage 8 as amber execution. Slice 2 module 6 calls deploy execution green in our repository because there is no judgement in it. Slice 3 module 6 says execution for assets under the SOCI Act cannot be greener than amber whatever the repository does | Resolved at task level. 8.1 and 8.2 are green only behind a deterministic controller (preview, flags, rings, metric-gated rollback); 8.3 promotion is red everywhere and regulated where SOCI applies. For our demo app the execution is green because the platform is deterministic; for a registered asset it is amber at best. All three documents were describing different rows |
| 2 | Slice 2 module 2 records that no commit on `main` carries a co-author trailer as a gap. Slice 3 module 4 calls the same fact a liability finding | Same fact, higher stakes; both readings stand. The map carries it as the note on 6.3 (amber in practice until a hook checks the trailer). Action for Sidney's board: enable attribution in `.claude/settings.json`, add the confidence section to the PR template, add the trailer check |
| 3 | Slice 1 recommendation 8 routes regulatory codification through Leon's Trust in AI Design deck. The deck never arrived | Slice 3 module 6 codified from primary sources instead. The deck's outline from 26 Aug (model cards, audit logs, fallback and escalation, user override, multi-agent critique, feedback loops, responsible AI policy, version control) maps onto modules 6.8, 6.10 and 6.12 when it arrives. Open, marked slot, owner Zac |
| 4 | D1 section 6 says the certification says nothing about provenance or cost | Not a contradiction but a handoff: modules 6.9 and 6.10 are the team's answer to both, and this report presents them as such |
| 5 | Neither earlier slice cites the Voluntary AI Safety Standard; any team material that still names the ten guardrails is out of date | Confirmed clean for slices 1 to 3, D1, the map and this report. Leon's deck predates October 2025 and may cite the ten; check when it arrives |
| 6 | Stage 2: D2 v2 green, slice 1 amber, map green on 2.2 and red on 2.4 | Resolved by the task split. The literature's finding (drafts meet acceptance criteria less often) belongs to 2.4, where it is red. Slice 1's recommendation 2 (propose green to amber at stage level) is superseded by the removal of stage colours; the challenge to Alessio is now "colours on tasks", with 2.4 red carrying the same evidence. Ahmed's unresolved question 4 changes accordingly (section 8) |
| 7 | Stage 4 journey mapping: D2 v2 green, slice 1 amber, map amber on 4.2 | Consistent. Slice 1 recommendation 3 is carried unchanged as task 4.2. Ahmed's unresolved question 5 is answered yes |
| 8 | Stage 1: D2 v2 red with amber draft, map green on 1.3 | A departure the map introduced; no slice proposed it. Stated as a proposal to Alessio on the row. The reasoning (exploration that ships nowhere is the lowest-exposure work in the lifecycle) is the 31 Aug exposure rule, so it is grounded in practitioner input rather than a fetched source, and the report says so |
| 9 | Slice 2 module 1 states as mechanics that "`main` is protected: no direct pushes, everything through a PR, CI green before merge". Slice 2 gap 3, D1 section 5 and the README reframe (branch `docs/readme-capstone-reframe`, not yet merged) say the protection is not in force | The module text describes the documented intent and the gap records the observed state; the module should not be read as observed practice. Recorded here so nobody quotes module 1 as evidence the gate is live. Fix needs repository admin (the owner account, not a team member); open, owner Sidney to raise |
| 10 | Slice 1 Stage 7 mechanic 1 names "GitHub branch protection requiring all checks to pass before merge" as the CI gate. Same gap | Same resolution as item 9. On this repository the four CI jobs are advisory status; the map's 7.2 and 7.5 are green for the design and say so for the configuration |
| 11 | `docs/GIT-WORKFLOW.md` says every PR is squash-merged; `main` carries merge commits and no squashes | Open, small. Either the document or the repository setting changes; module 6.3 assumes the document is the intent. Owner Sidney (board follow-up from slice 2) |
| 12 | Slice 2 module 6 and the map's 8.1 say preview deployments happen per PR "already" in this repository; slice 2 gap 4 says the comment was confirmed on PR #20 only and #9 and #14 are unchecked | 8.1 stands on Vercel's documented default plus one observed instance. Recorded as partially verified; a two-minute check on #9 and #14 closes it. Owner Zac |
| 13 | Stage count: Google five, Microsoft seven, Atlassian none, ours eight | Not a contradiction to resolve; it is the evidence for reading the eight stages as a taxonomy of concerns. The eight names and order are kept because they are the client's and the workshop's |
| 14 | Watanabe et al.: the 41.1 percent post-merge involvement figure is cited in slice 1, slice 3 and the map from Zafir's note; slice 2's citation record notes it was not located in the HTML render of the paper | Carried as cited from the source note with that caveat. Zafir to confirm the figure against the PDF; if it is not there, the three documents drop it and the point stands on the merged-PR revision data, which was verified |
| 15 | WCAG level: the AHRC advisory notes (2014) reference WCAG 2.0 Level AA; the workshop treated WCAG 2.2 AAA as definition of done | Not a contradiction: the legal floor and NBN's own practice are different things. Module 6.12 rule 5 states both ("AA minimum, AAA where NBN already sets it") and the map's Stage 4 uses NBN's practice |
| 16 | Telecommunications Act 1997 obligations on customer data: named in the slice 3 requirements as a source to fetch; not fetched | Open. Module 6.12 covers customer data through the Privacy Act and the APPs only. To fetch before the governance and token model is presented as complete. Owner Zac, Sprint 2 week 1 |
| 17 | The requirements file's target user (developers, testers, architects, 100+ developer organisations) against the brief's dual audience (enterprise developers plus juniors and students) | Consistent under the layering decision: one lifecycle, two layers, junior first. The enterprise layer's extra constraint (Git not universal, Jira and Confluence as the source of truth) is recorded in section 2 and in module 6.7, and is not yet designed |

Nothing in the list changes a colour in the D2 v2 baseline. Items 6, 7 and 8 are the departures that go to Alessio, collected in section 10.

---

## 8. What this changes in the requirements, for Ahmed

Ahmed's pass 1 (`docs/requirements.md`) was written off slice 1. Slices 2 and 3 and the map change the ground under some of it, and the card says those changes go to him before D3 is presented as settled. Nothing below has been applied to his file; each item is a proposed change for him to accept, reword or reject in pass 2.

Unresolved questions in pass 1, with the answer the research now gives.

1. Minimum human check per stage. Answered at task level: the red row in each stage's table is the minimum, and the reviewer's first three questions on an agent diff (module 6.3) are the minimum for Stage 6. Proposed: US-04 gains an acceptance criterion naming the red task per stage.
2. AI audit information NBN needs to keep. Answered in layers by module 6.10: trailer, confidence card, nutrition label, register entry, and the nutrition label exists nowhere yet. Proposed: US-05 lists the four names of authorship and the register.
3. What allows a task to move from amber to green. Answered by the mechanism ladder and the migration finding: a deterministic check behind the automation, or a measured threshold (slice 1 recommendation 4 proposes change-failure rate under 5 percent and a clean vulnerability scan), never a rules file or a skill. Proposed: US-07 states both routes and rules out the third.
4. Stage 2 green to amber. Changed shape: the proposal is now colours on tasks rather than a stage recolour, with 2.2 green and 2.4 red. Proposed: the flag on US-03 is reworded to the task split.
5. Journey mapping green to amber. Yes, as task 4.2. Proposed: the flag on US-03 closes.
6. Which NBN rules are enforced as hard limits. Answered by module 6.12: seven rules, two holdable by a hook or CI check, five by people. Proposed: US-06's second criterion names the seven and their holders, and states that the Commonwealth policy is a model for NBN Co, not an obligation.
7. How much control AI has over deployment and rollback. Answered by Stage 8's table: execution green behind a deterministic controller, promotion and incident red, and SOCI making promotion a regulated act for registered assets. Proposed: US-07's third criterion is rewritten to those three rows.
8. Default handling of collaboration and review when AI speeds up development. Answered by modules 6.7 and 6.9: the four patterns, with review time recorded per task so the decision load is visible. Proposed: US-08 gains "review time is recorded" as a criterion.

Two new stories the research supports and pass 1 does not have. A story for prompt practice (a prompt that matters is a file, versioned and reviewed like code; module 6.11), and a story for the register and cost record (module 6.9). Ahmed decides whether they are US-11 and US-12 or criteria on existing stories.

One story to check. US-09 (when a prototype can be the specification) is answered by the map's reading of Karen's question: green for a Stage 4 screen, red for a Stage 3 design decision (slice 3, module 1). The criterion "the model distinguishes prototype or screen-based work from backend or non-visual changes" is met by the task split; Ahmed to confirm the wording.

---

## 9. Interview findings

None. Ahmed's guide (`docs/research/interviews/developer-interview-guide.md`) is written and traces each question to a slice 1 open question or a D2 gap. As of 5 Sep 2026 no interview has been held. Dr Ben replied to Ahmed's outreach asking what "interview based on each participant's own experience" means and asked for a calendar invite for next week; developers said they were available next week. Leon's advice on the guide was that the questions are good and well ordered, to open with level-set questions on the current SDLC, its pains and what worked before the AI questions, and to add "how do you share what has worked with AI with others?", whose answer he expects to be informal and unversioned.

What that means for this report. Every as-is scenario in the map is a hypothesis built from the workshop record and one supervisor observation, and is labelled as one. Assumptions A1 to A3 under the two stories are candidate interview questions. Section 2's audience decision rests on second-hand evidence. When the interviews land, interview question 1 (current tooling) rewrites the as-is scenarios, question 4 (what you check before accepting AI work) tests the red rows, and any finding that contradicts a slice is flagged the same day under PRD-8. The integration slips to Sprint 2; the interviews themselves can still be held in the last days of Sprint 1 and should be, because the map is the one place the front half of NBN's lifecycle is written down at all and it is currently written from a simulation.

---

## 10. Open items and proposals to Alessio

Proposals to Alessio, none applied to the baseline record. Remove stage banner colours and carry a profile line instead. Carry colours on tasks. Task 1.3 green (divergent options for internal comparison). Task 2.2 green and 2.4 red in place of a stage-level recolour. Task 4.2 amber. Stage 8 classified as in section 5.4, marked unvalidated. Read the eight stages as recurring concerns.

Open items carried into Sprint 2, with owners. Telecommunications Act 1997 customer-data obligations (Zac). Leon's Trust in AI Design deck and his written green, orange and red example statements (Zac to chase; marked slots in slice 1 "Reading the colours", slice 2 module 5, and modules 6.8, 6.10, 6.12). Zafir's INF-6a figures: generating time, reviewing time and tokens per task (Zafir; slots in modules 6.3 and 6.9). The Watanabe 41.1 percent figure against the PDF (Zafir). Branch protection ruleset on `main`: add the target, require the CI jobs, decide on administrators (repository owner; Sidney to raise). Squash-merge document or setting (Sidney). Preview comments on PRs #9 and #14 (Zac). Attribution setting, PR template confidence section, trailer check (Sidney's board). An Atlassian source note to replace the desk-check column (unassigned; Sprint 2 week 1 if the benchmark is to be presented as four-way). Developer interviews (Ahmed). Copyright and licence in agent-written code (needs counsel; recorded, not researched).

---

## 11. The team's position

What we are building. A task-level lifecycle map across the client's eight stages, each stage expanded into its tasks with a colour, a holder and a gate, grounded in two NBN stories and a set of stated assumptions, with twelve modules behind it that say how the work is done at the depth of commands, hooks and checks. Behind the map, a governance and token model that consists of a register (owner and cost per AI use), a codified list of what binds NBN Co with the holder of each rule, and an authorship rule of four names. And a junior learning path first, using the vocabulary the certification already teaches.

For whom. Developers, testers and architects in organisations of a hundred or more developers, junior layer first, enterprise layer second, on one shared lifecycle. For NBN Co specifically, tailored to Alessio's GitHub and Claude Code remit, with the front stages written in full because they are where the design supervisor asked for depth and where nobody else at NBN has written them down.

What we reject. Stage-level colours, because they hide that green copy and red decisions coexist in one stage and produce orange everywhere. Any skill, rules file, CLAUDE.md line or sub-agent as a governance control, because a control that sometimes does not run is not a control. Synthetic users in place of real ones, because they idealise and fabricate. The claim that AI adoption moves a stage toward green on its own, because the evidence says it amplifies what is already there and still costs stability. Delegating to whichever agent is at hand regardless of task type. Treating the merge as the end of responsibility for a change. And, for our own repository, describing any gate as live that we have not seen switched on.

What we are not claiming. That the as-is scenarios describe NBN today (they are hypotheses until interviewed). That the Commonwealth AI policy binds NBN Co (it is the model). That any productivity figure in this report transfers to NBN (the strongest pro-AI result is a bounded task with freelancers, the strongest anti-AI result has sixteen participants, and the vendor figures are internal). That the Atlassian column is a benchmark (it is a desk check).

Sprint 2. Two or three stages in depth, not eight: the team's shape is week 1 research and interviews, week 2 build, week 3 benchmark, and the focus is where GitHub and Claude Code interact (Stages 5 to 8), with the ideation and business-case front held to the depth the map already gives it. The benchmark has to make its own evidence, because the published evidence is contested and none of it is about NBN: the first measurement is Claude Code with and without the repository's skills and hooks on the same issue, recording generating time, reviewing time, tokens and mutation score, which is the number the map's green rows need before they can be defended. Leon will check the focus with Dr Ben and Alessio; the playback on 12 Sep is where the team says all of this out loud.

---

## Appendix A. The evidence record

All in `Peepachuu/nbn-sdlc-demo` on `main` unless marked.

| Document | Path | Author | What this report takes from it |
|---|---|---|---|
| Research slice 1, the spine | `docs/research/slice1-spine.md` | Zac | Stage verdicts, stage order, migration claim, empirical evidence, open questions, recommendations, "Reading the colours"; 63 citations audited in `docs/research/citation-audit.md` |
| Research slice 2, build modules | `docs/research/slice2-build-modules.md` | Zac | Modules 6.1 to 6.6, gaps recorded, citation record |
| Research slice 3, governance | `docs/research/slice3-governance.md` | Zac | Modules 6.7 to 6.12, contradictions 1 to 5, citation record |
| Lifecycle task map | `docs/research/lifecycle-task-map.md` (branch `docs/lifecycle-task-map`, on this branch) | Zac | Section 5 in full; the two stories, assumptions, need statements, Design Sprint scaffold, as-is scenarios |
| D1 Claude certification report | `docs/reports/D1-claude-certification.md` | Sidney | Mechanism ladder (s3), 4D vocabulary (s2.3), machine properties (s2.4), candidate applications and their correction (s5), gaps (s6) |
| Google source note | `docs/research/google-research.md` | Zafir | Lifecycle, gates, S4 to S6 papers, borrow and reject |
| Microsoft source note | `docs/research/microsoft-research.md` | Chirag | Lifecycle, SDL gates, S4 and S5 papers, borrow and reject |
| SDLC model requirements, pass 1 | `docs/requirements.md` | Ahmed | Target user, US-01 to US-10, unresolved questions |
| Developer interview guide | `docs/research/interviews/developer-interview-guide.md` | Ahmed | Question traces; section 9 |
| Slice requirements files | `docs/research/slice{1,2,3}-*-requirements.md` | Zac | Card checklists, D3 dependencies |
| ADR 001 | `docs/adr/001-stack.md` | team | Cited as the repository's own Stage 3 mechanic |
| D2 v2 workshop review report | `ab. Main Project Deliverables` (Teams) | Zac | Baseline table (s4.1), guardrails (s4.5), cost (s4.4), collaboration patterns (s7), NBN ways of working (s9), gaps (s10) |
| Supervisor reviews | 26 Aug, 31 Aug, 4 Sep 2026 meetings (recorded) | Leon Gouletsas | Practitioner input, cited inline in the slices and the map; outside the source-strength ranking; 4 Sep input not yet confirmed by him in writing |

## Appendix B. Sources fetched for this report

Fetched 5 Sep 2026 for the Atlassian column only. Vendor documentation and a vendor blog; source class 1 for mechanics, class 4 for the productivity figure.

| Source | What was verified |
|---|---|
| Atlassian Git tutorials, "Git Feature Branch Workflow" ([atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)) | "all feature development should take place in a dedicated branch instead of the main branch"; pull requests "give other developers the opportunity to sign off on a feature before it gets integrated into the official project"; "the main branch will never contain broken code" |
| Atlassian Support, "Trigger a code review" (Rovo) ([support.atlassian.com/rovo/docs/trigger-a-code-review/](https://support.atlassian.com/rovo/docs/trigger-a-code-review/)) | Reviews run on PR creation, on every commit, or manually, per repository setting; "Rovo Dev will add comments if it finds potential improvements or bugs"; the page makes no statement about human approval, which is taken from the blog below |
| Inside Atlassian, "30.8% Faster PRs" (7 April 2026) ([atlassian.com/blog/ai-at-work/developer-productivity-improved-with-rovo-dev](https://www.atlassian.com/blog/ai-at-work/developer-productivity-improved-with-rovo-dev)) | "30.8% reduction in median PR cycle time" across more than 1,900 internal repositories over a year; comment generation, an LLM-as-judge accuracy filter and an actionability filter; "The final decision to accept or decline a suggestion rests solely with the human reviewer"; 38.70 percent of its comments led to code changes against 44.45 percent for human comments. Internal, self-reported, no independent validation |
| Atlassian, "Responsible Technology Principles" ([atlassian.com/trust/responsible-tech-principles](https://www.atlassian.com/trust/responsible-tech-principles)) | Five principles; "true accountability is a team sport"; commitments to stakeholder feedback and to mitigating unfair outcomes. No operational mechanism stated |

No other external source was fetched for this report. Every other external citation belongs to the slice that carries it and was verified there.
