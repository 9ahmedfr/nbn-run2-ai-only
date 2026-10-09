# Governance and token model

**Status:** Draft for team review

**Date:** 27 Sep 2026

**Owner:** Sidney Zeng (PM)

**Deliverable:** Client brief of 15 August, deliverable 3: governance and token model covering token consumption, API usage and human liability for AI-generated code.

---

## 1. Purpose and scope

This document answers three questions for AI-assisted work in the lifecycle described by D4:

1. **Who is accountable** for a change, and what the repository records about it.
2. **What holds each control**, and what test proves it runs.
3. **What the work costs**, who owns that budget, and what constrains it.

It covers the scoped stages of ADR-002: stages 6 and 7 in full, stages 5 and 8 at their handoffs. It applies to `Peepachuu/nbn-sdlc-demo` and to the three showcase repositories built from it.

Two limits are stated up front. This document takes no legal position, copyright and licence in agent-written code needs counsel, and slice 3 Module 4 records it as open. And every control below is recorded with the evidence that it was tested, or with an explicit note that it was not.

---

## 2. Accountability: the four names

Slice 3 Module 4 states the rule: every change carries four names, and no ambiguity about who answers for it.

| # | Name | Filled by | Source of the record |
|---|---|---|---|
| 1 | Human author of record | The committer | Git author on the commit |
| 2 | Agent co-author | The agent that contributed | `Co-Authored-By` trailer on the commit |
| 3 | Human approver | A person who is not the requester | Pull request review, enforced by the `main` ruleset |
| 4 | Accountable owner | Named in the AI register | `docs/AI-register.md` |

**Accountability does not end at merge.** Liu et al. found 24.2 percent of issues introduced by AI-authored commits still present at repository HEAD, with security issues surviving at 41.1 percent. The accountable owner's obligation therefore runs **until the next release**, recorded on each register row.

### What the repository records today

| Name | Recorded? | Evidence |
|---|---|---|
| Author of record | Yes | Git author on every commit |
| Agent co-author | Yes, for Claude Code | Commit `20755e0c` carries `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`; attribution survived the squash merge into `main` at `2c9a958` |
| Agent co-author, Copilot | Documented, not tested | Copilot cloud-agent access was unavailable on the test account, so GitHub's documented behaviour is recorded rather than verified |
| Human approver | Yes | The `main` ruleset requires two approving reviews; merge was blocked for both the repository owner and a collaborator on PR #43 |
| Accountable owner | **Not until now** | The register did not exist. `docs/AI-register.md` is created with this document |

Three of the four names were already automatic. The fourth, the one the regulator actually asks for, existed in no tooling at all.

---

## 3. Provenance: model, prompt, configuration

Provenance answers what the approver needed to know. Slice 3 Module 4 sets three levels, from smallest to largest.

| Level | What it records | Status in this repository |
|---|---|---|
| Trailer | That an agent contributed, and which model | Present and verified. The trailer names the model |
| Confidence card | The plan, assumptions, alternatives and known edge cases | Present as headings in `.github/pull_request_template.md`. Completion is a human act and is not enforced |
| Configuration | What the agent was told before it started | In the repository: `CLAUDE.md`, `.claude/settings.json`, `.github/copilot-instructions.md`, `.github/agents/`, `.github/hooks/` |

**The prompt is the gap.** Nothing in the repository records what the agent was actually asked. The showcase run sheet records prompts for the pilot builds, but that is an experiment artefact, not a repository control. Recording prompts for routine work remains open, and slice 3 Module 5's rule, that a prompt which matters is a file, is the proposed answer.

---

## 4. Controls, their holders, and the test for each

Every control names its holder. A rule that lives only in a prompt is labelled as having no gate, per slice 3 Module 2.

### Enforcing controls

