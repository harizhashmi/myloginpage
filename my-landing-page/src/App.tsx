import { Routes, Route, useNavigate, Navigate } from 'react-router'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import type { User } from './types'
import { useEffect, useState } from 'react'
import ProtectedRoute from './components/protectedRoute'
import NotFound from './pages/NotFound'


type LoginCredentials = {
  email: string
  password: string
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn))
  }, [isLoggedIn])

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
      setIsLoggedIn(true)
      navigate('dashboard')
      return true
    }
    return false
  }

  function handleLogout() {
    setIsLoggedIn(false)
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
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }

      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard
              user={user}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profile
              user={user}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>

  )
}

export default App
