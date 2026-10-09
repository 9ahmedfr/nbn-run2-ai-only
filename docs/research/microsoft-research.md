
# Source Note — [Microsoft]

**Author:** Chirag Wadehra

**Date:** 22 August, 2026

**Time spent:** 

## 1. Sources

| # | Source | Type | Date accessed |
|---|---|---|---|
| S1 | https://www.microsoft.com/en-us/power-platform/topics/phases-of-the-software-development-lifecycle | Documentation | 22 August, 2026|
| S2 | https://learn.microsoft.com/en-us/compliance/assurance/assurance-security-development-and-operation | Documentation | 22 August, 2026|
| S3 | https://learn.microsoft.com/en-us/compliance/assurance/assurance-microsoft-security-development-lifecycle | Documentation | 22 August, 2026|
| S4 | https://arxiv.org/pdf/2310.02059 | Empirical Paper | 23 August, 2026 |
| S5 | https://arxiv.org/pdf/2505.16339 | Empirical Paper | 23 August, 2026 |

## 2. The lifecycle stages, in their words
S1 is the official documentation from Microsoft describing the Software Development Life Cycle (SDLC). Microsoft defines the SDLC as a structured methodology for developing software that meets quality standards and security requirements. 


Microsoft divides the SDLC into seven stages:

### Planning
Microsoft describes planning as the phase that lays the foundation for the entire project. During this stage, the development team defines the goals for the project and identifies what is required to achieve them.

The team must consider stakeholder needs and expectations, as well as the overall feasibility of the project. This includes determining how the application will be built, when it should be deployed, and whether the required resources, such as time and budget, are available.

Microsoft considers this stage crucial because effective planning helps ensure that everyone involved understands what the software is expected to provide and reduces the risk of technical problems, unexpected costs, or delays later in the development stage.

### Analysis
Microsoft describes Analysis as the stage where the project plan and software requirements, derived during planning, are examined in more detail to determine how the solution should function.

The findings from this analysis are then used to create detailed system specifications, which help guide the later stages of the SDLC.

Microsoft also suggests using tools such as use-case diagrams and data-flow diagrams to visually represent the software's functionality and structure. These diagrams can help the development team better understand how the proposed solution should operate and verify that it aligns with stakeholder requirements before development begins. This reduces the likelihood of misunderstandings and costly rework during later stages of the SDLC.

### Design
Microsoft describes Design as the phase where the requirements identified during the earlier stages are used to define the overall architecture of the software and determine how its key components will interact.

The team creates detailed system designs and models to help check whether the proposed solution is likely to satisfy user and stakeholder expectations, while also uncovering possible problems before implementation begins.

Microsoft also suggests using established design patterns to speed up this phase by providing proven solutions to common design problems. In addition, prototyping tools can be used to visualise the user interface and system functionality before development begins.

### Development
Microsoft describes Development as the stage where the requirements and designs produced during the earlier phases are translated into actual code. By the end of this stage, the implementation should be complete and functional, ensuring that it is ready for testing and deployment.

Microsoft explains that development is usually iterative, meaning developers may repeatedly revisit and refine their code to fix technical issues or respond to changes in requirements.

Microsoft also recommends close collaboration within the development team, supported by coding standards and guidelines that help keep the code consistent, readable, and maintainable. In addition, version control systems can be used to track and manage changes made throughout development.

### Testing
Microsoft describes Testing as the phase where the software produced during development is evaluated before it can move toward deployment. This helps the team determine whether the solution satisfies user needs, stakeholder expectations and security requirements.

Microsoft notes that the exact testing approach depends on the project, but common forms of testing include:
- Unit Testing
- Integration Testing
- System Testing
- User Testing

Microsoft also recommends preparing a testing plan that defines what will be tested, when testing will occur and what each test is intended to verify. This ensures that the testing process remain organised and focused.


### Deployment
This stage takes place after testing has confirmed that the software meets the necessary requirements and standards.

Microsoft suggests starting by compiling the final build of the software and preparing the production environment. The resources and tasks required for deployment should then be coordinated to support a smooth release.

Microsoft also recommends having rollback strategies in place so that, if problems occur during deployment, the system can be restored to a previous stable state.


### Maintenance
Microsoft describes Maintenance as a continuous phase that begins after the software has been deployed. The purpose of this stage is to keep the software working correctly, secure and aligned with changing user needs over time.

Microsoft identifies several key activities during this phase:
- Monitoring system performance
- Gathering user feedback to identify possible improvements
- Fixing bugs
- Providing updates, including new features and security improvements
- Offering support to help users understand and use the software


## 3. Human approval gates
Microsoft documentation identifies multiple points where human approval is required before software changes are allowed to progress.

### Code review before integration
Microsoft's Security Development Lifecycle (SDL) requires code to undergo manual review by someone other than the engineer who wrote the code before it can be checked into a release branch. The reviewer checks whether the change meets the relevant SDL and design requirements and whether the required functional and security tests have been passed.

