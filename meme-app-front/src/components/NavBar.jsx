import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { Stack } from "@mui/material";
import ListItem from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import { searchMemes } from "../api/api";
import { MemesContext, MemesProvider } from "../MemesContext/MemesProvider";
import { useContext } from "react";
import { FilterBar } from "./FilterBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DarkMode } from "@mui/icons-material";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#092138",
    },
  },
});

const Item = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#353333" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(5),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "80%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 2, 2, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));
export const NavBar = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const { isAuthenticated } = useAuth0();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [searchValue, setSearchValue] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { query, setQuery } = useContext(MemesContext);
  const [search, setSearch] = useState("");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const searchFunction = async () => {
    setQuery(search)
 // const searchResult = await searchMemes(query);
  
  };
  if (search.length > 3) setQuery(search);
  console.log(search)

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <>
      <darkTheme></darkTheme>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {isAuthenticated ? (
            <LogoutButton></LogoutButton>
          ) : (
            <LoginButton>Login</LoginButton>
          )}
        </MenuItem>
      </Menu>
    </>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <span
          onClick={() => {
            setQuery("");
            navigate("/");
          }}
        >
          All Memes
        </span>
      </MenuItem>
      <MenuItem>
        <span
          onClick={() => {
            setQuery("search?title=cats");
            navigate("/");
          }}
        >
          Cats
        </span>
      </MenuItem>
      <MenuItem>
        <span
          onClick={() => {
            setQuery("babies");
            navigate("/");
          }}
        >
          Babies
        </span>
      </MenuItem>
      <MenuItem>
        <span
          onClick={() => {
            setQuery("search?title=cars");
            navigate("/");
          }}
        >
          Cars
        </span>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 3 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              My meme App
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon type="submit"></SearchIcon>
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by meme's name..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Stack direction="row" justifyContent="flex-end" spacing={3}>
              <FilterBar></FilterBar>

              <Link to="/upload">
                <Item>Upload</Item>
              </Link>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            {user && <p>Welcome {user?.firstName}</p>}

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
