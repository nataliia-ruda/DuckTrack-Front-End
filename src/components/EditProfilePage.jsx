import { useState, useEffect, useContext } from "react";
import SideNavigation from "./SideNavigation.jsx";
import { DrawerHeader } from "./SideNavigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AuthContext from "../core/AuthContext.jsx";
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

const EditProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    comparePasswordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/get-user/${user.user_id}`
          );
          if (response.ok) {
            const data = await response.json();
            setFormFields((prevFields) => ({
              ...prevFields,
              firstName: data.user_first_name,
              lastName: data.user_last_name,
              email: data.email,
              gender: data.gender,
            }));
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleFirstNameBlur = (event) => {
    const value = event.target.value;
    const firstNameValidation = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;

    if (!value || !firstNameValidation.test(value)) {
      setErrors((prev) => ({
        ...prev,
        firstNameError: "You can use only letters and spaces!",
      }));
      setFirstNameError(true);
    } else {
      setErrors((prev) => ({ ...prev, firstNameError: "" }));
      setFirstNameError(false);
    }
  };

  const handleLastNameBlur = (event) => {
    const value = event.target.value;
    const lastNameValidation = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;

    if (!value || !lastNameValidation.test(value)) {
      setErrors((prev) => ({
        ...prev,
        lastNameError: "You can use only letters and spaces!",
      }));
      setLastNameError(true);
    } else {
      setErrors((prev) => ({ ...prev, lastNameError: "" }));
      setLastNameError(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const handlePasswordBlur = () => {
    const { currentPassword, newPassword, confirmNewPassword } = formFields;

    setErrors((prev) => ({ ...prev, comparePasswordError: "" }));

    const isChangingPassword =
      currentPassword || newPassword || confirmNewPassword;

    if (isChangingPassword) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        setErrors((prev) => ({
          ...prev,
          comparePasswordError: "Please fill in all password fields.",
        }));
      } else if (newPassword !== confirmNewPassword) {
        setErrors((prev) => ({
          ...prev,
          comparePasswordError: "New passwords do not match.",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      gender,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = formFields;

    const isChangingPassword =
      currentPassword || newPassword || confirmNewPassword;

    setErrors((prev) => ({ ...prev, comparePasswordError: "" }));

    if (isChangingPassword) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        setErrors((prev) => ({
          ...prev,
          comparePasswordError: "Please fill in all password fields.",
        }));
        return;
      }

      if (newPassword !== confirmNewPassword) {
        setErrors((prev) => ({
          ...prev,
          comparePasswordError: "New passwords do not match.",
        }));
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:3000/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          gender,
          user_id: user.user_id,
          ...(isChangingPassword && {
            currentPassword,
            newPassword,
          }),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");

        setFormFields((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }));

        setErrors((prev) => ({
          ...prev,
          comparePasswordError: "",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          comparePasswordError: result.message || "Update failed.",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavigation />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h5" sx={{ mb: 5, fontWeight: 600 }}>
          Edit Your Profile
        </Typography>

        <Box sx={{ display: "flex", gap: 5 }}>
          {/* Avatar */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={
                user.gender === "female"
                  ? "/FemaleAv.png"
                  : user.gender === "male"
                  ? "/MaleAv.png"
                  : "/OtherAv.png"
              }
              alt="Profile"
              sx={{ width: 120, height: 120, mb: 2, border: "1px solid black" }}
            />
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "70%",
            }}
          >
            {/* First Name */}
            <TextField
              label="First Name"
              name="firstName"
              value={formFields.firstName}
              onChange={handleChange}
              onBlur={handleFirstNameBlur}
              error={firstNameError}
              helperText={errors.firstNameError}
              size="small"
            />

            {/* Last Name */}
            <TextField
              label="Last Name"
              name="lastName"
              value={formFields.lastName}
              onChange={handleChange}
              onBlur={handleLastNameBlur}
              error={lastNameError}
              helperText={errors.lastNameError}
              size="small"
            />

            {/* Gender */}
            <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
              <FormLabel>Gender:</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formFields.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </Box>

            {/* Email */}
            <TextField
              label="Email"
              name="email"
              value={formFields.email}
              disabled
              size="small"
            />

            {/* Current Password */}
            <FormControl size="small" variant="outlined">
              <InputLabel htmlFor="currentPassword">
                Current Password
              </InputLabel>
              <OutlinedInput
                id="currentPassword"
                name="currentPassword"
                value={formFields.currentPassword}
                onChange={handleChange}
                onBlur={handlePasswordBlur}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Current Password"
              />
            </FormControl>

            {/* New Password */}
            <FormControl size="small" variant="outlined">
              <InputLabel htmlFor="newPassword">New Password</InputLabel>
              <OutlinedInput
                id="newPassword"
                name="newPassword"
                value={formFields.newPassword}
                onChange={handleChange}
                onBlur={handlePasswordBlur}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>

            {/* Confirm Password */}
            <FormControl size="small" variant="outlined">
              <InputLabel htmlFor="confirmNewPassword">
                Confirm New Password
              </InputLabel>
              <OutlinedInput
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formFields.confirmNewPassword}
                onChange={handleChange}
                onBlur={handlePasswordBlur}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm New Password"
              />
            </FormControl>

            {/* Password Error Message */}
            {errors.comparePasswordError && (
              <Typography sx={{ color: "red", fontSize: "0.75rem" }}>
                {errors.comparePasswordError}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfilePage;
