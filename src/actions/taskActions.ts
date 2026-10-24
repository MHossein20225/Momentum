'use server'

import type z from 'zod'
import { TaskSchema } from '../types'
import { createTask } from '../lib/dal/task'

export async function createTaskAction(
  _previousState: {
    message?: string
    error?: string
    inputError?: z.inferFlattenedErrors<typeof TaskSchema>['fieldErrors']
  },
  formData: FormData,
): Promise<{
  message?: string
  error?: string
  inputError?: z.inferFlattenedErrors<typeof TaskSchema>['fieldErrors']
}> {
  const data = {
    name: formData.get('name'),
    description: formData.get('description'),
    dueDate: formData.get('dueDate'),
    projectId: formData.get('projectId'),
    priority: formData.get('priority'),
    status: formData.get('status'),
  }
  const result = TaskSchema.safeParse(data)

  if (!result.success) return { inputError: result.error.flatten().fieldErrors }

  const task = result.data

  const response = await createTask(task)
  if (!response) return { error: 'تسک ساخته نشد' }
  return { message: 'تسک ساخته شد' }
}
