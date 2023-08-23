import React from 'react';
import './styles/ServicesElement.css'
import {Box} from "@mui/material";
import {useTranslation} from 'react-i18next';

const ServicesElement = () => {

  const {t} = useTranslation();

  return (
    <Box className="services-container">
      {/*<Box className="left-service">
        <Box className="service-title-box">
        </Box>
        <Box className="service-title">
          <h2>ELLE võimalused</h2>
        </Box>
        <Box className="left-service-inner"><h4>{t('homepage_title_explainer')}</h4></Box>
      </Box>*/}
      <Box className="right-service">
        <Box height={"100%"} width={"50%"} display={"flex"} gap={"50px"} justifyContent={"space-between"}>
          <Box className="service-detail top-left-service">
            <Box className="service-text top-left-text">
              <p>{t('homepage_summary_text_1')}</p>
            </Box>
          </Box>
          <Box className="service-detail top-right-service">
            <Box className="service-text top-right-text">
              <p>{t('homepage_summary_text_2')}</p>
            </Box>
          </Box>
        </Box>
        <Box height={"100%"} width={"50%"} display={"flex"} gap={"50px"} justifyContent={"space-between"}>
          <Box className="service-detail bottom-left-service">
            <Box className="service-text">
              <p>{t('homepage_summary_text_3')}</p>
            </Box>
          </Box>
          <Box className="service-detail bottom-right-service">
            <Box className="service-text bottom-right-text">
              <p>{t('homepage_summary_text_4')}</p>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>);
};

export default ServicesElement;