'use server'
import { Inbox } from 'lucide-react'
import { CreateModal } from '../../components/CreateModal'
import { getProjects } from '../../lib/dal/project'
import { getTasks } from '../../lib/dal/task'
import { TaskItem } from '../../components/TaskItem'

export default async function InboxPage() {
  const projects = await getProjects()
  const tasks = await getTasks()

  return (
    <section className="mx-auto max-w-6xl p-5 sm:p-8">
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
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {tasks.length > 0 ? (
          <>
            <div className="grid grid-cols-[20px_minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span aria-hidden="true" />
              <span>Task</span>
              <span className="hidden sm:block">Priority</span>
              <span className="hidden md:block">Due date</span>
            </div>
            <div className="px-5">
              {tasks.map((task) => (
                <TaskItem key={`${task.projectId}-${task.name}`} task={task} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid min-h-72 place-items-center px-6 py-12 text-center">
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
        )}
      </div>
    </section>
  )
}
