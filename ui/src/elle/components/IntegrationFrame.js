import React, {useState} from 'react';
import {selectIntegrationPath} from "../../rootSelectors";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";

const IntegrationFrame = ({integrationName}) => {

  const path = useSelector(state => selectIntegrationPath(integrationName)(state), []);
  const [height, setHeight] = useState("");

  window.addEventListener('message', function (event) {
    setHeight((event.data + 100) + "px");
  });

  return (
    <Box className="embed-responsive embed-responsive-21by9 overflow-hidden" height={height} width={"100%"}>
      <iframe src={path} title={integrationName}/>
    </Box>
  );
};

export default IntegrationFrame;
