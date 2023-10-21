import React from 'react';
import {Box, Button} from "@mui/material";
import '../styles/StatisticsElement.css'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import {DefaultButtonStyle, ElleOuterDivStyle} from "../../const/Constants";
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

export default function StatisticsElement() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Box className="statistics-container">
      <StatisticsIconContainer
        text={t('corpus_texts')}
        amount={t('corpus_text_count')}
        icon={<CollectionsBookmarkIcon className="statistics-icon"/>}
      />
      <StatisticsIconContainer
        text={t('corpus_words')}
        amount={t('corpus_word_count')}
        icon={<LibraryBooksIcon className="statistics-icon"/>}
      />
      <Box sx={ElleOuterDivStyle} className="statistics-inner-container">
        <Box className="statistics-box-inner">
          <p>{t('corpus_donation_text')}</p>
          <Button
            sx={DefaultButtonStyle}
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