| Control | Holder | Test | Result |
|---|---|---|---|
| Two approvals before merge | Ruleset (platform) | Merge attempted with all checks green and no approvals, from the owner account and a collaborator account, PR #43 | Blocked both times |
| AI-use declaration answered | CI check | Declaration left unanswered on PR #43 | Required check failed and passed again once answered |
| Copilot approvals do not satisfy merge requirements | Platform default | Repository Copilot settings inspected | No configuration found that would allow it |
| Agent attribution survives squash merge | Platform | PR #47 squash merged | Trailer preserved on `main` at `2c9a958` |
| Preview deployment on every PR | Platform | PRs #9, #14 and #43 | Preview URLs posted |
| Firestore rules deployed on merge | CI workflow | Workflow enabled and secrets confirmed | Deploys on pushes to `main` that touch `firebase/firestore.rules` |
| Copilot `PreToolUse` hook blocks a command | Copilot hook | `echo COPILOT_HOOK_TEST` requested in agent mode, 22 Sep | Blocked before execution |
| The same hook through a subagent | Copilot hook | `hook-subagent-test` subagent invoked, 22 Sep | Blocked |

**One tested limit.** With a one-second hook timeout and a three-second delay, the hook timed out and the command proceeded. Copilot hooks **fail open on timeout**. A hook is an enforcing control only while it responds in time, and that belongs in any document that calls it enforcement.


### Advisory mechanisms, which hold nothing

Per the Copilot mechanism map, these shape behaviour and cannot enforce. Repository and path instructions, skills, custom agents and subagents, commands, prompt files, MCP servers. They are useful and they are not controls. A governance document that lists any of them as a control has to be sent back.

### Controls that need GitHub Enterprise

Not available as Student-plan repository mechanisms, and not tested:

| Control | Requirement |
|---|---|
| Enterprise Copilot policies | Copilot Business or Enterprise with enterprise administration |
| Organisation content exclusion | Copilot Business or Enterprise |
| Enterprise MCP allowlist and denylist | Copilot Business or Enterprise |
| Enterprise agent management | Enterprise AI Controls |
| Enterprise-managed Copilot settings | Enterprise administration |

NBN Co runs GitHub Enterprise, so these are available to the client and were not available to this project. The distinction matters: repository-level mechanisms are not centrally enforced governance.

---

## 5. Regulatory constraints

From slice 3 Module 6, with one correction that a reviewer will otherwise make.

**The Commonwealth's Policy for the responsible use of AI in government does not bind NBN Co.** It applies to non-corporate Commonwealth entities; corporate entities are encouraged but not mandated. NBN Co is a corporate Commonwealth entity. This document adopts the policy as the nearest model and says so.

Seven codified rules, each with its holder:

| # | Rule | Holder |
|---|---|---|
| 1 | No personal or sensitive information into a public model | Hook or deny rule where the pattern is known, human for the rest |
| 2 | Every AI use case has an accountable owner and a register entry | Human. No automation possible |
| 3 | Human oversight matched to autonomy and stakes | Human, with CI checks as the automated floor |
| 4 | Deploys to critical-infrastructure assets stay inside a written risk management program | Human sign-off |
| 5 | WCAG AA minimum on anything public | CI check plus human |
| 6 | Generated artefacts for First Nations audiences are hypotheses until validated with the community | Human |
| 7 | Security and resilience integral to operations | CI check plus human |

Two of seven can be held by a hook or a check. The other five are held by people, and a policy that pretends otherwise is governance theatre with a legal citation on it.

Every policy citation in slice 3 carries its fetch date, and policy sources are re-fetched each slice. The Voluntary AI Safety Standard's ten guardrails were replaced in October 2025 by six essential practices; citing the superseded version is the error this rule exists to prevent.

---

## 6. Token accounting: what is recorded, and where

Three numbers per task, recorded in the credit log at `docs/research/fault-reporting/credit-log.md`:

| Field | Definition |
|---|---|
| Generating time | Minutes the agent was producing |
| Reviewing time | Self-reported active human minutes, not elapsed time |
| Usage | AI credits for Copilot, tokens for other tools, recorded in the unit the tool reports |

