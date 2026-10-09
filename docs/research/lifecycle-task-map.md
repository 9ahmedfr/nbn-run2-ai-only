# Lifecycle task map: the eight stages at task level, with worked examples

> Revision note, 4 Sep 2026. This document applies the second supervisor review (Leon Gouletsas, UX design supervisor, 4 Sep 2026 meeting) to the lifecycle map. It supersedes the stage-level colours in `slice1-spine.md` for presentation purposes; slice 1 stays as the evidence record and is not changed beyond a pointer to this file. Leon's input is cited inline as practitioner input (supervisor review, 4 Sep 2026) and sits outside the source-strength ranking used in the slices. The as-is scenarios below are drawn from the workshop record (D2 v2) and are hypotheses until the developer interviews (PRD-8, Ahmed) confirm them. Two grounded NBN stories (technician dispatch, retailer notifications) run through the examples, with the public regulatory facts behind them verified and the business rules they imply marked as assumptions.

> What this document does. For each of the eight stages it lists the tasks that actually happen inside the stage, gives each task one colour and one holder, and shows with a plain example how the task would run with AI in the loop and what the same task looks like at NBN today. It replaces the stage banner colour with an autonomy-versus-intervention profile. Where a task colour departs from the D2 v2 baseline or a slice 1 verdict, the departure is stated on the row.

## What changed, and why we departed from the brief

The brief and the workshop (D2 v2, section 4.1) gave each of the eight stages a single colour: red, amber or green. Slice 1 tested those colours against Google and Microsoft practice and found that most stages ended up amber, that Stage 2's green did not survive the requirements-engineering literature, and that Stage 4 needed an internal split. The 31 Aug supervisor review added the structural point: colours belong to tasks, not stages, because one stage can hold green copy and red decisions at the same time (slice 1, "Reading the colours").

The 4 Sep review took that to its conclusion. Looking at the current map, Leon's observation was that once the task-level view exists the stage banner adds nothing: "otherwise you're just going to have orange everywhere, for every stage gate." His suggested replacement is a reading of each stage as leaning toward autonomy or toward intervention, with the colours carried on the individual tasks. He also said the team should feel free to say so: the brief said one thing, the research and the practice said another, and a project that follows the evidence over the method is doing its job (practitioner input, supervisor review, 4 Sep 2026).

So this document makes three changes to how the map is presented, and each is a proposal to Alessio rather than a change to the baseline record.

1. Stage banner colours are removed. Each stage carries a profile line instead: leans intervention, mixed, or leans autonomous, derived from the colours of its tasks.
2. Every stage is expanded into the tasks that occur inside it, each with a colour, a holder (human, AI, hook, per the D1 mechanism ladder) and a gate.
3. Every task carries a "how it would work" example, and every stage carries an as-is scenario: the person, the tools they touch today, and where the pain is.

The eight stages themselves are unchanged and keep their D2 v2 names and order. Slice 1's finding that the order is a taxonomy of concerns rather than a waterfall still applies; the stages recur.

One more departure, which is about depth rather than colour. Leon's advice for Sprint 2 was that a team of five cannot develop the whole lifecycle to the same depth, and that it is legitimate to say so: assume the front stages are done well (a good brief, good requirements, the regulations already codified) and go deep on the stages where GitHub and Claude Code interact, because that is what Alessio's workshop was built around and what he asked for on 15 August (practitioner input, supervisor review, 4 Sep 2026). This document covers all eight stages at the same task-level depth so that the map is complete, and it marks Stages 5 to 8 as the ones the Sprint 2 build and benchmark will go deeper on. Stage 1 stays in full because Leon, as the design supervisor, asked for it, and because the map is the one place the front half is written down at all.

## How to read a task row

Colour is the delegation decision for that task, using the D2 v2 definitions: red means a human decides, judges or approves; amber means AI drafts or assists and a human approves; green means AI executes and a human monitors.

Holder is the mechanism that carries the task, from D1 section 3. A human decision or a command a human fires is red territory. A skill, rules file or sub-agent doing the drafting is amber. Green is only defensible where a hook or an equivalent deterministic check (a CI job, a design-system constraint) stands behind the automation. A rules file is not a control (D2 v2 section 4.5).

Gate is what has to be true before the next task starts.

Two general rules from the 31 Aug review apply to every row and are not repeated on each one. The anchor rule: start from what is known to be real (known users, evidence, known tasks and pain points), let AI generate only in gaps deliberately left open, and research every generated hypothesis before treating it as real. The exposure rule: verification rigour scales with exposure, so an internal concept needs little, an internal production tool needs a high standard, and a customer-facing production asset gets the full battery before release.

The examples use three stories. The base one is the workshop exercise, a fault reporting tool for NBN technicians, because every reader of this document has seen it. The other two are the grounded NBN scenarios Leon asked for, set out in the next section. Where an example names a tool (GitHub, Claude Code, a CI pipeline), it is the tool used in the workshop or in this team's own repo, not a claim about NBN's stack.

## Two grounding stories, and the rules behind them

Leon's advice for the playback and the map was to stop describing activity types in the abstract and instead run two or three stories through the whole lifecycle, so that every technical feature (a GitHub Action, a pull request, a hook) is shown doing something an NBN reader recognises (practitioner input, supervisor review, 4 Sep 2026). He suggested the two below and the regulatory angle that makes them NBN-specific rather than generic.

