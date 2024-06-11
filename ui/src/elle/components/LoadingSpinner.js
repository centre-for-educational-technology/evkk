import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loadingEmitter } from '../../App';
import { DefaultCircularProgressStyle } from '../const/Constants';

export default function LoadingSpinner() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLoaderStart = () => setLoading(true);
    const handleLoaderEnd = () => setLoading(false);

    loadingEmitter.on('loader-start', handleLoaderStart);
    loadingEmitter.on('loader-end', handleLoaderEnd);

    return () => {
      loadingEmitter.off('loader-start', handleLoaderStart);
      loadingEmitter.off('loader-end', handleLoaderEnd);
    };
  }, []);

  return (
    <Backdrop
      style={ { zIndex: '9999' } }
      open={ loading }
    >
      <CircularProgress style={ DefaultCircularProgressStyle }
                        thickness={ 4 }
                        size="8rem"/>
    </Backdrop>
  );
}
