# Git Commits

How a change gets from a feature branch to `main` in this repository when GitHub Copilot is doing some of the work: the commands a developer runs, the gate at each step, what holds that gate, and what goes wrong when the gate is missing.

**Planner card:** [UX] - Module specification: git commits : 240
**Source modules:** D3 6.2 (how a commit is done), 6.3 (how branches become merges), 6.10 (provenance). Requirements US-11, US-12, US-05.
**Checked against:** `main` at `b62e009` and the live `main` ruleset, read from the GitHub API on 28 Sep 2026.

Every gate below carries one of the D1 section 3 labels:

- **Hook**: runs every time at a fixed trigger and blocks. It pattern-matches and understands nothing. There are two layers: git hooks (lefthook, run by git for everyone) and agent hooks (run by Copilot or Claude Code before a tool call).
- **CI check**: runs in GitHub Actions on the pull request. Only blocks the merge if the ruleset lists it as required.
- **Human**: a person makes a judgement.
- **No gate**: the rule is written down but nothing holds it. If the model ignores it, nothing happens.

---

## Worked example

Zafir is building the fault report (`docs/research/fault-reporting/feature-brief.md`) with GitHub Copilot in agent mode in VS Code.

1. He branches from `main`: `git checkout -b feature/fault-report`.
2. Copilot writes the lodge form and its Firestore rule. Zafir reads the diff and decides this is one change: "users can lodge a fault". The dashboard list is a second change and waits for its own commit.
3. Copilot proposes the message `add fault form`. Git refuses it: the commit-msg hook finds no type prefix and prints the format. Copilot tries again with `feat(fault-report): add lodge form and Firestore rule`. Accepted.
4. Copilot offers to push. The Copilot agent hook denies it: pushes stay with a person during the experiment. Zafir pushes himself and opens the pull request. The template asks him to tick the AI use declaration and fill in the confidence section.
5. CI runs. The `AI Declaration` job passes because he ticked one box, and the ruleset lists that job as required. Lint, typecheck, tests and the security scan also run.
6. Two teammates who did not write the change review it and approve. Zafir cannot approve his own pull request.
7. The only merge button the ruleset allows is **Squash and merge**. The branch's commits land on `main` as one commit, and any `Co-authored-by` trailers on those commits are carried into it (verified on PR #47, `docs/governance-verification-results.md` test 5).

Four gates held along the way: one git hook, one agent hook, one required CI check and two human approvals. The next sections show each one and what happens without it.

---

## The commands, branch to merge

Copilot in VS Code (agent mode) is the main path. Claude Code is listed where it differs.

| Step                     | What the developer runs                                                                                                       | Gate                                                                                                                                                                                       | Holder                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| 1. Branch                | `git checkout main && git pull` then `git checkout -b feature/fault-report`                                                   | Nothing stops work on `main` locally. The ruleset stops it reaching `main` on GitHub without a pull request.                                                                               | No gate locally                           |
| 2. Decide the boundary   | One logical change per commit. If the change needs "and" to describe it, split it.                                            | A person decides what one change is                                                                                                                                                        | Human                                     |
| 3. Stage                 | `git add -p` (review each hunk) or stage from the VS Code Source Control view                                                 | The developer reads what the agent changed before it is staged                                                                                                                             | Human                                     |
| 4. Pre-commit checks     | Runs automatically on `git commit`: placeholder check, Prettier, ESLint on staged frontend and backend files (`lefthook.yml`) | Commit blocked if placeholders remain or ESLint fails. Prettier cannot block (`\|\| true`).                                                                                                | Hook (git)                                |
| 5. Commit message        | `git commit -m "feat(fault-report): add lodge form and Firestore rule"`, or Copilot's sparkle button in Source Control        | Message must match `scripts/check-commit-msg.js`                                                                                                                                           | Hook (git)                                |
| 6. Agent attribution     | See "Provenance" below                                                                                                        | Nothing checks for a trailer                                                                                                                                                               | No gate                                   |
| 7. Push                  | `git push -u origin feature/fault-report` (a person runs this)                                                                | Copilot: `.github/hooks/fault-reporting.json` denies any `git ... push` by the agent. Claude Code: `.claude/settings.json` blocks `git push ... origin main`, `--force` and `--no-verify`. | Hook (agent)                              |
| 8. Open the pull request | `gh pr create --base main` or the GitHub web page; fill in the template                                                       | Template sections are prompts, not checks, except the AI declaration                                                                                                                       | Human                                     |
| 9. CI                    | Runs on the pull request: AI Declaration, Lint & Typecheck, Frontend Tests, Backend Unit Tests, Security Scan                 | Only **AI Declaration** is required by the ruleset. The others can fail and the merge button still works once approvals are in.                                                            | CI check (one required, four advisory)    |
| 10. Review               | Two approvals from people with write access                                                                                   | Ruleset: `required_approving_review_count: 2`. The author's own approval is never possible.                                                                                                | Human                                     |
| 11. Merge                | **Squash and merge**, with a Conventional Commits title for the squash commit                                                 | Ruleset allows squash only; force pushes and deleting `main` are blocked                                                                                                                   | CI check (ruleset) plus Human (the title) |

