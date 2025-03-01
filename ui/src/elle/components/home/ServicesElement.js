import React from 'react';
import '../styles/ServicesElement.css';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ElleOuterDivStyle } from '../../const/StyleConstants';

export default function ServicesElement() {
  const {t} = useTranslation();

  const ServiceContainer = (text) => {
    return (
      <Box className="service-detail" sx={ElleOuterDivStyle}>
        <Box className="service-text">
          <p>{text}</p>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="service-container-outer">
      <h3 className="mb-4">{t('homepage_services_title')}</h3>
      <Box className="services-container">
        {ServiceContainer(t('homepage_summary_text_1'))}
        {ServiceContainer(t('homepage_summary_text_2'))}
        {ServiceContainer(t('homepage_summary_text_3'))}
        {ServiceContainer(t('homepage_summary_text_4'))}
      </Box>
    </Box>);
};
