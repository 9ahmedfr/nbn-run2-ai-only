# Claude Code to GitHub Copilot Mechanism Map

This document maps the Claude Code mechanisms identified in `docs/reports/D1-claude-certification.md` and the repository's Claude configuration to their GitHub Copilot equivalents.

If no direct Copilot equivalent exists, it is recorded explicitly.

## Mechanism mapping
| Claude mechanism | Claude implementation in this repo | GitHub Copilot equivalent | Copilot implementation | Control type |
|---|---|---|---|---|
| CLAUDE.md | `CLAUDE.md`, `frontend/CLAUDE.md`, `backend/CLAUDE.md` | Repository and path-specific custom instructions | `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md` | Advisory |
| Skill | `.claude/skills/*.md` | Agent skills | `.github/skills/<skill>/SKILL.md` | Advisory |
| Sub-agent | `.claude/agents/*.md` | Custom agents / subagents | `.github/agents/<agent>.agent.md` | Advisory |
| Hook | `.claude/settings.json` hooks | Copilot hooks | `.github/hooks/*.json` | Enforcing |
| Command | Explicitly triggered Claude operation requiring the user to invoke it | Explicitly invoked Copilot operation | User-triggered Copilot Chat commands or agent actions | Advisory |
| Slash command | Explicitly invoked repo skills such as `/bootstrap`, `/verify`, `/checkpoint`, `/git-feature` and `/git-hotfix` | Prompt files / Copilot slash commands | `.github/prompts/*.prompt.md`; prompt files provide the closest repo-defined equivalent and can be explicitly invoked in Copilot Chat | Advisory |
| MCP server | `mcpServers` in `.claude/settings.json` | Copilot MCP servers | `.github/mcp.json` for repository configuration, or repository Copilot MCP settings | Advisory |


## Copilot Student plan verification

| Date | Mechanism | Test | Result |
|---|---|---|---|
| 22 Sep 2026 | Repository instructions | Added a temporary instruction to `.github/copilot-instructions.md` and queried it through Copilot Chat in VS Code | Pass |
| 22 Sep 2026 | Custom agent | Selected `.github/agents/student-plan-test.agent.md` in VS Code and verified that its custom response instruction was applied | Pass |
| 22 Sep 2026 | `PreToolUse` hook | Requested `echo COPILOT_HOOK_TEST` in Copilot Agent mode; the hook blocked the terminal command before execution | Pass |
| 22 Sep 2026 | `PreToolUse` timeout | Configured a 1-second hook timeout and delayed the hook for 3 seconds; the hook timed out and the command proceeded, confirming Copilot's fail-open timeout behaviour | Pass |
| 22 Sep 2026 | `PreToolUse` through subagent | Invoked `hook-subagent-test` as a subagent; its attempt to run `echo COPILOT_HOOK_TEST` was blocked by the workspace hook | Pass |

## Enterprise-managed controls

The following controls are not available as ordinary Student-plan repository mechanisms and require centrally managed GitHub Copilot organization or enterprise capabilities.

| Control | Requirement | Purpose |
|---|---|---|
| Enterprise Copilot policies | Copilot Business or Copilot Enterprise with enterprise administration | Centrally enable or disable Copilot features, agents, models and clients |
| Organization / enterprise content exclusion | Copilot Business or Copilot Enterprise | Prevent specified repository content from being used by supported Copilot features |
| Enterprise MCP allowlist / denylist | Copilot Business or Copilot Enterprise | Restrict which MCP servers developers can use |
| Enterprise agent management | Enterprise AI Controls | Centrally control agent availability and inspect agent activity |
| Enterprise-managed Copilot settings | Enterprise administration | Centrally restrict client behaviour such as plugins, bypass settings and defaults |


These controls were not tested on the Student plan and are listed separately so that repository-level Copilot mechanisms are not confused with centrally enforced enterprise governance.