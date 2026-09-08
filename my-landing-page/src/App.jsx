import { useState } from 'react'

function App() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleSubmit = (event) => {
event.preventDefault()

```
console.log('Email:', email)
console.log('Password:', password)
```

}

return ( <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

```
  <div className="w-full max-w-md">

    {/* Logo */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white">
        MyApp
      </h1>

      <p className="mt-2 text-slate-400">
        Welcome back
      </p>
    </div>

    {/* Login Card */}
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

      <h2 className="text-2xl font-semibold text-white mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit}>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">

            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-400"
            >
              Forgot password?
            </a>

          </div>

          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          Login
        </button>

      </form>

      {/* Sign Up */}
      <p className="text-center text-sm text-slate-400 mt-6">
        Don't have an account?{' '}

        <a
          href="#"
          className="text-blue-500 hover:text-blue-400 font-medium"
        >
          Sign up
        </a>
      </p>

    </div>

  </div>

</div>


)
}

export default App
