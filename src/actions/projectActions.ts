'use server'

import type z from 'zod'
import { ProjectSchema } from '../types'
import { createProject } from '../lib/dal/project'
import { revalidatePath } from 'next/cache'

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
  if ('error' in response) {
    return { error: response.error }
  }
  revalidatePath("/inbox")
  return { message: 'پروژه ساخته شد' }
}
