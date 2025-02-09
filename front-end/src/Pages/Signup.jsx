
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import loginbg from "../assets/loginbg.webp";
import api from "../../axiosInstance";

const Signup = ({ onClose }) => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [role, setRole] = useState("eventOrganizer"); // State to hold the selected role

  const handleSignup = async (e) => {
    e.preventDefault();

    // Get form values
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;

    try {
      const response = await api.post("/users/signup", {
        email,
        password,
        phoneNo: phone,
        role,  // Directly pass role without redundant assignment
    });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);  // Show success message from the response
        setTimeout(() => {
          setSuccessMessage("");
          onClose();  // Close the modal after 3 seconds
        }, 3000);
      } else {
        alert("Registration failed: " + data.message);  // Show error message from the response
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        style={{
          backgroundImage: `url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative w-full max-w-lg">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="">
            <h2 className="mt-2 text-center text-3xl font-bold text-black mb-4">
              Register Page
            </h2>
          </div>

          {successMessage && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
              {successMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email address :
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Create New Password :
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-black mt-6">
                Phone Number :
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Dropdown for Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-black mt-6">
                Select Role :
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                  <option value="1">Event Organizer</option>
                  <option value="2">Guest User</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="group relative flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-[#256BFE] hover:bg-[#256BFE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-black font-bold">Or</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-black">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-[#256BFE] hover:text-[#256BFE]"
              >
                Login
              </a>
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick="/"
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
