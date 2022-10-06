import Logo from "../resources/images/elle_logo.png";
import CoverImage from "../resources/images/header.png";
import {AppBar, Box, Divider, Grid, Link, styled, Toolbar} from "@mui/material";
import {Help, Language, Search} from "@mui/icons-material";
import {NavLink} from 'react-router-dom';

const MenuLink = styled(Link)({
  fontWeight: 600,
  fontSize: 16,
  color: "#1B1B1B",
  textDecoration: "none",
  '&:hover': {
    color: "#9C27B0",
    textDecoration: "none",
  },
  '&.active': {
    color: "#9C27B0",
    textDecoration: "none",
  },
});

function Navbar() {

  //Logo
  // Avaleht (home)
  // Tekstihindaja (corrector)
  // Tekstid & tööriistad (tools)
  // Lingikogud (links)
  // Keskkonnast (about)
  //

  return (
    <>
    <AppBar elevation={0} sx={{ position: "static", zIndex: "auto", background: "#FFD0FD", backgroundImage: `url(${CoverImage})`, backgroundSize: "cover", backgroundPosition: "center bottom"}}   >
      <Toolbar>
        <Grid container>
          <Grid item xs={2} sx={{mt:1}}>
            <NavLink to="/">
              <Box
                component="img"
                sx={{ height: 35, mt: 1.5, mb: 2, ml: 3.25 }}
                alt="Logo"
                src={Logo}
              />
            </NavLink>
          </Grid>
          <Grid item xs={10} sx={{mt:1}}>
            <Box display="flex">
              <Search sx={{marginLeft:"auto"}}/>
              <Language sx={{marginLeft:2}}/>
              <Help sx={{marginLeft:2}}/>
            </Box>
          </Grid>
          <Grid container item xs={12} justifyContent="center" sx={{mb:2}}>
            <Box sx={{my:0, mx:4}}>
              <MenuLink to="/corrector" component={NavLink}>
                Tekstihindaja
              </MenuLink>
            </Box>
            <Divider orientation="vertical" sx={{ borderRightWidth: 2, background: "rgba(156,39,176,0.4)", my:.6}} flexItem />
            <Box sx={{my:0, mx:4 }} >
              <MenuLink to="/tools"
                        component={NavLink}>
                Tekstid & tööriistad
              </MenuLink>
            </Box>
            <Divider orientation="vertical" sx={{ borderRightWidth: 2, background: "rgba(156,39,176,0.4)", my:.6}} flexItem />
            <Box sx={{my:0, mx:4 }}>
              <MenuLink to="/links" component={NavLink} >
                Lingikogud
              </MenuLink>
            </Box>
            <Divider orientation="vertical" sx={{ borderRightWidth: 2, background: "rgba(156,39,176,0.4)", my:.6}} flexItem />
            <Box sx={{my:0, mx:4 }}>
              <MenuLink to="/about" component={NavLink}>
                Keskkonnast
              </MenuLink>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
</>
  );
}

export default Navbar;
