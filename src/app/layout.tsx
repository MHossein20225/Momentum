import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { AppShell } from './AppShell'
import { getProjects } from '../lib/dal/project'
import { getCurrentUser } from '../lib/dal/user'
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
  const [projects, currentUser] = await Promise.all([
    getProjects(),
    getCurrentUser(),
  ])

  return (
    <html lang="en">
      <body>
        <AppShell
          projects={projects.map(({ id, name }) => ({ id, name }))}
          currentUser={
            currentUser
              ? {name: currentUser.name, email: currentUser.email, role: currentUser.role }
              : null
          }
        >
          {children}
        </AppShell>
      </body>
    </html>
  )
}
