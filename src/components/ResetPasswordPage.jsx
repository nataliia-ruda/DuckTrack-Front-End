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
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [pwHelpOpen, setPwHelpOpen] = useState(false);
  const [pwAnchorEl, setPwAnchorEl] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const validatePassword = (value) => {
    const longEnough = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasSpecial = /[^\w\s]/.test(value);
    const ok = longEnough && hasUpper && hasSpecial;
    return { longEnough, hasUpper, hasSpecial, ok };
  };

  const PasswordChecklist = ({ value }) => {
    const { longEnough, hasUpper, hasSpecial } = validatePassword(value);
    const Row = ({ ok, text }) => (
      <ListItem dense sx={{ py: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 28 }}>
          {ok ? (
            <CheckCircleIcon color="success" fontSize="small" />
          ) : (
            <CancelIcon color="error" fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{ fontSize: 13 }}
          sx={{ m: 0 }}
        />
      </ListItem>
    );
    return (
      <List dense sx={{ py: 0.5 }}>
        <Row ok={longEnough} text="At least 8 characters" />
        <Row ok={hasUpper} text="Uppercase letter (A–Z)" />
        <Row ok={hasSpecial} text="Special character (!@#$…)" />
      </List>
    );
  };

  const handleComparePassword = () => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Require both fields
    if (!password || !confirmPassword) {
      setStatus("All fields are required.");
      return;
    }

    const pwRes = validatePassword(password);
    if (!pwRes.ok) {
      setPasswordError("Password doesn't meet the requirements.");
      setStatus("");
      return;
    }

    // Match check
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      setStatus("Passwords don't match.");
      return;
    }

    setConfirmPasswordError("");
    setPasswordError("");
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
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <Box
      sx={{
        height: "100vh",
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
          height: "auto",
          margin: "auto",
          mt: 16,
          p: 9,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
          width: { xs: "60%", md: "70%" },
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontSize: { xs: 18, md: 24 } }}
        >
          Reset Password
        </Typography>

        {/* New Password field */}
        <FormControl
          size="small"
          sx={{ width: "90%", mb: 1 }}
          variant="outlined"
          required
        >
          <InputLabel
            htmlFor="new-password"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            New Password
          </InputLabel>
          <OutlinedInput
            id="new-password"
            name="password"
            error={!!passwordError}
            value={password}
            onChange={(e) => {
              const val = e.target.value;
              setPassword(val);
              const res = validatePassword(val);
              setPasswordError(
                res.ok ? "" : "Password doesn't meet the requirements."
              );
              if (!pwHelpOpen) {
                setPwAnchorEl(e.currentTarget);
                setPwHelpOpen(true);
              }
              // update confirm mismatch live
              if (confirmPassword) {
                setConfirmPasswordError(
                  val === confirmPassword ? "" : "Passwords do not match!"
                );
              }
            }}
            onFocus={(e) => {
              setPwAnchorEl(e.currentTarget);
              setPwHelpOpen(true);
            }}
            onBlur={() => setTimeout(() => setPwHelpOpen(false), 120)}
            size={isSmallScreen ? "small" : "medium"}
            type={showPassword ? "text" : "password"}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
            }}
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
                  {showPassword ? (
                    <VisibilityOff sx={{ fontSize: { xs: 18, md: 24 } }} />
                  ) : (
                    <Visibility sx={{ fontSize: { xs: 18, md: 24 } }} />
                  )}
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
          <InputLabel
            htmlFor="confirm-password"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="confirm-password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              const val = e.target.value;
              setConfirmPassword(val);
              setConfirmPasswordError(
                password === val ? "" : "Passwords do not match!"
              );
            }}
            size={isSmallScreen ? "small" : "medium"}
            onBlur={handleComparePassword}
            type={showPassword ? "text" : "password"}
            error={!!confirmPasswordError}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
            }}
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
                  {showPassword ? (
                    <VisibilityOff sx={{ fontSize: { xs: 18, md: 24 } }} />
                  ) : (
                    <Visibility sx={{ fontSize: { xs: 18, md: 24 } }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          disabled={
            !password ||
            !confirmPassword ||
            !!confirmPasswordError ||
            !!passwordError
          }
          sx={{
            mt: 2,
            width: "90%",
            backgroundColor: "#FFC107",
            fontSize: { xs: 11, md: 15 },
          }}
        >
          Reset Password
        </Button>

        {passwordError && (
          <Typography
            sx={{ mt: 1, color: "red", fontSize: { xs: "12px", md: "14px" } }}
          >
            {passwordError}
          </Typography>
        )}

        {confirmPasswordError && (
          <Typography
            sx={{ mt: 1, color: "red", fontSize: { xs: "12px", md: "14px" } }}
          >
            {confirmPasswordError}
          </Typography>
        )}

        {status && (
          <>
            <Typography sx={{ mt: 2, fontSize: { xs: "12px", md: "15px" } }}>
              {status}
            </Typography>

            {status === "Password has been reset successfully!" && (
              <Link
                component={RouterLink}
                to="/signin"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: { xs: "14px", md: "18px" },
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <ArrowBackIcon
                  sx={{
                    width: { xs: "16px", md: "18px" },
                    height: { xs: "16px", md: "18px" },
                  }}
                />{" "}
                Go back to login
              </Link>
            )}
          </>
        )}
      </Box>

      {/* Password Requirements Popper */}
      <Popper
        open={pwHelpOpen}
        anchorEl={pwAnchorEl}
        placement={isSmallScreen ? "top-start" : "left-start"}
        sx={{ zIndex: 1300 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 1,
            bgcolor: "#1F2A38",
            color: "#fff",
            border: "1px solid #444",
            width: 220,
            fontSize: { xs: 10, md: 14 },
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Typography sx={{ fontSize: 12, mb: 0.5, color: "#ccc" }}>
            Password should include:
          </Typography>
          <PasswordChecklist value={password} />
        </Paper>
      </Popper>
    </Box>
  );
};

export default ResetPasswordPage;
