import { Box } from '@mui/material';
import { Person } from '@mui/icons-material';
import '../styles/ContactCard.css';
import etisLogo from '../../resources/images/misc/etis_logo.svg';
import NewTabHyperlink from '../NewTabHyperlink';

export default function ContactCard({ name, role, email, etisUrl, icon }) {
  return (
    <Box className="contact-box">
      <Box className="icon-box">
        {icon
          ? <img className="contact-image"
                 src={icon}
                 alt={name} />
          :
          <Box className="contact-image contact-image-placeholder">
            <Person />
          </Box>
        }
      </Box>
      <Box>
        <Box className="name-box">{name}</Box>
        <Box className="info-box">
          <div><b>Amet:</b> {role}</div>
          <div><b>E-post:</b> {email}</div>
          {etisUrl &&
            <div className="etis-container">
              <NewTabHyperlink path={etisUrl}
                               content={<img src={etisLogo} alt="ETIS" />}
                               className="etis-link" />
            </div>
          }
        </Box>
      </Box>
    </Box>
  );
}
