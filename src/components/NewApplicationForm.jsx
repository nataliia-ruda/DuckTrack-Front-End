import { useState, useContext } from "react";
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
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useMediaQuery, useTheme } from "@mui/material";

const NewApplicationForm = () => {
  const { user } = useContext(AuthContext);

  const [customSource, setCustomSource] = useState("");
  const [customEmploymentType, setCustomEmploymentType] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      ...formData,
      user_id: user.user_id,
      employment_type:
        formData.employment_type === "Other"
          ? customEmploymentType
          : formData.employment_type,
      source: formData.source === "Other" ? customSource : formData.source,
    };

    if (
      !applicationData.position_name ||
      !applicationData.employer_name ||
      !applicationData.application_date
    ) {
      setOpenDialog(true);
      setDialogMessage("Please fill in all required fields.");
      setDialogTitle(<PriorityHighIcon />);
      return;
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
        setDialogTitle(<CheckCircleOutlineOutlinedIcon />);
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
          notes: "",
        });
        setCustomSource("");
        setCustomEmploymentType("");
      } else {
        setOpenDialog(true);
        setDialogMessage("Failed to submit application. Please try again.");
        setDialogTitle(<PriorityHighIcon />);
      }
    } catch (error) {
      setOpenDialog(true);
      setDialogMessage("Error submitting application. Please try again.");
      setDialogTitle(<PriorityHighIcon />);
      console.error("Error submitting application:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: 1.5, md: 3 },
        maxWidth: 700,
        margin: "auto",
        height: "auto",
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
        Add New Application
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <TextField
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
          size={isSmallScreen ? "small" : "medium"}
          InputLabelProps={{ shrink: true }}
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
            onChange={handleChange}
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

        <FormControl fullWidth size={isSmallScreen ? "small" : "medium"}>
          <InputLabel
            id="job-search-source-label"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            Source:
          </InputLabel>
          <Select
            labelId="job-search-source-label"
            value={formData.source}
            onChange={(e) =>
              setFormData({ ...formData, source: e.target.value })
            }
            label="Source"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
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

          {formData.source === "Other" && (
            <TextField
              fullWidth
              margin="normal"
              label="Enter source here:"
              value={customSource}
              onChange={(e) => setCustomSource(e.target.value)}
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
            label="Application status"
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.8rem", md: "1rem" },
              },
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
          Add new application
        </Button>
      </Box>

      <DialogBox
        open={openDialog}
        setOpen={setOpenDialog}
        title={dialogTitle}
        message={dialogMessage}
        buttons={[
          {
            text: "Close",
            onClick: () => setOpenDialog(false),
            variant: "filled",
          },
        ]}
      />
    </Box>
  );
};

export default NewApplicationForm;
