import { CalendarDays, Check, Flag } from 'lucide-react'
import type { Task } from '../types'

type TaskItemProps = {
  task: Task
  compact?: boolean
}

export function TaskItem({ task, compact = false }: TaskItemProps) {
  const priorityLabel = task.priority.toLowerCase()
  const dueLabel = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : null

  return (
    <article className="flex items-start gap-3 border-b border-slate-100 py-4 last:border-0">
      {task.status ? (
        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <Check size={13} />
        </span>
      ) : (
        <span className="mt-0.5 size-5 shrink-0 rounded-full border border-slate-300" />
      )}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-medium ${compact ? 'text-sm' : 'text-[15px]'} ${task.status ? 'text-slate-400 line-through' : 'text-slate-800'}`}
        >
          {task.name}
        </p>
        {!compact && task.description && (
          <p className="mt-1 truncate text-sm text-slate-500">
            {task.description}
          </p>
        )}
      </div>
      <span
        className={`hidden items-center gap-1 text-xs capitalize sm:flex ${task.priority === 'HIGH' ? 'text-rose-600' : task.priority === 'MEDIUM' ? 'text-amber-600' : 'text-emerald-600'}`}
      >
        <Flag size={13} />
        {priorityLabel}
      </span>
      {dueLabel && (
        <span className="hidden items-center gap-1 text-xs text-slate-500 md:flex">
          <CalendarDays size={13} />
          {dueLabel}
        </span>
      )}
    </article>
  )
}
