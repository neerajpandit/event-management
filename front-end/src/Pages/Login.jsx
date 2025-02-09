
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import login from "../assets/loginn.png";
import api from "../axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    // Extract role from query parameters
    const params = new URLSearchParams(location.search);
    const userRole = params.get('role')  // Default to guest if not specified
    setRole(userRole);
  }, [location]);

  const handleLogin = async (e) => {
  e.preventDefault();

  const userData = { email, password };

  try {
    const response = await api.post("/users/signin", userData);

    const data = await response.json();

    if (data.status && data.statusCode === 200) {
      // Successfully logged in
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userRole', data.userInfo.role); 
      localStorage.setItem('userId', data.userInfo._id); 


      // Redirect based on role
      if (data.userInfo.role === '0') {
        navigate('/dashboard'); // Admin redirect
      } else if (data.userInfo.role === '1') {
        navigate('/eventsdashboard'); // Event Organizer redirect
      } else {
        navigate('/eventspage'); // Guest redirect
      }
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    setError('An error occurred while logging in.');
  }
};


  return (
    <div>
      <div
        className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${login})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 mb-10">
              {role === 'event-organizer' ? 'Event Organizer Login' : ' Login'}
            </h2>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-[#256BFE] hover:bg-[#1A4EDC]"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-black">
                Don’t have an account?{' '}
                <a href="/register" className="font-medium text-[#256BFE] hover:text-[#1A4EDC]">
                  Register
                </a>
              </p>
            </div>

            {/* Back Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
