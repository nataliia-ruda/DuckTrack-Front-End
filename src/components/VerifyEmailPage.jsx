import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
 const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setStatus("Invalid link. No token found.");
      return;
    }

    fetch("http://localhost:3000/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Email verified successfully!") {
          setStatus("Success! Redirecting...");
          setTimeout(() => navigate("/home"), 2000);  
        } else {
          setStatus(data.message);
        }
      })
      .catch(() => setStatus("Something went wrong."));
  }, [navigate]);

  return <div>{status}</div>;
}

export default VerifyEmailPage