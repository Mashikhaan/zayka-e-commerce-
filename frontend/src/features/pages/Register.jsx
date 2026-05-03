import React, { useState } from 'react'
import { Link,  } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, handleRegister } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register