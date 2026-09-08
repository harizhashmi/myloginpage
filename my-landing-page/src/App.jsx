import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  function handleLogin() {
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
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
      onProfile={() => setCurrentPage('profile')}
      onLogout={handleLogout}
    />
  )
}

export default App