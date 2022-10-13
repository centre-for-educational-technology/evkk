import Logo from "../resources/images/elle_logo.png";
import CoverImage from "../resources/images/header.png";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  styled,
  Toolbar
} from "@mui/material";
import {Close, Help, Language, Menu, Search} from "@mui/icons-material";
import {NavLink} from 'react-router-dom';
import "@fontsource/exo-2/600.css";
import {useState} from "react";

const pages = [
  {title: "Tekstihindaja", target: "/corrector"},
  {title: "Tekstikogud", target: "/tools"},
  {title: "Lingikogud", target: "/links"},
  {title: "Keskkonnast", target: "/about"},
]

const MenuLink = styled(Link)({
  fontWeight: 600,
  fontSize: 16,
  color: "#1B1B1B",
  textDecoration: "none",
  fontFamily: ['Exo-2', 'sans-serif',].join(','),
  '&:hover': {
    color: "#9C27B0",
    textDecoration: "none",
  },
  '&.active': {
    color: "#9C27B0",
    textDecoration: "none",
  },
});

const BurgerLink = styled(Link)({
  fontWeight: 400,
  fontSize: 16,
  color: "#1B1B1B",
  textDecoration: "none",
  fontFamily: ['Exo-2', 'sans-serif',].join(','),
  '&:hover': {
    color: "#1B1B1B",
    textDecoration: "underline",
  },
  '&.active': {
    color: "#1B1B1B",
    textDecoration: "none",
  },
});

function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  }

  return (
    <>
      <AppBar elevation={0}
              sx={{
                position: "static",
                zIndex: "auto",
                background: "#FFD0FD",
                backgroundImage: `url(${CoverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom"
              }}>
        <Toolbar>
          <Grid container>
            <Grid item
                  xs={6}
                  sx={{mt: 1, pl: {xs: 0, sm: 4, md: 6}}}
                  display="flex">
              <IconButton
                onClick={() => toggleDrawer()}
                sx={{mr: 2, mb: 2, display: {md: 'flex', lg: 'none'}}}
              >
                <Menu sx={{color: "black", fontSize: 45}}/>
              </IconButton>
              <NavLink to="/">
                <Box
                  component="img"
                  sx={{height: 35, mt: 1.5, mb: 1.5}}
                  alt="Logo"
                  src={Logo}
                />
              </NavLink>
            </Grid>
            <Grid item
                  xs={6}
                  sx={{mt: 1}}>
              <Box display="flex">
                <Search sx={{marginLeft: "auto"}}/>
                <Language sx={{marginLeft: 2}}/>
                <Help sx={{marginLeft: 2}}/>
              </Box>
            </Grid>
            <Grid container
                  item
                  xs={12}
                  justifyContent="center"
                  sx={{mb: 2, display: {xs: 'none', sm: 'none', md: 'none', lg: 'flex'}}}>
              {pages.map((page, index, elements) => {
                return (
                  <span key={index}>
                  <Box sx={{my: 0, mx: 4}}>
                    <MenuLink to={page.target}
                              component={NavLink}>
                      {page.title}
                    </MenuLink>
                  </Box>
                    {elements[index + 1] &&
                      <Divider
                        orientation="vertical"
                        sx={{borderRightWidth: 2, background: "rgba(156,39,176,0.4)", my: .6}}
                        flexItem
                      />
                    }
                </span>)
              })}
            </Grid>
          </Grid>
        </Toolbar>
        <Drawer
          open={open}
          anchor='left'
          onClose={toggleDrawer}
          PaperProps={{
            sx: {width: {md: "50%", sm: "100%", xs: "100%"}},
          }}
        >
          <Grid container
                sx={{pt: 1.5, px: 4}}>
            <Grid item
                  xs={12}
                  sm={12}>
              <Stack direction="row"
                     justifyContent="space-between">
                <NavLink to="/">
                  <Box
                    component="img"
                    sx={{height: 35, mt: 1.5, mb: 1.5}}
                    alt="Logo"
                    src={Logo}
                  />
                </NavLink>
                <Box>
                  <IconButton
                    onClick={() => toggleDrawer()}
                    sx={{mt: 0}}
                  >
                    <Close sx={{color: "black", fontSize: 45}}/>
                  </IconButton>
                </Box>
              </Stack>
            </Grid>
            <List>
              {pages.map((page, index) => {
                return (
                  <ListItem sx={{pl: 0}}
                            key={index}>
                    <BurgerLink to={page.target}
                                component={NavLink}
                                onClick={toggleDrawer}>
                      {page.title}
                    </BurgerLink>
                  </ListItem>
                )
              })}
            </List>
          </Grid>
        </Drawer>
      </AppBar>
    </>
  );
}

export default Navbar;
