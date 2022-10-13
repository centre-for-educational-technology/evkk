import React from "react";
import {Box} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function ContactCard({firstName, lastName, role, email}) {
  return (
    <Box display="flex"
         flexDirection="row"
         sx={{width: "500px", height: "150px", margin: "10px"}}>
      <Box sx={{width: "30%", height: "100%"}}>
        <AccountBoxIcon sx={{width: "100%", height: "100%", margin: "auto", padding: "10px"}}
                        fontSize="large"/>
      </Box>
      <Box sx={{width: "70%", height: "100%"}}>
        <Box sx={{
          height: "35%",
          width: "100%",
          paddingLeft: "20px",
          fontWeight: "bold",
          fontSize: "1.5rem",
          paddingTop: "6%"
        }}>{firstName} {lastName}</Box>
        <Box sx={{paddingLeft: "20px", paddingTop: "5%"}}>
          <div><b>Roll:</b> {role}</div>
          <div><b>E-mail:</b> {email}</div>
        </Box>
      </Box>
    </Box>
  )
}

export default ContactCard;
