import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

const VerifyEmailPage = () => {
  const [status, setStatus] = useState("Verifying...");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setStatus("Invalid link. No token found.");
      setIsSuccess(false);
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
          setStatus("Your email was successfully verified! Redirecting...");
          setIsSuccess(true);
          setTimeout(() => navigate("/home"), 3000);
        } else {
          setStatus(data.message);
          setIsSuccess(false);
          if (data.message === "Invalid or expired token.") {
            setShowResend(true);
          } else {
            setShowResend(false);
          }
        }
      })
      .catch(() => {
        setStatus("Something went wrong.");
        setIsSuccess(false);
      });
  }, [navigate]);

  const handleResend = () => {
    setSending(true);
    setMessage("");

    
    fetch("http://localhost:3000/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "user@example.com" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "Verification email resent!");
        setSending(false);
      })
      .catch(() => {
        setMessage("Failed to resend verification email.");
        setSending(false);
      });
  };

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: "transparent" }}
      >
        <Toolbar
          sx={{
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            backdropFilter: "blur(6px)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            color: "#E0E0E0",
            borderBottom: "2px solid white",
            height: "64px",
            minHeight: "64px",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            DuckTrack - Job Applications Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "64px",
          paddingX: "1rem",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <img
            src={
              isSuccess
                ? "/duck_verification_successful.png"
                : "/duck_something_went_wrong.png"
            }
            alt="duck"
            style={{
              maxWidth: "300px",
              height: "auto",
              marginBottom: "2rem",
            }}
          />

          <Typography variant="h5" gutterBottom>
            {status}
          </Typography>

          {showResend && (
            <>
              <Button
                variant="contained"
                onClick={handleResend}
                disabled={sending}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    backgroundColor: "black",
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.35)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "black",
                    color: "white",
                    boxShadow: "none",
                    transform: "none",
                  },
                  paddingX: 3,
                  paddingY: 1.5,
                  borderRadius: "5px",
                  fontSize: "1rem",
                  textTransform: "none",
                }}
              >
                {sending ? "Resending..." : "Resend Verification Email"}
              </Button>
              {message && (
                <Typography sx={{ color: "green", mt: 2 }}>
                  {message}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyEmailPage;
