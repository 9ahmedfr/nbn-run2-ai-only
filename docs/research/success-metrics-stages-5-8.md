# Success metrics for Stages 5 to 8: criteria, benchmarks, failure modes and cost

**Owner:** Zac Clarkson (UX)
**Status:** Draft for Zafir's baseline capture, 18 Sep 2026. Planner card "[UX] Success metrics research: benchmarks and failure modes", Sprint 2 week 1.
**Sources:** the task map (`docs/research/lifecycle-task-map.md`, Stages 5 to 8), slice 1 and its citation audit (`docs/research/slice1-spine.md`, `docs/research/citation-audit.md`), D3 section 11, the Sprint 2 focus proposal (`docs/research/sprint2-focus-proposal.md`), the client meeting of 17 Sep 2026 (Sprint 2 is Stages 5 to 8, proof of concept is a fault-reporting feature with AI attribution and stage gates, demonstrated with GitHub Copilot), and the external sources in section 8, each with the date it was retrieved.

> The decision. Every gated task in Stages 5 to 8 of the map gets one measurable success criterion, and each criterion is tagged as either measurable in one proof-of-concept run on this repository or benchmark-only (it needs production traffic or a fleet of teams we do not have). Where a published figure exists it is the benchmark; where none exists the row says "none found" rather than inventing one. The benchmark register in section 8 is the only place figures live, so a figure can be checked or refreshed in one place. Zafir captures the baseline against the list in section 9 before the first Copilot run, so that the proof-of-concept has a before as well as an after.

## 1. What this document is for

Sprint 2 builds a fault-reporting feature on the boilerplate with the agent doing the work inside stage gates. The map already says what each gate is (the "Gate" column on every task row). It does not say what number would show the gate held, what number the industry would expect, or what the gate costs to run. This document fills those three gaps for the four scoped stages, so that when the proof of concept runs there is a sheet to write the numbers on and a benchmark to put beside them.

Three rules from the card and the 11 Sep review with Leon apply to every row. Sources are published research or documented practice, not vendor marketing: DORA, Google's engineering practices, GitHub and Anthropic product documentation for mechanics, peer-reviewed studies for figures, and the Anthropic AI-Native SDLC Playbook for its leading and lagging indicators, which the client asked the team to read. Every figure carries its source and the date it was retrieved. And cost sits beside benefit: each stage carries its AI credit cost (Copilot premium requests, or Claude Code tokens where the comparison run uses Claude Code) and its human review time, because a gate that is cheap to pass and expensive to check is not a saving.

## 2. How to read a row

Each stage has one table with the same six columns.

Task is the row from the map, with its colour. Criterion is the pass condition stated as a number or a countable event. PoC or benchmark-only says whether one proof-of-concept run on `Peepachuu/nbn-sdlc-demo` can produce the number (PoC) or whether the number needs production deployments, incidents or a fleet of teams (benchmark-only; recorded for comparison, never claimed). Benchmark is the published figure or documented practice, by its register number in section 8, or "none found". GitHub data source names the object the number is read from and the command in section 9 that reads it. Cost is the AI credits and the review minutes the gate consumes, using the rates in register rows C1 to C4.

"AI credits" means the team's unit from the D2 v2 register (owner and cost per AI use). For Copilot it is premium requests; for Claude Code it is tokens converted at list price. Both are recorded, not one converted into the other.

## 3. Stage 5: Development planning

