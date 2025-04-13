import * as React from 'react';
import { Box } from '@mui/material';
import './styles/Home.css';
import HeroElement from '../components/home/HeroElement';
import ServicesElement from '../components/home/ServicesElement';
import InfoElement from '../components/home/InfoElement';
import StatisticsElement from '../components/home/StatisticsElement';

export default function Home() {
  return (
    <div>
      <Box className="home-root-box">
        <HeroElement />
        <ServicesElement />
        <Box id="tools" />
        <InfoElement />
        <StatisticsElement />
      </Box>
    </div>
  );
}
