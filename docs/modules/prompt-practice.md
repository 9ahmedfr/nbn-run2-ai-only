# Prompt Practice

## Worked Example

A developer asks GitHub Copilot to review a code change for bugs, missing tests and unnecessary changes.

The prompt works well, so the developer uses it again on several other tasks. Instead of leaving it only in their personal Copilot chat, they save it in the repository as:

`.github/prompts/example-review.prompt.md`

Because the prompt is now stored in Git, other team members can review it, suggest improvements and reuse the same prompt.

If the team later turns that prompt into a repeatable process with several steps, such as checking acceptance criteria, running tests, running lint and reporting the results, it can be promoted to a reusable skill under:

`.github/skills/<skill-name>/SKILL.md`

The important point is that useful Copilot knowledge moves from one person's chat into a reviewed, versioned and reusable team resource.

## Prompt Lifecycle

Any useful prompt identified by a team member should not only remain in the developer's chat history, but it should be moved through the four stages: written, stored, versioned and shared.

### Written

The prompt should be written clearly. It should clearly define the task, the relevant context, the expected outcome, and acceptance criteria and what is out of scope. This reduces ambiguity and helps prevent the AI from making changes that are irrelevant and unnecessary to the task.

### Stored

If a prompt is useful beyond a one-off conversation, it should be stored as a file in the repository rather than being left on someone's personal copilot chat history. The exact repository location should follow the team's agreed prompt-storage convention.

### Versioned

Once stored in the repository, the prompt is versioned through Git like an other project files, where the changes to the prompt can be reviewed, compared, reverted, and traced through commits and pull requests.

### Shared

After a prompt has been tested and reviewed, it can be made available to other developers instead of remaining personal knowledge. Repository-level prompts allow the team to reuse the same guidance, while more mature shared practices can later be distributed more broadly through GitHub Copilot.


## Where the Prompts are stored in the Repository

Prompt-related knowledge is stored as files in the repository rather than being left only in personal Copilot chats.

This repository demonstrates the agreed copilot storage structure using real files:

- Reusable task prompts are stored as `.github/prompts/<name>.prompt.md`.
- Repository-wide Copilot guidance is stored in `.github/copilot-instructions.md`.
- Repeated multi-step procedures that become skills are stored as `.github/skills/<skill-name>/SKILL.md`.

These files are committed to the repository, so they can be reviewed, versioned and reused by the team.

## When a prompt becomes a skill

A prompt should remain a reusable prompt when it mainly saves a request when trying to complete a specific task.

However, a prompt should become a skill when the team repeatedly uses the same multi-step procedure and wants Copilot to follow that process consistently.

A reusable prompt should be considered for a skill when it meets all of the following conditions:
1. **Repeated use:** The prompt has been used successfully for at least three separate tasks.
2. **Team reuse:** At least two different team members could reasonably use the same procedure.
3. **Multi-step process:** the procedure contains at least three repeatable steps that should normally be performed in the same order.
4. **Stable instructions:** the core procedure has worked for at least two consecutive uses without requiring major changes.
5. **Human review:** A team member reviews the procedure before it is added to `.github/skills/`.

If these conditions are not met, the procedure should remain as a reusable prompt in the `.github/prompts/` while it continues to be tested.

### Example

If `example-review.prompt.md` is used once to review a pull request, it remains a reusable prompt.

If the team repeatedly uses a verification process that always involves:

1. checking the acceptance criteria
2. running the relevant tests
3. running lint and type checking
4. identifying failures
5. reporting the results

and the process satisfies the criteria above, it can be promoted to a reusable skill such as `.github/skills/verify-change/SKILL.md`.

## Sharing Copilot prompts

Reusable Copilot knowledge should move through three levels of sharing.

### 1. Personal experimentation

A developer can first test and refine a prompt privately in Copilot Chat.

At this stage:
- the prompt may still be experimental;
- it does not need to be shared with the team;
- it should not be treated as an agreed team procedure.

### 2. Repository sharing

Once the prompt is useful and repeatable, it should be moved into the repository.

Depending on its purpose, it is stored as:

- `.github/prompts/<name>.prompt.md` for reusable prompts;
- `.github/copilot-instructions.md` for repository-wide instructions;
- `.github/skills/<skill-name>/SKILL.md` for reusable multi-step procedures.

The file then goes through Git and pull-request review so the team can inspect and version the change.

### 3. Shared Copilot Space

If the guidance is useful beyond a single repository or needs to be shared with a wider group, it can be added to a shared GitHub Copilot Space.

The Space can contain relevant repository files, documentation, issues and other context so team members can use Copilot with the same shared knowledge.

Only reviewed and stable material should be promoted from the repository into a shared Space.


## Human review gate

Before a new or changed prompt, instruction or a skill is accepted as shared team guidance, it must be reviewed by another team member.

The reviewer checks that:
1. **Purpose is clear:** the file clearly states copilot is expected to do.
2. **Scope is bounded:** the instructions state relevant limits and do not encourage unrelated changes.
3. **Expected outcome is defined:** the result produced by copilot is understandable and testable where possible.
4. **No sensitive information is included:** the prompts contain no credentials, secrets or inappropriate project data.
5. **Repository conventions are followed:** the file is stored in the agreed location and follows the expected structure.
6. **The correct artifact type is used:** a simple reusable request remains a prompt, while a skill satisfies the team's skill-promotion criteria.
7. **The example has been tested:** the author has successfully used the prompt or procedure before proposing it as shared guidance.

If any of these checks fail, the reviewer requests changes before the prompt is accepted into the shared set.

**Gate: Human**