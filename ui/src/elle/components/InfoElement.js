import React, {useState} from 'react';
import './styles/InfoElement.css'
import {Box} from "@mui/material";
import word_analyzer_video from '../resources/videos/word_analyzer_full.webm'
import {useTranslation} from "react-i18next";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import InfoElementTabCard from "./InfoElementTabCard";
import {ElleOuterDivStyle} from "../utils/constants";

const InfoElement = () => {

  const {t} = useTranslation();
  const [openTab, setOpentab] = useState("corrector-tab-card");

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
          />
          <InfoElementTabCard
            toolID={"tekstiparing-btn"}
            toolTitile={"Tekstipäring"}
            tabOpen={openTab}
            toolInnerId={"tekstiparing-btn-box"}
            description={descriptionText[2]}
            setOpenTab={setOpentab}
          />
          <InfoElementTabCard
            toolID={"wordlist-tab-card"}
            toolTitile={t('common_wordlist')}
            toolInnerId={"wordlist-info-popup"}
            tabOpen={openTab}
            description={descriptionText[3]}
            setOpenTab={setOpentab}
          />
          <InfoElementTabCard
            toolID={"word-context-tab-card"}
            toolTitile={t('common_word_in_context')}
            tabOpen={openTab}
            toolInnerId={"word-context-info-popup"}
            description={descriptionText[4]}
            setOpenTab={setOpentab}
          />
          <InfoElementTabCard
            toolID={"neighbour-word-tab-card"}
            toolTitile={t('common_neighbouring_words')}
            tabOpen={openTab}
            toolInnerId={"neighbour-word-info-popup"}
            description={descriptionText[5]}
            setOpenTab={setOpentab}
          />
          <InfoElementTabCard
            toolID={"cluster-finder-tab-card"}
            toolTitile={t('common_clusters')}
            tabOpen={openTab}
            toolInnerId={"cluster-finder-info-popup"}
            description={descriptionText[6]}
            setOpenTab={setOpentab}
          />
          <InfoElementTabCard
            toolID={"word-analyser-tab-card"}
            toolTitile={"Sõnaanalüsaator"}
            tabOpen={openTab}
            toolInnerId={"word-analyser-info-popup"}
            description={descriptionText[7]}
            setOpenTab={setOpentab}
          />
        </Box>
        <Box className="info-video">
          <video
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoElement;
