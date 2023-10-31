import React from 'react';
import { Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './styles/ContactCard.css';
import { OpenInNew } from '@mui/icons-material';

export default function ContactCard({name, role, email, etisUrl, icon}) {
  return (
    <Box className="contact-box">
      <Box className="icon-box">
        {/*todo uncomment when profile icons are added*/}
        {/*{icon*/}
        {/*  ? <img src={require(`../../resources/images/contact-icons/${icon}`).default}*/}
        {/*         alt={icon}/>*/}
        {/*  : <AccountBoxIcon className="icon"/>*/}
        {/*}*/}
        <AccountBoxIcon className="icon"/>
      </Box>
      <Box className="text-box">
        <Box className="name-box">{name}</Box>
        <Box className="info-box">
          <div><b>Amet:</b> {role}</div>
          <div><b>E-post:</b> {email}</div>
          {etisUrl &&
            <div className="etis-container">
              <OpenInNew/>
              <a className="etis-link"
                 href={etisUrl}
                 target="_blank"
                 rel="noopener noreferrer">ETIS</a>
            </div>
          }
        </Box>
      </Box>
    </Box>
  );
}
