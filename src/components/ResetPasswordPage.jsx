import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Toolbar,
  AppBar,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleComparePassword = () => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setStatus("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      setStatus("Passwords don't match.");
      return;
    }

    setConfirmPasswordError("");
    setStatus("Sending...");

    fetch("http://localhost:3000/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.message);
        setPassword("");
        setConfirmPassword("");
      })
      .catch(() => {
        setStatus("Something went wrong. Please try again.");
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
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
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          margin: "auto",
          mt: 16,
          p: 9,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
          width: "70%",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>

        {/* New Password field */}
        <FormControl
          size="small"
          sx={{ width: "90%", mb: 1 }}
          variant="outlined"
          required
        >
          <InputLabel htmlFor="new-password">New Password</InputLabel>
          <OutlinedInput
            id="new-password"
            name="password"
            error={!!confirmPasswordError}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end" sx={{ color: "#cccccc" }}>
                <IconButton
                  sx={{ color: "#cccccc" }}
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
          />
        </FormControl>

        {/* Confirm Password field */}
        <FormControl
          size="small"
          sx={{ width: "90%" }}
          variant="outlined"
          required
        >
          <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirm-password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleComparePassword}
            type={showPassword ? "text" : "password"}
            error={!!confirmPasswordError}
            endAdornment={
              <InputAdornment position="end" sx={{ color: "#cccccc" }}>
                <IconButton
                  sx={{ color: "#cccccc" }}
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          disabled={!password || !confirmPassword || !!confirmPasswordError}
          sx={{
            mt: 2,
            width: "90%",
            backgroundColor: "#FFC107",
          }}
        >
          Reset Password
        </Button>

        {confirmPasswordError && (
          <Typography sx={{ mt: 1, color: "red", fontSize: "14px" }}>
            {confirmPasswordError}
          </Typography>
        )}
        {status && (
          <>
            <Typography sx={{ mt: 2, fontSize: "15px" }}>{status}</Typography>

            {status === "Password has been reset successfully!" && (
              <Link
                component={RouterLink}
                to="/signin"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "18px",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <ArrowBackIcon sx={{ width: "18px", height: "18px" }} /> Go back
                to login
              </Link>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
