import { z } from 'zod'
import fixture from '../../../../fixtures/technicians.json'
import type { TechnicianFixture } from '@/features/technician-dispatch/types'

const technicianFixtureSchema = z
  .object({
    faults: z.array(z.object({ id: z.string(), name: z.string() }).strict()),
    equipment: z.array(z.string()),
    accessRequirements: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
          satisfiedBy: z.array(z.array(z.string())),
        })
        .strict()
    ),
    technicians: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
          faults: z.array(z.string()),
          equipment: z.array(z.string()),
        })
        .strict()
    ),
  })
  .passthrough()

export const technicianData: TechnicianFixture = technicianFixtureSchema.parse(fixture)
