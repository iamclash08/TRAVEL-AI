import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import "../styles/Login.css";
import GoogleLogin from "./GoogleLogin";   // ✅ Google Login Component

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const data = await login(username, password);

      navigate("/dashboard", {
        state: { user: data.user || { username } },
      });
    } catch (error) {
      setErr(
        error?.response?.data?.detail ||
        error.message ||
        "Login failed"
      );
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>

        <form onSubmit={submit}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            className="login-input"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />

          {err && <div className="error-text">{err}</div>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="redirect-text">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="link-btn"
          >
            Sign Up
          </button>
        </p>

        {/* ------------------------------ */}
        {/* GOOGLE LOGIN BUTTON SECTION    */}
        {/* ------------------------------ */}

        <div className="google-section">
          <hr className="google-divider" />
          <GoogleLogin />   {/* ✅ GOOGLE LOGIN BUTTON */}
        </div>

      </div>
    </div>
  );
}
