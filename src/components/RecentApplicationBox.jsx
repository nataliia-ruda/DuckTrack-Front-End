import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useNavigate } from "react-router-dom";
import "../App.css";

const RecentApplicationBox = ({ application }) => {
  const navigate = useNavigate();
  const applicationId = application.application_id;

  const handleRecentApplicationEdit = () => {
    navigate(`/my-applications/${applicationId}`);
  };

  const getRelativeDate = (dateString) => {
    const createdDate = new Date(dateString);
    const today = new Date();

    createdDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffInMs = today - createdDate;
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return createdDate.toLocaleDateString();
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        width: "100%",
        minHeight: "110px",
        mb: 2,
        padding: 1,
        boxShadow: 3,
      }}
      key={application.application_id}
    >
      {/* Colored status bar on the left */}
      <Box
        sx={{ width: 7, borderRadius: "4px 0 0 4px" }}
        className={
          application.status === "applied"
            ? "applied"
            : application.status === "interviewing"
            ? "interviewing"
            : application.status === "offer"
            ? "offer"
            : application.status === "rejected"
            ? "rejected"
            : application.status === "ghosted"
            ? "ghosted"
            : "withdrawn"
        }
      />

      {/* Main content area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          padding: 1,
          gap: 2,
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1.2,
          }}
        >
          {/* Position name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkIcon sx={{ fontSize: 14 }} />
            <Typography variant="body1" sx={{ fontSize: 13, fontWeight: 700 }}>
              {application.position_name}
            </Typography>
          </Box>

          {/* Employer name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ApartmentIcon sx={{ fontSize: 14 }} />
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              {application.employer_name}
            </Typography>
          </Box>

          {/* Created date */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 600 }}>
              Created:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              {getRelativeDate(application.created_at)}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ position: "absolute", top: 10, right: 10 }}>
          <IconButton
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "6px",
              borderRadius: "50%",
              boxShadow: 2,
            }}
            onClick={handleRecentApplicationEdit}
          >
            <ModeEditIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

export default RecentApplicationBox;
