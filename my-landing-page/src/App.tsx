import { Routes, Route, useNavigate, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import type { User } from "./types";
import ProtectedRoute from "./components/protectedRoute";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { useEffect } from "react";
import { useState } from "react";

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
          id: data.id,
          name: data.name,
          email: data.email,
        });

        setIsLoggedIn(true);
      });
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  async function handleLogin({
    email,
    password,
  }: LoginCredentials): Promise<true | string> {
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
      const data = await response.json();

      return data.message;
    }

    const data = await response.json();

    localStorage.setItem("access_token", data.access_token);
    console.log(data);

    setUser({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
    });

    setIsLoggedIn(true);
    navigate("/dashboard");

    return true;
  }

  async function handleUpdateUser(values: User) {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return;
    }

    const response = await fetch(`http://localhost:3000/users/${values.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
      }),
    });

    if (!response.ok) {
      return;
    }

    setUser(values);
  }

  async function handleDeleteUser() {
    console.log("User being deleted:", user);
    const token = localStorage.getItem("access_token");

    if (!token || !user) {
      return;
    }

    const response = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return;
    }

    localStorage.removeItem("access_token");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    setUser(null);
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
            onRegister={async (newUser) => {
              const response = await fetch(
                "http://localhost:3000/auth/register",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newUser),
                },
              );

              if (!response.ok) {
                const data = await response.json();

                return data.message;
              }

              navigate("/login");

              return true;
            }}
          />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            {user && <Dashboard user={user} onLogout={handleLogout} />}
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            {user && (
              <Profile
                user={user}
                onLogout={handleLogout}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
              />
            )}
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
