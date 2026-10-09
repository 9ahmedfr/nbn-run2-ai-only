# Citation Audit, Research Slice 1 (The Spine)

**Purpose:** Independent verification of every citation in the Slice 1 spine document before team/sprint review, per reviewer problem #3 ("open every URL, check every quoted figure against the source, cut anything you can't confirm").

**Method:** 63 falsifiable claims extracted and grouped by source; each fetched live (WebFetch) with WebSearch fallback to confirm the identifier (arXiv ID / DOI / URL) resolves to the claimed title/authors/venue and that quoted figures and wording match the real source.

**Headline result:** 48 verified · 14 partially verified · 1 mismatched · **0 fabricated**. No arXiv ID, DOI, or URL is invented, but 15 citations need edits (4 substantive) before circulation.

---

## A. Reviewer's four flagged suspects

| Suspect | Verdict | Finding |
|---|---|---|
| TOSEM DOI 10.1145/3699598 | ✅ Genuine | Real assertion-generation TOSEM paper (Zhang, Sun et al.); both accuracy ranges match. Fix year: 2025 not 2024. |
| Flagger 99%/sub-500ms p99/rollback-after-5 | ✅ Genuine | Canonical official Flagger canary example (`threshold: 5`, `request-success-rate min 99`, `request-duration max 500`). |
| Apiiro 2.5× CVSS 7.0+, ~10k/mo | ✅ Verified | Confirmed via CSO Online / CSA / Cerbos citing the same Apiiro study (Apiiro page 403'd fetcher). |
| Faros 21% tasks / 98% PRs | 🟡 Figures OK, quote fabricated | Figures real; the "no evidence that organizations with strong pre-AI engineering performance are insulated…" sentence is **not in the report**. Cut the quote. |

---

## B. Citations requiring action (15)

### Substantive (fabricated or wrong figures / attribution)

| Ref | Claim in doc | Verdict | Action |
|---|---|---|---|
| C22 | MS SDL: "requirements, threat modeling, and testing are not deferred to the end…" cited to learn.microsoft.com | 🔴 Mismatched | Quote is real but from **securityjourney.com** (3rd-party blog), NOT Microsoft. Re-source to Microsoft's own SDL text or re-attribute (downgrades the evidence). Load-bearing for the Stage-order "shift-left" challenge. |
| C50 | Schäfer TSE: "68.2% median coverage; compilation success 57–89% across models" | 🟡 Partial | 68.2% is real (but code-cushman-002 specifically, not overall median). **"57–89% compilation success" is not in the paper**, cut it; the paper's figure is passing tests 9.9–80.0%, median 48%. Also venue year formally 2024 (online Nov 2023). |
| C54 | Cui et al.: "n≈1,974; 12–22% effects" | 🟡 Partial | Both figures wrong. Real: combined **n=4,867**; headline **+26.08% (SE 10.3%)** PRs. Individual arms ~1,500/~300/~3,000. |
| C61 | Faros: figures + "no evidence… insulated from quality degradation" | 🟡 Partial | Keep 21% tasks / 98% PRs / org-metrics-flat. **Drop the quoted sentence**, not in source. |

### Minor (dates / labels / de-quoting)

| Ref | Issue | Action |
|---|---|---|
| C7 | DORA post date given as 23 Sept 2025 | Correct to **24 Sept 2025**. |
| C51 | TOSEM assertion paper dated 2024 | Correct to **2025** (published Feb 2025). |
| C58 | Pearce CACM 68(2) dated January 2025 | Correct to **February 2025**. |
| C14 | "Tests: Does the code have correct and well-designed automated tests?" as a Google quote | Not verbatim. Use real bullets: "Code has appropriate unit tests." / "Tests are well-designed." |
| C34 | Copilot "picks up issues you assign, explores the repo…" as a docs quote | Substance right, wording stitched. De-quote or reword. |
| C35 | Copilot "Assigning an issue always creates a pull request" as a docs quote | "requests review when finished" + "every step in a commit/logs" are supported; "always creates a PR" is overstated (docs present PR creation as configurable). Reword. |
| C36 | Copilot "automates branch creation, commit message writing and pushing, PR opening, and PR description writing" | First clause near-verbatim; full sentence stitched from >1 source. Page renamed to **"About GitHub Copilot cloud agent."** |
| C38 | Copilot prompt-injection: "Users can include hidden messages…as a form of prompt injection" | Risk is real; wording not verbatim. Actual page: "filters hidden characters that might allow users to hide harmful instructions." Reword. |
| C1 | DORA TBD: "fewer than three active branches… very short lifetimes (e.g. <1 day)… forks… mainline" | Page says **"three or fewer"**; branch lifetime **"no more than a few hours"**; no "forks"/"mainline." The "<1 day / forks / mainline" phrasing is *Accelerate*, not this page. Fix wording or re-attribute. |
| C17 | Google ML-completion "1.9× in six weeks as trust developed" | 1.9× is exact but **Go-specific, with semantic-engine checking**; source credits the semantic engine, not "trust." Drop the trust gloss / the red→green micro-migration reading. |
| C33 | MS observability "automated delivery with human-owned alerting/incident response/SLOs" | Pillars (dashboard/logging/metrics/tracing) match; the framing is your synthesis, not the page's words. Mark as synthesis. |

---

## C. All 63 citations, verdict index

Legend: ✅ verified · 🟡 partial · 🔴 mismatched

- **C1** 🟡 DORA TBD definition, wording stitched (see B)
- **C2** ✅ DORA deployment-automation definition, verbatim
- **C3** ✅ DORA continuous-integration page exists
- **C4** ✅ DORA "tests find real failures and only pass releasable code", verbatim
- **C5** ✅ DORA small-batches "AI can easily generate massive blocks…", verbatim (Google Cloud blog, 10 Dec 2025)
- **C6** ✅ DORA 2025 "AI doesn't fix a team; it amplifies…", first sentence verbatim; follow-on sentences faithful paraphrase
- **C7** 🟡 DORA "negative relationship with stability", quote OK, date 23→24 Sept 2025
- **C8** ✅ Seven-capability model, all seven correct (official labels slightly longer)
- **C9** ✅ DORA 2024: 1.5% throughput / 7.2% stability drop per 25% AI adoption, exact
- **C10** ✅ DORA 2025 throughput reversal, confirmed
- **C11** ✅ ~30% little/no trust in AI code, exact
- **C12** ✅ "From adoption to impact" (10 Dec 2025), user-centric warning, verbatim
- **C13** ✅ Google review "the code is well-designed" / design most important, verbatim
- **C14** 🟡 "Tests: Does the code have correct…", not a real quote (see B)
- **C15** ✅ SWE at Google Ch.9 "correctness and comprehension check…", verbatim
- **C16** ✅ ML completion: 6% iteration cut, 25%/34% acceptance, 10k+ Googlers, all exact
- **C17** 🟡 "1.9× in six weeks", figure exact; "as trust developed" unsupported, Go-specific (see B)
- **C18** ✅ "write CLs smaller than you think you need", verbatim
- **C19** ✅ HEART + Goals-Signals-Metrics, Rodden/Hutchinson/Fu (CHI 2010), correct
- **C20** ✅ MS SDL "clearly defined security and privacy requirements… Development teams define these", verbatim
- **C21** ✅ SDL practice #1 "Establish security standards, metrics, and governance", correct
- **C22** 🔴 SDL "shift-left" quote, misattributed to Microsoft; actually securityjourney.com (see B)
- **C23** ✅ Playbook Team Manifesto + Working Agreement pages exist
- **C24** ✅ Playbook Definition of Ready page + checklist exist
- **C25** ✅ Playbook Minimal Slices page exists
- **C26** ✅ Playbook Azure DevOps pairing custom-field recipe exists
- **C27** ✅ Playbook Envisioning & Problem Formulation + Generic Envisioning Summary exist (live path /machine-learning/)
- **C28** ✅ Design Reviews "front-loaded before implementation" + "pivot… much more costly", verbatim
- **C29** ✅ ADR template 0001-record-architecture-decisions exists
- **C30** ✅ Trade Study template exists
- **C31** ✅ Technical Spike template exists
- **C32** ✅ DevSecOps detect-secrets + container/dependency scanning, confirmed
- **C33** 🟡 Observability pillars match; "automated delivery/SLOs" framing is synthesis (see B)
- **C34** 🟡 Copilot "picks up issues you assign…", substance OK, not verbatim (see B)
- **C35** 🟡 Copilot "assigning an issue always creates a PR…", partly overstated (see B)
- **C36** 🟡 Copilot "automates branch creation…", first clause verbatim, rest stitched; page renamed (see B)
- **C37** ✅ @copilot mention / "Fix with Copilot" button / "Approve and run workflows" gate, all verbatim
- **C38** 🟡 Copilot prompt-injection, risk real, wording not verbatim (see B)
- **C39** ✅ gh-aw assign-to-agent, target: "triggering", documented exactly
- **C40** ✅ Quattrocchi et al. arXiv 2507.15157, title/authors/quote all match
- **C41** ✅ ALAS study (Springer XP 2024, 10.1007/978-3-031-61154-4_8; arXiv 2403.09442), six teams, Austrian Post
- **C42** ✅ Multi-agent RE (Sami et al., SEAA 2025, 10.1007/978-3-032-04200-2_12), quote matches
- **C43** ✅ CoMPosT (Cheng, Piccardi, Yang, EMNLP 2023, 2023.emnlp-main.669), "susceptible to caricature" exact
- **C44** ✅ De Paoli, CHI 2024 EA (10.1145/3613905.3650860), indistinguishable/viable personas
- **C45** ✅ ScreenAudit (arXiv 2504.02110, CHI 2025), 69.2% / 71.3% / 31.3% all exact
- **C46** ✅ Guerino et al. (arXiv 2506.16345, INTERACT 2025), both quotes verbatim
- **C47** ✅ NN/g Synthetic Users (Rosala & Moran, 21 June 2024), both quotes verbatim
- **C48** ✅ EvAlignUX + GeneyMAP, both genuine CHI 2025 publications
- **C49** ✅ MS "Kill Your Personas" (Margaret P) + "solve for one, extend to many", confirmed
- **C50** 🟡 Schäfer TSE, 68.2% real; "57–89% compilation" not in paper (see B)
- **C51** 🟡 TOSEM assertion DOI, genuine, ranges match; year 2024→2025 (see B)
- **C52** ✅ MDPI review (2504-4990/7/3/97, MAKE journal 2025), EvoSuite-outperforms claim supported
- **C53** ✅ Peng et al. arXiv 2302.06590, 55.8%, CI 21–89%, p=0.0017, n=95, HTTP task, all exact
- **C54** 🟡 Cui et al., genuine study, but n≈1,974 and 12–22% figures wrong (real: 4,867 / +26.08%) (see B)
- **C55** ✅ METR arXiv 2507.09089, 16 devs, 246 tasks, 24%/20%/+19%, snapshot framing, all exact
- **C56** ✅ Veracode (30 July 2025), 45% / Java 72% / XSS 86% / log-inj 88% / flat-with-scale, all exact
- **C57** ✅ Apiiro, 2.5× CVSS 7.0+ and ~10k/mo (June 2025) confirmed via secondary sources
- **C58** 🟡 Pearce CACM 68(2), all correct except month (Jan→Feb 2025) (see B)
- **C59** ✅ Amro & Alalfi arXiv 2509.13650, "fewer than 20 comments… spelling/style" quote verbatim
- **C60** ✅ GitHub RCT, +3.62%/+2.94%/+2.47%/+4.16% and "5% more likely to approve", all exact
- **C61** 🟡 Faros, figures real, attributed quote fabricated (see B)
- **C62** ✅ Flagger config, canonical official example, correctly represented
- **C63** ✅ Teresa Torres continuous-discovery "overlap and interweave", attribution sound (page-level wording via secondary sources)

---

*Generated by the deep-research citation-verification workflow (14 agents, 63 claims, live-source fetch). Verdicts reflect sources as of the audit run.*