| Task | Criterion | PoC or benchmark-only | Benchmark | GitHub data source | Cost |
|---|---|---|---|---|---|
| 5.1 Slice the work into single-purpose issues (Amber) | Share of issues the agent proposes that a human accepts without splitting; target 100 percent single-purpose after human edit, and no merged PR from the sprint touching files outside its issue's scope list | PoC | B5: agentic PRs bundle multiple purposes at 40.0 percent against 12.2 percent for humans. B4: DORA small-batches capability | Issues (`gh issue list`), PR files (`gh pr view --json files`) against the issue's scope list; command S9.1 and S9.2 | Copilot chat: included requests, 0 premium if the base model is used; Claude Code planning session: read from `/usage`. Review: BA reads each issue, budget 5 minutes per issue |
| 5.2 Prioritise, assign, flag dependencies (Amber) | Every issue carries a priority label, an owner role and its dependency links before the sprint is committed; count of issues missing any of the three is zero | PoC | None found as a number. Practice: DORA small batches (B4), Google small CLs (B6) | Issue labels and linked issues (`gh issue list --json labels,body`); command S9.1 | Same session as 5.1; no extra credits. Review: PM pass, 15 minutes per sprint |
| 5.3 Write each issue properly: acceptance criteria and out-of-scope list (Red) | Every issue has testable acceptance criteria and an explicit out-of-scope list before an agent reads it; after the run, files touched outside the out-of-scope list is zero | PoC | Playbook Plan stage leading indicator: time from first conversation to a committed intent artefact (P1); lagging: survival rate of intents into design (P2). No numeric benchmark published | Issue body; PR files against the issue's list; command S9.1 and S9.2 | Zero AI credits by definition (human writes). Time: the human instruction cost, record minutes per issue; this is the number Alessio's instruct-versus-build split needs |
| 5.4 Commit the sprint plan (Red) | Plan committed with capacity checked; the sprint's issues do not change after commitment except through a recorded decision. Count of issues added or rescoped after day 1 | PoC (count), benchmark-only (any comparison) | Playbook Design stage lagging indicator: requirements rework after build starts, counted as spec commits dated after the first plan commit (P4). No numeric benchmark | Issue timeline (`gh issue view --json createdAt,timelineItems`); command S9.1 | Zero AI credits. Time: planning meeting, record minutes |
| 5.5 Push the issues into the repo host (Green) | Every issue exists in GitHub, uses the issue template, and links to the story; template validation fails zero issues after the push | PoC | None found. Deterministic check, expected 100 percent by construction | Issue template fields (`gh issue list --json body`); command S9.1 | Zero AI credits. Review: zero minutes when the template check runs |

Common failure mode for the stage: the plan is only as detailed as the meeting had time for, and the person who wrote the ticket is not the person who reads it two weeks later (map, Stage 5 as-is). With an agent reading the ticket the failure is sharper: an issue without an out-of-scope list is read literally and the agent widens the change, which is the 35-file change the workshop saw (D2 v2 section 4.2). The measurable trace is files touched outside scope on the PR, which is why 5.1 and 5.3 both read it.

Operational cost for the stage: one planning session's AI credits (included requests on Copilot chat, or a Claude Code planning session read from `/usage`), plus the human writing time on 5.3. The human time is the cost the map cannot remove from a red row, so record it rather than hide it.

## 4. Stage 6: Development and build

