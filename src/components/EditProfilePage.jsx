import { useState, useEffect, useContext } from "react";
import SideNavigation from "./SideNavigation.jsx";
import { DrawerHeader } from "./SideNavigation";
import { Box, Link } from "@mui/material";
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
import DialogBox from "./DialogBox.jsx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

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

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogMessage, setDialogMessage] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [checked, setChecked] = useState(false);

  // --- Password validation helpers (same as Registration/Reset): >=8, uppercase, special ---
  const validatePassword = (value) => {
    const longEnough = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasSpecial = /[^\w\s]/.test(value);
    const ok = longEnough && hasUpper && hasSpecial;
    return { longEnough, hasUpper, hasSpecial, ok };
  };

  // Tooltip-style checklist beside the New Password field
  const [pwHelpOpen, setPwHelpOpen] = useState(false);
  const [pwAnchorEl, setPwAnchorEl] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/get-user/${user.user_id}`
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
            setOpenDialog(true);
            setDialogTitle(
              <ErrorOutlineIcon
                sx={{
                  width: { xs: 24, md: 30 },
                  height: { xs: 24, md: 30 },
                  color: "error.main",
                }}
              />
            );
            setDialogMessage("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
          setOpenDialog(true);
          setDialogTitle(
            <ErrorOutlineIcon
              sx={{
                width: { xs: 24, md: 30 },
                height: { xs: 24, md: 30 },
                color: "error.main",
              }}
            />
          );
          setDialogMessage("Something went wrong. Please try again.");
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
      } else {
        const res = validatePassword(newPassword);
        if (!res.ok) {
          setErrors((prev) => ({
            ...prev,
            comparePasswordError: "Password doesn't meet the requirements.",
          }));
        }
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

      const res = validatePassword(newPassword);
      if (!res.ok) {
        setErrors((prev) => ({
          ...prev,
          comparePasswordError: "Password doesn't meet the requirements.",
        }));
        return;
      }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/update-profile`, {
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
        setDialogTitle(
          <CheckCircleIcon
            sx={{
              width: { xs: 24, md: 30 },
              height: { xs: 24, md: 30 },
              color: "success.main",
            }}
          />
        );
        setDialogMessage(result.message || "Profile updated successfully!");
        setOpenDialog(true);

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
        setDialogTitle(
          <ErrorOutlineIcon
            sx={{
              width: { xs: 24, md: 30 },
              height: { xs: 24, md: 30 },
              color: "error.main",
            }}
          />
        );
        setDialogMessage(result.message || "Update failed.");
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setDialogTitle(
        <ErrorOutlineIcon
          sx={{
            width: { xs: 24, md: 30 },
            height: { xs: 24, md: 30 },
            color: "error.main",
          }}
        />
      );
      setDialogMessage("Something went wrong. Please try again.");
      setOpenDialog(true);
    }
  };

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  // Re-added: request account deletion handler (was missing)
  const handleRequestDelete = async () => {
    setDeleting(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/request-delete-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await resp.json();

      setDialogTitle(
        <CheckCircleIcon
          sx={{
            width: { xs: 24, md: 30 },
            height: { xs: 24, md: 30 },
            color: "success.main",
          }}
        />
      );
      setDialogMessage(
        resp.ok
          ? data.message ||
              "We sent you an email with a confirmation link to delete your account."
          : data.message ||
              "Could not start account deletion. Please try again."
      );
      setOpenDialog(true);
    } catch (error) {
      setDialogTitle(
        <ErrorOutlineIcon
          sx={{
            width: { xs: 24, md: 30 },
            height: { xs: 24, md: 30 },
            color: "error.main",
          }}
        />
      );
      setDialogMessage("Network error. Please try again.");
      setOpenDialog(true);
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  // Live checklist component
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

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        minHeight: "100vh",
        pb: { xs: 6, md: 0 },
        overflow: "hidden",
      }}
    >
      <SideNavigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflowY: "auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
                width: { xs: 60, md: 90 },
                height: { xs: 60, md: 90 },
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
            <Box
              sx={{
                display: "flex",
                gap: { xs: 3, md: 4 },
                alignItems: "center",
              }}
            >
              <FormLabel sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }}>
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
                      fontSize: { xs: "0.7rem", md: "1rem" },
                    },
                  }}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: { xs: "0.7rem", md: "1rem" },
                    },
                  }}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: { xs: "0.7rem", md: "1rem" },
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
                      {showPassword ? (
                        <VisibilityOff sx={{ fontSize: { xs: 18, md: 24 } }} />
                      ) : (
                        <Visibility sx={{ fontSize: { xs: 18, md: 24 } }} />
                      )}
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
                onChange={(e) => {
                  const val = e.target.value;
                  setFormFields((prev) => ({ ...prev, newPassword: val }));

                  const res = validatePassword(val);
                  const mismatch =
                    formFields.confirmNewPassword &&
                    val !== formFields.confirmNewPassword;

                  if (mismatch) {
                    setErrors((prev) => ({
                      ...prev,
                      comparePasswordError: "New passwords do not match.",
                    }));
                  } else if (!res.ok) {
                    setErrors((prev) => ({
                      ...prev,
                      comparePasswordError:
                        "Password doesn't meet the requirements.",
                    }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      comparePasswordError: "",
                    }));
                  }

                  if (!pwHelpOpen) {
                    setPwAnchorEl(e.currentTarget);
                    setPwHelpOpen(true);
                  }
                }}
                onFocus={(e) => {
                  setPwAnchorEl(e.currentTarget);
                  setPwHelpOpen(true);
                }}
                onBlur={() => setTimeout(() => setPwHelpOpen(false), 120)}
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
                      {showPassword ? (
                        <VisibilityOff sx={{ fontSize: { xs: 18, md: 24 } }} />
                      ) : (
                        <Visibility sx={{ fontSize: { xs: 18, md: 24 } }} />
                      )}
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
                onChange={(e) => {
                  const val = e.target.value;
                  setFormFields((prev) => ({
                    ...prev,
                    confirmNewPassword: val,
                  }));

                  const mismatch =
                    formFields.newPassword && val !== formFields.newPassword;
                  if (mismatch) {
                    setErrors((prev) => ({
                      ...prev,
                      comparePasswordError: "New passwords do not match.",
                    }));
                  } else {
                    const res = validatePassword(formFields.newPassword || "");
                    setErrors((prev) => ({
                      ...prev,
                      comparePasswordError: res.ok
                        ? ""
                        : "Password doesn't meet the requirements.",
                    }));
                  }
                }}
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
                      {showPassword ? (
                        <VisibilityOff sx={{ fontSize: { xs: 18, md: 24 } }} />
                      ) : (
                        <Visibility sx={{ fontSize: { xs: 18, md: 24 } }} />
                      )}
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
                width: "100%",
                display: "flex",
                alignItems: "center",
                fontSize: { xs: "0.6rem", md: "1rem" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <label>
                  Automatically change outdated applications status to "Ghosted"
                </label>
                <Tooltip
                  title='If enabled, applications in status "Applied" with no updates for 3 weeks will be automatically marked as "Ghosted". You can turn this off anytime.'
                  placement="top"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        maxWidth: 220,
                        fontSize: { xs: "0.7rem", md: "0.8rem" },
                        bgcolor: "common.black",
                        "& .MuiTooltip-arrow": { color: "common.black" },
                      },
                    },
                  }}
                  arrow
                  disableTouchListener={false}
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <IconButton size="small" sx={{ marginLeft: "4px" }}>
                    <HelpOutlineIcon sx={{ fontSize: { xs: 14, md: 18 } }} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Switch
                checked={checked}
                onChange={handleSwitchChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                fontSize: { xs: "0.6rem", md: "1rem" },
              }}
            >
              <Typography sx={{ fontSize: { xs: "0.6rem", md: "1rem" } }}>
                Do you want to delete your account?
              </Typography>
              <Link
                onClick={() => setDeleteOpen(true)}
                sx={{ cursor: "pointer" }}
              >
                Click here
              </Link>
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
                fontSize: { xs: 10, md: 14 },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Password Requirements Popper */}
      <Popper
        open={pwHelpOpen}
        anchorEl={pwAnchorEl}
        placement="bottom-start"
        sx={{ zIndex: 1300 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 1,
            bgcolor: "#1F2A38",
            color: "#fff",
            border: "1px solid #444",
            width: 260,
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Typography sx={{ fontSize: 12, mb: 0.5, color: "#ccc" }}>
            Password must meet:
          </Typography>
          <PasswordChecklist value={formFields.newPassword} />
        </Paper>
      </Popper>

      <DialogBox
        open={openDialog}
        setOpen={setOpenDialog}
        title={dialogTitle}
        message={dialogMessage}
      />

      <DialogBox
        open={deleteOpen}
        setOpen={setDeleteOpen}
        showCloseIcon={!deleting}
        title="Delete your account?"
        message={`This will permanently delete your DuckTrack account and all data. We'll send you an email to confirm this action.`}
        buttons={[
          {
            text: deleting ? "Sending..." : "Yes, send email",
            variant: "contained",
            color: "error",
            onClick: handleRequestDelete,
            closeOnClick: false,
            disabled: deleting,
            sx: { fontSize: { xs: 10, md: 12 }, my: 1.5 },
          },
          {
            text: "Cancel",
            variant: "outlined",
            color: "#001A42",
            disabled: deleting,
            sx: { fontSize: { xs: 10, md: 12 }, my: 1.5 },
          },
        ]}
      />
    </Box>
  );
};

export default EditProfilePage;
