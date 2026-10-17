import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Raise, match and schedule technician dispatch requests.',
}

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-bold tracking-tight">ServiceLink</span>
        <Link
          href="/dispatch"
          className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Open dispatch
        </Link>
      </header>

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-widest text-blue-300 uppercase">
            Field service operations
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Send the right technician, with the right equipment.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Record the customer fault and site access needs, find compatible technicians and
            schedule the visit.
          </p>
          <Link
            href="/dispatch"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Create a dispatch request{' '}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-8">
          <p className="text-sm font-semibold text-blue-300">A clear three-step workflow</p>
          <ol className="mt-6 space-y-5">
            {[
              ['01', 'Describe the job', 'Record the premises, fault and access requirement.'],
              ['02', 'Verify compatibility', 'Check technician skills and equipment together.'],
              [
                '03',
                'Schedule the visit',
                'Record the technician, visit window and matched capability.',
              ],
            ].map(([number, title, description]) => (
              <li
                key={number}
                className="flex gap-4 border-b border-slate-700 pb-5 last:border-0 last:pb-0"
              >
                <span className="font-mono text-sm font-semibold text-blue-300">{number}</span>
                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  )
}
