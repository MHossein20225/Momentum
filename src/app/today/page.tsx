import { CalendarDays, Flag } from 'lucide-react'

const priorities = ['High', 'Medium', 'Low']

export default function TodayPage() {
  return (
    <section className="mx-auto max-w-5xl p-5 sm:p-8">
      <div className="mb-8 rounded-2xl bg-violet-700 p-6 text-white sm:p-8">
        <div className="flex items-center gap-2 text-violet-200">
          <CalendarDays size={17} />
          <span className="text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold">Today</h1>
        <p className="mt-2 text-violet-100">0 tasks to focus on.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {priorities.map((priority) => (
          <section
            key={priority}
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <h2 className="mb-1 flex items-center gap-2 font-semibold text-slate-800">
              <Flag
                size={15}
                className={
                  priority === 'High'
                    ? 'text-rose-500'
                    : priority === 'Medium'
                      ? 'text-amber-500'
                      : 'text-emerald-500'
                }
              />
              {priority} priority
            </h2>
            <p className="mb-2 text-xs text-slate-400">0 tasks</p>
            <p className="py-5 text-sm text-slate-400">No tasks yet.</p>
          </section>
        ))}
      </div>
    </section>
  )
}
