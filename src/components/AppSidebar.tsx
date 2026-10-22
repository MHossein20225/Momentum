'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, CheckCheck, Inbox, ListTodo, Sun } from 'lucide-react'

const links = [
  { title: 'Inbox', href: '/inbox', icon: Inbox },
  { title: 'Today', href: '/today', icon: Sun },
  { title: 'Upcoming', href: '/upcoming', icon: CalendarDays },
  { title: 'Completed', href: '/completed', icon: CheckCheck },
]
export function AppSidebar({
  open,
  onNavigate,
}: {
  open: boolean
  onNavigate: () => void
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
        <div className="mb-2 flex items-center justify-between px-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Projects
          </p>
          <button
            type="button"
            disabled
            className="text-lg text-slate-400 hover:text-violet-600"
            aria-label="Add project"
          >
            +
          </button>
        </div>
        <p className="px-3 py-2 text-sm text-slate-400">No projects yet</p>
      </div>
      <div className="absolute inset-x-4 bottom-4 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-amber-100 text-xs font-semibold text-amber-800">
            AM
          </span>
          <div>
            <p className="text-sm font-medium text-slate-800">Your account</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
