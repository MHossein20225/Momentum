'use client'

import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { AppLayout } from '../components/AppLayout'

export function AppShell({
  children,
  projects,
}: {
  children: ReactNode
  projects: { id: string; name: string }[]
}) {
  return (
    <>
      <AppLayout projects={projects}>{children}</AppLayout>
      <Toaster position="bottom-right" richColors />
    </>
  )
}
