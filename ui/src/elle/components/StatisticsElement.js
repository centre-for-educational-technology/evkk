import React from 'react';
import {Box, Button} from "@mui/material";
import './styles/StatisticsElement.css'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import {ButtonStyle, ElleOuterDivStyle} from "../utils/constants";

const StatisticsIconContainer = (props) => {
  return (
    <Box sx={ElleOuterDivStyle} className="statistics-inner-container">
      <Box className="statistics-box-inner">
        {props.icon}
        <h1 className="bold-text">{props.amount}</h1>
        <p>{props.text}</p>
      </Box>
    </Box>
  )
}

const StatisticsElement = () => {
  return (
    <Box className="statistics-container">
      <StatisticsIconContainer
        text={"Teksti korpuses"}
        amount={"100 000+"}
        icon={<CollectionsBookmarkIcon className="statistics-icon"/>}
      />
      <StatisticsIconContainer
        text={"Erinevat kirjateost"}
        amount={"10 000+"}
        icon={<LibraryBooksIcon className="statistics-icon"/>}
      />
      <Box
        sx={ElleOuterDivStyle}
        className="statistics-inner-container"
      >
        <Box className="statistics-box-inner">
          <p style={{fontSize: "20px"}}>
            Aita kaasa eesti keele uurimisele ning loovuta oma kirjateos meie korpusesse.
          </p>
          <Button
            sx={ButtonStyle}
            className="align-self-start"
            variant={"contained"}
          >
            LOOVUTA OMA TEKST
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StatisticsElement;