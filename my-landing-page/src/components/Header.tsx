import type { User } from '../types'
import { Link } from 'react-router'

type HeaderProps = {
  title: string
  onLogout: () => void
  user?: User
}

function Header({
  title,
  onLogout,
  user,
}: HeaderProps) {
  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8">

      <div className="flex items-center gap-4">


        <Link
          to="/dashboard"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
        >
          ← Back
        </Link>


        <h1 className="text-2xl font-bold">
          {title}
        </h1>

      </div>

      <div className="flex items-center gap-4">

        {user && (
          <Link
            to="/profile"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="text-right">
              <p className="font-medium">
                {user.name}
              </p>

              <p className="text-sm text-slate-500">
                {user.role}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              H
            </div>
          </Link>
        )}

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
        >
          Logout
        </button>

      </div>

    </header>
  )
}

export default Header
