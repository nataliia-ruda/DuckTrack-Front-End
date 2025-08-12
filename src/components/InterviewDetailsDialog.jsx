import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

const InterviewDetailsDialog = ({
  open,
  onClose,
  interviewDetails,
  setInterviewDetails,
  onSave,
  applications = [],
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "application_id") {
      const selectedApp = applications.find(
        (app) => app.application_id === value
      );

      setInterviewDetails((prev) => ({
        ...prev,
        application_id: value,
        employer: selectedApp ? selectedApp.employer_name : "",
      }));
    } else {
      setInterviewDetails((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const isEmpty = Object.values(interviewDetails).every(
    (val) => typeof val === "string" && val.trim() === ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty) return;
    onSave();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box
            sx={{ display: "flex" }}
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <Box
              sx={{ display: { xs: "none", md: "flex" } }}
              component="img"
              src="/duck_verification_successful.png"
              alt="Duck celebrating"
              width="20%"
            />
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ fontSize: { xs: 12, md: 17 } }}
            >
              Congratulations! You've been invited to an interview.
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box textAlign="center">
            <Typography
              variant="body1"
              gutterBottom
              sx={{ mb: 2, fontSize: { xs: 10, md: 13 } }}
            >
              Would you like to add more details so we can remind you on time?
            </Typography>
          </Box>

          {interviewDetails.application_id ? (
            <TextField
              label="Employer"
              value={interviewDetails.employer}
              fullWidth
              margin="normal"
              disabled
              size={isSmallScreen ? "small" : "medium"}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
              }}
            />
          ) : (
            <FormControl
              fullWidth
              margin="normal"
              required
              size={isSmallScreen ? "small" : "medium"}
            >
              <InputLabel sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
                Employer
              </InputLabel>
              <Select
                value={interviewDetails.application_id || ""}
                onChange={handleChange("application_id")}
                label="Employer"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  },
                }}
              >
                {applications.map((app) => (
                  <MenuItem
                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    key={app.application_id}
                    value={app.application_id}
                  >
                    {app.employer_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            required
            label="Date & Time"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={interviewDetails.date?.slice(0, 16)}
            onChange={handleChange("date")}
            size={isSmallScreen ? "small" : "medium"}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
            }}
          />

          <Box display="flex" alignItems="center" marginY={1}>
            <Typography
              variant="subtitle1"
              sx={{ marginRight: 2, fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Interview Type:
            </Typography>
            <RadioGroup
              row
              value={interviewDetails.type || "On-site"}
              onChange={handleChange("type")}
              sx={{
                alignSelf: "flex-start",
                "& .MuiFormControlLabel-label": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
              }}
            >
              <FormControlLabel
                value="On-site"
                control={<Radio />}
                label="On-site"
              />
              <FormControlLabel
                value="Online"
                control={<Radio />}
                label="Online"
              />
            </RadioGroup>
          </Box>

          {interviewDetails.type === "Online" ? (
            <TextField
              label="Meeting Link"
              fullWidth
              margin="normal"
              placeholder="e.g. https://zoom.us/..."
              value={interviewDetails.location}
              onChange={handleChange("location")}
              size={isSmallScreen ? "small" : "medium"}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
              }}
            />
          ) : (
            <TextField
              label="Location Address"
              fullWidth
              margin="normal"
              placeholder="e.g. Main St 123, Hamburg"
              value={interviewDetails.location}
              onChange={handleChange("location")}
              size={isSmallScreen ? "small" : "medium"}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", md: "1rem" },
                },
              }}
            />
          )}

          <TextField
            label="Contact Person"
            fullWidth
            margin="normal"
            value={interviewDetails.contact}
            onChange={handleChange("contact")}
            size={isSmallScreen ? "small" : "medium"}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
            }}
          />

          <TextField
            label="Notes"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={interviewDetails.notes}
            onChange={handleChange("notes")}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            type="button"
            sx={{
              color: "#001A42",
              borderColor: "#001A42",
              fontSize: { xs: 11, md: 15 },
            }}
          >
            Skip
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isEmpty}
            sx={{
              backgroundColor: "#001A42",
              color: "#fff",
              fontSize: { xs: 11, md: 15 },
              "&:hover": {
                backgroundColor: "#001A42",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InterviewDetailsDialog;
