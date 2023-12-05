import React from 'react';
import { Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './styles/ContactCard.css';
import { ReactComponent as EtisLogo } from '../../resources/images/misc/etis_logo.svg';

;

export default function ContactCard({name, role, email, etisUrl, icon}) {
  return (
    <Box className="contact-box">
      <Box className="icon-box">
        {icon
          ? <img className="contact-image" src={icon}
                 alt={icon}/>
          : <AccountBoxIcon className="icon"/>
        }
      </Box>
      <Box className="text-box">
        <Box className="name-box">{name}</Box>
        <Box className="info-box">
          <div><b>Amet:</b> {role}</div>
          <div><b>E-post:</b> {email}</div>
          {etisUrl &&
            <div className="etis-container">
              <a className="etis-link"
                 href={etisUrl}
                 target="_blank"
                 rel="noopener noreferrer"><EtisLogo/></a>
            </div>
          }
        </Box>
      </Box>
    </Box>
  );
}
