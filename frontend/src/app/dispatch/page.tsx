import type { Metadata } from 'next'
import { TechnicianDispatchFlow } from '@/features/technician-dispatch/components/TechnicianDispatchFlow'
import { technicianData } from '@/features/technician-dispatch/data'

export const metadata: Metadata = {
  title: 'Technician dispatch',
  description: 'Create, match and schedule a technician dispatch request.',
}

export default function TechnicianDispatchPage() {
  return <TechnicianDispatchFlow data={technicianData} />
}
