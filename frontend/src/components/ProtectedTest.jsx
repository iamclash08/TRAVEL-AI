// src/components/ProtectedTest.jsx
import React, { useState } from "react";
import API from "../api";

export default function ProtectedTest() {
  const [resp, setResp] = useState(null);
  const [err, setErr] = useState(null);

  async function callHello() {
    setErr(null);
    try {
      const r = await API.get("/api/auth/hello/");
      setResp(r.data);
    } catch (e) {
      setErr(e.response?.data || e.message);
    }
  }

  return (
    <div>
      <h3>Protected</h3>
      <button onClick={callHello}>Call /api/auth/hello/</button>
      <pre>{resp ? JSON.stringify(resp, null, 2) : err ? JSON.stringify(err, null, 2) : "No response yet"}</pre>
    </div>
  );
}
