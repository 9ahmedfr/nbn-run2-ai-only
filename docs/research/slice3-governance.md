# Research slice 3: governance, prompt practice and collaboration

> Slice 3 of three. Slice 1 tested the map's colours against Google and Microsoft practice. Slice 2 went inside the build stages at the depth of commands and gates. This slice covers what sits around every stage: how people work together when an agent is in the loop, what a guardrail is and is not, what AI work costs, who is answerable for it, how prompts are written, stored, versioned and shared, and which external rules bind NBN Co before any of that starts. Requirements and the card checklist: `slice3-governance-requirements.md`.

> Status, 4 Sep 2026: all six modules drafted 2 Sep; rebased onto `main` after slice 2 (PR #21) and D1 merged, and every D1 section cited here was rechecked against the merged file. The Telecommunications Act 1997 was not fetched and is carried to D3 as an open item. One marked slot is open and does not block the slice: Leon Gouletsas's "Trust in AI Design" deck, named as a slice 3 source in slice 1, is not yet in the team folder; its outline from the 26 Aug meeting is cited as practitioner input until the file arrives. Zafir's INF-6a token figures fill a second slot in Module 3 when they land.

> Citation status: every policy, statute and vendor document introduced in this slice was fetched on 2 Sep 2026 and is listed in the citation record at the end with what was verified. Policy sources carry their fetch date in the text because they change; the standard most commentary still cites was superseded eleven months after publication. Sources inherited from slices 1 and 2 carry those slices' audits.

Nothing here is invented. Every claim is documented practice (cited), observed in the workshop record (D2 v2), demonstrated in our own repository, or practitioner input from Leon (26 and 31 Aug, recorded). Where a gate is named, it is labelled with the mechanism that holds it per Sidney's D1 capability inventory (`docs/reports/D1-claude-certification.md`, section 3): hook, CI check, or human. Skills, CLAUDE.md and sub-agents shape work but hold no gate.

Three findings shape the whole slice and are stated up front. First, NBN Co is a Government Business Enterprise, which puts it outside the mandatory scope of the Commonwealth's AI-in-government policy; the policy is the nearest model for NBN Co, not an obligation on it. Second, the Voluntary AI Safety Standard and its ten guardrails, still widely cited, were replaced in October 2025 by six essential practices, and the sixth is "maintain human control," which is the map's red in the regulator's words. Third, the mechanism that holds every governance rule in this slice is one of the three from D1; a policy that names a skill or a rules file as its control has named nothing.

---

## Module 1: Collaboration with an agent in the loop

### The story

Tuesday at the workshop, twelve teams, no collaboration method taught, and a tool the facilitator himself called "not something that seems ready for proper group collaboration" (D2 v2, s10.2). Team 6's engineer sat idle while the designers worked; another team's build took "maybe 20 minutes" against a whole session of process around it (s7.1). By the afternoon the same teams had invented their own answers. The business analyst committed the acceptance criteria into the repository as Markdown and everyone prompted against the file by name. The designer stopped listing defects and pasted a screenshot in with "compare to the screenshot and fix up any elements that are missing." Team 6 stopped running a relay: the BA, UX and PM worked the acceptance criteria together, generated rough skeleton screens from them, and handed the build over page by page, so the engineer built page one while the design pair moved to page two. And one team ran an external accessibility checker, fixed the failures with the model, then wrote the standard into a skill so the next page was generated against it.

None of that was taught. All of it was invented under time pressure by people on their second day with the tool, and D2 calls that an argument for its practicality rather than against it (s7.3).

### The mechanics

Four patterns, each with the mechanic that makes it work, the slice 2 module it lands in, and the NBN constraint it has to survive.

Acceptance criteria as a shared artifact in version control. The BA writes the criteria, commits them as Markdown, and every prompt references the file by path rather than pasting context around. Git becomes the shared memory the tool does not provide (D2 s7.3). Slice 2 Module 1 already writes this up as our repository's issue-to-branch flow: the issue and a committed `docs/acceptance/<feature>.md` are the two artifacts that exist before any agent touches anything. The NBN constraint is the hardest one in the record: "Not everybody has GitHub or needs GitHub. As long as the developer has it on their machine," and requirements live in Jira or Confluence (s9). The pattern survives only if the acceptance file is the thing that syncs between Jira and the repository, or if the non-developer roles get read access to the repository. Either is a decision NBN has to make; the pattern cannot make it for them.

The screenshot as the specification. For the UX-to-engineering handoff, a screenshot plus one instruction replaced a written defect list (s7.3). It did not get all the way there; this is where the "90 percent wall" was named. In slice 2's terms it is a Module 5 mechanic that sits before the overlay-diff check: the screenshot says what the screen should be, the overlay diff says whether the tokens were honoured. The constraint is tenancy: one Tuesday team could not exchange Word documents across tenants and worked around it by converting everything to Markdown (s9). A screenshot in a Teams chat crosses that boundary; a Figma link may not.

Skeleton first, then pipeline the pages. Generate rough screens directly from the acceptance criteria before anything is built, then release the build page by page so no role waits on another (s7.1). It is the only structural answer to idle time in either cohort, and the team that used it was honest about the cost: "the review decision making and diligence took longer than expected when Claude kind of owns the creation." The work moved from build into review. That is the decision-load problem (s7.2), and it is the reason this pattern needs Module 2's gates and Module 3's cost record around it rather than being adopted on its own.

A review finding encoded as a skill. Team 6 found five or six WCAG 2.2 AAA failures, fixed them, and wrote the standard into a skill; the count on the next page "drastically reduced" (s7.3). D2 calls it the only case in either cohort of a review finding becoming a control that applies automatically next time, and slice 1 calls it the one worked example of amber-to-green migration in the record. It is also the pattern D1 section 3 warns about: a skill's invocation is probabilistic, so what Team 6 built is an assist that raises the floor, not a gate. Slice 2 Module 5 pairs it with the axe scan that is the gate. NBN already has the tooling half: a team reached for Siteimprove unprompted and treated a WCAG pass as part of definition of done (s9).

The sharing mechanism exists and is not used. D1 section 2.6 records that the Cowork course teaches plugins as the way to "encode your team's expertise," a validation step before a skill is shared, and distribution across a team. Leon's observation from the NBN workshops (26 Aug) is that staff run separate instances with no transparency on models or prompts and no process for sharing what they learn. D1 section 6 draws the conclusion: the mechanism is taught and not adopted, so this is an enablement gap, not a tooling gap. Module 5 carries the mechanics.

### The two questions from the floor

Both went unanswered on the day and both are ours (D2 s7.5). Ben asked whether collaboration is less necessary under an agentic model or was only hard because this was a simulation. The answer given, one shared tool, notifications on who changed what, clean handovers, "then you can do many steps in parallel," is an assertion. The four patterns above are the evidence that it is partly true: parallelism came from the repository, not from the tool. Karen asked whether documentation stops being the artifact, since a prototype that is 80 percent right and the comments on it become the spec. The counter came immediately and is the right one: this works for a screen and not for a backend change, and there are systems nobody should point it at. In the map's terms, Karen's method is green for a Stage 4 screen and red for a Stage 3 design decision, which is the task-level reading Leon asked for.

### The human gate

A person decides which artifact is the contract (the issue and its acceptance file), who may change it, and when a generated skeleton is good enough to hand over. Nothing in the four patterns runs without someone making that call, and the team that pipelined its pages paid for it in review time.

### The failure mode

The pace problem. "If you spend a whole day doing a UI before you hand it over, that is a whole day the developer was sitting still," and "if every one of them feels the need to sprint to keep up, otherwise they are the slowest person in the group, that could actually be a burnout issue" (s7.1). A lifecycle model that only measures throughput produces exactly this. The second failure is the one Alessio conceded: delegating production converts it into review faster than people can absorb, and "nobody has that solution yet" (s7.2). Slice 3 does not have it either. What it has is the cost record in Module 3, so that the conversion is at least visible.

### Colour and gate mechanism

Task-level: generating skeleton screens and first-pass fixes from a screenshot is green to amber; committing the acceptance criteria and deciding the handover point is red. Gate mechanism (D1 s3): human, throughout. The accessibility skill is an assist; the axe scan behind it is the CI check.

---

## Module 2: Guardrails, what holds and what only shapes

### The story

An attendee on the Tuesday asked the question every governance document has to answer: what happens when a rule written into CLAUDE.md is not honoured? Alessio's answer was more pessimistic than anything else in the workshop. "It is really hard to fully create a very serious guardrail. It would be better to have an external guardrail, like an external governance system that checks what you are actually doing." His worked example: write a line saying never reveal the `.env` file and "you will find that most of the times it will not reveal it. But there are other occasions where it will, and you only need to reveal it once to basically give away your APIs" (D2 v2, s4.5).

A junior developer reading a governance policy needs one test for every rule in it: if the model ignores this, what happens? If the answer is "nothing," the rule is advice.

### The mechanics

Sorting rules by what holds them. D1 section 3 gives the sort. A hook runs deterministically at a defined trigger and blocks; it cannot judge. A command is fired by a person. A skill, CLAUDE.md and a sub-agent all shape behaviour probabilistically; an MCP server is bounded by what it is pointed at. So a governance rule has three possible holders: a hook or CI check for anything a pattern can catch, a human for anything needing judgement, and nothing at all for a rule that only exists in a prompt. Slice 2 Module 4 lists the concrete instances in our repository: the lefthook commit-msg check, the `PostToolUse` hook that exits 2 on `any` types, the `permissions.deny` list, and the four CI jobs. This module's contribution is the policy rule: every control named in a governance document states its holder, and a document that names a skill or a rules file as a control has to be sent back.

Separation of duties. Alessio's second mechanism: "maybe you have a Claude agent that surveils another Claude agent, but definitely not itself" (s4.5). D1 sharpens it: an agent checking an agent is the same class of system and "is not an oracle," so separation widens coverage without certifying anything (s3). The human form is GitHub's rule that the person who requested an agent PR cannot count as its approver (slice 2 Module 3). Both belong in the policy, stated with their limit.

The context-competition trap. Alessio named it himself: "when you create an ecosystem like this, it becomes part of your context. If you then end up having a context environment which is like 90 percent of the actual total context, then you defeat the purpose of it altogether," and "if you have done a lot of work and you are down to 180,000 into your context, it will barely care about what was happening at the beginning" (s4.5). This is a governance constraint: every rule added to CLAUDE.md costs working context and decays with session length. The partial answer from the workshop is small tasks and sub-agents that start clean ("the sub-agent will have no poison context"). The fuller answer is the sort above: move anything that must hold out of the prompt and into a hook, where it costs no context at all.

The regulator's version. The Guidance for AI Adoption (October 2025) condensed the earlier ten guardrails into six essential practices, the sixth being "Maintain human control," with the instruction to "ensure meaningful human oversight" matched to "how much autonomy the system has, and how high the stakes are" ([industry.gov.au](https://www.industry.gov.au/sites/default/files/2025-10/guidance-for-ai-adoption-foundations.pdf), fetched 2 Sep 2026). That is the red of the map, the rigour-scales-with-exposure rule from Leon's 31 Aug review, and the D1 ladder, said once by a regulator. The Commonwealth policy for its own agencies goes further and requires "a clear process to address AI incidents" and "a pathway for staff and the public to report AI safety concerns" ([dta.gov.au](https://www.dta.gov.au/articles/ai-policy-update-strengthening-responsible-use-across-government), fetched 2 Sep 2026). Neither says how; the mechanism sort above is the how.

### The human gate

A person owns the deny list and the hook set, reviews every change to them like code (they are code), and signs off the sort: this rule is held by a hook, that one by review, the other is advice and is labelled as such. The Guidance's first practice, "Decide who is accountable," is this person by name.

### The failure mode

Governance theatre: a CLAUDE.md that reads like a policy and holds nothing, reviewed by nobody because it is "just instructions." It fails open, silently, and once is enough. The second failure is the opposite: a hook set so aggressive that developers route around it, which is how Prettier ended up with `|| true` in our own lefthook file. A control nobody can live with becomes a control nobody runs.

### Colour and gate mechanism

Task-level: drafting a rule is green; deciding it is a control, and what holds it, is red. Gate mechanism (D1 s3): hook and CI check for pattern-matchable rules, human for judgement, and an explicit "no gate" label for anything that lives only in a prompt.

---

## Module 3: Token accounting and cost

### The story

Alessio put a figure on it live. Fourteen percent of his quota gone in a session, of which a single generated document accounted for seven percent, on an account with five times the standard allowance. "Creating this document would have taken maybe 40 percent of your five-hour quota" for a normal user. The reason: "creating the document is not the same as outputting to the chat, because in order for anything to go into a document it has to go through a script. To create one single heading with 10 words, it might have cost 3,000 tokens." During the Thursday build, two of roughly 35 users hit their limit and the facilitators topped up allowances in 20 dollar increments in real time (D2 v2, s4.4).

The client brief names a governance and token model as a deliverable. D1 section 6 records that the certification path says nothing about cost. So the team is building this part from the workshop record and its own spike.

### The mechanics

What to record. Three numbers per task, in the spike log: generating time, reviewing time, and tokens consumed. Sidney's `docs/templates/spikeLogTemplate.md` already asks for the first two and the ratio between them; this slice asks Zafir to add the third when INF-6a runs (marked slot). The ratio is the cost of Module 1's decision-load problem made visible: if generation takes two minutes and review takes forty, the bottleneck has moved and the model should say where.

When to spend. Alessio's practical rule: "talk to me inline, do not create any documents" during exploration, and generate artifacts only at handover (s4.4). D2 section 4.2 adds two more: plan and review commands "route to a stronger model automatically, and it is not a setting," so a junior who wants the cheaper model phrases the request in plain language instead; and skills stop the reinvention, so a task done repeatedly costs less as a skill than as a fresh prompt each time. Sub-agents cut context cost for the same reason they cut poisoning: they start clean (s4.5).

How quotas behave. Five-hour session windows, weekly reset, individual top-ups, and the licence restriction that attendees left with: "do not put NBN data, keep it outside of work" (s4.4). That last line is a data-handling rule wearing a cost note, and Module 6 picks it up.

The regulator's ask. The Commonwealth policy's mandatory requirements include an internal register of AI use cases with "an accountable owner for each" (dta.gov.au, fetched 2 Sep 2026); the Guidance for AI Adoption asks organisations to "create and maintain an AI register" and to "document every activity in these essential practices" (industry.gov.au, fetched 2 Sep 2026). Neither asks for cost. A register that records who owns each use and what it consumes per task would satisfy both and answer the brief; that is the proposal.

### The human gate

Whoever owns the register decides what a task is allowed to cost. Nothing in the tooling stops a document generation at 40 percent of a quota; a person does, before the task, by choosing chat over document.

### The failure mode

A team that measures throughput and not cost will discover the cost when two people hit their limit mid-build, which is what happened on the Thursday. The second failure is quieter: review time is never recorded, so the decision-load problem stays invisible and the model reports a speed-up that the reviewers paid for.

### Colour and gate mechanism

Task-level: recording tokens per task is green (it is a log line); deciding the budget is red. Gate mechanism (D1 s3): human. There is no hook for spend in the record; a quota limit is the platform's own hard stop, and it arrives with no warning.

---

## Module 4: Liability, provenance and code authorship

### The story

A PR merges. Six weeks later a security scanner finds an injection path in the handler. The commit that introduced it has a human author, a Conventional Commits message, a green CI run and an approving review. Nothing in the repository says an agent wrote the code, which model it was, what it was asked, or what it was told to assume. The reviewer remembers approving it and remembers the PR description reading well. That description was written by the same agent.

D2 section 10.2 lists liability and authorship as entirely missing from the workshop: "who signs off machine-written code, who is accountable when it fails, and what authorship means for it." The brief calls these first-class, and neither cohort raised them.

### The mechanics

Accountability, in the vocabulary we already have. D1 section 2.3 records the AI Fluency framework's fourth competency, Diligence, "responsibility and accountability for AI-assisted work," and notes it is "the client's liability question in the framework's own vocabulary." The Guidance for AI Adoption's first practice is "Decide who is accountable"; the Commonwealth policy requires "an accountable owner" per use case (both fetched 2 Sep 2026). So "who is accountable" already has an answer: the reviewer who approved and the owner named in the register. What is open is whether they had the information to be accountable with, which is the provenance problem.

Provenance, from smallest to largest. The git trailer is the smallest record: `Co-Authored-By: Claude <claude@anthropic.com>` on every agent commit, on by default in Claude Code, and absent from every commit on our `main` because attribution was never enabled (slice 2 Module 2 and Gaps recorded). It records that an agent touched the change, not what. Leon's "nutrition label" is the larger record D1 section 6 describes as missing everywhere: which model, which prompt, which configuration produced an output. The middle step is the S4 proposal from Zafir's note (s6, s8): a "confidence card" on every agent-generated PR carrying the plan, assumptions, alternatives considered and known edge cases, which is a design-doc-lite for delegated work. Our PR template already has the slots (summary, type of change, test plan); a confidence section is one more heading. The Commonwealth policy's transparency statement and the Guidance's "Share essential information" practice are the same idea at organisational scale.

Responsibility does not end at merge. Liu et al. tracked 304,362 AI-authored commits and found 24.2 percent of introduced issues still present at repository HEAD, with security issues the most likely to survive at 41.1 percent; Watanabe et al. found the agent still involved in 41.1 percent of post-merge revisions (Zafir's note, s5.1 and s5.2). Zafir's own reading is the rule: "treating the merge as the point where monitoring starts, not where responsibility for the change ends" (s7). Slice 1 recorded the same as a migration constraint. For liability it means the accountable owner's obligation runs past approval, and the register has to say for how long.

Authorship, stated plainly. Under the mechanics above, a change has a human author of record (the committer), an agent co-author where one contributed (the trailer), a human approver who is not the requester (Module 2 and slice 2 Module 3), and an accountable owner in the register. Four names, no ambiguity about who answers for it. What the record does not settle, and this slice does not pretend to, is the legal question of copyright and licence in agent-written code; that needs counsel, not a research slice, and is recorded as open.

### The human gate

The approver, who is now approving with a confidence card in front of them rather than a description the agent wrote about its own work. And the accountable owner, whose name is on the register entry and whose obligation runs past merge.

### The failure mode

The one in the story: a defect with no trail. Every mechanic above exists to make that impossible, and none of them is switched on in our repository today. The trailer is a settings line; the confidence card is a template heading; the register does not exist. That is the gap the team should be embarrassed by before Alessio is.

### Colour and gate mechanism

Task-level: writing the confidence card is green (the agent drafts it, from its own plan); signing it off is red. Gate mechanism (D1 s3): human, backed by one hook the repository could add in an afternoon, a commit-msg check that refuses an agent commit without a trailer.

---

## Module 5: Prompt practice, written, stored, versioned, shared

### The story

A junior writes "add a notes feature" into Claude Code and gets thirty-five changed files. Alessio's warning from the workshop: "If you do not tell it what you want, and also you do not tell it what you do not want, you will get into a huge scope creep. I wanted to make a small change and it ended up changing 35 different files" (D2 v2, s4.2). The same junior, a week later, writes the issue with acceptance criteria and an out-of-scope line, points the prompt at the committed acceptance file, and gets one branch with one change. Nothing about the model changed. The prompt did, and this time the prompt was a file in the repository that the next person can read.

The card asks for four verbs: how prompts are written, stored, versioned and shared. Each gets a mechanic.

### The mechanics

Written. D1 section 2.3 anchors this to the Description competency and the describe, evaluate, refine loop, "the operational shape of every amber-tier step." Alessio's taught practices (D2 s4.2) are the junior's checklist: write the issue properly, because "if you write a good issue, you will get a good outcome"; always state what is out of scope; ask for three or five options rather than one answer at design stages; remember that "your context is what defines your output." Anthropic's own guidance adds the precondition most teams skip: prompt engineering assumes "a clear definition of the success criteria for your use case" and "some ways to empirically test against those criteria," and "if not, spend time establishing that first" ([platform.claude.com](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview), fetched 2 Sep 2026). Its named techniques, clarity, examples, XML structuring, role prompting, thinking and prompt chaining, are the vocabulary; acceptance criteria in the issue are the success criteria.

Stored. A prompt that matters is a file. In our repository the standing prompts are five kinds of file. `CLAUDE.md` holds the project rules. `.claude/skills/*/SKILL.md` holds procedures such as `/git-feature` and `/verify`. `.claude/agents/*.md` defines the test-writer and security-reviewer sub-agents. `.github/pull_request_template.md` is the prompt a reviewer answers. And the acceptance-criteria files under `docs/` are the prompts the agent builds against. Claude Code's documentation gives the rule for choosing between them: create a skill "when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact," because "a skill's body loads only when it's used" ([code.claude.com](https://code.claude.com/docs/en/skills), fetched 2 Sep 2026). That is also Module 2's context-competition rule from the other side.

Versioned. Because they are files, they are in git, and every change to a prompt goes through the same PR and review as a change to code. Project skills live at `.claude/skills/<name>/SKILL.md` and load "in the directory where you start Claude Code and in every parent directory up to the repository root" (code.claude.com, fetched 2 Sep 2026), so the version in the branch is the version that runs. Alessio's brand-colours fix is the worked example: the correction "went into the context, not the artifact" (D2 s4.3), which in our terms is a commit to the design-system tokens and to `docs/DESIGN.md`, reviewable and revertable. A prompt that lives in someone's chat history has no version and no reviewer.

Shared. Three levels, in order of reach. Committing a project skill shares it with everyone on the repository, which is what Team 6 did with its accessibility skill. A plugin packages skills, hooks, agents and MCP servers into one distributable unit (`<plugin>/skills/<name>/SKILL.md`, namespaced `plugin:skill`), which D1 section 2.6 records as the taught mechanism: "Plugins: encode your team's expertise," with a validation step before sharing. And a personal skill at `~/.claude/skills/` is shared with nobody, which is the state Leon observed at NBN: individuals running separate instances with no process for sharing what they learn (26 Aug). The enablement gap D1 section 6 names is the distance between the third level and the first.

### The human gate

Review of the prompt file, same as review of code. A person decides whether a procedure has earned a skill, whether a skill has earned a plugin, and whether the validation step before sharing was actually done.

### The failure mode

The thirty-five-file change, and its cousin: a prompt that worked once, lived in a chat, and was never seen again. Both are the absence of the file. The third failure is Module 2's: a prompt promoted to CLAUDE.md as if that made it a rule.

### Colour and gate mechanism

Task-level: drafting a skill from a repeated procedure is green; approving it into the shared set is red. Gate mechanism (D1 s3): human review on the PR, and the CI check that already runs on every file in the repository, prompts included.

---

## Module 6: Regulatory codification for NBN Co

### The story

Leon's instruction on 31 Aug was to do this first: identify which regulations bind NBN Co, codify them as hard limits in system prompts and tool chains before any design work begins, and treat First Nations inclusive-design policy as the first UX rule to codify. His precedent was financial services, where staff may present options and never recommend one, and that constraint sits in the system prompt as a hard limit.

A junior at NBN Co asking "what am I not allowed to let the model do?" gets, in this module, a list with a source and a mechanism against each line. The list is shorter and stranger than expected, and the first thing on it is an absence.

### The mechanics

What binds NBN Co, as of 2 Sep 2026.

NBN Co is a wholly owned Government Business Enterprise established under the National Broadband Network Companies Act 2011 ([legislation.gov.au](https://www.legislation.gov.au/Details/C2011A00022)), a corporate Commonwealth entity directed by a Statement of Expectations from its Shareholder Ministers. The current statement asks NBN Co, among other things, to "make network security and resilience integral to its operations" and to work "in partnership with First Nations communities to enhance connectivity, equity and quality of life" ([minister.infrastructure.gov.au](https://minister.infrastructure.gov.au/rowland/media-release/albanese-government-sets-new-statement-expectations-nbn-co)). It says nothing about AI.

The Commonwealth's Policy for the responsible use of AI in government, version 2.0, took effect on 15 December 2025 and "applies to all non-corporate Commonwealth entities, with exceptions for the defence portfolio and the national intelligence community." Corporate Commonwealth entities "are encouraged, but not mandated, to comply" ([dta.gov.au](https://www.dta.gov.au/articles/ai-policy-update-strengthening-responsible-use-across-government)). NBN Co is a corporate entity. So the requirements that everyone assumes apply to it, an accountable official, an internal register of use cases with an owner each, an AI impact assessment before deployment covering fairness, safety, privacy, transparency, security and human-centred values, an incident process, and a public reporting pathway, are the nearest model for NBN Co and not an obligation on it. The first mandatory requirement for agencies that are bound begins 15 June 2026, with the rest in December 2026. This slice adopts the policy as the model, and says so, because a reviewer who assumes it binds NBN Co will be wrong.

The Voluntary AI Safety Standard (5 September 2024, ten guardrails) was replaced in October 2025 by the Guidance for AI Adoption, which "condensed 10 guardrails into 6 essential practices": decide who is accountable; understand impacts and plan accordingly; measure and manage risks; share essential information; test and monitor; maintain human control ([industry.gov.au](https://www.industry.gov.au/sites/default/files/2025-10/guidance-for-ai-adoption-foundations.pdf)). It is voluntary and "for businesses and organisations in the early stages of adopting AI." It asks for an AI register and for documentation of "every activity in these essential practices."

The Privacy Act 1988 and its thirteen Australian Privacy Principles apply to NBN Co as an organisation the Act covers; APP 3 governs collection, APP 6 use and disclosure, APP 11 security ([oaic.gov.au](https://www.oaic.gov.au/privacy/australian-privacy-principles)). The OAIC's guidance on commercially available AI products (21 October 2024, updated 17 January 2025) is the operative rule for the map: "privacy obligations will apply to any personal information input into an AI system, as well as the output data generated by AI," and "as a matter of best practice, the OAIC recommends that organisations do not enter personal information, and particularly sensitive information, into publicly available AI chatbots and other publicly available generative AI tools" ([oaic.gov.au](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products)). The workshop's licence restriction, "do not put NBN data, keep it outside of work" (D2 s4.4), is this rule in one line.

The Security of Critical Infrastructure Act 2018 lists communications among its eleven sectors and places three positive obligations on responsible entities: provide information to the Register of Critical Infrastructure Assets, "report cyber incidents which impact the delivery of essential services," and "adopt, maintain and comply with a written risk management program" ([cisc.gov.au](https://www.cisc.gov.au/legislation-regulation-and-compliance/soci-act-2018)). For the map this binds Stage 8 hardest: an AI-assisted deploy to an asset in that register is inside a written risk management program or it does not happen. The "systems nobody would point an AI at" from the workshop's closing discussion (D2 s9) are, in all likelihood, these.

The Disability Discrimination Act 1992 covers "the provision of information and online services through the web," and the Australian Human Rights Commission's advice is that "all web resources should achieve a minimum of Level AA conformance" to WCAG ([humanrights.gov.au](https://humanrights.gov.au/our-work/disability-rights/world-wide-web-access-disability-discrimination-act-advisory-notes-ver-41-2014), advisory notes referencing WCAG 2.0). NBN Co's own practice is ahead of the floor: a workshop team treated a WCAG 2.2 AAA pass as definition of done and used Siteimprove unprompted (D2 s9). Slice 2 Module 5's axe scan is the codified form.

First Nations inclusive design. Leon's first UX rule to codify has two sources at NBN Co. The company's current Reconciliation Action Plan is its sixth and first Stretch RAP, covering 2026 to 2029, committing to "improving digital inclusion outcomes for First Nations communities through practical, place-based connectivity initiatives," to "strengthening relationships and partnerships with First Nations communities, organisations and industry groups," and to "embedding reconciliation into how we plan, make decisions and measure success across nbn" ([nbnco.com.au](https://www.nbnco.com.au/corporate-information/careers/diversity-and-inclusion/first-nations/reconciliation-action-plan)). Above it sits the Commonwealth's First Nations Digital Inclusion Plan 2023 to 2026 and the First Nations Digital Inclusion Advisory Group ([niaa.gov.au](https://www.niaa.gov.au/sites/default/files/documents/publications/first-nations-digital-inclusion-plan-2023-2026_0.pdf)). Neither is a design standard in the WCAG sense. What can be codified from them is a process rule: content or experience aimed at First Nations communities is developed with them, so an AI-generated persona, journey map or copy line for that audience is a hypothesis until a person from that community has said so. That is the anchor rule from slice 1's "Reading the colours" applied to one audience, and it stays red.

The codification. For each rule, the holder per D1 section 3:

1. No personal or sensitive information into a public model (Privacy Act, OAIC guidance): a hook or deny rule on the tool side (Claude Code's `permissions.deny` on `.env` and credential paths is the pattern; a data-classification hook on inputs is the fuller form), plus the licence restriction as a human rule. Hook where the pattern is known, human for the rest.
2. Every AI use case has an accountable owner and a register entry (Guidance practice 1; the Commonwealth policy as model): a human artifact, the register, with no automation possible. Human.
3. Meaningful human oversight matched to autonomy and stakes (Guidance practice 6): the map itself, task-level, with the exposure rule from Leon's review. Human, with the CI checks of slice 2 as the automated floor.
4. Deploys to critical-infrastructure assets stay inside a written risk management program with incident reporting (SOCI): a human sign-off before promotion, and Stage 8's execution stays amber at best for those assets whatever our own repository does. Human.
5. WCAG AA minimum on anything public, AAA where NBN Co already sets it (DDA, AHRC, workshop practice): the axe scan in CI, with the manual pass the tooling cannot replace. CI check plus human.
6. First Nations audiences: generated artifacts are hypotheses until validated with the community (RAP VI, the Digital Inclusion Plan, Leon's rule): a human gate that no tool can hold, and a line in the system prompt saying so. Human.
7. Security and resilience "integral to its operations" (Statement of Expectations): the secret scanning and dependency audit slice 2 asked for, plus the security-reviewer sub-agent as an assist. CI check plus human.

Two of the seven can be held by a hook or a CI check in whole or part. The other five are held by people, and a policy that pretends otherwise is Module 2's governance theatre with a legal citation on it.

### The human gate

The accountable owner, by name, per use case. The Guidance's first practice and the policy's first requirement agree on this, and Leon's instruction to codify first assumes someone has been appointed to do the codifying.

### The failure mode

Two. Citing a superseded standard, which this slice would have done if the fetch had not been repeated: the requirements file written earlier the same day still planned to cite the ten guardrails. And assuming a policy binds when it does not: an NBN Co governance document that cites the Commonwealth AI policy as an obligation will be corrected by the first lawyer who reads it, and the correction will take the rest of the document's credibility with it. The defence for both is the fetch date on every policy citation, and a rule that policy sources are re-fetched at each slice.

### Colour and gate mechanism

Red, all of it, with a green underneath: a model can draft a register entry, an impact assessment or a system-prompt rule from these sources in minutes, and a person approves each one. Gate mechanism (D1 s3): human for five of seven, hook or CI check for the two with a known pattern.

---

## Contradictions and notes to earlier slices

Recorded here for D3, which owns the reconciliation.

1. Neither earlier slice cites the Voluntary AI Safety Standard, which is fortunate: it was superseded on 21 October 2025 by six essential practices, and any team material that still names the ten guardrails (Leon's deck may, since it predates October) needs the reference updated.
2. Slice 1 recommends Stage 8 as amber execution; slice 2 Module 6 calls deploy execution green in our repository because there is no judgement in it. Module 6 above adds a third reading: for assets under the SOCI Act the execution cannot be greener than amber whatever the repository does. The reconciliation is the task-level one already on the map's frame B: execution green for our demo app, amber for a registered asset, promotion and revert red everywhere.
3. Slice 2 Module 2 records that no commit on `main` carries a co-author trailer. Module 4 above turns that from a gap into a liability finding. Same fact, higher stakes.
4. Slice 1 recommendation 8 routes regulatory codification through Leon's deck. The deck has not arrived; Module 6 codifies from primary sources instead, and the deck's outline (model cards, audit logs, fallback and escalation, user override, multi-agent critique, feedback loops, responsible AI policy, version control) maps onto Modules 2, 4 and 6 when it does.
5. D1 section 6 says the certification says nothing about provenance or cost. Modules 3 and 4 above are the team's answer to both; D3 should present them as such.

## What this unblocks

D3 (Zac): all three slices now exist; the five items above are the reconciliation list, and the comparison table's Anthropic column can be filled from D1 plus the Claude Code documentation cited here and in slice 2. The Atlassian column has no source.

Ahmed (requirements pass 3): Module 2's rule that every control names its holder, Module 4's four-names authorship rule and trailer requirement, Module 5's "a prompt that matters is a file," and Module 6's seven codified rules are each requirement-shaped. Modules 2 and 6 change the ground under requirements already written and go to Ahmed before D3, per the D3 card.

Sidney (board): six module cards plus three small follow-ups: enable Claude Code attribution in `.claude/settings.json`, add a confidence section to the PR template, add a commit-msg check for the trailer on agent commits.

Zafir (INF-6a): tokens per task alongside generating and reviewing time; Module 3 has the slot.

## Citation record

External sources introduced in this slice, fetched 2 Sep 2026. Sources inherited from slices 1 and 2 carry those audits.

| Source | Used in | Checked |
|---|---|---|
| DTA, AI policy update (policy v2.0 effective 15 Dec 2025) | M2, M3, M4, M6 | Scope sentence, "encouraged, but not mandated" for corporate entities, requirement list and June/Dec 2026 dates verified |
| Guidance for AI Adoption: Foundations (industry.gov.au, Oct 2025) | M2, M3, M4, M6 | Six practice titles, "condensed 10 guardrails into 6," human-oversight sentence, register and documentation sentences verified |
| Voluntary AI Safety Standard page (industry.gov.au) | M6 | Publication date 5 Sep 2024 and the 21 Oct 2025 replacement notice verified |
| National Broadband Network Companies Act 2011 (legislation.gov.au) | M6 | Title and status verified; not quoted |
| Statement of Expectations media release (minister.infrastructure.gov.au) | M6 | Security-and-resilience and First Nations partnership quotes verified; release date not shown on the fetched page |
| OAIC, Australian Privacy Principles | M6 | APP 3, 6, 11 mapping verified |
| OAIC, privacy and commercially available AI products (21 Oct 2024, updated 17 Jan 2025) | M6 | Both quotes verified verbatim |
| Cyber and Infrastructure Security Centre, SOCI Act 2018 | M6 | Three obligations and the communications sector verified; the 12-hour and 72-hour reporting windows were not on the fetched page and are not cited |
| Australian Human Rights Commission, web access advisory notes v4.1 (2014) | M6 | DDA coverage and Level AA quotes verified; the notes reference WCAG 2.0, so WCAG 2.2 is cited from workshop practice, not from the AHRC |
| nbn, Reconciliation Action Plan page (Stretch RAP VI, 2026 to 2029) | M6 | Three commitment quotes verified |
| NIAA, First Nations Digital Inclusion Plan 2023 to 2026 | M6 | Existence and title verified; not quoted |
| Anthropic, prompt engineering overview (platform.claude.com) | M5 | Precondition quotes and the six technique names verified |
| Claude Code, skills documentation (code.claude.com) | M5 | Skill locations table, the when-to-create-a-skill sentence, plugin namespace verified |
| D2 v2 s4.2, 4.3, 4.4, 4.5, 7.1, 7.2, 7.3, 7.5, 9, 10; D1 s2.3, 2.6, 3, 6; Zafir's note s5, s6, s7, s8; slices 1 and 2 | all | Internal, quoted from current versions |
| Leon Gouletsas, 26 and 31 Aug 2026 | M1, M5, M6 | Practitioner input, recorded; outside the source ranking |
