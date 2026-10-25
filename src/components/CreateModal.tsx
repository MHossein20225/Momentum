'use client'

import { useActionState, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { createTaskAction } from '../actions/taskActions'
import { createProjectAction } from '../actions/projectActions'
import { toast } from 'sonner'

type ProjectOption = {
  id: string
  name: string
}

export function CreateModal({
  kind,
  projects = [],
}: {
  kind: 'project' | 'task'
  projects?: ProjectOption[]
}) {
  const [open, setOpen] = useState(false)
  const [taskState, taskAction, taskPending] = useActionState(
    createTaskAction,
    {},
  )
  const [projectState, projectAction, projectPending] = useActionState(
    createProjectAction,
    {},
  )
  const isTask = kind === 'task'
  const title = isTask ? 'Create task' : 'Create project'

  if (isTask) {
    if (taskState.error) toast.error(taskState.error)
    else if (taskState.message) toast.success(taskState.message)
  } else {
    if (projectState.error) toast.error(projectState.error)
    else if (projectState.message) toast.success(projectState.message)
  }
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={isTask ? undefined : 'Add project'}
        className={
          isTask
            ? 'inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700'
            : 'rounded px-1 text-lg text-slate-400 hover:text-violet-600'
        }
      >
        <Plus size={isTask ? 17 : 16} />
        {isTask && 'Add task'}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-modal-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2
                id="create-modal-title"
                className="text-xl font-semibold text-slate-900"
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="space-y-4"
              action={isTask ? taskAction : projectAction}
            >
              <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                {isTask ? 'Task name' : 'Project name'}
                <input
                  name="name"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-violet-500"
                  placeholder={
                    isTask ? 'What needs to be done?' : 'Project name'
                  }
                />
              </label>
              {taskState?.inputError?.name?.[0] && (
                <p role="alert" className="text-sm text-rose-600">
                  {taskState.inputError.name[0]}
                </p>
              )}
              {projectState?.inputError?.name?.[0] && (
                <p role="alert" className="text-sm text-rose-600">
                  {projectState.inputError.name[0]}
                </p>
              )}

              {isTask ? (
                <>
                  <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                    Description
                    <textarea
                      name="description"
                      rows={3}
                      className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-violet-500"
                      placeholder="Add details"
                    />
                  </label>
                  {taskState?.inputError?.description?.[0] && (
                    <p role="alert" className="text-sm text-rose-600">
                      {taskState.inputError.description[0]}
                    </p>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                      Due date
                      <input
                        name="dueDate"
                        type="date"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-violet-500"
                      />
                    </label>
                    <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                      Project
                      <select
                        name="projectId"
                        defaultValue=""
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-violet-500"
                      >
                        <option value="" disabled>
                          {projects.length
                            ? 'Choose a project'
                            : 'No projects yet'}
                        </option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    {taskState?.inputError?.projectId?.[0] && (
                      <p role="alert" className="text-sm text-rose-600">
                        {taskState.inputError.projectId[0]}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                      Priority
                      <select
                        name="priority"
                        defaultValue="MEDIUM"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-violet-500"
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                    </label>
                    {taskState?.inputError?.priority?.[0] && (
                      <p role="alert" className="text-sm text-rose-600">
                        {taskState.inputError.priority[0]}
                      </p>
                    )}
                    <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                      Status
                      <select
                        name="status"
                        defaultValue="WAITING"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-violet-500"
                      >
                        <option value="WAITING">Waiting</option>
                        <option value="INPROGRESS">In progress</option>
                        <option value="DONE">Done</option>
                      </select>
                    </label>
                    {taskState?.inputError?.status?.[0] && (
                      <p role="alert" className="text-sm text-rose-600">
                        {taskState.inputError.status[0]}
                      </p>
                    )}
                  </div>
                </>
              ) : null}

              
              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={taskPending || projectPending}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  {taskPending || projectPending ? 'Creating…' : title}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
