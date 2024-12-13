import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const loggedOutLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Login", path: "/login" },
  { name: "Signup", path: "/signup" },
];

const loggedInLinks = [{ name: "Dashboard", path: "/dashboard" }];

function ResponsiveAppBar() {
  const { token, login, logout } = React.useContext(AuthContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const links = token ? loggedInLinks : loggedOutLinks;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            MOODIFY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {links.map((link) => (
                <MenuItem key={link.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link to={link.path}>{link.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
              {token && (
                <MenuItem onClick={logout}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOODIFY
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {links.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {link.name}
              </Button>
            ))}
            {token && (
              <Button
                onClick={logout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
            )}
          </Box>
          {token && (
            <Avatar>
              <img
                width={"100%"}
                height={"100%"}
                src={`http://127.0.0.1:5000${token.profileImage}`}
              />
            </Avatar>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
