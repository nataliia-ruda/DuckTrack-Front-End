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
} from "@mui/material";

const InterviewDetailsDialog = ({
  open,
  onClose,
  interviewDetails,
  setInterviewDetails,
  onSave,
  applications = [],
}) => {
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
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src="/duck_verification_successful.png"
              alt="Duck celebrating"
              width="100"
            />
            <Typography variant="h6" textAlign="center">
              Congratulations! You've been invited to an interview.
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box textAlign="center">
            <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
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
            />
          ) : (
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Employer</InputLabel>
              <Select
                value={interviewDetails.application_id || ""}
                onChange={handleChange("application_id")}
                label="Employer"
              >
                {applications.map((app) => (
                  <MenuItem key={app.application_id} value={app.application_id}>
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
          />

          <TextField
            label="Location or Link"
            fullWidth
            margin="normal"
            value={interviewDetails.location}
            onChange={handleChange("location")}
          />

          <TextField
            label="Contact Person"
            fullWidth
            margin="normal"
            value={interviewDetails.contact}
            onChange={handleChange("contact")}
          />

          <TextField
            label="Notes"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={interviewDetails.notes}
            onChange={handleChange("notes")}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            type="button"
            sx={{ color: "#001A42", borderColor: "#001A42" }}
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
