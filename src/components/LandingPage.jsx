import React from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import SigninForm from "./SigninForm.jsx";

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
        alignItems: { xs: "space-between", md: "center" },
        justifyContent: { xs: "space-around", md: "center" },
      }}
    >
      {/* Left Section */}
      <Grid
        xs={12}
        md={6}
        sx={{
         /*  height: "auto", */ 
            width: {
              xs: "100%",
              sm: "70%",
              md: "50%",
              lg: "50%",
            },
          display: "flex"
         
        }}
      >
        <SigninForm></SigninForm>

       
      </Grid>

      {/* Right Section */}
      <Grid
        xs={12}
        md={6}
        sx={{
            width: {
              xs: "100%",
              sm: "70%",
              md: "50%",
              lg: "50%",
            },
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
