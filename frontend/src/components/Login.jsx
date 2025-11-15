// // src/components/Login.jsx
// import React, { useState } from "react";
// import { login } from "../services/auth";

// export default function Login({ onAuth }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState(null);

//   async function submit(e) {
//     e.preventDefault();
//     try {
//       const data = await login(username, password);
//       onAuth && onAuth(data.user || { username });
//     } catch (e) {
//       setErr(e.response?.data || e.message);
//     }
//   }

//   return (
//     <div>
//       <h3>Login</h3>
//       <form onSubmit={submit}>
//         <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
//         <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
//         <button type="submit">Login</button>
//       </form>
//       {err && <pre>{JSON.stringify(err)}</pre>}
//     </div>
//   );
// }



// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const data = await login(username, password);

      // ✅ Redirect to dashboard with user info
      navigate("/dashboard", { state: { user: data.user || { username } } });
    } catch (error) {
      setErr(error?.response?.data?.detail || error.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Welcome Back
        </h2>

        {/* Login Form */}
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {err && (
            <div className="text-red-500 text-sm text-center">{err}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
