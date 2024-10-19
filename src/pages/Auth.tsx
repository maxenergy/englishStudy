import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { AuthContext } from '../App';

type AuthMode = 'login' | 'register' | 'forgotPassword';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the authentication logic
    console.log('Form submitted:', { mode, email, password, username });
    
    // For demonstration purposes, we'll just set isAuthenticated to true
    // In a real application, you would verify credentials here
    if (mode === 'login' || mode === 'register') {
      setIsAuthenticated(true);
      navigate('/');
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Login to Your Account</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 pl-10 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 pl-10 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Login
            </button>
            <div className="mt-4 text-center">
              <button onClick={() => setMode('forgotPassword')} className="text-blue-500 hover:underline">
                Forgot Password?
              </button>
            </div>
            <div className="mt-4 text-center">
              Don't have an account?{' '}
              <button onClick={() => setMode('register')} className="text-blue-500 hover:underline">
                Register
              </button>
            </div>
          </>
        );
      case 'register':
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  className="w-full p-2 pl-10 border rounded"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 pl-10 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 pl-10 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Register
            </button>
            <div className="mt-4 text-center">
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-blue-500 hover:underline">
                Login
              </button>
            </div>
          </>
        );
      case 'forgotPassword':
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 pl-10 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Reset Password
            </button>
            <div className="mt-4 text-center">
              <button onClick={() => setMode('login')} className="text-blue-500 hover:underline">
                Back to Login
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {renderForm()}
        </form>
      </div>
    </div>
  );
};

export default Auth;