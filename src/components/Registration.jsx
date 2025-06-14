import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm.jsx";
import Grid from "@mui/material/Grid2";
import DialogBox from "./DialogBox.jsx";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3000/signup";

const Registration = () => {
  const [cleanForm, setCleanForm] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const navigate = useNavigate();
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
      setDialogTitle(
        <CheckCircleOutlineOutlinedIcon sx={{ color: "green" }} />
      );
      setOpenDialog(true);
      setCleanForm(true);

  
    } catch (error) {
      setDialogTitle(<ErrorOutlineOutlinedIcon sx={{ color: "red" }} />);
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
            justifyContent: "flex-start",
            pt: 4,
            gap: 2,
          }}
        >
          {/* Header */}
          <Typography
            variant="h5"
            sx={{ fontWeight: "600", color: "#141E27", marginBottom: "2.5em" }}
          >
            NEW HERE?
          </Typography>

          {/* Centered image */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="./RegistrationFormImg1.png"
              alt="duck in the suite waving to say 'hi'"
              style={{
                width: "65%",
                height: "auto",
                maxWidth: "300px",
              }}
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
            setDialogMessage={setDialogMessage} 
            onFormCleaned={() => setCleanForm(false)}
          />
        </Box>
      </Box>

      <DialogBox
        open={openDialog}
        setOpen={setOpenDialog}
        title={dialogTitle}
        message={dialogMessage}
        buttons={[
          {
            text: "Go to Sign in",
            onClick: () => navigate("/"),
            variant: "contained",
          },
          {
            text: "Close",
            onClick: () => setOpenDialog(false),
            variant: "outlined",
            bgColor: "white",
          },
        ]}
      />
    </Grid>
  );
};

export default Registration;
