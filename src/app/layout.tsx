import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { AppShell } from './AppShell'
import '../styles.css'

export const metadata: Metadata = {
  title: 'Momentum — Focus on what matters',
  description: 'Momentum keeps your day clear and your work moving.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
