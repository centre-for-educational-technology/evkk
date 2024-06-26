import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadingEmitter } from '../../App';
import { DefaultCircularProgressStyle } from '../const/Constants';

export default function LoadingSpinner() {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const startListener = () => setLoading(true);
    const endListener = () => setLoading(false);

    loadingEmitter.on('loader-start', startListener);
    loadingEmitter.on('loader-end', endListener);

    // Cleanup function to remove listeners on component unmount
    return () => {
      loadingEmitter.removeListener('loader-start', startListener);
      loadingEmitter.removeListener('loader-end', endListener);
    };
  }, []);

  return (
    <Backdrop
      style={{ zIndex: '9999' }}
      open={loading}
    >
      <CircularProgress style={DefaultCircularProgressStyle}
                        thickness={4}
                        size="8rem" />
    </Backdrop>
  );
}
