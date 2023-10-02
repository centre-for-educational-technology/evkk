import React from 'react';
import {Box, Button} from "@mui/material";
import './styles/InfoElementTabCard.css'
import {ButtonStyleSmall} from "../const/Constants";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const InfoElementTabCard = (props) => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const changeTab = () => {
    props.setOpenTab(props.toolID);
    props.setImageSelected(props.imageNo);
  }

  return (
    <Box id={props.toolID} onMouseEnter={(e) => changeTab()}
         className={props.tabOpen === props.toolID ? "btn-visible" : "btn-invisible"}>
      <p className="tool-button-text">{props.toolTitile}</p>
      <Box id={props.toolInnerId}
           className={props.tabOpen === props.toolID ? "info-box-slide-visible" : "info-box-slide-invisible"}>
        <Box className="btn-box-inner">
          <Box className="btn-box-inner-inner">
            {props.description}
            <Button
              variant={"contained"}
              sx={ButtonStyleSmall}
              size={"small"}
              onClick={() => {
                navigate(props.linkTo, props.tabReference ? {state: {pageNo: props.tabReference}} : {})
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

export default InfoElementTabCard;
