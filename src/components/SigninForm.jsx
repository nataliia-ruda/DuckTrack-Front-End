import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState, useContext } from "react";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import AuthContext from "../core/AuthContext";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";

gsap.registerPlugin(TextPlugin);

const SigninForm = () => {

  /* typing animation */
  const words = ["organize", "store", "track"];
  useGSAP(() => {
    let tlMaster = gsap.timeline({ repeat: -1 });

    words.forEach((word) => {
      let tlText = gsap.timeline({ repeat: 1, yoyo: true });
      tlText.to(".animated-text", {
        duration: 1.5,
        text: word,
        ease: "power2.inOut",
      });
      tlMaster.add(tlText);
    });
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  async function handleLogin(event) {
    
    event.preventDefault();

    try {
      let response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let result = await response.json();

      if (response.ok) {
        login(result.user);
        navigate("/home");
      } else if (response.status === 403 && result.verified === false) {
        localStorage.setItem("pendingEmail", result.email);
        localStorage.setItem("pendingUserId", result.user_id);
        navigate("/verify-required");
      } else {
        setErrorMessage(result.message || "Something went wrong.");
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Try again later.");
    }
  }
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "600" }}>
          Let's{" "}
          <Typography
            component="span"
            variant="h4"
            className="animated-text"
            sx={{
              backgroundColor: "#FFC107",
              color: "#141E27",
              padding: 1,
              fontWeight: "600",
            }}
          ></Typography>
        </Typography>
        <br />
        <Typography variant="h4" sx={{ fontWeight: "600" }} gutterBottom>
          {" "}
          your job applications!{" "}
        </Typography>
      </Grid>

      <Grid
        container
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          textAlign: "center",
        }}
      >
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          size="medium"
          required
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
              md: "80%",
            },
          }}
          error={emailError}
        />

        <FormControl
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
              md: "80%",
            },
          }}
          variant="outlined"
          required
          error={passwordError}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
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
            label="Password"
          />
          <Link
            component={RouterLink}
            to="/forgot-password"
            sx={{ display: "block", textAlign: "end", mt: 2, fontSize: "18px" }}
          >
            Forgot password?
          </Link>
        </FormControl>

        {errorMessage && (
          <Typography
            variant="p"
            sx={{
              color: "red",
              fontSize: "0.9rem",
            }}
          >
            {errorMessage}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 1,
            width: {
              xs: "100%",
              sm: "80%",
              md: "80%",
            },
          }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#141E27" }}
          >
            Sign in
          </Button>

          <Button
            onClick={() => {
              navigate("/signup");
            }}
            type="submit"
            variant="outlined"
            size="large"
            color="#141E27"
          >
            Sign up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SigninForm;
