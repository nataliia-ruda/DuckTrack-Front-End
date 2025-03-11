import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditApplicationTable = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    position_name: "",
    employer_name: "",
    application_date: "",
    employment_type: "",
    source: "",
    job_description: "",
    job_link: "",
    work_mode: "",
    status: "waiting for response",
  });

  useEffect(() => {
    const fetchApplicationInfo = async () => {
      try {
        let response = await fetch(`http://localhost:3000/my-applications/${id}`);
        if (!response.ok) throw Error("URL does not exist!");

        let result = await response.json();
        
        const formattedDate = result.application_date
          ? result.application_date.split("T")[0] 
          : "";

        setFormData({
          ...result,
          application_date: formattedDate, 
        });
      } catch (error) {
        alert(error);
      }
    };

    fetchApplicationInfo();
  }, [id]);

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

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };


  const handleSaveChanges = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch(`http://localhost:3000/my-applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      if (!response.ok) throw new Error("Failed to update the application!");

      const result = await response.json();
      setFormData(result); 
      alert("Application updated successfully!");
    
    
      navigate("/my-applications");
    } catch(error) {
        alert(error)
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 700, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Edit Application
      </Typography>
      <Box
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
            <FormControlLabel value="On-site" control={<Radio />} label="On-site" />
            <FormControlLabel value="Hybrid" control={<Radio />} label="Hybrid" />
            <FormControlLabel value="Remote" control={<Radio />} label="Remote" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="job-search-source-label">Source:</InputLabel>
          <Select
            labelId="job-search-source-label"
            value={formData.source}
            onChange={handleSourceChange}
            label="Source"
          >
            <MenuItem value="stepstone">StepStone</MenuItem>
            <MenuItem value="indeed">Indeed</MenuItem>
            <MenuItem value="linkedin">LinkedIn</MenuItem>
            <MenuItem value="xing">Xing</MenuItem>
            <MenuItem value="arbeitsagentur">Arbeitsagentur</MenuItem>
            <MenuItem value="monster">Monster</MenuItem>
            <MenuItem value="join">Corporate website</MenuItem>
            <MenuItem value="other">Other</MenuItem>
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
            value={formData.status}
            onChange={handleStatusChange}
            label="Application status"
          >
            <MenuItem value="waiting for response">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#FFC107" }} />
                <span>Waiting for response</span>
              </Box>
            </MenuItem>
            <MenuItem value="rejected">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#E53935" }} />
                <span>Rejected</span>
              </Box>
            </MenuItem>
            <MenuItem value="interview">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircleIcon fontSize="small" sx={{ color: "#43A047" }} />
                <span>Interview</span>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save changes
        </Button>
      </Box>
    </Box>
  );
};

export default EditApplicationTable;