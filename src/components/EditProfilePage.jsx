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
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useMediaQuery, useTheme } from "@mui/material";

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
            setChecked(data.auto_ghost_enabled === 1);
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
          autoGhostEnabled: checked,
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

  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavigation />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 3, md: 5 },
            fontWeight: 600,
            fontSize: { xs: 18, md: 24 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Edit Your Profile
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: 5,
          }}
        >
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
              sx={{
                width: { xs: 80, md: 120 },
                height: { xs: 80, md: 120 },
                mb: { xs: 0, md: 2 },
                border: "1px solid black",
              }}
            />
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 3,
              width: { xs: "85%", md: "60%" },
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
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
              }}
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
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
              }}
            />

            {/* Gender */}
            <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
              <FormLabel sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
                Gender:
              </FormLabel>
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
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: { xs: "0.8rem", md: "1rem" },
                    },
                  }}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: { xs: "0.8rem", md: "1rem" },
                    },
                  }}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: { xs: "0.8rem", md: "1rem" },
                    },
                  }}
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
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
              }}
            />

            {/* Current Password */}
            <FormControl size="small" variant="outlined">
              <InputLabel
                sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                htmlFor="currentPassword"
              >
                Current Password
              </InputLabel>
              <OutlinedInput
                id="currentPassword"
                name="currentPassword"
                value={formFields.currentPassword}
                onChange={handleChange}
                onBlur={handlePasswordBlur}
                type={showPassword ? "text" : "password"}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
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
              <InputLabel
                sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                htmlFor="newPassword"
              >
                New Password
              </InputLabel>
              <OutlinedInput
                id="newPassword"
                name="newPassword"
                value={formFields.newPassword}
                onChange={handleChange}
                onBlur={handlePasswordBlur}
                type={showPassword ? "text" : "password"}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  },
                }}
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
              <InputLabel
                sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                htmlFor="confirmNewPassword"
              >
                Confirm New Password
              </InputLabel>
              <OutlinedInput
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formFields.confirmNewPassword}
                onChange={handleChange}
                onBlur={handlePasswordBlur}
                type={showPassword ? "text" : "password"}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  },
                }}
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

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: { xs: "0.8rem", md: "1rem" },
              }}
            >
              <label>
                Automatically change outdated applications status to "Ghosted"
                <Tooltip title='If enabled, applications in status "Applied" with no updates for 3 weeks will be automatically marked as "Ghosted". You can turn this off anytime.'>
                  <IconButton size="small" sx={{ marginLeft: "4px" }}>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </label>
              <Switch
                checked={checked}
                onChange={handleSwitchChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#FCC708",
                color: "black",
                width: { xs: "40%", md: "20%" },
                alignSelf: "center",
                fontSize: { xs: 11, md: 15 },
              }}
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
