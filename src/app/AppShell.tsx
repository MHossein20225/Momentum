'use client'

import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { AppLayout } from '../components/AppLayout'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AppLayout>{children}</AppLayout>
      <Toaster position="bottom-right" richColors />
    </>
  )
}
