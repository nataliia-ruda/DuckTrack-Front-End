import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm.jsx";
import Grid from "@mui/material/Grid2";
import DialogBox from "./DialogBox.jsx";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const url = "http://localhost:3000/signup";

const Registration = () => {
  const [cleanForm, setCleanForm] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const handleUserCreate = async (data) => {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      if (!response.ok) {
        if (response.status === 409) {
          const result = await response.json();
          throw Error(result.message);
        } else {
          throw Error("There was a problem connecting to the database!");
        }
      }
      const result = await response.json();
      setDialogMessage(result.message);
      setDialogTitle(<CheckCircleOutlineOutlinedIcon />);
      setOpenDialog(true);
      setCleanForm(true);
    } catch (error) {
      console.log(error);
      setDialogTitle(<ErrorOutlineOutlinedIcon />);
      setDialogMessage(error.message);
      setOpenDialog(true);
    }
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
        boxSizing: "border-box",
      }}
    >
      
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          justifyContent: "center",
          padding: 1,
          width: "70%",
          height: "auto",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
  
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            pt: 4,
            pb: "0",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "600", color: "#141E27" }}>
            NEW HERE?
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: "auto",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img
              src="./registration_img.svg"
              alt="Registration Illustration"
              style={{ width: "100%", height: "auto"}}
            />
          </Box>
        </Box>

        
        <Box
          sx={{
            width: { xs: "100%", md: "50%" }, 
            height: "100%",
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",
            
          }}
        >
          <RegistrationForm
            onSubmitForm={handleUserCreate}
            cleanForm={cleanForm}
            setDialogMessage={dialogMessage}
          />
        </Box>
      </Box>

      {/* Dialog Box */}
      <DialogBox open={openDialog} setOpen={setOpenDialog} title={dialogTitle}>
        {dialogMessage}
      </DialogBox>
    </Grid>
  );
};

export default Registration;
