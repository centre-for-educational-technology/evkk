import { Box } from '@mui/material';
import { Person } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import '../styles/ContactCard.css';
import etisLogo from '../../resources/images/misc/etis_logo.svg';
import NewTabHyperlink from '../NewTabHyperlink';

export default function ContactCard({ name, degree, degreeInProgress, role, email, etisUrl, icon }) {
  const { t } = useTranslation();

  return (
    <Box className="contact-box">
      <Box className="icon-box">
        {icon
          ? <img className="contact-image"
                 src={icon}
                 alt={name} />
          : <Box className="contact-image contact-image-placeholder">
            <Person />
          </Box>
        }
      </Box>
      <Box>
        <Box className="name-box">
          {name}, {degreeInProgress ? t('people_degree_in_progress', { degree }) : degree}
        </Box>
        <Box className="info-box">
          <div><b>{t('people_role')}:</b> {t(role)}</div>
          <div><b>{t('people_email')}:</b> {email}</div>
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
