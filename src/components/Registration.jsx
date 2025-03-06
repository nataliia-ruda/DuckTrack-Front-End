import React from "react";
import RegistrationForm from "./RegistrationForm.jsx";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import DialogBox from "./DialogBox.jsx";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

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
      setDialogTitle(<CheckCircleOutlineOutlinedIcon/>)
      setOpenDialog(true);
      setCleanForm(true);
    } catch (error) {
      console.log(error);
      setDialogTitle(<ErrorOutlineOutlinedIcon/>)
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
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RegistrationForm onSubmitForm={handleUserCreate} cleanForm={cleanForm} />

      <DialogBox open={openDialog} setOpen={setOpenDialog} title={dialogTitle}>
        {dialogMessage}
      </DialogBox>
    </Grid>
  );
};

export default Registration;
