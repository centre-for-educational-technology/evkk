import React from 'react';
import { Box } from '@mui/material';
import './styles/FooterElement.css';
import dti_et from '../resources/images/footer/dti_et.svg';
import { useTranslation } from 'react-i18next';
import { FooterLink } from '../const/StyleConstants';
import { aboutValues, linksValues, referencesValues, textsAndToolsValues } from '../const/FooterConstants';

export default function FooterElement() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  const renderBlock = (values) => {
    return values.map(link => (
      <FooterLink
        target={link.newTab ? '_blank' : ''}
        key={link.target}
        to={(link.prefix ?? '') + (link.connector ?? '') + link.target}
      >
        {t(link.title)}
      </FooterLink>
    ));
  };

  return (
    <Box className="footer-container">
      <Box className="footer-inner">
        <Box className="footer-logo-box">
          <img className="dti-logo" src={dti_et} alt="DTI logo" />
          <p><b>{t('footer_contact')}:</b> elle@tlu.ee</p>
          <div className="footer-date-stamp">ELLE, {year}</div>
        </Box>
        <Box className="footer-inner-right">
          <Box className="footer-middle-box">
            <p className="font-weight-bold">{t('footer_references')}</p>
            {renderBlock(referencesValues)}
          </Box>
          <Box className="footer-middle-box">
            <p className="font-weight-bold">{t('common_tools')}</p>
            {renderBlock(textsAndToolsValues)}
          </Box>
          <Box className="footer-middle-box">
            <p className="font-weight-bold">{t('common_links')}</p>
            {renderBlock(linksValues)}
          </Box>
          <Box className="footer-box-right">
            <p className="font-weight-bold">{t('common_about')}</p>
            {renderBlock(aboutValues)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
