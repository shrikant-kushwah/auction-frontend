// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slice/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    dispatch(registerUser({ name, email, password })).then((res) => {
      if (!error && res.type === 'auth/registerUser/fulfilled') {
        navigate('/login');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-400 via-blue-500 to-indigo-600 px-6 mt-12 py-12">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 sm:p-12 border border-white border-opacity-30">
        <h2 className="text-4xl font-extrabold text-center text-gradient bg-gradient-to-r from-green-600 via-blue-500 to-indigo-700 bg-clip-text text-transparent mb-8">
          Create an Account
        </h2>

        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-center font-semibold shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-gray-800">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-800">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-800">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:from-green-700 hover:to-blue-700 active:scale-95 transition-transform duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-800">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 font-semibold hover:underline hover:text-green-800 transition">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