| Task | Criterion | PoC or benchmark-only | Benchmark | GitHub data source | Cost |
|---|---|---|---|---|---|
| 6.1 Agent reads the issue, confirms each acceptance criterion, plans (Amber) | Plan accepted by the human before code is written; count of plan revisions before acceptance, and share of acceptance criteria the plan names explicitly (target 100 percent) | PoC | Playbook Build stage lagging indicator: how often the merged diff still matches the committed plan (P6). No numeric benchmark | Plan file committed to the branch, or the agent session's first PR comment; `git log` timestamps; command S9.3 | Copilot coding agent: 1 premium request per session plus 1 per steering comment (C1). Claude Code: plan-mode session, `/usage`. Review: human reads the plan, budget 10 minutes per issue |
| 6.2 Branch, implement, commit (Green, hooks enforce) | Every commit on the branch passed the pre-commit and commit-msg hooks; seeded violations (lint, format, non-conventional message, secret) caught: target 100 percent of seeded cases. Rework count: commits after the first review request | PoC | Seeded-violation catch rate: none found, deterministic check, target 100 percent. Playbook Build leading indicator: share of changes that merge from the first implementation pass (P5). B8: 83.8 percent of agent PRs merged against 91.0 percent for matched human PRs | Commits (`gh pr view --json commits`), CI check runs on each push (`gh run list`); command S9.3 and S9.4 | Coding agent session as 6.1; each retry after a hook failure is a further steering comment (1 premium request). Review: zero minutes for the hook itself |
| 6.3 Open a draft PR with description and provenance (Green, hook checks trailer) | 100 percent of PRs opened by the agent carry the attribution record the proof of concept defines (author, model, session link) in the PR body or commit trailers; PR body names the issue and each acceptance criterion | PoC | None found as a benchmark. Slice 3 module 4 records the trailer as absent on main today, so the baseline is 0 percent | PR body and commit trailers (`git log --format=%(trailers)`); command S9.3 | Zero extra credits (part of the coding agent session). Review: zero minutes when a check enforces it; if not enforced, reviewer eyeballs it, 1 minute per PR |
| 6.4 Human code review and merge approval (Red) | Approved by someone other than the author, CI green, branch protection in force; measures: time to first review, review minutes per PR, review comments before mergeable, PR size in lines | PoC | B6: Google, one business day maximum to respond. B7: 200 to 400 lines per review, under 500 lines per hour, under 60 minutes per sitting, 70 to 90 percent defect discovery inside those limits. Playbook Deploy leading indicator: time to first review "should fall to minutes" (P9) | PR reviews and timestamps (`gh pr view --json reviews,createdAt,mergedAt,additions,deletions`); rulesets (`gh api .../rulesets`); command S9.3 and S9.6 | Copilot code review, if used as a first pass: 13 premium requests per review (C2). Human: the review minutes recorded, the central cost figure of the whole benchmark |
| 6.5 Iterate on review comments (Amber) | Reviewer comments resolved; measure: revision rounds per PR, and share of review comments resolved by the agent without a human editing the branch | PoC | Playbook Build lagging indicator: rework cycles per change (P6). Playbook Deploy leading indicator: share of review comments resolved without a human touching the branch (P9). B8: agent stayed involved in 41.1 percent of post-merge revisions | PR review threads and commit authors after each review (`gh pr view --json reviewThreads,commits`); command S9.3 | Coding agent: 1 premium request per steering comment. Review: re-review minutes per round |

Common failure mode for the stage: "the review decision making and diligence took longer than expected when Claude kind of owns the creation" (D2 v2 section 7.1). The agent produces a large change quickly, the reviewer has to judge code they did not write, and the review becomes the bottleneck. DORA measured the fleet version of this: for every 25 percent increase in AI adoption an estimated 1.5 percent reduction in throughput and 7.2 percent reduction in stability, which the authors attribute to abandoned batch-size discipline (B2). The measurable trace is PR size and review minutes on 6.4, read together.

Operational cost for the stage: AI credits are one coding-agent session per issue plus one premium request per steering comment, plus 13 per Copilot review if a machine first pass is used. The comparison run on Claude Code uses the Anthropic figures as the reference point: about 13 US dollars per developer per active day on average across enterprise deployments, and under 30 dollars per active day for 90 percent of users (C3). Human cost is the review minutes on 6.4 and 6.5; nothing in this stage saves time if that number grows faster than generating time falls.

## 5. Stage 7: Testing and QA

