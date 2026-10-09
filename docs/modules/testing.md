# AI Testing and Verification


## Verification Problem
The verification problem arises when an AI agent writes both the implementation and the tests used to verify it. This is a trap because a passing test suite is not independent verification when the agent has effectively written both sides of the exam. The tests may pass while still failing to detect real defects in the code.

## Harness Inventory

| Harness                                     | Classification | Reasoning                                                                                                        |
| ------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| Placeholder validation                      | Hook           | Runs automatically during pre-commit and checks staged work for unreplaced placeholders.                         |
| Prettier formatting                         | Hook           | Runs automatically during the pre-commit lifecycle on staged files.                                              |
| Frontend ESLint                             | Hook           | Runs automatically on staged frontend TypeScript files before commit.                                            |
| Backend ESLint                              | Hook           | Runs automatically on staged backend TypeScript files before commit.                                             |
| Conventional Commit validation              | Hook           | Runs during `commit-msg` and rejects incorrectly formatted commit messages.                                      |
| Claude `permissions.deny` rules             | Hook           | Deterministically prevent Claude from executing specified dangerous commands or reading protected file patterns. |
| Block `any` usage                           | Hook           | Runs after Claude edits/writes TypeScript and blocks forbidden `any` patterns.                                   |
| Block public server secrets                 | Hook           | Runs after edits and blocks `NEXT_PUBLIC_` exposure of server-only secrets.                                      |
| Block environment-specific `.env` files     | Hook           | Prevents Claude from creating certain committed environment files.                                               |
| Block `use client` in Firebase admin module | Hook           | Enforces that server-only Firebase admin code remains server-side.                                               |
| Block deep relative imports                 | Hook           | Enforces the project's frontend import convention.                                                               |
| Frontend typecheck after Claude edit        | Hook           | Automatically typechecks frontend source changes made by Claude.                                                 |
| Backend typecheck after Claude edit         | Hook           | Automatically typechecks backend source changes made by Claude.                                                  |
| Block direct push to `main`                 | Hook           | Runs before Claude executes Bash and blocks direct pushes to `main`.                                             |
| Block Firebase deploy without approval      | Hook           | Prevents Claude from deploying to production automatically.                                                      |
| Block force push / `--no-verify`            | Hook           | Prevents bypassing repository safeguards.                                                                        |
| CI placeholder validation                   | CI check       | Runs `pnpm run validate` in GitHub Actions.                                                                      |
| CI lint                                     | CI check       | Runs repository linting independently in GitHub Actions.                                                         |
| CI typecheck                                | CI check       | Runs the TypeScript checks in GitHub Actions.                                                                    |
| Frontend tests                              | CI check       | Executes the frontend component/unit tests on PRs and pushes to `main`.                                          |
| Backend tests                               | CI check       | Executes backend unit tests.                                                                                     |
| Gitleaks secret scan                        | CI check       | Scans repository history/content for likely leaked credentials.                                                  |
| Dependency vulnerability audit              | CI check       | Runs `pnpm audit --audit-level=high`.                                                                            |
| Manual smoke test                           | Human          | Requires a person to exercise the change against a development Firebase project.                                 |
| Test adequacy / reviewer judgement          | Human          | A human decides whether the tests actually cover the intended behaviour and are trustworthy.                     |

Hooks and CI checks provide automated, repeatable checks against predefined rules. Hooks run at specific points in the local or agent workflow, while CI checks run in the repository's GitHub Actions pipeline. These automated checks can identify rule violations, test failures, type errors, exposed secrets and other predefined problems, but they cannot independently judge whether the implementation or its tests are suitable for the intended requirements. Therefore, human judgement is required to assess test adequacy, correctness and whether the change actually satisfies its intended purpose.


## Mutation Testing

Mutation testing is the operational answer to the question, "Are the tests correct?" A passing test suite only shows that the implementation satisfies the tests that were written. It does not prove that those tests are capable of detecting real defects in the code.

Therefore, mutation testing checks the quality of a test suite by deliberately making small changes, called mutants, to the implementation and then running the tests again. For example, a comparison operator could be changed or a return value could be altered.

If the tests fail after the change, the mutant is considered killed, which provides evidence that the tests detected the introduced fault. If the tests still pass, it means that the mutant survives, indicating that the test suite may not adequately detect that type of defect.

The mutation score measures the proportion of mutants that are killed by the test suite. A higher score generally indicates that the tests are better at detecting faults, while surviving mutants highlight areas where the test suite may be weak.

For AI-generated tests, the mutation score should be recorded before a human modifies the generated tests so that the original quality of the AI-generated test suite can be measured. A minimum acceptable mutation-score threshold is required before mutation testing can be used as a gate. The repository does not currently define a numerical threshold, so this must be agreed by the team before the gate is introduced.

## Accountability Chain

AI-assisted work should have a clear accountability chain so that responsibility does not become unclear when an agent contributes to a change and issues are discovered later.

The accountability chain consists of four roles:

1. **Committer**: the human who commits the change and is the author of record in Git.

2. **Agent co-author**: the AI agent that contributed to producing the change, recorded through provenance such as a co-author trailer.

3. **Non-requesting approver**: a human reviewer who did not request the AI-assisted change and independently approves it before merge.

4. **Accountable owner**: the person recorded in the governance register who remains responsible for the AI use and its outcomes beyond the individual commit or merge.

Together, these roles make it clear who created the change, where AI was involved, who independently approved it, and who remains accountable for the use of AI after the change is merged. This ensures that responsibility for a change is clearly defined if issues are later discovered in the code.

### Current Repository Coverage

| Accountability role | Status | Current repository evidence |
|---|---|---|
| Committer | Captured | Git records the human author/committer as part of the commit history. |
| Agent co-author | Not captured | GitHub supports co-author trailers, but the repository does not currently record AI contributions using `Co-Authored-By` trailers. |
| Non-requesting approver | Partially captured | GitHub records the human who approves a pull request, but it does not record whether that reviewer was the person who originally requested the AI-assisted change. |
| Accountable owner | Not captured | There is currently no implemented governance register that assigns an accountable owner to each AI use. |


## Gitleaks CI Verification

The repository uses `gitleaks/gitleaks-action@v3` as part of the Security Scan CI job. The action was verified through the CI run for PR #31.

During the run, GitHub successfully resolved and downloaded `gitleaks/gitleaks-action@v3`. The action executed Gitleaks version 8.24.3, scanned five commits and completed successfully with no leaks detected.

This confirms that the configured Gitleaks action resolves correctly and that the secret-scanning job actually executes in the CI pipeline.

## Gitleaks Failure Verification

A synthetic AWS-style credential was committed to the temporary `feature/gitleaks-verification` branch and submitted through PR #38 to verify that the secret-scanning gate rejects committed credentials.

The Gitleaks Security Scan detected the credential in `gitleaks-test.txt` on line 2 and classified it under the `aws-access-token` rule. The scan reported one leak and the Security Scan job failed as expected.

The relevant Gitleaks output was:

```text
Finding:     ...aws_access_key_id = REDACTED
Secret:      REDACTED
RuleID:      aws-access-token
File:        gitleaks-test.txt
Line:        2

1 commits scanned.
leaks found: 1

🛑 Leaks detected, see job summary for details
```


This confirms that Gitleaks not only executes in the CI pipeline, but also detects a test credential and prevents the security check from passing.
