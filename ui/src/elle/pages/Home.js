import * as React from 'react';
import {Box} from '@mui/material';
import './styles/Home.css';
import HeroElement from "../components/HeroElement";
import ServicesElement from "../components/ServicesElement";
import InfoElement from "../components/InfoElement";
import StatisticsElement from "../components/StatisticsElement";

function Home() {
  return (
    <div>
      <Box marginBottom="100px">
        <HeroElement/>
        <ServicesElement/>
        <Box id="scroll-anchor"></Box>
        <InfoElement/>
        <StatisticsElement/>
      </Box>
    </div>
  );
}

export default Home;
