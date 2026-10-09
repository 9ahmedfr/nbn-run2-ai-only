# AI Attribution Verification

## Scope

This check verifies how Claude Code and GitHub Copilot cloud agent record AI involvement in GitHub commits and pull requests.

## Claude Code

Claude Code was tested directly in this repository on branch
`feature/ai-attribution-verification`.

Test commit:

`20755e0c1378067b0a322448caa6c5cc06a72feb`

The commit records the human developer as the Git author and adds Claude as a co-author through the commit message trailer:

`Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`

Claude Code controls commit attribution through the `attribution.commit`
setting in its project settings.

This repository did not have an explicit `attribution` configuration in
`.claude/settings.json` when the test was performed. The co-author trailer
was therefore produced using Claude Code's default attribution behaviour.

Observed result:

- Human developer remains the commit author.
- Claude Code records its contribution using a `Co-Authored-By` trailer.
- The trailer identifies the Claude model used for the commit.

## GitHub Copilot cloud agent

A live Copilot cloud-agent PR could not be created from the test account because the account did not have Copilot cloud-agent access.

GitHub's current documentation states that commits created by Copilot coding agent:

- are authored by Copilot;
- record the human who initiated the task as a co-author;
- are signed and shown as verified;
- link back to the Copilot agent session logs.

A Copilot-created pull request therefore provides agent provenance through both the PR and its commit metadata.

## Result

Claude Code attribution was verified directly in this repository.

GitHub Copilot attribution was verified against GitHub's current documentation, but was not live-tested in this repository because Copilot cloud-agent access was unavailable.