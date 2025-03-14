import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SideNavigation from "./SideNavigation";
import RecentApplicationBox from "./RecentApplicationBox";
import AuthContext from "../core/AuthContext";
import { DrawerHeader } from "./SideNavigation";

import { useNavigate } from "react-router-dom";
import OldApplicationsBox from './OldApplicationsBox.jsx'

const Homepage = () => {
  const date = new Date();
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [oldApplications, setOldApplications] = useState([]); 

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

         
          const sortedApplications = data.applications.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          ); 

          setApplications(sortedApplications.slice(0, 5)); 

          
          const twoWeeksAgo = new Date();
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 1);

          const filteredOldApplications = data.applications.filter(application => {
            
            const lastUpdateDate = new Date(application.updated_at); 
            return lastUpdateDate < twoWeeksAgo; 
          });

          setOldApplications(filteredOldApplications); 
        } catch (error) {
          console.error("Error fetching job applications:", error);
          setApplications([]);
          setOldApplications([]);
        }
      }
    };

    fetchApplications();
  }, [user]);

  const navigate = useNavigate();
/*   const handleGoToApplications = () => {
    navigate("/my-applications");
  };
 */
  const handleOldApplicationEdit = (applicationId) => {
    navigate(`/my-applications/${applicationId}`);
  };

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

        <Box py={3}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
            Your recent applications:
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            {applications.map((application) => (
              <RecentApplicationBox
                key={application.application_id}
                application={application}
              />
            ))}
          </Box>
        </Box>

        <Box paddingY={3}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
            These applications haven't had any updates for more than 2 weeks:
          </Typography>
       
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {oldApplications.map((oldApplication) => (
              <OldApplicationsBox
                key={oldApplication.application_id}
                application={oldApplication}  
                handleOldApplicationEdit={handleOldApplicationEdit}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;