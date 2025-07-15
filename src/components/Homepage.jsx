import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SideNavigation from "./SideNavigation";
import RecentApplicationBox from "./RecentApplicationBox";
import AuthContext from "../core/AuthContext";
import { DrawerHeader } from "./SideNavigation";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useNavigate } from "react-router-dom";
import OldApplicationsBox from "./OldApplicationsBox.jsx";
import Avatar from "@mui/material/Avatar";
import OverviewBoard from "./OverviewBoard.jsx";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

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

          const threeWeeksAgo = new Date();
          threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

          const filteredOldApplications = data.applications.filter(
            (application) => {
              const lastUpdateDate = new Date(application.updated_at);

              const isOldApplied =
                application.status.toLowerCase() === "applied" &&
                lastUpdateDate < threeWeeksAgo;

              const isGhosted = application.status.toLowerCase() === "ghosted";

              return isOldApplied || isGhosted;
            }
          );
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
  const handleOldApplicationEdit = (applicationId) => {
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

        <OverviewBoard />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            gap: 4,
            mt: 3,
          }}
        >
          {/* Recent Applications */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="p" sx={{ fontWeight: 600 }}>
                Recent Applications:
              </Typography>
              <Link
                component={RouterLink}
                to="/my-applications"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "16px",
                  justifyContent: "center",
                }}
              >
                Show All Applications{" "}
                <ArrowForwardIcon sx={{ width: "16px", height: "16px" }} />
              </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                borderRadius: "10px",
                overflowY: "auto",
                boxShadow:
                  "0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.06)",
                maxHeight: "420px",
                padding: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              {applications.length > 0 ? (
                applications.map((application) => (
                  <RecentApplicationBox
                    key={application.application_id}
                    application={application}
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
                  <CollectionsBookmarkIcon fontSize="small" />
                  No applications yet. Start by registering a new application.
                </Typography>
              )}
            </Box>
          </Box>

          {/* Old Applications */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="p" sx={{ marginBottom: 3, fontWeight: 600 }}>
              Applications with no updates in over 3 weeks:
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                overflowY: "auto",
                boxShadow:
                  "0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.06)",
                maxHeight: "420px",
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
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
