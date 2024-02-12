import React, { useState } from 'react';
import '../styles/InfoElement.css';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfoElementTabCard from './InfoElementTabCard';
import { ElleOuterDivStyle } from '../../const/Constants';
import i18n from 'i18next';
import wordlistImgEt from '../../resources/images/home/sonaloend_et.png';
import wordlistImgEn from '../../resources/images/home/sonaloend_en.png';
import wordcontextImgEt from '../../resources/images/home/sonakontekstis_et.png';
import wordcontextImgEn from '../../resources/images/home/sonakontekstis_en.png';
import collocateImgEt from '../../resources/images/home/naabersonad_et.png';
import collocateImgEn from '../../resources/images/home/naabersonad_en.png';
import analyserImgEt from '../../resources/images/home/sonaanalyys_et.png';
import analyserImgEn from '../../resources/images/home/sonaanalyys_en.png';
import textRaterImg from '../../resources/images/home/tekstihindaja.png';
import textQueryImgEt from '../../resources/images/home/paring_et.png';
import textQueryImgEn from '../../resources/images/home/paring_en.png';
import wordPatternImg from '../../resources/images/home/mustrileidja.png';

export default function InfoElement() {

  const {t} = useTranslation();
  const [openTab, setOpenTab] = useState('corrector-tab-card');
  const [wordlistImg, setWordlistImg] = useState(i18n.language === 'ET' ? wordlistImgEt : wordlistImgEn);
  const [wordcontextImg, setWordcontextImg] = useState(i18n.language === 'ET' ? wordcontextImgEt : wordcontextImgEn);
  const [collocateImg, setCollocateImg] = useState(i18n.language === 'ET' ? collocateImgEt : collocateImgEn);
  const [analyserImg, setAnalyserImg] = useState(i18n.language === 'ET' ? analyserImgEt : analyserImgEn);
  const [textQueryImg, setTextQueryImg] = useState(i18n.language === 'ET' ? textQueryImgEt : textQueryImgEn);
  const [imageSelected, setImageSelected] = useState(1);
  const [infoOpacity, setInfoOpacity] = useState(1);
  const images = [textRaterImg, textQueryImg, wordlistImg, wordcontextImg, collocateImg, wordPatternImg, analyserImg];

  i18n.on('languageChanged', () => {
    if (i18n.language === 'ET') {
      setWordlistImg(wordlistImgEt);
      setWordcontextImg(wordcontextImgEt);
      setCollocateImg(collocateImgEt);
      setAnalyserImg(analyserImgEt);
      setTextQueryImg(textQueryImgEt);
    } else {
      setWordlistImg(wordlistImgEn);
      setWordcontextImg(wordcontextImgEn);
      setCollocateImg(collocateImgEn);
      setAnalyserImg(analyserImgEn);
      setTextQueryImg(textQueryImgEn);
    }
  });

  const descriptionText = {
    1: <p><b>{t('homepage_box_corrector_title')}</b> {t('homepage_box_corrector_content')}</p>,
    2: <p><b>{t('homepage_box_query_title')}</b> {t('homepage_box_query_content')}</p>,
    3: <p><b>{t('homepage_box_wordlist_title')}</b> {t('homepage_box_wordlist_content')}</p>,
    4: <p><b>{t('homepage_box_concordances_title')}</b> {t('homepage_box_concordances_content')}</p>,
    5: <p><b>{t('homepage_box_neighbouring_words_title')}</b> {t('homepage_box_neighbouring_words_content')}</p>,
    6: <p><b>{t('homepage_box_clusters_title')}</b> {t('homepage_box_clusters_content')}</p>,
    7: <p><b>{t('homepage_box_word_analysis_title')}</b> {t('homepage_box_word_analysis_content')}</p>
  };

  return (
    <Box id="elle-tools"
         sx={ElleOuterDivStyle}
         className="info-element-container"
         onMouseLeave={() => setInfoOpacity(0)}
    >
      <Box className="info-element-inner">
        <Box className="info-tool-title">
          <h2>{t('tools_title')}</h2>
        </Box>
        <Box className="elle-tools">
          <InfoElementTabCard
            setInfoOpacity={setInfoOpacity}
            opacity={infoOpacity}
            toolID={'corrector-tab-card'}
            toolTitle={t('common_corrector')}
            tabOpen={openTab}
            toolInnerId={'corrector-info-popup'}
            description={descriptionText[1]}
            setOpenTab={setOpenTab}
            setImageSelected={setImageSelected}
            imageNo={1}
            tabReference={null}
            linkTo={'/corrector'}
          />
          <InfoElementTabCard
            setInfoOpacity={setInfoOpacity}
            opacity={infoOpacity}
            toolID={'text-query-btn'}
            toolTitle={t('common_query')}
            tabOpen={openTab}
            toolInnerId={'text-query-btn-box'}
            description={descriptionText[2]}
            setOpenTab={setOpenTab}
            setImageSelected={setImageSelected}
            imageNo={2}
            tabReference={'queryOpen'}
            linkTo={'/tools'}
          />
          <InfoElementTabCard
            setInfoOpacity={setInfoOpacity}
            opacity={infoOpacity}
            toolID={'wordlist-tab-card'}
            toolTitle={t('common_wordlist')}
            toolInnerId={'wordlist-info-popup'}
            tabOpen={openTab}
            description={descriptionText[3]}
            setOpenTab={setOpenTab}
            setImageSelected={setImageSelected}
            imageNo={3}
            tabReference={'1'}
            linkTo={'/tools/wordlist'}
          />
          <InfoElementTabCard
            setInfoOpacity={setInfoOpacity}
            opacity={infoOpacity}
            toolID={'word-context-tab-card'}
            toolTitle={t('common_word_in_context')}
            tabOpen={openTab}
            toolInnerId={'word-context-info-popup'}
            description={descriptionText[4]}
            setOpenTab={setOpenTab}
            setImageSelected={setImageSelected}
            imageNo={4}
            tabReference={'2'}
            linkTo={'/tools/wordcontext'}
          />
          <InfoElementTabCard
            setInfoOpacity={setInfoOpacity}
            opacity={infoOpacity}
            toolID={'neighbouring-word-tab-card'}
            toolTitle={t('common_neighbouring_words')}
            tabOpen={openTab}
            toolInnerId={'neighbouring-word-info-popup'}
            description={descriptionText[5]}
            setOpenTab={setOpenTab}
            setImageSelected={setImageSelected}
            imageNo={5}
            tabReference={'3'}
            linkTo={'/tools/collocates'}
          />
          <InfoElementTabCard
            setInfoOpacity={setInfoOpacity}
            opacity={infoOpacity}
            toolID={'cluster-finder-tab-card'}
            toolTitle={t('common_clusters')}
            tabOpen={openTab}
            toolInnerId={'cluster-finder-info-popup'}
            description={descriptionText[6]}
            setOpenTab={setOpenTab}
            setImageSelected={setImageSelected}
            imageNo={6}
            tabReference={'5'}
            linkTo={'/tools/clusterfinder'}
          />
          <InfoElementTabCard
            setInfoOpacity={setInfoOpacity}
            opacity={infoOpacity}
            toolID={'word-analyser-tab-card'}
            toolTitle={t('common_word_analyser')}
            tabOpen={openTab}
            toolInnerId={'word-analyser-info-popup'}
            description={descriptionText[7]}
            setOpenTab={setOpenTab}
            setImageSelected={setImageSelected}
            imageNo={7}
            tabReference={'4'}
            linkTo={'/tools/wordanalyser'}
          />
        </Box>
        {/*TODO videod tööle panna, kui videod valmis*/}
        <Box className="info-video">
          <img className="info-image" src={images[imageSelected - 1]} alt="Tööriista pilt"/>
          {/*  <video
            className={"info-video-styling w-100"}
            controls
            src={word_analyzer_video}
            autoPlay
            preload
          />
          <Box className="video-overlay">
            <PlayCircleIcon className="play-button-info"/>
            <Box className="position-relative font-weight-bold elle-medium-text tools-video-text">
              <p className="text-uppercase">{t('tools_video_text')}</p>
            </Box>
          </Box>*/}
        </Box>
      </Box>
    </Box>
  );
};
