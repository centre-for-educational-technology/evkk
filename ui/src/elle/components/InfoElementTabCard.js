import React from 'react';
import {Box, Button} from "@mui/material";
import './styles/InfoElementTabCard.css'


const InfoElementTabCard = (props) => {

  return (
    <Box id={props.toolID} onMouseEnter={(e) => props.toggleBtnClass(e, props.toolKey)}
         className="btn-invisible">
      <p className="tool-button-text">{props.toolTitile}</p>
      <Box id={props.toolInnerId} className="info-box-slide-invisible" style={{top: "5%"}}>
        <Box className="btn-box-inner">
          <Box className="btn-box-inner-inner">
            {props.description}
            <Button variant={"contained"} sx={{bgcolor: "#9C27B0", fontWeight: "bold", borderRadius: "10px"}}
                    size={"small"}>Uuri lähemalt</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoElementTabCard;
