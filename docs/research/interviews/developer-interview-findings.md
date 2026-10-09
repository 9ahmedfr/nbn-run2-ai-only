# Developer Interview Findings

**Owner:** Ahmed Falulur Rahuman  
**Interviews completed:** 2  
**Purpose:** Validate, challenge and extend the findings from the existing SDLC research.

---

## Interview 1 - Ben Philip

**Date:** 12 September 2026  
**Audience:** Experienced developer / architect

### Findings

| Finding | Research area | Result |
| --- | --- | --- |
| AI is useful for small and well-scoped development tasks, but unrestricted agent access to make broad codebase changes is avoided. | Slice 1 - Governance thresholds / Module 6.8 - Guardrails | Confirms |
| AI output can vary between runs, so generated work still requires human verification. | Slice 1 - Verification | Confirms |
| AI can review and summarise pull requests, but final pull-request approval remains a human responsibility. | Module 6.3 - Branches and merges | Confirms |
| AI is useful for documentation and generating first iterations, but those outputs still require review and refinement. | Module 6.7 - Collaboration with an agent | Confirms |
| Passing AI-generated tests does not necessarily prove that the implementation meets the intended requirement. Tests may simply reflect the existing implementation. | Module 6.4 - Harnesses and testing | Adds |
| Ben's team does not currently identify AI-generated code directly in the repository. Git history continues to attribute the change to the human committer. | Module 6.10 - Liability, provenance and code authorship | Adds |
| Human approval remains necessary where accountability and legal obligations are involved. | Modules 6.10 and 6.12 | Confirms |

### Key takeaway

Ben's experience supports using AI as a scoped development assistant rather than giving it unrestricted autonomy. AI can accelerate coding, documentation and review, but human verification and approval remain important.

His testing example also highlights that verification should be based on the intended requirement, rather than relying only on whether generated tests pass.

---

## Interview 2 - Huynh Thanh Thien Pham

**Date:** 17 September 2026  
**Audience:** Experienced software developer working in an AI-assisted development environment

### Findings

| Finding | Research area | Result |
| --- | --- | --- |
| Large AI-assisted features begin with business requirements, specifications and a detailed implementation plan before development starts. | Stage 2 - Requirements / Module 6.1 - Issue to branch | Confirms |
| AI performs poorly when asked to implement a large feature without sufficient business context and planning. | Slice 1 - Context and human involvement | Confirms |
| Business requirements originate from client operations and human knowledge before being provided to AI. | Stage 2 - Requirements | Confirms |
| AI-generated designs often need several iterations to align with business requirements and the existing design language. | Stage 4 - Design | Confirms |
| Before accepting AI-generated work, business logic, code logic and especially data design are checked. | Slice 1 - Verification | Adds |
| AI may overcomplicate data structures by creating more tables and relationships than are required. | Architecture / build mechanics | Adds |
| The organisation records which AI model was used to implement individual stories. | Module 6.10 - Liability, provenance and code authorship | Adds |
| Responsibility for AI-assisted work remains with the human who owns the implementation. | Module 6.10 - Liability and provenance | Confirms |
| AI tools can access the wider codebase, but implementation is normally scoped to a particular feature or area rather than allowing one prompt to alter the entire repository. | Module 6.8 - Guardrails | Confirms |
| AI is used to assist with merge-conflict resolution and deployment through an established CI pipeline. | Modules 6.3 and 6.6 | Adds |

### Key takeaway

This interview represents a considerably more AI-intensive workflow than Interview 1. AI performs most implementation work, but human contribution remains important in gathering business context, defining the plan and validating critical decisions and outputs.

---

## Cross-interview findings

The two interviews represent substantially different levels of AI adoption.

Ben described a relatively cautious approach where AI is mainly used as a scoped assistant and broad autonomous changes are avoided.

Huynh Thanh Thien Pham described an environment where AI is involved throughout almost the entire development workflow, including implementation, conflict resolution and deployment.

Despite this difference, both interviews support several common findings:

- AI performs better when given clear requirements and context.
- Human validation remains important for critical outputs.
- Humans remain responsible for the final result.
- AI autonomy should be scoped rather than unconstrained.
- AI can substantially reduce implementation effort when the task is sufficiently defined.

### Provenance difference

The interviews showed different practices for recording AI involvement.

Ben's team does not record AI-generated portions of repository code directly, while Huynh Thanh Thien Pham's organisation records the AI model used when implementing each story.

This indicates that provenance is relevant, but there is not yet one consistent practice across the two environments interviewed.

---

## Audience coverage

Both completed interviews represent the experienced-developer end of the audience.

The junior or student audience was not represented in these interviews. This is recorded as a limitation of the current interview sample.

---

## Contradictions and challenges

No interview finding directly invalidated an existing research slice.

However, two areas should be considered when the research and model are revised:

1. The amount of AI autonomy used in practice varies substantially between organisations.
2. AI provenance practices also vary substantially between organisations.

These findings have been raised with Zac so they can be considered when the published research and lifecycle model are next revised.