| Task | Criterion | PoC or benchmark-only | Benchmark | GitHub data source | Cost |
|---|---|---|---|---|---|
| 7.1 Generate unit tests alongside the change (Amber) | A test exists for every acceptance criterion on the issue (coverage of criteria, not lines); count of criteria with no test is zero | PoC | B9: about half of LLM-generated assertions are wrong (51.82 to 58.71 percent and 38.72 to 48.19 percent accuracy on two datasets). Treat as the reason 7.4 exists, not as a target | Test files in the PR diff mapped to the issue's criteria by hand; `gh pr view --json files`; command S9.3 | Part of the coding agent session. Review: human maps tests to criteria, 5 minutes per PR |
| 7.2 Run the CI suite (Green, CI) | All four CI jobs green on the final commit; first-pass CI success rate for agent-written changes across the sprint (share of PRs whose first push was green) | PoC | Playbook Test leading indicator: first-pass CI success rate for agent-written changes (P7). No published percentage | Workflow runs (`gh run list --json conclusion,headSha,createdAt`); command S9.4 | Zero AI credits. GitHub Actions minutes, free on the public repo. Review: zero |
| 7.3 Adversarial review pass by a separate agent (Amber) | Every PR gets a pass from an agent that is not the author; seeded defects found: report found and missed against two seeded defects per PR; no finding auto-resolved | PoC | None found for seeded-defect recall with a coding agent. B10: Atlassian reports 38.70 percent of AI review comments led to code changes against 44.45 percent for human comments (internal, self-reported, class 4) | Copilot code review comments on the PR, or the sub-agent's review comment (`gh pr view --json reviews,comments`); command S9.3 | Copilot code review: 13 premium requests per review (C2). Claude Code sub-agent: `/usage`. Review: human dispositions each finding, 2 minutes per finding |
| 7.4 Judge whether the tests are correct (Red, mutation tooling as evidence) | Mutation score per run over the tests the agent wrote, and the reviewer's accept decision recorded before and after seeing the score; the gate holds when the reviewer confirms the tests would catch a real fault | PoC | B11: Stryker's documented thresholds, high 80, low 60, break unset by default. A floor for this repo is set in week 1 from the human-written suite's own score, per the focus proposal | Stryker report committed as a run artefact (`reports/mutation/mutation.json`) uploaded by the workflow; command S9.5 | Zero AI credits. Compute: Stryker run time. Review: human reads the score and decides, 10 minutes per PR |
| 7.5 Security scan and dependency audit (Green, CI) | Security scan job green, or every high-severity finding dispositioned by a named human; count of undispositioned high findings at merge is zero | PoC | B12: Veracode, models chose the insecure option 45 percent of the time across 80 tasks. B13: about 40 percent of Copilot-generated programs vulnerable (Pearce et al.). Both are reasons the gate exists, not targets | Security Scan job (`gh run list`), Dependabot alerts (`gh api .../dependabot/alerts`); command S9.4 and S9.7 | Zero AI credits. Review: disposition per finding, 5 minutes each |

Common failure mode for the stage: coverage does not measure correctness. The tests pass because the agent wrote tests that match the code it wrote, and CI green is read as "tested" when it means "ran". The peer-reviewed number is that roughly half of generated assertions are wrong (B9), and the playbook names the reversed failure: when the signal is late "a person has to check all of its output, and that person becomes the bottleneck" (P7 context). The measurable trace is the gap between CI status and mutation score on 7.2 and 7.4.

Operational cost for the stage: mostly compute and human minutes rather than AI credits. The one AI-credit line is 7.3 at 13 premium requests per Copilot review. The human cost is 7.4, and it is the cost the map says cannot be automated away; record it so the playback can show the price of a red gate honestly.

## 6. Stage 8: Deployment and iteration

