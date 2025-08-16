import { useEffect, useState, useContext } from "react";
import { Line, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import AuthContext from "../core/AuthContext";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState("currentMonth");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!user) return;

    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/my-applications?user_id=${user.user_id}`
        );
        if (!response.ok) throw new Error("Failed to fetch applications");

        const data = await response.json();
        setApplications(data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (loading) return <Backdrop
        open={true}
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>;
  if (!applications.length) return <Box  sx={{width: "100%"}} > <Typography variant="h6"  sx={{fontSize:{xs: 12, md: 18}, color: "text.secondary",}}> Get started by registering an application to unlock your analytics. </Typography> </Box>;

  let dateLabels = [];
  let applicationsPerDay = [];

  if (filterMode === "currentMonth") {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    applicationsPerDay = Array(daysInMonth).fill(0);

    applications.forEach((app) => {
      const appDate = new Date(app.created_at);
      if (
        appDate.getFullYear() === currentYear &&
        appDate.getMonth() === currentMonth
      ) {
        const dayIndex = appDate.getDate() - 1;
        applicationsPerDay[dayIndex] += 1;
      }
    });

    dateLabels = Array.from({ length: daysInMonth }, (_, i) =>
      (i + 1).toString()
    );
  } else {
    const sortedDates = applications
      .map((app) => new Date(app.created_at))
      .sort((a, b) => a - b);

    const firstDate = sortedDates[0];
    const today = new Date();

    const dateArray = [];
    let current = new Date(firstDate);

    while (current <= today) {
      dateArray.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    const groupedByDate = {};

    applications.forEach((app) => {
      const dateKey = new Date(app.created_at).toISOString().split("T")[0];
      groupedByDate[dateKey] = (groupedByDate[dateKey] || 0) + 1;
    });

    dateLabels = dateArray;
    applicationsPerDay = dateArray.map((date) => groupedByDate[date] || 0);
  }

  const applicationsByStatus = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const statusLabels = Object.keys(applicationsByStatus);
  const statusCounts = statusLabels.map(
    (status) => applicationsByStatus[status]
  );

  const statusColors = {
    applied: "#FFC107",
    interviewing: "#C8E6C9",
    offer: "#4CAF50",
    rejected: "#E53935",
    ghosted: "#1E88E5",
    withdrawn: "#9E9E9E",
  };

  const doughnutColors = statusLabels.map(
    (status) => statusColors[status] || "#4BC0C0"
  );

  const knownSources = [
    "StepStone",
    "Indeed",
    "LinkedIn",
    "Xing",
    "Arbeitsagentur",
    "Monster",
    "Corporate website",
  ];

  const applicationsBySource = applications.reduce((acc, app) => {
    let normalizedSource = (app.source || "").trim();
    if (!knownSources.includes(normalizedSource)) {
      normalizedSource = "Other";
    }
    acc[normalizedSource] = (acc[normalizedSource] || 0) + 1;
    return acc;
  }, {});

  const sourceLabels = Object.keys(applicationsBySource);
  const sourceCounts = sourceLabels.map(
    (source) => applicationsBySource[source]
  );

  const sourceColors = {
    StepStone: "hsla(182, 47%, 74%, 1)",
    Indeed: "#003A9B",
    LinkedIn: "#2767B2",
    Xing: "#00796B",
    Arbeitsagentur: "#EC252C",
    Monster: "#7A4EC0",
    "Corporate website": "#9966FF",
    Other: "#FF9F40",
  };

  const pieColors = sourceLabels.map(
    (source) => sourceColors[source] || "black"
  );

  return (
    <>
      <Box sx={{ my: 1, pb: {xs: 4, md: 0}, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              height: "300px",
              py: 1.5,
              px: { xs: 0, md: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mb: 1,
                fontSize: { xs: 11, md: 16 },
              }}
            >
              <h3 style={{ textAlign: "center", marginRight: "20px" }}>
                Application Activity Graph
              </h3>
              <button
                onClick={() => setFilterMode("currentMonth")}
                style={{
                  fontSize: isSmallScreen ? 10 : 13,
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor:
                    filterMode === "currentMonth" ? "#4BC0C0" : "#fff",
                  color: filterMode === "currentMonth" ? "#fff" : "#333",
                  cursor: "pointer",
                }}
              >
                Current Month
              </button>
              <button
                onClick={() => setFilterMode("allTime")}
                style={{
                  fontSize: isSmallScreen ? 10 : 13,
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor:
                    filterMode === "allTime" ? "#4BC0C0" : "#fff",
                  color: filterMode === "allTime" ? "#fff" : "#333",
                  cursor: "pointer",
                }}
              >
                All Time
              </button>
            </Box>
            <Line
              data={{
                labels: dateLabels,
                datasets: [
                  {
                    label: "- applications per day",
                    data: applicationsPerDay,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: true,
                    tension: 0.3,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: {
                      autoSkip: false,
                      callback: function (val, index, ticks) {
                        if (filterMode === "allTime") {
                          if (index === 0 || index === ticks.length - 1) {
                            return this.getLabelForValue(val);
                          }
                          return "";
                        }
                        return this.getLabelForValue(val);
                      },
                      maxRotation: 0,
                      minRotation: 0,
                      font: {
                        size: window.innerWidth < 900 ? 8 : 12,
                      },
                    },
                  },
                  y: {
                    beginAtZero: true,
                    max: 10,
                    font: {
                      size: window.innerWidth < 900 ? 8 : 12,
                    },
                  },
                },
              }}
            />
          </Box>
          <Box
            sx={{
              width: "25%",
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "flex-end",
              height: "300px",
            }}
          >
            <img
              src="/duck_ analytics.png"
              alt="duck holding a pointer"
              style={{
                height: "70%",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: 3,
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              fontSize: { xs: 12, md: 16 },
              height: isSmallScreen ? "270px" : "320px",
              borderRadius: "10px",
              boxShadow:
                "0px 4px 10px rgba(0, 0, 0, 0.05), 0px 2px 6px rgba(0, 0, 0, 0.03)",
              p: 1,
            }}
          >
            <h3 style={{ textAlign: "center" }}>Application Status Report</h3>
            <Doughnut
              data={{
                labels: statusLabels,
                datasets: [
                  {
                    label: " ",
                    data: statusCounts,
                    backgroundColor: doughnutColors,
                    borderWidth: 1,
                    radius: isSmallScreen ? "65%" : "80%",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              fontSize: { xs: 12, md: 16 },
              height: isSmallScreen ? "270px" : "320px",
              borderRadius: "10px",
              boxShadow:
                "0px 4px 10px rgba(0, 0, 0, 0.05), 0px 2px 6px rgba(0, 0, 0, 0.03)",
              py: 1,
            }}
          >
            <h3 style={{ textAlign: "center" }}>Career Platforms Report</h3>
            <Pie
              data={{
                labels: sourceLabels,
                datasets: [
                  {
                    label: " ",
                    data: sourceCounts,
                    backgroundColor: pieColors,
                    borderWidth: 1,
                    radius: isSmallScreen ? "75%" : "80%",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Charts;
