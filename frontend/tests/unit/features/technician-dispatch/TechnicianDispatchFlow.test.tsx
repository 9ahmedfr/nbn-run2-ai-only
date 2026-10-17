import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TechnicianDispatchFlow } from '@/features/technician-dispatch/components/TechnicianDispatchFlow'
import { technicianData } from '@/features/technician-dispatch/data'

async function createRequest(faultId: string, accessRequirementId: string) {
  const user = userEvent.setup()
  render(<TechnicianDispatchFlow data={technicianData} />)

  await user.type(
    screen.getByLabelText('Customer premises'),
    '14 Collins Street, Melbourne VIC 3000'
  )
  await user.selectOptions(screen.getByLabelText('Fault or problem'), faultId)
  await user.selectOptions(
    screen.getByLabelText('Access or equipment requirement'),
    accessRequirementId
  )
  await user.click(screen.getByRole('button', { name: 'Find compatible technicians' }))

  return user
}

describe('TechnicianDispatchFlow', () => {
  it('validates all required request details', async () => {
    const user = userEvent.setup()
    render(<TechnicianDispatchFlow data={technicianData} />)

    await user.click(screen.getByRole('button', { name: 'Find compatible technicians' }))

    expect(screen.getByText('Enter the customer premises address')).toBeInTheDocument()
    expect(screen.getByText('Select the fault to be handled')).toBeInTheDocument()
    expect(screen.getByText('Select an access or equipment requirement')).toBeInTheDocument()
  })

  it('shows text and icons for match requirements and compatibility results', async () => {
    await createRequest('F1', 'R1')

    expect(screen.getByText('Equipment requirement: Second storey')).toBeInTheDocument()
    expect(
      screen.getByText('Accepted capability: Ladder or Elevated work platform')
    ).toBeInTheDocument()
    expect(screen.getByText('1 compatible technician found.')).toBeInTheDocument()
    expect(screen.getAllByText('Compatible match')).toHaveLength(1)
    expect(screen.getAllByText('Not compatible')).toHaveLength(3)
    expect(screen.getByLabelText('Select Tech Alpha and schedule visit')).toBeEnabled()
    expect(screen.queryByLabelText('Select Tech Delta and schedule visit')).not.toBeInTheDocument()
  })

  it('does not offer an incompatible pit-job selection', async () => {
    await createRequest('F1', 'R2')

    expect(screen.getByText('No compatible technician and equipment match')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Select Tech/ })).not.toBeInTheDocument()
  })

  it('schedules and records a compatible dispatch', async () => {
    const user = await createRequest('F1', 'R1')

    await user.click(screen.getByLabelText('Select Tech Alpha and schedule visit'))
    expect(screen.getByText('Compatible match selected')).toBeInTheDocument()
    expect(screen.getByText('Ladder')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Visit date'), '2026-11-20')
    await user.click(screen.getByLabelText('8:00 am – 12:00 pm'))
    await user.click(screen.getByRole('button', { name: 'Schedule dispatch' }))

    expect(screen.getByRole('heading', { name: 'Dispatch scheduled' })).toBeInTheDocument()
    expect(screen.getByText('14 Collins Street, Melbourne VIC 3000')).toBeInTheDocument()
    expect(screen.getByText('No connection at the premises')).toBeInTheDocument()
    expect(screen.getByText('Tech Alpha')).toBeInTheDocument()
    expect(screen.getByText('2026-11-20 · 8:00 am – 12:00 pm')).toBeInTheDocument()
    expect(screen.getByText('Second storey')).toBeInTheDocument()
    expect(screen.getByText('Ladder')).toBeInTheDocument()
  })

  it('supports keyboard submission and technician selection', async () => {
    const user = userEvent.setup()
    render(<TechnicianDispatchFlow data={technicianData} />)

    await user.click(screen.getByLabelText('Customer premises'))
    await user.keyboard('14 Collins Street, Melbourne VIC 3000')
    await user.tab()
    await user.selectOptions(screen.getByLabelText('Fault or problem'), 'F1')
    await user.selectOptions(screen.getByLabelText('Access or equipment requirement'), 'R1')
    screen.getByRole('button', { name: 'Find compatible technicians' }).focus()
    await user.keyboard('{Enter}')

    const selectTechnician = screen.getByLabelText('Select Tech Alpha and schedule visit')
    selectTechnician.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('heading', { name: 'Schedule the technician visit' })).toHaveFocus()
  })
})
