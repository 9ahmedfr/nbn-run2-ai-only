The security scanning user story (US 13) was adapted. The broader goal of the project is to identify areas of the software development lifecycle where AI can provide a meaningful improvement, rather than applying AI uniformly to every development activity. For US 13, the objective was to detect accidentally committed secrets, such as API keys, access tokens, passwords, or other credentials, before they are merged into the main branch.

Generative AI was not selected for this use case because secret detection is already well supported by mature deterministic tools. Traditional secret scanners use predefined rules, regular expressions, known credential formats, entropy checks, and allowlists to identify values that resemble exposed credentials. This approach is well suited to the problem because many secrets follow predictable structures, such as provider-specific API key prefixes or token formats. As a result, deterministic tools can perform this task quickly, consistently, and with relatively low computational overhead.

Using Generative AI would provide limited benefit for this requirement while introducing additional complexity. An AI-based scanner could produce less predictable results, may require an external service or additional infrastructure, and could create privacy concerns if source code had to be sent to a third-party model for analysis. It would also be more difficult to guarantee that the same input always produces the same result. In contrast, a rule-based scanner can be incorporated directly into the CI pipeline and will reliably fail the build when a configured secret pattern is detected. For a clearly defined security check such as exposed credential detection, this deterministic behaviour is desirable.

To satisfy the user story, existing secret-scanning tools were investigated with the intention of integrating one into the repository's continuous integration workflow. Gitleaks was considered because it is designed specifically to detect secrets in Git repositories and can be executed automatically as part of GitHub Actions. The intended implementation was to run the scanner whenever a pull request targeting the main branch was opened or updated. If a likely secret was detected, the CI security check would fail, preventing the change from being merged until the exposed value had been removed or otherwise resolved.

This approach directly addressed the acceptance criteria of US 13. Secret scanning would run automatically on pull requests, a detected credential would cause the CI check to fail, and branch protection or required status checks could be used to ensure that the pull request could not be merged while the security scan was failing. This also integrates naturally with the repository's existing security CI job, which already performs dependency vulnerability scanning.

The investigation therefore demonstrated that Generative AI was not necessary to improve this part of the SDLC. Instead, the most appropriate solution was to use a specialised deterministic security tool. This reflects the project's broader principle that AI should be introduced where it provides a clear advantage over existing approaches, rather than replacing reliable conventional tools simply for the sake of using AI.

### Implementation

Gitleaks was added to the existing GitHub Actions workflow so that secret scanning runs automatically on pull requests targeting the `main` branch.

The action used was:

```yaml
- name: Secret scan
  uses: gitleaks/gitleaks-action@v3
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The repository checkout used for this job was changed to:

```yaml
- uses: actions/checkout@v6
  with:
    fetch-depth: 0
```

The full Git history was required because Gitleaks scans the Git commit range associated with the pull request. Without `fetch-depth: 0`, the runner did not contain all of the commits Gitleaks attempted to inspect.

### Verification of Dependencies

Before relying on the generated workflow, the action versions were checked against their official repositories.

`gitleaks/gitleaks-action@v3` was confirmed to be a valid supported major version. `actions/checkout@v6` was also confirmed to be available. The repository previously used `actions/checkout@v4` in other CI jobs, so the difference was reviewed rather than assuming the generated version was correct.

This verification step was important because AI-generated configuration should not be accepted without checking the relevant tool documentation.

### Initial AI-Generated Configuration and Correction

The initial implementation successfully identified Gitleaks as an appropriate tool and produced a suitable GitHub Actions configuration. However, the first version did not include:

```yaml
fetch-depth: 0
```

As a result, the Gitleaks job failed with an error due to GitHub Actions performing a shallow checkout by default, while Gitleaks attempted to inspect a wider range of commits from the pull request.

The workflow was corrected by changing the checkout step to:

```yaml
- uses: actions/checkout@v6
  with:
    fetch-depth: 0
```

After this correction, Gitleaks was able to scan the pull request commit history successfully.

This demonstrated that the AI-generated solution was useful as a starting point, but still required human review, execution, and troubleshooting.

### Secret Detection Test

A temporary file named:

```text
gitleaks-test.txt
```

was created at the root of the repository on a dedicated test branch.

The first dummy values used for testing were not detected because they did not match any of Gitleaks' configured secret patterns closely enough. A test value based on a known AWS access-key pattern was then used.

The CI run successfully detected the test credential and produced output including:

```text
Finding: AWS_ACCESS_KEY_ID=REDACTED
RuleID: aws-access-token
File: gitleaks-test.txt
leaks found: 1
```

The Gitleaks job failed as expected. This demonstrated that the CI pipeline satisfied the acceptance criterion requiring the check to fail when a likely secret is detected.

### Secret Removal and Git History

The temporary file was then deleted and another commit was pushed. However, the Gitleaks job continued to fail.

This happened because deleting the file in a later commit did not remove the secret from the earlier commit in the pull request history. Gitleaks continued to detect the original commit containing the credential.

This behaviour is desirable for real security incidents because simply deleting an exposed credential from the latest version of a repository does not remove it from Git history.

In a real incident, an exposed credential would need to be revoked or rotated, even if the Git history were cleaned.

### Prompt Given to the AI Agent

The exact prompt supplied to the AI agent verbatim was:

> [Identify and compare tools for secret scanning in the GitHub Actions CI pipeline (AI vs. Non-AI). Integrate it with the existing security checks.]


### What the AI Produced and What Required Correction

The AI was useful for identifying Gitleaks as a suitable secret-scanning tool, proposing a GitHub Actions configuration, explaining how the job should integrate with the existing CI pipeline, and helping interpret CI failures.

However, the generated solution was not accepted without review. The most significant issue was the missing `fetch-depth: 0` configuration. This caused the initial Gitleaks execution to fail because the required Git commit history was unavailable.

The testing process also showed that arbitrary fake API-key strings were not necessarily detected. The test credential had to match a secret format covered by Gitleaks' rules. This reinforced the need to understand how the deterministic scanner operates rather than assuming any suspicious-looking string would trigger it.

The final implementation therefore resulted from a combination of AI assistance, official documentation, CI execution, and manual debugging.

### Time Comparison

The time spent on generation and review should be recorded separately.

| Activity                                                   | Approximate time |
| ---------------------------------------------------------- | ---------------: |
| AI generation of initial Gitleaks configuration            |      [10 minutes] |
| Reviewing generated workflow                               |      [15 minutes] |
| Verifying action versions against documentation            |      [15 minutes] |
| Running the initial CI test                                |      [5 minutes] |
| Diagnosing the missing `fetch-depth: 0` issue              |      [30 minutes] |
| Testing secret detection                                   |      [40 minutes] |
| Cleaning the test branch and confirming the passing result |      [30 minutes] |

This comparison is useful because it shows that AI can reduce the time required to produce an initial implementation, but review and validation still represent an important part of the development process.

### Conclusion

AI earned its place in this task as a development assistant rather than as the security mechanism itself. It was useful for quickly proposing the CI configuration, explaining tool behaviour, and assisting with troubleshooting. This reduced the effort required to reach a working implementation.

However, AI did not provide a meaningful advantage for the actual detection of secrets. Gitleaks already provides a specialised, deterministic, rule-based solution that is fast, predictable, and well suited to automated CI checks.

Human review also remained necessary. The initial configuration required correction, the CI logs had to be interpreted, the generated action versions had to be verified, and the secret-detection behaviour had to be tested experimentally.

The most appropriate use of AI in US 13 was therefore to assist the developer in implementing and debugging the SDLC tooling, while the actual security decision remained the responsibility of a deterministic scanner and human verification.