| Task | Criterion | PoC or benchmark-only | Benchmark | GitHub data source | Cost |
|---|---|---|---|---|---|
| 8.1 Preview deployment on every PR (Green) | 100 percent of PRs carry a preview URL as a deployment status before review starts | PoC | None found as a number. Practice: DORA deployment automation capability (B3) | Deployments and statuses (`gh api .../deployments`); command S9.8 | Zero AI credits. Hosting platform minutes, free tier. Review: zero |
| 8.2 Progressive rollout with metric-gated rollback (Green) | Success-rate and latency thresholds hold at each ring; rollback fires without a human when a threshold breaks | Benchmark-only (no rollout rings on this repo) | B3: DORA continuous-delivery capability. B1: elite performers deploy on demand with change failure rate around 5 percent and recovery under one hour | Deployments API and the rollout controller's log, neither present here; record as not measured | Not measured |
| 8.3 Production promotion approval (Red) | Approval recorded against the release by a named release owner; count of production deploys without a recorded approval is zero | PoC for the record, benchmark-only for the rate | B1: DORA change failure rate, elite 5 percent, high 20 percent, medium 10 percent, low 40 percent (2024 clusters). Playbook Deploy lagging indicator: defects caught before merge set against those escaping to production (P10) | Environment protection rules and deployment reviews (`gh api .../environments`); command S9.8 | Zero AI credits. Time: release owner's approval, record minutes |
| 8.4 Monitoring and alert triage (Amber) | Every alert has a human disposition; measure time from alert to disposition | Benchmark-only (no production alerts on this repo) | Playbook Maintain leading indicator: time from band breach to an intent in the triage queue (P11). B1: failed deployment recovery time, elite under one hour | Issues opened from alerts, if the proof of concept wires one; otherwise not measured | AI summarisation per alert: included requests or 1 premium request per coding-agent session if it files the issue. Review: disposition minutes |
| 8.5 Incident response and post-incident review (Red) | Blameless post-incident record written for every incident; repeat incidents of the same class fall over time | Benchmark-only | Playbook Maintain lagging indicator: repeat incidents of the same class should fall (P12). B1: DORA deployment rework rate | Incident issues with a label; not present on this repo | Not measured |
| 8.6 Fold the learning back into context: rules, skills, design system, ADRs (Amber) | Every review finding that names a rule ends as a merged change to the instructions file, a hook, or an ADR, not a chat message; count of findings with no repo change, target zero | PoC | Playbook Maintain lagging indicator: share of findings that become merged fixes (P12). DORA 2025 capability "connect AI to your internal context" (B14) | PRs touching `CLAUDE.md`, the Copilot instructions file, `.claude/`, `lefthook.yml`, `docs/adr/` (`gh pr list --json files`); command S9.9 | Coding agent: 1 premium request per session if the agent drafts the change. Review: human approves, 5 minutes per change |

Common failure mode for the stage: what is learned in production does not reach the people writing the next set of requirements (map, Stage 8 as-is), and in the agent version, every ticket or incident waits on a person to act (P11 context). The team cannot measure most of this stage, and the table says so on four of six rows. The row it can measure, 8.6, is the one the migration claim rests on: if a reviewer's finding does not become a rule in the repo, the next run repeats it.

Operational cost for the stage: on this repo, close to zero AI credits, because the only automated rows are hosting and the optional 8.6 drafting session. The cost that matters is the human approval on 8.3, which for NBN Co may be a regulated act under SOCI (slice 3 module 6), and no proof-of-concept run changes that.

## 7. The playbook's indicators, mapped to the map

The client asked the team to read Anthropic's AI-Native SDLC Playbook (blog, 21 August 2026; course on Claude Academy). It defines six stages with a leading and a lagging indicator each. They are the only published indicator set built for agent-driven delivery, so each is quoted here and mapped to the map's tasks, with register numbers P1 to P12. Retrieved 18 Sep 2026 from the blog post.

| Playbook stage | Leading indicator (verbatim) | Lagging indicator (verbatim) | Map tasks |
|---|---|---|---|
| Plan | P1: "Time from first conversation to a committed `intent.md`, read from git history on the intent home, which records author and time stamp." | P2: "The survival rate, or the share of `intent.md` files that the product owner accepts into Stage 2: Design rather than closes." | 5.3, 5.4 |
| Design | P3: "Elapsed time between the `intent.md` commit and the `spec.md` commit for the same change (two git timestamps), compared with the old requirements-plus-design cycle." | P4: "Requirements rework after build starts. Count `spec.md` commits dated after the first `plan.md` commit for the same change." | 5.4 (rework count) |
| Build | P5: "Share of changes that merge from the first implementation pass, and time from plan approval to merged PR with the required data within the PR metadata." | P6: "Rework cycles per change, again from the PR metadata, and how often the merged diff still matches the committed `plan.md`." | 6.1, 6.2, 6.5 |
| Test | P7: "First-pass CI success rate for agent-written changes, which the CI system already supports." | P8: "Review time per PR (from the PR metadata), which should fall once the tests catch what reviewers used to catch, and the change failure rate from an incident tracker." | 7.2, 6.4 |
| Deploy | P9: "Time to first review, which should fall to minutes, and the share of review comments resolved without a human touching the branch." | P10: "Defects and vulnerabilities caught before merge set against those escaping to production, from the PR history and the incident tracker." | 6.4, 6.5, 7.5, 8.3 |
| Maintain | P11: "Time from band breach to an `intent.md` in the triage queue, against the old time from incident to post-mortem action." | P12: "The share of findings that become merged fixes (triage queue against actual PR history), and repeat incidents of the same class, which should fall as the fixes add cases to the eval suite." | 8.4, 8.5, 8.6 |

