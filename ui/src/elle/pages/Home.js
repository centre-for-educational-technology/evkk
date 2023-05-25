import * as React from 'react';
import { useState } from 'react';
import HomeCard from '../components/HomeCard';
import analyserImgEt from '../resources/images/home/sonaanalyys_et.png';
import analyserImgEn from '../resources/images/home/sonaanalyys_en.png';
import correctorImg from '../resources/images/home/tekstihindaja.png';
import elleMockupImg from '../resources/images/home/elle-mockup.jpg';
import clusterfinderImg from '../resources/images/home/mustrileidja.png';
import queryImg from '../resources/images/home/paring.png';
import wordlistImgEt from '../resources/images/home/sonaloend_et.png';
import wordlistImgEn from '../resources/images/home/sonaloend_en.png';
import wordcontextImgEt from '../resources/images/home/sonakontekstis_et.png';
import wordcontextImgEn from '../resources/images/home/sonakontekstis_en.png';
import collocateImgEt from '../resources/images/home/naabersonad_et.png';
import collocateImgEn from '../resources/images/home/naabersonad_en.png';
import SchoolIcon from '@mui/icons-material/School';
import { Avatar, Box, Card, Typography } from '@mui/material';
import './styles/Home.css';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

function Home() {
  const {t} = useTranslation();
  const summaryTexts = ['homepage_summary_text_1', 'homepage_summary_text_2', 'homepage_summary_text_3', 'homepage_summary_text_4'];
  const [wordlistImg, setWordlistImg] = useState(i18n.language === 'ET' ? wordlistImgEt : wordlistImgEn);
  const [wordcontextImg, setWordcontextImg] = useState(i18n.language === 'ET' ? wordcontextImgEt : wordcontextImgEn);
  const [collocateImg, setCollocateImg] = useState(i18n.language === 'ET' ? collocateImgEt : collocateImgEn);
  const [analyserImg, setAnalyserImg] = useState(i18n.language === 'ET' ? analyserImgEt : analyserImgEn);

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
    <div style={{paddingBottom: '5%'}}>
      <h2 className="home-title">{t('homepage_title')}</h2>

      <Card className="home-mockup-card">
        <Box className="home-mockup-card-box">
          <Box width="30%">
            <img width="100%" src={elleMockupImg} alt="ELLE mockup"/>
          </Box>
          <Box className="home-mockup-card-textbox">
            <Typography className="home-mockup-card-typography">{t('homepage_title_explainer')}</Typography>
          </Box>
        </Box>
      </Card>

      <Card className="home-summary-card">
        <Box className="home-summary-card-title-box">
          <Typography className="home-summary-card-title-typography">{t('homepage_summary_title')}</Typography>
        </Box>
        <Box className="home-summary-card-content-box">
          {summaryTexts.map((text) => (
            <Box key={text} className="home-summary-card-content-box-inner-1">
              <Box className="home-summary-card-content-box-inner-2">
                <Box className="home-summary-card-avatar-box">
                  <Avatar className="home-summary-card-avatar">
                    <SchoolIcon/>
                  </Avatar>
                </Box>
                <Box className="home-summary-card-content-textbox">
                  <Typography className="home-summary-card-content-typography">{t(text)}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Card>

      <HomeCard image={correctorImg}
                order={2}
                title={'homepage_box_corrector_title'}
                text={'homepage_box_corrector_content'}
                linkTo={'/corrector'}/>
      <HomeCard image={queryImg}
                order={1}
                title={'homepage_box_query_title'}
                text={'homepage_box_query_content'}
                linkTo={'/tools?openQuery=true'}/>
      <HomeCard image={wordlistImg}
                order={2}
                title={'homepage_box_wordlist_title'}
                text={'homepage_box_wordlist_content'}
                linkTo={'/tools/wordlist'}/>
      <HomeCard image={wordcontextImg}
                order={1}
                title={'homepage_box_concordances_title'}
                text={'homepage_box_concordances_content'}
                linkTo={'/tools/wordcontext'}/>
      <HomeCard image={collocateImg}
                order={2}
                title={'homepage_box_neighbouring_words_title'}
                text={'homepage_box_neighbouring_words_content'}
                linkTo={'/tools/collocates'}/>
      <HomeCard image={clusterfinderImg}
                order={1}
                title={'homepage_box_clusters_title'}
                text={'homepage_box_clusters_content'}
                linkTo={'/tools/clusterfinder'}/>
      <HomeCard image={analyserImg}
                order={2}
                title={'homepage_box_word_analysis_title'}
                text={'homepage_box_word_analysis_content'}
                linkTo={'/tools/wordanalyser'}/>
    </div>
  );
}

export default Home;
