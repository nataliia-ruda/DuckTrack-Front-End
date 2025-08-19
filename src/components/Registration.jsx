import { useState } from "react";
import RegistrationForm from "./RegistrationForm.jsx";
import Grid from "@mui/material/Grid2";
import DialogBox from "./DialogBox.jsx";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const url = "http://localhost:3000/signup";

const Registration = () => {
  const [cleanForm, setCleanForm] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    title: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleUserCreate = async (submission) => {
    if (submission.error) {
      setDialogConfig({
        open: true,
        title: submission.error.title,
        message: submission.error.message,
      });
      return;
    }
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(submission.data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw Error(
          response.status === 409
            ? (await response.json()).message
            : "Database connection error!"
        );
      }

      const result = await response.json();
      setDialogConfig({
        open: true,
        title: (
          <CheckCircleIcon
            sx={{
              width: { xs: 24, md: 30 },
              height: { xs: 24, md: 30 },
              color: "success.main",
            }}
          />
        ),
        message: result.message,
      });
      setCleanForm(true);
    } catch (error) {
      setDialogConfig({
        open: true,
        title: (
          <ErrorOutlineOutlinedIcon
            sx={{
              width: { xs: 24, md: 30 },
              height: { xs: 24, md: 30 },
              color: "error.main",
            }}
          />
        ),
        message: error.message || "Something went wrong.",
      });
    }
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
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
          width: { xs: "100%", md: "70%" },
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "100%",
            display: { xs: "none", md: "flex" },
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
            sx={{
              fontWeight: "600",
              color: "#141E27",
              marginBottom: "2.5em",
              fontSize: { xs: 20, md: 24 },
            }}
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
            onFormCleaned={() => setCleanForm(false)}
          />
        </Box>
      </Box>

      <DialogBox
        open={dialogConfig.open}
        setOpen={(open) => setDialogConfig((prev) => ({ ...prev, open }))}
        title={dialogConfig.title}
        message={dialogConfig.message}
        buttons={[
          {
            text: "Sign in",
            onClick: () => {
              setDialogConfig({ open: false, title: "", message: "" });
              navigate("/signin");
            },
            variant: "contained",
            sx: {
              backgroundColor: "#141E27",
              fontSize: { xs: 11, md: 12 },
              width: "15%",
              my: 1.5,
            },
          },
          {
            text: "Close",
            onClick: () =>
              setDialogConfig({ open: false, title: "", message: "" }),
            variant: "outlined",
            sx: {
              color: "#141E27",
              fontSize: { xs: 11, md: 12 },
              width: "15%",
              my: 1.5,
            },
          },
        ]}
      />
    </Grid>
  );
};

export default Registration;
