# Git Workflow

A single `main` branch — no `develop`, no release branches. Simple enough for a capstone team:
branch, build, PR, merge.

## Branch Structure

```
main         ← production (protected, deploys automatically on push)
  ↑
feature/*    ← new features (branched from main, PR back to main)
hotfix/*     ← urgent fixes (branched from main, PR back to main)
```

## Branch Naming

| Type    | Pattern                | Example                    |
| ------- | ---------------------- | -------------------------- |
| Feature | `feature/{kebab-case}` | `feature/notes`            |
| Hotfix  | `hotfix/{kebab-case}`  | `hotfix/auth-token-expiry` |

## Workflow

```
git checkout main && git pull
git checkout -b feature/{name}
# ...make changes, commit...
git push -u origin feature/{name}
gh pr create --base main
# review, merge, GitHub deletes the branch automatically
```

`/git-feature` and `/git-hotfix` (Claude Code skills) automate exactly this. There's no
functional difference between the two branch types — `hotfix/*` is just a naming convention to
flag "this is an urgent fix" to reviewers.

## Commit Messages (Conventional Commits)

The `commit-msg` hook enforces this format:

```
type(scope): description

Examples:
feat: add notes feature
fix(auth): handle token expiry on refresh
docs: update Firestore schema for notes
refactor(backend): extract auth middleware
test: add integration tests for health route
chore: upgrade firebase-admin to v13
```

**Types:** `feat` · `fix` · `docs` · `style` · `refactor` · `test` · `chore` · `build` · `ci` · `perf` · `revert`

## Merge Strategy

Squash merge every PR into `main` — keeps history linear and each merge maps to one logical
change.

## Protected Branch

`main` is protected by a ruleset — no direct pushes, no force pushes, squash merge only. All changes go
through a pull request with two approving reviews from people with write access (your own approval
does not count). The PR title becomes the squash commit, so it must follow Conventional Commits too.

These checks must pass before merge:

- AI Declaration — the PR body answers the AI-use question
- AI Attribution — the PR title is Conventional, and an AI-declared PR has at least one commit with
  an agent `Co-authored-by` trailer
- Lint & Typecheck
- Frontend Tests
- Backend Unit Tests
- Security Scan — gitleaks secret scan and `pnpm audit --audit-level=high`

Locally, lefthook runs the same secret scan on every commit when gitleaks is installed
(`winget install Gitleaks.Gitleaks` or `brew install gitleaks`), and the commit-msg hook rejects
non-Conventional subjects.

## Tagging a milestone (optional)

If you want to mark a submission or checkpoint, tag `main` directly — no release branch needed:

```bash
git checkout main && git pull origin main
git tag v0.1.0 -m "Milestone: <what this is>"
git push origin v0.1.0
```
