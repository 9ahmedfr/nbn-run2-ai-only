# Developer Interview Discussion Guide

**Draft prepared by:** Ahmed Falulur Rahuman  

**Planner card:** PRD-8 - Developer interviews, guide and outreach

## Purpose

Use developer interviews to validate, challenge, or add to the open questions from **Research Slice 1** and the unresolved gaps in **D2**. The aim is to compare the research with real development practice, not repeat what the research already tells us.

## Interviewer opening

Thanks for taking the time to speak with us. Our RMIT capstone project looks at how AI can be used across the software development lifecycle.

We have already completed some research, and we would like to compare it with your experience as a developer. There are no right or wrong answers. We are mainly interested in what you have seen work well, what has not worked, and what you would want to see improved.

---

## Main questions

### 1. Can you walk me through how you currently use AI in your development work?

**Follow-ups if useful:**

- What do you use it for most often?
- Are there parts of your workflow where you rarely or never use it?
- Does your use change depending on the risk or complexity of the task?

**Research trace:** Slice 1 Open Question 3 - governance thresholds; establishes where developers currently use AI and how task risk or complexity affects that use.

---

### 2. Where does AI help most, and where does it struggle?

**Follow-ups if useful:**

- Are there particular tasks where it saves you a lot of time?
- What kinds of work does it handle poorly?
- How does it perform on large, complex, or older codebases?

**Research trace:** Slice 1 Open Question 3 - governance thresholds; D2 gaps around complex logic, legacy systems, and enterprise-scale development.

---

### 3. If you use AI for requirements or user insights, how do you check whether they reflect what people actually need?

**Follow-ups if useful:**

- How would you validate the result with real users or stakeholders?

**Research trace:** Slice 1 Open Question 6 - journey-map accuracy and validation of AI-generated user or requirements artifacts.

---

### 4. When AI produces work, what do you check before accepting it?

**Follow-ups if useful:**

- What would make you reject the output?
- Does the amount of checking change depending on the task?
- Are there checks you think should always happen before approval?

**Research trace:** Slice 1 Open Question 1 - approval-gate design; D2 gap - verification.

---

### 5. What information should be recorded when AI contributes to a change?

**Follow-ups if useful:**

- What would you want to know if you had to investigate the change later?
- Which details would be useful to record, for example, the tool, prompt, changes made, or reviewer?

**Research trace:** Slice 1 Open Question 2 - auditability.

---

### 6. When AI contributes to a change, who should be responsible for the final result?

**Follow-ups if useful:**

- Does responsibility change depending on how much the AI contributed?
- What role should the developer or reviewer have?

**Research trace:** D2 gap - liability and authorship.

---

### 7. What safeguards would you want around an AI agent that can change a codebase?

**Follow-ups if useful:**

- What should it be allowed to access or change?
- What checks or restrictions should sit outside the AI itself?
- How should security, legal, accessibility, or organisational rules be enforced when AI is involved?

**Research trace:** Slice 1 Open Question 4 - prompt-injection and supply-chain risk; Slice 1 Open Question 7 - regulatory codification.

---

### 8. What would make you comfortable letting AI handle more of a software task on its own?

**Follow-ups if useful:**

- What would you need to see before trusting it more?
- Are there tasks where you would still want a human to make the final decision?
- Would your answer change for deployment, rollback, or incident response?

**Research trace:** Slice 1 Open Question 3 - governance thresholds; Slice 1 Open Question 5 - Stage 8 in practice.

---

### 9. Has AI changed the way your team works? If so, how?

**Follow-ups if useful:**

- Has it changed how work is handed between people or roles?
- Has it changed how much reviewing or checking people need to do?
- What has helped your team manage those changes?

**Research trace:** D2 gaps around collaboration, handoffs, decision load, and review capacity.

---

## Closing prompt

Is there anything about using AI in real software development that you think our research may be missing?

---

## Interview notes template

| Field | Notes |
| --- | --- |
| Interviewee | |
| Question | |
| Key finding | |
| Slice / D2 topic affected | |
| Confirms / challenges / adds | |
| Follow-up needed | |

If a finding contradicts a research slice, flag it to Zac the same day, as required by PRD-8.
