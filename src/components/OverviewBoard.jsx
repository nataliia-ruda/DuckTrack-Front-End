import { Box, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AuthContext from "../core/AuthContext";

const OverviewBoard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [thisWeekCount, setThisWeekCount] = useState(0);
  const [interviewCount, setInterviewCount] = useState(0);
  const [responseRate, setResponseRate] = useState(0);

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
          setApplications(data.applications);
          /* 
          Application this week */
          const today = new Date();
          const dayOfWeek = today.getDay();
          const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

          const monday = new Date(today);
          monday.setDate(today.getDate() - diffToMonday);
          monday.setHours(0, 0, 0, 0);

          const count = data.applications.filter((app) => {
            const createdDate = new Date(app.created_at);
            return createdDate >= monday;
          }).length;

          setThisWeekCount(count);

          /*  Filtering applications with status interview */
          const interviewApplications = data.applications.filter(
            (app) => app.status === "interviewing"
          );
          setInterviewCount(interviewApplications.length);

          const total = data.applications.length;

          const repliedApplications = data.applications.filter(
            (app) =>
              app.status === "interviewing" ||
              app.status === "offer" ||
              app.status === "rejected"
          );

          const rate =
            total > 0 ? (repliedApplications.length / total) * 100 : 0;
          setResponseRate(Math.round(rate));
        } catch (error) {
          console.error("Error fetching job applications:", error);
          setApplications([]);
          setThisWeekCount(0);
        }
      }
    };

    fetchApplications();
  }, [user]);

  return (
    <Box sx={{ display: "flex", gap: 3.5, my: 5 }}>
      {/* Total Applications */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          borderRadius: "10px",
          boxShadow:
            "0px 4px 10px rgba(0, 0, 0, 0.05), 0px 2px 6px rgba(0, 0, 0, 0.03)",
          p: 2,
          backgroundColor: "#fff",
        }}
      >
        <Box>
          <Typography sx={{ color: "#6c757d", fontSize: "14px" }}>
            Total Applications
          </Typography>
          <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
            {applications ? applications.length : 0}
          </Typography>
        </Box>
        <WorkOutlineIcon sx={{ fontSize: 30, color: "#FFC107" }} />
      </Box>

      {/* This Week */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          borderRadius: "10px",
          boxShadow:
            "0px 4px 10px rgba(0, 0, 0, 0.05), 0px 2px 6px rgba(0, 0, 0, 0.03)",
          p: 2,
          backgroundColor: "#fff",
        }}
      >
        <Box>
          <Typography sx={{ color: "#6c757d", fontSize: "14px" }}>
            This Week
          </Typography>
          <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
            {applications ? thisWeekCount : 0}
          </Typography>
        </Box>
        <CalendarTodayOutlinedIcon sx={{ fontSize: 30, color: "#2196F3" }} />
      </Box>

      {/* Interviews */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          borderRadius: "10px",
          boxShadow:
            "0px 4px 10px rgba(0, 0, 0, 0.05), 0px 2px 6px rgba(0, 0, 0, 0.03)",
          p: 2,
          backgroundColor: "#fff",
        }}
      >
        <Box>
          <Typography sx={{ color: "#6c757d", fontSize: "14px" }}>
            Interviews
          </Typography>
          <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
            {applications ? interviewCount : 0}
          </Typography>
        </Box>
        <PeopleAltOutlinedIcon sx={{ fontSize: 30, color: "#4CAF50" }} />
      </Box>

      {/* Response Rate */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          borderRadius: "10px",
          boxShadow:
            "0px 4px 10px rgba(0, 0, 0, 0.05), 0px 2px 6px rgba(0, 0, 0, 0.03)",
          p: 2,
          backgroundColor: "#fff",
        }}
      >
        <Box>
          <Typography sx={{ color: "#6c757d", fontSize: "14px" }}>
            Response Rate
          </Typography>
          <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
            {applications ? `${responseRate}%` : "0%"}
          </Typography>
        </Box>
        <TrendingUpOutlinedIcon sx={{ fontSize: 30, color: "#9C27B0" }} />
      </Box>
    </Box>
  );
};

export default OverviewBoard;
