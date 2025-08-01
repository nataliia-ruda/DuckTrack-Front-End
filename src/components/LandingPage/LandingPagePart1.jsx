import AnimatedLogo from "./AnimatedLogo.jsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthContext from "../../core/AuthContext.jsx";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { gsap } from "gsap";

const LandingPagePart1 = () => {
  const imgSrc = "/duck1.png";
  const { user, isLogged, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const totalWidth = slider.scrollWidth / 2;

    const animation = gsap.fromTo(
      slider,
      { x: -totalWidth },
      {
        x: 0,
        duration: 80,
        ease: "linear",
        repeat: -1,
      }
    );

    return () => {
      animation.kill();
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "70%",
            height: "430px",
            backgroundColor: "#FCC708",
            clipPath: `polygon(
                100% 0%,
                80% 10%,
                60% 20%,
                30% 35%,
                0% 50%,
                0% 0%
              )`,
            zIndex: -1,
          }}
        />

        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              sx={{
                color: "#001A42",
                fontSize: "1em",
                px: 3,
                py: 1,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "blur",
                  transform: "translateY(-2px)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  borderColor: "#ffdb4d",
                },
              }}
            >
              About
            </Button>
            <Button
              sx={{
                color: "#001A42",
                fontSize: "1em",
                px: 3,
                py: 1,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "blur",
                  transform: "translateY(-2px)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  borderColor: "#ffdb4d",
                },
              }}
            >
              Features
            </Button>
            <Button
              sx={{
                color: "#001A42",
                fontSize: "1em",
                px: 3,
                py: 1,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "blur",
                  transform: "translateY(-2px)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  borderColor: "#ffdb4d",
                },
              }}
            >
              Contact
            </Button>
          </Box>

          {isLogged ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Menu">
                  <IconButton
                    sx={{
                      display: "flex",
                      gap: 1,
                      transition: "box-shadow 0.2s ease",
                      px: 4,
                      py: 1.5,
                      borderRadius: "999px",
                      "&:hover": {
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        backgroundColor: "transparent",
                      },
                    }}
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Typography sx={{ color: "#001A42", fontWeight: 600 }}>
                      Hi, {user.user_first_name}
                    </Typography>
                    <AccountCircleIcon
                      sx={{ width: 32, height: 32, color: "#001A42" }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/home");
                  }}
                >
                  <ListItemIcon>
                    <DashboardRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>

                <MenuItem
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/my-applications");
                  }}
                >
                  <ListItemIcon>
                    <StorageOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  My Applications
                </MenuItem>

                <MenuItem
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/my-interviews");
                  }}
                >
                  <ListItemIcon>
                    <PermContactCalendarIcon fontSize="small" />
                  </ListItemIcon>
                  Interviews
                </MenuItem>

                <MenuItem
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/statitics");
                  }}
                >
                  <ListItemIcon>
                    <BarChartOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Analytics
                </MenuItem>

                <Divider />

                <MenuItem
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/update-profile/{user.user_id}");
                  }}
                >
                  <ListItemIcon>
                    <ManageAccountsIcon fontSize="small" />
                  </ListItemIcon>
                  Profile Settings
                </MenuItem>

                <MenuItem
                  onClick={(event) => {
                    event.preventDefault();
                    logout();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Log out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/signin");
                }}
                variant="outlined"
                sx={{
                  borderColor: "#001A42",
                  color: "#001A42",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    color: "#001A42",
                    borderColor: "#001A42",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                Sign in
              </Button>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/signup");
                }}
                variant="contained"
                sx={{
                  bgcolor: "#001A42",
                  color: "white",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#001a42e3",
                    color: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                Sign up
              </Button>
            </Box>
          )}
        </Toolbar>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <AnimatedLogo />
          <Typography
            variant="h3"
            sx={{
              color: "#001A42",
              fontWeight: 800,
              mt: 4,
            }}
          >
            Never Lose Track of Your Dream Job
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#4F6073",
              mt: 2,
              maxWidth: 500,
            }}
          >
            Organize, track, and stay motivated on your job hunt — all in one
            place.
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowDownwardIcon />}
            sx={{
              mt: 4,
              bgcolor: "#FCC708",
              color: "#001A42",
              px: 4,
              py: 1.5,
              borderRadius: "999px",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#ffdb4d",
                transform: "translateY(-2px)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Discover More
          </Button>
        </Box>
      </Box>

      <Box
        ref={containerRef}
        sx={{
          overflow: "hidden",
          width: "100%",
          position: "relative",
          height: "200px",
          backgroundColor: "#fff",
          background: "blur",
        }}
      >
        <Box
          ref={sliderRef}
          sx={{
            /* border: "2px solid black", */
            backgroundImage: `linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.6) 0%,
          rgba(255, 255, 255, 0.6) 60%,
          rgba(214, 236, 255, 0.6) 70%,
          rgba(153, 204, 255, 0.6) 80%,
          rgba(77, 166, 255, 0.6) 90%,
          rgba(26, 95, 180, 0.6) 100%
        )`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            gap: 8,
            width: "max-content",
          }}
        >
          {[...Array(2)].flatMap((_, groupIndex) =>
            [...Array(40)].map((_, i) => (
              <img
                key={`${groupIndex}-${i}`}
                src={imgSrc}
                alt={`scrolling-duck-${groupIndex}-${i}`}
                style={{
                  width: "4vw",
                  flexShrink: 0,
                }}
              />
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default LandingPagePart1;
