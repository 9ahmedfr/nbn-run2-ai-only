# Module reconciliation and white paper structure

The four Sprint 2 modules read against each other, against the repository, and against the proof-of-concept run. It lists every place they disagree, what settles each one, the words the white paper should use, the friction the run hit, and a section structure the team can write into.

**Planner card:** [UX] - Reconcile the four modules into the white paper structure
**Author:** Zac Clarkson, 2 Oct 2026. Drafted with Claude (claude.ai); every file, number and quote below was read from the repository or the GitHub API on that date.
**Checked against:** `main` at `58e1a35`; `docs/git-commits-module` (PR #59, open); `s4084016-fr-01-fault-reporting-plan` at `2c19c5d` (PR #63, open); `docs/governance-token-model` (PR #58, open); the live `main` ruleset, read from the GitHub API on 2 Oct 2026.

---

## 1. What this is for

The white paper is one document. The four modules were written by two people over three weeks, each against the repository as it stood that day, and the proof of concept ran after three of them were finished. This report is the step between: it finds what the modules say differently so the white paper does not inherit it.

How to use it:

- **Module authors:** section 5 lists the edits each module needs. Each is small.
- **Whoever writes a white paper section:** section 7 says what goes in it, which files feed it, and what is still missing.
- **Zafir:** section 6 is a friction log I built from your run evidence. You have not seen it. Correct anything I read wrong.

---

## 2. The four modules

| Card name       | File                                       | Author | State on 2 Oct                         | D4 tasks it covers            |
| --------------- | ------------------------------------------ | ------ | -------------------------------------- | ----------------------------- |
| Testing         | `docs/modules/testing.md`                  | Chirag | On `main` (PR #39)                     | 7.2, 7.4, 7.5, part of 6.3    |
| Prompt practice | `docs/modules/prompt-practice.md`          | Chirag | On `main` (PR #52)                     | 8.6, and the prompts for 6.1  |
| Code generation | `docs/modules/copilot-development-workflow.md` | Chirag | On `main` (PR #61, 28 Sep)         | 5.3, 6.1, 6.4, 6.5            |
| Git commits     | `docs/modules/git-commits.md`              | Zac    | Not on `main`. PR #59 open since 28 Sep | 6.2, 6.3, 6.4 (the merge)     |

The card calls the third one "code generation". The file is called `copilot-development-workflow.md`. They are the same module.

ADR-002 defines full depth as five things per task: its steps, its gate and what holds it, its failure mode, a worked example, and how a team would know it was done successfully. Against that:

| Module          | Steps                              | Gate and holder | Failure mode             | Worked example                  | How you know it worked |
| --------------- | ---------------------------------- | --------------- | ------------------------ | ------------------------------- | ---------------------- |
| Testing         | Partly. No commands to run a mutation test | Yes     | Yes (the verification problem) | Gitleaks pass and fail only | No                     |
| Prompt practice | Yes                                | Yes (one gate)  | No                       | Yes                             | No                     |
| Code generation | Yes                                | Yes             | Yes (rubber-stamping)    | Yes                             | No                     |
| Git commits     | Yes, with commands                 | Yes             | Yes, one per gate        | Yes                             | No                     |

No module says how a team would know a step was done successfully. That column exists in a separate file, `docs/research/success-metrics-stages-5-8.md`, row by D4 task. The white paper has to join the two (section 7, part 10).

Two D4 tasks in the full-depth stages have no module text at all: **7.1** (generate unit tests alongside the change) and **7.3** (adversarial review by a separate agent). The only material on either is the run evidence in section 6.

---

## 3. Contradictions

Every place two team documents say different things. Where the repository or the ruleset shows which is right, it is resolved and the evidence is named. Where it needs a team or client decision, it is recorded as an open question with an owner.

| #   | The contradiction | Resolution | Status |
| --- | ----------------- | ---------- | ------ |
| C1  | **Agent attribution.** Testing says the agent co-author is "Not captured ... the repository does not currently record AI contributions using `Co-Authored-By` trailers". `docs/governance-verification-results.md` test 5 and the git commits module show a Claude Code trailer on commit `20755e0` that survived the squash to `main` at `2c9a958`. | Testing is out of date. Trailers are recorded when the tool adds them: Claude Code does by default, Copilot in VS Code does not (git commits, Provenance). The run adds a third case: the feature commit `9593f1e` on PR #63 carries `Co-authored-by: Copilot App`. Nothing checks for a trailer, so the label is "No gate", not "Not captured". | Resolved by evidence. Edit in section 5. |
| C2  | **CI as a gate.** Code generation's gate table says "Automated verification before merge" is held by a CI check. Testing lists seven CI checks and says Gitleaks "prevents the security check from passing". `docs/GIT-WORKFLOW.md` line 64 says "CI must pass before merge". The git commits module found only one job is required. | The ruleset read on 2 Oct lists one required status check: `AI Declaration`. Lint & Typecheck, Frontend Tests, Backend Unit Tests and Security Scan run and report, and a pull request with two approvals can merge while they are red. A failed Gitleaks scan fails its job and does not block the merge. The white paper says "CI check (required)" or "CI check (advisory)" every time. | Resolved by evidence. Whether to make the four required is open: owner Chirag (ruleset), team to agree. |
| C3  | **Mutation threshold.** Testing says a "minimum acceptable mutation-score threshold is required before mutation testing can be used as a gate" and that the repository defines none. `backend/stryker.config.json` has `"thresholds": { "high": 80, "low": 60, "break": 0 }`. For the run, Zafir approved "descriptive frontend mutation reporting with no percentage threshold" plus two seeded faults that the tests must catch (`decisions.md`, 30 Sep). | Testing is right in substance: `break: 0` never fails a run, so no threshold is enforced. It should cite the config. What the run did is the practice the white paper can describe: the score is evidence for the person judging the tests (D4 7.4, red, human), and the seeded faults are the pass or fail part. | Resolved for what exists. Whether the white paper recommends a numeric floor is open: owner Chirag with Zafir. Related to Q-10 in `PROJECT-LOG.md`. |
| C4  | **Hooks.** Testing's harness inventory labels sixteen items "Hook". Eleven of them are Claude Code hooks or deny rules in `.claude/settings.json`. The example tool is Copilot, where they do not run. Copilot has one hook, `.github/hooks/fault-reporting.json`, which denies `git push` and nothing else. The mechanism map records that a Copilot hook that times out lets the command through. | The white paper splits the label the way the git commits module does: **Hook (git)** runs for everyone whatever tool wrote the change (lefthook: placeholders, Prettier, ESLint, commit message). **Hook (agent)** runs only inside one tool. The inventory gets a "runs for" column. Any text that calls an agent hook enforcement also says it fails open on timeout. | Resolved by evidence. Which Claude Code hooks to port to Copilot is open: owner Chirag. |
| C5  | **Plan approval.** Code generation says a plan-first instruction "should not be treated as a mechanically enforced pre-implementation gate". `.github/copilot-instructions.md` says "Wait for the human to approve that plan before changing feature code". ADR-002 puts "an approved implementation plan" inside the stage 5 handoff. D4 puts it at 6.1. | Both are true and they describe different lanes. In an interactive session the developer holds the gate: the run asked for "a plan only", and `decisions.md` records the approval on 27 Sep and the authorisation to implement on 30 Sep. On the cloud agent, assigning the issue starts the work and nothing holds the plan. The white paper labels it Human in an interactive session and No gate on the cloud agent. | Resolved by evidence. Whether the approved plan belongs to stage 5 (ADR-002) or task 6.1 (D4) is open, one line either way: owner Sidney. |
| C6  | **Which Copilot.** Code generation leads with the cloud agent (example 1) and VS Code agent mode (example 2). The git commits module treats VS Code agent mode as the main path. `docs/ai-attribution-verification.md` records that nobody on the team has cloud-agent access. The run used neither: `credit-log.md` names the client "Copilot CLI", the commit trailer says "Copilot App", and the work happened in a `copilot-worktrees` folder. | No module describes the lane the proof of concept ran in. The white paper leads with the lane that was run and marks the others "documented, not run". | Open. Owner Zafir: name the client and version. Then code generation and git commits each add that lane. |
| C7  | **Gate labels.** Four spellings for the same column: "Classification" (testing), "Gate: Human" (prompt practice), "Gate mechanism: Human" (code generation), "Holder" (git commits). Three different label sets: Hook, CI check, Human (testing, code generation); those plus No gate and the two hook layers (git commits); Advisory and Enforcing (mechanism map). The ruleset is called "CI check (ruleset)" in git commits, "Control type: Human" in the governance verification results, and "Ruleset (platform)" in the governance and token model. | Section 4 proposes one set. The ruleset is not a CI check and not a person, so it needs its own label. | Open. D1 section 3 has three labels and this adds to them: team to agree. Owner Zac to propose, Sidney to accept or not for the governance model. |
| C8  | **The non-requesting approver.** Testing says "Partially captured": GitHub does not record whether the reviewer was the requester. The git commits module says the ruleset needs two approvals and an author cannot approve their own pull request. The governance and token model says "Yes". | In VS Code agent mode and the CLI the person who asked the agent is the pull request author, so the platform holds the separation. On the cloud agent GitHub's documentation says the requester's approval does not count; that was not run. Captured for the lanes the team can use. | Resolved by evidence for the lanes run. |
| C9  | **The accountable owner.** Testing says "Not captured ... no implemented governance register". PR #58 adds `docs/AI-register.md`. | Resolved when #58 merges. Until then testing is correct. | Pending PR #58. Owner Sidney. |
| C10 | **Where prompts live.** Prompt practice says a prompt that is useful beyond one conversation is stored in `.github/prompts/`. The one prompt the run reused and preserved is in `docs/research/fault-reporting/evidence/run-2026-09-27/planning-prompt.txt`, with an earlier form in `runbook.md`. | Not a conflict, a first test of the rule. By the module's own criteria the planning prompt has been used once, so it stays a prompt. It is the first real candidate for `.github/prompts/`; the prompt file and the skill in the repository now are examples. The five promotion thresholds (three uses, two people, and so on) have no source, so the white paper presents them as the team's proposal. | Open, small. Owner Chirag. |
| C11 | **The four names.** Testing calls them Committer, Agent co-author, Non-requesting approver, Accountable owner. The governance and token model calls them Human author of record, Agent co-author, Human approver, Accountable owner. | Same four roles. Use the governance model's names, because that deliverable owns them. | Resolved. Edit in section 5. |

C1, C2, C3, C4, C5, C8 and C11 are settled by what the repository shows, and C9 settles when PR #58 merges. C6, C7 and C10 need a person. C2, C3, C4 and C5 each leave one decision open after the facts are settled.

---

## 4. Terminology

Copilot is the example tool (ADR-002, after the 17 Sep client meeting). Claude Code appears as an equivalent, never as a requirement.

| Use | Meaning | Instead of |
| --- | ------- | ---------- |
| **Copilot agent mode (VS Code)** | Copilot editing the developer's workspace from the VS Code chat panel | "Copilot Agent mode", "agent mode", "Copilot in VS Code" used loosely |
| **Copilot cloud agent** | Copilot assigned a GitHub issue, working on its own branch and opening the pull request | "Copilot coding agent" (`ai-attribution-verification.md`), "the agent" |
| **Copilot CLI** | The lane the run used, pending Zafir's confirmation (C6) | "Copilot App", "Copilot session" |
| **Lane** | One of the three above. A statement about Copilot names its lane | "Copilot does X" with no lane |
| **Gate** | A point where work stops until something lets it through | "control", "check", "checkpoint" used as synonyms |
| **Holder** | What holds a gate. One of the labels below | "Classification", "Gate mechanism", "Control type" |
| **Hook (git)** | A git hook installed by lefthook. Runs for every tool and every person who ran `pnpm install` | "Hook" alone |
| **Hook (agent)** | A hook inside one tool: `.github/hooks/*.json` for Copilot, `.claude/settings.json` for Claude Code. Fails open on timeout in Copilot | "Hook" alone |
| **CI check (required)** | A GitHub Actions job the ruleset lists. Today: AI Declaration only | "CI must pass" |
| **CI check (advisory)** | A job that runs and reports and does not block the merge. Today: the other four | "CI gate" |
| **Platform rule** | The `main` ruleset: two approvals, squash only, no force push, no delete. Proposed new label (C7) | "CI check (ruleset)", "Control type: Human" |
| **Human** | A person makes a judgement | |
| **No gate** | The rule is written down and nothing holds it. Instructions files, prompt files, skills, custom agents and the agent's own summary are all No gate | "Advisory" |
| **Instructions file** | `.github/copilot-instructions.md` (Claude Code: `CLAUDE.md`) | "repository guidance", "rules file" |
| **Prompt file** | `.github/prompts/<name>.prompt.md` | "saved prompt", "slash command" |
| **Skill** | `.github/skills/<name>/SKILL.md` | "procedure" |
| **Trailer** | The `Co-authored-by:` line on a commit. Git matches the key in any case | "attribution", "co-author tag" |
| **AI declaration** | The two checkboxes in the pull request template that the AI Declaration job reads | "AI disclosure" |
| **The four names** | Human author of record, Agent co-author, Human approver, Accountable owner | "accountability chain" roles under other names (C11) |
| **AI Credits** | The unit Copilot bills on the Student plan (`runbook.md` correction) | "premium requests", "tokens" for Copilot |
| **The fault report, FR-01** | The proof-of-concept feature (issue #57, PR #63) and its measured run | "the demo", "the PoC feature" |
| **Task 6.3** | D4 task ids, always with the number | "the PR step" |
| **Section** | A part of the white paper | "module" for parts of the white paper. At the mock playback on 11 Sep Leon said "modules" was the wrong word for slice 2; keep it for the four files only |

---

## 5. Edits this asks of each module

Small, and each follows from a row in section 3. I have not made them; three of the four files are Chirag's.

**`docs/modules/testing.md` (Chirag)**

1. Current Repository Coverage, "Agent co-author" row: change "Not captured" to "Captured when the tool adds it; nothing checks (No gate)" and cite `2c9a958` and PR #63 commit `9593f1e` (C1).
2. Harness Inventory: add a "Runs for" column (every tool, Claude Code only, Copilot only) and add the Copilot push hook as a row (C4).
3. Harness Inventory, the seven CI rows: mark each required or advisory. Today all seven are advisory; AI Declaration is the only required job and is not in the table (C2).
4. Mutation Testing: cite `backend/stryker.config.json` and say `break: 0` means nothing is enforced (C3).
5. Rename the four roles to the governance model's names (C11). When PR #58 merges, update the "Accountable owner" row (C9).

**`docs/modules/copilot-development-workflow.md` (Chirag)**

1. Gate mechanisms table, "Automated verification before merge": say which jobs are required today (C2).
2. Add the lane the run used, once Zafir names it, and mark the cloud agent example "documented, not run" (C6).
3. One sentence under "Example 2" that the plan approval is a Human gate held by the developer in the session, with the run's `decisions.md` as the example (C5).
4. Typo in the heading "The output recieved from Copilot".

**`docs/modules/prompt-practice.md` (Chirag)**

1. Say the five promotion thresholds are the team's proposal (C10).
2. Add a failure mode. The module has none. A candidate from the run: the planning prompt lives in an evidence folder and in the runbook in two different wordings, so there is already no single reviewed copy.
3. "Shared Copilot Space": mark as documented, not run. Nothing in the repository records anyone creating one.

**`docs/modules/git-commits.md` (Zac, PR #59)**

1. Provenance table: add a row for the lane the run used. Commit `9593f1e` has a `Co-authored-by: Copilot App` trailer, which the table does not predict (C1, C6).
2. Replace "CI check (ruleset)" with the agreed label (C7).
3. Gap 2 (squash titles unchecked) has a fourth case since it was written: `58e1a35 Feature/copilot issue workflow (#61)`.

---

## 6. Friction log from the proof-of-concept run

**Status of this section.** There was no friction log. I derived this one on 2 Oct from the files on `s4084016-fr-01-fault-reporting-plan` at `2c19c5d` and from PR #63 through the GitHub API. Zafir has not confirmed it. The run itself is not accepted: Chirag's independent review, the deployed-preview checks and final human acceptance are all recorded as pending. Paths below are under `docs/research/fault-reporting/` unless they start with `docs/`.

| #   | D4 task | What happened | Evidence | What the white paper takes from it |
| --- | ------- | ------------- | -------- | ---------------------------------- |
| F1  | 6.3 | The Copilot interface did not show a model name. Every record says "not disclosed". | `credit-log.md`, `evidence/run-2026-09-27/pr-evidence.md` | The provenance record's "model" field cannot always be filled. The form needs a "not disclosed" value, and the paper says so. |
| F2  | 5 to 8 | AI Credits and per-stage times were not exposed or measured. All four stage rows read Pending or Unavailable. Human time is an estimate (Zafir about 2 hours, Chirag 1 hour). | `credit-log.md`, `evidence/run-2026-09-27/readiness.md` | The cost column in the success metrics and the token model have no run numbers. The paper cannot claim a cost per gate from this run. |
| F3  | 5.3 | The approval of the acceptance criteria was first recorded as "9:43" with no date or timezone and had to be supplied again. | `decisions.md`, 27 Sep rows | An approval record needs a named person and a full timestamp. Say so in the issue-readiness steps. |
| F4  | 6.1 | The planning exchange could not be saved word for word; only the prompt was. | `evidence/run-2026-09-27/planning-exchange.md`, `planning-prompt.txt` | "Prompt recorded" is achievable. "Response recorded" depends on the tool exporting it. |
| F5  | 6.2 | The agent worked in an isolated worktree that could not read the root `.env`. Firebase integration was blocked from 27 Sep and `decisions.md` still records it blocked on 30 Sep. `readiness.md` says in one place that the files are readable and in another that they are absent. | `evidence/run-2026-09-27/readiness.md`, `environment-recheck.txt`, `implementation.md` | Environment setup is a human step before handoff (same finding as O-007). Add it to issue readiness. |
| F6  | 6.2 | Local Node 24.19 and pnpm 11.20 against CI's Node 22 and pnpm 10, with a workaround variable. The baseline production build was blocked on the developer's machine. | `runbook.md`, `baseline.md` | "Passes locally" and "passes in CI" are different claims. Record the versions. |
| F7  | 7.5 | Gitleaks was not available locally, so the secret scan first ran in CI after a person pushed. The Security Scan job passed. | `evidence/run-2026-09-27/tooling-and-security.md`; Security Scan check on `2c19c5d` | The secret scan runs after the commit has left the machine. A pre-commit scan is a gap to name. |
| F8  | 7.4 | No frontend mutation baseline existed before the feature, so there was nothing to compare with. The backend baseline (12.37%) is a different scope. Recorded as an approved exception. | `baseline.md`, `evidence/run-2026-09-27/mutation-proposal.md`, `decisions.md` 30 Sep | New code has no baseline by definition. The paper describes the seeded-fault check as the usable test for a new feature. |
| F9  | 7.3, 7.4 | The first review agent found one Medium gap: the list test had one document and did not assert order, storage failure or the 1000-character boundary. Tests were added and the detected-mutant figure went from 63.64% (56 of 88) to 73.86% (65 of 88). | `evidence/run-2026-09-27/adversarial-review.md`, `mutation/gap-analysis.md`, `mutation/revised-gap-analysis.md` | First-party evidence that a separate review pass finds test gaps the author agent left. This is the worked example for 7.3. |
| F10 | 7.3 | The first reviewer had been told which faults were seeded, so it was not blind. A second "fresh" reviewer was independent only in that it had a separate context. It identified itself as OpenAI Codex inside a Copilot session. | `evidence/run-2026-09-27/adversarial-review-fresh.md`, `pr-evidence.md` | "Independent review" has to say independent of what: the author's context, the model, or the person. Agent review does not replace the human approver. |
| F11 | 8.1, 8.3 | The Firebase CLI stopped with a 403 for the service account. The rules were deployed through the Rules API instead. Creating the index returned 403, and a person created it in the console on 2 Oct. | `evidence/run-2026-09-27/deployment.md`, `integration-results.md` | The agent reached a permission boundary and a person crossed it. Also a pipeline gap: the deploy workflow triggers on rules changes only (governance and token model, open items). |
| F12 | 7.2 | Three acceptance criteria rest partly on mocked tests because there is no safe way to test them live: direct-ID access, unauthenticated Server Action calls, and a forced storage failure. | `evidence/run-2026-09-27/ac-matrix.md` | The feature brief asks for a deployed smoke test per criterion. The paper should say which evidence is mocked and which is live. |
| F13 | 8.1 | No preview URL or deployed commit is recorded. When read on 2 Oct, GitHub showed no commit status, no deployment and no Vercel comment for PR #63, although previews were posted on PRs #9, #14 and #43. | `evidence/run-2026-09-27/gates.md`; GitHub statuses, deployments and comments for `2c19c5d`; `docs/governance-verification-results.md` test 3 | Stage 8 has not been reached. ADR-002 says that if the run cannot reach a verified deployment by the end of Sprint 2, stage 8 drops to "named, not specified". That trigger is live. |
| F14 | 6.4, 7.5 | The dependency audit went from 0 high and 0 critical on 22 Sep to 1 critical and 8 high on 2 Oct. Commit `2c19c5d` in the same pull request bumps Next to 16.3.6 and adds seven overrides. Issue #57 excludes dependency upgrades. `tooling-and-security.md` at that same commit still says "No upgrades, overrides, or remediations were applied" and that each needs human approval. `decisions.md` has no row after 30 Sep. | `baseline.md`, `evidence/run-2026-09-27/tooling-and-security.md`, `decisions.md`, commit `2c19c5d` | The scope gate and the security gate pulled against each other, and the evidence fell behind the code inside one pull request. It is also a two-purpose pull request, the failure the code generation module warns about. |
| F15 | 6.3 | PR #63 changes 68 files. 43 are evidence files (3,221 lines). The feature is 9 source files (216 lines) and 2 test files (191 lines). | `git diff --numstat origin/main...2c19c5d` | The gated lane's cost showed up as documentation. A reviewer has 68 files to open to find the 11 source and test files. Say where evidence should live so it does not sit in the feature diff. |
| F16 | 6.4 | All seven checks on the head commit passed. No review had been submitted when read on 2 Oct. | GitHub check runs and reviews for PR #63 | The two-approval rule is about to be exercised on an agent-written feature. |
| F17 | 6.2 | The push hook has a passing contract test in CI. Nothing records it firing during the run. | `hook-contract` check on `2c19c5d` | A hook that never fired is not evidence it held. Record a denial when one happens. |
| F18 | n/a | The runbook lists six corrections to the capture recipe from the success metrics file, among them: AI Credits and not premium requests, two unsupported `gh` fields, which CI run counts as first-pass, and no `mutationScore` field. | `runbook.md`, last section | Fixes owed to `docs/research/success-metrics-stages-5-8.md` section 9. Owner Zac. |

What went well, so the log is not read as a list of failures: the plan gate held (plan first, then a recorded approval), the hand-written decisions log exists, all six acceptance criteria have a line of evidence each, the two seeded faults were caught, and the feature commit carries an agent trailer without anyone enforcing it.

---

## 7. White paper section structure

A structure to write into, not prose. Scope follows ADR-002: stages 6 and 7 in full, stages 5 and 8 to their handoffs, stages 1 to 4 assumed. The reader is a junior developer first (17 Sep client meeting), and the brief asks for "an operational manual", so each part of 5 to 8 below uses the same five headings per task: steps, gate and holder, failure mode, worked example, how you know it worked.

Owners are my proposal, based on who wrote the source. State is one of: **ready** (the material exists), **needs a decision** (named), **blocked** (named).

### Part 1. Why this manual exists
- **Goes in it:** the problem in one page. People have the tools and the team has no shared practice. Who it is for and what it does not cover.
- **Feeds from:** `docs/PROJECT-LOG.md` sections 1 and 5 (O-001 to O-004), D3 sections 2 and 11, ADR-002.
- **Owner (proposed):** Sidney. **State:** ready.

### Part 2. The lifecycle and the entry gate
- **Goes in it:** the eight stages as a map, colour on the task, and the four "handled well means" statements that work must meet before stage 5.
- **Feeds from:** `docs/reports/D4-lifecycle-map.html`, ADR-002 "Stages assumed".
- **Owner (proposed):** Zac. **State:** ready. ADR-002 is still "Proposed"; the stage 1 stand-in has a placeholder date.

### Part 3. How to read a gate
- **Goes in it:** the holder labels, with one example of each from this repository. The rule that instructions, prompts, skills and summaries hold nothing. Agent hooks fail open.
- **Feeds from:** section 4 of this report, `docs/research/claude-copilot-mechanism-map.md`, D1 section 3, the legend in `docs/modules/git-commits.md`.
- **Owner (proposed):** Zac. **State:** needs a decision (C7).

### Part 4. One feature, start to finish
- **Goes in it:** the fault report as the running example. One page that walks issue #57 to PR #63 and names each gate it met. Every later part points back to it.
- **Feeds from:** `docs/research/fault-reporting/feature-brief.md`, the run evidence, the worked example in `docs/modules/git-commits.md`.
- **Owner (proposed):** Zafir. **State:** blocked on the run being accepted (Chirag's review, F13).

### Part 5. Stage 5 to the handoff: the agent-ready issue
- **Goes in it:** tasks 5.1 and 5.3. The six readiness items, what is handed to Copilot, the approved plan.
- **Feeds from:** code generation ("Issue readiness", "What is handed to Copilot", "Handoff rule"), prompt practice ("Written"), success metrics section 3.
- **Owner (proposed):** Chirag. **State:** needs a decision (C5). Add F3 and F5 to the readiness list.

### Part 6. Stage 6: development and build
- **6a. Prompts, instructions and skills.** Feeds from prompt practice. Missing a failure mode.
- **6b. Handing work to Copilot and what comes back.** Tasks 6.1, 6.5. Feeds from code generation (examples, output). Needs the lane question (C6).
- **6c. Commits, branches, the pull request, the merge.** Tasks 6.2, 6.3. Feeds from git commits, including the four copy-and-paste proposals.
- **6d. Reviewing an agent's diff.** Task 6.4. Feeds from code generation ("Human review gate", "Failure mode"). The worked example is Chirag's review of PR #63 when it exists.
- **How you know it worked:** success metrics section 4.
- **Owner (proposed):** Chirag for 6a, 6b, 6d; Zac for 6c. **State:** ready except C6, and PR #59 is not merged.

### Part 7. Stage 7: testing and QA
- **7a. The verification problem.** Feeds from testing.
- **7b. What runs and what it holds.** Task 7.2, 7.5. Feeds from testing (inventory, Gitleaks pass and fail), corrected for C2 and C4.
- **7c. Writing the tests.** Task 7.1. **No module text.**
- **7d. A second agent reviews.** Task 7.3. **No module text.** F9 and F10 are the material.
- **7e. Judging whether the tests are correct.** Task 7.4. Feeds from testing (mutation), F8, F9, and commands to run Stryker, which no module has.
- **How you know it worked:** success metrics section 5.
- **Owner (proposed):** Chirag, with Zafir for 7c to 7e. **State:** the thinnest full-depth part. Leon asked on 11 Sep for ten to fifteen points per stage; stage 7 has three of five tasks written. Needs a decision (C3).

### Part 8. Stage 8 to the handoff: merge to a verified deployment
- **Goes in it:** tasks 8.1 and 8.3, and how a deployment is rolled back.
- **Feeds from:** slice 2 module 6, `docs/governance-verification-results.md` test 3, F11, F13.
- **Owner (proposed):** not assigned. ADR-002 schedules the infrastructure specification for Sprint 3. **State:** blocked. No module, and the run has not deployed (F13).

### Part 9. Accountability and provenance
- **Goes in it:** the four names, the trailer, the AI declaration, the register. A summary that points to the governance and token model, which is its own deliverable.
- **Feeds from:** `docs/reports/governance-and-token-model.md` and `docs/AI-register.md` (PR #58), testing ("Accountability Chain"), git commits ("Provenance").
- **Owner (proposed):** Sidney. **State:** ready once PR #58 merges (C9, C11).

### Part 10. How you know it worked, and what it cost
- **Goes in it:** one table per stage: the criterion, the benchmark, the usual failure, the cost. Then the numbers from the run.
- **Feeds from:** `docs/research/success-metrics-stages-5-8.md`, `credit-log.md`.
- **Owner (proposed):** Zac. **State:** blocked on F2. The run has pass and fail results and no cost or time numbers.

### Part 11. What happened when we ran it
- **Goes in it:** the friction log, and the team's own observations O-001 to O-009.
- **Feeds from:** section 6 of this report, `docs/PROJECT-LOG.md` section 5.
- **Owner (proposed):** Zafir and Zac. **State:** ready as a draft; Zafir to confirm.

### Part 12. Using a different tool
- **Goes in it:** the Claude Code equivalent of each Copilot mechanism, and the controls that need Copilot Business or Enterprise.
- **Feeds from:** `docs/research/claude-copilot-mechanism-map.md`, the last table in `docs/modules/git-commits.md`.
- **Owner (proposed):** Chirag. **State:** ready.

### Part 13. Limits and open questions
- **Goes in it:** what was documented and not run (cloud agent, Copilot Spaces, enterprise controls), what was run once, and the open questions in section 8.
- **Owner (proposed):** Sidney. **State:** ready.

### Appendices
- **A. Copy and paste:** the commit-msg check, the Copilot hook, `.vscode/settings.json`, the CI attribution job (git commits P1 to P4), the prompt file, the skill, the pull request template, the planning prompt.
- **B. Evidence index:** each claim in parts 5 to 8 against the file, pull request or commit that shows it.
- **C. Sources.** **D. Glossary** (section 4 of this report).

---

## 8. Open questions

| #   | Question | Owner | Blocks |
| --- | -------- | ----- | ------ |
| OQ1 | Which Copilot client and version ran FR-01? (C6) | Zafir | Parts 4, 6b |
| OQ2 | Does the team adopt "Platform rule" and the two hook layers as labels? (C7) | Zac proposes, team agrees | Part 3 |
| OQ3 | Do the four advisory CI jobs become required on `main`? (C2) | Chirag | Parts 6c, 7b |
| OQ4 | Does the white paper recommend a numeric mutation floor, or seeded faults plus a human judgement? (C3) | Chirag, Zafir | Part 7e |
| OQ5 | Is the approved plan part of stage 5 or task 6.1? (C5) | Sidney | Parts 5, 6b |
| OQ6 | Which Claude Code hooks are ported to Copilot? (C4) | Chirag | Part 7b |
| OQ7 | Who writes 7.1 and 7.3, which have no module? | Team | Part 7 |
| OQ8 | Stage 8: is the ADR-002 trigger met (no verified deployment by the end of Sprint 2), and who owns the part? (F13) | Sidney | Part 8 |
| OQ9 | The live ruleset has `require_extra_approval_for_unattributed_changes: true`. No team document mentions it. What does it do, and was it set on purpose? | Chirag | Part 9 |
| OQ10 | Was the dependency commit `2c19c5d` approved, and should it be its own pull request? (F14) | Zafir | Part 4 |
| OQ11 | Can AI Credits and stage times be recovered for FR-01, or does a second run have to capture them? (F2) | Zafir | Part 10 |

---

## 9. What this report does not claim

- It does not say the proof of concept passed. The run's own records say acceptance is pending.
- The friction log is my reading of Zafir's files. He has not confirmed it.
- No module was edited. Section 5 is a list of requests.
- The Copilot cloud agent, Copilot Spaces and the enterprise controls were not run by anyone on the team.
- Owners in sections 7 and 8 are proposals.

---

## 10. Card checklist

| Item | State |
| ---- | ----- |
| All four incorporated: testing, prompt practice, code generation, git commits | Done (section 2). Git commits read from PR #59, not `main` |
| Every contradiction resolved or recorded as an open question | Done (sections 3 and 8) |
| Terminology consistent, with Copilot as the example tool | Proposed (section 4). The modules change when their authors make the section 5 edits |
| Proof-of-concept friction log incorporated | Done as a derived log (section 6). Not confirmed by Zafir |
| White paper section structure drafted | Done (section 7) |
| Committed to `docs/reports/` | This file |
| Master doc updated | Separate step |
