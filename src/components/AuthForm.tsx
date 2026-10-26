'use client'

import Link from 'next/link'
import { ListTodo } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { createUserAction, loggedInUserAction } from '../actions/userAction'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const isRegister = mode === 'register'
  const [registerState, registerAction, registerPending] = useActionState(
    createUserAction,
    {},
  )
  const [logInState, logInAction, logInPending] = useActionState(
    loggedInUserAction,
    {},
  )
  const router = useRouter()

  const title = isRegister ? 'Create account' : 'Enter'
  const actionState = isRegister ? registerState : logInState

  useEffect(() => {
    if (actionState.error) {
      toast.error(actionState.error)
      return
    }

    if (actionState.message) {
      toast.success(actionState.message)
      const timeout = window.setTimeout(
        () => router.replace(isRegister ? '/login' : '/inbox'),
        2000,
      )
      return () => window.clearTimeout(timeout)
    }
  }, [actionState, isRegister, router])

  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link
            href="/login"
            className="mb-10 inline-flex items-center gap-3 text-xl font-bold text-slate-900"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-violet-600 text-white">
              <ListTodo size={21} />
            </span>
            Momentum
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-violet-700">
              {isRegister ? 'Get started' : 'Welcome back'}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {isRegister ? 'Create your account' : 'Sign in to Momentum'}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {isRegister
                ? 'Create a space for the work that matters.'
                : 'Pick up where you left off.'}
            </p>

            <form
              className="mt-8 space-y-5"
              action={isRegister ? registerAction : logInAction}
            >
              {isRegister && (
                <label className="block space-y-2 text-sm font-medium text-slate-700">
                  Full name
                  <input
                    name="name"
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-3 font-normal outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    placeholder="Your name"
                  />
                </label>
              )}
              {registerState?.inputError?.name?.[0] && (
                <p role="alert" className="text-sm text-rose-600">
                  {registerState.inputError.name[0]}
                </p>
              )}

              <label className="block space-y-2 text-sm font-medium text-slate-700">
                Email address
                <input
                  name="email"
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-3 font-normal outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  placeholder="you@example.com"
                />
              </label>

              {registerState?.inputError?.email?.[0] && (
                <p role="alert" className="text-sm text-rose-600">
                  {registerState.inputError.email[0]}
                </p>
              )}
              {logInState?.inputError?.email?.[0] && (
                <p role="alert" className="text-sm text-rose-600">
                  {logInState.inputError.email[0]}
                </p>
              )}
              <label className="block space-y-2 text-sm font-medium text-slate-700">
                Password
                <input
                  name="password"
                  type="password"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-3 font-normal outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  placeholder="At least 8 characters"
                />
              </label>
              {registerState?.inputError?.password?.[0] && (
                <p role="alert" className="text-sm text-rose-600">
                  {registerState.inputError.password[0]}
                </p>
              )}
              {logInState?.inputError?.password?.[0] && (
                <p role="alert" className="text-sm text-rose-600">
                  {logInState.inputError.password[0]}
                </p>
              )}

              {isRegister && (
                <label className="block space-y-2 text-sm font-medium text-slate-700">
                  Confirm password
                  <input
                    name="confirmPassword"
                    type="password"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-3 font-normal outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    placeholder="Enter your password again"
                  />
                </label>
              )}
              {registerState?.inputError?.confirmPassword?.[0] && (
                <p role="alert" className="text-sm text-rose-600">
                  {registerState.inputError.confirmPassword[0]}
                </p>
              )}

              {/* {!isRegister && (
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    name="remember"
                    className="size-4 rounded border-slate-300 accent-violet-600"
                  />
                  Remember me
                </label>
              )} */}

              <button
                type="submit"
                className="w-full rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                disabled={registerPending || logInPending}
              >
                {registerPending || logInPending ? 'Creating…' : title}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              {isRegister ? 'Already have an account?' : 'New to Momentum?'}{' '}
              <Link
                href={isRegister ? '/login' : '/register'}
                className="font-semibold text-violet-700 hover:text-violet-800"
              >
                {isRegister ? 'Sign in' : 'Create an account'}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-28 -top-28 size-96 rounded-full border-[48px] border-violet-600/70" />
        <div className="absolute -bottom-36 -left-28 size-[30rem] rounded-full bg-violet-600/70" />
        <div className="relative text-sm font-medium text-violet-200">
          A little more focus. A lot more momentum.
        </div>
        <div className="relative max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
            Make room for what matters
          </p>
          <h2 className="mt-5 text-5xl font-bold leading-tight">
            Your next step starts here.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-violet-100">
            Keep your plans clear, your priorities close, and your attention on
            the work in front of you.
          </p>
        </div>
        <p className="relative text-sm text-violet-200">
          A calm place to move your work forward.
        </p>
      </aside>
    </main>
  )
}
