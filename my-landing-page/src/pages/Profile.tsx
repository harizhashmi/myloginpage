import Header from '../components/Header'
import type { User } from '../types'

type InfoFieldProps = {
  label: string
  value: string
}

type ProfileProps = {
  user: User
  onBack: () => void
  onLogout: () => void
}


function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div>
      <p className="text-sm text-slate-500 mb-2">
        {label}
      </p>

      <p className="text-slate-200">
        {value}
      </p>
    </div>
  )
}

function Profile({
  user,
  onBack,
  onLogout,
}: ProfileProps) {
  const infoFields = [
    {
      label: 'Full Name',
      value: user.name,
    },
    {
      label: 'Email',
      value: user.email,
    },
    {
      label: 'Phone',
      value: '+60 12-345 6789',
    },
    {
      label: 'Role',
      value: user.role,
    },
  ]
  {
    return (

      < div className="min-h-screen bg-slate-950 text-white" >

        {/* Header */}
        < Header
          title="Profile"
          onBack={onBack}
          onLogout={onLogout}
        />

        {/* Main */}
        < main className="max-w-4xl mx-auto p-8" >

          {/* Profile Card */}
          < div className="bg-slate-900 border border-slate-800 rounded-2xl p-8" >

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold">
                {user.name.charAt(0)}
              </div>

              {/* User Info */}
              <div className="text-center md:text-left">

                <h2 className="text-3xl font-bold">
                  {user.name}              </h2>

                <p className="text-slate-400 mt-2">
                  {user.role}
                </p>

                <p className="text-slate-500 mt-1">
                  {user.email}              </p>

              </div>

            </div>

          </div >

          {/* Personal Information */}
          < div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8" >

            <h2 className="text-xl font-semibold mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {infoFields.map((field) => (
                <InfoField
                  key={field.label}
                  {...field}
                />
              ))}

            </div>

            <button
              disabled
              className="mt-8 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl opacity-50 cursor-not-allowed"
            >
              Edit Profile
            </button>

          </div >

          {/* Change Password */}
          < div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8" >

            <h2 className="text-xl font-semibold mb-6">
              Change Password
            </h2>

            <div className="space-y-5">

              <div>

                <label
                  htmlFor="current-password"
                  className="block text-sm text-slate-400 mb-2"
                >
                  Current Password
                </label>

                <input
                  id="current-password"
                  type="password"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                  placeholder="Enter current password"
                />

              </div>

              <div>

                <label
                  htmlFor="new-password"
                  className="block text-sm text-slate-400 mb-2"
                >
                  New Password
                </label>

                <input
                  id="new-password"
                  type="password"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                  placeholder="Enter new password"
                />

              </div>

              <div>

                <label
                  htmlFor="confirm-password"
                  className="block text-sm text-slate-400 mb-2"
                >
                  Confirm New Password
                </label>

                <input
                  id="confirm-password"
                  type="password"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                  placeholder="Confirm new password"
                />

              </div>

            </div>

            <button
              disabled
              className="mt-6 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold opacity-50 cursor-not-allowed"
            >
              Update Password
            </button>

          </div >

        </main >

      </div >
    )
  }
}

export default Profile