If problems are identified, the reviewer can request changes or block the code from progressing. Once the code is considered satisfactory, approval from the reviewer is required before it can move to the next deployment phase.

### Final security and privacy review
Microsoft also states that new features and material changes undergo a final security and privacy review before release to confirm that the required security and privacy requirements have been satisfied.

## 4. Mechanics inside each stage

### Planning and Analysis
During Planning and Analysis, the project goals, stakeholder expectations, feasibility, resources and software requirements are established. These requirements are then translated into more detailed system specifications that guide the later stages of the development.

During this phase, Microsoft also adds security and privacy requirements. These are determined based on various factors such as the type of data being handled, known threats, regulations, industry requirements and lessons learned from previous incidents.

### Design
During Design, the architecture and interaction between the different components of the system are defined.

Microsoft's SDL create threat modelling during this stage. Through this modelling, the development teams can identify important components of the system and examine how they interact during critical scenarios such as Authentication, in order to identify possible security threats. Microsoft also recommends to create Data-flow diagrams to represent how the information moves through the system, allowing for easier identification of threats.

Any threats that are identified during this stage are evaluated and appropriate mitigations are added to the system's security requirements. Microsoft also requires threat models to be reviewed before a product is released.

### Development
During Development, developers implement the requirements and designs produced during the earlier stages.

Microsoft provides developers with approved development tools, such as compilers, development environments and built-in security checks. These tools are intended to help developers implement the functional and security requirements of the software.

Microsoft also performs automated checks while code is being committed and builds are being created. These checks can identify issues such as exposed credentials, vulnerabilities in source code and problems in third-party or open-source components.

### Testing
Testing is used to determine whether the implementation adheres to the required functional, user and security expectations.

Microsoft's SDL adds several verification mechanisms to this stage. The code is independently reviewed by someone who did not write the code. 

Automated security tools are also used to perform checks such as:
- Static code analysis
- Binary analysis
- Credential and secret scanning
- Encryption checks
- Fuzz testing
- Configuration validation
- Open-source component and vulnerability checking

If the reviewer or the automated tools identify a problem, the developer responsible for writing the code must address the issue before resubmitting the code for review again.

Microsoft also uses penetration testing as an additional method of identifying security weaknesses that may not have been detected through the other verification methods.

### Deployment
Once the required testing and reviews have been completed, the software can progress towards release.

For the deployment, Microsoft uses a Safe Deployment Process (SDP), where the software is not immediately available to every customer. Instead, the build is gradually released to larger and larger groups. The release begins with the development team, followed by Microsoft employees, selected external users and eventually the wider customer base.

This staged approach allows Microsoft to observe the behaviour and stability of the software on a smaller scale before expanding the release to more users.

### Maintenance
After deployment, Microsoft continues monitoring its services to identify security incidents and other issues that may occur after the release.

This complements the general SDLC maintenance activities, such as performance monitoring, bug fixing, updates and user support.

## 5. Where AI appears and where it does not

Microsoft's SDLC documentation does not explicitly identify specific lifecycle stages where AI must or must not be used. Instead, Microsoft describes AI as a way to improve efficiency across the software development lifecycle.

Microsoft explains that AI tools and agents can analyse information from sources such as user feedback, performance metrics and testing results, allowing the teams to identify potential issues earlier and support decision-making throughout the lifecycle.

Moreover, Microsoft states that AI can automate repetitive and time-consuming development activities, allowing the development teams to spend more time on complex and creative aspects of software development.

Microsoft provides examples of AI generating development plans, code and pull requests. These examples suggest that AI may contribute to activities within stages such as planning and development, but the documentation does not assign AI to a fixed set of SDLC stages.

Additionally, Microsoft's Security Development Lifecycle (SDL) documentation does not describe AI as replacing the required human approval processes. Although Microsoft uses various automated security tools during verification, these tools are not explicitly described as AI in the documentation and operate alongside independent manual code review.

Microsoft still requires the code to be reviewed by someone other than the engineer who developed it. Furthermore, problems identified through manual review or automated checks must be resolved before the code can progress. Microsoft also documents a final security and privacy review before new features and material changes can be released.

Therefore, Microsoft's documentation suggests that AI can assist with creating, analysing and planning software development work, while automated tools can assist with verification. However, required human review and approval still remains an explicit control before software changes are allowed to progress towards release.

## 6. What the papers say

The empirical papers provide evidence regarding the performance of AI when it is used during software development and code review. These findings will help evaluate whether the human review and verification practices identified in the Microsoft's SDL, are necessary when AI is introduced into the development process.

### Security weaknesses in AI-generated code
Fu et al. analysed 733 AI-generated code snippets collected from real GitHub projects. The snippets were generated using GitHub Copilot, CodeWhisperer and Codeium. The study found that around 30% of the analysed snippets contained security weaknesses, with 29.5% being Python snippets and 24.2% being JavaScript snippets. 

