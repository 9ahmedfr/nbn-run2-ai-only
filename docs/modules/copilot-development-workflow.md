# Copilot Development Workflow

## Worked example

A developer is asked to add fault reporting to the application.

Before Copilot is involved, the team completes the GitHub issue. The issue explains what the feature should do, what is in and out of scope, and the acceptance criteria that define when the work is complete. The supporting fault-reporting brief is stored in the repository so that the requirements are shared and versioned rather than existing only in someone's chat history.

A human checks that the task is ready and then hands it to Copilot.

Copilot reads the issue, the acceptance criteria and the relevant repository context. It implements the requested change and returns a reviewable set of code changes.

The developer or reviewer does not accept the implementation simply because Copilot says it is finished. They inspect the diff, check that it follows the repository's existing patterns, confirm that it stayed within scope, compare the implementation with each acceptance criterion, inspect the tests and security-sensitive behaviour, and review the results of the automated checks.

If the implementation does not satisfy those checks, it is revised. Only after the automated checks pass and a human is satisfied with the actual change should it proceed towards merge.

The detailed sections below show how each part of this workflow is performed with GitHub Copilot.

## Issue readiness before assigning to Copilot

A GitHub issue must be complete before it is assigned to Copilot. Assigning an incomplete issue transfers ambiguity to the agent and increases the chance of scope creep, incorrect assumptions and unnecessary changes.

Before assignment, a human confirms that the issue contains or references:

1. **Task definition**: what change is required and why.
2. **Acceptance criteria**: observable conditions that define when the task is complete.
3. **Scope**: the parts of the system that may need to change.
4. **Exclusions**: functionality or files that are explicitly outside the task.
5. **Repository context**: relevant specifications, architecture documents or other repository files needed to understand the task.
6. **Dependencies and constraints**: existing functionality, security requirements or other conditions that affect implementation.

If any required information is missing or still awaiting a decision, the issue should remain with a human rather than being assigned to Copilot.

**Gate mechanism: Human.** A person decides whether the issue is sufficiently complete to delegate. Repository instructions can tell Copilot how to behave after assignment, but they cannot determine whether the original requirements are correct or complete.

## What is handed to Copilot

Before Copilot begins implementation, it should receive a complete task package rather than only a short coding request. The handoff consists of the issue, its acceptance criteria, and the repository context needed to implement the change correctly.

### Issue

The GitHub issue is the main task definition. It should describe the requested change, why it is needed, and the boundaries of the work.

For the Copilot cloud agent, the issue is handed over directly by assigning Copilot to the GitHub issue. The issue itself becomes part of the agent's task context.

For Copilot Agent mode in VS Code, the issue can be added explicitly as context by clicking the **+ (Add Context)** button and selecting **Issue**, by pasting the issue URL directly into the prompt, or by referring to the issue from the agent session.

### Acceptance criteria

The acceptance criteria define what must be true for the implementation to be considered complete.

If the criteria are contained in the GitHub issue, Copilot receives them with the issue. If the criteria are stored separately in the repository, the issue or prompt should reference the exact repository path rather than relying on Copilot to discover them.

For example:

`docs/research/fault-reporting/feature-brief.md`

This repository already uses that file to record the fault-reporting user story, acceptance criteria, exclusions and proposed scope.

### Repository context

Repository context explains how the change must fit into the existing project.

Repository-wide Copilot guidance is stored in:

`.github/copilot-instructions.md`

Copilot uses these instructions as repository-level guidance when working in the project.

Task-specific context should be referenced explicitly where possible. Relevant specifications, architecture documents, existing implementations or other source files should be named by path rather than copied into an ad-hoc chat prompt.

In VS Code Agent mode, important files can also be attached directly as context using the context picker or file references.

### Handoff rule

The handoff should identify:

- the GitHub issue that defines the task
- the acceptance criteria that define what "done" means
- the repository files that provide implementation context
- any explicit scope or exclusions that prevent unrelated changes

The agent should not be expected to infer missing requirements. If important information is not written in the issue or referenced repository context, the task is not ready to be delegated.


## Copilot workflow examples

