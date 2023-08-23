import React from 'react';
import {Box, Button} from "@mui/material";
import './styles/HeroElement.css'
import heroImage from '../resources/images/home/girl_with_laptop.png'
import {useTranslation} from 'react-i18next';

const HeroElement = () => {

  const {t} = useTranslation();


  return (
    <Box className="hero-container">
      <Box width={"40%"} height={"100%"} position={"relative"}>
        <Box className="hero-text-container">
          <h1 className="hero-text">Eesti <span
            style={{color: "#9C27B0"}}>keele õppe ja analüüsi keskkond</span> õppijale,
            õpetajale ja
            teadlasele.</h1>
          <Button className="button-design" sx={{bgcolor: "#9C27B0", fontWeight: "bold", borderRadius: "15px"}}
                  size={"large"}
                  variant={"contained"}>Tutvu
            tööriistadega</Button>
        </Box>
      </Box>
      <Box className="hero-image-box">
        <img className="hero-img" src={heroImage} alt="geroimage"/>

      </Box>
    </Box>
  );
};

export default HeroElement;