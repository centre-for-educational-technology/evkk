import React, {useEffect, useRef, useState} from 'react';
import {selectIntegrationPath} from "../../rootSelectors";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";
import {queryStore} from "../store/QueryStore";
import {loadFetch} from "../service/LoadFetch";

const IntegrationFrame = ({integrationName}) => {

  const path = useSelector(state => selectIntegrationPath(integrationName)(state), []);
  const [height, setHeight] = useState("");
  const iframeRef = useRef()
  const [storeData, setStoreData] = useState("");

  useEffect(() => {
    const queryStoreState = queryStore.getState();
    if (queryStoreState.corpusTextIds) {
      const storeData = {};
      storeData.ids = queryStoreState.corpusTextIds;
      console.log(storeData)
      loadFetch('/api/texts/kysitekstid', {
        method: 'GET',
        body: storeData,
        headers: {
          Accept: 'application/json'
        }
      }).then(res => res.json()).then(result => console.log(result))
    } else if (queryStoreState.ownTexts) {
      setStoreData(queryStoreState.ownTexts)
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current
    iframe.contentWindow.postMessage(storeData, '*')
  }, [storeData]);

  queryStore.subscribe(() => {
    const queryStoreState = queryStore.getState();
    if (queryStoreState.corpusTextIds) {
      const storeData = {};
      storeData.ids = queryStoreState.corpusTextIds;
      console.log(storeData)
      loadFetch('/api/texts/kysitekstid', {
        method: 'GET',
        body: storeData,
        headers: {
          Accept: 'application/json'
        }
      })
    } else if (queryStoreState.ownTexts) {
      setStoreData(queryStoreState.ownTexts)
    }
  });

  window.addEventListener('message', function (event) {
    setHeight((event.data + 100) + "px");
  });

  return (
    <Box className="embed-responsive embed-responsive-21by9 overflow-hidden" height={height}>
      <iframe ref={iframeRef} src={path} title={integrationName}/>
    </Box>
  );
};

export default IntegrationFrame;
