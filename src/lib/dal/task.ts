import 'server-only'
import type { Task } from '../../types'
import { prisma } from '../prisma'
import { getCurrentUser } from './user'

export async function createTask(data: Task) {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'اجازه اضافه کردن پروژه را ندارید' }
  }
  const existingTask = await prisma.task.findUnique({
    where: {
      projectId_name: {
        projectId: data.projectId,
        name: data.name,
      },
    },
  })

  if (existingTask) {
    return { error: 'این تسک قبلاً در پروژه وجود دارد.' }
  }

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
