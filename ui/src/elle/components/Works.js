import React from "react";
import {Box, Chip, Grid, Link, styled, Typography} from "@mui/material";
import {Image} from "@mui/icons-material";

function Works({name, siteLink, tekst, image, tags}) {

  const MenuLink = styled(Link)({
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#1B1B1B",
    textDecoration: "none",
    fontFamily: ["'Exo 2'", 'sans-serif',].join(','),
    '&:hover': {
      color: "#9C27B0",
      textDecoration: "none",
    },
    '&.active': {
      color: "#9C27B0",
      textDecoration: "none",
    },
  });

  return (
    <Box height={"auto"}
         marginTop={"50px"}
         marginBottom={"50px"}>
      <Grid
        container
        spacing={2}>
        <Grid item
              xs={2}>
          <Image src={image}
                 sx={{width: "100px", height: "100px", margin: "auto"}}/>
        </Grid>
        <Grid item
              xs={10}>
          <Box><MenuLink rel={"noopener noreferrer"}
                         target={"_blank"}
                         href={siteLink}>{name}</MenuLink></Box>
          <Box>
            <div><Typography>{tekst}</Typography></div>
          </Box>
        </Grid>
        <Grid item
              xs={2}></Grid>
        <Grid item
              xs={10}>
          {tags.map(tag => {
            return (
              <Chip label={tag}/>
            )
          })}

        </Grid>
      </Grid>
    </Box>
  )
}

export default Works;
