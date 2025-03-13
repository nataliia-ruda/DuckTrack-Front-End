import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkIcon from '@mui/icons-material/Work';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import AuthContext from "../core/AuthContext";
import "../App.css";
import { useNavigate } from 'react-router-dom';
 

const RecentApplicationBox = ({ application }) => {

  const navigate = useNavigate(); 
   const applicationId = application.application_id

  const handleRecentApplicationEdit = () => {
      navigate(`/my-applications/${applicationId}`)
  }
  return (
    <Card sx={{ width: "30%", display: "flex", justifyContent: "center", position: "relative" }}>
    
      <Box
        className={
          application.status === "waiting for response"
            ? "waiting"
            : application.status === "rejected"
            ? "rejected"
            : "interview"
        }
        sx={{ width: 7, borderRadius: "4px 0 0 4px" }}
      />

      <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", padding: 1, width: "60%", gap: 1.5}}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkIcon sx={{ fontSize: 15 }} />
            <Typography variant="p" gutterBottom sx={{ fontSize: 14, fontWeight: 700 }}>
              {application.position_name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ApartmentIcon sx={{ fontSize: 15 }} />
            <Typography variant="p" gutterBottom sx={{ fontSize: 14}}>{application.employer_name}</Typography>
          </Box>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(255, 255, 255, 0.7)", 
              padding: "5px", 
              borderRadius: "50%", 
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