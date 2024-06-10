import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { logout, renew } from '../../service/AuthService';
import ModalBase from './ModalBase';
import { useTranslation } from 'react-i18next';
import { DefaultButtonStyle } from '../../const/Constants';
import { Button } from '@mui/material';
import '../styles/SessionExpirationModal.css';
import RootContext from '../../context/RootContext';

export default function SessionExpirationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(5);
  const timerId = useRef();
  const { t } = useTranslation();
  const { accessToken } = useContext(RootContext);

  const initTimeoutOrLogout = useCallback(() => {
    if (!accessToken) return;

    const jwtPayload = JSON.parse(atob(accessToken.split('.')[1]));
    const expirationTime = jwtPayload.exp * 1000;
    const dateNow = Date.now();
    const timeoutDuration = expirationTime - dateNow - 5 * 60 * 1000; // 5 minutes before expiration

    if (timeoutDuration > 0) {
      timerId.current = setTimeout(() => {
        setIsOpen(true);
        updateMinutesLeft(expirationTime);
      }, timeoutDuration);
    } else if (dateNow < expirationTime) {
      setIsOpen(true);
      updateMinutesLeft(expirationTime);
    }
  }, [accessToken]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!accessToken) return;

      const jwtPayload = JSON.parse(atob(accessToken.split('.')[1]));
      const expirationTime = jwtPayload.exp * 1000;

      updateMinutesLeft(expirationTime);
      if (Date.now() > expirationTime) {
        setIsOpen(false);
        logout(true);
        clearInterval(intervalId);
      }
    }, 3000);

    initTimeoutOrLogout();

    return () => clearInterval(intervalId);
  }, [initTimeoutOrLogout, accessToken]);

  const updateMinutesLeft = (expirationTime) => {
    const minutes = Math.max(0, Math.ceil((expirationTime - Date.now()) / 60000));
    setMinutesLeft(minutes);
  };

  const handleExtendSession = async () => {
    await renew();
    setIsOpen(false);
    clearTimeout(timerId.current);
    initTimeoutOrLogout();
  };

  return (
    <ModalBase
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      disableComfortClosing={true}
      innerClassName="session-expiration-modal"
      title="session_expiration_modal_title"
    >
      {t('session_expiration_modal_content_1', {
        minutesLeft,
        unit: minutesLeft === 1 ? t('session_expiration_modal_unit_singular') : t('session_expiration_modal_unit_plural')
      })}
      <br />
      {t('session_expiration_modal_content_2')}
      <br /><br />
      <Button
        style={DefaultButtonStyle}
        variant="contained"
        onClick={handleExtendSession}
      >
        {t('session_expiration_modal_renew')}
      </Button>
    </ModalBase>
  );
};
