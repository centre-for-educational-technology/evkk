import React from 'react';
import {Box, Button} from "@mui/material";
import './styles/StatisticsElement.css'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

const StatisticsElement = () => {
  return (
    <Box className="statistics-container">
      <Box className="statistics-box-1">
        <Box className="statistics-box-inner statistics-left-inner">
          <CollectionsBookmarkIcon sx={{fontSize: "50px", color: "#9C27B0", marginBottom: "25px"}}/>
          <h1 style={{fontWeight: "bold"}}>100 000+</h1>
          <p>Teksti korpuses</p>
        </Box>
      </Box>
      <Box className="statistics-box-1">
        <Box className="statistics-box-inner statistics-center-inner">
          <LibraryBooksIcon sx={{fontSize: "50px", color: "#9C27B0", marginBottom: "25px"}}/>
          <h1 style={{fontWeight: "bold"}}>10 000+</h1>
          <p>Erinevat kirjateost</p>
        </Box>
      </Box>
      <Box className="statistics-box-1">
        <Box className="statistics-box-inner statistics-right-inner">
          <p style={{fontSize: "20px"}}>Aita kaasa eesti keele uurimisele ning loovuta oma kirjateos meie
            korpusesse.</p>
          <Button sx={{bgcolor: "#9C27B0", fontWeight: "bold", borderRadius: "15px", alignSelf: "start"}}
                  variant={"contained"}>LOOVUTA OMA
            TEKST</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StatisticsElement;