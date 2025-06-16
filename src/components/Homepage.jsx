import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SideNavigation from "./SideNavigation";
import RecentApplicationBox from "./RecentApplicationBox";
import AuthContext from "../core/AuthContext";
import { DrawerHeader } from "./SideNavigation";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { useNavigate } from "react-router-dom";
import OldApplicationsBox from "./OldApplicationsBox.jsx";
import Avatar from "@mui/material/Avatar";

const Homepage = () => {
  const date = new Date();
  const { user } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);
  const [oldApplications, setOldApplications] = useState([]);
  const [interviewApplications, setInterviewApplications] = useState([]);

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
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

          const filteredOldApplications = data.applications.filter(
            (application) => {
              const lastUpdateDate = new Date(application.updated_at);
              return lastUpdateDate < twoWeeksAgo;
            }
          );

          setOldApplications(filteredOldApplications);

          const filteredInterviewApplications = data.applications.filter(
            (application) => application.status === "interview"
          );

          setInterviewApplications(filteredInterviewApplications);
        } catch (error) {
          console.error("Error fetching job applications:", error);
          setApplications([]);
          setOldApplications([]);
          setInterviewApplications([]);
        }
      }
    };

    fetchApplications();
  }, [user]);

  const navigate = useNavigate();
  const handleOldApplicationEdit = (applicationId) => {
    navigate(`/my-applications/${applicationId}`);
  };

  const handleInterviewApplicationEdit = (applicationId) => {
    navigate(`/my-applications/${applicationId}`);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideNavigation />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Box sx={{ display: "flex", gap: 2, mb: 0.3 }}>
          <Avatar
            alt="user avatar"
            src={
              user.gender === "female"
                ? "/FemaleAv.png"
                : user.gender === "male"
                ? "/MaleAv.png"
                : "/OtherAv.png"
            }
            sx={{
              border: "2px solid black",
              width: 60,
              height: 60,
              bgcolor: "white",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            <Typography variant="h5">
              Welcome, {user ? `${user.user_first_name}` : "User"}!
            </Typography>
            <Typography sx={{ marginBottom: 2, fontSize: "12px" }}>
              Today is {formattedDate}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box py={3}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
            Your recent applications:
          </Typography>

          {applications.length > 0 ? (
            <Box sx={{ display: "flex", gap: 3 }}>
              {applications.map((application) => (
                <RecentApplicationBox
                  key={application.application_id}
                  application={application}
                />
              ))}
            </Box>
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                color: "gray",
                fontSize: "14px",
                fontStyle: "italic",
              }}
            >
              No applications yet. Start by registering a new application to get
              started!
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            gap: 5,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
              Applications with no updates in over 2 weeks:
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                borderRadius: "10px",
                overflowY: "auto",
                boxShadow:
                  "0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.06)",
                maxHeight: "340px",
                padding: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              {oldApplications.length > 0 ? (
                oldApplications.map((oldApplication) => (
                  <OldApplicationsBox
                    key={oldApplication.application_id}
                    application={oldApplication}
                    handleOldApplicationEdit={handleOldApplicationEdit}
                  />
                ))
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "gray",
                    fontSize: "14px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    py: 2,
                  }}
                >
                  <WorkOutlineIcon fontSize="small" />
                  No outdated applications.
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ width: "50%" }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                fontWeight: 600,
              }}
            >
              Upcoming interviews:
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(20, 20, 20, 0.9)",
                  color: "#fff",
                  fontSize: "14px",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  marginLeft: 1,
                  fontWeight: "bold",
                }}
              >
                {interviewApplications.length}
              </Box>
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                borderRadius: "10px",
                overflowY: "auto",
                boxShadow:
                  "0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.06)",
                maxHeight: "340px",
                padding: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              {interviewApplications.length > 0 ? (
                interviewApplications.map((interview) => (
                  <OldApplicationsBox
                    key={interview.application_id}
                    application={interview}
                    handleOldApplicationEdit={handleInterviewApplicationEdit}
                  />
                ))
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "gray",
                    fontSize: "14px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    py: 2,
                  }}
                >
                  <EventBusyIcon fontSize="small" />
                  No upcoming interviews.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
