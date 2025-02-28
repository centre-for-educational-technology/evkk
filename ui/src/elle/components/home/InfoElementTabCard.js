import React from 'react';
import { Box, Button } from '@mui/material';
import '../styles/InfoElementTabCard.css';
import { DefaultButtonStyleSmall } from '../../const/StyleConstants';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function InfoElementTabCard(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const changeTab = () => {
    props.setOpenTab(props.toolID);
    props.setImageSelected(props.imageNo);
    props.setInfoOpacity(400);
  };

  return (
    <Box
      id={props.toolID}
      onMouseEnter={changeTab}
      onMouseLeave={() => props.setInfoOpacity(0)}
      className={props.tabOpen === props.toolID ? 'btn-visible' : 'btn-invisible'}
    >
      <Box className="info-tab-helper-strip"
           sx={{
             width: `${props.opacity / 8}px`
           }}
      ></Box>
      <p className="tool-button-text">{props.toolTitle}</p>
      <Box
        style={{ width: `${props.opacity}px` }}
        id={props.toolInnerId}
        className={props.tabOpen === props.toolID ? 'info-box-slide-visible' : 'info-box-slide-invisible'}
      >
        <Box className="btn-box-inner">
          <Box className="btn-box-inner-inner">
            {props.description}
            <Button
              variant="contained"
              sx={DefaultButtonStyleSmall}
              size="small"
              onClick={() => {
                navigate(props.linkTo, props.tabReference ? { state: { pageNo: props.tabReference } } : {});
              }}
            >
              {t('find_out_more')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
