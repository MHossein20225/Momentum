'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

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
  const isTask = kind === 'task'
  const title = isTask ? 'Create task' : 'Create project'

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
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                {isTask ? 'Task name' : 'Project name'}
                <input
                  name="name"
                  required
                  minLength={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-violet-500"
                  placeholder={
                    isTask ? 'What needs to be done?' : 'Project name'
                  }
                />
              </label>

              {isTask ? (
                <>
                  <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                    Description
                    <textarea
                      name="description"
                      required
                      rows={3}
                      className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-violet-500"
                      placeholder="Add details"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                      Due date
                      <input
                        name="dueDate"
                        type="date"
                        required
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-violet-500"
                      />
                    </label>
                    <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                      Project
                      <select
                        name="projectId"
                        required
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
                  </div>
                </>
              ) : null}

              <p className="text-xs text-slate-400">
                This form is ready for your backend to handle submissions.
              </p>
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
                  className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  {title}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