The same development task can be handed to Copilot in different ways. The following examples use the fault-reporting feature to show the difference between Copilot cloud agent and Copilot Agent mode in VS Code.

### Example 1: Copilot cloud agent

A complete GitHub issue exists for the fault-reporting feature. The issue contains the task description and acceptance criteria and references:

`docs/research/fault-reporting/feature-brief.md`

The developer opens the issue on GitHub and assigns it to Copilot.

Copilot receives the issue title, description and comments as task context and can also use the repository's `.github/copilot-instructions.md` and referenced repository files while working.

Assigning the issue to Copilot cloud agent starts the task and creates a pull request. Copilot works on its own branch and updates the pull request with its implementation.

When Copilot finishes, the human reviews the pull request rather than accepting the agent's completion message as evidence. The reviewer checks the diff against the issue and acceptance criteria, reviews the tests and automated checks, and either requests further changes or approves the implementation.

The flow is therefore:

`Complete issue → Assign to Copilot → Copilot branch and PR → Human reviews diff → Revise or approve`

For issue assignment, the pull request is created automatically. There is not a mandatory GitHub approval step between assigning the issue and Copilot beginning the task. Any instruction asking Copilot to produce a plan first helps shape its behaviour, but should not be treated as a mechanically enforced pre-implementation gate.

### Example 2: Copilot Agent mode in VS Code

The developer opens the repository in VS Code and starts Copilot in Agent mode.

Using the **+ (Add Context)** button, the developer attaches the GitHub issue and, where useful, explicitly references:

`docs/research/fault-reporting/feature-brief.md`

The developer can then ask:

> Read the attached issue and the fault-reporting feature brief. Map every acceptance criterion to an implementation step, proposed files and a test. Produce the plan before changing feature code.

The developer reviews the proposed plan and redirects it if necessary.

After the plan is accepted, the developer asks Copilot to implement it. Agent mode can inspect repository files, edit the implementation and run relevant commands and tests.

The resulting changes remain reviewable through the VS Code diff and Source Control views. The developer inspects the changed files using the same human review gate defined in this module.

If the implementation is accepted, the developer commits the changes to the feature branch, pushes the branch and opens a pull request through the repository's normal Git workflow.

The flow is therefore:

`Complete issue → Add issue as Agent context → Review plan → Agent changes workspace → Human reviews diff → Commit and PR`


## The output recieved from Copilot

The result of handing a development task to Copilot should be an inspectable code change rather than only a conversational answer. The exact form of the result depends on whether the Copilot cloud agent or Copilot Agent mode in VS Code is used.

### Copilot cloud agent

When Copilot is assigned a GitHub issue, it works on the task in its own development environment and produces the implementation on a branch.

For an issue assigned directly to Copilot, the main output is a GitHub pull request. Copilot pushes its implementation changes as commits and requests human review when it has finished.

The reviewer then receives:

- a pull request linked to the task
- the files added, changed or deleted in the PR diff
- the commits produced by Copilot
- the results of any tests or validation Copilot performed
- the Copilot agent session log showing how the task was carried out

The pull request is the reviewable artifact. The conversational output from the agent can help explain the implementation, but it does not replace reviewing the actual diff.

### Copilot Agent mode in VS Code

In VS Code Agent mode, Copilot makes changes in the developer's workspace or isolated worktree rather than automatically handing back a completed GitHub pull request.

After the agent performs the task, the developer can inspect the files that were added, modified or deleted and review the resulting diffs in VS Code.

The developer therefore receives:

- changed, added or deleted workspace files
- a diff showing the exact code changes
- the agent's explanation or summary of the work
- terminal output from commands the agent ran
- results from tests, linting or other validation performed during the session

These changes remain part of the development workspace until the developer reviews them and decides whether they should proceed through the normal Git workflow.

If the changes are accepted, they can then be committed, pushed to the feature branch and submitted through a pull request.

### Output rule

Regardless of which Copilot mode is used, the implementation itself is the artifact that must be reviewed.

