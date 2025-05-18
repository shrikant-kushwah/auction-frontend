import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { loginUser } from '../redux/slice/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((res) => {
      if (res.type === 'auth/loginUser/fulfilled') {
        toast.success("Login successful! Redirecting...");
        navigate('/');
      } else {
        // Prefer res.error.message or fallback to state error
        toast.error(res.error?.message || error || "Login failed. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-300 to-indigo-400 px-6 mt-8">
      <div className="max-w-md w-full bg-white bg-opacity-30 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-14 border border-white border-opacity-30">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-4 drop-shadow-md">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-6 text-center text-red-600 font-semibold bg-red-100 rounded-md py-2 shadow-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-gray-700 font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 active:scale-95 transition-transform duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-800">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-green-700 font-semibold hover:underline hover:text-green-900 transition"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
