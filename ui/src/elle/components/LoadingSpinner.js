import { Backdrop, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { loadingEmitter } from '../../App';
import { DefaultCircularProgressStyle } from '../const/Constants';

export default function LoadingSpinner() {

  const [loading, setLoading] = useState(false);
  loadingEmitter.on(LoadingSpinnerEventType.LOADER_START, () => setLoading(true));
  loadingEmitter.on(LoadingSpinnerEventType.LOADER_END, () => setLoading(false));

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