A statement from Copilot that the task is complete, that tests pass, or that the acceptance criteria have been satisfied is not sufficient evidence on its own. The reviewer should inspect the resulting diff and the relevant validation evidence before accepting the change.


## Human review gate

An agent-authored change must be reviewed by a human before it is accepted. The reviewer should inspect the actual diff rather than relying on Copilot's summary of what it changed.

The review should be performed in the following order:

1. **Check repository conventions**

   Confirm that the implementation follows the patterns already used in the repository. This includes architecture, file locations, naming, validation, authentication, imports and other project conventions.

   An implementation can work technically while still being the wrong implementation for this codebase.

2. **Check scope**

   Confirm that the diff represents one logical change and stays within the issue's requested scope.

   Look for unrelated refactoring, dependency changes, formatting changes or additional functionality that was not required by the issue.

3. **Check related documentation and configuration**

   Check whether the implementation changed behaviour that also requires updates to documentation, configuration, schemas, rules or other repository artifacts.

   The code and the repository context should remain consistent after the change.

4. **Check correctness against the acceptance criteria**

   Compare the implementation directly with each acceptance criterion from the issue.

   The reviewer should verify that every required behaviour is implemented and that the agent has not silently changed or omitted a requirement.

5. **Check the tests**

   Confirm that tests exist for the required behaviour and that they test meaningful outcomes rather than merely reproducing the implementation.

   A passing test suite is evidence, but it does not by itself prove that the tests are adequate.

6. **Check security and failure paths**

   Inspect authentication, authorization, input validation, error handling, secrets and other security-sensitive behaviour relevant to the change.

   Pay particular attention to negative cases such as unauthorised access, invalid input and failed operations.

7. **Check the validation evidence**

   Review the results of the repository's automated checks, such as linting, type checking, unit tests, security scanning and other CI checks.

   Copilot stating that a check passed is not enough. The reviewer should use the actual tool or CI result as the evidence.

After these checks are complete, only then the reviewer should approve the change.

**Gate mechanism: Human.** Automated hooks and CI checks can reject known violations, but they cannot approve whether the implementation is appropriate, complete and correct for the intended requirement.

## Failure mode

The main failure mode is **rubber-stamping an agent-authored change**.

Copilot can produce a plausible implementation, a convincing explanation and passing automated checks. This can encourage a reviewer to trust the agent's summary or the green CI result instead of examining whether the diff actually satisfies the issue and fits the repository.

The evidence already recorded in this repository shows why this is a risk.

The research in `docs/research/slice2-build-modules.md` records the METR finding that experienced developers believed AI assistance made them approximately 20% faster while they were actually measured as approximately 19% slower. The gap between perceived and measured performance shows that confidence in AI assistance does not necessarily reflect its actual result.

The same research also records that agent-authored pull requests were more likely to contain multiple objectives than comparable human pull requests (40.0% compared with 12.2%). Large or complex pull requests were also recorded as a reason for rejection. This means an agent-generated change may appear complete while containing additional scope that makes effective human review harder.

For this workflow, the defence is therefore not to accept Copilot's description of the change as proof that the task is complete. The reviewer must inspect the diff against the issue, acceptance criteria and repository conventions using the ordered human review gate above.

A passing CI result is supporting evidence, not approval of the change.

## Gate mechanisms

Each gate in this workflow is labelled by the mechanism that actually holds it.

| Gate | Mechanism | What holds the gate |
|---|---|---|
| Task is ready to be delegated to Copilot | **Human** | A person confirms that the issue, acceptance criteria, context and scope are complete before the task is handed to the agent. |
| Repository rules checked during development | **Hook** | Deterministic repository hooks can block known violations when the relevant action occurs. |
| Automated verification before merge | **CI check** | GitHub Actions runs the repository's linting, type checking, tests and security checks and reports whether they pass. |
| Agent-authored change accepted | **Human** | A human reviewer inspects the diff and decides whether the implementation is correct, appropriately scoped and suitable to merge. |

Repository instructions, prompt files, skills, custom agents and Copilot's own summaries can guide how work is performed, but they do not themselves hold a gate. A gate is only treated as enforced when it is held by a hook, a CI check or a human decision.
