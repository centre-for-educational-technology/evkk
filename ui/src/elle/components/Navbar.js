import Logo from '../resources/images/header/elle_logo.png';
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
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar
} from '@mui/material';
import {Close, Language, Menu as MenuIcon} from '@mui/icons-material';
import {NavLink, useLocation} from 'react-router-dom';
import '@fontsource/exo-2/600.css';
import React, {useEffect, useState} from 'react';
import './styles/Navbar.css';
import i18n from 'i18next';
import {useTranslation} from 'react-i18next';

const pages = [
  {id: 1, title: 'common_corrector', target: '/corrector'},
  {id: 2, title: 'common_tools', target: '/tools'},
  {id: 3, title: 'common_links', target: '/links'},
  {id: 4, title: 'common_about', target: '/about'}
];

const MenuLink = styled(Link)({
  fontWeight: 600,
  fontSize: 16,
  color: '#1B1B1B',
  textDecoration: 'none',
  fontFamily: ['Exo 2', 'sans-serif'].join(','),
  '&:hover': {
    color: '#9C27B0',
    textDecoration: 'none'
  },
  '&.active': {
    color: '#9C27B0',
    textDecoration: 'none'
  }
});

const BurgerLink = styled(Link)({
  fontWeight: 400,
  fontSize: 16,
  color: '#1B1B1B',
  textDecoration: 'none',
  fontFamily: ['Exo 2', 'sans-serif'].join(','),
  '&:hover': {
    color: '#1B1B1B',
    textDecoration: 'underline'
  },
  '&.active': {
    color: '#1B1B1B',
    textDecoration: 'none'
  }
});

function Navbar() {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const [navColor, setNavColor] = useState("sticking");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [langAnchorEl, setLangAnchorEl] = useState(false);
  const langOpen = Boolean(langAnchorEl);
  const location = useLocation();
  const handleLangClick = (event) => {
    setLangAnchorEl(event.currentTarget);
  };
  const handleLangClose = () => {
    setLangAnchorEl(false);
  };
  const handleLangSelect = (lang) => {
    i18n.changeLanguage(lang).then(r => r);
    localStorage.setItem('language', lang);
    if (location.pathname === '/tools/wordanalyser') {
      window.location.reload();
    }
    setLangAnchorEl(false);
  };

  const handleScroll = () => {
    const position = window.scrollY;
    if (position > 20) {
      setNavColor("not-sticking")
    } else if (position <= 20) {
      setNavColor("sticking")
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar elevation={0}
              sx={{
                position: "sticky",
                top: 0,
              }}
              className={navColor}
      >
        <Toolbar>
          <Grid container>
            <Grid item
                  xs={3}
                  sx={{pl: {xs: 0, sm: 4, md: 6}}}
                  display="flex"
                  alignItems="center"
            >
              <IconButton
                onClick={() => toggleDrawer()}
                sx={{mr: 2, mb: 2, display: {md: 'flex', lg: 'none'}}}
              >
                <MenuIcon sx={{color: 'black', fontSize: 45}}/>
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
            <Grid
              item
              xs={6}
              justifyContent="center"
              alignItems="center"
              sx={{display: {xs: 'none', sm: 'none', md: 'none', lg: 'flex'}}}
            >
              {pages.map((page, index, elements) => {
                return (
                  <span style={{height: "100%"}} key={page.id}>
                  <Box className="nav-menu-item my-0 mx-4">
                    <MenuLink to={page.target}
                              component={NavLink}
                    >
                      {t(page.title)}
                    </MenuLink>
                  </Box>
                    {elements[index + 1] &&
                      <Divider
                        orientation="vertical"
                        sx={{borderRightWidth: 2, background: 'rgba(156,39,176,0.4)'}}
                        flexItem
                      />
                    }
                </span>);
              })}
            </Grid>
            <Grid item
                  xs={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="end"
            >
              <Box display="flex"
                   alignItems="center"
                   justifyContent="end"
              >
                { /*<Search sx={{marginLeft: 'auto', color: "black"}}/>*/}
                <Language sx={{marginLeft: 2, color: "black"}}
                          className="hover"
                          onClick={handleLangClick}
                />
                <Menu
                  anchorEl={langAnchorEl}
                  open={langOpen}
                  onClose={handleLangClose}
                >
                  <MenuItem onClick={() => handleLangSelect('ET')}>
                    <img
                      src={require('../resources/images/flags/est.png').default}
                      className="lang-icon"
                      alt="EST"
                    />
                    EST
                  </MenuItem>
                  <MenuItem onClick={() => handleLangSelect('EN')}>
                    <img
                      src={require('../resources/images/flags/eng.png').default}
                      className="lang-icon"
                      alt="ENG"
                    />
                    ENG
                  </MenuItem>
                </Menu>
                {/*<Help sx={{marginLeft: 2, color: "black"}}/>*/}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
        <Drawer
          open={open}
          anchor="left"
          onClose={toggleDrawer}
          PaperProps={{
            sx: {width: {md: '50%', sm: '100%', xs: '100%'}}
          }}
        >
          <Grid container
                sx={{pt: 1.5, px: 4}}
          >
            <Grid item
                  xs={12}
                  sm={12}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <NavLink to="/">
                  <Box
                    component="img"
                    sx={{height: 35, mt: 1.5, mb: 1.5}}
                    alt="Logo"
                    src={Logo}
                  />
                </NavLink>
                <Box>
                  <IconButton onClick={() => toggleDrawer()} sx={{mt: 0}}>
                    <Close sx={{color: 'black', fontSize: 45}}/>
                  </IconButton>
                </Box>
              </Stack>
            </Grid>
            <List>
              {pages.map((page) => {
                return (
                  <ListItem sx={{pl: 0}}
                            key={page.id}>
                    <BurgerLink to={page.target}
                                component={NavLink}
                                onClick={toggleDrawer}>
                      {t(page.title)}
                    </BurgerLink>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Drawer>
      </AppBar>
    </>
  );
}

export default Navbar;
