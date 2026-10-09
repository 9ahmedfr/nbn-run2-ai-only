# Research slice 1, the spine: testing the NBN Co eight-stage AI-SDLC map against Google and Microsoft published practice

> Revision note, 2 Sep 2026. Two inputs folded in. First, Leon Gouletsas (UX design supervisor) reviewed the spine live in the 31 Aug meeting; his feedback was first captured in the Word review copy and is now carried here as the working source. Colours read at task level with plain-English worked examples (new section after Key findings), Stage 4 gains an overlay-diff brand-compliance mechanic and an anchored-generation rule, and Recommendations and Open questions carry the regulatory-codification point. His input is cited inline as practitioner input (supervisor review, 31 Aug 2026); it sits outside the source-strength ranking below and is not counted as a fetched citation. Leon has offered to send his own written green/orange/red example statements; fold them in when they arrive. Second, Sidney's D1 certification report (`docs/reports/D1-claude-certification.md`, section 3) supplies a capability inventory of Claude Code mechanisms (hook, skill, sub-agent, command, MCP server, CLAUDE.md) with a "where it stops" column. That column is cited where it bears on a colour: the mechanism ladder in "Reading the colours", Stage 7, the migration claim, and the open questions. D1 is an internal team deliverable, not a fetched source, and is cited as such.

> Revision note, 4 Sep 2026. Second supervisor review (Leon Gouletsas, 4 Sep 2026 meeting): the stage-level colours in the headings below no longer drive the map. Colours sit on tasks, each stage carries an autonomy-versus-intervention profile instead of a banner colour, and every task has a worked example and an as-is scenario. That presentation lives in `docs/research/lifecycle-task-map.md`, which supersedes the stage baselines here for the map and for D3. This file is unchanged otherwise and remains the evidence record the task map cites.

> Citation status: all 63 citations fetched and checked against live sources; corrections from that pass are applied throughout. See `docs/research/citation-audit.md` for the per-citation record. Reconciliation against Zafir's Google note (`docs/research/google-research.md`, merged 26 Aug) and Chirag's Microsoft note (`docs/research/microsoft-research.md`, merged 23 Aug): done, 26 Aug. Each stage below carries its own reconciliation line saying what their notes confirm, challenge, or stay silent on.

> What this document does and does not do. It records, for each stage, whether the D2 v2 classification is confirmed or challenged by the published sources, with the evidence. It does not change any colour. Proposed recolours are collected in the Recommendations section at the end and are for the team and Alessio to decide.

## Summary

