import { Routes, Route, useNavigate } from 'react-router'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import type { User } from './types'



type LoginCredentials = {
  email: string
  password: string
}

function App() {
  const user: User = {
    name: 'Hariz Hashmi',
    email: 'hariz@example.com',
    role: 'administrator',
  }

  const navigate = useNavigate()

  function handleLogin({
    email,
    password,
  }: LoginCredentials) {
    if (
      email === 'hariz@gmail.com' &&
      password === '123456'
    ) {
      navigate('dashboard')
      return true
    }
    return false
  }

  function handleLogout() {
    navigate('/')
  }
  return (
    <Routes>
      <Route
        path="/"
        element={<Login onLogin={handleLogin} />}
      />

      <Route
        path="/login"
        element={<Login onLogin={handleLogin} />}
      />

      <Route
        path="/dashboard"
        element={
          <Dashboard
            user={user}
            onLogout={handleLogout}
          />
        }
      />

      <Route
        path="/profile"
        element={
          <Profile
            user={user}
            onLogout={handleLogout}
          />
        }
      />
    </Routes>
  )
}

export default App
