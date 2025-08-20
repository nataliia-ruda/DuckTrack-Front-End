import NewApplicationForm from "./NewApplicationForm.jsx";
import SideNavigation, { DrawerHeader } from "./SideNavigation.jsx";
import Box from "@mui/material/Box";

const NewApplicationPage = () => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <SideNavigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "auto",
          width: "100%",
          position: "static",
        }}
      >
        <DrawerHeader />
        <NewApplicationForm />
      </Box>
    </Box>
  );
};

export default NewApplicationPage;
