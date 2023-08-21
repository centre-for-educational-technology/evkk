import React from 'react';
import {Box} from "@mui/material";
import './styles/FooterElement.css'
import DTILogo from '../resources/images/footer/DTI-est_2.svg'
import TLULogo from '../resources/images/footer/Universität_Tallinn_Logo.svg'

const FooterElement = () => {
  return (
    <Box className="footer-container">
      <Box className="footer-inner">
        <Box className="logo-box">
          <img className="dti-logo" src={DTILogo} alt="DTI logo"/>
          <img className="dti-logo" src={TLULogo} alt="DTI logo"/>
        </Box>
        <Box className="middle-box">
          <p>ELLE, 2023</p>
        </Box>
        <Box className="box-right">
          <p><span className="bold-text">Kontakt:</span> elle@tlu.ee</p>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterElement;