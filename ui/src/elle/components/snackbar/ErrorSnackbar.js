import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { errorEmitter } from '../../../App';
import '../styles/ErrorSnackbar.css';

export default function ErrorSnackbar() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('error_generic_server_error');
  const { t } = useTranslation();

  const handleEvent = typeValue => {
    setSnackbarOpen(true);
    setErrorMessage(typeValue);
  };

  useEffect(() => {
    Object.values(ErrorSnackbarEventType).forEach(eventTypeValue => {
      errorEmitter.on(eventTypeValue, () => handleEvent(eventTypeValue));
    });

    return () => {
      Object.values(ErrorSnackbarEventType).forEach(eventTypeValue => {
        errorEmitter.off(eventTypeValue, () => handleEvent(eventTypeValue));
      });
    };
  }, []);

  const handleSnackbarClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar open={snackbarOpen}
      autoHideDuration={10000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose}
        className="error-alert"
        severity="error">
        {t(errorMessage)}
      </Alert>
    </Snackbar>
  );
}

export const ErrorSnackbarEventType = {
  FORBIDDEN: 'error_forbidden',
  GENERIC_ERROR: 'error_generic_server_error',
  ID_CODE_MISSING: 'error_id_code_missing',
  LOGIN_FAILED: 'error_login_failed',
  TOO_MANY_REQUESTS: 'error_too_many_requests',
  UNAUTHORIZED: 'error_unauthorized',
  UNSUPPORTED_MIMETYPE: 'error_unsupported_mimetype',
  INVALID_LINK: 'error_invalid_link',
//  FAILED_TO_SAVE_FILE: 'error_failed_to_save_file'
};
