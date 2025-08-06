import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const LandingPagePart5 = () => { 
  
  const navigate = useNavigate(); 

  return (
    <Box sx={{ width: "100%", py: 8, bgcolor: "#f9f9f9" }}>


      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "stretch",
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
          <Typography variant="h4" sx={{ fontWeight: 800, fontSize: "35px" }}>
            Interview Reminders
          </Typography>

          <List>
            {[
              "Log your upcoming interviews with time, date, and location or link.",
              "Receive timely email reminders before each interview.",
              "Stay prepared and reduce last-minute stress.",
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
              width: "35%",
              alignSelf: "center",
              px: 4,
              py: 1.5,
              fontWeight: 600,
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
            Create Account
          </Button>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: 0,
            m: 0,
            overflow: "hidden",
          }}
        >
          <img
            src="/lp5_img.png"
            alt="table of applications and form"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              display: "block",
              borderTopLeftRadius: "12px",
              borderBottomLeftRadius: "12px",
              boxShadow: 5,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPagePart5;