The identified weaknesses covered 43 different Common Weakness Enumeration (CWE) categories. CWE is a classification system used to identify and describe common types of software and hardware security weaknesses. Of the 43 identified CWE categories, eight were included in the 2023 CWE Top 25, while six CWEs were classified as Stubborn Weaknesses within the CWE Top 25. This indicates that some of the identified weaknesses were widely recognised high-priority security risks.

The researchers also tested whether Copilot Chat could fix the identified security issues when it was provided with warnings from static-analysis tools. The results showed that Copilot Chat was able to fix up to 55.5% of the identified issues, showing that AI can assist with fixing the security problems, but it does not reliably resolve every weakness.

These findings suggest that AI-generated code can introduce security weaknesses and should not be assumed to be safe without further verification. This supports Microsoft's use of automated security checks and independent human review before code is allowed to progress towards release. This is especially important because AI-generated code may appear functional, while still containing security weaknesses.

### LLM assistance during code review
Aðalsteinsson et al. studied how Large Language Models (LLMs) could assist developers during code reviews at WirelessCar Sweden AB. The study first examined the existing manual code review process and identified common problems experienced by developers such as delayed reviews, context switching, large or complex pull requests, and reviewers not having enough contextual information about the code.

The researchers then tested two different forms of LLM-assisted code review with ten developers. The first approach used the AI as a co-reviewer, where it automatically produced a summary and highlighted possible issues before the human began reviewing the code. The second approach used the AI as an interactive assistant, where the reviewer could ask it clarification questions about specific parts of the code or high-level architectural questions when additional information was necessary.

The developers generally preferred the AI-led approach, particularly when reviewing large, unfamiliar or lower-risk pull requests. Participants reported that the AI could provide useful summaries, reduce the effort required to understand unfamiliar code, and identify issues that a reviewer might otherwise miss.

However, the study also identified limitations. The AI sometimes produced incorrect, unclear or low-priority suggestions, creating concerns around false positives and trust. Developers also warned against relying too heavily on the AI, and some developers preferred human-led reviews when they were familiar with the codebase or when the pull request involved more critical changes.

The researchers therefore conclude that LLMs are better suited to complementing human reviewers rather than replacing them. This supports Microsoft's SDL approach, where automated checks were operated alongside an independent human reviewer during Verification, who was ultimately responsible for reviewing and approving the code before it progresses.

### Connection to Microsoft SDLC
Both papers suggest that AI can provide useful assistance during both Development and Verification, but it should not operate without additional checks.

The security study shows that AI-generated code can contain security vulnerabilities even when the system may appear functional, while the code review study shows that LLM assistance can improve parts of the review workflow but still introduces concerns around reliability and trust.

These findings support Microsoft's approach of combining automated tools with independent human review and verification before software changes progress towards release.

## 7. Borrow

1. **Keeping an independent human approval gate before code progresses towards release.**  
   Microsoft's SDL requires code to be reviewed by someone other than the engineer who wrote it. This should be included in our model, especially when AI-generated or AI-assisted code is involved. The empirical studies show that AI-generated code can contain security weaknesses and that LLM-based code review can produce incorrect suggestions. Therefore, AI should assist the review process rather than replace the final human judgement.

2. **Combine automated verification with human review rather than relying on either one alone.**  
   Microsoft's SDL uses automated security checks alongside independent manual review. This two-step approach should be adopted because the empirical evidence shows that both AI-generated code and AI-assisted review can be imperfect. Automated tools can identify issues efficiently, while human reviewers can provide contextual judgement and evaluate issues that automated systems may miss or incorrectly classify.

3. **Use gradual deployment instead of releasing changes to all users at once.**  
   Microsoft's Safe Deployment Process (SDP) gradually releases software to increasingly larger groups before a full release. This should be included in our model because it allows problems to be detected on a smaller scale before they affect a large number of users. This is especially useful when AI-generated or AI-assisted changes are involved, as the empirical evidence shows that some issues may remain even after development and verification.


## 8. Reject

1. **Do not assume that AI-generated code is safe because it appears functional.**  
    The security study found that a considerable proportion of AI-generated code contained security weaknesses across many different CWE categories. Therefore, AI-generated code should still undergo comprehensive testing, security checks and human review before it is allowed to progress towards release. Additional testing may also be appropriate for higher-risk changes.

2. **Do not apply AI uniformly across every stage of the SDLC.**  
   Microsoft's documentation describes AI as a capability that can assist throughout the lifecycle, but it does not mention the use of AI within every individual stage. The code review study also shows that the usefulness of AI depends on the context, such as the complexity and criticality of the change. Therefore, our model should only use AI where it provides a clear benefit rather than requiring AI involvement at every stage.


## 9. Open questions

1. **At which specific stages of Microsoft's SDLC is AI currently used?**  

2. **Are there any additional review or security requirements for AI-generated code, compared with human-written code?**  

3. **How does Microsoft decide when AI assistance is appropriate during code review?**  

4. **How effective are Microsoft's existing verification mechanisms at detecting issues specifically introduced by AI-generated code?**  

5. **Could AI eventually take on a larger role in approval decisions, or will the final approval would always be verified by a human?**  



