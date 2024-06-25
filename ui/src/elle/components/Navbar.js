import Logo from '../resources/images/header/elle_logo.png';
import { AppBar, Box, Drawer, IconButton, Link, List, ListItem, Menu, MenuItem, styled, Toolbar } from '@mui/material';
import { Close, Language, Menu as MenuIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import '@fontsource/exo-2/600.css';
import React, { useEffect, useState } from 'react';
import './styles/Navbar.css';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Languages } from '../translations/i18n';

const pages = [
  {id: 1, title: 'common_corrector', target: '/corrector'},
  {id: 2, title: 'common_tools', target: '/tools'},
  {id: 3, title: 'common_links', target: '/links'},
  {id: 4, title: 'common_about', target: '/about'},
  {id: 5, title: 'common_statistics', target: '/statistics'}
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

export default function Navbar() {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const [navColor, setNavColor] = useState('sticking');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [langAnchorEl, setLangAnchorEl] = useState(false);
  const langOpen = Boolean(langAnchorEl);
  const handleLangClick = (event) => {
    setLangAnchorEl(event.currentTarget);
  };
  const handleLangClose = () => {
    setLangAnchorEl(false);
  };
  const handleLangSelect = (lang) => {
    i18n.changeLanguage(lang).then(r => r);
    localStorage.setItem('language', lang);
    setLangAnchorEl(false);
  };

  const languageMenu = () => {
    return (
      <div>
        <Language className="language-icon" onClick={handleLangClick} />
        <Menu
          anchorEl={langAnchorEl}
          open={langOpen}
          onClose={handleLangClose}
        >
          <MenuItem onClick={() => handleLangSelect(Languages.ESTONIAN)}>
            <img
              src={require('../resources/images/flags/est.png').default}
              className="lang-icon"
              alt="EST"
            />EST
          </MenuItem>
          <MenuItem onClick={() => handleLangSelect(Languages.ENGLISH)}>
            <img
              src={require('../resources/images/flags/eng.png').default}
              className="lang-icon"
              alt="ENG"
            />ENG
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const handleScroll = () => {
    const position = window.scrollY;
    if (position > 20) {
      setNavColor('not-sticking');
    } else if (position <= 20) {
      setNavColor('sticking');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      elevation={0}
      className={navColor}
    >
      <Toolbar>
        <div className="navbar-container">
          <div className="nav-logo-container">
            <NavLink to="/">
              <Box
                component="img"
                className="elle-nav-logo"
                alt="Logo"
                src={Logo}
              />
            </NavLink>
          </div>
          <div className="nav-menu-link-container">
            {pages.map((page) => {
              return (
                <span style={{height: '100%'}} key={page.id}>
                  <Box className="nav-menu-item my-0 mx-4">
                    <MenuLink
                      to={page.target}
                      component={NavLink}
                    >
                      {t(page.title)}
                    </MenuLink>
                  </Box>
                </span>);
            })}
          </div>
          <div className="nav-icons-container">
            <Box className="language-menu-desktop">
              {languageMenu()}
            </Box>
            <IconButton
              onClick={() => toggleDrawer()}
              className="navBar-icon-button mr-2"
            >
              <MenuIcon className="burger-menu-icon" />
            </IconButton>
          </div>
        </div>
      </Toolbar>
      <Drawer
        open={open}
        anchor="left"
        onClose={toggleDrawer}
        PaperProps={{
          sx: {width: '100%'}
        }}
      >
        <div className="nav-drawer-container">
          <div className="d-flex flex-column w-50">
            <div className="d-flex align-items-center w-100 nav-50px-height">
              <NavLink to="/">
                <Box
                  component="img"
                  className="elle-nav-logo"
                  alt="Logo"
                  src={Logo}
                />
              </NavLink>
            </div>
            <List>
              {pages.map((page) => {
                return (
                  <ListItem sx={{pl: 0}} key={page.id}>
                    <BurgerLink
                      to={page.target}
                      component={NavLink}
                      onClick={toggleDrawer}
                    >
                      {t(page.title)}
                    </BurgerLink>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div className="d-flex justify-content-end align-items-center nav-50px-height">
            {languageMenu()}
            <IconButton onClick={() => toggleDrawer()}>
              <Close className="nav-close-icon" />
            </IconButton>
          </div>
        </div>
      </Drawer>
    </AppBar>
  );
}
