'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleX,
  ClipboardList,
  HardHat,
  MapPin,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { findTechnicianMatches, formatEquipmentName } from '@/features/technician-dispatch/matching'
import type {
  DispatchRequest,
  ScheduledDispatch,
  TechnicianFixture,
  TechnicianMatch,
} from '@/features/technician-dispatch/types'
import {
  createDispatchRequestSchema,
  scheduleDispatchSchema,
  type CreateDispatchRequestValues,
  type ScheduleDispatchValues,
} from '@/features/technician-dispatch/validation'

type Step = 'request' | 'match' | 'schedule' | 'complete'

interface TechnicianDispatchFlowProps {
  data: TechnicianFixture
}

const fieldClassName =
  'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20'

const primaryButtonClassName =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 disabled:cursor-not-allowed disabled:opacity-50'

function StepTracker({ step }: { step: Step }) {
  const current = step === 'request' ? 1 : step === 'match' ? 2 : 3
  const labels = ['Request details', 'Technician match', 'Schedule visit']

  return (
    <nav aria-label="Dispatch progress" className="border-b border-slate-200 bg-white">
      <ol className="mx-auto grid max-w-5xl grid-cols-3 px-4 sm:px-6">
        {labels.map((label, index) => {
          const number = index + 1
          const completed = number < current || step === 'complete'
          const active = number === current && step !== 'complete'

          return (
            <li
              key={label}
              aria-current={active ? 'step' : undefined}
              className={`flex items-center gap-2 border-b-4 px-1 py-4 text-xs font-semibold sm:text-sm ${
                active
                  ? 'border-blue-800 text-blue-900'
                  : completed
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-slate-500'
              }`}
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                  completed
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : active
                      ? 'border-blue-800 bg-blue-50 text-blue-900'
                      : 'border-slate-300 bg-white'
                }`}
                aria-hidden="true"
              >
                {completed ? <Check className="size-4" /> : number}
              </span>
              <span>{label}</span>
              <span className="sr-only">
                {completed ? 'completed' : active ? 'current' : 'upcoming'}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function CompatibilityRow({
  compatible,
  children,
}: {
  compatible: boolean
  children: React.ReactNode
}) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-700">
      {compatible ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-700" aria-hidden="true" />
      ) : (
        <CircleX className="mt-0.5 size-4 shrink-0 text-red-700" aria-hidden="true" />
      )}
      <span>
        <span className="font-semibold">
          {compatible ? 'Meets requirement:' : 'Does not meet requirement:'}
        </span>{' '}
        {children}
      </span>
    </li>
  )
}

function DispatchSummaryRow({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: LucideIcon
}) {
  return (
    <div className="flex gap-3 px-4 py-3.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-slate-500" aria-hidden="true" />
      <div>
        <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</dt>
        <dd className="mt-0.5 text-sm font-semibold text-slate-950">{value}</dd>
      </div>
    </div>
  )
}

export function TechnicianDispatchFlow({ data }: TechnicianDispatchFlowProps) {
  const [step, setStep] = useState<Step>('request')
  const [request, setRequest] = useState<DispatchRequest | null>(null)
  const [selectedMatch, setSelectedMatch] = useState<TechnicianMatch | null>(null)
  const [scheduledDispatch, setScheduledDispatch] = useState<ScheduledDispatch | null>(null)
  const stageHeadingRef = useRef<HTMLHeadingElement>(null)

  const requestForm = useForm<CreateDispatchRequestValues>({
    resolver: zodResolver(createDispatchRequestSchema),
    defaultValues: { premises: '', faultId: '', accessRequirementId: '' },
  })
  const scheduleForm = useForm<ScheduleDispatchValues>({
    resolver: zodResolver(scheduleDispatchSchema),
    defaultValues: { visitDate: '', visitWindow: '' },
  })

  useEffect(() => {
    if (step !== 'request') stageHeadingRef.current?.focus()
  }, [step])

  const matches = useMemo(
    () => (request ? findTechnicianMatches(data, request) : []),
    [data, request]
  )
  const fault = data.faults.find((candidate) => candidate.id === request?.faultId)
  const accessRequirement = data.accessRequirements.find(
    (candidate) => candidate.id === request?.accessRequirementId
  )

  function createRequest(values: CreateDispatchRequestValues) {
    setRequest(values)
    setSelectedMatch(null)
    setScheduledDispatch(null)
    setStep('match')
    toast.success('Dispatch request created')
  }

  function chooseTechnician(match: TechnicianMatch) {
    if (!match.valid) return
    setSelectedMatch(match)
    setStep('schedule')
  }

  function scheduleVisit(values: ScheduleDispatchValues) {
    if (!request || !selectedMatch || !accessRequirement) return

    setScheduledDispatch({
      reference: `DSP-${selectedMatch.technician.id}-${values.visitDate.replaceAll('-', '')}`,
      request,
      technician: selectedMatch.technician,
      visitDate: values.visitDate,
      visitWindow: values.visitWindow,
      accessRequirement,
      matchedEquipment: selectedMatch.matchedEquipment,
    })
    setStep('complete')
    toast.success('Technician visit scheduled')
  }

  const requirementOptions =
    accessRequirement?.satisfiedBy.map((option) =>
      option.length === 0 ? 'No special equipment' : option.map(formatEquipmentName).join(' + ')
    ) ?? []

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-700">
            <Wrench className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-200 uppercase">
              ServiceLink
            </p>
            <p className="text-lg font-semibold">Technician dispatch</p>
          </div>
        </div>
      </header>

      <StepTracker step={step} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {step === 'request' && (
          <section aria-labelledby="request-heading" className="mx-auto max-w-2xl">
            <div className="mb-7">
              <p className="text-sm font-semibold text-blue-800">Step 1 of 3</p>
              <h1 id="request-heading" className="mt-1 text-3xl font-bold tracking-tight">
                Create a dispatch request
              </h1>
              <p className="mt-2 text-slate-600">
                Tell us where the technician is needed, what went wrong and what access the job
                requires.
              </p>
            </div>

            <form
              onSubmit={requestForm.handleSubmit(createRequest)}
              className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
              noValidate
            >
              <div>
                <label htmlFor="premises" className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="size-4 text-blue-800" aria-hidden="true" />
                  Customer premises
                </label>
                <input
                  id="premises"
                  autoComplete="street-address"
                  placeholder="e.g. 14 Collins Street, Melbourne VIC 3000"
                  aria-describedby={
                    requestForm.formState.errors.premises ? 'premises-error' : undefined
                  }
                  aria-invalid={Boolean(requestForm.formState.errors.premises)}
                  className={`mt-2 ${fieldClassName}`}
                  {...requestForm.register('premises')}
                />
                {requestForm.formState.errors.premises && (
                  <p id="premises-error" role="alert" className="mt-1.5 text-sm text-red-700">
                    {requestForm.formState.errors.premises.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="fault" className="flex items-center gap-2 text-sm font-semibold">
                  <ClipboardList className="size-4 text-blue-800" aria-hidden="true" />
                  Fault or problem
                </label>
                <select
                  id="fault"
                  aria-describedby={
                    requestForm.formState.errors.faultId ? 'fault-error' : 'fault-hint'
                  }
                  aria-invalid={Boolean(requestForm.formState.errors.faultId)}
                  className={`mt-2 ${fieldClassName}`}
                  {...requestForm.register('faultId')}
                >
                  <option value="">Select a fault</option>
                  {data.faults.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <p id="fault-hint" className="mt-1.5 text-xs text-slate-500">
                  Only technicians qualified for this fault can be selected.
                </p>
                {requestForm.formState.errors.faultId && (
                  <p id="fault-error" role="alert" className="mt-1.5 text-sm text-red-700">
                    {requestForm.formState.errors.faultId.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="access-requirement"
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <HardHat className="size-4 text-blue-800" aria-hidden="true" />
                  Access or equipment requirement
                </label>
                <select
                  id="access-requirement"
                  aria-describedby={
                    requestForm.formState.errors.accessRequirementId
                      ? 'access-error'
                      : 'access-hint'
                  }
                  aria-invalid={Boolean(requestForm.formState.errors.accessRequirementId)}
                  className={`mt-2 ${fieldClassName}`}
                  {...requestForm.register('accessRequirementId')}
                >
                  <option value="">Select a requirement</option>
                  {data.accessRequirements.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <p id="access-hint" className="mt-1.5 text-xs text-slate-500">
                  This is checked against each technician&apos;s available equipment and access
                  capability.
                </p>
                {requestForm.formState.errors.accessRequirementId && (
                  <p id="access-error" role="alert" className="mt-1.5 text-sm text-red-700">
                    {requestForm.formState.errors.accessRequirementId.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end border-t border-slate-200 pt-5">
                <button type="submit" className={primaryButtonClassName}>
                  Find compatible technicians
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {step === 'match' && request && accessRequirement && (
          <section aria-labelledby="match-heading">
            <p className="text-sm font-semibold text-blue-800">Step 2 of 3</p>
            <h1
              id="match-heading"
              ref={stageHeadingRef}
              tabIndex={-1}
              className="mt-1 text-3xl font-bold tracking-tight outline-none"
            >
              Choose a compatible technician
            </h1>
            <p className="mt-2 text-slate-600">
              Results are checked against both the recorded fault and job access requirement.
            </p>

            <dl className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Premises
                </dt>
                <dd className="mt-1 text-sm font-medium">{request.premises}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Fault
                </dt>
                <dd className="mt-1 text-sm font-medium">{fault?.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Access
                </dt>
                <dd className="mt-1 text-sm font-medium">{accessRequirement.name}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950">
              <HardHat className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">
                  Equipment requirement: {accessRequirement.name}
                </p>
                <p className="mt-1 text-sm">
                  Accepted capability: {requirementOptions.join(' or ')}
                </p>
              </div>
            </div>

            {matches.some((match) => match.valid) ? (
              <p role="status" className="mt-6 text-sm font-medium text-emerald-800">
                {matches.filter((match) => match.valid).length} compatible technician
                {matches.filter((match) => match.valid).length === 1 ? '' : 's'} found.
              </p>
            ) : (
              <div
                role="status"
                className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4"
              >
                <p className="font-semibold text-amber-950">
                  No compatible technician and equipment match
                </p>
                <p className="mt-1 text-sm text-amber-900">
                  None of the available technicians satisfies both the fault and the recorded access
                  requirement. No technician can be selected for this request.
                </p>
              </div>
            )}

            <ul aria-label="Technician matching results" className="mt-4 grid gap-4 lg:grid-cols-2">
              {matches.map((match) => (
                <li
                  key={match.technician.id}
                  className={`rounded-xl border bg-white p-5 shadow-sm ${
                    match.valid ? 'border-emerald-300' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-slate-100">
                        <HardHat className="size-5 text-slate-700" aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="font-semibold">{match.technician.name}</h2>
                        <p className="text-xs text-slate-500">Technician {match.technician.id}</p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        match.valid ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {match.valid ? 'Compatible match' : 'Not compatible'}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    <CompatibilityRow compatible={match.faultCompatible}>
                      {match.faultCompatible
                        ? `Qualified for ${fault?.name}`
                        : `Not qualified for ${fault?.name}`}
                    </CompatibilityRow>
                    <CompatibilityRow compatible={match.accessCompatible}>
                      {match.accessCompatible
                        ? match.matchedEquipment.length > 0
                          ? match.matchedEquipment.map(formatEquipmentName).join(' + ')
                          : 'No special equipment needed'
                        : `${accessRequirement.name} access`}
                    </CompatibilityRow>
                  </ul>

                  {match.valid && (
                    <button
                      type="button"
                      onClick={() => chooseTechnician(match)}
                      className={`mt-5 w-full ${primaryButtonClassName}`}
                      aria-label={`Select ${match.technician.name} and schedule visit`}
                    >
                      Select technician
                      <span aria-hidden="true">→</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setStep('request')}
              className="mt-6 min-h-11 rounded-lg px-3 text-sm font-semibold text-blue-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
            >
              ← Edit request details
            </button>
          </section>
        )}

        {step === 'schedule' && request && selectedMatch && accessRequirement && (
          <section aria-labelledby="schedule-heading" className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold text-blue-800">Step 3 of 3</p>
            <h1
              id="schedule-heading"
              ref={stageHeadingRef}
              tabIndex={-1}
              className="mt-1 text-3xl font-bold tracking-tight outline-none"
            >
              Schedule the technician visit
            </h1>
            <p className="mt-2 text-slate-600">
              Choose a date and visit window for the compatible match.
            </p>

            <div className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50 p-5">
              <div className="flex items-center gap-2 font-semibold text-emerald-950">
                <CheckCircle2 className="size-5" aria-hidden="true" />
                Compatible match selected
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-emerald-800">Technician</dt>
                  <dd className="font-semibold text-emerald-950">
                    {selectedMatch.technician.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-emerald-800">Equipment / access used</dt>
                  <dd className="font-semibold text-emerald-950">
                    {selectedMatch.matchedEquipment.length > 0
                      ? selectedMatch.matchedEquipment.map(formatEquipmentName).join(' + ')
                      : 'No special equipment required'}
                  </dd>
                </div>
              </dl>
            </div>

            <form
              onSubmit={scheduleForm.handleSubmit(scheduleVisit)}
              className="mt-5 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
              noValidate
            >
              <div>
                <label
                  htmlFor="visit-date"
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <CalendarDays className="size-4 text-blue-800" aria-hidden="true" />
                  Visit date
                </label>
                <input
                  id="visit-date"
                  type="date"
                  aria-invalid={Boolean(scheduleForm.formState.errors.visitDate)}
                  aria-describedby={
                    scheduleForm.formState.errors.visitDate ? 'visit-date-error' : undefined
                  }
                  className={`mt-2 ${fieldClassName}`}
                  {...scheduleForm.register('visitDate')}
                />
                {scheduleForm.formState.errors.visitDate && (
                  <p id="visit-date-error" role="alert" className="mt-1.5 text-sm text-red-700">
                    {scheduleForm.formState.errors.visitDate.message}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className="text-sm font-semibold">Visit window</legend>
                <div className="mt-2 grid gap-3 sm:grid-cols-3">
                  {['8:00 am – 12:00 pm', '12:00 pm – 4:00 pm', '4:00 pm – 8:00 pm'].map(
                    (window) => (
                      <label
                        key={window}
                        className="flex cursor-pointer items-start gap-2 rounded-lg border border-slate-300 p-3 text-sm focus-within:ring-2 focus-within:ring-blue-700/30 has-checked:border-blue-800 has-checked:bg-blue-50"
                      >
                        <input
                          type="radio"
                          value={window}
                          className="mt-0.5 size-4 accent-blue-800"
                          {...scheduleForm.register('visitWindow')}
                        />
                        <span>{window}</span>
                      </label>
                    )
                  )}
                </div>
                {scheduleForm.formState.errors.visitWindow && (
                  <p role="alert" className="mt-1.5 text-sm text-red-700">
                    {scheduleForm.formState.errors.visitWindow.message}
                  </p>
                )}
              </fieldset>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep('match')}
                  className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                >
                  ← Back to matching
                </button>
                <button type="submit" className={primaryButtonClassName}>
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Schedule dispatch
                </button>
              </div>
            </form>
          </section>
        )}

        {step === 'complete' && scheduledDispatch && fault && (
          <section aria-labelledby="complete-heading" className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-emerald-300 bg-white shadow-sm">
              <div className="rounded-t-2xl bg-emerald-700 px-5 py-7 text-center text-white sm:px-8">
                <CheckCircle2 className="mx-auto size-12" aria-hidden="true" />
                <h1
                  id="complete-heading"
                  ref={stageHeadingRef}
                  tabIndex={-1}
                  className="mt-3 text-3xl font-bold tracking-tight outline-none"
                >
                  Dispatch scheduled
                </h1>
                <p className="mt-1 text-emerald-50">Reference {scheduledDispatch.reference}</p>
              </div>

              <div className="p-5 sm:p-8">
                <p className="text-sm text-slate-600">
                  The selected technician, visit details and matched access capability have been
                  recorded.
                </p>
                <dl className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200">
                  <DispatchSummaryRow
                    label="Customer premises"
                    value={scheduledDispatch.request.premises}
                    icon={MapPin}
                  />
                  <DispatchSummaryRow label="Fault" value={fault.name} icon={ClipboardList} />
                  <DispatchSummaryRow
                    label="Technician"
                    value={scheduledDispatch.technician.name}
                    icon={HardHat}
                  />
                  <DispatchSummaryRow
                    label="Scheduled visit"
                    value={`${scheduledDispatch.visitDate} · ${scheduledDispatch.visitWindow}`}
                    icon={CalendarDays}
                  />
                  <DispatchSummaryRow
                    label="Access requirement"
                    value={scheduledDispatch.accessRequirement.name}
                    icon={Building2}
                  />
                  <DispatchSummaryRow
                    label="Equipment / access used for match"
                    value={
                      scheduledDispatch.matchedEquipment.length > 0
                        ? scheduledDispatch.matchedEquipment.map(formatEquipmentName).join(' + ')
                        : 'No special equipment required'
                    }
                    icon={Wrench}
                  />
                </dl>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
