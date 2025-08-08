import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../core/AuthContext.jsx";
import { useContext } from "react";

const LandingPagePart4 = () => {
  const navigate = useNavigate();
  const { isLogged } = useContext(AuthContext);
  const handleClick = () => navigate(isLogged ? "/home" : "/signin");
  return (
    <Box sx={{ width: "100vw", py: { xs: 3, md: 8 }, bgcolor: "#f9f9f9" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row-reverse" },
          alignItems: { xs: "center", md: "stretch" },
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
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
            Job Search Progress Visualization
          </Typography>

          <List>
            {[
              "Track your personal application trends with daily progress charts.",
              "Identify the most effective job search platforms.",
              "Monitor your response rate to stay motivated and informed.",
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
            onClick={handleClick}
            sx={{
              bgcolor: "#ffdb4d",
              width: { xs: "50%", md: "35%" },
              alignSelf: "center",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: { xs: "12px", md: "15px" },
              textTransform: "none",
              borderRadius: "8px",
              color: "#141E27",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#ffdb4d",
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Try It Now
          </Button>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            p: { xs: 4, md: 4 },
            m: 0,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/lp4_img.png"
            alt="table of applications and form"
            sx={{
              width: { xs: "100%", md: "85%" },
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

export default LandingPagePart4;
