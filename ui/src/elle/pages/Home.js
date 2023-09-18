import * as React from 'react';
import {useState} from 'react';
import analyserImgEt from '../resources/images/home/sonaanalyys_et.png';
import analyserImgEn from '../resources/images/home/sonaanalyys_en.png';
import wordlistImgEt from '../resources/images/home/sonaloend_et.png';
import wordlistImgEn from '../resources/images/home/sonaloend_en.png';
import wordcontextImgEt from '../resources/images/home/sonakontekstis_et.png';
import wordcontextImgEn from '../resources/images/home/sonakontekstis_en.png';
import collocateImgEt from '../resources/images/home/naabersonad_et.png';
import collocateImgEn from '../resources/images/home/naabersonad_en.png';
import {Box} from '@mui/material';
import './styles/Home.css';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';
import HeroElement from "../components/HeroElement";
import ServicesElement from "../components/ServicesElement";
import InfoElement from "../components/InfoElement";
import StatisticsElement from "../components/StatisticsElement";

function Home() {
  const {t} = useTranslation();
  const summaryTexts = ['homepage_summary_text_1', 'homepage_summary_text_2', 'homepage_summary_text_3', 'homepage_summary_text_4'];
  const [wordlistImg, setWordlistImg] = useState(i18n.language === 'ET' ? wordlistImgEt : wordlistImgEn);
  const [wordcontextImg, setWordcontextImg] = useState(i18n.language === 'ET' ? wordcontextImgEt : wordcontextImgEn);
  const [collocateImg, setCollocateImg] = useState(i18n.language === 'ET' ? collocateImgEt : collocateImgEn);
  const [analyserImg, setAnalyserImg] = useState(i18n.language === 'ET' ? analyserImgEt : analyserImgEn);
  const [imageSelected, setImageSelected] = useState(1)

  i18n.on('languageChanged', () => {
    if (i18n.language === 'ET') {
      setWordlistImg(wordlistImgEt);
      setWordcontextImg(wordcontextImgEt);
      setCollocateImg(collocateImgEt);
      setAnalyserImg(analyserImgEt);
    } else {
      setWordlistImg(wordlistImgEn);
      setWordcontextImg(wordcontextImgEn);
      setCollocateImg(collocateImgEn);
      setAnalyserImg(analyserImgEn);
    }
  });

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
