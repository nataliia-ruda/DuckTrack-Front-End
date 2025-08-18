import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function DeleteLinkInvalid() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "flex-start", md: "center" },
        textAlign: "center",
        gap: 2,
        flexDirection: "column",
        pt: { xs: 10, md: 0 },
      }}
    >
      <Box
        component="img"
        src="/duck_something_went_wrong.png"
        alt="duck with suitcases"
        sx={{ width: "20%" }}
      ></Box>
      <Typography variant="h5" sx={{ fontSize: { xs: 17, md: 24 } }}>
        This deletion link is invalid or expired.
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontSize: { xs: 12, md: 16 } }}
      >
        You can request a new email from your profile page.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ bgcolor: "#001A42", fontSize: { xs: 10, md: 13 }, my: 1 }}
      >
        Back to Main Page
      </Button>
    </Box>
  );
}
