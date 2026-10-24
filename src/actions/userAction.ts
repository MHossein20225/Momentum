'use server'

import type z from 'zod'
import { UserSchema } from '../types'

import { createUser, loggedInUser } from '../lib/dal/user'

export async function createUserAction(
  _previousState: {
    message?: string
    error?: string
    inputError?: z.inferFlattenedErrors<typeof UserSchema>['fieldErrors']
  },
  formData: FormData,
): Promise<{
  message?: string
  error?: string
  inputError?: z.inferFlattenedErrors<typeof UserSchema>['fieldErrors']
}> {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  }
  if (data.password === data.confirmPassword) return { error: "از رمز خود به درستی مطمعن شوید" }
  const result = UserSchema.safeParse(data)

  if (!result.success) return { inputError: result.error.flatten().fieldErrors }

  const user = result.data

  const response = await createUser(user)
  if (!response) return { error: 'کاربر اضافه نشد' }
  return { message: 'کاربر اضافه شد' }
}

export async function loggedInUserAction(
  _previousState: {
    message?: string
    error?: string
    inputError?: z.inferFlattenedErrors<typeof UserSchema>['fieldErrors']
  },
  formData: FormData,
): Promise<{
  message?: string
  error?: string
  inputError?: z.inferFlattenedErrors<typeof UserSchema>['fieldErrors']
}> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const result = UserSchema.pick({email:true, password: true}).safeParse(data)

  if (!result.success) return { inputError: result.error.flatten().fieldErrors }

  const user = result.data

  const response = await loggedInUser(user)
  if (!response) return { error: "کاربر وارد نشد" }
  return { message: "کاربر وارد شد" }
}
