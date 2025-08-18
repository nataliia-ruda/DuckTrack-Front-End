import { useEffect, useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AuthContext from "../core/AuthContext";

export default function AccountDeleted() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout?.();
  }, [logout]);

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
        src="/duck_delete.png"
        alt="duck with suitcases"
        sx={{ width: "20%" }}
      ></Box>
      <Typography variant="h5" sx={{ fontSize: { xs: 17, md: 24 } }}>
        Your account has been deleted.
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontSize: { xs: 12, md: 16 } }}
      >
        We’ll be here whenever you’re ready for your next career challenge.
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontSize: { xs: 12, md: 16 } }}
      >
        Until then, wishing you all the success ahead!
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
