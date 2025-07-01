import React from 'react';
import { Button } from '@mui/material';
import './styles/DonateText.css';
import BackupIcon from '@mui/icons-material/Backup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RouteConstants } from '../../AppRoutes';
import { donationSideButtonEnabledPaths } from '../const/Constants';

export default function DonateText() {
  const navigate = useNavigate();
  const current = useLocation();
  const { t } = useTranslation();

  if (!Object.values(donationSideButtonEnabledPaths).includes(current.pathname)) {
    return null;
  }

  return (
    <Button
      variant="contained"
      id="donate-text-button"
      className={`donate-text-button ${current.pathname === '/' ? 'home-page' : 'corrector'}`}
      onClick={() => {
        navigate(RouteConstants.ADDING);
      }}
    >
      <BackupIcon className="donate-text-icon" />
      <span className="donate-text-font">
        {t('common_donate_text')}
      </span>
    </Button>
  );
};
