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
import DialogBox from "./DialogBox";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const EditApplicationTable = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

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
    work_mode: "",
    status: "applied",
    notes: ""
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
      setOpenDialog(true); 
      setDialogMessage(result.message); 
      setDialogTitle(<CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon>)
    
    
     ;
    } catch(error) {
        alert(error)
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 700, margin: "auto" }}>
      <Typography variant="h5" mb={3} textAlign={"center"}>
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
          variant="outlined"
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
            <MenuItem value="StepStone">StepStone</MenuItem>
            <MenuItem value="Indeed">Indeed</MenuItem>
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
            <MenuItem value="Xing">Xing</MenuItem>
            <MenuItem value="Arbeitsagentur">Arbeitsagentur</MenuItem>
            <MenuItem value="Monster">Monster</MenuItem>
            <MenuItem value="Corporate website">Corporate website</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
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

        <Button type="submit" variant="contained"  sx={{ mt: 2, backgroundColor: "rgba(20, 20, 20, 0.9)"}}>
          Save changes
        </Button>
      </Box>

      <DialogBox
              open={openDialog}
              setOpen={setOpenDialog}
              title={dialogTitle}
              message={dialogMessage}
              buttons={[
                { text: "Go to My Applications", onClick: () =>  navigate("/my-applications"), variant: "contained" },
                { text: "Close", onClick: () => setOpenDialog(false), variant: "outlined", bgColor: "black", textColor: "white" }
              ]}
            />
       
    </Box>
  );
};

export default EditApplicationTable;