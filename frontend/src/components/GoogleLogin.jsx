import { useEffect } from "react";

function GoogleLogin() {

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  function handleCredentialResponse(response) {
    const idToken = response.credential;

    // send token to backend
    fetch("http://localhost:8000/api/auth/google/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Backend response:", data);
        localStorage.setItem("access", data.access);
      });
  }

  return (
    <div>
      <div id="google-btn"></div>
    </div>
  );
}

export default GoogleLogin;
