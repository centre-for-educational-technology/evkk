import React from 'react';
import {Box} from "@mui/material";
import './styles/FooterElement.css'
import DTILogo from '../resources/images/footer/DTI-est_2.svg'
import TLULogo from '../resources/images/footer/Universität_Tallinn_Logo.svg'
import {useTranslation} from "react-i18next";

const FooterElement = () => {
  const year = new Date().getFullYear();
  const {t} = useTranslation();

  return (
    <Box className="footer-container">
      <Box className="footer-inner">
        <Box className="footer-logo-box">
          <img className="dti-logo" src={TLULogo} alt="TLU logo"/>
          <img className="dti-logo" src={DTILogo} alt="DTI logo"/>
        </Box>
        <Box className="footer-middle-box">
          <p>ELLE, {year}</p>
        </Box>
        <Box className="footer-box-right">
          <p><b>{t('footer_contact')}</b> elle@tlu.ee</p>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterElement;