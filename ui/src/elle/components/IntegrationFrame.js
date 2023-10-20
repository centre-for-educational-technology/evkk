import React, {useEffect, useRef, useState} from 'react';
import {selectIntegrationPath} from "../../rootSelectors";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";
import {queryStore} from "../store/QueryStore";
import {loadFetch} from "../service/LoadFetch";

const IntegrationFrame = ({integrationName}) => {
  const path = useSelector(state => selectIntegrationPath(integrationName)(state), []);
  const [height, setHeight] = useState("");
  const iframeRef = useRef();
  const [storeData, setStoreData] = useState("");

  useEffect(() => {
    const iframe = iframeRef.current;
    iframe.contentWindow.postMessage(storeData, '*');
  }, [storeData, height]);

  useEffect(() => {
    postRequest();
  }, []);

  queryStore.subscribe(() => {
    postRequest();
  });

  window.addEventListener('message', function (event) {
    setHeight((event.data + 100) + "px");
  });

  const postRequest = () => {
    const queryStoreState = queryStore.getState();
    if (queryStoreState.corpusTextIds) {
      loadFetch('/api/texts/kysitekstid', {
        method: 'POST',
        body: JSON.stringify({ids: queryStoreState.corpusTextIds}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.text())
        .then(result => {
          if (queryStoreState.ownTexts) {
            result = result.concat(" ", queryStoreState.ownTexts)
          }
          setStoreData(result.replaceAll('\\n\\n', ' ').replaceAll('\\n', ' ').replaceAll('&quot;', '"'))
        });
    }
  };

  return (
    <Box className="embed-responsive embed-responsive-21by9 overflow-hidden" height={height}>
      <iframe ref={iframeRef} src={path} title={integrationName}/>
    </Box>
  );
};

export default IntegrationFrame;
