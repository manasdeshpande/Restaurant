"use client";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/auth.js";
import { useRouter } from 'next/navigation'

const drawerWidth = 240;
const navItems = [
  { label: "Home", link: "/" },
  { label: "Reserve", link: "/table" },
  { label: "Menu", link: "/menu" },
];

function Nav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getNavLinks = () => {
    if (auth.user) {
      // If the user is logged in
      return (
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {navItems.map((item) => (
            <Link href={item.link} key={item.label} passHref>
              <Button sx={{ color: "#fff" }} className="text-2xl font-navlinks italic mt-5 lg:mr-16 capitalize">
                {item.label}
              </Button>
            </Link>
          ))}
          {auth.user.role === 1 ? (
            <>
              <Link href="./dashboard" passHref>
                <Button color="inherit" className="text-2xl font-navlinks italic mt-5 lg:mt-2 lg:mr-12 capitalize">
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="./profile" passHref>
                <Button color="inherit" className="text-2xl font-navlinks italic mt-5 mr-12 capitalize">
                  Profile
                </Button>
              </Link>
            </>
          )}
          <Button
            color="inherit"
            onClick={handleSignButtonClick}
            className="text-2xl italic font-navlinks mt-5 lg:mr-12 capitalize"
          >
            {getSignButtonText()}
          </Button>
        </Box>
      );
    } else {
      // If the user is logged out
      return (
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {navItems.map((item) => (
            <Link href={item.link} key={item.label} passHref>
              <Button sx={{ color: "#fff" }} className="text-3xl font-navlinks italic mr-16 mt-5 capitalize">
                {item.label}
              </Button>
            </Link>
          ))}
          <Link href="/profile/login" passHref>
            <Button color="inherit" className="text-3xl font-navlinks italic mt-5 mr-12 capitalize">
              Sign In
            </Button>
          </Link>
        </Box>
      );
    }
  };

  const handleSignButtonClick = () => {
    if (auth.user) {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      router.push('/profile/login')
    }
  };

  const getSignButtonText = () => {
    return auth.user ? "Sign Out" : "Sign In";
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Typography className="font-title text-2xl" variant="h6" sx={{ my: 2 }}>
        Elysium
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link href={item.link} key={item.label} passHref>
            <ListItemButton>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      {auth.user ? (
        <>
        <Link href='./profile/login' passHref>
          <Button
            color="inherit"
            className="bg-slate-800 text-white mt-3 hover:bg-slate-800"
            onClick={handleSignButtonClick}
          >
            Sign Out
          </Button>
          </Link>
          {auth.user.role === 1 ? (
            <Link href="./dashboard" passHref className="text-2xl">
              <Button
                color="inherit"
                className="bg-slate-800 mt-3 text-white hover:bg-slate-800"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="./profile" passHref>
              <Button
                color="inherit"
                className="bg-slate-800 text-white hover:bg-slate-800"
              >
                Profile
              </Button>
            </Link>
          )}
        </>
      ) : (
        <Link href="/profile/login" passHref>
          <Button
            color="inherit"
            className="bg-slate-800 text-white hover:bg-slate-800"
          >
            Sign In
          </Button>
        </Link>
      )}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "block", sm: "block" } }}
            className="font-title font-medium sm:text-4xl lg:text-6xl select-none mt-3"
          >
            <Link href='/' passHref>Elysium</Link>
            
          </Typography>
          {getNavLinks()}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              "& svg": {
                fontSize: "2.5rem", // Adjust the font size to increase the icon size
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block",md:"block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Nav.propTypes = {
  window: PropTypes.func,
};

export default Nav;

/*
<div className="flex flex-col justify-center items-center px-6">
  <h1 className="text-white text-4xl md:text-6xl mb-4 font-semibold font-title">Elysium</h1>
  <div className="flex items-center justify-center">  <p className="text-white text-lg md:text-xl text-center font-semibold">
    Where culinary artistry meets elegance. Immerse yourself in a world of gastronomic delight as we tantalize your taste buds with our exceptional five-star dining experience.
  </p></div>

</div>
*/
