import React from 'react';
import { Box, Breadcrumbs, Link, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const breadcrumbNameMap = {
  '/corrector': 'common_corrector',
  '/tools': 'common_tools',
  '/links': 'common_links',
  '/about': 'common_about',
  '/about/us': 'common_us',
  '/about/people': 'common_people',
  '/about/grants': 'common_grants',
  '/about/publications': 'common_publications',
  '/tools/adding': 'common_upload_own_texts',
  '/tools/clusterfinder': 'common_clusters',
  '/tools/wordanalyser': 'common_word_analysis',
  '/tools/wordlist': 'common_wordlist',
  '/tools/wordcontext': 'common_word_in_context',
  '/tools/collocates': 'common_neighbouring_words'
};

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
  const {t} = useTranslation();
  const breadcrumbs = useBreadcrumbs();
  let noMatch = false;

  if (breadcrumbs.length > 1) {
    const allButHome = breadcrumbs.slice(1);
    allButHome.forEach((path) => {
      if (breadcrumbNameMap[path.key] === undefined) {
        noMatch = true;
      }
    });
  }

  if (noMatch) {
    return (
      <React.Fragment>
        <Box display={'flex'}
             width={'80vw'}
             padding={'25px'}
             alignItems={'flex-end'}>
          <Breadcrumbs aria-label="breadcrumb">
            <MenuLink to="/"
                      key="/"
                      style={{paddingRight: '15px'}}
                      component={RouterLink}>
              <HomeIcon/>
            </MenuLink>
            <MenuLink style={{paddingRight: '15px', paddingLeft: '15px'}}
                      component={RouterLink}>
              Lehte ei leitud
            </MenuLink>
          </Breadcrumbs>
        </Box>
      </React.Fragment>
    );
  } else if (breadcrumbs.length > 1) {
    return (
      <React.Fragment>
        <Box display={'flex'}
             width={'80vw'}
             padding={'25px'}
             alignItems={'flex-end'}>
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((value, index) => {
              return index === 0 ? (
                <MenuLink to="/"
                          key={value.key}
                          style={{paddingRight: '15px'}}
                          component={RouterLink}>
                  <HomeIcon/>
                </MenuLink>
              ) : (
                <MenuLink to={value.key}
                          key={value.key}
                          style={{paddingRight: '15px', paddingLeft: '15px'}}
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
  return <></>;
}

