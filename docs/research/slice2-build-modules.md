# Research slice 2: build modules at operational depth

> Slice 2 of three. Slice 1 (the spine) established the eight stages and tested their colours; this document goes inside the build stages at the depth Alessio asked for on 15 Aug: "how a commit is done, how branches are made, how harnesses are used." It is written as a how-to for the junior layer: each module opens with a plain-English story, then the mechanics, then the human gate and the failure mode. Requirements and module list: `slice2-build-modules-requirements.md`.

> Status, 2 Sep 2026: all six modules drafted. Two marked slots stay open and do not block the slice: Zafir's INF-6a spike timings (Module 3, generating time against reviewing time) and Leon's written colour statements (Module 5). Two claims need a five-minute check on github.com before this is presented as settled, both recorded under "Gaps recorded" at the end: whether branch protection on `main` is actually switched on (checked 3 Sep: it is not, see gap 3), and whether Vercel preview URLs were posted on PRs #9 and #14 (one was posted on PR #20; #9 and #14 still unchecked).

> Citation status: the external sources introduced in this slice were fetched and checked on 2 Sep 2026; the per-citation record is the table at the end. Sources inherited from slice 1 carry the slice 1 audit (`citation-audit.md`) and are not re-fetched here. Our own repository is cited by file path at the commit this document was written against.

Nothing here is invented. Every mechanic is documented practice (cited), observed in the workshop record (D2 v2), demonstrated in our own repository, or practitioner input from Leon Gouletsas (31 Aug meeting, recorded). Where a gate is named, it is also labelled with the mechanism that holds it, using Sidney's D1 capability inventory (`docs/reports/D1-claude-certification.md`, section 3): hook, CI check, or human. Skills, CLAUDE.md and sub-agents shape the work but do not hold a gate.

Where the repository's documentation and its history disagree, the history wins and the disagreement is recorded rather than smoothed over. There are two such cases (merge strategy and commit trailers), both in "Gaps recorded".

---

## Module 1: Issue to branch

### The story

A junior developer picks up a card from the board: "add a notes feature." Before any AI touches anything, two artifacts already exist, and they are the whole trick. The issue describes the task with its acceptance criteria written out, and those acceptance criteria also live in the repository as a Markdown file. When the developer (or an agent) starts work, the prompt doesn't paste context in, it points at the file by name: "implement issue #41 against the criteria in `docs/acceptance/notes.md`." The repository is the shared memory, so every person and every agent reads the same brief.

This pattern wasn't handed down from Google. Several teams at the NBN workshop invented it independently on the day, because it routes around the thing that burned every team: chat tools don't share context, Git does (D2 v2, section 7.3).

### The mechanics

Our repository runs the simplest workable version of this, one protected `main`, two branch types (docs/GIT-WORKFLOW.md):

```
git checkout main && git pull
git checkout -b feature/notes        # feature/{kebab-case}; hotfix/* for urgent fixes
# work happens here
git push -u origin feature/notes
gh pr create --base main
```

`main` is protected: no direct pushes, everything through a PR, CI green before merge. Branch names are flags for reviewers, not machinery; `hotfix/` just says "urgent" out loud.

With an agent in the loop, the entry point moves but the shape holds. GitHub's coding agent is assigned the issue itself (set Copilot as assignee); it reads the issue, explores the repo for context, works on its own branch, and opens a draft PR, so "issue to branch" becomes one step, with the branch and PR created for you (docs.github.com). Claude Code does the same from a prompt that names the issue. Either way the issue is the contract: an agent given a vague issue produces a vague branch.

### The human gate

A person decides what becomes an issue and what its acceptance criteria say. That's the whole gate for this module, and it's load-bearing: the spine's Stage 5 verdict (AMBER, confirmed by both source notes) rests on planning staying human-owned while AI fills in scaffolding. Definition of Ready is the checklist form of this gate (Microsoft playbook): a story that hasn't passed it doesn't get a branch.

### The failure mode

