import { redirect } from 'next/navigation'
import { getCurrentUser } from '../../lib/dal/user'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) redirect('/login')

  return (
    <section className="mx-auto max-w-3xl p-5 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-violet-700">
        Your account
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Profile</h1>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">Account details</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="mt-1 font-medium text-slate-800">{user.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Role</dt>
            <dd className="mt-1 font-medium capitalize text-slate-800">
              {user.role.toLowerCase()}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
