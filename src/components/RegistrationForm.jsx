import { useEffect, useRef, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Link,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

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
  const [passwordError, setPasswordError] = useState(false);

  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    comparePasswordError: "",
    passwordError: "",
  });

  const [pwHelpOpen, setPwHelpOpen] = useState(false);
  const [pwAnchorEl, setPwAnchorEl] = useState(null);
  const passwordInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault(); 

   const theme = useTheme();
   const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
      setErrors({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        comparePasswordError: "",
        passwordError: "",
      });
      setFirstNameError(false);
      setLastNameError(false);
      setEmailError(false);
      setPasswordError(false);
      setPwHelpOpen(false);
      if (typeof onFormCleaned === "function") onFormCleaned();
    }
  }, [cleanForm, onFormCleaned]);

  const validatePassword = (value) => {
    const longEnough = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasSpecial = /[^\w\s]/.test(value);
    const noEdgeSpaces = value.trim() === value;
    const ok = longEnough && hasUpper && hasSpecial && noEdgeSpaces;
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const pwRes = validatePassword(formFields.password);
    const newErrors = { ...errors };
    newErrors.passwordError = pwRes.ok
      ? ""
      : "Password doesn't meet the requirements.";

    if (
      !formFields.confirmPassword ||
      formFields.confirmPassword !== formFields.password
    ) {
      newErrors.comparePasswordError = "Passwords are not matching!";
    } else {
      newErrors.comparePasswordError = "";
    }

    setErrors(newErrors);
    setPasswordError(
      Boolean(newErrors.passwordError || newErrors.comparePasswordError)
    );

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");

    if (!formFields.gender) {
      onSubmitForm({
        error: {
          title: (
            <ErrorOutlineOutlinedIcon
              sx={{
                width: { xs: 24, md: 30 },
                height: { xs: 24, md: 30 },
                color: "error.main",
              }}
            />
          ),
          message: "Please select a gender.",
        },
      });
      return;
    }

    if (hasErrors) {
      onSubmitForm({
        error: {
          title: (
            <ErrorOutlineOutlinedIcon
              sx={{
                width: { xs: 24, md: 30 },
                height: { xs: 24, md: 30 },
                color: "error.main",
              }}
            />
          ),
          message: "There are still some errors.",
        },
      });
      return;
    }

    const dataToInsert = {
      user_first_name: formFields.firstName,
      user_last_name: formFields.lastName,
      email: formFields.email,
      password: formFields.password,
      gender: formFields.gender,
    };

    onSubmitForm({ data: dataToInsert });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordFocus = (e) => {
    setPwAnchorEl(e.currentTarget);
    setPwHelpOpen(true);
  };

  const handlePasswordBlur = () => {
    setTimeout(() => setPwHelpOpen(false), 120);
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    const res = validatePassword(e.target.value);
    setErrors((prev) => ({
      ...prev,
      passwordError: res.ok ? "" : "Password doesn't meet the requirements.",
    }));
    setPasswordError(!res.ok);

    if (!pwHelpOpen) {
      setPwAnchorEl(e.currentTarget);
      setPwHelpOpen(true);
    }

    if (formFields.confirmPassword !== "") {
      if (e.target.value !== formFields.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          comparePasswordError: "Passwords are not matching!",
        }));
        setPasswordError(true);
      } else {
        setErrors((prev) => ({ ...prev, comparePasswordError: "" }));
      }
    }
  };

  const handleComparePassword = () => {
    if (formFields.confirmPassword !== "") {
      if (formFields.confirmPassword !== formFields.password) {
        setErrors((prev) => ({
          ...prev,
          comparePasswordError: "Passwords are not matching!",
        }));
        setPasswordError(true);
      } else {
        setErrors((prev) => ({ ...prev, comparePasswordError: "" }));
        setPasswordError(Boolean(errors.passwordError));
      }
    } else {
      setPasswordError(true);
    }
  };

  const handleFirstNameBlur = (event) => {
    if (formFields.firstName !== "") {
      const firstNameValidation = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
      if (!firstNameValidation.test(event.target.value)) {
        setErrors((prev) => ({
          ...prev,
          firstNameError: "You can use only letters and spaces!",
        }));
        setFirstNameError(true);
      } else {
        setErrors((prev) => ({ ...prev, firstNameError: "" }));
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
        setErrors((prev) => ({
          ...prev,
          lastNameError: "You use only letters and spaces!",
        }));
        setLastNameError(true);
      } else {
        setErrors((prev) => ({ ...prev, lastNameError: "" }));
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
        setErrors((prev) => ({
          ...prev,
          emailError: "Email format is invalid!",
        }));
        setEmailError(true);
      } else {
        setErrors((prev) => ({ ...prev, emailError: "" }));
        setEmailError(false);
      }
    } else {
      setEmailError(true);
    }
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
        sx={{
          color: "#ffffff",
          fontWeight: "600",
          fontSize: { xs: 19, md: 24 },
        }}
      >
        LET'S CREATE AN ACCOUNT!
      </Typography>

      {/* First Name */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "90%", sm: "85%", md: "85%", lg: "85%" },
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
              left: 0,
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
          width: { xs: "90%", sm: "85%", md: "85%", lg: "85%" },
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
              left: 0,
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
          width: { xs: "90%", sm: "85%", md: "85%", lg: "85%" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: "0.8em", md: "2.1em" },
        }}
      >
        <FormLabel
          id="gender-label"
          sx={{
            color: " #cccccc",
            alignSelf: { xs: "flex-start", md: "center" },
          }}
          required
        >
          Gender:
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender-label"
          value={formFields.gender}
          onChange={handleChange}
          name="gender"
          sx={{ fontSize: "0.8em" }}
        >
          <FormControlLabel
            value="female"
            control={
              <Radio
                sx={{ color: "#cccccc", "&.Mui-checked": { color: "#cccccc" } }}
              />
            }
            label="Female"
            sx={{ color: " #cccccc" }}
          />
          <FormControlLabel
            value="male"
            control={
              <Radio
                sx={{ color: "#cccccc", "&.Mui-checked": { color: "#cccccc" } }}
              />
            }
            label="Male"
            sx={{ color: " #cccccc" }}
          />
          <FormControlLabel
            value="other"
            control={
              <Radio
                sx={{ color: "#cccccc", "&.Mui-checked": { color: "#cccccc" } }}
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
          width: { xs: "90%", sm: "85%", md: "85%", lg: "85%" },
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
              left: 0,
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
          width: { xs: "90%", sm: "85%", md: "85%", lg: "85%" },
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
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          name="password"
          inputRef={passwordInputRef}
          value={formFields.password}
          onChange={handlePasswordChange}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
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
      {errors.passwordError && (
        <Typography sx={{ color: "red", fontSize: "0.8rem", mt: -3, mb: 2 }}>
          {errors.passwordError}
        </Typography>
      )}

      {/* Confirm Password */}
      <Box sx={{ width: { xs: "90%", sm: "85%", md: "85%", lg: "85%" } }}>
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
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <OutlinedInput
            name="confirmPassword"
            id="confirmPassword"
            value={formFields.confirmPassword}
            onChange={(e) => {
              handleChange(e);
              if (e.target.value !== formFields.password) {
                setErrors((prev) => ({
                  ...prev,
                  comparePasswordError: "Passwords are not matching!",
                }));
                setPasswordError(true);
              } else {
                setErrors((prev) => ({ ...prev, comparePasswordError: "" }));
                setPasswordError(Boolean(errors.passwordError));
              }
            }}
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
          <Typography variant="p" sx={{ color: "red", fontSize: "0.8rem" }}>
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
          fontSize: { xs: 12, md: 16 },
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
            width: 240,
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Typography sx={{ fontSize: 12, mb: 0.5, color: "#ccc" }}>
            Password should include:
          </Typography>
          <PasswordChecklist value={formFields.password} />
        </Paper>
      </Popper>
    </Grid>
  );
};

export default RegistrationForm;
