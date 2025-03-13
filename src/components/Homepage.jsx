import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SideNavigation from "./SideNavigation";
import RecentApplicationBox from "./RecentApplicationBox";
import AuthContext from "../core/AuthContext";
import { DrawerHeader } from "./SideNavigation";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Fab from '@mui/material/Fab';
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const date = new Date();
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchApplications = async () => {
      let userId = user.user_id;
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:3000/my-applications?user_id=${userId}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();

          // Sort applications by date (assuming "created_at" exists)
          const sortedApplications = data.applications.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );

          // Keep only last 4 applications
          setApplications(sortedApplications.slice(0, 5));
        } catch (error) {
          console.error("Error fetching job applications:", error);
          setApplications([]);
        }
      }
    };

    fetchApplications();
  }, [user]);  
   
  const navigate = useNavigate(); 
  const handleGoToApplications = () => {
       navigate("/my-applications")
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavigation />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Welcome, {user ? `${user.user_first_name}` : "User"}!
        </Typography>
        <Typography sx={{ marginBottom: 2, fontSize: "12px" }}>
          Today is {formattedDate}
        </Typography>
        <Divider />

        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
          Your recent applications:
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-enevly",
            alignItems: "center", 
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            {applications.map((application, index) => (
              <RecentApplicationBox
                key={application.application_id}
                application={application}
              />
            ))}
          </Box>

          <Fab color="inherit" aria-label="add" size="small" onClick={handleGoToApplications}>
            <ArrowForwardIosIcon/>
          </Fab>

        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
