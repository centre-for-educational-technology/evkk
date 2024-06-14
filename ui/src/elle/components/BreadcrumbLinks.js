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
    if (breadcrumbs.length > 1) {
      const allButHome = breadcrumbs.slice(1);
      setIsNoMatch(
        allButHome.some(path => breadcrumbNameMap[path.key] === undefined)
      );
    } else {
      setIsNoMatch(false);
    }
  }, [breadcrumbs]);

  const pageTitle = <PageTitle breadcrumbs={breadcrumbs} />;

  const RenderBreadcrumbs = ({ children }) => {
    return (
      <React.Fragment>
        {pageTitle}
        <Box className="breadcrumb-box">
          <Breadcrumbs aria-label="breadcrumb">
            {children}
          </Breadcrumbs>
        </Box>
      </React.Fragment>
    );
  };

  const RenderMenuLink = ({ to, className, translateKey }) => {
    return (
      <MenuLink
        to={to}
        className={className}
        component={RouterLink}
      >
        {translateKey ? t(translateKey) : <HomeIcon />}
      </MenuLink>
    );
  };

  if (isNoMatch) {
    return (
      <RenderBreadcrumbs>
        <RenderMenuLink
          to="/"
          className="breadcrumb-menu-link"
        />
        <RenderMenuLink
          className="breadcrumb-menu-link"
          translateKey="error_page_not_found"
        />
      </RenderBreadcrumbs>
    );
  }

  if (breadcrumbs.length > 1) {
    return (
      <RenderBreadcrumbs>
        {breadcrumbs.map((value, index) => {
          return (
            <RenderMenuLink
              to={index === 0 ? '/' : value.key}
              key={index}
              className={`breadcrumb-menu-link ${index !== 0 && 'regular'}`}
              translateKey={index !== 0 && breadcrumbNameMap[value.key]}
            />
          );
        })}
      </RenderBreadcrumbs>
    );
  }

  return pageTitle;
}
