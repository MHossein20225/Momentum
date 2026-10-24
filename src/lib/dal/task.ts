import 'server-only'
import type { Task } from '../../types'
import { prisma } from '../prisma'

export async function createTask(data: Task) {
  const task = await prisma.task.create({
    data: {
      name: data.name,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      status: data.status,
      projectId: data.projectId,
    },
  })
  return task
}
