import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";

type LoginProps = {
  onLogin: (credentials: {
    email: string;
    password: string;
  }) => Promise<boolean>;
};

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = await onLogin({ email, password });

    if (!success) {
      setError("Incorrect email or password");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 mb-4">
            <span className="text-2xl font-bold text-white">M</span>
          </div>

          <h1 className="text-3xl font-bold text-white">MyApp</h1>

          <p className="text-slate-400 mt-2">Welcome back</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Sign in</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <Input
                id="email"
                label="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <Input
                id="password"
                label="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold"
            >
              Sign in
            </button>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <p className="text-center text-sm text-slate-400 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
