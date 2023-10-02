import React from 'react';
import {Box, Button} from "@mui/material";
import './styles/StatisticsElement.css'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import {ButtonStyle, ElleOuterDivStyle} from "../utils/constants";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const StatisticsIconContainer = (props) => {
  return (
    <Box sx={ElleOuterDivStyle} className="statistics-inner-container">
      <Box className="statistics-box-inner">
        {props.icon}
        <h1><b>{props.amount}</b></h1>
        <p>{props.text}</p>
      </Box>
    </Box>
  )
}

const StatisticsElement = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Box className="statistics-container">
      <StatisticsIconContainer
        text={t('corpus_texts')}
        amount={"100 000+"}
        icon={<CollectionsBookmarkIcon className="statistics-icon"/>}
      />
      <StatisticsIconContainer
        text={t('corpus_authors')}
        amount={"10 000+"}
        icon={<LibraryBooksIcon className="statistics-icon"/>}
      />
      <Box sx={ElleOuterDivStyle} className="statistics-inner-container">
        <Box className="statistics-box-inner">
          <p style={{fontSize: "20px"}}>
            {t('corpus_donation_text')}
          </p>
          <Button
            sx={ButtonStyle}
            className="align-self-start"
            variant={"contained"}
            onClick={() => {
              navigate('/adding')
            }}
          >
            {t('donate_text')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StatisticsElement;