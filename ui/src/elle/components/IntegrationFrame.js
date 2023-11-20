import React, { useEffect, useRef, useState } from 'react';
import { selectIntegrationPath } from '../../rootSelectors';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { queryStore } from '../store/QueryStore';
import { toolsPopulatePostQuery } from '../service/TextService';

const IntegrationFrame = ({integrationName}) => {
  const path = useSelector(state => selectIntegrationPath(integrationName)(state), []);
  const [height, setHeight] = useState('');
  const iframeRef = useRef();
  const [storeData, setStoreData] = useState('');

  useEffect(() => {
    const iframe = iframeRef.current;
    iframe.contentWindow.postMessage(storeData, '*');
  }, [storeData, height]);

  useEffect(() => {
    toolsPopulatePostQuery(setStoreData);
  }, []);

  queryStore.subscribe(() => {
    toolsPopulatePostQuery(setStoreData);
  });

  window.addEventListener('message', function (event) {
    setHeight((event.data + 100) + 'px');
  });

  return (
    <Box className="embed-responsive embed-responsive-21by9 overflow-hidden" height={height}>
      <iframe ref={iframeRef} src={path} title={integrationName}/>
    </Box>
  );
};

export default IntegrationFrame;
