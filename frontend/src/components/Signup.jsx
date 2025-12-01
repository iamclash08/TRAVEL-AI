import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import "../styles/Signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed. Try again!");
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">

        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            className="signup-input"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            className="signup-input"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            className="signup-input"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <button onClick={() => navigate("/")} className="link-btn">
            Login
          </button>
        </p>

      </div>
    </div>
  );
}
