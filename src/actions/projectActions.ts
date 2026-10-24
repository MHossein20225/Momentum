'use server'

import type z from 'zod'
import { ProjectSchema } from '../types'
import { createProject } from '../lib/dal/project'

export async function createProjectAction(
  _previousState: {
    message?: string
    error?: string
    inputError?: z.inferFlattenedErrors<typeof ProjectSchema>['fieldErrors']
  },
  formData: FormData,
): Promise<{
  message?: string
  error?: string
  inputError?: z.inferFlattenedErrors<typeof ProjectSchema>['fieldErrors']
}> {
  const data = {
    name: formData.get('name'),
    
  }
  const result = ProjectSchema.safeParse(data)

  if (!result.success) return { inputError: result.error.flatten().fieldErrors }

  const project = result.data

  const response = await createProject(project)
  if (!response) return { error: 'پروژه ساخته نشد' }
  return { message: 'پروژه ساخته شد' }
}