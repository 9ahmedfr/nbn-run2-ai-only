# Setting Name Verification

## Scope

This check verifies that the Claude Code and GitHub setting names used by this project match the current official documentation before the remaining controls are configured.

| Area | Current setting/rule name | Status |
|---|---|---|
| Claude shared project settings | `.claude/settings.json` | Confirmed |
| Claude commit attribution | `attribution.commit` | Confirmed |
| Claude PR attribution | `attribution.pr` | Confirmed |
| Claude legacy attribution | `includeCoAuthoredBy` | Deprecated — do not use |
| GitHub ruleset enforcement | `Active` | Confirmed |
| GitHub PR gate | `Require a pull request before merging` | Confirmed |
| GitHub approval requirement | `Required approvals` (`required_approving_review_count`) | Confirmed |
| GitHub CI gate | `Require status checks to pass before merging` | Confirmed |
| GitHub squash option | `Allow squash merging` | Confirmed |
| Copilot approval setting | `Allow Copilot approvals to count toward merge requirements` | Confirmed |

## Repository comparison

The repository currently uses `.claude/settings.json` as its shared Claude Code project settings file.

The repository's `main` ruleset is currently active and requires two approving reviews, but it does not yet target a branch and does not yet require any status checks. These configuration gaps are addressed by later tasks.

## Result

The Claude Code and GitHub setting names required by the remaining checklist were checked against the current official documentation.

The remaining implementation will use the current setting and rule names recorded above.