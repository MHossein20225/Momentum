import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { AppShell } from './AppShell'
import { getProjects } from '../lib/dal/project'
import '../styles.css'

export const metadata: Metadata = {
  title: 'Momentum — Focus on what matters',
  description: 'Momentum keeps your day clear and your work moving.',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const projects = await getProjects()

  return (
    <html lang="en">
      <body>
        <AppShell projects={projects.map(({ id, name }) => ({ id, name }))}>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
