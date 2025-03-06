import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const SigninForm = () => {
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

  async function handleLogin(event) {
    event.preventDefault();

    try {
      let response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      let result = await response.json();

      if (response.status === 200) {
        navigate("/home");
      } else {
        setErrorMessage(result.error);
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again later.");
    }
  }

  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap:2
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">
          Let's{" "}{" "}
          <Typography
            component="span"
            variant="h4"
            className="animated-text"
            sx={{
              backgroundColor: "#1976D2",
              color: "white", 
              padding: 1
            }}
          ></Typography>
        </Typography>
        <br />
        <Typography variant="h4" gutterBottom>
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
              sm: "70%",
              md: "55%",
            },
          }}
          error={emailError}
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          required
          sx={{
            width: {
              xs: "100%",
              sm: "70%",
              md: "55%",
            },
          }}
          error={passwordError}
        />

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

        <Button type="submit" variant="contained" size="large">
          Sign in
        </Button>

        <Typography variant="p" gutterBottom>
          Don't have an account yet?{"  "}
          <Link component={RouterLink} to="/signup">
            Sign up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SigninForm;
