import { Routes, Route, useNavigate, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import type { User } from "./types";
import ProtectedRoute from "./components/protectedRoute";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";

type LoginCredentials = {
  email: string;
  password: string;
};

function App() {
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return;
    }

    fetch("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          localStorage.removeItem("access_token");
          setIsLoggedIn(false);
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setUser({
          name: data.name,
          email: data.email,
          role: "user",
          phone: "",
          password: "",
        });

        setIsLoggedIn(true);
      });
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [user, setUser] = useLocalStorage<User>("user", {
    name: "Hariz Hashmi",
    email: "hariz@example.com",
    password: "",
    phone: "+60 12-345 6789",
    role: "administrator",
  });

  const navigate = useNavigate();

  async function handleLogin({ email, password }: LoginCredentials) {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    localStorage.setItem("access_token", data.access_token);
    console.log(data);

    setUser({
      name: data.user.name,
      email: data.user.email,
      role: "user",
      phone: "",
      password: "",
    });

    setIsLoggedIn(true);
    navigate("/dashboard");

    return true;
  }

  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/");
  }
  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />

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
                phone: "",
                role: "user",
              });

              navigate("/login");
            }}
          />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard user={user} onLogout={handleLogout} />
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
  );
}

export default App;
