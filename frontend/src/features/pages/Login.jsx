import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(username, password);

if (success) {
  navigate("/");
}
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login