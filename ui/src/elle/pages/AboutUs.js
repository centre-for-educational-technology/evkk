import React, { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import { HashFragmentRouteConstants, RouteConstants } from '../../AppRoutes';
import './styles/AboutUs.css';

function AboutUs() {
  const { t } = useTranslation();
  const location = useLocation();

  const classes = {
    focused: {
      bgcolor: 'transparent'
    },
    selected: {
      bgcolor: 'transparent'
    },
    hover: {
      bgcolor: 'transparent'
    }
  };

  const MenuLink = styled(Link)({
    fontWeight: 600,
    fontSize: 16,
    color: '#1B1B1B',
    textDecoration: 'none',
    fontFamily: ['\'Exo 2\'', 'sans-serif'].join(','),
    '&:hover': {
      color: '#9C27B0',
      textDecoration: 'none'
    },
    '&.active': {
      color: '#9C27B0',
      textDecoration: 'none'
    }
  });

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box className="global-page-content-container">
      <Box className="about-us-container-inner global-page-content-container-inner">
        <Box className="about-us-container-menu">
          <Box className="about-us-container-menu-inner">
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon className="about-us-menu-tree-icon" />}
              defaultExpandIcon={<ChevronRightIcon className="about-us-menu-tree-icon" />}
              sx={{
                height: 280, flexGrow: 1, maxWidth: 400, overflowY: 'auto', '.MuiTreeItem-root': {
                  '	.MuiTreeItem-content:hover': classes.hover,
                  '.Mui-focused:not(.Mui-selected)': classes.focused,
                  '.Mui-selected, .Mui-focused.Mui-selected, .Mui-selected:hover':
                  classes.selected
                }
              }}
            >
              <TreeItem
                nodeId={'1'}
                label={
                  <Typography className="about-us-menu-item">
                    <MenuLink
                      to={RouteConstants.US}
                      key={'1'}
                    >
                      {t('common_us')}
                    </MenuLink>
                  </Typography>
                }
              >
              </TreeItem>
              <TreeItem
                nodeId={'2'}
                label={
                  <Typography className="about-us-menu-item">
                    <MenuLink
                      to={RouteConstants.PEOPLE}
                      key={'2'}
                    >
                      {t('common_people')}
                    </MenuLink>
                  </Typography>
                }
              >
              </TreeItem>
              <TreeItem
                nodeId={'3'}
                label={
                  <Typography className="about-us-menu-item">
                    <MenuLink
                      to={RouteConstants.GRANTS}
                      key={'3'}
                    >
                      {t('common_grants')}
                    </MenuLink>
                  </Typography>
                }
              >
              </TreeItem>
              <TreeItem
                nodeId={'4'}
                label={
                  <Typography className="about-us-menu-item">
                    <MenuLink
                      to={RouteConstants.PUBLICATIONS}
                      key={'4'}
                      onClick={e => e.stopPropagation()}
                    >
                      {t('common_publications')}
                    </MenuLink>
                  </Typography>
                }
              >
                <TreeItem
                  nodeId={'5'}
                  label={
                    <Typography className="about-us-menu-item">
                      <MenuLink
                        to={`${RouteConstants.PUBLICATIONS}#${HashFragmentRouteConstants.PUBLICATIONS_GRADUATION_PAPERS}`}
                      >
                        {t('common_graduation_papers')}
                      </MenuLink>
                    </Typography>
                  }
                >
                </TreeItem>
                <TreeItem
                  nodeId={'6'}
                  label={
                    <Typography className="about-us-menu-item">
                      <MenuLink
                        to={`${RouteConstants.PUBLICATIONS}#${HashFragmentRouteConstants.PUBLICATIONS_CONFERENCES_AND_WORKSHOPS}`}
                      >
                        {t('common_conferences_and_workshops')}
                      </MenuLink>
                    </Typography>
                  }
                >
                </TreeItem>
                <TreeItem
                  nodeId={'7'}
                  label={
                    <Typography className="about-us-menu-item">
                      <MenuLink
                        to={`${RouteConstants.PUBLICATIONS}#${HashFragmentRouteConstants.PUBLICATIONS_ARTICLES}`}
                      >
                        {t('common_articles')}
                      </MenuLink>
                    </Typography>
                  }
                >
                </TreeItem>
              </TreeItem>
            </TreeView>
          </Box>
        </Box>
        <Box className="about-us-container-content">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AboutUs;
