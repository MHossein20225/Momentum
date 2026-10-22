import { CheckCircle2 } from 'lucide-react'

export default function CompletedPage() {
  return (
    <section className="mx-auto max-w-4xl p-5 sm:p-8">
      <div className="mb-8 flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 size={25} />
        </span>
        <div>
          <p className="text-sm font-medium text-emerald-700">Nice work</p>
          <h1 className="mt-1 text-3xl font-bold text-emerald-950">
            Completed
          </h1>
          <p className="mt-1 text-sm text-emerald-800">
            0 tasks finished so far.
          </p>
        </div>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">Recently finished</h2>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center sm:px-6">
        <p className="text-sm text-slate-500">
          Completed tasks will appear here.
        </p>
      </div>
    </section>
  )
}
