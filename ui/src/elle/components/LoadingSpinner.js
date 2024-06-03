import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadingEmitter } from '../../App';
import { DefaultCircularProgressStyle } from '../const/Constants';

export default function LoadingSpinner() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLoaderStart = () => setLoading(true);
    const handleLoaderEnd = () => setLoading(false);

    loadingEmitter.on(LoadingSpinnerEventType.LOADER_START, handleLoaderStart);
    loadingEmitter.on(LoadingSpinnerEventType.LOADER_END, handleLoaderEnd);

    return () => {
      loadingEmitter.off(LoadingSpinnerEventType.LOADER_START, handleLoaderStart);
      loadingEmitter.off(LoadingSpinnerEventType.LOADER_END, handleLoaderEnd);
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

export const LoadingSpinnerEventType = {
  LOADER_START: 'loader-start',
  LOADER_END: 'loader-end'
};
