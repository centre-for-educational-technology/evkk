import Logo from '../resources/images/header/elle_logo.png';
import { AppBar, Box, Drawer, IconButton, Link, List, ListItem, Menu, MenuItem, styled, Toolbar } from '@mui/material';
import { ArrowDropDown, Close, Language, Logout, Menu as MenuIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import '@fontsource/exo-2/600.css';
import React, { useContext, useEffect, useState } from 'react';
import './styles/Navbar.css';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Languages } from '../translations/i18n';
import Can from './security/Can';
import { UserRoles } from '../const/Constants';
import { useLogin, useLogout } from '../hooks/service/AuthService';
import { RouteConstants } from '../../AppRoutes';
import TextToSpeechMenu from '../tools/text-to-speech/TextToSpeechMenu';
import RootContext from '../context/RootContext';

const pages = [
  { id: 1, title: 'common_corrector', target: RouteConstants.CORRECTOR },
  { id: 2, title: 'common_tools', target: RouteConstants.TOOLS },
  { id: 5, title: 'common_library', target: RouteConstants.LIBRARY },
  { id: 3, title: 'common_links', target: RouteConstants.LINKS },
  { id: 4, title: 'common_about', target: RouteConstants.ABOUT },
  { id: 6, title: 'common_admin_panel', target: '/admin', role: UserRoles.ADMIN }
];

const MenuLink = styled(Link)({
  fontWeight: 600,
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
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [navColor, setNavColor] = useState('sticking');
  const [langAnchorEl, setLangAnchorEl] = useState(false);
  const langOpen = Boolean(langAnchorEl);
  const [userAnchorEl, setUserAnchorEl] = useState(false);
  const userMenuOpen = Boolean(userAnchorEl);
  const { user, isLoggedIn } = useContext(RootContext);
  const { logoutTestUser } = useLogout();
  const { loginTestUser } = useLogin();

  const toggleDrawer = () => {
    setOpen(!open);
  };

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

  const handleUserMenuClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(false);
  };

  const handleLogout = () => {
    setOpen(false);
    console.log(user);
    setUserAnchorEl(false);
    // logout();
    logoutTestUser();
  };

  const handleLogin = () => {
    loginTestUser();
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
              alt="Eesti"
            />Eesti
          </MenuItem>
          <MenuItem onClick={() => handleLangSelect(Languages.ENGLISH)}>
            <img
              src={require('../resources/images/flags/eng.png').default}
              className="lang-icon"
              alt="English"
            />English
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const loginLogoutComponent = (isDesktop) => {
    return !isLoggedIn() ? loginButton(isDesktop) : userMenu(isDesktop);
  };

  const userMenu = (isDesktop) => {
    return (
      <div>
        {userMenuButton(isDesktop)}
        <Menu
          anchorEl={userAnchorEl}
          open={userMenuOpen}
          onClose={handleUserMenuClose}
        >
          <MenuItem onClick={handleLogout}>
            <Logout />
            <span className="user-menu-text">
              {t('navbar_logout')}
            </span>
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const userMenuButton = (isDesktop) => {
    return (
        <div
          className={`nav-user-menu ${isDesktop ? 'desktop' : ''}`}
          onClick={handleUserMenuClick}
        >
          <span className="user-menu-text">
            {user.firstName + ' ' + user.lastName}
            <ArrowDropDown/>
          </span>
        </div>
    );
  };

  const loginButton = (isDesktop) => {
    return (
      <div
        className={`nav-login ${isDesktop ? 'desktop' : ''}`}
        onClick={handleLogin}
      >
        <span className="login-text">
          {t('navbar_login')}
        </span>
      </div>
    )
  }

  const handleScroll = () => {
    const position = window.scrollY;
    if (position > 20) {
      setNavColor('not-sticking');
    } else if (position <= 20) {
      setNavColor('sticking');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
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
                <Can role={page.role} key={page.id}>
                  <span style={{ height: '100%' }}>
                    <Box className="nav-menu-item my-0 mx-4">
                      <MenuLink
                        to={page.target}
                        component={NavLink}
                      >
                        {t(page.title)}
                      </MenuLink>
                    </Box>
                  </span>
                </Can>
              );
            })}
          </div>
          <div className="nav-icons-container">
            {loginLogoutComponent(true)}
            <Box className="language-menu-desktop">
              {languageMenu()}
              <TextToSpeechMenu />
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
          sx: { width: '100%' }
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
                  <Can role={page.role} key={page.id}>
                    <ListItem sx={{ pl: 0 }}>
                      <BurgerLink
                        to={page.target}
                        component={NavLink}
                        onClick={toggleDrawer}
                      >
                        {t(page.title)}
                      </BurgerLink>
                    </ListItem>
                  </Can>
                );
              })}
            </List>
          </div>
          <div className="d-flex justify-content-end align-items-center nav-50px-height">
            {loginLogoutComponent()}
            {languageMenu()}
            <TextToSpeechMenu />
            <IconButton onClick={() => toggleDrawer()}>
              <Close className="nav-close-icon" />
            </IconButton>
          </div>
        </div>
      </Drawer>
    </AppBar>
  );
}
