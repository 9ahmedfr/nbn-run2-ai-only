import { describe, expect, it } from 'vitest'
import { technicianData } from '@/features/technician-dispatch/data'
import { findTechnicianMatches } from '@/features/technician-dispatch/matching'

function matchesFor(faultId: string, accessRequirementId: string) {
  return findTechnicianMatches(technicianData, {
    premises: '14 Collins Street, Melbourne VIC 3000',
    faultId,
    accessRequirementId,
  })
}

describe('findTechnicianMatches', () => {
  it('requires fault suitability as well as equipment compatibility', () => {
    const matches = matchesFor('F1', 'R1')

    expect(matches.find((match) => match.technician.id === 'T1')).toMatchObject({
      faultCompatible: true,
      accessCompatible: true,
      valid: true,
      matchedEquipment: ['ladder'],
    })
    expect(matches.find((match) => match.technician.id === 'T2')).toMatchObject({
      faultCompatible: false,
      accessCompatible: true,
      valid: false,
    })
  })

  it('rejects a second-storey technician without a ladder or elevated work platform', () => {
    const match = matchesFor('F1', 'R1').find((candidate) => candidate.technician.id === 'T4')

    expect(match).toMatchObject({
      faultCompatible: true,
      accessCompatible: false,
      valid: false,
    })
  })

  it('accepts either supported second-storey capability', () => {
    const ladderMatch = matchesFor('F1', 'R1').find((candidate) => candidate.technician.id === 'T1')
    const platformMatch = matchesFor('F3', 'R1').find(
      (candidate) => candidate.technician.id === 'T2'
    )

    expect(ladderMatch?.valid).toBe(true)
    expect(ladderMatch?.matchedEquipment).toEqual(['ladder'])
    expect(platformMatch?.valid).toBe(true)
    expect(platformMatch?.matchedEquipment).toEqual(['elevated-work-platform'])
  })

  it('rejects a pit job without pit-access capability', () => {
    const match = matchesFor('F1', 'R2').find((candidate) => candidate.technician.id === 'T1')

    expect(match).toMatchObject({
      faultCompatible: true,
      accessCompatible: false,
      valid: false,
    })
  })

  it('does not invent a valid combination when none satisfies the whole job', () => {
    expect(matchesFor('F1', 'R2').filter((match) => match.valid)).toEqual([])
  })

  it('allows a fault-compatible technician when no special access equipment is required', () => {
    const validIds = matchesFor('F1', 'R0')
      .filter((match) => match.valid)
      .map((match) => match.technician.id)

    expect(validIds).toEqual(['T1', 'T4'])
  })
})
