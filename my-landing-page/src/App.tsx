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
import { apiFetch } from "./api";

type LoginCredentials = {
  email: string;
  password: string;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return;
    }

    apiFetch<User>("/users/me")
      .then((data) => {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
        });

        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
      });
  }, []);

  const navigate = useNavigate();

  async function handleLogin({
    email,
    password,
  }: LoginCredentials): Promise<true | string> {
    try {
      const data = await apiFetch<{ access_token: string; user: User }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
      );

      localStorage.setItem("access_token", data.access_token);

      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });

      setIsLoggedIn(true);
      navigate("/dashboard");

      return true;
    } catch (e) {
      return e instanceof Error ? e.message : "Something went wrong";
    }
  }

  async function handleUpdateUser(values: User) {
    try {
      await apiFetch<User>("/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
        }),
      });

      setUser(values);
    } catch {
      return;
    }
  }

  async function handleDeleteUser() {
    if (!user) {
      return;
    }

    try {
      await apiFetch("/users/me", { method: "DELETE" });
    } catch {
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
              try {
                await apiFetch("/auth/register", {
                  method: "POST",
                  body: JSON.stringify(newUser),
                });

                navigate("/login");

                return true;
              } catch (e) {
                return e instanceof Error ? e.message : "Something went wrong";
              }
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
