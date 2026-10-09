# Proof-of-concept success metric results

**Owner:** Ahmed Falulur Rahuman  
**Planner card:** `[PRD] - Apply success metrics to the proof-of-concept : 240`  
**Run:** FR-01 fault-reporting proof of concept  
**Source metric set:** `docs/research/success-metrics-stages-5-8.md`

## Purpose

This file applies the 21 Stage 5 to 8 success metrics to the FR-01 proof-of-concept run. It records only what the current evidence supports. Missing values are kept as unavailable rather than inferred from Planner completion comments, capacity estimates or elapsed command time.

Status values used below are **Measured**, **Partial**, **Not measured** and **Benchmark-only**.

## Run-level cost and effort

| Metric | Result | Status | Evidence / limitation |
|---|---:|---|---|
| Generating time, including prompting | Approximately 240 minutes | Measured | Retrospective estimate supplied by Zafir. Prompting is already included and cannot be separated from generation. |
| Zafir review time | Approximately 35 minutes | Measured | Retrospective estimate for Zafir's own review only. |
| Chirag independent review time | Unavailable | Not measured | Chirag's one-hour allocation is capacity, not measured review time. The human review checklist is still pending. |
| AI Credits | 69.05 | Partial | Sum of supplied GitHub daily usage entries. They are daily account totals, so attribution to FR-01 alone is provisional. |
| Displayed usage amount | $0.69 | Partial | Sum of the supplied rounded daily amounts. Currency and whether this was an actual charge were not established. |
| Per-stage AI Credits and time | Unavailable | Not measured | No instrumented Stage 5, 6, 7 or 8 allocation was captured. The run-level totals must not be spread across stages. |

Source: `docs/research/fault-reporting/evidence/run-2026-09-27/usage-and-time-estimates.md` and `docs/research/fault-reporting/credit-log.md`.

## Stage 5: Development planning

| Gate | Metric | Actual FR-01 result | Status | Evidence / source | Note |
|---|---|---|---|---|---|
| 5.1 Slice the work into single-purpose issues | Agent-proposed issues accepted without splitting; zero files outside issue scope | Issue #57 exists as one scoped fault-reporting feature with a defined file scope and exclusions. The evidence does not record whether an agent-proposed issue was accepted without splitting, and there is no feature PR or merged diff to compare against the scope list. | Partial | `fault-reporting/issue-draft.md`, `evidence/run-2026-09-27/readiness.md`, `pr-evidence.md` | B5 and DORA small-batch figures remain external benchmarks only. |
| 5.2 Prioritise, assign, flag dependencies | Priority, owner and dependencies present before commitment | FR-01 is recorded as P1, with Zafir as run operator, Chirag as independent reviewer, and dependencies listed in the feature material. The current evidence does not prove the hosted GitHub issue carried the required priority label and dependency links. | Partial | `fault-reporting/feature-brief.md`, `issue-draft.md`, `readiness.md` | No numeric benchmark was found in the metric source. |
| 5.3 Write acceptance criteria and out-of-scope list | Testable criteria and exclusions before agent work; zero files outside scope | AC1 to AC6 and explicit exclusions were approved before implementation was authorised. Human instruction minutes are unavailable, and no feature PR diff exists to verify zero out-of-scope files. | Partial | `issue-draft.md`, `decisions.md`, `readiness.md` | Anthropic Plan indicators P1/P2 are comparison definitions, not demonstrated results. |
| 5.4 Commit the sprint plan | Plan and capacity checked; count of post-day-1 rescope decisions | Readiness and decision records exist. Capacity estimates of about 2 hours for Zafir and 1 hour for Chirag were recorded, but they are estimates. The issue timeline/rescope count after day 1 was not captured. | Partial | `decisions.md`, `readiness.md`, `pr-evidence.md` | No numeric comparison benchmark was published. |
| 5.5 Push issues into repo host | Issue exists in GitHub, uses template, links to story, zero template validation failures | Hosted issue #57 is recorded and was verified open. Template use, story-link validation and a deterministic template-validation result are not present in the supplied evidence. | Partial | `issue-draft.md`, `readiness.md` | Issue existence is demonstrated; the full gate is not. |

## Stage 6: Development and build

