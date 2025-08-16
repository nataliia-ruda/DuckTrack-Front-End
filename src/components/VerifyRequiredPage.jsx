import { useState } from "react";
import {
  Box,
  Toolbar,
  Button,
  Typography,
  AppBar,
  Container,
} from "@mui/material";

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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="fixed" sx={{ width: "100%" }}>
        <Toolbar
          sx={{
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            backdropFilter: "blur(6px)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            color: "#E0E0E0",
            borderBottom: "2px solid white",
            minHeight: 64,
          }}
        >
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            DuckTrack - Job Applications Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Container
        maxWidth="sm"
        sx={{
          height: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          flex: 1,
          py: 6,
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src="/duck_verify_email.png"
          alt="Duck with an envelope"
          sx={{
            width: "50%",
            maxWidth: 300,
            height: "auto",
            mb: { xs: 2, md: 4 },
          }}
        />

        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 2, fontSize: { xs: "1.1rem", md: "1.4rem" } }}
        >
          Your email is not verified
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 3, fontSize: { xs: "0.8rem", md: "1rem" } }}
        >
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
            fontSize: { xs: "0.6rem", md: "0.8rem" },
            backgroundColor: "black",
            color: "white",
            px: 4,
            py: 1.5,
            borderRadius: 1,
            "&:hover": { backgroundColor: "black", transform: "scale(1.03)" },
            transition: "transform 0.2s ease",
            minWidth: 250,
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
              fontSize: { xs: "0.8rem", md: "0.9rem" },
            }}
          >
            {message}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default VerifyRequiredPage;
