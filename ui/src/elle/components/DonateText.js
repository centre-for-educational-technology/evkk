import React from 'react';
import { Button } from '@mui/material';
import './styles/DonateText.css';
import BackupIcon from '@mui/icons-material/Backup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RouteConstants } from '../../AppRoutes';

export default function DonateText() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Button
      variant="contained"
      id="donate-text-button"
      className="donate-text-button"
      onClick={() => {
        navigate(RouteConstants.ADDING);
      }}
    >
      <BackupIcon className="donate-text-icon"/>
      <span className="donate-text-font">
        {t('common_donate_text')}
      </span>
    </Button>
  );
};
