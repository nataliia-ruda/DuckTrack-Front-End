import { useEffect, useState } from "react";
import SideNavigation, { DrawerHeader } from "./SideNavigation.jsx";
import InterviewDetailsDialog from "./InterviewDetailsDialog.jsx";
import DialogBox from "./DialogBox.jsx";
import {
  Box,
  Typography,
  Card,
  IconButton,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import WorkIcon from "@mui/icons-material/Work";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

const InterviewPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingInterviewId, setEditingInterviewId] = useState(null);
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [dialogBoxConfig, setDialogBoxConfig] = useState({
    title: "",
    message: "",
    buttons: [],
  });

  const [interviewDetails, setInterviewDetails] = useState({
    application_id: "",
    employer: "",
    date: "",
    location: "",
    contact: "",
    notes: "",
    type: "On-site",
  });

  useEffect(() => {
    fetchInterviews();
    fetchEmployers();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await fetch("http://localhost:3000/interviews", {
        credentials: "include",
      });
      const data = await res.json();
      setInterviews(data.interviews || []);
    } catch (error) {
      console.error("Error fetching interviews", error);
    }
  };

  const fetchEmployers = async () => {
    try {
      const res = await fetch("http://localhost:3000/my-employers", {
        credentials: "include",
      });
      const data = await res.json();
      setEmployers(data.employers || []);
    } catch (error) {
      console.error("Error fetching employers", error);
    }
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setIsEditing(false);
    setEditingInterviewId(null);
    setInterviewDetails({
      application_id: "",
      employer: "",
      date: "",
      location: "",
      contact: "",
      notes: "",
      type: "On-site",
    });
  };

  const showSuccessDialog = (message) => {
    setDialogBoxConfig({
      title: <CheckCircleOutlineIcon sx={{ fontSize: "35px" }} />,
      message,
      buttons: [{ text: "OK", onClick: () => setDialogBoxOpen(false) }],
    });
    setDialogBoxOpen(true);
  };

  const createInterview = async () => {
    try {
      const res = await fetch("http://localhost:3000/interviews", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interviewDetails),
      });

      if (!res.ok) throw new Error("Failed to save interview");
      resetDialog();
      fetchInterviews();
      showSuccessDialog("Interview created successfully!");
    } catch (error) {
      console.error("Error creating interview", error);
    }
  };

  const updateInterview = async () => {
    try {
      const payload = {
        interview_date: interviewDetails.date,
        location: interviewDetails.location,
        contact_person: interviewDetails.contact,
        notes: interviewDetails.notes,
      };

      const res = await fetch(
        `http://localhost:3000/interviews/${editingInterviewId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Failed to update interview: " + errorText);
      }

      resetDialog();
      fetchInterviews();
      showSuccessDialog("Interview updated successfully!");
    } catch (error) {
      console.error("Error updating interview", error);
    }
  };

  const handleSaveInterview = () => {
    isEditing ? updateInterview() : createInterview();
  };

  const handleEdit = (interview) => {
    setIsEditing(true);
    setEditingInterviewId(interview.interview_id);
    setDialogOpen(true);
    setInterviewDetails({
      application_id: interview.application_id,
      employer: interview.employer_name,
      date: interview.interview_date.slice(0, 16),
      location: interview.location || "",
      contact: interview.contact_person || "",
      notes: interview.notes || "",
      type: interview.type || "On-site",
    });
  };

  const handleDelete = (id) => {
    setDialogBoxConfig({
      title: <HelpOutlineIcon sx={{ fontSize: "35px" }} />,
      message: "Are you sure you want to delete this interview?",
      buttons: [
        {
          text: "Cancel",
          onClick: () => setDialogBoxOpen(false),
          variant: "outlined",
        },
        {
          text: "Delete",
          onClick: async () => {
            try {
              const res = await fetch(
                `http://localhost:3000/interviews/${id}`,
                {
                  method: "DELETE",
                  credentials: "include",
                }
              );
              if (!res.ok) throw new Error("Delete failed");
              setDialogBoxOpen(false);
              fetchInterviews();
            } catch (error) {
              console.error("Failed to delete interview", error);
            }
          },
          bgColor: "#001A42",
          textColor: "#fff",
        },
      ],
    });
    setDialogBoxOpen(true);
  };

  const now = new Date();
  const upcoming = interviews
    .filter((i) => new Date(i.interview_date) > now)
    .sort((a, b) => new Date(a.interview_date) - new Date(b.interview_date));
  const past = interviews
    .filter((i) => new Date(i.interview_date) <= now)
    .sort((a, b) => new Date(b.interview_date) - new Date(a.interview_date));

  const renderLocation = (interview) => {
    if (interview.type === "Online" && interview.location?.startsWith("http")) {
      try {
        const url = new URL(interview.location);
        return (
          <Link href={interview.location} target="_blank" rel="noopener">
            {url.hostname + "/..."}
          </Link>
        );
      } catch {
        return interview.location;
      }
    }
    return interview.location || "—";
  };

  const renderCards = (list) =>
    list.map((interview) => (
      <Box
        key={interview.interview_id}
        sx={{
          flex: "0 1 auto",
          minWidth: 330,
          maxWidth: 360,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            boxShadow: 3,
            p: 2,
          }}
        >
          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                color: "#5A5A5A",
                fontWeight: 500,
                fontSize: { xs: 10, md: 13 },
              }}
            >
              {new Date(interview.interview_date).toLocaleString([], {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <WorkIcon
                sx={{ mr: 1, color: "#A1887F", fontSize: { xs: 16, md: 22 } }}
              />
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ fontSize: { xs: 12, md: 14 } }}
              >
                {interview.employer_name}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <LocationOnIcon
                sx={{
                  mr: 1,
                  mt: "2px",
                  color: "#EF5350",
                  fontSize: { xs: 16, md: 22 },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  flex: 1,
                  fontSize: { xs: 12, md: 14 },
                }}
              >
                {renderLocation(interview)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <PersonIcon
                sx={{ mr: 1, color: "#4CAF50", fontSize: { xs: 16, md: 22 } }}
              />
              <Typography variant="body2" sx={{ fontSize: { xs: 12, md: 14 } }}>
                {interview.contact_person || " "}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <StickyNote2Icon
                sx={{
                  mr: 1,
                  mt: "2px",
                  color: "#FFD54F",
                  fontSize: { xs: 16, md: 22 },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  fontSize: { xs: 12, md: 14 },
                }}
              >
                {interview.notes || ""}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <IconButton
              onClick={() => handleEdit(interview)}
              size="small"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
              }}
            >
              <EditIcon sx={{ fontSize: { xs: 15, md: 22 } }} />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(interview.interview_id)}
              size="small"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
              }}
            >
              <DeleteIcon sx={{ fontSize: { xs: 15, md: 22 } }} />
            </IconButton>
          </Box>
        </Card>
      </Box>
    ));

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideNavigation />
      <Box
        component="main"
        sx={{
          lexGrow: 1,
          p: { xs: 2, md: 3 },
          overflowY: "auto", 
          height: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DrawerHeader />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {xs: "center", md: "flex-start"},
            my: {xs: 0, md: 1},
          }}
        >
          <Typography variant="h5" sx={{ fontSize: { xs: 18, md: 24 } }}>
            Upcoming Interviews
          </Typography>

          <Tooltip title="Add New Interview">
            <Fab
              size="small"
              sx={{
                mx: 2,
                width: { xs: 32, md: 40 },
                height: { xs: 32, md: 40 },
                minHeight: "unset",
              }}
              aria-label="add"
              onClick={() => {
                setDialogOpen(true);
                setIsEditing(false);
                setInterviewDetails({
                  application_id: "",
                  employer: "",
                  date: "",
                  location: "",
                  contact: "",
                  notes: "",
                  type: "On-site",
                });
              }}
            >
              <AddIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
            </Fab>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: {xs: "center",md:"flex-start"},
            my: 4,
          }}
        >
          {renderCards(upcoming)}
        </Box>

        <Typography variant="h5" sx={{ mb: 2, fontSize: { xs: 18, md: 24 }, textAlign: {xs: "center", md: "start"} }}>
          Previous Interviews
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: {xs: "center",md:"flex-start"},
            mb: {xs: 4, md: 0},
            pb: 2,
          }}
        >
          {renderCards(past)}
        </Box>

        <InterviewDetailsDialog
          open={dialogOpen}
          onClose={resetDialog}
          interviewDetails={interviewDetails}
          setInterviewDetails={setInterviewDetails}
          onSave={handleSaveInterview}
          applications={employers}
        />

        <DialogBox
          open={dialogBoxOpen}
          setOpen={setDialogBoxOpen}
          title={dialogBoxConfig.title}
          message={dialogBoxConfig.message}
          buttons={dialogBoxConfig.buttons}
        />
      </Box>
    </Box>
  );
};

export default InterviewPage;
