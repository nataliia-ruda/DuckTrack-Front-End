import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required!");
      setStatus("");
      return;
    }
    if (emailError) {
      setStatus("");
      return;
    }

    setStatus("Sending...");
    fetch("http://localhost:3000/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.message || "Check your email for reset link.");
        setEmail(""); 
      })
      .catch(() => {
        setStatus("Something went wrong. Please try again.");
      });
  };

  const handleEmailBlur = (event) => {
    const value = event.target.value;
    if (value !== "") {
      const emailValidation =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailValidation.test(value)) {
        setEmailError("Email format is invalid!");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("Email is required!");
    }
  };

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
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
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          margin: "auto",
          mt: 16,
          p: 9,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          textAlign: "center",
          width: "70%",
          height: "auto",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Forgot password?
        </Typography>

        <Typography variant="p" gutterBottom>
          Please, enter your email and we'll send you a link to reset your
          password
        </Typography>

        <TextField
          onBlur={handleEmailBlur}
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!email || !!emailError}
          sx={{ backgroundColor: "#FFC107" }}
        >
          Send Reset Link
        </Button>

        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: "18px",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <ArrowBackIcon sx={{ width: "18px", height: "18px" }} /> Go back to
          login
        </Link>

        {emailError && (
          <Typography variant="p" sx={{ mt: 2, color: "red" }}>
            {emailError}
          </Typography>
        )}
        {status && (
          <Typography variant="p" sx={{ mt: 2 }}>
            {status}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
