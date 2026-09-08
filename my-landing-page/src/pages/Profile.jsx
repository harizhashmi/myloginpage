    function Profile({ onBack, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8">

        <div className="flex items-center gap-4">

          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold">
            Profile
          </h1>

        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
        >
          Logout
        </button>

      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto p-8">

        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold">
              H
            </div>

            {/* User Info */}
            <div className="text-center md:text-left">

              <h2 className="text-3xl font-bold">
                Hariz Hashmi
              </h2>

              <p className="text-slate-400 mt-2">
                Administrator
              </p>

              <p className="text-slate-500 mt-1">
                hariz@example.com
              </p>

            </div>

          </div>

        </div>

        {/* Personal Information */}
        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-xl font-semibold mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-slate-500 mb-2">
                Full Name
              </p>

              <p className="text-slate-200">
                Hariz Hashmi
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-2">
                Email
              </p>

              <p className="text-slate-200">
                hariz@example.com
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-2">
                Phone
              </p>

              <p className="text-slate-200">
                +60 12-345 6789
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-2">
                Role
              </p>

              <p className="text-slate-200">
                Administrator
              </p>
            </div>

          </div>

          <button className="mt-8 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">
            Edit Profile
          </button>

        </div>

        {/* Change Password */}
        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-xl font-semibold mb-6">
            Change Password
          </h2>

          <div className="space-y-5">

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Current Password
              </label>

              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                placeholder="Enter current password"
              />

            </div>

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                New Password
              </label>

              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                placeholder="Enter new password"
              />

            </div>

            <div>

              <label className="block text-sm text-slate-400 mb-2">
                Confirm New Password
              </label>

              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                placeholder="Confirm new password"
              />

            </div>

          </div>

          <button className="mt-6 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">
            Update Password
          </button>

        </div>

      </main>

    </div>
  )
}

export default Profile