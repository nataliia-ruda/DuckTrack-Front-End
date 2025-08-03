import { useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AuthContext from "../core/AuthContext";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const SideNavigation = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const icons = {
    0: <DashboardRoundedIcon />,
    1: <StorageOutlinedIcon />,
    2: <PermContactCalendarIcon/>,
    3: <BarChartOutlinedIcon />,
    4: <ManageAccountsIcon/>,
    5: <LogoutOutlinedIcon />,
  };
  const navigate = useNavigate();

  const handleAddApplication = () => {
    navigate("/new-application");
  };

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigation = (text) => {
    const routes = {
      Overview: "/home",
      "My Applications": "/my-applications",
      Interviews : "/my-interviews",
      Analytics: "/statitics",
      "Profile Settings" : `/update-profile/${user.user_id}`
    };

    if (text === "Log out") {
      handleLogout();
    } else {
      navigate(routes[text]);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          
          sx={{
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            backdropFilter: "blur(6px)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            color: "#E0E0E0",
            borderBottom: "2px solid white",
            width: "100vw", 
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              borderRight: "2px solid white",
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component="img"
            src="/duck_track_white.png"
            alt=""
            sx={{ height: "24px" }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <Button
            onClick={handleAddApplication}
            sx={{ color: "black", backgroundColor: "#FFC107", mx: 1 }}
          >
            <AddIcon sx={{ mx: 0.5, fontSize: "14px" }} />

            <Typography variant="p" sx={{ fontSize: "12px", fontWeight: 500 }}>
              Add New Application
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#141E27",
            color: "#E0E0E0",
            borderRight: "2px solid white",
          },
        }}
      >
        <DrawerHeader>
          <IconButton sx={{ color: "white" }} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
  {open && (
    <ListItem disablePadding sx={{ display: "block", mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          gap: 0.5,
          alignItems: "center",
          minHeight: 48,
          px: 2.5,
          color: "white",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
            color: "white",
          }}
        >
          <Avatar
            alt="duck avatar"
            src={
              user.gender === "female"
                ? "/FemaleAv.png"
                : user.gender === "male"
                ? "/MaleAv.png"
                : "/OtherAv.png"
            }
            sx={{
              border: "2px solid black",
              width: 50,
              height: 50,
              bgcolor: "white",
            }}
          />
        </ListItemIcon>
        <ListItemText>
          &nbsp;{user.user_first_name} {user.user_last_name}
        </ListItemText>
      </Box>
    </ListItem>
  )}
</List>

        <Divider sx={{ color: "white" }} />

        <List>
          {["Overview", "My Applications", "Interviews", "Analytics", "Profile Settings", "Log out"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block", mb: 2 }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    color: "white",
                    justifyContent: open ? "initial" : "center",
                  }}
                  onClick={() => handleNavigation(text)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      color: "white",
                      mr: open ? 3 : "auto",
                    }}
                  >
                    {icons[index]}
                  </ListItemIcon>
                  {open && <ListItemText primary={text} />}
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </>
  );
};

export default SideNavigation;
