import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { successEmitter } from '../../App';

export default function SuccessSnackbar() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {t} = useTranslation();
  successEmitter.on('generic-success', () => setSnackbarOpen(true));

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
             severity="success">
        {t('generic_success')}
      </Alert>
    </Snackbar>
  );
}
