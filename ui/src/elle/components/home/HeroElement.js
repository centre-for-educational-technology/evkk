import React from 'react';
import {Box, Button, styled} from "@mui/material";
import '../styles/HeroElement.css'
import heroImage from '../../resources/images/home/girl_with_laptop.png'
import {useTranslation} from 'react-i18next';
import {HashLink} from "react-router-hash-link";
import {DefaultButtonStyle} from '../../const/Constants';

export default function HeroElement() {

  const {t} = useTranslation();
  const ToolsLink = styled(HashLink)({
    fontWeight: 600,
    fontSize: 16,
    color: "white",
    textDecoration: "none",
    fontFamily: ["'Exo 2'", 'sans-serif',].join(','),
    '&:hover': {
      color: "white",
      textDecoration: "none",
    },
    '&.active': {
      color: "white",
      textDecoration: "none",
    },
  });

  return (
    <Box className="hero-container">
      <Box className="h-100 position-relative" width={"40%"}>
        <Box className="hero-text-container">
          <h1 className="hero-text"><span
            className="elle-dark-text">
            {t('hero_main_text_highlighted')}
          </span>
            {t('hero_main_text_not_highlighted')}
          </h1>
          <Button
            className="button-design" sx={DefaultButtonStyle}
            size={"large"}
            variant={"contained"}
          >
            <ToolsLink
              key={"1"}
              smooth
              to="#scroll-anchor"
            >
              {t('hero_tools_button')}
            </ToolsLink>
          </Button>
        </Box>
      </Box>
      <Box className="hero-image-box">
        <img
          className="hero-img"
          src={heroImage}
          alt="Heroimage"
        />
      </Box>
    </Box>
  );
};
