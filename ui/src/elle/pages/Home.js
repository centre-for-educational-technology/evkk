import * as React from 'react';
import {Box} from '@mui/material';
import './styles/Home.css';
import HeroElement from "../components/home/HeroElement";
import ServicesElement from "../components/home/ServicesElement";
import InfoElement from "../components/home/InfoElement";
import StatisticsElement from "../components/home/StatisticsElement";

export default function Home() {
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
