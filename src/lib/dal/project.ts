import 'server-only'
import { prisma } from '../prisma'
import type { Project } from '../../types'

export async function getProjects() {
  const project = await prisma.project.findMany()
  return project
}

export async function getProject(name: string, userId: string) {
  const project = await prisma.project.findUnique({
    where: {
      userId_name: {
        userId,
        name,
      },
    },
  })

  return project
}

export async function createProject(data: Project) {
  const project = await prisma.project.create({
    data: {
      userId: data.userId,
      name: data.name,
    },
  })
  return project
}
