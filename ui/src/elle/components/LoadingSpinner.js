import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadingEmitter } from '../../App';
import { DefaultCircularProgressStyle } from '../const/StyleConstants';

export default function LoadingSpinner() {

  const [loading, setLoading] = useState(false);
  const [shrinkDisabled, setShrinkDisabled] = useState(false);

  useEffect(() => {
    const handleLoaderStart = (disableShrink) => {
      setShrinkDisabled(disableShrink);
      setLoading(true);
    };

    const handleLoaderEnd = () => setLoading(false);

    loadingEmitter.on(LoadingSpinnerEventType.LOADER_START, () => handleLoaderStart(false));
    loadingEmitter.on(LoadingSpinnerEventType.LOADER_START_SHRINK_DISABLED, () => handleLoaderStart(true));
    loadingEmitter.on(LoadingSpinnerEventType.LOADER_END, handleLoaderEnd);

    return () => {
      loadingEmitter.off(LoadingSpinnerEventType.LOADER_START, () => handleLoaderStart(false));
      loadingEmitter.off(LoadingSpinnerEventType.LOADER_START_SHRINK_DISABLED, () => handleLoaderStart(true));
      loadingEmitter.off(LoadingSpinnerEventType.LOADER_END, handleLoaderEnd);
    };
  }, []);

  return (
    <Backdrop
      style={{ zIndex: '9999' }}
      open={loading}
    >
      <CircularProgress style={DefaultCircularProgressStyle}
                        disableShrink={shrinkDisabled}
                        thickness={4}
                        size="8rem" />
    </Backdrop>
  );
}

export const LoadingSpinnerEventType = {
  LOADER_START: 'loader-start',
  LOADER_START_SHRINK_DISABLED: 'loader-start-shrink-disabled',
  LOADER_END: 'loader-end'
};
