import { Inbox } from 'lucide-react'
import { CreateModal } from '../../components/CreateModal'
import { getProjects } from '../../lib/dal/project'

export default async function InboxPage() {
  const projects = await getProjects()
  

  return (
    <section className="mx-auto max-w-5xl p-5 sm:p-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-700">
            Your workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Inbox</h1>
          <p className="mt-2 text-slate-500">
            A simple list of everything on your mind.
          </p>
        </div>
        <CreateModal
          kind="task"
          projects={projects.map(({ id, name }) => ({ id, name }))}
        />
      </div>
      <div className="grid min-h-72 place-items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <div>
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-violet-50 text-violet-600">
            <Inbox size={24} />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Your inbox is clear
          </h2>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Tasks you add will show up here.
          </p>
        </div>
      </div>
    </section>
  )
}
