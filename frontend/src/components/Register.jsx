// src/components/Register.jsx
import React, { useState } from "react";
import { register } from "../services/auth";

export default function Register({ onAuth }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      const data = await register(form);
      onAuth && onAuth(data.user);
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={submit}>
        <input placeholder="username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <input placeholder="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Register</button>
      </form>
      {err && <pre>{JSON.stringify(err)}</pre>}
    </div>
  );
}
