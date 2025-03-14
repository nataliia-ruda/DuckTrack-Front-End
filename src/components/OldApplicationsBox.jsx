import { Box, Card, CardContent, CardActions, IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";

const OldApplicationsBox = ({ application, handleOldApplicationEdit }) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        width: "50%",
        mb: 2,
      }}
      key={application.application_id}
    >
      <Box sx={{ width: 7, borderRadius: "4px 0 0 4px", backgroundColor: "blue" }} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
          width: "60%",
          gap: 1.5,
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", gap: 2}}>

          <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkIcon sx={{ fontSize: 15 }} />
            <Typography variant="body1" gutterBottom sx={{ fontSize: 14, fontWeight: 700 }}>
              {application.position_name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ApartmentIcon sx={{ fontSize: 15 }} />
            <Typography variant="body2" gutterBottom sx={{ fontSize: 14 }}>
              {application.employer_name}
            </Typography>
          </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="p" sx={{ fontSize: 12 }}>Last update:</Typography>
            <Typography variant="p" sx={{ fontSize: 12 }}>
             {new Date(application.updated_at).toLocaleDateString()}
            </Typography>
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
            onClick={() => handleOldApplicationEdit(application.application_id)}
          >
            <ModeEditIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

export default OldApplicationsBox;