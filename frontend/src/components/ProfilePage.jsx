// src/components/ProfilePage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get user info passed via navigate state (from login/dashboard)
  const user = location.state?.user || { username: "Guest", email: "guest@example.com" };

  const handleLogout = () => {
    // Clear session storage/local storage if used
    localStorage.removeItem("authToken");

    // ✅ Redirect to actual login page (your root /)
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          TravelAI
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Logged in as <strong>{user.username}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 p-6 gap-6">
        {/* Left - Profile Section */}
        <div className="w-1/3 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="space-y-3">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email || "Not provided"}
            </p>
            <p>
              <strong>Member since:</strong> Jan 2025
            </p>
          </div>
        </div>

        {/* Right - Trips Section */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Your Trips</h2>

          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Saved Trips</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Trip to Goa</li>
              <li>Europe Tour</li>
              <li>Weekend at Manali</li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2">Completed Trips</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Jaipur - Dec 2024</li>
              <li>Kashmir - Nov 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
