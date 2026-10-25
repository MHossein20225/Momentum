'use client'

import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { AppLayout } from '../components/AppLayout'
import type { CurrentUser } from '../types'

export function AppShell({
  children,
  projects,
  currentUser,
}: {
  children: ReactNode
  projects: { id: string; name: string }[]
  currentUser: CurrentUser | null
}) {
  return (
    <>
      <AppLayout projects={projects} currentUser={currentUser}>
        {children}
      </AppLayout>
      <Toaster position="top-right" richColors />
    </>
  )
}
