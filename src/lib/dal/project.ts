import 'server-only'
import { prisma } from '../prisma'
import type { Project } from '../../types'
import { getCurrentUser } from './user'

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
  const user = await getCurrentUser()

  if (!user) {
    return {error: "اجازه اضافه کردن پروژه را ندارید"}
  }

  const project = await prisma.project.create({
    data: {
      userId: user.id,
      name: data.name,
    },
  })

  return project
}
