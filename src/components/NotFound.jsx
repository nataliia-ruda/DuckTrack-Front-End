import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: {xs:"flex-start", md: "center"},
        textAlign: "center",
        gap: 3,
        pt: {xs: 15, md: 0}
      }}
    >
     
        <Box component="img" src="/duck_404.png" alt="duck with a banner 404" sx={{width: {xs: "40%", md: "20%"}}}>
        </Box>
    
      <Typography variant="h6" sx={{fontSize: {xs: 14, md: 20}}}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{bgcolor: "#001A42", width:  {xs: "25%", sm: "25%", md: "10%"}, fontSize: {xs: 11, md: 14}}}>
        GO BACK
      </Button>
    </Box>
  );
}