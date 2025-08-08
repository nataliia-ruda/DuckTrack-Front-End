import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import WorkIcon from "@mui/icons-material/Work";

const benefits = [
  {
    title: "Efficient Application Management",
    icon: <WorkIcon sx={{ color: "#A1887F", fontSize: "30px" }} />,
    bgColor: "#EFEBE9",
    points: [
      "Keep all applications organized in one place",
      "Save important details to review before interviews",
      "Add personal notes and reminders",
    ],
  },
  {
    title: "Personal Job Search Analytics",
    icon: <BarChartIcon sx={{ color: "#EF5350", fontSize: "30px" }} />,
    bgColor: "#FDECEA",
    points: [
      "Visualize your application activity",
      "Track response rates",
      "Get insights on platforms and roles",
    ],
  },
  {
    title: "Interview Scheduling",
    icon: <CalendarMonthIcon sx={{ color: "#2196F3", fontSize: "30px" }} />,
    bgColor: "#E3F2FD",
    points: [
      "Plan and track upcoming interviews",
      "Never miss important dates",
      "Stay prepared and confident",
    ],
  },
  {
    title: "Simple & Stress-Free",
    icon: <LocalFloristIcon sx={{ color: "#4CAF50", fontSize: "30px" }} />,
    bgColor: "#E8F5E9",
    points: [
      "Intuitive and easy to use",
      "Makes job searching more fun and motivating",
      "Reduce stress and feel in control",
    ],
  },
];

const LandingPagePart2 = ({ featuresSectionRef }) => {
  return (
    <Box
      ref={featuresSectionRef}
      sx={{
        px: 4,
        pt: { xs: 3, md: 6 },
        pb: { xs: 4, md: 6 },
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          fontWeight: 800,
          color: "#001A42",
          mb: 7,
          fontSize: { xs: 28, md: 50 },
        }}
      >
        Why You’ll Love DuckTrack
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          mt: 4,
        }}
      >
        {benefits.map((benefit, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "100%", md: "40%" },
              boxSizing: "border-box",
              borderRadius: "16px",
              py: { xs: 5, md: 6 },
              px: { xs: 4.5, md: 2 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              boxShadow:
                "0px 4px 10px rgba(0, 0, 0, 0.05), 0px 4px 6px rgba(0, 0, 0, 0.03)",
              textAlign: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            <Box
              sx={{
                height: 60,
                width: 60,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: benefit.bgColor,
              }}
            >
              {benefit.icon}
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#001A42",
                mt: 1,
                fontSize: { xs: "16px", md: "20px" },
              }}
            >
              {benefit.title}
            </Typography>

            <Box
              component="ul"
              sx={{
                pl: 2,
                m: 0,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {benefit.points.map((point, i) => (
                <li key={i}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "14px", md: "16px" } }}
                  >
                    {point}
                  </Typography>
                </li>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LandingPagePart2;
