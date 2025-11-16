import API from "../api";   // <-- your axios instance with baseURL
import axios from "axios";  // <-- only used for signup (public endpoint)

// ✅ REGISTER (Signup)
export async function register(username, email, password) {
  const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
    username,
    email,
    password,
  });

  return res.data;  // No token at signup — user will login afterwards
}

// ✅ LOGIN
export async function login(username, password) {
  const res = await API.post("/api/auth/token/", { username, password });

  const { access, refresh } = res.data;

  // Save tokens
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  // Set Authorization header
  API.defaults.headers.common["Authorization"] = `Bearer ${access}`;

  return res.data;
}

// ✅ LOGOUT
export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  delete API.defaults.headers.common["Authorization"];
}
