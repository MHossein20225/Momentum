'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, CheckCheck, Inbox, ListTodo, Sun } from 'lucide-react'
import { CreateModal } from './CreateModal'
import { ProjectItem } from './ProjectItem'
import type { CurrentUser } from '../types'

type SidebarProject = {
  id: string
  name: string
}

const links = [
  { title: 'Inbox', href: '/inbox', icon: Inbox },
  { title: 'Today', href: '/today', icon: Sun },
  { title: 'Upcoming', href: '/upcoming', icon: CalendarDays },
  { title: 'Completed', href: '/completed', icon: CheckCheck },
]
export function AppSidebar({
  open,
  onNavigate,
  projects = [],
  currentUser,
}: {
  open: boolean
  onNavigate: () => void
  projects?: SidebarProject[]
  currentUser: CurrentUser | null
}) {
  const pathname = usePathname()
  return (
    <aside
      className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 border-r border-slate-200 bg-white p-4 transition-transform md:sticky md:top-0 md:translate-x-0 md:h-screen`}
    >
      <Link
        href="/inbox"
        className="mb-8 flex items-center gap-3 px-2 py-2 text-xl font-bold text-slate-900"
        onClick={onNavigate}
      >
        <span className="grid size-9 place-items-center rounded-xl bg-violet-600 text-white">
          <ListTodo size={20} />
        </span>
        Momentum
      </Link>
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Workspace
      </p>
      <nav className="space-y-1">
        {links.map(({ title, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${pathname === href ? 'bg-violet-50 font-semibold text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Icon size={18} />
            {title}
          </Link>
        ))}
      </nav>
      <div className="mt-8">
        {currentUser ? (
          <div className="mb-2 flex items-center justify-between px-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Projects
            </p>
            <CreateModal kind="project" />
          </div>
        ) : (
          <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
            باید وارد اکانت خود شوید
          </p>
        )}

        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectItem key={project.id} name={project.name} />
          ))
        ) : (
          <p className="px-3 py-2 text-sm text-slate-400">No projects yet</p>
        )}
      </div>
      <div className="absolute inset-x-4 bottom-4 border-t border-slate-200 pt-4">
        {currentUser ? (
          <Link
            href="/profile"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-violet-100 text-sm font-semibold uppercase text-violet-700">
              {currentUser.name[0]}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-slate-800">
                {currentUser.name}
              </span>
              <span className="block truncate text-xs text-slate-500">
                {currentUser.email}
              </span>
            </span>
          </Link>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={onNavigate}
              className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={onNavigate}
              className="rounded-lg bg-violet-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-violet-700"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}