The eight-stage red/amber/green map survives contact with the two mandatory source bodies. One colour is clearly challenged (Stage 2's lone GREEN). Two stages need an internal split or hedge (Stages 4 and 7). One stage has to be classified entirely from external evidence (Stage 8). The rest are broadly confirmed as AMBER or RED by Google and Microsoft practice.

The migration claim (red to green as governance and context improve) is supported in direction by DORA's 2025 "AI is an amplifier" thesis and its seven-capability model ("AI doesn't fix a team; it amplifies what's already there"). It is constrained by hard counter-evidence. DORA 2025 states "AI adoption does continue to have a negative relationship with software delivery stability," and human review remains a load-bearing gate in every source.

The stage ordering is challenged as a strict linear sequence. Google/DORA and Microsoft both describe iteration, trunk-based collapse of plan/build/test, continuous discovery, and DevOps merging of build, deploy and operate. The map holds as a taxonomy of concerns. It does not hold as a waterfall.

## Key findings

Silence is common and has to be flagged. Neither Google's eng-practices nor Microsoft's Code With Engineering Playbook says anything about ideation or business cases (Stage 1), or, in the engineering canon, about brand and visual design decisions (the RED half of Stage 4). Those verdicts are "source silent," not "confirmed."

The only GREEN, Stage 2, is the least defensible colour in the map. Peer-reviewed RE research finds LLM-generated user stories are stylistically comparable to human ones but less diverse, less creative, and meet acceptance criteria less often. That is AMBER-with-human-gate territory.

Stages 5 to 7 (planning, build, testing) are confirmed as AMBER by the most operationally detailed sources. GitHub's coding-agent docs, Google's code-review standard, and Microsoft's testing and CI/CD guidance all require a human approval gate.

Stage 8 (deployment and iteration) has zero baseline evidence. DORA deployment automation and progressive-delivery mechanics (feature flags, canary, automated rollback) support a defensible AMBER-trending-GREEN for execution; post-incident judgement stays RED.

The empirical literature is contested. The Peng et al. Copilot RCT (55.8% faster) and the METR 2025 RCT (19% slower for experienced developers on mature repos) point in opposite directions, and Veracode found AI chose the insecure option in 45% of security-relevant tasks. That is a caution against over-greening any stage.

The 31 Aug supervisor review endorsed the red/orange/green frame (Alessio's direction) but pushed one structural refinement: colours belong to tasks, not stages. A single stage can hold green copywriting and red brand decisions at the same time, so the map should be read as a task-level guide with worked examples in plain English, not as eight uniform blocks. That refinement is consistent with the taxonomy-of-concerns finding above, and strengthens it.

## Reading the colours: task-level, with worked examples

Everything in this section up to the mechanism ladder is practitioner input from the supervisor review (L. Gouletsas, 31 Aug 2026), recorded here so the map can tell a human story: for each colour, what it looks like in practice, why we would be more cautious in some domains, and how work still gets through. It does not change any baseline colour; where it bears on a colour, the proposal is in Recommendations.

The structural rule first: colours attach to tasks, not stages. Within UX design and prototyping (Stage 4), drafting newsletter copy for a known audience is green while a brand or inclusion decision in the same sprint is red. The stage sections below keep the stage-level baseline because that is what D2 v2 recorded, but the map presented to stakeholders should carry the colour at the task level.

Green in practice is copywriting and storytelling for known, fact-checked audiences. The worked example: newsletter or campaign copy for a customer type management has already agreed to (say, a work-from-home parent using the internet in the kitchen), where the audience, their location and their habits are evidenced facts and the AI's job is generous copy on top of them. Green does not mean zero obligation. A customer-facing chatbot is nominally green and can still ship with lousy retrieval behind it. The difference between a green task done well and done badly is whether anyone ran a rigorous pass over models, configurations and system prompts, or just threw it to the AI. Rigour scales with exposure: an internal concept being explored needs little of it, an internal production tool needs a high standard, and a customer-facing production asset that runs thousands of times a day gets the full battery of tests before release.

Orange in practice is personalised content. Same copywriting task, but now the content leans on individual attributes: the customer's suburb, inferred habits, usage patterns. The generation is plausible by construction, so the failure mode is silent. It reads fine and is wrong. The pattern that keeps it orange rather than red is generate-then-validate at volume: seed with real data (for example ABS data joined to locality specifics), generate per-locality recommendations or campaign content, then have a human validate consistency with the organisation's real messaging before anything ships.

Red in practice is regulated territory and deterministic systems. Red is where the evidence says do not automate with LLMs, or where the territory is regulated in a way that leaves no room for judgement. The regulated case: in financial services, staff may only present options and never recommend one, a legislative constraint that has to be codified as a hard limit in the system prompt rather than left to the model. The analogue for NBN Co, a government-linked entity, is to identify which regulations bind it first and codify them before design work begins. Leon's explicit example is First Nations inclusive-design policy, which must bind the AI exactly as it binds human designers. The deterministic case is a brand design system. Generation is the wrong tool for enforcing one. Design systems are deterministic, so they should be enforced as tool-chain constraints (the design system's HTML/CSS as the rule set), a pattern closer to robotic process automation than to LLM generation. The fear case is the AI hallucinating an off-brand logo.

Red does not mean never touch AI. There are two routes through it. First, AI can still generate content against a fixed design system provided a compliance check follows; that is the overlay-diff mechanic now recorded under Stage 4. Second, the edge case of a brand-new device type (a foldable, say) that no design system yet covers: AI generates the exploration, and the findings are then codified back into a deterministic design system. Exploration is green; codification and enforcement stay red.

The anchor rule applies to generative tasks of any colour. Start with what is known to be real (known users, historical evidence, known tasks and pain points) and fix those as anchors. Let the AI generate only in gaps deliberately left open, and research every generated hypothesis before treating it as real. This is the same discipline NN/g's hypothesis-map guidance prescribes for journey maps (Stage 4), stated as a general rule.

### The mechanism ladder (from D1)

Sidney's D1 report gives the colours a second reading that is independent of Leon's and points the same way. D1 section 3 inventories the six Claude Code mechanisms the team was certified on and records where each one stops. Only two of them can sit at a gate. A hook runs deterministically at a defined trigger and can block, but it pattern-matches and cannot assess intent, quality or correctness. A command is fired by a person. Everything else shapes behaviour without guaranteeing it: a skill's invocation depends on steerability and so is probabilistic, CLAUDE.md instructions are followed probabilistically, an MCP server is only as good as what it is pointed at, and a sub-agent is the same class of system as the agent it checks. D1's one-line version is that a hook can enforce but only a human can judge.

Read against the map, that gives each colour a mechanism. Red is a human decision or a command a human fires. Amber is a skill, CLAUDE.md or sub-agent doing the drafting with a person approving. Green is defensible only where a hook or an equivalent deterministic check stands behind the automation, which is why Leon's tool-chain-constraint rule for design systems and D1's hook row are the same finding from two directions. It also means a rules file cannot be counted as a governance control, a point D2 v2 section 4.5 reached from the workshop record and D1 reaches from the certification's steerability material. The AI Fluency course D1 summarises (section 2.3) supplies vocabulary the map can reuse rather than invent: red, amber and green are delegation decisions, and the describe-evaluate-refine loop it teaches is the operational shape of every amber task.

## Source strength ranking used throughout

1. Official engineering documentation and standards (Google eng-practices at [google.github.io/eng-practices](https://google.github.io/eng-practices); Microsoft Learn/SDL; GitHub Docs; DORA capability pages at [dora.dev](https://dora.dev)). Strongest for mechanics.
2. Peer-reviewed or rigorous empirical research (CHI, EMNLP, INTERACT, IEEE TSE, ACM TOSEM, arXiv RCTs). Strongest for verdicts on capability.
3. Industry research reports (DORA State of DevOps; Veracode GenAI report). Strong, but read with the author's interests in mind.
4. Blog and opinion. Weakest; used only where it is the sole source, and flagged.

---

## Stage 1: Ideation and business case (baseline: RED, amber first draft)

Google verdict: silent, which is not a confirmation. Google's public engineering canon (eng-practices, *Software Engineering at Google*, DORA) begins at requirements and CI and says nothing about business-case authorship. No evidence either way.

Microsoft verdict: partial confirm by analogue. Microsoft's SDL states every product "starts with clearly defined security and privacy requirements… Development teams define these requirements" ([learn.microsoft.com](https://learn.microsoft.com), Microsoft Security Development Lifecycle), a human-owned front gate. The Code With Engineering Playbook's "Envisioning and Problem Formulation" (machine-learning section) frames problem definition as a human workshop activity. This supports RED with human sign-off, but it is about requirements framing rather than business cases as such.

Verdict: baseline plausible, largely source-silent. RED is defensible. The amber first draft is consistent with general LLM drafting capability but is not evidenced in these two bodies.

Reconciliation: done. Zafir's note starts Google's lifecycle at design and never mentions business cases, so Google stays silent. Chirag's note has Microsoft's Planning phase as human goal-setting, with security and privacy requirements defined by the team. The source-silent verdict stands, with Microsoft's Planning as the nearest analogue.

Mechanics. Neither source specifies AI ideation, so these are the human collaboration mechanics that sit at this stage. They are templates and checklists rather than commands, and that is a limit of the sources, not an omission.

1. Microsoft "Team Manifesto" and "Sections of a Working Agreement" templates ([microsoft.github.io/code-with-engineering-playbook/agile-development/team-agreements/](https://microsoft.github.io/code-with-engineering-playbook/agile-development/team-agreements/)). Human-authored charter documents produced in the first week of an engagement.
2. Microsoft SDL practice #1, "Establish security standards, metrics, and governance" ([microsoft.com/securityengineering/sdl/practices](https://microsoft.com/securityengineering/sdl/practices)). A human governance artifact created before build.
3. Microsoft ISE "Envisioning and Problem Formulation" and the "Generic Envisioning Summary" template ([microsoft.github.io/code-with-engineering-playbook/machine-learning/](https://microsoft.github.io/code-with-engineering-playbook/machine-learning/)). Structured human problem-framing outputs.

---

## Stage 2: Requirements and discovery (baseline: GREEN for first-draft user stories)

This is the map's most contestable colour.

Google verdict: challenge, implicitly. Google/DORA's 2025 model makes "user-centric focus" one of seven amplifying capabilities and warns that "adopting AI tools can actually harm teams that lack a user-centric focus" ([cloud.google.com/blog](https://cloud.google.com/blog), "From adoption to impact," 10 Dec 2025). DORA frames requirements as a place where AI amplifies rather than replaces, which does not fit unmonitored GREEN automation.

Microsoft verdict: challenge. The playbook's "Definition of Ready" and "Backlog Management" treat story readiness as a human team-agreement gate ([microsoft.github.io/code-with-engineering-playbook/agile-development/team-agreements/definition-of-ready/](https://microsoft.github.io/code-with-engineering-playbook/agile-development/team-agreements/definition-of-ready/)).

The peer-reviewed evidence cuts against the GREEN:

- Quattrocchi, Pasquale, Spoletini, Baresi, "Can LLMs Generate User Stories and Assess Their Quality?" ([arXiv 2507.15157](https://arxiv.org/abs/2507.15157), 2025): across 10 LLMs, "LLMs can generate US similar to humans in terms of coverage and stylistic quality, but exhibit lower diversity and creativity… they tend to meet the acceptance quality criteria less frequently, regardless of the scale of the LLM model."
- ALAS study (Springer XP 2024, Austrian Post Group IT; [arXiv 2403.09442](https://arxiv.org/abs/2403.09442)): LLM agents improve user-story quality across six agile teams. Supports AI assist deployed with human product owners.
- Multi-agent RE study (Sami et al., Springer SEAA 2025): models "show moderate alignment with expert rankings… variability across runs remains a challenge."

Verdict: the GREEN is challenged. The evidence supports AMBER: AI drafts strong first-pass stories, humans gate for acceptance criteria, diversity, and prioritisation. The client's reasoning ("everything has already been invented") is not reflected in the RE evidence, which shows a persistent human-acceptance gap. This is recorded as a challenge to the baseline, not a correction. The recolour proposal is in Recommendations.

Reconciliation: done, and neither note rescues the GREEN. Zafir's Google lifecycle has no requirements stage at all, so Google is silent rather than confirming. Chirag's Microsoft Analysis phase turns requirements into detailed system specifications as human work, with use-case and data-flow diagrams, and names no AI role inside it. The challenge stands.

Mechanics:

1. Microsoft "Definition of Ready" checklist, the gate a story passes before sprint entry (playbook).
2. The QUS (Quality User Story) framework and INVEST criteria, used across the RE literature as the human acceptance rubric against which AI stories are scored (13 criteria across syntactic, semantic and pragmatic dimensions).
3. GitHub issue templates plus "Definition of Done" (playbook) as the container into which drafted stories are committed for human triage.

---

## Stage 3: Solution design and architecture (baseline: RED, AMBER if context improves)

Google verdict: confirm. Google's code-review guidance names design judgement as the "most important" review dimension: reviewers assess whether "the code is well-designed" and appropriate for the system ([google.github.io/eng-practices/review/reviewer/looking-for.html](https://google.github.io/eng-practices/review/reviewer/looking-for.html)). Design is a human-approval act.

Microsoft verdict: confirm, and it supports the migration hedge. The playbook's Design Reviews section states decisions are "front-loaded before implementation begins" and captured in a human-maintained Architecture Decision Record (ADR) and Decision Log. It notes that a pivot "after implementation has started or after a solution is in use is much more costly." That matches the client's "if you know the infrastructure it drops to amber": design cost and risk fall as documented context improves.

Verdict: RED-as-delivered confirmed. The AMBER-with-context migration is supported by Microsoft's design-review economics and by DORA's "AI-accessible internal data" capability.

Reconciliation: done, both confirm. Zafir: many Google teams require an approved design document before implementation, reviewed and debated before any code review, with domain experts signing off on security and privacy sections. Chirag: Microsoft's SDL puts threat modelling in design and requires threat models to be reviewed before release. Both match RED with a human gate, and the design document as a context artifact supports the amber-if-context-improves hedge.

Mechanics:

1. ADR format: playbook template "0001-record-architecture-decisions" ([design/design-reviews/decision-log/doc/adr/](https://microsoft.github.io/code-with-engineering-playbook/design/design-reviews/decision-log/doc/adr/)). Numbered, version-controlled Markdown decision records.
2. Trade Study template ([design/design-reviews/trade-studies/template/](https://microsoft.github.io/code-with-engineering-playbook/design/design-reviews/trade-studies/template/)). Structured human comparison when more than one solution exists.
3. Technical Spike template ([design/design-reviews/recipes/templates/template-technical-spike/](https://microsoft.github.io/code-with-engineering-playbook/design/design-reviews/recipes/templates/template-technical-spike/)). Time-boxed feasibility investigation to reduce design risk before commitment.

---

## Stage 4: UX design and prototyping (baseline: GREEN journey mapping, RED brand and design)

This stage carries two colours, and it is ours. The research supports keeping it as one stage with a documented internal split, but it qualifies the GREEN heavily.

Google verdict: mixed. Google's HEART framework (Happiness, Engagement, Adoption, Retention, Task Success) and the Goals-Signals-Metrics model (Rodden, Hutchinson, Fu, Google Research, CHI 2010) are human-defined measurement frameworks. UX judgement stays human, which supports the RED half. Google offers no evidence that journey mapping should be GREEN.

Microsoft verdict: the RED half is confirmed. Microsoft Inclusive Design ("Kill Your Personas," Persona Spectrum; Margaret P, Microsoft Design, [medium.com/microsoft-design](https://medium.com/microsoft-design)) insists on "solve for one, extend to many" and designing with excluded users rather than for an "artificial average." That is the client's "you are not the user" in Microsoft's words. Fluent and Inclusive guidance treat brand and inclusion decisions as human.

The empirical evidence on AI-made UX artifacts qualifies the GREEN half:

- Personas and synthetic users: challenge the GREEN. Nielsen Norman Group (Rosala & Moran, "Synthetic Users," [nngroup.com](https://nngroup.com), 21 June 2024) found synthetic users "provide shallow or overly favorable feedback" and idealise or fabricate behaviour. One synthetic user claimed "Yes, I completed all the courses I mentioned" where real users had not; "This tendency for idealization was a theme we observed over and over." Peer-reviewed backup: CoMPosT (Cheng, Piccardi, Yang, EMNLP 2023, [aclanthology.org/2023.emnlp-main.669](https://aclanthology.org/2023.emnlp-main.669)) finds GPT-4 persona simulations of certain demographics and topics are "highly susceptible to caricature." A contrasting result, De Paoli (CHI 2024 Extended Abstracts), found LLM personas "indistinguishable" from human ones, but that measures perceived plausibility rather than accuracy, so it makes the fabrication risk worse, not better.
- Usability and accessibility critique: AMBER, not GREEN. ScreenAudit (Zhong et al., CHI 2025, [arXiv 2504.02110](https://arxiv.org/abs/2504.02110)): the LLM covered 69.2% of expert-found accessibility errors at 71.3% precision, against 31.3% coverage for rule-based checkers. A strong complement, with roughly a 31% miss rate and a 29% false-positive rate. Guerino et al. (INTERACT 2025, [arXiv 2506.16345](https://arxiv.org/abs/2506.16345)): GPT-4o "generated several false positives due to hallucinations… LLMs should be used as a support, and not as the sole tool, in heuristic evaluation."
- Journey maps specifically: no strong evidence found. Existing academic work (GeneyMAP and EvAlignUX, both CHI 2025) builds tools rather than validating journey-map accuracy. NN/g recommends AI journey maps only as "proto journey maps (also known as hypothesis maps)… revisited and refined after doing research with real users."

Verdict: keep as one stage with an explicit internal split. The journey-mapping GREEN is challenged: published UX evidence does not support unmonitored automation for journey mapping, only AI producing hypothesis-grade artifacts that a human UX researcher validates. The RED for brand, design and inclusion is confirmed by Microsoft. Recolour proposal in Recommendations.

Reconciliation: done, both silent. Neither note touches UX design, journey mapping, or brand work, so the external UX evidence above remains the only material for this stage, plus the supervisor review below, which is the first design-side practitioner check this stage has had.

Supervisor review (31 Aug, practitioner input): Leon confirms both halves of the split and sharpens the RED. On brand and design systems, generation is the wrong tool. Design systems are deterministic, so they should be enforced as tool-chain constraints (the system's HTML/CSS as the rule set), closer to RPA than to LLM generation, the fear case being a hallucinated off-brand logo. On the GREEN half, his rule matches the NN/g hypothesis-map finding above independently: start with what is known to be real (known users, historical evidence, known tasks and pain points) as fixed anchors, let AI generate only in gaps deliberately left open, and research every generated hypothesis before it is treated as real.

Mechanics:

1. Google HEART Goals-Signals-Metrics table, human-authored per project to define which UX metrics count (Google Research).
2. Microsoft Persona Spectrum tool (permanent, temporary and situational scenarios), the inclusive-design artifact used to critique designs ([inclusive.microsoft.design](https://inclusive.microsoft.design)).
3. A ScreenAudit-style LLM accessibility pass as first-pass triage feeding a human accessibility expert (CHI 2025). This is the citable operational pattern for AI-assisted critique.
4. Overlay-diff brand-compliance check (practitioner input, supervisor review 31 Aug 2026). Let the AI generate the layout, then load the real design-system CSS afterwards so its rules override the generated ones. Whatever visibly shifts (fonts, colours, spacing) is the violation. A visual regression test for brand compliance, and the concrete mechanic that lets AI generate against a fixed design system without the output going off-brand. In D1's terms it is a hook-shaped check: deterministic, pattern-matching, no judgement required, which is what qualifies it to sit at the gate.

---

## Stage 5: Development planning (baseline: AMBER)

Google verdict: confirm, via working in small batches. DORA names "working in small batches" as a core capability and a 2025 AI-amplifier capability: "AI can easily generate massive blocks of code, which are hard to review and test. Enforcing the discipline of small batches counteracts this risk" ([cloud.google.com/blog](https://cloud.google.com/blog)). Planning stays a human-governed discipline that AI assists.

Microsoft verdict: confirm. The playbook's Backlog Management, Minimal Slices and Risk Management pages define human-owned planning; the Delivery Plan and Scrum-of-Scrums templates are human coordination artifacts. AI assisting MoSCoW, story assignment and dependency flagging fits AMBER.

Verdict: AMBER confirmed.

Reconciliation: done, both confirm. Zafir: Google's small-CL discipline (small, single-purpose changes, faster to review and easier to roll back) is the small-batch rule stated as engineering practice, and his S4 paper adds the reason to enforce it on AI planners: agentic PRs bundle multiple purposes at over three times the human rate (40.0% vs 12.2%). Chirag: Microsoft's planning and analysis phases are human-owned.

Mechanics:

1. GitHub Issues as the planning output container; the playbook "Work Items" guidance ([documentation/guidance/work-items/](https://microsoft.github.io/code-with-engineering-playbook/documentation/guidance/work-items/)) defines the human-authored fields.
2. Playbook "Minimal Slices" ([agile-development/advanced-topics/backlog-management/minimal-slices/](https://microsoft.github.io/code-with-engineering-playbook/agile-development/advanced-topics/backlog-management/minimal-slices/)), the batch-sizing rule an AI planner has to respect.
3. Azure DevOps pairing custom-field recipe ([agile-development/advanced-topics/collaboration/add-pairing-field-azure-devops-cards/](https://microsoft.github.io/code-with-engineering-playbook/agile-development/advanced-topics/collaboration/add-pairing-field-azure-devops-cards/)), a concrete story-to-role assignment mechanic.

---

## Stage 6: Development and build (baseline: AMBER, issue-driven agent to PR)

This is the best-evidenced stage in the corpus and the baseline holds.

Google verdict: confirm. Every change requires human review approval: "A correctness and comprehension check from another engineer that the code is appropriate and does what the author claims it does" is one of three required approvals (*Software Engineering at Google*, ch. 9, [abseil.io/resources/swe-book/html/ch09.html](https://abseil.io/resources/swe-book/html/ch09.html)). Google's own AI-in-build evidence: ML-enhanced code completion gave a 6% reduction in coding iteration time and a 25 to 34% acceptance rate across 10k+ Googlers ([research.google](https://research.google), 2022). AI assists, a human accepts.

Microsoft/GitHub verdict: confirm, with mechanics that match the client's Claude Code walkthrough. GitHub's Copilot coding agent researches the repo, creates an implementation plan, makes changes on a branch, runs tests, and opens a pull request that tags you for review; "it regularly pushes its changes to a draft pull request as git commits" and its "reasoning and validation steps" are visible "in the session logs" ([docs.github.com](https://docs.github.com); [github.blog](https://github.blog)). Assigning an issue to Copilot spins up a draft PR (the docs present PR creation as configurable in general). The human review gate is explicit and required for merge.

Verdict: AMBER confirmed. The client's issue, agent, branch, PR loop is a close description of GitHub's documented coding-agent workflow, and the human-approval gate keeps it out of GREEN.

Reconciliation: done, both agree with AMBER. Zafir: no CL is submitted without a human LGTM, OWNERS files add a directory-level second approval, and disagreement escalates through a defined human chain. Chirag: Microsoft's SDL requires review by someone other than the author before code reaches a release branch. Zafir's S4 (Watanabe et al., 567 Claude Code PRs on real repos) adds field data: 83.8% merged against 91.0% for matched human PRs, rejections mostly for integration friction rather than code quality, and the agent stayed involved in 41.1% of post-merge revisions. Agent-and-human-iterate is the realistic loop, which is AMBER by definition.

Mechanics:

1. Assignment: set "Copilot" as the issue assignee, or `assignees: copilot` in a create-issue config; programmatic assignment via the `assign-to-agent` agentic workflow with `target: "triggering"` ([docs.github.com](https://docs.github.com); [github.github.com/gh-aw](https://github.github.com/gh-aw)).
2. Branch and PR automation: "Copilot automates branch creation, commit message writing, and pushing" and opens a draft PR whose description it updates ([docs.github.com](https://docs.github.com), "About GitHub Copilot cloud agent", formerly "Overview of Copilot coding agent").
3. Iteration and CI gate: an "@copilot" mention in PR comments requests changes; the "Fix with Copilot" button on failed GitHub Actions runs; workflows require a human "Approve and run workflows" before execution ([docs.github.com](https://docs.github.com)). Small-CL discipline from Google eng-practices: "write CLs that are smaller than you think you need."
4. Prompt-injection risk, flagged in GitHub's own docs: the cloud agent "filters hidden characters that might allow users to hide harmful instructions in comments or issue contents" ([docs.github.com](https://docs.github.com), responsible-use/agents). An acknowledged injection vector and a governance constraint for later slices.

---

## Stage 7: Testing and QA (baseline: AMBER, adversarial review pass, "are all the tests correct?" open)

Google verdict: AMBER confirmed. Google's review checklist includes "Code has appropriate unit tests" and "Tests are well-designed," a human judgement ([google.github.io/eng-practices](https://google.github.io/eng-practices)). The Google Testing Blog and *SWE at Google* treat test design as human-owned.

Microsoft verdict: AMBER confirmed. The playbook's testing section (unit, integration, E2E, a TDD example, fault injection) is human-authored practice. DORA's continuous-delivery capability requires that "effective test suites are reliable—that is, tests find real failures and only pass releasable code." CI branch protection ("only allow pull request merges when all tests have passed") is the automated half; the human still judges test adequacy.

The literature confirms that "are the tests correct?" is a real and unsolved problem.

- Schäfer et al. (IEEE TSE, [arXiv 2302.06527](https://arxiv.org/abs/2302.06527); online 2023): LLM unit-test generation achieved a 68.2% median statement coverage for code-cushman-002, but only a median 48% of generated tests passed (range 9.9 to 80.0%). Tests are frequently incorrect.
- ACM TOSEM assertion-generation study ("Exploring Automated Assertion Generation via LLMs," 2025, [dl.acm.org/doi/10.1145/3699598](https://dl.acm.org/doi/10.1145/3699598)): LLMs beat prior tools with 51.82 to 58.71% and 38.72 to 48.19% accuracy on two datasets. Roughly half of generated assertions are wrong.
- MDPI 2025 review (*Machine Learning and Knowledge Extraction*, [mdpi.com/2504-4990/7/3/97](https://mdpi.com/2504-4990/7/3/97)): EvoSuite, a traditional tool, still outperforms LLMs on "compilation success and assertion precision" in several studies.

Verdict: AMBER confirmed. The open question "are all the tests correct?" is validated by the literature. AI-generated tests have measurable correctness problems, so a human oracle stays mandatory. This is a hard constraint against moving Stage 7 toward GREEN.

D1 (section 3) answers Alessio's question in principle rather than by measurement. A sub-agent that writes or checks tests is subject to the same next-token-prediction and steerability properties as the agent whose work it is checking. It can widen coverage; it cannot act as an independent oracle. So the human check on AI-written tests is structural, not a limit of current model quality that a better model would remove. The Schäfer and TOSEM figures above are what that structural limit looks like in the data.

Reconciliation: done, both confirm. Zafir: TAP runs the automated suite but a human Build Cop owns the failure call, and his S5 paper (Liu et al., 304,362 AI-authored commits) shows why the human oracle cannot retire: AI commits were net negative on security issues (+11,120 introduced over fixed) and 41.1% of introduced security issues were still unfixed at repository HEAD. Chirag: Microsoft pairs automated security tooling (static analysis, fuzzing, secret and credential scanning) with independent human review, and his papers point the same way: about 30% of AI-generated snippets carried security weaknesses, and Copilot Chat fixed at most 55.5% of them even when handed the static-analysis warnings.

Mechanics:

1. CI gate: GitHub branch protection requiring all checks to pass before merge; GitHub Checks plus Cloud Build integration (DORA CI capability page, [dora.dev/capabilities/continuous-integration/](https://dora.dev/capabilities/continuous-integration/)).
2. Microsoft `detect-secrets` in Azure DevOps pipelines and dependency and container scanning ([CI-CD/dev-sec-ops/](https://microsoft.github.io/code-with-engineering-playbook/CI-CD/dev-sec-ops/)). Automated adversarial passes.
3. Mutation or `BugFound`-style evaluation as the human-run check on whether AI tests detect faults at all (ACM TOSEM 2025). The operational answer to "are the tests correct?"

---

## Stage 8: Deployment and iteration (baseline: not reached, no evidence)

No baseline evidence exists. Everything here is from external sources, as the requirements file instructs, and the classification is provisional until a deploy environment exists.

Google/DORA verdict: AMBER-trending-GREEN for mechanics, RED for incident judgement. DORA's "deployment automation" capability ("the degree to which deployments are fully automated and do not require manual intervention," [dora.dev/capabilities/continuous-delivery/](https://dora.dev/capabilities/continuous-delivery/)) and elite-performer benchmarks (multiple deploys a day, change failure rate under 5%) support heavy automation. But DORA 2025's finding that "AI adoption does continue to have a negative relationship with software delivery stability" (Google Cloud, "Announcing the 2025 DORA Report," 24 Sept 2025) argues against full GREEN autonomy.

Microsoft verdict: automation with human governance. Playbook CI/CD, GitOps (ArgoCD-style) and observability sections cover automated delivery plus the observability pillars (dashboards, logging, metrics, tracing) with linked alerting guidance. The human-owned incident-response and SLO framing is our synthesis; it is not stated verbatim on the observability landing page ([microsoft.github.io/code-with-engineering-playbook/observability/](https://microsoft.github.io/code-with-engineering-playbook/observability/)).

Progressive delivery supplies the concrete substance for this stage. Feature flags decouple deploy from release. Canary and ring rollouts ramp exposure (1%, 5%, 25%, 50%, 100%) with hold gates. Automated rollback is wired to error budgets, and blue-green gives an instant revert. The strongest single anchor is the DORA continuous-delivery capability. The canonical Flagger canary example (promote only above a "99% success rate and sub-500ms p99 latency," automatic rollback after 5 failed checks) is an illustrative config from Flagger's official docs.

Verdict, externally derived and unvalidated in the baseline: AMBER for deploy execution (automated pipeline, human monitors and approves promotion), RED for incident response and post-incident iteration judgement, with a documented path to GREEN for low-risk flag-gated rollouts. The team can instead leave this formally open pending Slice 2. The external evidence is enough to assign AMBER/RED rather than leave it blank, but that is a proposal.

Reconciliation: done, and this stage upgrades from external-only to note-backed. Zafir: Google gates releases behind role-based human approvals (source changes, the build proposal, cherry-picks, and authorising the deployment itself), matches rollout pace to service risk, and keeps incident response human through on-call rotations, escalation, and blameless postmortems. Chirag: Microsoft's Safe Deployment Process releases in rings (development team, then employees, then selected external users, then everyone) with rollback strategies required before deploying. Both match the proposed split of AMBER execution and RED incident judgement. Still unvalidated in the workshop baseline.

Mechanics:

1. Feature-flag control surface (deploy is not release); canary via Argo Rollouts or Flagger with metric-gated automatic rollback (Flagger official docs; the DORA continuous-delivery capability page is the strong anchor).
2. GitOps promotion: Git, then automated canary analysis, then production, which gives an auditable deployment trail (industry sources; DORA GitOps-adjacent).
3. Observability pillars (dashboard, logging, metrics, tracing) and alerting from the Microsoft playbook (observability/) as the human-monitoring layer.

---

## The stage order

Verdict: challenged as a strict linear sequence. Defensible only as a taxonomy of concerns.

- Trunk-based development collapses plan, build and test. DORA defines TBD as having "three or fewer active branches," with branches that "typically last no more than a few hours" before being merged, and CI running "automated tests that run after each commit to trunk" ([dora.dev/capabilities/trunk-based-development/](https://dora.dev/capabilities/trunk-based-development/)). Plan, build and test interleave continuously. (The stronger "under one day, forks, mainline" phrasing belongs to the *Accelerate* research, not this capability page.)
- Shift-left merges Stages 6 and 7. Microsoft's SDL maps security practices, including security requirements, threat modelling and security testing, across every phase of development rather than deferring them to the end (Microsoft SDL practices, [microsoft.com/securityengineering/sdl/practices](https://microsoft.com/securityengineering/sdl/practices)). Testing moves into build.
- DevOps merges Stages 6 to 8. DORA and the playbook treat build, deploy and operate as one continuous pipeline.
- Continuous discovery challenges the front. Teresa Torres' dual-track continuous-discovery model (and Marty Cagan) runs discovery (Stages 1 to 4) in parallel with delivery, not before it: "these activities can and should overlap and interweave with each other." DORA 2025 ties user-centric discovery into the delivery loop.

The two source notes now make this point on their own. Zafir's Google lifecycle has five stages (design, development, testing, deployment, maintenance) and Chirag's Microsoft lifecycle has seven (planning, analysis, design, development, testing, deployment, maintenance). Neither is eight, and they disagree with each other, which is what a taxonomy of concerns predicts and a fixed sequence does not.

This challenge agrees with Alessio rather than contradicting him. In the Tuesday session (D2 v2, section 5) he said that for a large organisation understanding and documenting the existing system comes first, refactoring second, and writing new code "fourth or fifth," and that greenfield work "is not the job."

Recommendation: present the eight stages as a spine of concerns that recur, not as a phase-gated waterfall, and say so on the map.

## The migration claim

Supporting evidence:

- DORA 2025 "AI is an amplifier": "AI doesn't fix a team; it amplifies what's already there. Strong teams use AI to become even better and more efficient. Struggling teams will find that AI only highlights and intensifies their existing problems" (Google Cloud). The seven-capability model (clear and communicated AI stance, healthy data ecosystems, AI-accessible internal data, strong version control practices, working in small batches, user-centric focus, quality internal platforms) is a governance-and-context ladder, which is the migration mechanism the client posits.
- The throughput reversal: DORA 2024 found "every 25% rise in AI adoption was associated with roughly a 1.5% drop in throughput and a 7.2% drop in delivery stability," whereas DORA 2025 states "AI adoption now clearly and positively correlates with software delivery throughput." Year-over-year migration, measured.
- Google's ML-completion data: single-line acceptance for Go "improved by 1.9x over the first six weeks" once semantic-engine correctness checking was added ([research.google](https://research.google), 2022). A micro-scale capability gain, though the source credits the semantic engine rather than user trust, and the figure is Go-specific.

Contradicting evidence:

- DORA 2025: "AI adoption does continue to have a negative relationship with software delivery stability. This confirms our central theory — AI accelerates software development, but that acceleration can expose weaknesses downstream." The amber-to-green move is not safe by default. Roughly 30% of respondents report little or no trust in AI-generated code. Faros.ai telemetry (10,000+ developers, 1,255 teams) describes an "AI Productivity Paradox": individual output up (21% more tasks, 98% more PRs) but "no significant correlation between AI adoption and improvements at the company level," with team-level gains that "do not scale when aggregated." Faros also reports a 9% rise in bugs per developer and 154% larger PRs.
- METR 2025 RCT ([arXiv 2507.09089](https://arxiv.org/abs/2507.09089)): "16 developers with moderate AI experience complete 246 tasks in mature projects on which they have an average of 5 years of prior experience… Before starting tasks, developers forecast that allowing AI will reduce completion time by 24%. After completing the study, developers estimate that allowing AI reduced completion time by 20%. Surprisingly, we find that allowing AI actually increases completion time by 19%." Trust does not track capability. METR now labels this a historical snapshot of early-2025 tools.
- From Zafir's source note, Liu et al. ([arXiv 2603.28592](https://arxiv.org/abs/2603.28592); 304,362 AI-authored commits): 24.2% of AI-introduced issues were still present at repository HEAD, security issues the most likely to survive (41.1%). A human-approved merge is not where the debt ends, so migration toward green needs post-merge monitoring, not just a stronger gate.
- Veracode 2025 GenAI Code Security Report (30 July 2025): across "80 curated coding tasks across more than 100 large language models," models "chose the insecure option 45 percent of the time." Java was worst at 72% security failure, XSS 86%, log injection 88%, and newer or larger models "did not produce significantly more secure code." Model scaling does not guarantee migration.

Verdict: the migration claim is supported in direction but conditional. Stages move toward green only where the seven DORA capabilities are present. Without them, AI amplifies dysfunction and stability regresses. The map should annotate each amber and green with its governance preconditions rather than imply automatic drift.

D1 adds a constraint on what counts as a precondition. Its capability inventory (section 3) records that skills, CLAUDE.md files and sub-agents all shape behaviour probabilistically, so none of them is a control, and that an MCP server's output is bounded by what it is pointed at, which makes context quality a precondition for any amber-to-green move rather than a given. Translated to the map: a stage cannot be moved toward green on the strength of a rules file or a skill. The move needs either a deterministic check (a hook, a CI gate) or a measured threshold, which is the numeric gate open question 3 asks for.

## Empirical evidence

- Productivity RCTs, contested. Peng, Kalliamvakou, Cihon, Demirer ([arXiv 2302.06590](https://arxiv.org/abs/2302.06590); Microsoft Research/GitHub/MIT): +55.8% task speed (95% CI 21 to 89%; p=0.0017) on a bounded HTTP-server task, n=95 freelancers, so a wide CI and an artificial task. Cui, Demirer, Jaffe, Musolff, Peng & Salz field experiments across Microsoft, Accenture and a Fortune 100 firm (Management Science 2025; n=4,867 developers): +26.08% completed pull requests (SE 10.3%), a smaller and noisier field effect. METR 2025 ([arXiv 2507.09089](https://arxiv.org/abs/2507.09089)): −19% for experienced developers on mature repos. Read together: gains are real for greenfield and boilerplate, negative for expert work on complex codebases.
- Security and quality. Veracode 2025 (45% insecure-choice rate; Java 72%, XSS 86%, log injection 88% failure); Apiiro (CVSS 7.0+ vulnerabilities about 2.5× more frequent in AI code; about 10,000 new findings a month by mid-2025, via CSO Online and other secondary reporting of Apiiro's study); Pearce et al. (about 40% of Copilot code vulnerable, now in *Communications of the ACM* 68(2), Feb 2025).
- RE and user stories (Stage 2): Quattrocchi et al. 2025; ALAS 2024; multi-agent RE 2025. All support AMBER.
- Test generation (Stage 7): Schäfer et al. IEEE TSE (online 2023); ACM TOSEM 2025 assertion study; MDPI 2025 review. Correctness gap confirmed.
- Code review (Stages 6 and 7): Amro & Alalfi ([arXiv 2509.13650](https://arxiv.org/abs/2509.13650), Sep 2025, preprint): across 7 vulnerability datasets, Copilot review produced "fewer than 20 comments, most of which addressed spelling or minor style issues," missing SQLi and XSS. AI review is not a substitute for human or security review. GitHub's vendor RCT reports authoring-quality gains (readability +3.62%, reliability +2.94%, maintainability +2.47%, conciseness +4.16%; developers 5% more likely to approve) but it is self-reported and about authoring, not review defect detection.
- UX artifacts (Stage 4): NN/g 2024; CoMPosT EMNLP 2023; ScreenAudit CHI 2025; Guerino INTERACT 2025.

Methodology flags. The strongest pro-AI RCT (Peng) uses an artificial task and freelancers. The strongest anti-AI RCT (METR) has n=16 and is labelled a historical snapshot. The code-review study is a non-peer-reviewed preprint on an early-2025 preview build. Veracode sells security tooling.

## Open questions for later slices

1. Approval-gate design. None of the sources specifies what a human must check before approving an AI PR, story or deploy, or how to prevent rubber-stamping (METR's perception gap suggests reviewers over-trust). What is the minimum viable human-approval checklist per stage? D1's discernment competency (section 2.3: evaluate process, output and performance) is a starting frame for the checklist.
2. Auditability. GitHub logs every agent step, but there is no published standard for auditing why an AI made a design, story or test choice. What audit trail satisfies a regulated entity like NBN Co? D1 (section 6) records the same gap from the certification side: nothing in the path covers recording which model, prompt and configuration produced an output, the "nutrition label" Leon described as missing at NBN.
3. Governance thresholds. At what measured capability (acceptance rate, change-failure rate, vulnerability rate) is a stage allowed to move from amber to green? No source gives a numeric gate.
4. Prompt-injection and supply-chain risk in agentic build, flagged by GitHub's own docs and unaddressed in the baseline.
5. Stage 8 in practice. The baseline never reached deployment; a live environment is needed to test whether AI-assisted rollback and incident response are viable at all.
6. Journey-map accuracy. No empirical validation exists. This is a research gap the UX slice could contribute to.
7. Regulatory codification (supervisor review, 31 Aug). Which regulations actually bind NBN Co as a government-linked entity, and how are they codified as hard limits, in system prompts and tooling, before design work begins? The financial-services precedent (present options, never recommend) shows the shape of the answer; the First Nations inclusive-design policy is the first UX instance to codify. Feeds Slice 3 (governance).

## Recommendations

These are proposals for the team and Alessio; none are applied in the stage sections above.

1. Adopt the map as a taxonomy of recurring concerns, not a waterfall. Add a visible note that Google and Microsoft practice implies iteration, concurrency, and DevOps merging of Stages 6 to 8. If stakeholders read it as phase-gated, redraw it as a loop.
2. Propose Stage 2 move from GREEN to AMBER, with the reason recorded (the RE literature shows a persistent human-acceptance gap). This is the single highest-value correction, and it is backed by peer-reviewed evidence. It is Alessio's framework and the client has seen it, so this goes to him as a challenge, not a change.
3. Keep Stage 4 as one stage with an internal split, and propose journey mapping move to AMBER (hypothesis-grade AI output, human-validated). Keep RED for brand and inclusion, backed by Microsoft Inclusive Design. Add a ScreenAudit-style AI accessibility triage as a documented AMBER mechanic.
4. Annotate every AMBER and GREEN with its DORA capability preconditions. The migration claim only holds where version control, small batches, user-centricity and a quality platform exist. A benchmark to change a colour: sustained change-failure rate under 5% and a clean vulnerability-scan pass before any amber-to-green move. Name the mechanism behind each gate as well: hook or human. A skill or a rules file is not a control (D1 section 3).
5. Classify Stage 8 as AMBER (execution) and RED (incident judgement) using DORA and progressive-delivery evidence, marked "externally derived, unvalidated in baseline." Re-open once a deploy environment exists.
6. Carry the open questions into Slice 2, starting with approval-gate design and auditability, which are the load-bearing governance gaps for an organisation like NBN Co.
7. Present colours at task level on the map, each with a plain-English worked example (supervisor-endorsed, 31 Aug; see "Reading the colours"). A stage banner colour hides that green copy and red decisions coexist inside one stage, and the worked examples are what make the map usable by a design team rather than only defensible to a reviewer.
8. Codify NBN Co's regulatory constraints as hard limits before any AI-assisted design work: identify the binding regulations first, express them as system-prompt-level rules and tool-chain constraints, and treat the First Nations inclusive-design policy as the first codified UX rule. Route the write-up through Slice 3 (governance), where Leon's "Trust in AI Design" deck is already a source.
9. Even for green tasks, scale verification rigour with exposure: internal concept work needs little, internal production tools need a high standard, and customer-facing production assets get the full battery of model, configuration and prompt tests before release (supervisor review, 31 Aug; consistent with the Veracode and METR cautions above).

## Caveats

Two of the eight stages (Stage 1, and the brand half of Stage 4) are largely source-silent in the engineering canon. Their verdicts lean on analogues and should not be read as "confirmed."

The productivity evidence is contradictory (Peng +55.8% against METR −19%). Any claim that AI accelerates a stage has to specify task type and developer experience.

Several Stage 8 mechanics rest on vendor and blog sources; only the DORA capability pages are strong. Treat specific tool configs, such as the Flagger example, as illustrative.

The code-review study is a preprint on an early-preview product, and GitHub's counter-data is vendor self-reported. The true state of AI code review sits between them.

DORA, Veracode and GitHub all have commercial interests in their findings. They are triangulated here against peer-reviewed work but are not neutral.

Figures are current to the 2024 to 2026 sources available at time of writing. DORA and Veracode update annually and should be refreshed for later slices.
