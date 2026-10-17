# Trial Two technician-dispatch record

## Run details

| Field | Recorded value |
| --- | --- |
| Builder | Ahmed Falulur Rahuman |
| Repository | `9ahmedfr/nbn-run2-ai-only` |
| Branch | `feature/technician-dispatch` |
| Start commit | `ccfb2ca8bc54c2d01ab52037977221d149692a2a` |
| Build method | Trial Two AI-only build |
| Tool | OpenAI Codex |
| Model | GPT-5 |
| Started | 2026-10-17 23:53:09 AEDT |
| Completed | 2026-10-18 00:02:22 AEDT |
| Elapsed build time | 9 minutes 13 seconds |
| Trial estimate | 4 hours |
| Trial cap | 6 hours |
| Result against estimate/cap | Completed 3 hours 50 minutes 47 seconds under estimate and 5 hours 50 minutes 47 seconds under cap |

## Acceptance-criterion results

| Criterion | Result | Evidence |
| --- | --- | --- |
| T2-AC01 | Pass | [`evidence/T2-AC01.png`](evidence/T2-AC01.png) shows a completed customer-premises request form. |
| T2-AC02 | Pass | [`evidence/T2-AC02.png`](evidence/T2-AC02.png) shows the recorded fault. |
| T2-AC03 | Pass | [`evidence/T2-AC03.png`](evidence/T2-AC03.png) shows the recorded second-storey requirement. |
| T2-AC04 | Pass | [`evidence/T2-AC04.png`](evidence/T2-AC04.png) shows fault-qualified and not-qualified results with only the full match selectable. |
| T2-AC05 | Pass | [`evidence/T2-AC05.png`](evidence/T2-AC05.png) shows the equipment capability check for every technician. |
| T2-AC06 | Pass | [`evidence/T2-AC06.png`](evidence/T2-AC06.png) shows Tech Delta rejected for second-storey access despite being fault-qualified. |
| T2-AC07 | Pass | [`evidence/T2-AC07.png`](evidence/T2-AC07.png) shows Tech Alpha accepted with ladder capability and offered for scheduling. |
| T2-AC08 | Pass | [`evidence/T2-AC08.png`](evidence/T2-AC08.png) shows all unsuitable pit-job combinations rejected. |
| T2-AC09 | Pass | [`evidence/T2-AC09.png`](evidence/T2-AC09.png) shows the explicit no-match state with no technician-selection action. |
| T2-AC10 | Pass | [`evidence/T2-AC10.png`](evidence/T2-AC10.png) shows date/window scheduling after a compatible match is selected. |
| T2-AC11 | Pass | [`evidence/T2-AC11.png`](evidence/T2-AC11.png) shows the scheduled technician, visit, access requirement and ladder used for the match. |
| T2-AC12 | Pass | [`evidence/T2-AC12.png`](evidence/T2-AC12.png) shows the equipment requirement with a hard-hat icon and explicit text. |
| T2-AC13 | Pass | [`evidence/T2-AC13.png`](evidence/T2-AC13.png) shows focus on the keyboard-operable native scheduling controls; the keyboard journey is also covered in [`test.txt`](evidence/test.txt). |
| T2-AC14 | Pass | [`evidence/T2-AC14.png`](evidence/T2-AC14.png) shows icons paired with `Compatible match`, `Not compatible`, `Meets requirement` and `Does not meet requirement` text. |

## Verification

- `pnpm run test:all`: pass — 22 tests across 5 files. See [`evidence/test.txt`](evidence/test.txt).
- `pnpm run typecheck`: pass. See [`evidence/typecheck.txt`](evidence/typecheck.txt).
- `pnpm run lint`: pass. See [`evidence/lint.txt`](evidence/lint.txt).
- `pnpm audit`: completed and reported 11 vulnerabilities in baseline dependency versions (1 low, 5 moderate, 4 high with 1 ignored, and 1 critical). No vulnerable package was introduced by this feature. See [`evidence/audit.txt`](evidence/audit.txt).
- Production compilation: pass with `pnpm --filter frontend exec next build --webpack`. The default Turbopack build could not bind an internal sandbox port, so webpack was used to verify the production build.
- Responsive browser review: pass at 1440px and 390px viewport widths.

## Trial evidence status

- T2-AC15 working preview: pending the Vercel preview created from the pull request.
- T2-AC16 criterion results recorded: pass; T2-AC01 through T2-AC14 are recorded above.
- T2-AC17 run details recorded: pass; builder, repository, start commit, method, tool/model and elapsed time are recorded above.

## Scope notes

The implementation uses only the synthetic values in `fixtures/technicians.json`. It does not add real integrations, route optimisation, rebate handling, retailer notifications, post-scheduling changes or technician administration.