Story A, technician dispatch. A retail service provider (RSP) raises a request through NBN's maintenance portal for a technician at a customer premises. The system has to match the fault to the right kind of technician and equipment (a second-storey job needs a ladder or an elevated work platform, a pit job needs different access) and schedule the visit. The regulatory hook is real and verified: under the enforceable undertaking NBN Co gave the ACCC on 11 September 2018, NBN Co pays RSPs a $25 rebate for every late connection and fault rectification and a $25 rebate for each missed appointment, and RSPs must pass fair value to the customer ([accc.gov.au, NBN enforceable undertaking](https://www.accc.gov.au/by-industry/telecommunications-and-internet/national-broadband-network-nbn-access-regulation/nbn-wholesale-service-standards-inquiry/nbn-enforceable-undertaking), fetched 4 Sep 2026; regulator publication, source class 1). So a scheduling defect is not a usability problem, it is a rebate liability with a regulator behind it. Every story A example below runs on that fact.

Story B, retailer notifications. NBN Co is a wholesale-only company: it sells to retail phone and internet providers and never to end customers ([infrastructure.gov.au, NBN legislative framework](https://www.infrastructure.gov.au/media-technology-communications/internet/national-broadband-network/nbn-legislative-framework), fetched 4 Sep 2026; the page names the National Broadband Network Companies Act 2011, the Telecommunications Legislation Amendment (NBN Measures, Access Arrangements) Act 2011, the Competition and Consumer Act 2010 and the Freedom of Information Act 1982 as the governing framework, with ACCC oversight). The same undertaking commits NBN Co to faster reporting to RSPs on service performance. So when NBN changes a service, schedules maintenance or updates an API, the people who need to know first are the retailers' engineering, sales and legal teams, not the public. Leon's contrast: an update notification from a consumer brand would be spam; the same notification to an RSP is contractually important. Story B is a notification and API-documentation pipeline for retailers.

Assumed business rules, to be verified. Leon's suggestion was to infer plausible business rules from the public regulatory picture, state them as assumptions, and design against them until an NBN contact confirms or corrects them. Slice 3 module 6 holds the regulatory list (Privacy Act, SOCI Act, DDA/WCAG, First Nations commitments, the Statement of Expectations) and records that the Telecommunications Act 1997 was not fetched. The assumptions this document adds are narrower and are written as rules a tool chain could check. A1: every technician appointment has a committed window, and a missed window is a reportable event with a rebate attached. A2: service-affecting changes must be notified to affected RSPs before the change, with an audit trail of who was told what and when. A3: some code bases and the API documentation RSPs integrate against are subject to external review (regulator, RSP engineering), so their change history has to be readable by someone outside NBN. A4: at the workshop Alessio asked people not to put the NBN name or company material into the personal AI accounts in use, and not to put company secrets into Claude. That is a rule about the account, not about the tool or the lifecycle; whether an enterprise account changes it, and which systems if any are off limits to AI, are interview questions (D2 v2 section 9, observed with that narrow scope, not assumed). None of A1 to A3 is verified; each is a candidate interview question and each is used below with its label.

Need statements. Leon also asked for the problems to be written as need or how-might-we statements from the developer's side before any technical idea is attached. Three, in that form. As a developer at NBN, I need every AI-assisted change to a rebate-relevant system to carry a record of what the AI did and who approved it, so that when the ACCC or an RSP asks, I can answer. As a developer, I need the acceptance criteria, the design tokens and the accessibility standard in the repository where the agent reads them, so that I stop re-explaining them in every prompt. As a delivery lead, I need a way to tell affected retailers about a change before it ships that does not depend on someone remembering to send an email. Those three needs are what the story A and story B examples answer.

## A note on the as-is scenarios

Leon's ask was for each stage to show the user moving through the tasks, the pain, and the systems they interact with today, so that the to-be reading has something to be compared against. Two honest limits. First, the team has not yet interviewed an NBN developer; the interview guide exists (`docs/research/interviews/developer-interview-guide.md`, question 1 covers current tooling) and the interviews will most likely land in Sprint 2. Second, the workshop was a simulation on a training exercise, not an observation of NBN's real delivery process. So each as-is scenario below is built from what the workshop record does show and is labelled as a hypothesis where it goes beyond that. The record is thinner than it looks but it is not empty. D2 v2 section 9 gathers what the recordings reveal about NBN's ways of working: a role-based delivery model with recognisably waterfall handoffs (PM, BA, UX, developer, tester), requirements in Jira or Confluence, Microsoft as the default environment (Teams for collaboration, Copilot as the AI tool most people had already used), Git not universal ("not everybody has GitHub or needs GitHub"), Siteimprove already in use for accessibility with WCAG 2.2 AAA treated as part of done, classes of system that are off limits to AI, a guardrail against putting the NBN name into prompts, and a large legacy estate in many languages. Add the 26 Aug supervisor observation that AI use is individual, private and unshared, with no transparency on models or prompts. Those are the tools and constraints named in the scenarios below. Anything beyond them is marked to verify, and interview question 1 is where it gets verified.

## Google's Design Sprint as a task scaffold for Stages 1 to 4

Leon suggested the GV Design Sprint as a source of task structure for the front half of the lifecycle, where Google's and Microsoft's engineering documentation is silent (practitioner input, supervisor review, 4 Sep 2026). The sprint is "a five-day process for answering critical business questions through design, prototyping, and testing ideas with customers" ([gv.com/sprint](https://www.gv.com/sprint/), fetched 4 Sep 2026; company site, source class 4). Its five days map cleanly onto the tasks below and give them a recognised name: Monday (map the problem, pick a target) is Stage 1 tasks 1.1 to 1.2 and Stage 2 task 2.1; Tuesday (sketch competing solutions) is the divergent-options tasks 1.3, 3.2 and 4.3; Wednesday (decide, storyboard) is the decision tasks 1.5 and 3.3; Thursday (build a realistic façade) is 4.3; Friday (test with real customers) is 4.8. The sprint is a human method and says nothing about AI; its value here is that it already separates the diverge steps, where AI generation is at home, from the decide and test steps, which stay human. That is the same shape as the colour pattern in every stage below.

---

## Stage 1: Ideation and business case

Profile: leans intervention. Two red tasks anchor both ends, one amber, one green in the middle. Baseline was RED with an amber first draft (D2 v2); slice 1 found the sources silent on business-case authorship. At task level the stage is neither red nor amber: the framing and the decision are human, and the divergent drafting between them is where the automation lives.

Leon's description of how this stage actually runs is the source for the task list (practitioner input, supervisor review, 4 Sep 2026): set the business context, step into a contextual inquiry of the specific team, refine the business case, back it with evidence from interviews or industry statistics until the pain is located, and only then ideate.

| Task | Colour | Holder | Gate |
|---|---|---|---|
| 1.1 Frame the brief: business context, goals, what is troubling, what is on the horizon | Red | Human | A written brief exists and the sponsor agrees it describes the problem |
| 1.2 Contextual inquiry: narrow from the organisation to the team and the specific process | Amber | AI drafts the environment scan from public sources, human selects | Human has struck out anything the AI asserted without a source |
| 1.3 Generate divergent business-case options with industry examples | Green | AI generates, human monitors | Three to five options exist, none of them shipped anywhere |
| 1.4 Back the preferred option with evidence: interviews, industry statistics, where the pain is | Amber | AI compiles and cites, hook verifies citations, human runs interviews | Every figure in the case has a verified source |
| 1.5 Refine, align stakeholders, sign off | Red | Human | Sponsor sign-off recorded |

How it would work. The brief (1.1) is written by a person and is, in Leon's words, the prompt: a clearly articulated statement of the environment, the goal and the constraint. From that prompt the process slips into automation (1.3): the AI is asked for several divergent business cases, not one, and told to bring industry examples with each. In the workshop the AI drafted a full business case for the fault reporting tool (problem statement, proposed solution, three benefits with metrics, effort estimate, primary risk) in under a minute; the task-level change is to ask for that five times with different framings so the human has something to choose between rather than something to edit. Task 1.3 is green because nothing ships: it is exploration, the lowest-exposure work in the lifecycle. The evidence pass (1.4) is amber because the AI's figures are plausible by construction; the deterministic check is the citation-verification hook Alessio described in the workshop after the model invented references (D2 v2 section 4.5), and the interviews stay human. The decision (1.5) is red and goes back to the humans, with the AI's options as the input. On story A the evidence pass is where the case gets its number: the missed-appointment rebate is public, so the AI can be asked to size the case from it, and the human's job is to confirm the volume figure with NBN before it goes in front of a sponsor.

Why 1.3 is green rather than the baseline's amber first draft. The baseline coloured the whole stage red with an amber draft. At task level, generating options for internal comparison is the exploration case the 31 Aug review called green (a generated exploration that is then codified by humans), and the exposure rule says internal concept work needs little verification. The moment one option is chosen and evidence is attached to it, the work is amber (1.4) and then red (1.5). Departure from baseline: stated as a proposal.

Also in this stage, not carried as coloured tasks: competitor and analogue scan, cost and benefit estimate, risk register first cut, success measures (HEART-style goals for the product), sponsor identification, funding gate. Each is a human-led activity with AI drafting where the evidence rule allows; they are named so the stage reads as the ten-to-fifteen-point list Leon asked for rather than five rows.

As is at NBN today (hypothesis, from the workshop record). A product owner or delivery lead writes the case in a document template, usually alone, pulling numbers from the last similar project and from whatever internal reporting they can reach. If they use AI, it is Copilot or a personal chat account, the prompt and the model are not recorded, and nobody else sees the draft until it is finished (D2 v2 section 9; supervisor observation, 26 Aug 2026). The pain is the time between the first draft and a case the sponsor will read, and the fact that the numbers in it are hard to trace back to a source. Systems touched: a Word template, internal reporting, Teams and email for sign-off. To verify in interviews: whether business cases are written by the delivery team at all, or arrive from outside it.

---

## Stage 2: Requirements and discovery

Profile: mixed. One red anchor, two green drafting tasks, one amber, one red gate. Baseline was GREEN for first-draft user stories, the only green in the walkthrough; slice 1 challenged it to AMBER on the RE literature. The task-level view dissolves the disagreement: drafting is green, the Definition of Ready gate is red, and both the workshop and the literature are describing the same stage from different rows.

Leon on 4 Sep, looking at the map: for drafting user stories you can be AI-forward, but at the very end you have to verify against the Definition of Ready (practitioner input, supervisor review, 4 Sep 2026).

| Task | Colour | Holder | Gate |
|---|---|---|---|
| 2.1 Fix the anchor set: known users, known tasks, known pain points, existing evidence | Red | Human | The anchor set is written down and marked as fact, not hypothesis |
| 2.2 Draft user stories from the anchor set | Green | AI generates, human monitors | Every story traces to an anchor or to a gap deliberately left open |
| 2.3 Draft acceptance criteria and the out-of-scope list for each story | Amber | AI drafts, human edits | Accessibility and security criteria present on every story |
| 2.4 Verify against the Definition of Ready, prioritise, accept into the backlog | Red | Human | Story passes the DoR checklist; product owner accepts |
| 2.5 Commit accepted stories and criteria to the repo as Markdown | Green | Hook (CI check that the file exists and parses) | File is on the branch and referenced by name in later prompts |

How it would work. The human fixes what is real first (2.1): for the fault reporting tool, the technicians, the fault types, the current reporting steps and the known complaints. The AI then drafts stories (2.2) against that anchor set; the literature says the drafts will be stylistically fine, less diverse than human ones, and will miss acceptance criteria more often (slice 1, Stage 2), which is exactly why 2.3 is amber and 2.4 is red. The acceptance criteria pass (2.3) is where the human adds what the AI did not think to ask for. The workshop's own evidence for that is a Tuesday team finding that the generated criteria had no accessibility requirements until they were prompted in (D2 v2 section 7). The DoR gate (2.4) is the Microsoft playbook's team-agreement checklist and is human by definition. Committing the accepted stories as a Markdown file in the repository (2.5) is the pattern several workshop teams invented independently so that every later prompt can reference the file by name instead of pasting context (D2 v2 section 7.3).

Why 2.2 is green and 2.4 is red. Slice 1's challenge to the stage green stands: the stage cannot be green because the acceptance gap is real. But the drafting task on its own is green by the workshop's reasoning (the stories are not novel; the knowledge comes from thousands of similar organisations) and by the exposure rule (a draft story is internal and low exposure). The colour the literature is arguing about belongs to task 2.4, and there it is red. This reconciles the recolour proposal in slice 1 recommendation 2 without contradicting it.

Also in this stage: stakeholder interviews and contextual inquiry with real users, competitive and heuristic review of the current tool, non-functional requirements (performance, availability, security, accessibility), data and privacy impact assessment, regulatory mapping (slice 3 module 6), story mapping and release slicing, backlog grooming cadence.

As is at NBN today (hypothesis, from the workshop record). A business analyst writes stories in Jira from meeting notes and a Confluence requirements page, with acceptance criteria added in the ticket description and the out-of-scope list usually in someone's head (D2 v2 section 9). The Definition of Ready, where one exists, is applied in refinement sessions. The handoff to design and development is a document handed to the next role, which one attendee called "still quite waterfall." The pain is scope creep from criteria that were never written down, which is the failure Alessio warned about in the workshop ("I wanted to make a small change and it ended up changing 35 different files," D2 v2 section 4.2), and the time the analyst spends re-explaining context that lives in a document the developer has not read. Systems touched: Jira, Confluence, Teams. To verify in interviews: whether a Definition of Ready exists and who applies it.

---

## Stage 3: Solution design and architecture

Profile: leans intervention, with the largest amber-if-context-improves lever in the lifecycle. Two red decisions, three amber drafting and investigation tasks. Baseline was RED as delivered, AMBER if context improves (D2 v2), and Alessio's own view was that with good knowledge of the existing infrastructure it should drop to amber. Slice 1 confirmed both halves. At task level the lever is visible as task 3.1: the better the documented context, the more of 3.2 and 3.5 the AI can carry.

| Task | Colour | Holder | Gate |
|---|---|---|---|
| 3.1 Document the existing system: infrastructure map, APIs, existing patterns | Amber | AI reads and drafts, human corrects | A context document exists in the repo that a new engineer could onboard from |
| 3.2 Generate candidate architectures against the approved tool list | Amber | AI drafts three to five options, human selects | Every option uses only approved tools and names its trade-offs |
| 3.3 Trade study and architecture decision record | Red | Human | ADR merged; decision log updated |
| 3.4 Threat model, security and privacy requirements | Red | Human, AI-assisted checklist | Threat model reviewed by someone other than the author |
| 3.5 Technical spike on the riskiest unknown | Amber | AI agent runs the spike, human reads the log | Spike log answers the question it was scoped for, time-box respected |

How it would work. Leon's example (practitioner input, supervisor review, 4 Sep 2026): the team is going to build a page with a map view and it will need user credentials. The AI, given the documented context (3.1) and the approved tool list, suggests an architecture pattern for that, and because the approved list says a particular mapping library and not another, the suggestion uses the approved one. It then sketches what that might look like. That is task 3.2, and it is amber because the suggestion is only as good as the context it was pointed at (D1 section 3 on MCP and context quality). The decision (3.3) is a human trade study recorded as an ADR, the mechanic slice 1 took from the Microsoft playbook; this repo already has one (`docs/adr/001-stack.md`). The threat model (3.4) is red because Microsoft's SDL puts it in design and requires independent review. The spike (3.5) is the team's own INF-6a pattern: a time-boxed question, an agent that goes and finds out, and a human who reads the spike log and decides.

Why 3.1 matters more than its colour. This is the task Alessio's "context is the output" principle points at (D2 v2 section 4.2). The fix for the brand colours incident was not to correct the slide but to have the model learn the design system and write it into the instructions file. Task 3.1 is that fix applied to architecture. It is the precondition slice 1 recommendation 4 names for any amber-to-green move.

Also in this stage: data model and schema design, integration and API contract design (story B's RSP-facing contract starts here), non-functional design (capacity, resilience, observability), build-versus-buy and vendor assessment against the approved list, cost estimate, design review sign-off, architecture fitness functions for CI.

As is at NBN today (hypothesis, from the workshop record). A solution architect or senior engineer draws the design in a diagramming tool, references an infrastructure map that is partly out of date, and records the decision on a Confluence page that is reviewed in a meeting. Approved-tool lists and the off-limits systems list exist somewhere in Confluence (D2 v2 section 9 records that both exist, not where). The estate is decades old and written in many languages by different people, which went unchallenged in a room of NBN engineers. The pain is that the context a new design depends on is scattered across Confluence, several repos and people's memory, so the architect spends most of the stage rediscovering the as-is rather than designing the to-be. Alessio's remark that for a large organisation understanding and documenting the existing system comes first and writing new code comes "fourth or fifth" (D2 v2 section 5) is the same observation. Systems touched: diagramming tool, Confluence, whichever repo host the team uses (Git is not universal), the design review meeting. To verify in interviews: where the infrastructure documentation lives and how current it is.

---

## Stage 4: UX design and prototyping

Profile: mixed, and deliberately split. One red anchor, one amber hypothesis task, one green exploration task, two red decisions with a hook-gated compliance check between them, one amber critique, one red test. Baseline was GREEN for journey mapping and RED for brand and design decisions; slice 1 challenged the green half to amber and confirmed the red half; both supervisor reviews sharpened the red half into a deterministic rule. This is the team's own stage, and the task list is where the 31 Aug and 4 Sep reviews land most directly.

| Task | Colour | Holder | Gate |
|---|---|---|---|
| 4.1 Fix the anchor set: known users, historical evidence, known tasks and pains | Red | Human | Anchors written down as fact |
| 4.2 Hypothesis journey map and proto-personas in the gaps left open | Amber | AI drafts, human researcher validates | Every generated hypothesis has a research task attached |
| 4.3 Skeleton screens straight from the acceptance criteria | Green | AI generates, human monitors | Rough screens exist for every story in the sprint, none of them polished |
| 4.4 Brand and design-system decisions | Red | Human; the design system is the rule set | Design tokens loaded into context before any generation |
| 4.5 Brand compliance check by overlay diff | Green | Hook (design-system CSS overrides generated CSS; visible shift fails) | No visible shift, or every shift is explained |
| 4.6 Usability and accessibility critique | Amber | AI first-pass triage feeding a human expert | Human has dispositioned every AI finding; WCAG target met |
| 4.7 Inclusion decisions, including First Nations inclusive-design policy | Red | Human; codified as a hard limit | Policy codified in the system prompt and tool chain before design starts |
| 4.8 Test with real users | Red | Human | Findings from real users recorded; synthetic users not used as a substitute |

How it would work. Start from what is real (4.1), then let the AI draft the journey map only in the gaps (4.2), which is the NN/g hypothesis-map rule and Leon's anchor rule stated from two directions. Skeleton screens (4.3) come straight from the acceptance criteria, rough on purpose, because the Tuesday team that did this kept its engineer busy on page one while the design pair moved to page two (D2 v2 section 7.1); this is green because it is exploration and the screens are things to react to, not deliverables. Brand (4.4) is red and deterministic: the design system is loaded as a constraint, not described in a prompt, because generation is the wrong tool for enforcing a deterministic system (practitioner input, 31 Aug). The compliance check (4.5) is the overlay-diff mechanic: generate the layout, then load the real design-system CSS so its rules override, and whatever visibly shifts is the violation. It is a hook-shaped check, so it is the one green in the lifecycle that sits next to a red decision without contradiction. The critique (4.6) is amber because the AI accessibility pass covers roughly two thirds of expert-found errors with a meaningful false-positive rate (slice 1, Stage 4), so it triages for a human rather than replacing one; the workshop's Team 6 turned their first page's findings into an accessibility skill so later pages were generated against the standard (D2 v2 section 7.3), which is the small worked example of amber moving toward green. Inclusion (4.7) is red and has to be codified before the stage starts, not checked after. This is also where the map should show what the team chose not to do, which Leon called part of good design: because accessibility is a hard requirement at NBN (Siteimprove, WCAG 2.2 AAA, screen readers), the design system the agent generates against has less motion, no auto-dismissing pop-ups, no information carried by colour alone, and a keyboard path through every flow, and those choices are enforced in 4.5 rather than reviewed in 4.6. Story A: the technician-matching screen shows the equipment requirement as text and an icon, never as a coloured badge on its own. Testing (4.8) is red and human: synthetic users idealise and fabricate (slice 1, Stage 4), and the Design Sprint's Friday is real customers for the same reason.

The edge case to show on the map. A brand-new device type that no design system yet covers (Leon's foldable example, 31 Aug): AI generates the exploration (green, like 4.3), and the findings are codified back into the design system by humans (red, 4.4). Exploration is green; codification and enforcement stay red. That is the same pattern as 1.3 into 1.5.

Also in this stage: content and microcopy, information architecture, interaction states and error handling, motion and animation policy (the deliberate reductions above), localisation and plain-English review, design-token maintenance, design QA against the build, handoff notes and the screenshot-as-specification technique (D2 v2 section 7.3).

As is at NBN today (hypothesis, from the workshop record, and the best-evidenced as-is in the set because Group 1 designers spoke about it). A designer works in a design tool against the brand's design system, produces screens over a day or more, and hands them to engineering at the end. The workshop showed the pain from both sides: prose is a poor input device for spatial decisions ("very fiddly... to get very fundamental design things on the page," D2 v2 section 7.4), generated designs drift off the design system as the context fills up, unconstrained generation converges on generic output, and while the designer works the developer sits idle (section 7.1). The brand colours incident (section 4.3) is the as-is failure in miniature: colours came from training data, not from the design system, and nobody could say where they came from until asked. NBN already runs Siteimprove for accessibility and treats WCAG 2.2 AAA as part of done (D2 v2 section 9), so task 4.6 fits alongside an existing control rather than introducing one. Systems touched: design tool, design-system documentation, Siteimprove, handoff via screenshots or exported files, the developer's repo. To verify in interviews: whether design tokens exist in a machine-readable form the tool chain could enforce.

---

## Stage 5: Development planning

Profile: mixed. Two amber drafting tasks, one red instruction task, one red commitment, one green mechanical push. Baseline was AMBER (D2 v2); slice 1 confirmed it through the small-batches capability. At task level the amber splits into what the AI proposes and what a person has to own, and the most important row is the one the workshop put the most weight on: writing the issue properly.

| Task | Colour | Holder | Gate |
|---|---|---|---|
| 5.1 Slice the work into minimal, single-purpose issues | Amber | AI proposes the slicing, human adjusts | No issue bundles more than one purpose |
| 5.2 Prioritise (MoSCoW), assign to roles, flag dependencies and complexity | Amber | AI drafts, human edits | Every issue has a priority, an owner role and its dependencies listed |
| 5.3 Write each issue properly: acceptance criteria and the out-of-scope list | Red | Human (the instructing role) | Out-of-scope list present; criteria testable |
| 5.4 Commit the sprint plan | Red | Human | Team and product owner agree the plan; capacity checked |
| 5.5 Push the issues into the repo host | Green | Hook (issue template validation) | Issues exist, templated, linked to the stories file from 2.5 |

How it would work. The workshop demonstrated 5.1 and 5.2 end to end: MoSCoW, story-to-role assignment across front end, back end and full stack, dependency flagging and complexity estimates, output as a two-week sprint plan and then pushed into GitHub issues (D2 v2 section 4.1). The task-level change is where the human's attention goes. Slicing (5.1) is amber because the small-batch rule has to be enforced on an AI planner: agentic PRs bundle multiple purposes at over three times the human rate (slice 1, Stage 5). Writing the issue (5.3) is red because it is the human's control surface over everything that follows: "if you write a good issue, you will get a good outcome," and the out-of-scope list is what prevents the 35-file change (D2 v2 section 4.2). Alessio's separation between people who instruct and people who build is this row. The push (5.5) is green because it is mechanical and an issue template can check it deterministically.

Also in this stage: capacity and availability check, risk and dependency review, spike identification, Definition of Done agreement, environment and access readiness (the workshop lost time to tenant and account boundaries, D2 v2 section 9), sprint goal statement, communication plan for affected RSPs (story B).

As is at NBN today (hypothesis, from the workshop record). A delivery lead or scrum master runs planning in Jira: stories are estimated in a session, assigned by who is free, and dependencies are discovered when someone is blocked. Out-of-scope is rarely written. The pain is that the plan is only as detailed as the meeting had time for, and the person who wrote the ticket is not the person who reads it two weeks later. Systems touched: Jira, the sprint board, a capacity spreadsheet, Teams. To verify in interviews: whether issues carry acceptance criteria today, and who writes them.

---

## Stage 6: Development and build

Profile: leans autonomous, with a red gate at the end. One amber planning task, two green execution tasks behind hooks, one red review, one amber iteration. Baseline was AMBER, issue-driven agent to PR (D2 v2); slice 1 called it the best-evidenced stage and confirmed the human merge gate. Slice 2 modules 1 to 3 give the operational detail (issue to branch, how a commit is done, how branches become merges) and are not repeated here.

| Task | Colour | Holder | Gate |
|---|---|---|---|
| 6.1 Agent reads the issue, confirms each acceptance criterion, plans | Amber | AI plans, human confirms the plan | Plan accepted before any code is written |
| 6.2 Branch, implement, commit | Green | AI executes; hooks enforce (lint, format, conventional commit, secret scan) | Every commit passes the pre-commit hooks |
| 6.3 Open a draft PR with description and provenance | Green | AI executes; hook checks the provenance trailer | PR carries Co-Authored-By and the model and prompt record |
| 6.4 Human code review and merge approval | Red | Human | Approved by someone other than the author; CI green |
| 6.5 Iterate on review comments | Amber | AI revises, human re-reviews | Reviewer's comments resolved |

How it would work. This is the loop the workshop showed live and the one GitHub's own coding-agent documentation describes: a GitHub issue drives the work, the agent reads it, confirms its understanding of each acceptance criterion, plans, branches, implements, writes tests and opens a pull request (D2 v2 section 4.1; slice 1, Stage 6). The plan step (6.1) is amber because the plan command escalates to a stronger model and is the last cheap point to redirect (D2 v2 section 4.2). Execution (6.2, 6.3) is green only because hooks stand behind it: the pre-commit hooks in this repo run lint and format, the commit-msg hook enforces conventional commits, and CI runs a secret and dependency audit (slice 2, modules 2 and 3). Review (6.4) is red in every source slice 1 checked. Iteration (6.5) is amber and is the realistic shape of the loop: in the field data, the agent stayed involved in 41 percent of post-merge revisions (slice 1, Stage 6).

Story A and story B on this stage. When the issue is a change to the appointment-window logic (assumption A1), the PR the agent opens has to be readable by someone outside the team a year later, because a missed-window rebate dispute will ask what changed and who approved it; that is why 6.3's provenance record and 6.4's named human approver matter more here than in a generic repo (assumption A3). For story B, the same PR that changes an RSP-facing API also regenerates the API documentation the retailers integrate against; the regeneration is green (it is derived from the code by a build step) and the decision to publish it to RSPs is red and belongs to Stage 8.

Two honesty notes on the green rows. First, the provenance trailer in 6.3 is not currently enforced in this repo; slice 3 module 4 records the absence of Co-Authored-By trailers on main as a liability finding. Until a hook checks it, 6.3 is amber in practice. Second, the merge gate in 6.4 depends on branch protection, and on this repo the ruleset targets no branch (slice 2, gap 3), so the gate is a convention, not a control. Both are recorded gaps, not map colours.

Also in this stage: local setup and environment parity, coding standards and linting rules, secret handling and the no-NBN-data rule, dependency selection against the approved list, database migrations, feature flag wiring, documentation updates in the same PR, pairing or mob sessions where the change is rebate-relevant.

As is at NBN today (hypothesis, from the workshop record). A developer picks up a Jira ticket, reads it, asks the analyst what it meant, branches, writes the code, writes some tests, and opens a PR that waits for a reviewer. Not every developer is on GitHub; some work from a local repo only (D2 v2 section 9), which is a constraint on any issue-to-PR loop. If they use AI, it is Copilot in the editor or a personal chat, with no record of what it wrote (supervisor observation, 26 Aug 2026). Ordinary corporate boundaries add friction: in the workshop one engineer was blocked pushing to the shared repo because he was authenticated with a personal account, and one team could not exchange Word files across tenants. The pain is the wait for review and the re-explanation of context, and, once AI is in the loop, the decision load that lands on the reviewer: "the review decision making and diligence took longer than expected when Claude kind of owns the creation" (D2 v2 section 7.1). Systems touched: editor, Copilot, the repo host where one exists, CI, Jira. To verify in interviews: which AI tools are in use and whether any policy governs them (interview questions 1 and 7).

---

## Stage 7: Testing and QA

Profile: mixed, with a hard ceiling. Two green execution tasks behind CI, two amber generation and review tasks, one red judgement that the literature says cannot be automated. Baseline was AMBER with the open question "are all the tests correct?" (D2 v2); slice 1 confirmed it and found the open question validated by measurement (roughly half of generated tests and assertions are wrong). Slice 2 module 4 (how harnesses are used) has the mechanics.

| Task | Colour | Holder | Gate |
|---|---|---|---|
| 7.1 Generate unit tests alongside the change | Amber | AI writes, human reads | Tests exist for every acceptance criterion |
| 7.2 Run the CI suite: lint, typecheck, unit tests, audit | Green | Hook (CI) | All checks pass |
| 7.3 Adversarial review pass by a separate agent | Amber | Sub-agent reviews, human decides on findings | Findings surfaced to a human, none auto-resolved |
| 7.4 Judge whether the tests are correct | Red | Human, with mutation-style tooling as evidence | Human confirms the tests would catch a real fault |
| 7.5 Security scan and dependency audit | Green | Hook (CI) | No high-severity finding, or each one dispositioned by a human |

How it would work. The agent writes tests with the change (7.1); CI runs them (7.2); a review command runs an adversarial pass with a separate agent and surfaces issues for a human decision (7.3), which is what the workshop demonstrated and what Alessio's separation-of-duties principle requires: an agent may surveil another agent, "but definitely not itself" (D2 v2 section 4.5). Then the question the workshop left open: are the tests correct? Task 7.4 is red because the answer is structural, not a matter of model quality. A sub-agent that checks tests has the same next-token properties as the agent that wrote them, so it can widen coverage but cannot be an independent oracle (D1 section 3; slice 1, Stage 7). The human check is what makes 7.2's green defensible: CI can tell you the tests pass, only a person can tell you the tests are the right tests. Mutation-style evaluation (do the tests detect an injected fault at all) is the tooling that gives the human evidence to judge on.

The green rows and this repo. CI here has four jobs (lint and typecheck, frontend tests, backend tests, security scan), so 7.2 and 7.5 have hooks in force behind them. The security scan fails red on a high-severity audit finding but is advisory, because nothing blocks a merge on a failed check (slice 2, gap 3). The colour is right for the design and wrong for the current configuration, and the gap is recorded.

Also in this stage: integration and end-to-end tests, accessibility testing (Siteimprove and a screen-reader pass), performance and load testing, contract tests for RSP-facing APIs (story B), exploratory testing by a human, test data management with no production data, defect triage, release readiness review.

As is at NBN today (hypothesis, from the workshop record). A developer writes tests for their own change, CI runs them, and a tester or a second developer does a manual pass before release. Test adequacy is judged by coverage numbers and by whoever reviews the PR. The pain is that coverage does not measure correctness, and that once AI writes the tests the reviewer has to judge tests they did not write against code they did not write, which is the decision-load problem stated for this stage (D2 v2 section 7.2). Systems touched: CI, test reports, the PR, Siteimprove for the accessibility half of the pass. To verify in interviews: what the release checklist actually contains and who signs it (interview question 4).

---

## Stage 8: Deployment and iteration

Profile: leans autonomous for execution, intervention for judgement. Two green execution tasks behind hooks, one red promotion decision, one amber monitoring task, one red incident task, one amber learning task. Baseline was not reached in the workshop. Slice 1 proposed AMBER for execution and RED for incident judgement from external evidence; slice 2 module 6 covers deploy mechanics; slice 3 module 6 records that the SOCI Act bears on deployments for NBN Co. Everything here is unvalidated in the baseline and is marked as such on the map.

| Task | Colour | Holder | Gate |
|---|---|---|---|
| 8.1 Preview deployment on every PR | Green | Hook (CI, hosting platform) | Preview URL posted on the PR |
| 8.2 Progressive rollout: flags, canary rings, metric-gated automatic rollback | Green | Hook (rollout controller) | Success-rate and latency thresholds hold at each ring |
| 8.3 Production promotion approval | Red | Human (release owner; regulated where SOCI applies) | Approval recorded against the release |
| 8.4 Monitoring and alert triage | Amber | AI summarises signals, human decides | Every alert has a human disposition |
| 8.5 Incident response and post-incident review | Red | Human | Blameless post-incident record written |
| 8.6 Fold the learning back into context: rules files, skills, design system, ADRs | Amber | AI drafts the update, human approves | The change is in the repo, not in someone's chat history |

How it would work. A PR gets a preview deployment automatically (8.1); this repo already does this through its hosting platform. Rollout (8.2) is green only behind a deterministic controller: feature flags decouple deploy from release, rings ramp exposure, and rollback fires on a metric threshold without a human in the loop (slice 1, Stage 8; DORA continuous-delivery capability). Promotion to production (8.3) is red: Google gates it behind role-based human approvals and Microsoft's safe deployment process requires a rollback plan before deploying (slice 1, Stage 8 reconciliation), and for NBN Co slice 3 adds that the SOCI Act may make the approval a regulated act. Monitoring (8.4) is amber: AI can summarise dashboards and correlate alerts, a human decides what they mean. Incidents (8.5) are red in every source. Story B lives here. A service-affecting change (assumption A2) triggers a notification to the affected RSPs before the ring rollout begins, drafted by the AI from the PR and the change record, approved by a human, and sent through a channel that logs delivery. The notification and the API-documentation publish are the same release event as the deploy, so 8.3's approval covers all three. Story A: the rebate-relevant scheduling change rolls out to one ring first, and the metric the rollback watches is missed-appointment rate, not just error rate, because that is the number the undertaking prices. The last task (8.6) is the one that makes the migration claim real: when a rule, a brand token or an accessibility standard is learned in production, it is written back into the context that the next cycle generates from. The workshop's brand-colours fix and Team 6's accessibility skill are both instances of 8.6 (D2 v2 sections 4.3 and 7.3), and slice 1's finding that AI amplifies what is already there means this task is where a stage earns a greener colour next time round.

Also in this stage: release notes, change-management ticket and CAB alignment where it exists, RSP notification and API-documentation publish (story B), on-call handover, SLO and error-budget review, missed-appointment and rebate reporting (story A), post-release user feedback, decommissioning of the flag once the rollout completes.

As is at NBN today (hypothesis, unvalidated; the workshop never reached deployment). A release is scheduled, approved through a change process, deployed by a pipeline or by an operations team, and monitored by whoever is on call. Learning from incidents goes into a post-incident document that is read once. The pain, if the interviews confirm it, is that the change process and the delivery cadence run on different clocks, and that what is learned in production does not reach the people writing the next set of requirements. Systems touched: change-management tool, deployment pipeline, monitoring and alerting, on-call rota. To verify in interviews: whether deployments are automated at all and what the approval path is (interview questions 7 and 8).

---

## Reading across the stages

Three patterns show up in every stage once the colours sit on tasks, and they are the point of the map.

The shape is human, AI, human. Each stage starts with a red anchoring or framing task, opens into amber or green generation in the middle, and closes on a red decision or gate. Leon described this for Stage 1 as a brief that becomes a prompt, a slip into automation that produces divergent options, and a return to a human-controlled decision (practitioner input, supervisor review, 4 Sep 2026). The same shape appears in Stages 2, 3, 4 and 5. In Stages 6 to 8 the middle is greener because hooks exist, and the closing red is a merge, a promotion or an incident call.

Green means a hook, not a feeling. Every green row in this document names the deterministic check that stands behind it, and where the check is not actually in force in this repo (branch protection, provenance trailers, blocking on a failed scan) the row says so. This is D1's ladder applied: a hook can enforce, a human can judge, and nothing else holds a gate.

The migration lever is context, and it is a task. Alessio's amber-if-context-improves is task 3.1 in design, 2.5 in requirements and 8.6 in iteration. Each of those writes what a human learned into a file the next generation reads from. That is the operational meaning of "context is the output," and it is what the map should point at when someone asks how a stage gets greener.

## What this changes in the other deliverables

The Figma map (frame B) should drop the stage colour bars, keep the stage boxes as containers, carry the profile line in place of the colour label, and expand each box's task rows to the lists above with a colour chip per row. The four challenge notes stay; a fifth note should record the departure from the brief in one sentence.

Slice 1 stays as the evidence record. A pointer note at its head directs readers here for presentation.

D3 (the consolidated research report) should use this document's stage sections as its map chapter and the slices as its evidence appendices.

The Sprint 1 playback should follow the arc Leon set out: the brief and its audience, the first research, the framework as given, what the testing found (the stage colours did not hold), the pivot to this task-level map, then a couple of highlighted tasks per stage with the story A and story B examples and the choices the team made as a result, then the Sprint 2 focus. The remaining tasks go in footnotes and in this document rather than on slides.

The developer interview guide already asks the questions that would replace the as-is hypotheses above with observations; question 1 (current tooling) and question 4 (what you check before accepting AI work) are the two that matter most for the map. When the interviews land, each as-is scenario should be rewritten from the transcript and the hypothesis label removed.

## Caveats

The as-is scenarios are inferred from a simulation and a single supervisor observation. They are written to be replaced.

Every departure from the D2 v2 baseline is a proposal to Alessio: the removal of stage colours, the green on tasks 1.3 and 2.2, and the profiles. The workshop record stays as delivered.

The green rows in Stages 6 to 8 describe the design of the pipeline, not its current state in this repo, where three of the checks are advisory or absent (slice 2, gap 3; slice 3, module 4).

The Design Sprint reference is a company site and is used for structure only; it makes no claims about AI.

Leon's 4 Sep input is captured from the meeting recording and has not yet been confirmed by him in writing. His own written green, orange and red example statements, offered on 31 Aug, are still outstanding and should be folded in when they arrive.
