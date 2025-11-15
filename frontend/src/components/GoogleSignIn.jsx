import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleSignIn = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/google/", {
        id_token: credentialResponse.credential,
      });
      console.log("Google login success:", res.data);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
    } catch (err) {
      console.error("Google signin failed", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleSignIn;
