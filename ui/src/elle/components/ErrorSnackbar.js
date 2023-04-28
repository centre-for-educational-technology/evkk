import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { errorEmitter } from '../../App';

export default function ErrorSnackbar() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {t} = useTranslation();
  errorEmitter.on('generic-error', () => setSnackbarOpen(true));

  const handleSnackbarClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar open={snackbarOpen}
              autoHideDuration={6000}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose}
             className="error-alert"
             severity="error">
        {t('error_generic_server_error')}
      </Alert>
    </Snackbar>
  );
}
