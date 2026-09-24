import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useNavigate } from "react-router-dom";

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f9f9f9",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: { xs: "80%", md: "70%" },
          height: { xs: "200px", md: "430px" },
          backgroundColor: "#FCC708",
          clipPath: {
            xs: `polygon(
        50% 0%,
        55% 0%,
        0% 40%,
        0% 0%
      )`,
            md: `polygon(
        100% 0%,
        80% 10%,
        60% 20%,
        30% 35%,
        0% 50%,
        0% 0%
      )`,
          },
          zIndex: 1,
        }}
      />

      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 6 },
          py: 2,
          width: "100%",
          maxWidth: "1440px",
          mx: "auto",
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        <Button
          onClick={() => navigate("/")}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#001A42",
            fontSize: { xs: "0.85rem", md: "1em" },
            px: 3,
            py: 1,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Back to home
        </Button>

        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
            color: "#001A42",
            fontWeight: 800,
            fontSize: { xs: 22, md: 28 },
          }}
        >
          <Box
            component="img"
            src="/d_logo.png"
            alt="DuckTrack logo"
            sx={{ height: "0.9em" }}
          />
          uckTrack
        </Box>
      </Toolbar>

      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          pb: { xs: 3, md: 6 },
          boxSizing: "border-box",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 3, md: 8 },
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: 1 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1.5, md: 2.5 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 28, md: 50 },
              color: "#001A42",
            }}
          >
            About us
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", md: "1.05rem" },
              lineHeight: 1.7,
              color: "#4F6073",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
            <br />
            <br />
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: { xs: "1 1 0", md: 1 },
            minHeight: 0,
            width: "100%",
            height: { xs: "auto", md: "70%" },
            maxHeight: { md: 460 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            bgcolor: "#ffffff",
            border: "2px dashed rgba(0, 26, 66, 0.25)",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
            color: "#4F6073",
          }}
        >
          <ImageOutlinedIcon sx={{ fontSize: { xs: 40, md: 64 } }} />
          <Typography sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
            Picture placeholder
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUsPage;