**Rules the log already states:** record the usage delta per stage, split rows at resets, model changes and separate sessions, keep Actions minutes separate from AI credits, record a displayed `Auto` model honestly rather than inferring the hidden model, and mark stage allocation unavailable when telemetry combines stages.

**Units are not converted into one another.** Copilot premium requests and token counts are recorded as they are reported. For comparison, tokens are valued at API list price, with the price and its retrieval date recorded as an assumption.

**Status.** No Copilot session has been run for the fault-reporting feature; Student entitlement was pending. The pilot comparison ran on OpenAI, and those figures must not be attributed to Copilot. **[Pilot figures from the showcase run sheet: pending Sunday's review.]**

---

## 7. Cost model

**Who owns the budget.** The register owner, currently the PM. Nothing in the tooling stops a task consuming a large share of a quota, a person does, before the task, by choosing chat over document generation.

**What a task may cost.** Recorded per register row. The reference rates:

| Unit | Rate |
|---|---|
| Copilot coding agent | 1 premium request per session, plus 1 per steering comment |
| Copilot code review | 13 premium requests per review |
| Claude Code, enterprise reference | About US$13 per developer per active day on average; under US$30 for 90 percent of users |

**The number that decides whether any of this saves money** is review time, not generation time. If generation takes two minutes and review takes forty, the bottleneck has moved and the model should say so. A gate that is cheap to pass and expensive to check is not a saving.

**Constraints on this demonstration**, stated because they shape every figure in it:

- Subscription plans, not per-token billing, so there is no real invoice to report
- Copilot Student entitlement was pending, so the pilot ran on other tooling
- Copilot cloud-agent access was unavailable, so Copilot attribution is documented rather than tested
- Quota windows reset on a fixed cycle and arrive with no warning; two of roughly 35 users hit their limit mid-build at the client's own workshop

---

## 8. The AI register

`docs/AI-register.md`, owned by the PM, one row per AI use case.

Each row records the use case, the accountable owner, the tool and model, where it runs, what a task may cost, and the obligation period. The obligation runs **until the next release**.

The register satisfies two asks at once: the accountable owner the regulator's model requires, and the per-task cost the client brief requires. Neither framework asks for both; this one does.

---

## 9. What happened when no control existed

During the showcase comparison, one lane reached a deployed feature quickly. Getting there involved, in sequence, a Firebase service-account private key pasted into a chat window so that the deployment environment could be configured, preview protection temporarily disabled and a verified test user created against a live project. Every step was approved by the operator.

**No automated control caught any of it.** Secret scanning did not fire, because the key never entered the repository. The declaration check did not fire, because the declaration was about AI use, not credentials. The ruleset did not fire, because nothing was being merged. The exposure was reported by the model itself, after the fact.

Three findings:

1. **The controls that exist are scoped to the repository.** A credential can leave the project without touching a single control, because the controls watch commits and merges, not the developer's other windows.
2. **An approval prompt is not a control.** The method presented five escalating requests in sequence and nothing distinguished "commit this file" from "upload a private key". The same operator in the gated lane met a defined gate at each stage.
3. **Self-reporting is not evidence.** The only reason there is a record at all is that the model volunteered one.

---

## 10. Open items

| Item | Status |
|---|---|
| Copyright and licence in agent-written code | Open. Needs counsel, not a research slice |
| Prompt provenance for routine work | Open. Recorded for the pilot only |
| Firestore index deployment | Gap found here. The deploy workflow does not trigger on index changes |
| Copilot attribution | Documented, not tested. Needs cloud-agent access |
| Pilot cost figures | Pending the showcase review |

---

## 11. Sources

D1 section 3, the mechanism ladder. D2 v2 sections 4.4, 4.5 and 10.2. D3 slice 3, modules 2, 3, 4 and 6. `docs/research/claude-copilot-mechanism-map.md`. `docs/governance-verification-results.md`. `docs/ai-attribution-verification.md`. `docs/research/success-metrics-stages-5-8.md`. `docs/research/fault-reporting/credit-log.md`. Policy sources carry their fetch dates in slice 3.