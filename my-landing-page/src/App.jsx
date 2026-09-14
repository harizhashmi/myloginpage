import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/dashboard'
import Profile from './pages/Profile'

function App() {
  const user = {
    name: 'Hariz Hashmi',
    email: 'hariz@example.com',
    role: 'administrator',
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  function handleLogin({ email, password }) {
    if (email === 'hariz@gmail.com' && password === '123456') {
      setIsLoggedIn(true)
      setCurrentPage('dashboard')
    }
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
        user={user}
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
