# AI register

**Owner:** Sidney Zeng (PM)

**Last reviewed:** 27 Sep 2026

One row per AI use case. The accountable owner answers for the use, decides what a task may cost, and stays accountable **until the next release**, per the governance and token model.

A use case gets a row before it is used, not after. The owner is a person, not a team.

| ID | Use case | Accountable owner | Tool and model | Where it runs | What a task may cost | Obligation | Evidence |
|---|---|---|---|---|---|---|---|
| AI-01 | Agent-assisted feature development in the scoped stages | Chirag Wadehra | Claude Code, model recorded in the commit trailer | Developer machines, against `Peepachuu/nbn-sdlc-demo` | One coding session per issue, plus one request per steering comment | Until the next release | Commit trailers; `docs/research/fault-reporting/credit-log.md` |
| AI-02 | Agent-assisted feature development on the client's tooling | Zafir Hasan | GitHub Copilot, model recorded per session | Developer machines and Copilot cloud agent | As above, plus 13 premium requests per Copilot code review | Until the next release | `docs/research/claude-copilot-mechanism-map.md` |
| AI-03 | AI-assisted research and document drafting | Sidney Zeng | Claude, model recorded in the document's AI involvement section | claude.ai | One drafting session per document | Until the next release | AI involvement section in each document; `docs/research/citation-audit.md` |
| AI-04 | Showcase comparison builds | Sidney Zeng | OpenAI, GPT-5.6 Sol at high effort | Codex and ChatGPT, against the three showcase repositories | Four hours of active time per build, within plan limits | Until the showcase closes | `showcase-run-sheet.xlsx` |

## Rules

- **No personal or sensitive information into a public model,** and no client data outside approved tooling.
- **No credentials into any AI chat,** in any lane, for any reason.
- **Every entry names a person.** "The team" is not an accountable owner.
- **The owner's obligation runs past merge.** Monitoring starts at merge; it does not end there.
- **Review this register at each sprint close,** and whenever a new tool or model is adopted.

## Incidents

| Date | Use case | What happened | Remediation |
|---|---|---|---|
| 25 Sep 2026 | AI-04 | A service-account private key was pasted into a chat window during environment configuration. No automated control caught it; the model reported it afterwards | Key rotated; exposure recorded; rule added that no credential enters an AI chat in any lane |