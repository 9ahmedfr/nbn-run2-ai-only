export interface Fault {
  id: string
  name: string
}

export interface AccessRequirement {
  id: string
  name: string
  satisfiedBy: string[][]
}

export interface Technician {
  id: string
  name: string
  faults: string[]
  equipment: string[]
}

export interface TechnicianFixture {
  faults: Fault[]
  equipment: string[]
  accessRequirements: AccessRequirement[]
  technicians: Technician[]
}

export interface DispatchRequest {
  premises: string
  faultId: string
  accessRequirementId: string
}

export interface TechnicianMatch {
  technician: Technician
  faultCompatible: boolean
  accessCompatible: boolean
  valid: boolean
  matchedEquipment: string[]
}

export interface ScheduledDispatch {
  reference: string
  request: DispatchRequest
  technician: Technician
  visitDate: string
  visitWindow: string
  accessRequirement: AccessRequirement
  matchedEquipment: string[]
}