Two things to say about the playbook as a benchmark source. It gives indicator definitions, not target values: nowhere does it publish a number a team should hit, so every playbook row above is "measure this" and not "reach this". And it is vendor documentation (source class 1 for mechanics under slice 1's ranking, not class 3 research), so it is used here for what to measure and where to read it from, never for a productivity claim. The playbook's cross-cutting point is the one the map already makes: once the build compresses, "the bottleneck moves to the steps to the left and right of the build phase", which is why review minutes on 6.4 is the central number.

## 8. Benchmark register

Every figure used above, with its source, class under slice 1's ranking (1 official documentation and standards, 2 peer-reviewed, 3 industry research report, 4 vendor blog or internal figure), and the date retrieved. B-rows are benchmarks, P-rows are the playbook indicators (section 7), C-rows are cost rates.

| Id | Figure | Source | Class | Retrieved |
|---|---|---|---|---|
| B1 | 2024 performance clusters: elite deploys on demand, lead time under one day, change failure rate 5 percent, recovery under one hour (19 percent of respondents); high 20 percent failure rate; medium 10 percent; low 40 percent with recovery of one to four weeks | DORA, Accelerate State of DevOps Report 2024, PDF at dora.dev/research/2024/dora-report | 3 | 18 Sep 2026 |
| B2 | For every 25 percent increase in AI adoption, an estimated 1.5 percent reduction in throughput and 7.2 percent reduction in stability; authors hypothesise abandoned batch-size discipline | DORA 2024 report, same PDF | 3 | 18 Sep 2026 |
| B3 | Five delivery metrics: change lead time, deployment frequency, failed deployment recovery time, change fail rate, deployment rework rate; deployment automation and continuous delivery as capabilities | dora.dev/guides/dora-metrics-four-keys and dora.dev/capabilities/continuous-delivery | 1 | 18 Sep 2026 |
| B4 | DORA 2025: 90 percent of respondents use AI at work; 30 percent report little or no trust in AI-generated code; AI adoption positively related to throughput and negatively related to stability; seven capabilities including working in small batches and connecting AI to internal context | Google Cloud blog, "Announcing the 2025 DORA Report", 23 Sep 2025 | 3 | 18 Sep 2026 |
| B5 | Agentic PRs bundle multiple purposes at 40.0 percent against 12.2 percent for human PRs | Watanabe et al. 2025, via Zafir's Google source note and slice 1 Stage 5, verified in `citation-audit.md` | 2 | Audited Aug 2026 |
| B6 | "One business day is the maximum time it should take to respond to a code review request"; oversized changes are split into smaller CLs | Google eng-practices, review/reviewer/speed | 1 | 18 Sep 2026 |
| B7 | Review no more than 200 to 400 lines at a time, under 500 lines per hour, no more than 60 minutes per sitting; 70 to 90 percent defect discovery inside those limits | SmartBear, "Best practices for peer code review", reporting the Cisco Systems study | 4 (vendor page reporting a study; use as practice, not a target) | 18 Sep 2026 |
| B8 | 567 Claude Code PRs on real repositories: 83.8 percent merged against 91.0 percent for matched human PRs; agent involved in 41.1 percent of post-merge revisions | Watanabe et al. 2025, via slice 1 Stage 6, verified in `citation-audit.md` | 2 | Audited Aug 2026 |
| B9 | LLM assertion generation accuracy 51.82 to 58.71 percent and 38.72 to 48.19 percent on two datasets | ACM TOSEM 2025, dl.acm.org/doi/10.1145/3699598, via slice 1 Stage 7 | 2 | Audited Aug 2026 |
| B10 | 38.70 percent of AI review comments led to code changes against 44.45 percent for human comments; 30.8 percent reduction in median PR cycle time across 1,900 repositories | Atlassian blog, 7 Apr 2026, via D3 appendix B; internal, self-reported | 4 | 5 Sep 2026 (D3) |
| B11 | Stryker mutation score thresholds default high 80, low 60, break null | stryker-mutator.io, StrykerJS configuration | 1 | 18 Sep 2026 |
| B12 | Models chose the insecure option 45 percent of the time across 80 tasks and over 100 models | Veracode 2025 GenAI Code Security Report, via slice 1 | 3 (vendor with a commercial interest, triangulated) | Audited Aug 2026 |
| B13 | About 40 percent of Copilot-generated programs vulnerable | Pearce et al., Communications of the ACM 68(2), Feb 2025, via slice 1 | 2 | Audited Aug 2026 |
| B14 | DORA AI Capabilities Model: connect AI to internal context, prioritise foundational practices, fortify safety nets, focus on end users | Google Cloud blog, 23 Sep 2025 | 3 | 18 Sep 2026 |
| P1 to P12 | Leading and lagging indicators, six stages | Anthropic, "The AI-Native SDLC playbook", claude.com/blog, 21 Aug 2026 | 1 | 18 Sep 2026 |
| C1 | Copilot coding agent: 1 premium request per session, multiplied by the model's rate; 1 further premium request per steering comment | GitHub Docs, "About premium requests" | 1 | 18 Sep 2026 |
| C2 | Copilot code review: 13 premium requests per review | GitHub Docs, "About premium requests" | 1 | 18 Sep 2026 |
| C3 | Copilot Pro 300 premium requests per month at 10 USD; Pro+ 1,500 at 39 USD; 0.04 USD per additional request; counters reset on the 1st and do not carry over | GitHub Docs, "About premium requests" | 1 | 18 Sep 2026 |
| C4 | Claude Code: around 13 USD per developer per active day and 150 to 250 USD per month across enterprise deployments; under 30 USD per active day for 90 percent of users; `/usage` reports session cost at list price | code.claude.com/docs/en/costs | 1 | 18 Sep 2026 |

Recorded as none found, after search on 18 Sep 2026: a published seeded-violation catch rate for pre-commit hooks (deterministic, so 100 percent by construction is the criterion); a published first-pass CI success rate for agent-written changes; a published seeded-defect recall rate for agent code review; PR pickup and review time percentiles (LinearB's 2025 and 2026 benchmark reports, 6.1 million PRs across 3,000 teams, keep the figures behind a download and are vendor data, so they are not used); a numeric governance threshold for moving a task from amber to green (slice 1, open question 3, still open). Copilot usage metrics (the org-level Copilot metrics API, GitHub Docs) need an organisation with the usage-metrics policy enabled, which school accounts do not give the team, so per-user Copilot telemetry is recorded as unavailable and premium requests are counted from the billing page instead.

## 9. Capture recipe for Zafir

Run these from the repository root with `gh` authenticated. Each command prints the JSON the sheet needs; paste the numbers into the metric sheet with the run id and the date. Replace `<pr>` and `<issue>` with the number. Everything reads from GitHub, so the baseline (human-written PRs already on main, before the first Copilot run) and the proof-of-concept runs use the same commands.

S9.1 Issues: priority, owner role, dependencies, template fields, timeline (rows 5.1 to 5.5).

```bash
gh issue list --state all --limit 100 --json number,title,labels,body,createdAt,closedAt
gh issue view <issue> --json number,title,body,labels,timelineItems
```

S9.2 Files touched against the issue's out-of-scope list (rows 5.1, 5.3). Keep the list as a fenced block in the issue body; compare by hand or with a one-line grep.

```bash
gh pr view <pr> --json files --jq '.files[].path'
```

S9.3 PR metadata: size, timestamps, reviews, comments, threads, commits, trailers (rows 6.1 to 6.5, 7.1, 7.3).

```bash
gh pr view <pr> --json number,title,body,author,createdAt,mergedAt,additions,deletions,changedFiles,commits,reviews,comments,reviewThreads,reviewDecision
git log --format='%h %an %ad%n%(trailers)' --date=iso origin/main..HEAD
```

Time to first review is the earliest `reviews[].submittedAt` minus `createdAt`. Review minutes are not in GitHub; the reviewer writes them on the sheet at the end of each sitting.

S9.4 CI runs per push, first-pass success (rows 6.2, 7.2, 7.5).

```bash
gh run list --branch <branch> --limit 50 --json databaseId,name,conclusion,headSha,createdAt,updatedAt
```

First-pass success is the conclusion of the run whose `headSha` is the first commit pushed on the branch.

S9.5 Mutation score (row 7.4). Install Stryker with the Vitest runner in week 1, commit the config, have the workflow upload the report as an artefact, then download it.

```bash
pnpm --filter backend add -D @stryker-mutator/core @stryker-mutator/vitest-runner
pnpm --filter backend exec stryker run
gh run download <run-id> --name mutation-report
```

The score is `mutationScore` in `reports/mutation/mutation.json`.

S9.6 Branch protection in force (row 6.4 precondition; slice 2 gap 3 says the ruleset targets no branch).

```bash
gh api repos/Peepachuu/nbn-sdlc-demo/rulesets --jq '.[] | {name, enforcement, target}'
```

S9.7 Dependabot and security findings and their disposition (row 7.5).

```bash
gh api repos/Peepachuu/nbn-sdlc-demo/dependabot/alerts --jq '.[] | {number, state, severity: .security_advisory.severity, dismissed_by: .dismissed_by.login, dismissed_reason}'
```

S9.8 Preview deployments and environment approvals (rows 8.1, 8.3).

```bash
gh api repos/Peepachuu/nbn-sdlc-demo/deployments --jq '.[] | {id, environment, ref, created_at}'
gh api repos/Peepachuu/nbn-sdlc-demo/environments --jq '.environments[] | {name, protection_rules}'
```

S9.9 Learning folded back into the repo (row 8.6).

```bash
gh pr list --state merged --limit 100 --json number,title,mergedAt,files --jq '.[] | select(.files[].path | test("CLAUDE.md|copilot-instructions|^.claude/|lefthook.yml|^docs/adr/")) | {number, title, mergedAt}'
```

S9.10 AI credits. Copilot: the premium request counter on the GitHub billing page, read at the start and end of each run and written on the sheet with the model used. Claude Code: `/usage` at the end of each session; write the `Total cost` line and the input and output token counts.

The metric sheet has one row per run: run id, issue, condition (harness on or off, Copilot or Claude Code), and one column per criterion in sections 3 to 6 that is tagged PoC. Benchmark-only rows do not get a column; they sit in section 8 for the playback.

## 10. What this document does not claim

No figure in section 8 transfers to NBN Co; the DORA clusters describe a survey population and the peer-reviewed studies describe other repositories. The playbook indicators are definitions from one vendor, not targets. The seeded-violation and seeded-defect criteria are proof-of-concept constructs the team designs in week 1, and their results are evidence about this repository's hooks, not about Copilot or Claude Code in general. Four of the six Stage 8 rows are not measurable on this repository and are marked so. Review minutes are self-reported by the reviewer and should be read as such.

## 11. Card checklist

Measurable criterion per gated step: sections 3 to 6, 21 rows. Industry benchmark or none found: Benchmark column, register in section 8. Playbook indicators as a source: section 7, P1 to P12. PoC or benchmark-only: third column of every table. GitHub data source: fifth column, commands in section 9. Failure mode per gated stage: the paragraph under each table. Operational cost, AI credits and review time: sixth column and the cost paragraph under each table, rates C1 to C4. Sources published research or documented practice: class column in section 8, class 4 rows flagged. Source and date on every figure: section 8. Handed to Zafir: section 9 and the Teams message on the card. Committed to `docs/research/`: this file. Master doc entry: written on commit.
