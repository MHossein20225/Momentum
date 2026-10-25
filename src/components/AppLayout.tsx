'use client'

import { useState, type ReactNode } from 'react'
import { Bell, Menu, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { AppSidebar } from './AppSidebar'
import type { CurrentUser } from '../types'

const titles: Record<string, string> = {
  '/inbox': 'Inbox',
  '/today': 'Today',
  '/upcoming': 'Upcoming',
  '/completed': 'Completed',
  '/profile': 'Profile',
}

export function AppLayout({
  children,
  projects,
  currentUser,
}: {
  children: ReactNode
  projects: { id: string; name: string }[]
  currentUser: CurrentUser | null
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const title = titles[pathname] ?? 'Inbox'

  if (pathname === '/login' || pathname === '/register') {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 md:flex">
      <AppSidebar
        open={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
        projects={projects}
        currentUser={currentUser}
      />
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-20 bg-slate-950/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <main className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <span className="text-sm text-slate-500">
              Workspace / <b className="text-slate-800">{title}</b>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="hidden items-center gap-2 sm:flex">
              <Sun size={16} className="text-amber-500" />
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <button
              className="rounded-lg p-2 hover:bg-slate-100"
              aria-label="Notifications"
              onClick={() => toast('You’re all caught up')}
            >
              <Bell size={18} />
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}