Scope creep per branch. Agent-authored PRs bundle multiple purposes at over three times the human rate (40.0% vs 12.2%, Watanabe et al., [arXiv 2509.14745](https://arxiv.org/abs/2509.14745)), and "too large to review" is a leading rejection reason. The fix is enforced at this end, not at review: one issue, one branch, one describable change. If the issue can't be described in one sentence, it's two issues. Google's small-CL rule ("write CLs that are smaller than you think you need") is the same discipline with forty years of scale behind it.

### Colour

Task-level, per Leon's framing (31 Aug): drafting the issue text and acceptance criteria from a feature request is green-to-orange work (generation against known context, human approves). Deciding that the work should happen, and what done means, is red. The branch mechanics are neither, they're deterministic tooling.

Gate mechanism (D1 s3): human. Definition of Ready is a checklist a person walks through, not a hook. Nothing in this module runs deterministically except the branch protection on `main`, which belongs to Module 3.

---

## Module 2: How a commit is done

### The story

The notes feature is half built. The developer has a working data model and a failing test for the route, and Claude Code offers to "commit the progress so far." What lands in history at that moment is the unit of everything downstream: it is what a reviewer reads, what CI runs against, what gets reverted at 2am, and what an auditor sees in a year. So the commit is where the small-change rule gets enforced, and it is enforced by a hook, not by asking nicely.

The developer types `git commit -m "add notes"`. The commit is refused. The message has no type prefix, so the commit-msg hook exits 1 and prints the format. Second try: `feat(notes): add Firestore model and route stub`. Accepted. The same thing happens when the agent commits, because the hook runs in git, not in the model.

### The mechanics

Our repository enforces Conventional Commits with a lefthook `commit-msg` hook (`lefthook.yml`, `scripts/check-commit-msg.js`). The check is one regular expression:

```
^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\(.+\))?: .{1,100}
```

A message that does not match is rejected with exit code 1 and the hook prints four examples. The format itself is the Conventional Commits 1.0.0 specification: "Commits MUST be prefixed with a type, which consists of a noun, `feat`, `fix`, etc., followed by the OPTIONAL scope, OPTIONAL `!`, and REQUIRED terminal colon and space" ([conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/)). A `!` or a `BREAKING CHANGE:` footer marks an API break. Footers follow the git trailer convention, which matters for the third mechanic below.

The `pre-commit` hook in the same file runs four things on staged files before the message is even asked for: `scripts/validate-placeholders.js` (fails if any `{{...}}` template token from the boilerplate survived), Prettier, and ESLint separately for `frontend/` and `backend/`. Prettier is allowed to fail open (`|| true`); the placeholder check and ESLint are not.

The second mechanic is size. One logical change per commit is written into `.claude/rules/development-workflow.md` ("One logical change per commit") and into Google's engineering practice, where a changelist "should be kept small and focused on a single, easily-describable change" because small changes are faster to review, easier to roll back, and less likely to conflict (Zafir's note, s2.2, from [google.github.io/eng-practices](https://google.github.io/eng-practices/review/developer/small-cls.html)). There is no hook for this in our repository, and there is none at Google either; the reviewer is the check, and "a large CL is itself something a reviewer can push back on." What an agent changes is the pressure: Watanabe et al. found 40.0% of Claude Code PRs carried multiple objectives against 12.2% of human PRs in the same repositories ([arXiv 2509.14745](https://arxiv.org/html/2509.14745v1)). The counter-move is at the prompt, before the commit: ask for the change in one sentence, and if the sentence has an "and" in it, split the task.

The third mechanic is provenance. Git trailers are "lines that look similar to RFC 822 e-mail headers, at the end of the otherwise free-form part of a commit message" ([git-scm.com/docs/git-interpret-trailers](https://git-scm.com/docs/git-interpret-trailers)); `Signed-off-by:` is the everyday example. Claude Code adds one by default to every commit it makes, `Co-Authored-By: Claude <claude@anthropic.com>`, controlled by the `attribution.commit` setting, and it can be reworded or switched off per project ([code.claude.com/docs/en/settings-reference](https://code.claude.com/docs/en/settings-reference)). A trailer is the cheapest possible record that an agent touched a change. It is also nowhere near the "nutrition label" (which model, which prompt, which configuration) that D1 section 6 and Leon both name as missing. It records that, not what.

```
git commit -m "feat(notes): add Firestore model and route stub" \
  --trailer "Co-Authored-By: Claude <claude@anthropic.com>"
git log --format='%h %s%n%(trailers:key=Co-Authored-By)' -5
```

### The human gate

A person writes or approves the commit message, and a person decides what one logical change is. The hook only checks the shape of the first line. It will happily accept `feat: stuff` if it matches the pattern, and it does.

### The failure mode

Two, and they pull in opposite directions. The first is the oversized commit the hook cannot see: a `feat` that is really a feature plus a refactor plus a dependency bump, which is the multi-purpose PR from Watanabe one step earlier in the pipeline. The second is the commit with no provenance at all. Every commit on our `main` as of 2 Sep 2026 has a human author and no `Co-Authored-By` trailer, including the ones the team wrote with Claude Code open, because attribution was never switched on. The requirements file called PR #9 "a live example" of trailers. It is a live example of their absence, and that is recorded in "Gaps recorded" below.

### Colour

Task-level: writing the commit message from the diff is green (the agent is summarising work already reviewed, and the hook checks the format). Deciding the boundary of the commit is amber trending red; it is a scope decision. The hook itself has no colour; it is deterministic tooling.

Gate mechanism (D1 s3): hook, for message format and placeholders; human, for size and boundary. This is the cleanest example in the slice of D1's hook row: it runs every time, pattern-matches, blocks, and understands nothing.

---

## Module 3: How branches become merges

### The story

The branch `feature/notes` has six commits and the tests pass locally. The developer runs `/git-feature` or `gh pr create --base main` and a draft PR opens with the repository's template: a summary, a type-of-change tick box that mirrors the commit types, and a test plan the author fills in by hand. CI starts on the PR. Four jobs run in parallel: lint and typecheck, frontend tests, backend tests, and `pnpm audit --audit-level=high`. Any red job blocks the merge button.

A teammate reads the diff. They are not looking for perfection. They are asking whether the change makes the codebase better than it was, and whether the test plan in the PR body was actually run. They leave two comments. If the change was agent-authored, the developer can answer one of them by typing `@copilot fix the null check in the handler` (GitHub) or by re-prompting Claude Code against the review comment, and the agent pushes a new commit to the same branch. When the reviewer approves and CI is green, the developer merges. GitHub deletes the branch.

### The mechanics

Our repository's flow is in `docs/GIT-WORKFLOW.md`: one protected `main`, feature branches, PR back to `main`, CI green before merge, GitHub deletes the branch after. `/git-feature` (`.claude/skills/git-feature.md`) scripts the branch-and-draft-PR step so an agent and a person do it identically. The PR template (`.github/pull_request_template.md`) is the reviewer's checklist in disguise: it asks the author to tick unit tests, typecheck, lint, a manual smoke test against a dev Firebase project, and the placeholder check, plus Firestore and environment-variable sections. `/verify` (`.claude/skills/verify.md`) runs the same pipeline locally and prints READY or NOT READY, so the author can know the answer before the reviewer does.

The second mechanic is the branch rule. GitHub branch protection with "Require a pull request before merging" means "collaborators can only push changes to a protected branch via a pull request that is approved by the required number of reviewers with write permissions," and with required status checks, those checks "must have a `successful`, `skipped`, or `neutral` status before collaborators can make changes to a protected branch" ([docs.github.com, about protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). One detail a junior will not expect: "By default, the restrictions of a branch protection rule do not apply to people with admin permissions to the repository." The repository owner can push to `main` unless the rule says otherwise. GIT-WORKFLOW.md says `main` is protected; whether the rule is actually configured, and whether it includes administrators, is a settings-page check. Made on 3 Sep 2026: the ruleset exists but targets no branch, so the rule is not in force. See "Gaps recorded", item 3.

The third mechanic is the agent in the review loop. GitHub's coding agent works on its own branch and opens the PR itself; "By default, GitHub Actions workflows will not run automatically when Copilot pushes changes to a pull request" until someone with write access clicks "Approve and run workflows"; the person who asked for the PR cannot count as its approver ("your approval of a Copilot pull request won't count"); and changes are requested by mentioning `@copilot` in a comment or pushing to the branch ([docs.github.com, reviewing Copilot PRs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/review-copilot-prs)). Three separate human gates around one agent PR, all of them mechanical. Claude Code has no equivalent server-side rule; the same separation has to be a team agreement, which is a weaker thing.

The fourth mechanic is what a reviewer actually checks on an AI-authored diff, which slice 1 left as open question 1. Google's reviewer guide lists design, functionality, complexity, tests, naming, comments, style and documentation, and asks whether the change improves code health rather than whether it is perfect (Zafir's note, s2.2). Microsoft's SDL adds independence: review "by someone who did not write the code" (Chirag's note, s4). For an agent diff, the Watanabe data says where to look first: rejections clustered on the team solving the problem another way (12.1%), PRs "too large or complex, making effective review impractical" (3.3%), and integration friction (missing conventions, unsynchronised docs) rather than broken logic ([arXiv 2509.14745](https://arxiv.org/html/2509.14745v1)). So the first three questions on an agent PR are: does this match how we already do this, is it one change, and did it update the docs and config it touched. Correctness comes fourth, because CI has already had a go at it.

Marked slot: Zafir's INF-6a spike log should give generating time against reviewing time per task. When it lands, it goes here, because the ratio is the cost of this module.

### The human gate

The approving reviewer, who is not the author. Everything else in this module is a machine saying "not yet" (CI red, no approval, workflow not approved), and none of it can say "yes." Google's LGTM and OWNERS files, Microsoft's non-author review, and GitHub's "your approval won't count" rule are the same gate stated three ways.

An LLM can sit beside the reviewer without replacing them. Aðalsteinsson et al. tested two shapes at WirelessCar: an AI-led summary and issue list produced before the human starts, and an on-demand assistant the reviewer questions. Developers preferred the AI-led form for large, unfamiliar or low-risk PRs and human-led review for critical or familiar ones, and the study's conclusion is that the model complements the reviewer rather than replacing them (Chirag's note, s6; [arXiv 2505.16339](https://arxiv.org/abs/2505.16339)). Slice 1 records the other half: Copilot's automated review missed SQL injection and XSS across seven datasets (Amro and Alalfi, arXiv 2509.13650). A summary is a help; a verdict is not.

### The failure mode

Rubber-stamping. The METR result in slice 1 (developers believed AI made them 20% faster while it made them 19% slower) is a perception gap, and a reviewer who trusts the agent's PR description over the diff has the same gap. The mechanical defence is to make the PR template's test-plan boxes mean something: a reviewer who cannot see the test that exercises the change asks for it. The organisational defence is GitHub's rule that the requester's approval does not count, applied by agreement to Claude Code PRs as well.

The second failure is at merge. GIT-WORKFLOW.md says every PR is squash-merged so "each merge maps to one logical change." Our `main` has ten "Merge pull request" commits and no squashes as of 2 Sep 2026. Either the document or the button is wrong, and until one is fixed the history does not have the shape the reviewer was promised.

### Colour

Task-level: drafting the PR description from the commits is green. Reviewing is red; it is the judgement D1 says only a human can make. The agent's revisions in response to review are amber, with the reviewer approving again.

Gate mechanism (D1 s3): CI check (the four jobs, branch protection) and human (the approval). Nothing in this module is held by a skill or a CLAUDE.md line; `/git-feature` and `/verify` are conveniences that make the person and the agent do the same thing, not gates.

---

## Module 4: How harnesses are used

### The story

Claude Code has just written a Server Action and a Vitest file for it. The tests pass. That sentence is the trap this module exists for, because the agent wrote both sides of the exam.

So the developer does three things before believing it. First, they read the test and ask whether it could fail: a test that asserts the mock returned what the mock was told to return proves nothing. Second, they run the mutation tool, which deliberately breaks the code in small ways and checks that at least one test notices each break; a test suite that stays green while the code is broken is decoration. Third, they let CI run the parts a person will not: the security scan, the placeholder check, the audit. None of these three is optional, and none of them is the agent checking itself.

### The mechanics

Sort every harness by which of D1's three mechanisms holds it before writing its commands; a harness that turns out to be "an instruction in CLAUDE.md" is not a harness.

Hooks. Two layers exist in our repository, and they run in different processes. The git layer is `lefthook.yml` (Module 2). The agent layer is `.claude/settings.json`: a `PostToolUse` hook on `Edit|Write` that runs ESLint and Prettier on the touched file, and one that greps the file for `: any`, `as any` or `<any>` and exits 2 with "BLOCKED: Do not use `any`". In Claude Code, "Exit 2 means a blocking error," and on events that can block, "exit 2 blocks whether or not you print JSON: even a JSON `permissionDecision` of `"allow"` can't override it" ([code.claude.com/docs/en/hooks](https://code.claude.com/docs/en/hooks)). The stderr text is handed back to the model as the reason. This is the mechanism Alessio described on the Tuesday of the workshop, a pre-commit hook that "verifies every reference in a document is real," added after the model repeatedly invented citations (D2 v2, s4.5). The same file carries a `permissions.deny` list (`git push --force`, `git reset --hard`, `rm -rf`, `curl | bash`, and reads of `~/.ssh`, `~/.aws`, `*.pem` and `*.key`) that Claude Code enforces before the tool runs. Alessio's `.env` example from s4.5 (a CLAUDE.md line that says never reveal it "will not reveal it" most times, and once is enough) has its answer here, and it is one line the repository does not yet have: `Read(./.env)` in the deny list is not a probability. The settings documentation uses exactly that entry as its example ([code.claude.com/docs/en/settings](https://code.claude.com/docs/en/settings)).

CI checks. `.github/workflows/ci.yml` runs on every PR to `main` and every push to it: `pnpm run validate`, `pnpm run lint`, `pnpm run typecheck`, `pnpm run test:component`, `pnpm run test` (backend), and `pnpm audit --audit-level=high`. This is DORA's definition of the practice: "a suite of automated tests" on every commit and "a CI system that runs the build and automated tests on every check-in" with visible status ([dora.dev/capabilities/continuous-integration](https://dora.dev/capabilities/continuous-integration/)). Google runs the same idea at scale as a two-stage split, a fast presubmit subset before review and the full suite after, with a human Build Cop owning any failure and rollback as their first tool (Zafir's note, s2.3). Our repository has the presubmit half. There is no postsubmit suite because there is no integration layer: `docs/TESTING.md` is explicit that "there's no local emulator, so there's no integration-test layer against a real Firestore; all tests mock Firebase." Microsoft's SDL layers static analysis, credential and secret scanning, fuzzing and dependency checking on top of the non-author review (Chirag's note, s4); of that list we run dependency audit and ESLint, and nothing scans for committed secrets. Gap recorded.

The "are the tests correct" check. Slice 1 established the numbers (a median 48% of LLM-generated tests pass; roughly half of generated assertions are wrong). The operational answer is mutation testing, which our repository does not yet run but could with one dependency: StrykerJS ships a Vitest runner (`npm i --save-dev @stryker-mutator/vitest-runner`, then `npm init stryker` and `npx stryker run`; [stryker-mutator.io](https://stryker-mutator.io/docs/stryker-js/vitest-runner/)). The tool rewrites the code under test in small ways (flip a comparison, delete a line) and reruns the suite; a mutant that survives is a place the tests would not notice a bug. A junior does not need to read the theory. They need to know that a 100% green suite with a 40% mutation score is a suite that catches four bugs in ten.

Sub-agents. Our repository defines two: `test-writer` (Sonnet, writes Vitest tests to the project's conventions) and `security-reviewer` (Opus, audits staged changes for auth, validation, Firestore rules and secrets; `.claude/agents/`). Both are useful and neither is a gate. D1 section 3 is the reason: a sub-agent is "the same class of system as the agent it checks," so `security-reviewer` widens what gets looked at and cannot certify that nothing was missed. Alessio said the same thing as a rule of separation: "maybe you have a Claude agent that surveils another Claude agent, but definitely not itself" (D2 v2, s4.5). Fu et al. give the scale of what the human is checking for: about 30% of AI-generated snippets in real GitHub projects carried a security weakness across 43 CWE categories, and Copilot Chat fixed at most 55.5% of them even when handed the static-analysis warnings (Chirag's note, s6; [arXiv 2310.02059](https://arxiv.org/abs/2310.02059), TOSEM 2025).

### The human gate

A person reads the test before trusting it, decides what the mutation score has to be, and owns any red CI. In Google's terms that is the Build Cop; in ours it is whoever opened the PR. The agent-side hooks and the deny list are the only things in this module that hold without a person, and they hold exactly what a regular expression can hold: file patterns, forbidden commands, a type keyword.

### The failure mode

The green suite that tests nothing. It is silent, it is common (the slice 1 figures are median, not tail), and it is the specific failure a sub-agent cannot catch because it would write the same test. The second failure is the mirror image: a hook so aggressive it fails open. Our Prettier hook has `|| true` on it, which is a deliberate choice to keep formatting from blocking commits, and also a reminder that a hook only enforces what its exit code says.

### Colour

Task-level: generating a first-pass test file is green, with the mutation run as its check. Deciding what needs testing and whether the suite is adequate is red. Running CI is neither; it is the harness.

Gate mechanism (D1 s3): hook (lefthook, the Claude Code PostToolUse hooks, the deny list), CI check (four jobs, six commands), human (test adequacy). The two sub-agents are amber assists and are labelled as such.

---

## Module 5: Design-system enforcement in build

### The story

The notes page needs a layout. The developer asks Claude Code for one and gets a plausible screen with a blue primary button. The blue is `#3b82f6`, which is the placeholder value in `globals.css`, not a brand colour anyone chose. This is the workshop's brand-colours incident in miniature: the model "has been told it is like that, it just has not verified it" (D2 v2, s4.3). Nobody wants to review every generated screen against a style guide by eye.

So the team stops asking the model to know the brand and starts making the brand impossible to get wrong. The design system lives in the repository as CSS tokens. The model generates against them. After generation, the real design-system stylesheet is loaded on top of the output, and whatever visibly moves is the violation. Then the accessibility scanner runs, and the five failures it finds get fixed and written into a skill so the next page starts from the fix.

### The mechanics

This is the UX module and the one slice 1 flagged as source-silent in the engineering canon. The mechanics here come from Leon (practitioner input, supervisor review, 31 Aug 2026), the workshop record, and our own repository's design setup.

Tokens as the rule set. Our frontend uses Tailwind v4 with CSS-first configuration: there is no `tailwind.config.js`, and the design tokens are CSS custom properties inside an `@theme` block in `frontend/src/app/globals.css` (`--color-brand-500`, `--font-sans`, and so on; `docs/DESIGN.md`). DESIGN.md's rules are written for the agent: "always define a token first," "no inline `style=` attributes," no arbitrary values. That is Leon's principle in code form. Design systems are deterministic, so enforce them "as tool-chain constraints (the design system's HTML/CSS as the rule set)," closer to robotic process automation than to generation; generation is the wrong tool for enforcing a brand, and the fear case is a hallucinated off-brand logo. The workshop reached the same place from the accident: Alessio's fix for the wrong colours was to have the model learn the design system into the instructions file and regenerate, so "the correction went into the context, not the artifact" (D2 v2, s4.3). Slice 1 adds the caveat from D2 s4.5 that context is probabilistic, which is why the token file has to be enforced, not just described.

The overlay-diff check. Leon's mechanic, recorded in slice 1 as Stage 4 mechanic 4: let the AI generate the layout, then load the real design-system CSS afterwards so its rules override the generated ones; whatever visibly shifts (fonts, colours, spacing) is the violation. In our stack the operational form is a Playwright visual comparison. `await expect(page).toHaveScreenshot()` captures a reference on first run and fails on later runs when the rendered page differs; `npx playwright test --update-snapshots` re-baselines after an intended change ([playwright.dev/docs/test-snapshots](https://playwright.dev/docs/test-snapshots)). The recipe: render the generated page once with the token stylesheet forced on (the reference), once as generated (the candidate), and diff. A person reads the diff; the tool only says that something moved. This is not yet in our repository. It is the first thing to add for the D4 prototype build.

The accessibility harness. Team 6 at the workshop ran an external checker on their first page, found five or six WCAG 2.2 AAA failures, fixed them, and wrote the standard into a skill so later pages were generated against it; the count on the next page "drastically reduced" (D2 v2, s7.3). Slice 1 calls this the one worked example of amber-to-green migration in the record. The mechanical half is `@axe-core/playwright`: a scan per page, asserting `expect(accessibilityScanResults.violations).toEqual([])`, with Playwright's own warning attached that automated tests "can detect some common accessibility problems such as missing or invalid properties. But many accessibility problems can only be discovered through manual testing" ([playwright.dev/docs/accessibility-testing](https://playwright.dev/docs/accessibility-testing)). That matches ScreenAudit's figures from slice 1 (roughly 69% of expert-found errors caught, with a 29% false-positive rate). The skill half is the amber part: it makes the next generation better, and being a skill it does not guarantee anything.

The regulatory rule, ahead of the design work. Leon's instruction is to identify which regulations bind NBN Co before design begins and codify them as hard limits, with First Nations inclusive-design policy as the first UX rule to codify (slice 1, open question 7 and recommendation 8). In this module it is a placeholder with a shape: a rule that binds the AI "exactly as it binds human designers" is a deny rule or a hook, not a paragraph in CLAUDE.md. What the rule says is Slice 3's job.

Marked slot: Leon offered to write up his own green, orange and red example statements. They go here and in slice 1's "Reading the colours" when they arrive.

### The human gate

The designer. Brand and inclusion decisions are red in the spine and stay red here; what changes is that the designer no longer reviews the whole screen, they review a diff. The token file is authored by a person. The re-baseline command (`--update-snapshots`) is a human act with a review behind it, because a re-baseline is the moment a violation becomes the new reference.

### The failure mode

Two. The obvious one is the screen that passes every automated check and is still wrong for the user: the axe scan is clean, the tokens are honoured, and the layout makes no sense to the work-from-home parent in Leon's green example. Automation holds the deterministic half of design and none of the judgement half. The subtle one is drift by re-baseline: a developer under time pressure runs `--update-snapshots` to make a red test green, and the off-brand output is now the standard. The defence is the same as Module 3's: a re-baseline is a diff a reviewer reads.

### Colour

Task-level, per Leon: generating layout and copy against a fixed token set is green to orange, with the overlay diff as the check. Choosing the tokens, approving a re-baseline, and every brand or inclusion decision are red. Codifying regulation is red and comes first.

Gate mechanism (D1 s3): CI check (screenshot diff, axe scan) and human (designer). The WCAG skill is an amber assist and labelled as one; it improves the next generation and holds no gate.

---

## Module 6: Deploy mechanics

### The story

The notes PR merges. Nobody types a deploy command. Vercel's GitHub integration sees the push to `main`, builds `frontend/`, and the production URL is serving the new code within minutes. In parallel, the repository's own workflow would push the Firestore security rules if it were switched on; today it is not, so the rules deploy is a command a person runs. Stage 8 in the spine was "not reached, no evidence." Our repository has now reached it, and this module records what that looks like at our scale and what it would take to look like Microsoft's or Google's.

### The mechanics

What we run. `docs/CI-CD.md` describes two paths after merge: Vercel deploys the frontend through its own integration ("Every push to `main` auto-deploys to production from then on," with the same document adding that Vercel has no approval gate of its own, so merging to `main` is shipping), and `deploy.yml` pushes Firestore rules on every push while the backend Cloud Function is manual only. The second path is documented but not live: the workflow file in the repository is `deploy.yml_notinuse`. Firestore rules therefore deploy by hand, `npx firebase-tools deploy --only firestore:rules`, from a machine that has run `npx firebase-tools login`. The seven secrets the pipeline depends on are listed by name in `docs/local-setup.md` (six Firebase values plus `VERCEL_AUTOMATION_BYPASS_SECRET`), with where each was obtained, which is the handover record a replacement developer needs and the one document in the repository that should never contain a value. The live app is at the URL recorded in the same file.

Preview per PR. Vercel creates a preview deployment by default when you "push a commit to a branch that is not your production branch" or "create a pull request," each with its own generated URL, and "you'll typically see links appear in your Git provider's PR comments" ([vercel.com/docs/deployments/environments](https://vercel.com/docs/deployments/environments)). So every PR in Module 3 can carry a running copy of itself for the reviewer to click. Whether the links actually appeared on PRs #9 and #14 is a check on GitHub that this document cannot make; see "Gaps recorded". The `VERCEL_AUTOMATION_BYPASS_SECRET` exists because preview deployments are protected: automated tests reach them by sending the secret in an `x-vercel-protection-bypass` header, and Vercel's own example is a Playwright config that refuses to run without it ([vercel.com/docs/deployment-protection](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation)). That is how Module 5's screenshot and axe checks would run against a real preview rather than a local build.

The rollback. Vercel keeps every deployment; promoting a previous one is the revert, and it is a dashboard action rather than a git one. In git terms the equivalent is `git revert` of the merge commit and a new PR, which goes back through Module 3. There is no automated rollback in our setup; a person notices and a person reverts.

The scale-up story. Microsoft's Safe Deployment Process releases in rings (the development team, then employees, then selected external users, then everyone) with rollback strategies in place before deploying (Chirag's note, s4). Google gates releases behind role-based approvals for source changes, the build proposal, cherry-picks and "authorizing the actual deployment," matches rollout pace to the risk of the service, and keeps incident response with a human on-call and a blameless postmortem after (Zafir's note, s3 and s2.4). Slice 1 recorded the progressive-delivery mechanics (feature flags, canary with metric-gated automatic rollback) and the DORA evidence that "AI adoption does continue to have a negative relationship with software delivery stability." Nothing in that list is AI. Every one of them is a gate or a rate limit placed by people, and our repository has the smallest version: a single production environment, auto-deployed, with a human revert.

### The human gate

Merge is the deploy gate, because Vercel has none of its own. That makes Module 3's approval the last human decision before production, which is a reason to take it more seriously in this repository than the branch rule alone suggests. Firestore rules have a second, manual gate by accident of the disabled workflow. Incident response is entirely human and entirely undocumented here; Zafir's note describes what documented looks like (page, triage, escalate, postmortem).

### The failure mode

Shipping by merging. A reviewer who approves "to get CI green" has deployed. The mechanical fix, if the team wants one, is Vercel's option to disable auto-promotion and promote manually, which turns deploy back into a click a person makes ([vercel.com/docs/deployments/environments](https://vercel.com/docs/deployments/environments), production section). The second failure is the disabled workflow: a rules change merged to `main` and never deployed by hand leaves the database running on old rules while the app assumes new ones. That one has no automation catching it today.

### Colour

Task-level: the deploy execution is green in our setup, because it is a deterministic integration with no judgement in it, which is also why it has no gate. Deciding to ship, reverting, and anything after an incident are red. Rings and canaries, where they exist, are amber: automation ramps, a person promotes.

Gate mechanism (D1 s3): human (the merge approval, the manual rules deploy, the revert) and CI check (the four PR jobs, which are the only automated thing between a commit and production). No hook, no skill, no sub-agent holds anything in this module.

---

## Gaps recorded

These are places where the repository, its documentation, or the requirements file say something this slice could not confirm or found to be untrue. They are listed so nobody downstream builds on them.

1. Merge strategy. `docs/GIT-WORKFLOW.md` says every PR is squash-merged. `main` carries ten "Merge pull request" commits and no squash merges (checked 2 Sep 2026). Fix the document or the repository setting; Module 3 assumes the document is the intent.
2. Commit trailers. The requirements file named PR #9 as a live example of `Co-Authored-By` trailers. No commit on `main` has one. Claude Code's default attribution was never enabled in the project settings. Module 2 records this as the provenance failure mode. The commit that adds these modules carries one, so the first live example on any branch is this slice.
3. Branch protection. Documented as on. Checked on github.com, 3 Sep 2026: it is not. The repository has one ruleset, named "main", and it is active, but its branch target list is empty, so it applies to no branch, and it carries no required status checks rule. The evidence is in the history: PRs #8, #13 and #14 merged with zero approvals against a rule that asks for two. In practice, nothing server-side stops a direct push to `main` or a merge on a failing CI run; the only live gates are the lefthook commit-msg check and the four CI jobs as advisory status. Fixing the ruleset (add `main` as a target, require the CI jobs, decide whether administrators are included) needs repository admin, which sits with the owner account. Until that is done, every mechanic in Module 3 that rests on branch protection is documented practice, not observed practice, and D1 section 5 items 4 and 6 (review on PR #20) should not describe it as live.
4. Preview deployments. Vercel's default is a preview per PR with the URL in a PR comment. Confirm on PRs #9 and #14 that the comment appeared; if not, the Vercel project's Git integration is not wired to this repository the way `CI-CD.md` assumes.
5. `deploy.yml` is renamed `_notinuse`. Firestore rules deploy by hand. `CI-CD.md` describes the workflow as live.
6. Secret scanning. Microsoft's SDL has it; our CI does not. `pnpm audit` checks dependencies, not committed strings. A `detect-secrets` or `gitleaks` step is one job in `ci.yml`.
7. No integration or end-to-end layer. `TESTING.md` records it; Modules 4 and 5 depend on adding Playwright, which is not yet a dependency.
8. Zafir's spike timings and Leon's colour statements: marked slots in Modules 3 and 5, not blockers.

## What this unblocks

Ahmed (requirements, pass 2): each module's gate and failure mode is a requirement in waiting. The specific ones to lift are the one-change-per-commit rule (M2), the non-author approval and "requester's approval does not count" rule (M3), a mutation-score threshold and secret scanning (M4), the token-file-as-rule and re-baseline review (M5), and manual promotion or an explicit statement that merge is deploy (M6).

Sidney (board breakdown, slice 2): six modules, each with a story, mechanics, gate, failure mode and colour, map to six cards; the gaps list is a seventh card of small verification tasks (items 1, 3, 4 and 5 are each under fifteen minutes).

Zafir (spike INF-6a, second pass): Modules 3 and 4 carry the slots the spike fills. The ratio asked for is generating time against reviewing time per task; Module 4 adds a second number the spike could capture cheaply, the mutation score of an agent-written test file before a person touches it.

## Citation record

External sources introduced in this slice, fetched 2 Sep 2026. Sources inherited from slice 1 are covered by `citation-audit.md`.

| Source                                                                                                                          | Used in | Checked                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Conventional Commits 1.0.0, conventionalcommits.org                                                                             | M2      | Quote on type/scope/colon verified verbatim; footer-as-trailer sentence verified                                                                                               |
| git-interpret-trailers, git-scm.com                                                                                             | M2      | Trailer definition and `Signed-off-by` example verified                                                                                                                        |
| Claude Code settings reference, code.claude.com                                                                                 | M2, M4  | `attribution.commit` key and default trailer text verified; `permissions.deny` verified                                                                                        |
| Claude Code settings, code.claude.com                                                                                           | M4      | `Read(./.env)` deny-rule example verified                                                                                                                                      |
| Claude Code hooks, code.claude.com                                                                                              | M4      | "Exit 2 means a blocking error" and the permissionDecision sentence verified verbatim                                                                                          |
| Watanabe et al., arXiv 2509.14745 (HTML v1)                                                                                     | M2, M3  | 40.0% vs 12.2%, 83.8% vs 91.0%, 3.3% "too large or complex" verified in the full text; the 41.1% post-merge figure is from Zafir's note and was not located in the HTML render |
| GitHub Docs, about protected branches                                                                                           | M3      | Three quotes verified verbatim, including the admin-bypass default                                                                                                             |
| GitHub Docs, reviewing Copilot PRs                                                                                              | M3      | "Approve and run workflows" default, "your approval won't count", `@copilot` mention verified                                                                                  |
| Aðalsteinsson et al., arXiv 2505.16339                                                                                          | M3      | Two-shape design and AI-led preference verified from the abstract; the count of ten developers is from Chirag's note                                                           |
| Fu et al., arXiv 2310.02059 (TOSEM 2025)                                                                                        | M4      | 733 snippets, 29.5% Python / 24.2% JavaScript, 43 CWEs, 55.5% fix rate verified                                                                                                |
| DORA, continuous integration capability                                                                                         | M4      | Practice definition verified                                                                                                                                                   |
| StrykerJS Vitest runner, stryker-mutator.io                                                                                     | M4      | Package name and install line verified; `npm init stryker` / `npx stryker run` verified on the getting-started page                                                            |
| Playwright visual comparisons                                                                                                   | M5      | `toHaveScreenshot`, first-run baseline, `--update-snapshots` verified                                                                                                          |
| Playwright accessibility testing                                                                                                | M5      | `@axe-core/playwright`, the `violations` assertion, and the manual-testing caveat verified verbatim                                                                            |
| Vercel environments                                                                                                             | M6      | Preview-per-PR default, PR-comment links, and manual promotion verified                                                                                                        |
| Vercel protection bypass for automation                                                                                         | M6      | Secret name, header name and Playwright example verified                                                                                                                       |
| Our repository (`lefthook.yml`, `scripts/`, `.claude/settings.json`, `.claude/agents/`, `.claude/skills/`, `.github/`, `docs/`) | all     | Read at commit `a0049c2` on `main`, 2 Sep 2026                                                                                                                                 |
| D2 v2 s4.3, s4.5, s7.3; D1 s3, s6; Zafir's and Chirag's notes                                                                   | all     | Internal, quoted from the current versions                                                                                                                                     |
| Leon Gouletsas, supervisor review 31 Aug 2026                                                                                   | M5      | Practitioner input, recorded; outside the source ranking                                                                                                                       |
