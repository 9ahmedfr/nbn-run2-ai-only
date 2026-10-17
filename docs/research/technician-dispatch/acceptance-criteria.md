# Trial Two - Technician Dispatch Acceptance Criteria

**Owner:** Ahmed Falulur Rahuman

**Planner card:** [PRD] - Trial two acceptance criteria, frozen : 240

**Feature:** Technician dispatch

**Status:** Frozen for Trial Two once this file is committed. After the freeze commit, the opening brief, numbered criteria and out-of-scope list are not changed for an individual build.

## Purpose

Trial Two uses technician dispatch as the larger feature. The three builds use different build methods, but they receive the same feature brief and the same acceptance criteria. The method assignment is kept outside this brief so that one build does not receive different product requirements from another.

The comparison is intended to show what happens when the same larger feature is built from the same starting point under the three Trial Two methods. The registered prediction and the detailed test protocol are separate PM work and are not defined here.

## Opening brief

Build a technician-dispatch feature in the provided Trial Two repository.

A retailer-side requester needs to raise a request for a technician at a customer premises. The feature must use the fault and job-access information in the request to identify a compatible technician and the equipment or access capability the job needs, then allow the visit to be scheduled.

The same brief and acceptance criteria are used unchanged for all three Trial Two builds. Implement only the behaviour below. Do not add features from the out-of-scope list as part of the trial.

## Frozen acceptance criteria

### Feature behaviour

1. **T2-AC01 - Create a dispatch request:** A requester can create a technician-dispatch request for a customer premises.

2. **T2-AC02 - Record the fault:** The request records the fault or problem that the technician is being requested to handle.

3. **T2-AC03 - Record access and equipment needs:** The request can record any access or equipment requirement that is relevant to matching the job.

4. **T2-AC04 - Match the technician to the fault:** A technician is treated as a valid match only when the technician is suitable for the recorded fault.

5. **T2-AC05 - Match the equipment to the job:** A technician and equipment combination is treated as valid only when it satisfies the recorded access or equipment requirements.

6. **T2-AC06 - Reject an invalid second-storey match:** A second-storey job is not accepted as a valid match when the technician does not have access to a ladder or elevated work platform.

7. **T2-AC07 - Accept a compatible second-storey match:** A second-storey job can proceed to scheduling when the technician is suitable for the fault and has the required ladder or elevated work platform capability.

8. **T2-AC08 - Reject an invalid pit-job match:** A pit job is not accepted as a valid match when the proposed technician and equipment do not satisfy the job's recorded pit-access requirement.

9. **T2-AC09 - Do not invent a compatible match:** If no technician and equipment combination satisfies the recorded job requirements, the feature does not present an incompatible combination as a valid match.

10. **T2-AC10 - Schedule a valid dispatch:** After a valid technician and equipment match is selected, the visit can be scheduled.

11. **T2-AC11 - Record the dispatch result:** A scheduled dispatch records the selected technician, the scheduled visit details and the equipment or access requirement used for the match.

12. **T2-AC12 - Show equipment requirements accessibly:** On the technician-matching screen, an equipment requirement is shown using text and an icon and is not communicated by colour alone.

13. **T2-AC13 - Keyboard access:** The technician-dispatch flow can be completed using keyboard controls without requiring pointer-only interaction.

14. **T2-AC14 - No colour-only information:** Information needed to understand the request, match or scheduled dispatch is not conveyed by colour alone.

### Trial evidence requirements

15. **T2-AC15 - Working preview:** The completed build has a preview URL in its pull request where T2-AC01 to T2-AC14 can be checked.

16. **T2-AC16 - Criterion results recorded:** The trial record states whether each of T2-AC01 to T2-AC14 passed or failed and points to the evidence used for that result.

17. **T2-AC17 - Run details recorded:** The trial record identifies the builder, repository and start commit, build method, tool and model where applicable, and the elapsed build time against the trial's four-hour estimate and six-hour cap.

## Out of scope

The following are not required for Trial Two unless the frozen brief is formally replaced before any build starts:

- calculating, paying or reporting the $25 rebate for a late fault rectification or missed appointment;
- treating the assumed missed-appointment business rule as verified NBN policy;
- retailer-notification and API-documentation workflows from Story B;
- production rollout, monitoring, incident response or production rebate reporting;
- real NBN, customer, retailer or technician data and integrations;
- route optimisation, travel-time optimisation or workforce optimisation beyond the technician/equipment compatibility check in the criteria above;
- post-scheduling functions such as rescheduling or cancelling a dispatch;
- technician workforce administration, such as creating or managing technician accounts, skills catalogues or equipment inventories.

## Decisions deliberately left outside the frozen feature criteria

The current research does not define a complete technician-skill taxonomy, fault taxonomy or pit-equipment catalogue. The test protocol may use neutral fixture values to exercise the frozen criteria, but those fixture values must be identical across all three builds and must not introduce new required feature behaviour.

The lifecycle research labels the committed appointment-window and missed-appointment rebate rule as an assumption to be verified. Trial Two therefore tests technician/equipment matching and visit scheduling without claiming that the rebate rule is confirmed NBN policy.

The registered prediction, lane-specific build instructions and the detailed test plan are separate Trial Two protocol work. They must not change the opening brief or acceptance criteria for only one build.

How to deliver this, for this trial:

1. Work on a branch called `feature/technician-dispatch`.
2. Use the technician data in `fixtures/technicians.json`.
3. Commit with conventional commit messages, such as `feat: add dispatch request form`. Add a Co-authored-by trailer naming the AI tool and model to at least one commit.
4. Before opening the pull request, run these from the top of the repository:

   ```sh
   mkdir -p docs/research/technician-dispatch/evidence
   pnpm run test:all > docs/research/technician-dispatch/evidence/test.txt 2>&1
   pnpm run typecheck > docs/research/technician-dispatch/evidence/typecheck.txt 2>&1
   pnpm run lint > docs/research/technician-dispatch/evidence/lint.txt 2>&1
   pnpm audit > docs/research/technician-dispatch/evidence/audit.txt 2>&1
   ```

5. For each criterion you mark as passing, save a screenshot of it working as `docs/research/technician-dispatch/evidence/T2-AC01.png`, `T2-AC02.png` and so on.
6. Open a pull request with a conventional title. In the description, put the Vercel preview link once the preview has built, and a checklist of T2-AC01 to T2-AC14, each marked pass or fail with its evidence file. Tick "AI-assisted tools were used" in the template.
7. Don't build anything on the out-of-scope list, and never ask for a key, password or other secret.
