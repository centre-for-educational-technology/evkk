import React, {useState} from 'react';
import './styles/InfoElement.css'
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";
import InfoElementTabCard from "./InfoElementTabCard";
import {ElleOuterDivStyle} from "../const/Constants";
import i18n from "i18next";
import wordlistImgEt from "../resources/images/home/sonaloend_et.png";
import wordlistImgEn from "../resources/images/home/sonaloend_en.png";
import wordcontextImgEt from "../resources/images/home/sonakontekstis_et.png";
import wordcontextImgEn from "../resources/images/home/sonakontekstis_en.png";
import collocateImgEt from "../resources/images/home/naabersonad_et.png";
import collocateImgEn from "../resources/images/home/naabersonad_en.png";
import analyserImgEt from "../resources/images/home/sonaanalyys_et.png";
import analyserImgEn from "../resources/images/home/sonaanalyys_en.png";
import textRaterImg from "../resources/images/home/tekstihindaja.png"
import textQueryImg from "../resources/images/home/paring.png"
import wordPatternImg from "../resources/images/home/mustrileidja.png"

const InfoElement = () => {

  const {t} = useTranslation();
  const [openTab, setOpentab] = useState("corrector-tab-card");
  const [wordlistImg, setWordlistImg] = useState(i18n.language === 'ET' ? wordlistImgEt : wordlistImgEn);
  const [wordcontextImg, setWordcontextImg] = useState(i18n.language === 'ET' ? wordcontextImgEt : wordcontextImgEn);
  const [collocateImg, setCollocateImg] = useState(i18n.language === 'ET' ? collocateImgEt : collocateImgEn);
  const [analyserImg, setAnalyserImg] = useState(i18n.language === 'ET' ? analyserImgEt : analyserImgEn);
  const [imageSelected, setImageSelected] = useState(1);
  const images = [textRaterImg, textQueryImg, wordlistImg, wordcontextImg, collocateImg, wordPatternImg, analyserImg];

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
    <Box id="elle-tools" sx={ElleOuterDivStyle} className="info-element-container">
      <Box className="info-element-inner">
        <Box className="info-tool-title">
          <h2>{t('tools_title')}</h2>
        </Box>
        <Box className="elle-tools">
          <InfoElementTabCard
            toolID={"corrector-tab-card"}
            toolTitile={t('common_corrector')}
            tabOpen={openTab}
            toolInnerId={"corrector-info-popup"}
            description={descriptionText[1]}
            setOpenTab={setOpentab}
            setImageSelected={setImageSelected}
            imageNo={1}
            tabReference={null}
            linkTo={'/corrector'}
          />
          <InfoElementTabCard
            toolID={"text-query-btn"}
            toolTitile={t('common_query')}
            tabOpen={openTab}
            toolInnerId={"text-query-btn-box"}
            description={descriptionText[2]}
            setOpenTab={setOpentab}
            setImageSelected={setImageSelected}
            imageNo={2}
            tabReference={null}
            linkTo={'/tools'}
          />
          <InfoElementTabCard
            toolID={"wordlist-tab-card"}
            toolTitile={t('common_wordlist')}
            toolInnerId={"wordlist-info-popup"}
            tabOpen={openTab}
            description={descriptionText[3]}
            setOpenTab={setOpentab}
            setImageSelected={setImageSelected}
            imageNo={3}
            tabReference={'1'}
            linkTo={'/tools'}
          />
          <InfoElementTabCard
            toolID={"word-context-tab-card"}
            toolTitile={t('common_word_in_context')}
            tabOpen={openTab}
            toolInnerId={"word-context-info-popup"}
            description={descriptionText[4]}
            setOpenTab={setOpentab}
            setImageSelected={setImageSelected}
            imageNo={4}
            tabReference={'2'}
            linkTo={'/tools'}
          />
          <InfoElementTabCard
            toolID={"neighbour-word-tab-card"}
            toolTitile={t('common_neighbouring_words')}
            tabOpen={openTab}
            toolInnerId={"neighbour-word-info-popup"}
            description={descriptionText[5]}
            setOpenTab={setOpentab}
            setImageSelected={setImageSelected}
            imageNo={5}
            tabReference={'3'}
            linkTo={'/tools'}
          />
          <InfoElementTabCard
            toolID={"cluster-finder-tab-card"}
            toolTitile={t('common_clusters')}
            tabOpen={openTab}
            toolInnerId={"cluster-finder-info-popup"}
            description={descriptionText[6]}
            setOpenTab={setOpentab}
            setImageSelected={setImageSelected}
            imageNo={6}
            tabReference={'5'}
            linkTo={'/tools'}
          />
          <InfoElementTabCard
            toolID={"word-analyser-tab-card"}
            toolTitile={t('common_word_analyser')}
            tabOpen={openTab}
            toolInnerId={"word-analyser-info-popup"}
            description={descriptionText[7]}
            setOpenTab={setOpentab}
            setImageSelected={setImageSelected}
            imageNo={7}
            tabReference={'4'}
            linkTo={'/tools'}
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

export default InfoElement;