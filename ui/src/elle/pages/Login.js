import { useTranslation } from 'react-i18next';
import React from 'react';
import './styles/Login.css';

export default function Login() {

  const { t } = useTranslation();

  const handleClick = () => {
    // todo add logic for harid redirect
  };

  return (
    <div>
      <h2 className="tool-title">{t('common_login_for_admins')}</h2>
      <img
        src={require('../resources/images/misc/harid_logo.png').default}
        alt="HarID logo"
        onClick={handleClick}
        className="harid-image"
      />
    </div>
  );
}