| Gate | Metric | Actual FR-01 result | Status | Evidence / source | Note |
|---|---|---|---|---|---|
| 6.1 Agent reads issue, confirms criteria and plans | Human accepts plan before code; revision count; AC coverage in plan | The initial planning prompt and Copilot session reference are preserved, and implementation was later authorised by Zafir. The planning response was not exported into the repository, so exact plan revisions and explicit AC coverage cannot be reconstructed. | Partial | `planning-exchange.md`, `planning-prompt.txt`, `decisions.md` | P6 is an external playbook indicator only. |
| 6.2 Branch, implement, commit | Hooks catch seeded violations; rework after first review | Implementation occurred on the FR-01 worktree and 11 hook-contract tests were recorded. The full seeded lint/format/conventional-message/secret experiment was not demonstrated, Gitleaks remains pending, and there is no feature PR review request from which to count rework commits. | Partial | `implementation.md`, `routine-checks.md`, `tooling-and-security.md`, `pr-evidence.md` | The deterministic 100% catch target was not demonstrated for all required seeded cases. |
| 6.3 Open draft PR with description and provenance | PR contains attribution, issue and ACs | A proposed PR body was prepared, and the Copilot session is recorded, but no actual feature PR is evidenced in the current docs. The interface did not disclose the concrete model. | Not measured | `pr-evidence.md`, `credit-log.md` | A draft text is not a measured PR result. |
| 6.4 Human code review and merge approval | Independent approval, CI green, protection; review time/comments/size | Chirag's independent human review is still pending. No feature PR, completed independent review, merge approval or measured Chirag review duration is present. | Not measured | `chirag-review-checklist.md`, `gates.md`, `pr-evidence.md` | Google and SmartBear review figures are benchmarks only. |
| 6.5 Iterate on review comments | Revision rounds and agent-only resolution share | No completed feature PR review thread or revision-round record is present. | Not measured | `pr-evidence.md`, `gates.md` | B8/P9 remain external comparisons only. |

## Stage 7: Testing and QA

| Gate | Metric | Actual FR-01 result | Status | Evidence / source | Note |
|---|---|---|---|---|---|
| 7.1 Generate tests alongside the change | Test evidence for every acceptance criterion; zero criteria without a test | Automated Server Action/component evidence exists for AC1 to AC6. Final clean tests recorded 5 backend and 24 frontend tests passing. | Measured | `ac-matrix.md`, `post-revision-test-all-clean.txt` | This measures criterion coverage, not whether every assertion is correct. |
| 7.2 Run the CI suite | Final CI jobs green; first-push CI success | Local lint and typecheck passed, 5 backend and 24 frontend tests passed, and the webpack fallback build passed. The default Turbopack build was blocked by environment/port constraints, and no FR-01 remote CI first-push result is supplied. | Partial | `post-revision-test-all-clean.txt`, `lint-final.txt`, `typecheck-final.txt`, `build-webpack.txt`, `gates.md` | Do not report first-pass CI success from local checks. |
| 7.3 Separate adversarial agent review | Independent agent pass; seeded-defect recall; no auto-resolution | A fresh read-only review agent found no significant defects against AC1 to AC6. It was not given the earlier report, but it did not perform blind seeded-defect discovery. The earlier review was informed of seeded fault types. | Partial | `adversarial-review-fresh.md`, `ac-matrix.md` | Agent-context independence is not independent human review. |
| 7.4 Judge whether tests are correct | Mutation score plus human accept decision | First post-implementation mutation measurement was 63.64%; after focused test revision it was 73.86%. There was no pre-feature frontend mutation baseline and no numeric threshold. Chirag's human acceptance decision is pending. | Partial | `ac-matrix.md`, `mutation/revised-gap-analysis.md`, `chirag-review-checklist.md` | Stryker's documented 80/60 defaults are reference values, not this project's threshold. |
| 7.5 Security scan and dependency audit | Security scan green or all high findings dispositioned | Fresh audit on 2 Oct reported 23 advisories: 1 critical, 8 high, 12 moderate and 2 low. No remediation or human disposition is recorded. Gitleaks remains pending because the local executable was unavailable and no required CI result is supplied. | Partial | `tooling-and-security.md`, `dependency-audit-current.json`, `gates.md` | The security gate is not demonstrated as passed. |

## Stage 8: Deployment and iteration

