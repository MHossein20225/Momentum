import { CalendarDays } from 'lucide-react'

export default function UpcomingPage() {
  return (
    <section className="mx-auto max-w-4xl p-5 sm:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Plan ahead
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Upcoming</h1>
        <p className="mt-2 text-slate-500">
          Your next deadlines, in date order.
        </p>
      </div>
      <div className="relative min-h-72 rounded-xl border border-slate-200 bg-white p-8">
        <div className="absolute bottom-8 left-12 top-8 w-px bg-sky-100" />
        <div className="relative flex h-56 items-center justify-center text-center">
          <div>
            <span className="mx-auto grid size-12 place-items-center rounded-full border-2 border-sky-100 bg-white text-sky-600">
              <CalendarDays size={21} />
            </span>
            <p className="mt-4 font-medium text-slate-700">
              Nothing scheduled yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Tasks with future due dates will appear here.
            </p>
          </div>
          <span className="absolute left-[13px] top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-sky-300 bg-white" />
        </div>
      </div>
    </section>
  )
}
