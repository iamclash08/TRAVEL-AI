import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const user =
    location.state?.user || { username: "Guest", email: "guest@example.com" };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="profile-container">

      {/* Navbar */}
      <nav className="profile-navbar">
        <h1 onClick={() => navigate("/dashboard")} className="navbar-logo">
          TravelAI
        </h1>

        <div className="navbar-right">
          <span>Logged in as <strong>{user.username}</strong></span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="profile-main">

        <div className="profile-card">
          <h2>Profile</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member since:</strong> Jan 2025</p>
        </div>

        <div className="trips-card">
          <h2>Your Trips</h2>

          <h3>Saved Trips</h3>
          <ul>
            <li>Trip to Goa</li>
            <li>Europe Tour</li>
            <li>Weekend at Manali</li>
          </ul>

          <h3>Completed Trips</h3>
          <ul>
            <li>Jaipur - Dec 2024</li>
            <li>Kashmir - Nov 2024</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
