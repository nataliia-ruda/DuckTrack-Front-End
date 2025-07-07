import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import AuthContext from "../core/AuthContext";
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
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";


const NewApplicationForm = () => {
  const { user } = useContext(AuthContext);

  const [status, setStatus] = useState("applied");
  const [source, setSource] = useState("");
  const [customSource, setCustomSource] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [customEmploymentType, setCustomEmploymentType] = useState("");

  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const [formData, setFormData] = useState({
    position_name: "",
    employer_name: "",
    application_date: "",
    employment_type: "",
    source: "",
    job_description: "",
    job_link: "",
    status: "applied",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setFormData({
      ...formData,
      status: event.target.value,
    });
  };

  const handleSourceChange = (event) => {
    const selectedValue = event.target.value;
    setSource(selectedValue);
    setFormData({
      ...formData,
      source: selectedValue,
    });

    if (selectedValue !== "Other") {
      setCustomSource("");
    }
  };

  const handleEmploymentTypeChange = (event) => {
    const selectedValue = event.target.value;
    setEmploymentType(selectedValue);
    setFormData({
      ...formData,
      employment_type: selectedValue,
    });

    if (selectedValue !== "Other") {
      setCustomEmploymentType("");
    }
  };

  const handleWorkModeChange = (event) => {
    setFormData({
      ...formData,
      work_mode: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      ...formData,
      user_id: user.user_id,
      employment_type:
        employmentType === "Other" ? customEmploymentType : employmentType,
      source: source === "Other" ? customSource : source,
    };

    if (
      !applicationData.position_name ||
      !applicationData.employer_name ||
      !applicationData.application_date
    ) {
      setOpenDialog(true)
      setDialogMessage("Please fill in all required fields.");
      setDialogTitle(<PriorityHighIcon/>); 
    }

    try {
      const response = await fetch("http://localhost:3000/new-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });
        
      const result = await response.json(); 

      if (response.ok) {
        setOpenDialog(true); 
        setDialogMessage(result.message); 
        setDialogTitle(<CheckCircleOutlineOutlinedIcon/>);
        setFormData({
          position_name: "",
          employer_name: "",
          application_date: "",
          employment_type: "",
          source: "",
          job_description: "",
          job_link: "",
          work_mode: "",
          status: "applied",
          notes: ""
        });
      } else {
        setOpenDialog(true); 
        setDialogMessage("Failed to submit application. Please try again.");
        setDialogTitle(<PriorityHighIcon/>);
      }
    } catch (error) {
      setOpenDialog(true); 
      setDialogMessage("Error submitting application. Please try again.");
      setDialogTitle(<PriorityHighIcon/>);
      console.error("Error submitting application:", error);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 700, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Add New Application
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          label="Job title:"
          name="position_name"
          value={formData.position_name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Employer:"
          name="employer_name"
          value={formData.employer_name}
          onChange={handleChange}
          fullWidth
          required
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
        />

        <FormControl fullWidth>
          <InputLabel id="employment-type-label">Employment type:</InputLabel>
          <Select
            labelId="employment-type-label"
            value={employmentType}
            onChange={handleEmploymentTypeChange}
            label="Employment type"
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Minijob">Minijob</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Temporary">Temporary</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>

          {employmentType === "Other" && (
            <TextField
              fullWidth
              margin="normal"
              label="Enter employment type here:"
              value={customEmploymentType}
              onChange={(e) => setCustomEmploymentType(e.target.value)}
            />
          )}
        </FormControl>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormLabel id="work-mode-label">Work mode:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="work-mode-label"
            name="work_mode"
            value={formData.work_mode}
            onChange={handleWorkModeChange}
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
          <InputLabel id="job-search-source-label">Source:</InputLabel>
          <Select
            labelId="job-search-source-label"
            value={source}
            onChange={handleSourceChange}
            label="Source"
          >
            <MenuItem value="StepStone">StepStone</MenuItem>
            <MenuItem value="Indeed">Indeed</MenuItem>
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
            <MenuItem value="Xing">Xing</MenuItem>
            <MenuItem value="Arbeitsagentur">Arbeitsagentur</MenuItem>
            <MenuItem value="Monster">Monster</MenuItem>
            <MenuItem value="Corporate website">Corporate website</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>

          {source === "Other" && (
            <TextField
              fullWidth
              margin="normal"
              label="Enter source here:"
              value={customSource}
              onChange={(e) => setCustomSource(e.target.value)}
            />
          )}
        </FormControl>

        <TextField
          label="Job description:"
          name="job_description"
          value={formData.job_description}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={4}
        />

        <TextField
          label="Job link:"
          name="job_link"
          value={formData.job_link}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel id="status-select-label">Application status:</InputLabel>
          <Select
            labelId="status-select-label"
            value={status}
            label="Application status"
            onChange={handleStatusChange}
          >
            <MenuItem value="applied">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#FFC107" }} />
                <span>Applied</span>
              </Box>
            </MenuItem>
            <MenuItem value="interviewing">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#C8E6C9" }} />
                <span>Interviewing</span>
              </Box>
            </MenuItem> 
            <MenuItem value="offer">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#4CAF50" }} />
                <span>Offer</span>
              </Box>
            </MenuItem>
            <MenuItem value="rejected">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#E53935" }} />
                <span>Rejected</span>
              </Box>
            </MenuItem>
            <MenuItem value="ghosted">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#1E88E5" }} />
                <span>Ghosted</span>
              </Box>
            </MenuItem> 
             <MenuItem value="withdrawn">
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
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, backgroundColor:"rgba(20, 20, 20, 0.9)" }}
        >
          Add new application
        </Button>
      </Box>

      <DialogBox
        open={openDialog}
        setOpen={setOpenDialog}
        title={dialogTitle}
        message={dialogMessage}
        buttons={[
    
          { text: "Close", onClick: () => setOpenDialog(false), variant: "filled" },
        ]}
      />
    </Box>
       

  );
};

export default NewApplicationForm;
