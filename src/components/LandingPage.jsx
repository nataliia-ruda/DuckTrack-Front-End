import React from "react";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid2';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Left Section */}
      <Grid
        xs={12}
        md={6}
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          textAlign: "center",
        }}
      >
        <img
          src="./logo4.png"
          alt="logo"
          style={{ width: "10%", height: "auto" }}
        />

        <Typography variant="h4" component="h1" gutterBottom>
          Job Applications Tracker
        </Typography>

        <Button variant="contained" size="large" onClick={handleSignInClick}>
          Sign in
        </Button>

        <Button variant="outlined" size="large" onClick={handleSignUpClick}>
          Sign up
        </Button>
      </Grid>

      {/* Right Section */}
      <Grid
        xs={12}
        md={6}
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/girl.png"
          alt="illustration"
          style={{ width: "50%", height: "auto" }}
        />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
