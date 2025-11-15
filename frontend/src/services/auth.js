// src/services/auth.js
import API from "../api";

export async function register(payload) {
  const res = await API.post("/api/auth/register/", payload);
  const { access, refresh } = res.data;
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  API.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  return res.data;
}

export async function login(username, password) {
  const res = await API.post("/api/auth/token/", { username, password });
  const { access, refresh } = res.data;
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  API.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  return res.data;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  delete API.defaults.headers.common["Authorization"];
}