| Gate | Metric | Actual FR-01 result | Status | Evidence / source | Note |
|---|---|---|---|---|---|
| 8.1 Preview deployment on every PR | Preview URL before review | No application preview URL or deployed application commit SHA is recorded. Firestore rules and the composite index were deployed/created, but the application itself was not deployed. | Not measured | `deployment.md`, `gates.md`, `ac-matrix.md` | Firestore configuration deployment is not an application preview. |
| 8.2 Progressive rollout and rollback | Ring thresholds and automatic rollback | No rollout rings or production rollout controller exist for this student repository. | Benchmark-only | `success-metrics-stages-5-8.md` section 6 | DORA continuous-delivery/change-failure figures are benchmarks only. |
| 8.3 Production promotion approval | Named approval for each production release | No application production promotion was performed, so no release approval result or approval duration is available. | Not measured | `deployment.md`, `gates.md` | DORA change-failure figures and P10 are benchmarks only. |
| 8.4 Monitoring and alert triage | Human disposition for each alert; alert-to-disposition time | No production alert stream exists for the proof of concept. | Benchmark-only | `success-metrics-stages-5-8.md` section 6 | P11 and DORA recovery measures are benchmarks only. |
| 8.5 Incident response and post-incident review | Post-incident record; repeat incident rate | No production incident history exists for the proof of concept. | Benchmark-only | `success-metrics-stages-5-8.md` section 6 | P12 and DORA rework measures are benchmarks only. |
| 8.6 Fold learning back into repository context | Review findings become merged rules, hooks or ADR changes | The current evidence does not show a completed FR-01 human review finding being converted into a merged rule, hook or ADR change. The fresh agent review reported no significant defect. | Not measured | `adversarial-review-fresh.md`, `chirag-review-checklist.md`, `gates.md` | Existing setup/instruction work predates the completed human review required by this metric. |

## Local acceptance evidence

The strongest proof-of-concept evidence is at Stage 7 and the local Firebase boundary:

- AC1 to AC6 all have automated evidence.
- User A submitted all three approved categories through the local app.
- A whitespace-only submission was rejected without creating a record.
- Stored reports had the expected authenticated owner, timestamp, `submitted` status and document reference.
- User A's reports persisted and remained newest-first after refresh once the approved index was `READY`.
- User B saw no User A reports.
- Deployed Firestore rules denied unauthenticated, User A and User B direct client read/write probes with HTTP 403.
- The direct-client rules checks are defense-in-depth evidence and are not treated as proof of Server Action authorization.

Source: `evidence/run-2026-09-27/ac-matrix.md` and `integration-results.md`.

## Delivery benchmarks are comparison values only

The benchmark register in `success-metrics-stages-5-8.md` remains the source for external figures. None of the following are claimed as FR-01 results:

- DORA deployment frequency, change failure, recovery and continuous-delivery measures (B1, B3, B4).
- Google small-change and review-speed practice (B6).
- SmartBear/Cisco review-size and review-speed guidance (B7).
- Watanabe et al. agent PR merge, bundling and post-merge revision figures (B5, B8).
- Published LLM test/security figures (B9, B12, B13).
- Atlassian AI-review figures (B10).
- Stryker's documented default mutation thresholds (B11), which are not adopted as an FR-01 gate.
- Anthropic Playbook indicators P1 to P12, which are indicator definitions rather than achieved targets.

Stage 8.2, 8.4 and 8.5 are therefore recorded as **Benchmark-only**, not as failed or demonstrated delivery results.

## Measurement gaps retained

The following values could not be measured from the available run evidence:

- per-stage AI Credits;
- per-stage generation, prompting, human review, manual correction and check-execution time;
- Chirag's actual independent review duration and final decision;
- exact plan revision count and explicit acceptance-criteria coverage of the plan;
- feature PR metadata, PR size, time to first review, review rounds and agent-only comment-resolution share;
- remote FR-01 first-pass CI result and actual Gitleaks result;
- a pre-feature frontend mutation baseline;
- deployed application preview URL, deployed application commit SHA and preview smoke-test result;
- production rollout, monitoring and incident measures.

These values are unavailable, not zero.

## Planner and evidence discrepancy

The Planner marks the proof-of-concept build card complete and states that AI Credits plus generation/review time were recorded by stage, and that the deliverable includes human review and deployment evidence. The current evidence files do not support those claims at that level. `credit-log.md` says precise per-stage values are unavailable, `chirag-review-checklist.md` is still pending, `gates.md` still requires Gitleaks and deployed-preview evidence, and `deployment.md` states that no application deployment or production promotion was performed.

For this result sheet, the underlying evidence is used instead of the optimistic Planner completion wording.

## Result summary

The proof of concept produced useful evidence for acceptance-criterion coverage, local Firebase behavior, mutation testing, AI usage estimates and several deterministic controls. It did not demonstrate the full lifecycle end to end. The largest remaining evidence gaps are independent human review, security disposition/Gitleaks, feature PR and remote CI measurements, per-stage cost/timing, and deployed application preview/release evidence.
