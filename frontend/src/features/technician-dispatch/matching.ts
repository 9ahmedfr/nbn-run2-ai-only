import type {
  DispatchRequest,
  TechnicianFixture,
  TechnicianMatch,
} from '@/features/technician-dispatch/types'

export function formatEquipmentName(equipment: string): string {
  const labels: Record<string, string> = {
    ladder: 'Ladder',
    'elevated-work-platform': 'Elevated work platform',
    'pit-access': 'Pit-access capability',
  }

  return labels[equipment] ?? equipment.replaceAll('-', ' ')
}

export function findTechnicianMatches(
  data: TechnicianFixture,
  request: DispatchRequest
): TechnicianMatch[] {
  const requirement = data.accessRequirements.find(
    (candidate) => candidate.id === request.accessRequirementId
  )

  if (!requirement) return []

  return data.technicians.map((technician) => {
    const faultCompatible = technician.faults.includes(request.faultId)
    const matchedEquipment =
      requirement.satisfiedBy.find((option) =>
        option.every((equipment) => technician.equipment.includes(equipment))
      ) ?? []
    const accessCompatible = requirement.satisfiedBy.some((option) =>
      option.every((equipment) => technician.equipment.includes(equipment))
    )

    return {
      technician,
      faultCompatible,
      accessCompatible,
      valid: faultCompatible && accessCompatible,
      matchedEquipment,
    }
  })
}
