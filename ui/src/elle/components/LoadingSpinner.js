import { Backdrop, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { loadingEmitter } from '../../App';

export default function LoadingSpinner() {

  const [loading, setLoading] = useState(false);
  loadingEmitter.on('loader-start', () => setLoading(true));
  loadingEmitter.on('loader-end', () => setLoading(false));

  return (
    <Backdrop
      style={{zIndex: '9999'}}
      open={loading}
    >
      <CircularProgress thickness={4}
                        size="8rem"/>
    </Backdrop>
  );
}
