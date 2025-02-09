

import React, { useState, useEffect } from "react";
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";

const slides = [
  { image: h2, title: "Event Management Software", subtitle: "An event tech platform for face-to-face, online, and hybrid experiences", text: "Ditch the time-consuming work and automate tasks with our platform." },
  { image: h3, title: "Seamless Planning", subtitle: "Streamline your workflow", text: "Our tools help you manage events efficiently and focus on your attendees." },
  { image: h2, title: "Join the Future of Events", subtitle: "Elevate your event experience", text: "Discover the best event management solutions today!" },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
const [successMessage, setSuccessMessage] = useState("");
  const [role, setRole] = useState("eventOrganizer"); 
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
  }, [currentSlide]);
  const handleSignup = async (e) => {
    e.preventDefault();

    // Get form values
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone = e.target.phone.value;

    try {
      const response = await fetch("http://localhost:8001/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          phoneNo: phone,
          role: role,  // Include the selected role in the body
        }),
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
    <section className="relative flex flex-col md:flex-row items-center justify-between h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10">

  
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold ">{slides[currentSlide].title}</h1>
        <h2 className="text-2xl  font-semibold">{slides[currentSlide].subtitle}</h2>
        <p className="text-lg ">{slides[currentSlide].text}</p>
        </div>
      
      {/* Right Side - Form */}
      <div className="md:w-1/3 bg-white text-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
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
      </div>
    </section>
  );
};

export default HeroSlider;
