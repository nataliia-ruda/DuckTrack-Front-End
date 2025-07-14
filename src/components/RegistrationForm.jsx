import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Link, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import DialogBox from "./DialogBox.jsx";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegistrationForm = ({ cleanForm, onSubmitForm, onFormCleaned }) => {
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassowrdError] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    comparePasswordError: "",
  });

  useEffect(() => {
    if (cleanForm) {
      setFormFields({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
      setOpenDialog(false);
      if (typeof onFormCleaned === "function") {
        onFormCleaned();
      }
    }
  }, [cleanForm, onFormCleaned]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let isThereErrors = false;
    for (let property in errors) {
      if (errors[property] !== "") {
        isThereErrors = true;
      }
    }

    if (!formFields.gender) {
      alert("Please select a gender.");
      return;
    }
    if (!isThereErrors) {
      const dataToInsert = {
        user_first_name: formFields.firstName,
        user_last_name: formFields.lastName,
        email: formFields.email,
        password: formFields.password,
        gender: formFields.gender,
      };
      onSubmitForm(dataToInsert);
      setOpenDialog(true);
    } else {
      alert("There is still some errors");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleComparePassword = () => {
    if (formFields.confirmPassword !== "") {
      if (formFields.confirmPassword !== formFields.password) {
        setErrors({
          ...errors,
          comparePasswordError: "Passwords are not matching!",
        });
        setPassowrdError(true);
      } else {
        setErrors({
          ...errors,
          comparePasswordError: "",
        });
        setPassowrdError(false);
      }
    } else {
      setPassowrdError(true);
    }
  };
  const handleFirstNameBlur = (event) => {
    if (formFields.firstName !== "") {
      const firstNameValidation = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
      if (!firstNameValidation.test(event.target.value)) {
        setErrors({
          ...errors,
          firstNameError: "You can use only letters and spaces!",
        });
        setFirstNameError(true);
      } else {
        setErrors({
          ...errors,
          firstNameError: "",
        });
        setFirstNameError(false);
      }
    } else {
      setFirstNameError(true);
    }
  };

  const handleLastNameBlur = (event) => {
    if (formFields.lastName !== "") {
      const lastNameValidation = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
      if (!lastNameValidation.test(event.target.value)) {
        setErrors({
          ...errors,
          lastNameError: "You use only letters and spaces!",
        });
        setLastNameError(true);
      } else {
        setErrors({
          ...errors,
          lastNameError: "",
        });
        setLastNameError(false);
      }
    } else {
      setLastNameError(true);
    }
  };

  const handleEmailBlur = (event) => {
    if (formFields.email !== "") {
      const emailValidation =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailValidation.test(event.target.value)) {
        setErrors({
          ...errors,
          emailError: "Email format is invalid!",
        });
        setEmailError(true);
      } else {
        setErrors({
          ...errors,
          emailError: "",
        });
        setEmailError(false);
      }
    } else {
      setEmailError(true);
    }
  };

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
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 4,
        py: 4,
        px: 4,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        borderRadius: "10px",
        backgroundColor: "#141E27",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#ffffff", fontWeight: "600" }}
      >
        LET'S CREATE AN ACCOUNT!
      </Typography>

      {/* Input Fields */}
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "90%",
            sm: "85%",
            md: "85%",
            lg: "85%",
          },
        }}
      >
        <TextField
          value={formFields.firstName}
          name="firstName"
          onChange={handleChange}
          onBlur={handleFirstNameBlur}
          id="firstName"
          label="First Name"
          variant="outlined"
          required
          size="small"
          sx={{
            width: "100%",
            backgroundColor: "#1F2A38",
            input: { color: "#ffffff" },
            label: { color: "#cccccc" },
            fieldset: { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#888" },
            "&.Mui-focused fieldset": { borderColor: "#ffffff" },
          }}
          error={firstNameError}
        />
        {errors.firstNameError && (
          <Typography
            variant="p"
            sx={{
              color: "red",
              position: "absolute",
              bottom: "-20px",
              left: "0",
              fontSize: "0.8rem",
            }}
          >
            {errors.firstNameError}
          </Typography>
        )}
      </Box>

      {/* Last Name */}
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "90%",
            sm: "85%",
            md: "85%",
            lg: "85%",
          },
        }}
      >
        <TextField
          value={formFields.lastName}
          onChange={handleChange}
          onBlur={handleLastNameBlur}
          name="lastName"
          id="lastName"
          label="Last Name"
          variant="outlined"
          required
          size="small"
          sx={{
            width: "100%",
            backgroundColor: "#1F2A38",
            input: { color: "#ffffff" },
            label: { color: "#cccccc" },
            fieldset: { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#888" },
            "&.Mui-focused fieldset": { borderColor: "#ffffff" },
          }}
          error={lastNameError}
        />
        {errors.lastNameError && (
          <Typography
            variant="p"
            sx={{
              color: "red",
              position: "absolute",
              bottom: "-20px",
              left: "0",
              fontSize: "0.8rem",
            }}
          >
            {errors.lastNameError}
          </Typography>
        )}
      </Box>

      {/* Gender */}
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "90%",
            sm: "85%",
            md: "85%",
            lg: "85%",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.1em",
        }}
      >
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{ color: " #cccccc" }}
          required
        >
          Gender:
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          value={formFields.gender}
          onChange={handleChange}
          name="gender"
          sx={{ fontSize: "0.8em" }}
        >
          <FormControlLabel
            value="female"
            control={
              <Radio
                sx={{
                  color: "#cccccc",
                  "&.Mui-checked": {
                    color: "#cccccc",
                  },
                }}
              />
            }
            label="Female"
            sx={{ color: " #cccccc" }}
          />
          <FormControlLabel
            value="male"
            control={
              <Radio
                sx={{
                  color: "#cccccc",
                  "&.Mui-checked": {
                    color: "#cccccc",
                  },
                }}
              />
            }
            label="Male"
            sx={{ color: " #cccccc" }}
          />
          <FormControlLabel
            value="other"
            control={
              <Radio
                sx={{
                  color: "#cccccc",
                  "&.Mui-checked": {
                    color: "#cccccc",
                  },
                }}
              />
            }
            label="Other"
            sx={{ color: " #cccccc" }}
          />
        </RadioGroup>
      </Box>

      {/* Email */}
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "90%",
            sm: "85%",
            md: "85%",
            lg: "85%",
          },
        }}
      >
        <TextField
          value={formFields.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          name="email"
          id="email"
          label="Email"
          variant="outlined"
          required
          size="small"
          sx={{
            width: "100%",
            backgroundColor: "#1F2A38",
            input: { color: "#ffffff" },
            label: { color: "#cccccc" },
            fieldset: { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#888" },
            "&.Mui-focused fieldset": { borderColor: "#ffffff" },
          }}
          error={emailError}
        />
        {errors.emailError && (
          <Typography
            variant="p"
            sx={{
              color: "red",
              position: "absolute",
              bottom: "-20px",
              left: "0",
              fontSize: "0.8rem",
            }}
          >
            {errors.emailError}
          </Typography>
        )}
      </Box>

      {/* Password */}
      <FormControl
        size="small"
        sx={{
          width: {
            xs: "90%",
            sm: "85%",
            md: "85%",
            lg: "85%",
          },
          backgroundColor: "#1F2A38",
          input: { color: "#ffffff" },
          label: { color: "#cccccc" },
          fieldset: { borderColor: "#444" },
          "&:hover fieldset": { borderColor: "#888" },
          "&.Mui-focused fieldset": { borderColor: "#ffffff" },
        }}
        variant="outlined"
        required
        error={passwordError}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="password"
          name="password"
          value={formFields.password}
          onChange={handleChange}
          onBlur={handleComparePassword}
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
          label="Password"
        />
      </FormControl>

      {/* Confirm Password */}
      <Box
        sx={{
          width: {
            xs: "90%",
            sm: "85%",
            md: "85%",
            lg: "85%",
          },
        }}
      >
        <FormControl
          size="small"
          sx={{
            width: "100%",
            backgroundColor: "#1F2A38",
            input: { color: "#ffffff" },
            label: { color: "#cccccc" },
            fieldset: { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#888" },
            "&.Mui-focused fieldset": { borderColor: "#ffffff" },
          }}
          variant="outlined"
          required
          error={passwordError}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password:
          </InputLabel>
          <OutlinedInput
            name="confirmPassword"
            id="confirmPassword"
            value={formFields.confirmPassword}
            onChange={handleChange}
            onBlur={handleComparePassword}
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
            label="Confirm password"
          />
        </FormControl>

        {errors.comparePasswordError && (
          <Typography
            variant="p"
            sx={{
              color: "red",
              fontSize: "0.8rem",
            }}
          >
            {errors.comparePasswordError}
          </Typography>
        )}
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#FFC107",
          color: "#141E27",
          fontWeight: "500",
          "&:hover": { backgroundColor: "#e0a800" },
        }}
      >
        Sign up
      </Button>

      {/* Login Link */}
      <Typography variant="p" sx={{ color: "#ffffff" }} gutterBottom>
        Already have an account?{" "}
        <Link component={RouterLink} to="/signin" sx={{ color: "#66B2FF" }}>
          Sign in
        </Link>
      </Typography>
    </Grid>
  );
};

export default RegistrationForm;
