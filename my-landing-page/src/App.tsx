import { Routes, Route, useNavigate, Navigate } from 'react-router'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import type { User } from './types'
import ProtectedRoute from './components/protectedRoute'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import useLocalStorage from './hooks/useLocalStorage'


type LoginCredentials = {
  email: string
  password: string
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage(
    'isLoggedIn',
    false
  )
  const [user, setUser] = useLocalStorage<User>('user', {
    name: 'Hariz Hashmi',
    email: 'hariz@example.com',
    password: '',
    phone: '+60 12-345 6789',
    role: 'administrator',
  })

  const navigate = useNavigate()

  function handleLogin({ email, password }: LoginCredentials) {
    if (email === user.email && password === user.password) {
      setIsLoggedIn(true)
      navigate('/dashboard')
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
        path="/register"
        element={
          <Register
            onRegister={(newUser) => {
              setUser({
                ...newUser,
                phone: '',
                role: 'user',
              })

              navigate('/login')
            }}
          />
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
              onUpdateUser={setUser}
            />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>

  )
}

export default App
