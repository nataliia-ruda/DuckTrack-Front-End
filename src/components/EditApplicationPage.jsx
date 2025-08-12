import SideNavigation, { DrawerHeader } from "./SideNavigation.jsx";
import Box from "@mui/material/Box";
import EditApplicationTable from "./EditApplicationTable.jsx";

const EditApplicationPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideNavigation />

      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "auto" }}>
        <DrawerHeader />

        <EditApplicationTable />
      </Box>
    </Box>
  );
};

export default EditApplicationPage;
