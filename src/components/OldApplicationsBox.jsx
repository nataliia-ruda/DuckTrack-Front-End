import { Box, Card, CardContent, CardActions, IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import "../App.css";

const OldApplicationsBox = ({ application, handleOldApplicationEdit }) => {
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
     
      <Box sx={{ width: 7, borderRadius: "4px 0 0 4px", }}  
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
        }/>
  
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
         
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkIcon sx={{ fontSize: {xs: 12, md: 14}}} />
            <Typography variant="body1" sx={{ fontSize: {xs: 10, md: 13}, fontWeight: 700 }}>
              {application.position_name}
            </Typography>
          </Box>
  
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ApartmentIcon sx={{fontSize: {xs: 12, md: 14}}} />
            <Typography variant="body2" sx={{ fontSize: {xs: 10, md: 13} }}>
              {application.employer_name}
            </Typography>
          </Box>
  
          
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body2" sx={{ fontSize: {xs: 10, md: 12}, fontWeight: 600 }}>
              Last update:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: {xs: 9, md: 13} }}>
              {new Date(application.updated_at).toLocaleDateString()}
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
            onClick={() => handleOldApplicationEdit(application.application_id)}
          >
            <ModeEditIcon sx={{  fontSize: {xs: 13, md: 16} }} />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

export default OldApplicationsBox;