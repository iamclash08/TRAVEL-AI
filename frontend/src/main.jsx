import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="587595740893-g3it62i26n785ed4vaei1s1h5mamigf3.apps.googleusercontent.com"> 
    <App />
  </GoogleOAuthProvider>
);
