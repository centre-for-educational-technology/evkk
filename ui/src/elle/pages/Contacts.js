import React from "react";
import {Box, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ContactCard from "../components/ContactCard";

function Contacts() {
  return (
    <Box sx={{
      backgroundColor: "#FFFBFE",
      width: "100vw",
      height: "auto",
      position: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      overflow: "auto",
      paddingBottom: "100px"
    }}>
      <Box display={"flex"}
           width={"80vw"}
           paddingBottom={"5px"}
           height={"50px"}
           paddingLeft={"20px"}
           alignItems={"flex-end"}
           sx={{wordSpacing: "20px"}}><HomeIcon sx={{marginRight: "20px"}}/> / Keskkonnast / Töötajad</Box>
      <Box sx={{
        display: "flex",
        backgroundColor: "white",
        marginTop: "3vh",
        width: "80vw",
        height: "auto",
        boxShadow: "0px 0px 20px -5px #CCA8FD",
        overflow: "auto"
      }}>
        <Box sx={{
          width: "25%",
          height: "auto",
          marginTop: "110px",
          marginLeft: "50px",
          borderRight: "solid",
          borderColor: "#FFD0FD",
          overflow: "auto",
          marginBottom: "100px",
          borderWidth: "thin"
        }}>
          <Box component={"span"}><Typography color={"#9C27B0"}
                                              fontSize={"1rem"}
                                              marginTop={"10px"}>People</Typography></Box>
          <Box component={"span"}><Typography fontSize={"1rem"}
                                              marginTop={"10px"}>Töötajad</Typography></Box>
          <Box component={"span"}><Typography fontSize={"1rem"}
                                              marginTop={"10px"}>Publikatsioonid</Typography></Box>
          <Box component={"span"}><Typography fontSize={"1rem"}
                                              marginTop={"10px"}>Koostööpartnerid</Typography></Box>
          <Box component={"span"}><Typography fontSize={"1rem"}
                                              marginTop={"10px"}>Kontaktid</Typography></Box>
          <Box component={"span"}><Typography fontSize={"1rem"}
                                              marginTop={"10px"}>Keskkonna statistika</Typography></Box>
        </Box>
        <Box sx={{
          width: "75%",
          height: "auto",
          marginTop: "70px",
          marginLeft: "50px",
          marginBottom: "100px",
          overflow: "auto"
        }}>
          <ContactCard firstName={"Eesnimi"}
                       email={"mingimail@mingiaadress.ee"}
                       lastName={"Perenimi"}
                       role={"Tööline"}/>
          <ContactCard firstName={"Eesnimi"}
                       email={"mingimail@mingiaadress.ee"}
                       lastName={"Perenimi"}
                       role={"Tööline"}/>
          <ContactCard firstName={"Eesnimi"}
                       email={"mingimail@mingiaadress.ee"}
                       lastName={"Perenimi"}
                       role={"Tööline"}/>
          <ContactCard firstName={"Eesnimi"}
                       email={"mingimail@mingiaadress.ee"}
                       lastName={"Perenimi"}
                       role={"Tööline"}/>
          <ContactCard firstName={"Eesnimi"}
                       email={"mingimail@mingiaadress.ee"}
                       lastName={"Perenimi"}
                       role={"Tööline"}/>
          <ContactCard firstName={"Eesnimi"}
                       email={"mingimail@mingiaadress.ee"}
                       lastName={"Perenimi"}
                       role={"Tööline"}/>
        </Box>
      </Box>
    </Box>
  )
}


export default Contacts;
