import React, { useState } from 'react';
import { Box, Button, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExpandLess, ExpandMore, MenuOpen } from '@mui/icons-material';
import './styles/ResponsiveDrawer.css';

const drawerWidth = 250;

export default function ResponsiveDrawer({ lists }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [childrenOpen, setChildrenOpen] = useState({});

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (item, itemIndex) => {
    if (item.children) {
      setChildrenOpen(prevState => ({
        ...prevState,
        [itemIndex]: !prevState?.[itemIndex]
      }));
    } else {
      navigate(item.navigateTo);
      setMobileOpen(false);
    }
  };

  const drawer = lists.map((list, listIndex) => (
    <div>
      <List key={list.key}>
        {list.items.map(((item, itemIndex) => (
          <div>
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleMenuItemClick(item, itemIndex)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={t(item.text)} />
                {item.children && (
                  childrenOpen[itemIndex] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>
            {item.children && (item.children.map((child => (
              <Collapse in={childrenOpen[itemIndex]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton onClick={() => handleMenuItemClick(child, null)} sx={{ ml: '1em' }}>
                    <ListItemIcon>
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText primary={t(child.text)} />
                  </ListItemButton>
                </List>
              </Collapse>
            ))))}
          </div>
        )))}
      </List>
      {listIndex < lists.length - 1 && <Divider />}
    </div>
  ));

  const drawerToggleButton = (
    <Button
      variant="contained"
      className="drawer-toggle-button"
      onClick={handleDrawerToggle}
      sx={{ display: { md: 'none' } }}
    >
      <MenuOpen className="drawer-toggle-icon" />
    </Button>
  );

  return (
    <Box className="global-page-content-container">
      <Box className="global-page-content-container-inner">
        <Box className="responsive-drawer-main-box">
          <Box
            component="nav"
            sx={{
              width: { md: drawerWidth },
              flexShrink: { md: 0 },
              marginLeft: { xs: '0', md: '20px' },
              position: { xs: 'static', md: 'sticky' },
              top: { xs: 'auto', md: '100px' },
              alignSelf: { xs: 'auto', md: 'flex-start' },
              maxHeight: { xs: 'auto', md: '100vh' }
            }}
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerClose}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, paddingLeft: '20px' }
              }}
              slotProps={{
                root: {
                  keepMounted: true // better open performance on mobile
                }
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  position: 'relative',
                  overflowY: 'auto'
                }
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
          >
            {drawerToggleButton}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
