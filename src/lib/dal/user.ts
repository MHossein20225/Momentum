import 'server-only'
import { type User } from '../../types'
import { prisma } from '../prisma'
import { compare, hash } from 'bcryptjs'
import { cookies } from 'next/headers'

export async function createUser(data: User) {
  const hashedPassword = await hash(data.password, 10)
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'USER',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })
  return user
}


export async function loggedInUser(
  data: Pick<User, 'email' | 'password'>,
) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (!user) {
    return { error: 'ایمیل یا رمز نامعتبر است' }
  }

  const passwordMatches = await compare(data.password, user.password)

  if (!passwordMatches) {
    return { error: 'ایمیل یا رمز نامعتبر است' }
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt,
    },
  })

  const cookieStore = await cookies()

  cookieStore.set('sessionId', session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  })

  return { message: true }
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value
  if (!sessionId) return false
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
        },
      },
    },
  })
  if (!session) {
    cookieStore.delete('sessionId')
    return false
  }
  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    })
    cookieStore.delete('sessionId')
    return false
  }
  return session.user
}


export async function isEmailUsed(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  return user !== null
}