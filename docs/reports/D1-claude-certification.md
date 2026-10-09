# D1 — Claude Certification Report

**Owner:** Sidney Zeng (PM)
**Planner card:** [PRD] - Claude Certification Report D1
**Status:** Draft
**Repo path:** `docs/reports/D1-claude-certification.md`

---
## 1. Purpose and scope
This report records the team's completion of the Anthropic Academy certification and translates it into a capability inventory for the lifecycle model.

Its job is narrow and specific. When the lifecycle map (D4) states that an agent performs a step, this document identifies which mechanism that is, whether it is a skill, a hook, a command, a sub-agent or an MCP server and what it can automate, and where it stops. The "where it stops" column is what the map's red, amber and green boundaries rest on.

It is an input to D4, not a training record.

---
## 2. What the certification covers
Five courses were completed across the team, four per person. All are free, self-paced, and hosted at [anthropic.skilljar.com](https://anthropic.skilljar.com).

### 2.1 The path, by role
| Course | PM · BA · UX | Developers |
|---|---|---|
| Claude 101 | ✓ | ✓ |
| AI Fluency: Framework & Foundations | ✓ | ✓ |
| AI Capabilities and Limitations | ✓ | ✓ |
| Introduction to Claude Cowork | ✓ | — |
| Claude Code 101 | — | ✓ |

Three courses are common to all five members. The fourth differs by role: non-technical roles took Cowork, which covers Claude working directly on files and projects, while the developers took Claude Code 101, which covers the terminal-based coding agent.

### 2.2 Claude 101
Core product usage. Projects and artifacts for organising work, working with skills, connecting external tools, enterprise search, and research workflows.

Where it is relevant to this project: **skills are introduced here**, meaning all five team members have been exposed to the concept, not only the developers.

### 2.3 AI Fluency: Framework & Foundations
Built with Prof. Joseph Feller (University College Cork) and Prof. Rick Dakan (Ringling College). The course is organised around the **4D Framework**, and two of the four bear directly on this project.

| Competency | What it covers | Relevance to the lifecycle model |
|---|---|---|
| **Delegation** | Deciding what to hand to the model and what to keep, including project planning | This is the same judgement the map makes at every box. Red, amber and green are delegation decisions |
| **Description** | Communicating the task clearly; includes a deep dive on effective prompting | Feeds the prompt practice module named in the client brief |
| **Discernment** | Evaluating what comes back such as process, output and performance | This is the human check. It is what a reviewer does |
| **Diligence** | Responsibility and accountability for AI-assisted work | This is the client's liability question in the framework's own vocabulary |

The course also teaches the **Description-Discernment loop** as an explicit cycle: describe, evaluate, refine. That loop is the operational shape of every amber-tier step in our model.

Using this vocabulary is preferable to inventing our own. It is published, it is taught, and NBN staff who complete the same certification will already have it.

### 2.4 AI Capabilities and Limitations
The most directly useful course for the model, and the one to draw on for the classification boundaries.

Anthropic describes it as the companion to AI Fluency: where the 4D framework teaches the human competencies, this course teaches the machine properties those competencies are responding to. It is organised around four properties:

| Property | What it explains | The failure mode it predicts |
|---|---|---|
| **Next token prediction** | How generation actually works | Output that is fluent and plausible but wrong. The reason a passing test suite proves nothing on its own |
| **Knowledge** | What the model knows and when that knowledge ends | Hallucination clustering in exact details such as names, dates, citations, URLs and a training cutoff that makes any claim about current tooling unreliable |
| **Working memory** | Context window limits | Degradation on long tasks and information dropped without warning |
| **Steerability** | How reliably the model follows direction | Instructions followed probabilistically rather than deterministically, which is why rules cannot be treated as controls |

The course's stated outcome is that a learner can look at an unexpected output, recognise which kind of unexpected it is, and respond with a targeted fix.

**This is the section of the certification that maps most directly onto our model.** Each property predicts a class of failure, and each class of failure implies where a human check belongs. Steerability in particular is the reason a rules file cannot serve as a governance control. That is a point our workshop review reached independently.

### 2.5 Claude Code 101 (developers)

Covers the agentic loop, context window, tools and permissions and installation across terminal, VS Code, JetBrains, Desktop and web; approval mode, auto-accept and Plan Mode; the **Explore > Plan > Code > Commit** workflow; context management; and code review.

The customisation section is the part this report depends on. It covers, in order: the CLAUDE.md file, sub-agents, skills, MCP, and hooks.

That confirms all five mechanisms in section 3 were formally taught rather than encountered incidentally.

### 2.6 Introduction to Claude Cowork (PM, BA, UX)

Claude working directly on local files and projects. Covers the task loop, standing context via global instructions and projects, skills, and plugins.

Three lessons matter beyond their apparent scope:

- **"Plugins: Encode your team's expertise"** - packaging team practice into a reusable, distributable form
- **"Validating skills for plugins"** - a verification step before a skill is shared
- **"Share what you build with your team"** - distribution across a team

---
## 3. Capability inventory
For each mechanism: what it automates, where it stops, and what that means for the lifecycle model. The middle column is the constraint the map must respect.

| Mechanism | What it can automate | Where it stops | Implication for the model |
|---|---|---|---|
| **Hook** | Runs deterministically at a defined trigger. Blocks commands, enforces formatting, fires notifications | Cannot assess intent, quality or correctness | Enforces a rule reliably. Suitable as a hard gate. Cannot make a judgement |
| **Skill** | Packages a repeatable procedure as reusable instructions the model applies to matching tasks | Invocation is steerability-dependent, therefore probabilistic. Not guaranteed to fire | Assists. **Cannot serve as a control**, because a control that sometimes does not run is not a control |
| **Sub-agent** | Handles a scoped task in separate context and keeps the main conversation clean | Same class of system as the agent it checks. Subject to the identical four machine properties | **Not independent verification.** An agent checking an agent is not an oracle |
| **Command** | Predictable, scoped, explicitly triggered | Requires a human to fire it | Human-initiated by definition. Sits naturally at red-tier boundaries |
| **MCP server** | Connects the model to external tools and data sources | Output quality is bounded by what it is pointed at. Introduces an external trust surface | Context quality is a precondition for any amber-to-green migration, not a given |
| **CLAUDE.md** | Persistent project memory and standing instruction | Instructions are followed probabilistically, per steerability | Improves consistency. Does not guarantee compliance |

**The distinction the map depends on: a hook can enforce but only a human can judge.**

Everything else in the inventory sits between those two poles. Skills, sub-agents and CLAUDE.md all shape behaviour without guaranteeing it, which places them in amber rather than green.

**And the corollary, which answers an open question from the client meeting.** Alessio asked whether all the tests are correct when a sub-agent writes them. Section 2.4 supplies the answer in principle: a sub-agent is subject to the same next-token-prediction and steerability properties as the agent whose work it is checking. It can widen coverage. It cannot function as an independent oracle. A human check on AI-written tests is therefore structural, not a matter of current model quality.

---
## 4. Team baseline
| Member | Role | Path | Completed | Time |
|---|---|---|---|---|
| Zac Clarkson | UX | Base + Cowork | 20 Aug | ~2 hrs |
| Chirag Wadehra | Dev 2 | Base + Claude Code 101 | 21 Aug | ~2 hrs |
| Sidney Zeng | PM | Base + Cowork | 22–23 Aug | ~2 hrs |
| Ahmed Falulur Rahuman | BA | Base + Cowork | 23 Aug | ~2 hrs |
| Zafir Hasan | Dev 1 | Base + Claude Code 101 | 23 Aug | ~2 hrs |

All twenty certificates verified. Links recorded on the Master Document. 

---
## 5. Candidate applications
Each tied to a lifecycle stage from research slice 1. The final column is the deliverable: it is the human check the map must show.

| # | Stage | Mechanism | What it automates | What a human still checks |
|---|---|---|---|---|
| 1 | Requirements and discovery | Skill | Drafts user stories from a research slice | Acceptance criteria, coverage diversity, prioritisation. Slice 1 found LLM stories meet acceptance criteria less often than human ones |
| 2 | Solution design | Skill | Drafts an ADR from a design discussion | Whether the rejected alternatives were real options, and whether the stated consequences are honest |
| 3 | Development and build | Agent | Reads the issue, plans, branches, implements, opens a PR | Whether the implementation matches the acceptance criteria as written, not as the agent inferred them |
| 4 | Development and build | Hook | Blocks direct pushes to `main` and enforces Conventional Commits | Enforces Conventional Commits. Live (lefthook commit-msg). The push-to-main block is a GitHub ruleset that exists but is not targeting main as of 3 Sep; see slice 2, gaps 3. |
| 5 | Testing and QA | Sub-agent | Generates a test suite from acceptance criteria | Whether each test traces to a stated criterion, and whether the same party wrote both implementation and tests |
| 6 | Testing and QA | Hook | Blocks merge on failing CI or a failed dependency audit | CI and dependency audit run on every PR. Live. Merge is not blocked on failure: no required status checks are configured |
| 7 | Deployment | Command | Human-triggered promotion to production | The deploy decision itself. Red tier |
| 8 | Cross-cutting | MCP server | Supplies live documentation and repository context | What the server is pointed at, and whether that source is current and trustworthy |

Items 4 and 6 were written as live controls. They are not. The commit-message hook is genuinely enforcing; the push-to-main block and the CI gate are not, because a ruleset exists that targets no branches and no required status checks are configured. Every mechanism named here is capable of holding a gate. Only one of them currently does.

The distinction between a control that exists and a control that is switched on is not something the certification teaches, and it is the second time this team has found the gap in its own practice rather than in the literature.

---
## 6. Gaps
What the certification does not supply that the model still needs.

**Provenance and audit trail.** Nothing in the path covers recording which model, which prompt and which configuration produced a given output. Leon Gouletsas observed the same absence at NBN, describing the missing artefact as a "nutrition label" for AI-generated material. This is a gap in available practice, not only in our knowledge.

**Token and cost accounting.** Named as a deliverable in the client brief. Not addressed anywhere in the certification path.

**Verifying a sub-agent's work.** The mechanism is taught; the oracle problem is not solved. Section 3 explains why it cannot be solved by adding another agent.

**Correction to an earlier assumption.** We previously recorded that the certification says nothing about how a team shares what works. That was wrong. The Cowork course covers plugins as a way to encode team expertise, a validation step before a skill is shared, and distribution across a team.

This makes Leon's NBN observation sharper rather than weaker. He found individuals running separate instances with no process for sharing what they learn, and NBN staff unable to describe how institutional knowledge develops. **The mechanism exists and is taught. It is not being used.** That is a governance and enablement gap rather than a tooling gap, and it belongs in the model as one.

---
## 7. Handoff
**Feeds D4, the lifecycle map.**

- Section 3 supplies the mechanism-to-capability mapping. Where the map claims an agent performs a step, the "where it stops" column is the limit on what can be claimed.
- Section 5 supplies eight candidate applications with their human checks, tied to slice 1 stages.
- Section 2.4's four machine properties give a principled basis for the colour boundaries: a step can only be green where its failure modes are caught deterministically.
- Section 6 lists what the map must not overstate.

---
## Sources retrieved 3 September 2026

Anthropic Academy, [anthropic.skilljar.com](https://anthropic.skilljar.com).

- [Claude 101](https://anthropic.skilljar.com/claude-101)
- [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations)
- [AI Capabilities and Limitations](https://anthropic.skilljar.com/ai-capabilities-and-limitations)
- [Claude Code 101](https://anthropic.skilljar.com/claude-code-101)
- [Introduction to Claude Cowork](https://anthropic.skilljar.com/introduction-to-claude-cowork)

Team completion certificates, August 2026, verified individually. Links recorded in the Master Document. 