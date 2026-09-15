import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

type User = {
  name: string
  email: string
  role: string
}

type Page = 'dashboard' | 'profile'

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

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  function handleLogin({
    email,
    password,
  }: LoginCredentials) {
    if (
      email === 'hariz@gmail.com' &&
      password === '123456'
    ) {
      setIsLoggedIn(true)
      setCurrentPage('dashboard')
      return true
    }
    return false
  }

  function handleLogout() {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  if (currentPage === 'profile') {
    return (
      <Profile
        onBack={() => setCurrentPage('dashboard')}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <Dashboard
      user={user}
      onProfile={() => setCurrentPage('profile')}
      onLogout={handleLogout}
    />
  )
}

export default App
