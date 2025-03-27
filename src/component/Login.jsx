import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    
    if (trimmedUsername) {
      if (trimmedUsername.length < 3) {
        setError('Username must be at least 3 characters long');
        return;
      }
      
      login(trimmedUsername);
      navigate('/'); // Redirect to todo list after login
    } else {
      setError('Please enter a valid username');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 mt-5">Sign in to continue to your dashboard</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label 
                  htmlFor="username" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError(''); // Clear error when typing
                    }}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition duration-300 ease-in-out"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-2 animate-shake">
                    {error}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md 
                  hover:bg-blue-700 transition duration-300 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center space-x-2"
                disabled={!username.trim()}
              >
                <span>Sign In</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;