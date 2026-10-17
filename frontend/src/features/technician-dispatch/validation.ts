import { z } from 'zod'

export const createDispatchRequestSchema = z.object({
  premises: z
    .string()
    .trim()
    .min(5, 'Enter the customer premises address')
    .max(200, 'Address must be 200 characters or fewer'),
  faultId: z.string().min(1, 'Select the fault to be handled'),
  accessRequirementId: z.string().min(1, 'Select an access or equipment requirement'),
})

export const scheduleDispatchSchema = z.object({
  visitDate: z.string().min(1, 'Select a visit date'),
  visitWindow: z.string().min(1, 'Select a visit window'),
})

export type CreateDispatchRequestValues = z.infer<typeof createDispatchRequestSchema>
export type ScheduleDispatchValues = z.infer<typeof scheduleDispatchSchema>
