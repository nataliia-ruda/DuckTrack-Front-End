import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const LandingPagePart3 = ({ instructionsSectionRef }) => {
  const navigate = useNavigate();

  return (
    <Box
      ref={instructionsSectionRef}
      sx={{ width: "100%", py: { xs: 3, md: 8 }, bgcolor: "#f9f9f9" }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { xs: 28, md: 50 },
          textAlign: "center",
          mb: { xs: 2, md: 9 },
          mt: { xs: 7, md: 1 },
          py: { xs: 2, md: 1 },
        }}
      >
        How DuckTrack Works?
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          gap: { xs: 2, md: 4 },
          alignItems: { xs: "center", md: "stretch" },
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            px: { xs: 2, md: 9 },
            py: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, fontSize: { xs: "18px", md: "35px" } }}
          >
            All Your Applications in One Place
          </Typography>

          <List>
            {[
              "Quickly log all application details using a user-friendly form.",
              "View every application in one clean, organized table.",
              "Edit details, update your application status, or delete entries with a single click.",
            ].map((text, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <img
                    src="/duck1.png"
                    alt="duck icon"
                    height="30px"
                    width="30px"
                  />
                </ListItemAvatar>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

          <Button
            onClick={() => navigate("/signin")}
            variant="contained"
            sx={{
              bgcolor: "#141E27",
              width: { xs: "50%", md: "35%" },
              alignSelf: "center",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: { xs: "12px", md: "15px" },
              textTransform: "none",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#001a42e3",
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Start Tracking Now
          </Button>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 2, md: 0 },
            m: 0,
            overflow: "hidden",
          }}
        >
          <img
            src="/lp3_img.png"
            alt="table of applications and form"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              display: "block",
              borderTopLeftRadius: "12px",
              borderBottomLeftRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPagePart3;
