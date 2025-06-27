import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

const VerifyRequiredPage = () => {
  const email = localStorage.getItem("pendingEmail");
  const user_id = localStorage.getItem("pendingUserId");

  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleResend = async () => {
    setSending(true);

    try {
      const res = await fetch("http://localhost:3000/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, user_id }),
      });

      const data = await res.json();
      setMessage(data.message || "Verification email has been resent!");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
    } finally {
      setSending(false);
    }
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
            src="/duck_verify_email.png"
            alt="duck with an envelope"
            style={{
              maxWidth: "300px",
              height: "auto",
              marginBottom: "2rem",
            }}
          />

          <Typography variant="h5" gutterBottom>
            Your email is not verified
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            To continue, please verify your email. We sent you a link to:{" "}
            <strong>{email}</strong>.
            <br />
            If the link is expired, click the button below to receive a new one.
          </Typography>

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
            <Typography sx={{ color: "green", mt: 2 }}>{message}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyRequiredPage;
