import { useState } from "react";
import SideNavigation, { DrawerHeader } from "./SideNavigation.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MyApplicationsTable from "./MyApplicationsTable.jsx";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    boxShadow: "0px 0px 8px rgba(0,0,0,0.3)",
  },
  "&:focus-within": {
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.6)",
    border: "1px solid rgba(0, 123, 255, 0.7)",
  },
  transition: "all 0.3s ease-in-out",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create(["width", "border"], {
      duration: theme.transitions.duration.shortest,
    }),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const MyApplicationsPage = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <SideNavigation />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: 18, md: 24 }, mb: { xs: 2, md: 0 } }}
          >
            My Applications
          </Typography>
          <Search sx={{ width: { xs: "70%", md: "auto" } }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: { xs: 17, md: 23 } }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: 12, md: 16 },
                },
              }}
            />
          </Search>
        </Box>

        <MyApplicationsTable searchInput={searchInput} />
      </Box>
    </Box>
  );
};

export default MyApplicationsPage;
