import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Link, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { breadcrumbNameMap } from '../const/Constants';
import './styles/BreadcrumbLinks.css';
import PageTitle from './PageTitle';

const MenuLink = styled(Link)({
  color: '#1B1B1B',
  textDecoration: 'none',
  fontFamily: ['\'Exo 2\'', 'sans-serif'].join(','),
  '&:hover': {
    color: '#9C27B0',
    textDecoration: 'none'
  }
});

export default function BreadcrumbLinks() {
  const { t } = useTranslation();
  const breadcrumbs = useBreadcrumbs();
  const [isNoMatch, setIsNoMatch] = useState(false);

  useEffect(() => {
    console.log(document.title);
    console.log(breadcrumbs);

    if (breadcrumbs.length > 1) {
      const allButHome = breadcrumbs.slice(1);
      setIsNoMatch(
        allButHome.some(path => breadcrumbNameMap[path.key] === undefined)
      );
    }
  }, [breadcrumbs]);

  const mainRender = () => {
    return <React.Fragment>
      <PageTitle breadcrumbs={breadcrumbs} />
      {breadcrumbBox()}
    </React.Fragment>;
  };

  const breadcrumbBox = () => {
    return <Box className="breadcrumb-box">
      <Breadcrumbs aria-label="breadcrumb">

      </Breadcrumbs>
    </Box>;
  };

  const menuLink = ({ to, key, className, translateKey }) => {
    return <MenuLink
      to={to}
      key={key}
      className={className}
      component={RouterLink}
    >
      {translateKey ? t(translateKey) : <HomeIcon />}
    </MenuLink>;
  };

  if (isNoMatch) {
    return (
      <React.Fragment>
        <Box className="breadcrumb-box">
          <Breadcrumbs aria-label="breadcrumb">
            <MenuLink to="/"
                      key="/"
                      className="breadcrumb-menu-link"
                      component={RouterLink}>
              <HomeIcon />
            </MenuLink>
            <MenuLink className="breadcrumb-menu-link regular"
                      component={RouterLink}>
              {t('error_page_not_found')}
            </MenuLink>
          </Breadcrumbs>
        </Box>
      </React.Fragment>
    );
  } else if (breadcrumbs.length > 1) {
    return (
      <React.Fragment>
        <Box className="breadcrumb-box">
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((value, index) => {
              return index === 0 ? (
                <MenuLink to="/"
                          key={value.key}
                          className="breadcrumb-menu-link"
                          component={RouterLink}>
                  <HomeIcon />
                </MenuLink>
              ) : (
                <MenuLink to={value.key}
                          key={value.key}
                          className="breadcrumb-menu-link regular"
                          component={RouterLink}>
                  {t(breadcrumbNameMap[value.key])}
                </MenuLink>
              );
            })}
          </Breadcrumbs>
        </Box>
      </React.Fragment>
    );
  }
  return null;
}
