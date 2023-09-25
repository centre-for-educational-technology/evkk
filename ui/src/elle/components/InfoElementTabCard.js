import React from 'react';
import {Box, Button} from "@mui/material";
import './styles/InfoElementTabCard.css'
import {ButtonStyleSmall} from "../utils/constants";
import {useTranslation} from "react-i18next";

const InfoElementTabCard = (props) => {

  const {t} = useTranslation()

  return (
    <Box id={props.toolID} onMouseEnter={(e) => props.setOpenTab(props.toolID)}
         className={props.tabOpen === props.toolID ? "btn-visible" : "btn-invisible"}>
      <p className="tool-button-text">{props.toolTitile}</p>
      <Box id={props.toolInnerId}
           className={props.tabOpen === props.toolID ? "info-box-slide-visible" : "info-box-slide-invisible"}>
        <Box className="btn-box-inner">
          <Box className="btn-box-inner-inner">
            {props.description}
            <Button variant={"contained"} sx={ButtonStyleSmall} size={"small"}>
              {t('find_out_more')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoElementTabCard;
