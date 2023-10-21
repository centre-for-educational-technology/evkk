import React from 'react';
import IntegrationFrame from "../components/IntegrationFrame";
import {Box} from "@mui/material";

export default function ClusterFinder() {

  return (
    <Box style={{marginTop: "5vh", width: window.innerWidth / 1.8}}>
      <IntegrationFrame integrationName={'clusterFinder'}/>
    </Box>

  )

}