Two things in this table are not what `docs/GIT-WORKFLOW.md` says. It says CI must pass before merge; the ruleset requires only the AI Declaration job. It does not mention the two-approval rule. Both are recorded under "Gaps" below.

---

## The commit-msg hook, exactly

`lefthook.yml`:

```yaml
commit-msg:
  commands:
    conventional-commit:
      run: node scripts/check-commit-msg.js {1}
```

`scripts/check-commit-msg.js` tests the message against one pattern:

```
^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\(.+\))?: .{1,100}
```

The hook is installed by `pnpm install` (the root `prepare` script runs `lefthook install`). A clone that has not run `pnpm install` has no hook.

Run on 28 Sep 2026 against the script on `main` (`node scripts/check-commit-msg.js <file>`):

| Message                                                         | Result   | Right?                                                        |
| --------------------------------------------------------------- | -------- | ------------------------------------------------------------- |
| `add notes`                                                     | rejected | Yes                                                           |
| `feat: add notes`                                               | accepted | Yes                                                           |
| `feat(fault-report): add lodge form and Firestore rules`        | accepted | Yes                                                           |
| `Feat: add notes`                                               | rejected | Yes                                                           |
| `feat:add notes`                                                | rejected | Yes                                                           |
| `feat: stuff`                                                   | accepted | Format is fine; the content is a human problem                |
| `fix: ` followed by 150 characters                              | accepted | No. `.{1,100}` has no end anchor, so there is no length limit |
| `feat!: drop v1 fault schema`                                   | rejected | No. `!` marks a breaking change in Conventional Commits 1.0.0 |
| `Revert "feat: add notes"` (git's default from `git revert`)    | rejected | No. A developer has to rewrite the message to revert          |
| `Merge branch 'main' into feature/fault-report` (git's default) | rejected | No. git runs commit-msg on merge commits too                  |

A tested replacement is in "Proposals", P1.

---

## Provenance: who wrote the commit

What each tool puts on a commit today:

| Tool                                              | Author on the commit                                                                                                                                                            | Agent trailer                                                                                                                                          | Where it is set                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Copilot agent mode in VS Code (local)             | The developer                                                                                                                                                                   | None by default. VS Code can add `Co-authored-by: Copilot <copilot@github.com>`; the setting `git.addAICoAuthor` defaults to `off` since VS Code 1.119 | `.vscode/settings.json` (this repository has none)                      |
| Copilot cloud agent (assigned an issue on GitHub) | Copilot, with the person who started the task as co-author (GitHub docs, per `docs/ai-attribution-verification.md`; not live-tested, nobody on the team has cloud-agent access) | Recorded by GitHub                                                                                                                                     | GitHub                                                                  |
| Claude Code                                       | The developer                                                                                                                                                                   | `Co-Authored-By: Claude <model> <noreply@anthropic.com>` by default (verified, commit `20755e0`)                                                       | `attribution.commit` in `.claude/settings.json` (not set; default used) |

A squash merge keeps the trailers (PR #47). So the provenance on `main` is only as good as the provenance on the branch. With Copilot in VS Code at its default setting there is none, and nothing checks. Proposals P3 and P4 close that.

---

## Copilot pull request rules

These apply when **Copilot cloud agent** opens the pull request itself (source: GitHub Docs, "Reviewing a pull request created by Copilot", fetched 28 Sep 2026):

1. **The requester's approval does not count.** "If your repository requires pull request approvals, your approval of a Copilot pull request won't count toward the required number. Another reviewer must approve the pull request before it can be merged." With our ruleset, that means two people other than the one who asked Copilot. Holder: Human, enforced by GitHub.
2. **Workflows wait for a person.** "By default, GitHub Actions workflows will not run automatically when Copilot pushes changes to a pull request." Someone with write access clicks **Approve and run workflows** in the merge box, after checking whether Copilot changed anything under `.github/workflows/`. Until then the AI Declaration check has not run, so the merge stays blocked. Holder: Human.
3. **Changes go back through Copilot on the same branch.** Mention `@copilot` in a review comment, or push commits to the branch yourself. Each Copilot push waits for workflow approval again. Holder: Human.
4. **Rulesets can lock Copilot out.** GitHub states that a rule Copilot cannot comply with blocks the cloud agent, and that Copilot can be added as a ruleset bypass actor. Do not add it as a bypass actor on `main`: that would let the agent skip the approvals this module depends on.

With **Copilot agent mode in VS Code** (the lane the team can use on the Student plan) none of the four apply: the developer pushes and opens the pull request, so the pull request is theirs and GitHub's normal rule holds (an author cannot approve their own pull request). The separation between "who asked the agent" and "who approves" then rests on the team: the requester is the author, and two others approve.

Claude Code has no server-side equivalent of rules 1 and 2. The same separation is a team agreement, which is weaker.

---

## Failure modes when a gate is missing

| Gate                       | If it is missing                                                                                                                                                                                       | What you see                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| commit-msg hook            | Messages drift (`wip`, `fixes`, `update`). Nobody can tell a feature from a refactor in `git log`, and a revert is a guess.                                                                            | Clone without `pnpm install`, or `git commit --no-verify`. The Copilot agent hook does not block `--no-verify` today (Claude Code's does). See P2. |
| Human decides the boundary | One commit holds a feature, a refactor and a dependency bump. Agent pull requests bundle several purposes at over three times the human rate (40.0% against 12.2%, Watanabe et al., arXiv 2509.14745). | The squash merge hides it on `main`: one clean-looking commit, three changes inside. Reviewers are the only check.                                 |
| Agent trailer              | `main` shows a human author on agent-written code. The accountability chain in `docs/modules/testing.md` loses its second link.                                                                        | Every Copilot agent-mode commit made at VS Code's default setting.                                                                                 |
| Agent push hook            | The agent pushes unreviewed work, or pushes to a branch someone else is on.                                                                                                                            | Copilot: covered by `fault-reporting.json` for the experiment only. Claude Code: only pushes to `main` are blocked.                                |
| Required CI checks         | Failing lint, types or tests reach `main` once two people approve.                                                                                                                                     | Today: only AI Declaration is required.                                                                                                            |
| Two human approvals        | The person who asked the agent merges their own agent's work.                                                                                                                                          | Ruleset holds this today (2 approvals).                                                                                                            |
| Squash-only merge          | Branch history with `wip` commits lands on `main`, and the "one merge, one change" promise in GIT-WORKFLOW.md breaks. This happened before the ruleset: ten merge commits on `main` as of 2 Sep.       | Ruleset holds this today.                                                                                                                          |
| Squash commit title        | GitHub offers the pull request title as the squash message. The commit-msg hook does not run on GitHub, so a title like `Feature/claude copilot mechanism map (#53)` lands on `main` unchecked.        | Three of the last three merges on `main` (#52, #53, #54).                                                                                          |

---

## Gaps found while writing this (28 Sep 2026)

1. **Only one CI job is required.** The ruleset's required status checks list `AI Declaration` only. Lint & Typecheck, both test jobs and the Security Scan run but do not block. `docs/GIT-WORKFLOW.md` says they must pass. Fix: add them to the ruleset (a settings change for Chirag as repository owner).
2. **Squash titles are unchecked.** The commit-msg hook runs locally; the squash commit is written on GitHub. Recent `main` commits have non-conventional titles. Fix: a CI check on the pull request title (P4 includes one), or reviewers edit the title before merging.
3. **The commit-msg pattern has four holes** (length, `!`, revert, merge). Fix: P1.
4. **Copilot's agent hook does not stop hook bypass.** Fix: P2.
5. **No trailer on Copilot agent-mode commits.** Fix: P3 plus P4.
6. **GIT-WORKFLOW.md is out of date** on required checks and approvals. Fix: a docs pull request after P1 to P4 are decided.

---

## Proposals (copy and paste)

None of these are in the repository yet. Each was run locally on 28 Sep 2026; results are listed with it.

### P1. Tighter commit-msg check (Hook, git)

Replace `scripts/check-commit-msg.js`:

```js
#!/usr/bin/env node
const fs = require("fs");
const msgFile = process.argv[2];
if (!msgFile) {
  console.error("Usage: node scripts/check-commit-msg.js <commit-msg-file>");
  process.exit(1);
}
// Subject line only.
const subject = fs.readFileSync(msgFile, "utf8").split("\n")[0].trim();

// Git's own default messages for merges and reverts are allowed through.
if (/^Merge (branch|remote-tracking branch|pull request) /.test(subject))
  process.exit(0);
if (/^Revert ".+"$/.test(subject)) process.exit(0);

const pattern =
  /^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\([a-z0-9-]+\))?!?: \S.{0,99}$/;

if (!pattern.test(subject)) {
  console.error("\n❌ Commit message does not follow Conventional Commits.\n");
  console.error(
    "  Format: type(scope): description   (100 characters or fewer after the colon)",
  );
  console.error(
    "  Types:  feat | fix | docs | style | refactor | test | chore | build | ci | perf | revert",
  );
  console.error("  Breaking change: feat!: description");
  process.exit(1);
}
process.exit(0);
```

Result: all ten messages in the table above now get the right answer. Scopes must be lower-case kebab-case (`feat(Fault Report): x` is rejected).

### P2. Copilot may not skip git hooks (Hook, agent)

Add inside `decide()` in `scripts/copilot/pre-tool-use.cjs`, before the final `return {}`:

```js
// Stop the agent skipping lefthook (commit-msg and pre-commit).
if (
  /\bgit\b[^\n;&|]*\b(commit|merge|push)\b[^\n;&|]*(--no-verify|\s-n\b|\s-[a-z]*n[a-z]*\b)/i.test(
    command,
  )
) {
  return deny(
    "--no-verify skips the repository's git hooks. Fix the commit message or the lint error instead.",
  );
}
if (/\bcore\.hooksPath\b|\bLEFTHOOK=0\b/i.test(command)) {
  return deny("Changing or disabling git hooks is not allowed for the agent.");
}
```

Result: denies `git commit --no-verify`, `git commit -n`, `git commit -nm`, `LEFTHOOK=0 git commit` and `git -c core.hooksPath=... commit`; allows `git commit -m`, `git commit -am`, `git log -n 5`, `git merge --no-ff` and `pnpm run lint`. Known false positive: a message containing ` -n` (`docs: explain the -n flag`) is denied. Like the existing guard, this is lexical; it is not a security boundary. Add the cases to `scripts/copilot/pre-tool-use.test.cjs`.

### P3. Turn on Copilot's co-author trailer (No gate, becomes checkable by P4)

Create `.vscode/settings.json`:

```json
{
  "git.addAICoAuthor": "chatAndAgent",
  "github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "text": "Use Conventional Commits: type(scope): description. Types: feat, fix, docs, style, refactor, test, chore, build, ci, perf, revert. Lower-case kebab-case scope. Subject 100 characters or fewer. One logical change per commit."
    }
  ]
}
```

The first line adds `Co-authored-by: Copilot <copilot@github.com>` to commits that include Copilot chat or agent edits. The second tells Copilot's commit-message button our format, so the hook rejects less. A workspace setting only shapes behaviour; P4 is what checks it.

### P4. CI refuses an AI-declared pull request with no agent trailer (CI check)

Add this job to `.github/workflows/ci.yml` (only the `ai-attribution` block, indented under the existing `jobs:`), then add it to the ruleset's required checks:

```yaml
# Goes under the existing `jobs:` key in ci.yml
jobs:
  ai-attribution:
    name: AI Attribution
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Agent trailer present when AI use is declared
        env:
          PR_BODY: ${{ github.event.pull_request.body }}
          PR_TITLE: ${{ github.event.pull_request.title }}
          BASE: origin/${{ github.base_ref }}
        run: |
          if ! printf '%s\n' "$PR_TITLE" | grep -Eq '^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\([a-z0-9-]+\))?!?: \S'; then
            echo "::error::PR title becomes the squash commit on main and must follow Conventional Commits."
            exit 1
          fi
          if printf '%s\n' "$PR_BODY" | tr -d '\r' | grep -Eq '^- \[[xX]\] AI-assisted tools were used to create this change\.$'; then
            count=$(git log "$BASE"..HEAD --format='%(trailers:key=Co-authored-by,valueonly)' | grep -ciE 'copilot|claude|anthropic|openai|codex' || true)
            if [ "$count" -eq 0 ]; then
              echo "::error::AI use is declared but no commit carries an agent Co-authored-by trailer."
              exit 1
            fi
          fi
          echo "AI attribution check passed."
```

Result (trailer step, run locally against three test branches): a branch with a Copilot trailer passes, a branch with Claude Code's `Co-Authored-By` passes (git matches the key in any case), a branch with no trailer fails with the error. The title step is also what closes gap 2. Not yet run in GitHub Actions. Changing `ci.yml` needs team approval under `CLAUDE.md`.

---

## Claude Code equivalents

| Copilot                                                                | Claude Code                                                                                                                                |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `.github/hooks/*.json` preToolUse (`scripts/copilot/pre-tool-use.cjs`) | `hooks.PreToolUse` in `.claude/settings.json` (blocks push to `main`, `--force`, `--no-verify`, `firebase deploy`) plus `permissions.deny` |
| `git.addAICoAuthor` in `.vscode/settings.json`                         | `attribution.commit` in `.claude/settings.json` (on by default)                                                                            |
| `commitMessageGeneration.instructions`                                 | `CLAUDE.md` Git section and the `/git-feature` skill (advisory, no gate)                                                                   |
| Requester's approval does not count (cloud agent)                      | No equivalent. Team agreement.                                                                                                             |
| Workflows wait for approval on agent pushes (cloud agent)              | No equivalent. Claude Code pushes as the developer, so workflows run straight away.                                                        |

The git hooks (lefthook), the CI jobs and the ruleset are the same for both. They run in git and on GitHub, not in the model, so they do not care which tool wrote the change.

---

## Sources

- Repository at `b62e009`: `lefthook.yml`, `scripts/check-commit-msg.js`, `scripts/copilot/pre-tool-use.cjs`, `.github/hooks/fault-reporting.json`, `.github/workflows/ci.yml`, `.github/pull_request_template.md`, `.claude/settings.json`, `docs/GIT-WORKFLOW.md`, `docs/ai-attribution-verification.md`, `docs/governance-verification-results.md`.
- `main` ruleset: `GET /repos/Chirag123213/nbn-sdlc-demo/rules/branches/main`, read 28 Sep 2026.
- `docs/reports/D1-claude-certification.md` section 3 (gate labels); `docs/reports/D3-sdlc-research.md` 6.2, 6.3, 6.10; `docs/research/slice2-build-modules.md` modules 2 and 3.
- GitHub Docs, [Reviewing a pull request created by Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/review-copilot-prs) and [About Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent), fetched 28 Sep 2026.
- VS Code Docs, [Custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) (commit message instructions setting), fetched 28 Sep 2026.
- microsoft/vscode [issue #314311](https://github.com/microsoft/vscode/issues/314311) (`git.addAICoAuthor` values and default), fetched 28 Sep 2026.
- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).
- Watanabe et al., [arXiv 2509.14745](https://arxiv.org/abs/2509.14745).
