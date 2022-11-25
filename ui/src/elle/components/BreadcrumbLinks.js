import React from "react";
import {Box, Breadcrumbs, Link, styled} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {Link as RouterLink} from "react-router-dom";

const breadcrumbNameMap = {
  '/corrector': 'Tekstihindaja',
  '/links': 'Lingikogud',
  '/tools': 'Tekstid & tööriistad',
  '/about': 'Keskkonnast',
  '/about/us': "Meist",
  '/about/people': 'Töötajad',
  '/about/grants': 'Grandid',
  '/about/publications': 'Üllitised',
  '/tools/clusterfinder': 'Mustrid',
  '/tools/wordanalyser': 'Sõnaanalüüs',
};

const MenuLink = styled(Link)({
  color: "#1B1B1B",
  textDecoration: "none",
  fontFamily: ["'Exo 2'", 'sans-serif',].join(','),
  '&:hover': {
    color: "#9C27B0",
    textDecoration: "none",
  }
});

export default function BreadcrumbLinks() {
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
        <Box display={"flex"}
             width={"80vw"}
             padding={"25px"}
             alignItems={"flex-end"}>
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
    )
  } else if (breadcrumbs.length > 1) {
    return (
      <React.Fragment>
        <Box display={"flex"}
             width={"80vw"}
             padding={"25px"}
             alignItems={"flex-end"}>
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
                  {breadcrumbNameMap[value.key]}
                </MenuLink>
              );
            })}
          </Breadcrumbs>
        </Box>
      </React.Fragment>
    );
  }
  return <></>
}

