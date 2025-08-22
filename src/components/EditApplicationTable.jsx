import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircleIcon from "@mui/icons-material/Circle";
import DialogBox from "./DialogBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InterviewDetailsDialog from "./InterviewDetailsDialog";
import { useMediaQuery, useTheme } from "@mui/material";
import { useRef } from "react";

const EditApplicationTable = () => {
  const { id } = useParams();

  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [customEmploymentType, setCustomEmploymentType] = useState("");
  const employmentOptions = [
    "Full-time",
    "Part-time",
    "Minijob",
    "Internship",
    "Temporary",
  ];

  const [formData, setFormData] = useState({
    position_name: "",
    employer_name: "",
    application_date: "",
    employment_type: "",
    source: "",
    job_description: "",
    job_link: "",
    work_mode: "",
    status: "applied",
    notes: "",
  });

  const [interviewDialogOpen, setInterviewDialogOpen] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    application_id: id,
    employer: formData.employer_name,
    date: "",
    location: "",
    contact: "",
    notes: "",
    type: "On-site",
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setFormData({
      ...formData,
      status: newStatus,
    });

    if (newStatus === "interviewing") {
      setInterviewDialogOpen(true);
    }
  };

  useEffect(() => {
    const fetchApplicationInfo = async () => {
      try {
        let response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/my-applications/${id}`
        );
        if (!response.ok) throw Error("URL does not exist!");

        let result = await response.json();

        const formattedDate = result.application_date
          ? result.application_date.split("T")[0]
          : "";

        const dbType = result.employment_type || "";
        const isPreset = employmentOptions.includes(dbType);

        setFormData({
          ...result,
          application_date: formattedDate,
          employment_type: isPreset ? dbType : dbType ? "Other" : "",
        });
        setCustomEmploymentType(isPreset ? "" : dbType);
      } catch (error) {
        console.error(error);
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
        setDialogMessage("Failed to load application details.");
      }
    };

    fetchApplicationInfo();
  }, [id]);

  useEffect(() => {
    if (formData.employer_name) {
      setInterviewDetails((prev) => ({
        ...prev,
        employer: formData.employer_name,
      }));
    }
  }, [formData.employer_name]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWorkModeChange = (event) => {
    setFormData({ ...formData, work_mode: event.target.value });
  };

  const handleSourceChange = (e) => {
    setFormData({
      ...formData,
      source: e.target.value,
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const resolvedEmploymentType =
      formData.employment_type === "Other"
        ? customEmploymentType.trim()
        : formData.employment_type;

    if (formData.employment_type === "Other" && !resolvedEmploymentType) {
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
      setDialogMessage("Please enter employment type");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/my-applications/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...formData,
            employment_type: resolvedEmploymentType, // ✅ send resolved value
          }),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to update the application!");

      const result = await response.json();
      setOpenDialog(true);
      setDialogTitle(
        <CheckCircleIcon
          sx={{
            width: { xs: 24, md: 30 },
            height: { xs: 24, md: 30 },
            color: "success.main",
          }}
        />
      );
      setDialogMessage(result.message || "Application updated.");
    } catch (error) {
      console.error(error);
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
      setDialogMessage("Error updating the application.");
    }
  };

  const handleSaveInterview = async () => {
    try {
      const interviewRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/interviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          application_id: id,
          date: interviewDetails.date,
          location: interviewDetails.location,
          contact: interviewDetails.contact,
          notes: interviewDetails.notes,
          type: interviewDetails.type,
        }),
      });

      if (!interviewRes.ok) throw new Error("Failed to save interview details");
      const interviewResult = await interviewRes.json();

      const updateStatusRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/my-applications/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, status: "interviewing" }),
        }
      );

      if (!updateStatusRes.ok)
        throw new Error("Failed to update application status");

      const updateResult = await updateStatusRes.json();

      setInterviewDialogOpen(false);
      setOpenDialog(true);
      setDialogTitle(
        <CheckCircleIcon
          sx={{
            width: { xs: 24, md: 30 },
            height: { xs: 24, md: 30 },
            color: "success.main",
          }}
        />
      );
      setDialogMessage(interviewResult.message || "Interview saved.");
    } catch (error) {
      console.error("Failed to save interview and update status", error);
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
      setDialogMessage("Error saving interview or updating application status");
    }
  };

  const formRef = useRef(null);

  return (
    <Box
      sx={{
        padding: { xs: 1.5, md: 3 },
        maxWidth: 700,
        margin: "auto",
        height: "auto",
        width: "100%",
        boxSizing: "border-box",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: { xs: 18, md: 24 },
          textAlign: "center",
          mb: { xs: 2, md: 2 },
        }}
      >
        Edit Application
      </Typography>
      <Box 
       ref={formRef}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          width: "100%",
         
        }}
        onSubmit={handleSaveChanges}
      >
        <TextField
          variant="outlined"
          label="Job title:"
          name="position_name"
          value={formData.position_name}
          onChange={handleChange}
          fullWidth
          required
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
          label="Employer:"
          name="employer_name"
          value={formData.employer_name}
          onChange={handleChange}
          fullWidth
          required
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
          label="Application date:"
          name="application_date"
          type="date"
          value={formData.application_date}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
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

        <FormControl fullWidth size={isSmallScreen ? "small" : "medium"}>
          <InputLabel
            id="employment-type-label"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            Employment type:
          </InputLabel>
          <Select
            labelId="employment-type-label"
            value={formData.employment_type}
            onChange={(e) =>
              setFormData({ ...formData, employment_type: e.target.value })
            }
            label="Employment type"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              position: "relative"
            }}
             MenuProps={{
              disablePortal: true,
              container: formRef.current,
              PaperProps: { sx: { maxHeight: 280, position: "absolute" } },
              anchorOrigin: { vertical: "bottom", horizontal: "left" },
              transformOrigin: { vertical: "top", horizontal: "left" },
              disableScrollLock: true,
            }}
          >
            <MenuItem
              value="Full-time"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Full-time
            </MenuItem>
            <MenuItem
              value="Part-time"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Part-time
            </MenuItem>
            <MenuItem
              value="Minijob"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Minijob
            </MenuItem>
            <MenuItem
              value="Internship"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Internship
            </MenuItem>
            <MenuItem
              value="Temporary"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Temporary
            </MenuItem>
            <MenuItem
              value="Other"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Other
            </MenuItem>
          </Select>

          {formData.employment_type === "Other" && (
            <TextField
              fullWidth
              margin="normal"
              label="Enter employment type here:"
              value={customEmploymentType}
              onChange={(e) => setCustomEmploymentType(e.target.value)}
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
        </FormControl>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormLabel
            id="work-mode-label"
            sx={{
              alignSelf: { xs: "flex-start", md: "center" },
              fontSize: { xs: "0.8rem", md: "1rem" },
            }}
          >
            Work mode:
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="work-mode-label"
            name="work_mode"
            value={formData.work_mode}
            onChange={handleWorkModeChange}
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
              value="Hybrid"
              control={<Radio />}
              label="Hybrid"
            />
            <FormControlLabel
              value="Remote"
              control={<Radio />}
              label="Remote"
            />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel
            id="job-search-source-label"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            Source:
          </InputLabel>
          <Select
            labelId="job-search-source-label"
            value={formData.source}
            onChange={handleSourceChange}
            label="Source"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              position: "relative"
            }}
            MenuProps={{
              disablePortal: true,
              container: formRef.current,
              PaperProps: { sx: { maxHeight: 280, position: "absolute" } },
              anchorOrigin: { vertical: "bottom", horizontal: "left" },
              transformOrigin: { vertical: "top", horizontal: "left" },
              disableScrollLock: true,
            }}
          >
            <MenuItem
              value="StepStone"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              StepStone
            </MenuItem>
            <MenuItem
              value="Indeed"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Indeed
            </MenuItem>
            <MenuItem
              value="LinkedIn"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              LinkedIn
            </MenuItem>
            <MenuItem
              value="Xing"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Xing
            </MenuItem>
            <MenuItem
              value="Arbeitsagentur"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Arbeitsagentur
            </MenuItem>
            <MenuItem
              value="Monster"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Monster
            </MenuItem>
            <MenuItem
              value="Corporate website"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Corporate website
            </MenuItem>
            <MenuItem
              value="Other"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Other
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Job description:"
          name="job_description"
          value={formData.job_description}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={4}
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
          label="Job link:"
          name="job_link"
          value={formData.job_link}
          onChange={handleChange}
          fullWidth
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

        <FormControl
          fullWidth
          required
          size={isSmallScreen ? "small" : "medium"}
        >
          <InputLabel
            id="status-select-label"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            Application status:
          </InputLabel>
          <Select
            labelId="status-select-label"
            value={formData.status}
            onChange={handleStatusChange}
            label="Application status"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              }, 
              position: "relative",
            }}
            MenuProps={{
              disablePortal: true,
              container: formRef.current,
              PaperProps: { sx: { maxHeight: 280, position: "absolute" } },
              anchorOrigin: { vertical: "bottom", horizontal: "left" },
              transformOrigin: { vertical: "top", horizontal: "left" },
              disableScrollLock: true,
            }}
          >
            <MenuItem
              value="applied"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#FFC107" }} />
                <span>Applied</span>
              </Box>
            </MenuItem>
            <MenuItem
              value="interviewing"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#C8E6C9" }} />
                <span>Interviewing</span>
              </Box>
            </MenuItem>
            <MenuItem
              value="offer"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#4CAF50" }} />
                <span>Offer</span>
              </Box>
            </MenuItem>
            <MenuItem
              value="rejected"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#E53935" }} />
                <span>Rejected</span>
              </Box>
            </MenuItem>
            <MenuItem
              value="ghosted"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#1E88E5" }} />
                <span>Ghosted</span>
              </Box>
            </MenuItem>
            <MenuItem
              value="withdrawn"
              sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#9E9E9E" }} />
                <span>Withdrawn</span>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Notes:"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={4}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: { xs: "0.8rem", md: "1rem" },
            },
            "& .MuiInputLabel-root": {
              fontSize: { xs: "0.8rem", md: "1rem" },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            fontSize: { xs: 11, md: 15 },
          }}
        >
          Save changes
        </Button>
      </Box>

      <DialogBox
        open={openDialog}
        setOpen={setOpenDialog}
        title={dialogTitle}
        message={dialogMessage}
      />

      <InterviewDetailsDialog
        open={interviewDialogOpen}
        onClose={() => setInterviewDialogOpen(false)}
        interviewDetails={interviewDetails}
        setInterviewDetails={setInterviewDetails}
        onSave={handleSaveInterview}
      />
    </Box>
  );
};

export default EditApplicationTable;
