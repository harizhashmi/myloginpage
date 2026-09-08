function Dashboard({ onProfile, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8">

        <h1 className="text-2xl font-bold">
          MyApp
        </h1>

        <div className="flex items-center gap-4">

          {/* Profile */}
          <button
            onClick={onProfile}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="text-right">
              <p className="font-medium">
                Hariz
              </p>

              <p className="text-sm text-slate-500">
                Administrator
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              H
            </div>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
          >
            Logout
          </button>

        </div>

      </header>

      {/* Main */}
      <main className="p-8">

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Welcome back, Hariz 👋
          </h2>

          <p className="text-slate-400 mt-2">
            Here's what's happening with your application.
          </p>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400">
              Total Users
            </p>

            <h3 className="text-4xl font-bold mt-3">
              1,248
            </h3>

            <p className="text-green-400 text-sm mt-2">
              ↑ 8.2% this month
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400">
              Revenue
            </p>

            <h3 className="text-4xl font-bold mt-3">
              $24,580
            </h3>

            <p className="text-green-400 text-sm mt-2">
              ↑ 12.5% this month
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <p className="text-slate-400">
              Orders
            </p>

            <h3 className="text-4xl font-bold mt-3">
              342
            </h3>

            <p className="text-green-400 text-sm mt-2">
              ↑ 5.4% this month
            </p>

          </div>

        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-5">

            <div className="border-b border-slate-800 pb-5">

              <p className="font-medium">
                New user registered
              </p>

              <p className="text-sm text-slate-500">
                john@example.com
              </p>

            </div>

            <div className="border-b border-slate-800 pb-5">

              <p className="font-medium">
                New order received
              </p>

              <p className="text-sm text-slate-500">
                Order #1234
              </p>

            </div>

            <div>

              <p className="font-medium">
                Payment received
              </p>

              <p className="text-sm text-slate-500">
                $250.00
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Dashboard