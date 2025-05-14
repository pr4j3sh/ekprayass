import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EventIcon from "@mui/icons-material/Event";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FeedIcon from "@mui/icons-material/Feed";
import SchoolIcon from "@mui/icons-material/School";
import ImageIcon from "@mui/icons-material/Image";
import InfoIcon from "@mui/icons-material/Info";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { getUser, reset } from "../features/user/userSlice";
import { logout } from "../features/auth/authSlice";

const drawerWidth = 240;

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [id, dispatch]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElLib, setAnchorElLib] = useState(null);
  const [anchorElKnow, setAnchorElKnow] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openLib = Boolean(anchorElLib);
  const openKnow = Boolean(anchorElKnow);
  const openUser = Boolean(anchorElUser);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLibMenu = (event) => {
    setAnchorElLib(event.currentTarget);
  };
  const handleKnowMenu = (event) => {
    setAnchorElKnow(event.currentTarget);
  };
  const handleUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLibClose = () => {
    setAnchorElLib(null);
  };
  const handleKnowClose = () => {
    setAnchorElKnow(null);
  };
  const handleUserClose = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(reset());
    handleUserClose();
    navigate("/");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to="/"
          sx={{ color: "#000", textDecoration: "none" }}
        >
          Ek Prayass
        </Link>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/events"}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={"Events"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/marshals"}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Marshals"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/courses"}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={"Courses"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/blogs"}>
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary={"Blogs"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/videos"}>
            <ListItemIcon>
              <OndemandVideoIcon />
            </ListItemIcon>
            <ListItemText primary={"Videos"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/posters"}>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary={"Posters"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/know/about"}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"About Us"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/know/contact"}>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary={"Contact Us"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={"/donate"}>
            <ListItemIcon>
              <VolunteerActivismIcon />
            </ListItemIcon>
            <ListItemText primary={"Donate"} />
          </ListItemButton>
        </ListItem>
        {isLoading ? (
          <CircularProgress size={24} />
        ) : user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to={"/dashboard"}>
                <ListItemIcon>
                  <Avatar
                    src={`${process.env.REACT_APP_AVATAR_URL}${user?.avatar}`}
                    alt={user?.firstName}
                  />
                </ListItemIcon>
                <ListItemText primary={"My Account"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to={"/auth/login"}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to={"/auth/register"}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"Register"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#fff" }}
          >
            <Link
              component={RouterLink}
              to="/"
              sx={{ color: "#fff", textDecoration: "none" }}
            >
              Ek Prayass
            </Link>
          </Typography>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Button component={RouterLink} to="/events" sx={{ color: "#fff" }}>
              Events
            </Button>
            <Button
              component={RouterLink}
              to="/marshals"
              sx={{ color: "#fff" }}
            >
              Marshals
            </Button>
            <Button
              //   component={RouterLink} to="/events"
              sx={{ color: "#fff" }}
              onClick={handleLibMenu}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Library
            </Button>
            <Button
              //   component={RouterLink} to="/events"
              sx={{ color: "#fff" }}
              onClick={handleKnowMenu}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Know More
            </Button>
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : user ? (
              <>
                <Button
                  //   component={RouterLink} to="/events"
                  sx={{ color: "#fff" }}
                  onClick={handleUserMenu}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  <Avatar
                    src={`${process.env.REACT_APP_AVATAR_URL}${user?.avatar}`}
                    alt={user?.firstName}
                  />
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/auth/login"
                  variant="contained"
                  endIcon={<LoginIcon />}
                  //   sx={{ color: "#fff" }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/auth/register"
                  variant="contained"
                  endIcon={<AccountCircleIcon />}
                  //   sx={{ color: "#fff" }}
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
          <Menu
            id="libary-menu"
            anchorEl={anchorElLib}
            open={openLib}
            onClose={handleLibClose}
          >
            <MenuItem>
              <Link
                sx={{ color: "#000", textDecoration: "none" }}
                component={RouterLink}
                to="/courses"
              >
                Courses
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                sx={{ color: "#000", textDecoration: "none" }}
                component={RouterLink}
                to="/blogs"
              >
                Blogs
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                sx={{ color: "#000", textDecoration: "none" }}
                component={RouterLink}
                to="/videos"
              >
                Videos
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                sx={{ color: "#000", textDecoration: "none" }}
                component={RouterLink}
                to="/posters"
              >
                Posters
              </Link>
            </MenuItem>
          </Menu>
          <Menu
            id="know-menu"
            anchorEl={anchorElKnow}
            open={openKnow}
            onClose={handleKnowClose}
          >
            <MenuItem>
              <Link
                sx={{ color: "#000", textDecoration: "none" }}
                component={RouterLink}
                to="/know/about"
              >
                About Us
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                sx={{ color: "#000", textDecoration: "none" }}
                component={RouterLink}
                to="/know/contact"
              >
                Contact Us
              </Link>
            </MenuItem>
          </Menu>
          <Menu
            id="user-menu"
            anchorEl={anchorElUser}
            open={openUser}
            onClose={handleUserClose}
          >
            <MenuItem>
              <Link
                sx={{ color: "#000", textDecoration: "none" }}
                component={RouterLink}
                to="/dashboard"
              >
                My Account
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Link
                sx={{ color: "#000", textDecoration: "none" }}
                component={RouterLink}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
