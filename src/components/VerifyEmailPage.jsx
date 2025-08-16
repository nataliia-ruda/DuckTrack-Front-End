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
    <Box sx={{ minHeight: "100vh", width: "100%", position: "relative" }}>
      {/* Fixed AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            color: "#E0E0E0",
            borderBottom: "2px solid white",
            minHeight: { xs: "56px", sm: "64px" },
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            DuckTrack - Job Applications Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          pt: { xs: "25%", sm: "64px" },
          minHeight: "100vh",
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "center",
          paddingX: "1rem",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            py: { xs: 2, sm: 4 },
          }}
        >
          <Box
            component="img"
            src={
              isSuccess
                ? "/duck_verification_successful.png"
                : "/duck_something_went_wrong.png"
            }
            alt="duck"
            sx={{
              width: { xs: "70%", sm: "60%", md: "100%" },
              maxWidth: "300px",
              height: "auto",
              mb: { xs: "1.5rem", sm: "2rem" },
              mx: "auto",
            }}
          />

          {/* Status Message */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
              mb: { xs: 2, sm: 3 },
            }}
          >
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
                    transform: "scale(1.03)",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.35)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "black",
                    color: "white",
                    boxShadow: "none",
                    transform: "none",
                  },
                  px: 3,
                  py: 1.5,
                  borderRadius: "5px",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textTransform: "none",
                  width: { xs: "100%", sm: "auto" },
                  mb: 2,
                }}
              >
                {sending ? "Resending..." : "Resend Verification Email"}
              </Button>

              {message && (
                <Typography
                  sx={{
                    color: "green",
                    mt: 2,
                    fontSize: { xs: "0.85rem", sm: "1rem" },
                  }}
                >
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
