import React, {useState} from 'react';
import './styles/InfoElement.css'
import {Box} from "@mui/material";
import word_analyzer_video from '../resources/videos/word_analyzer_full.webm'
import {useTranslation} from "react-i18next";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import InfoElementTabCard from "./InfoElementTabCard";

const InfoElement = () => {

  const {t} = useTranslation();
  const [visibleButton, setVisibleButton] = useState("tekstihindaja-btn")
  const [visibleBox, setVisibleBox] = useState("tekstihindaja-btn-box")
  const [summaryKey, setSummaryKey] = useState(1)

  const descriptionText = {
    1: <p><b>Tekstihindajaga</b> {t('homepage_box_corrector_content')}</p>,
    2: <p><b>Tekstipäringu</b> {t('homepage_box_query_content')}</p>,
    3: <p><b>Sõnaloendi</b> {t('homepage_box_wordlist_content')}</p>,
    4: <p><b>Sõna kontekstis</b> {t('homepage_box_concordances_content')}</p>,
    5: <p><b>Naabersõnade</b> {t('homepage_box_neighbouring_words_content')}</p>,
    6: <p><b>Mustrileidjaga</b> {t('homepage_box_clusters_content')}</p>,
    7: <p><b>Sõnaanalüsaatoriga</b> {t('homepage_box_word_analysis_content')}</p>
  }
  const toggleBtnClass = async (e, key) => {
    const activeBtn = await document.getElementById(visibleButton);
    const activeBox = await document.getElementById(visibleBox);
    const id = e.target.id;
    const hoveredBtn = await document.getElementById(id);
    const hoveredInfoBox = await document.getElementById(id + "-box");

    if (hoveredBtn !== null) {
      if (hoveredBtn.classList.contains('btn-visible')) {

      } else if (hoveredBtn.classList.contains('btn-invisible')) {
        setSummaryKey(key);
        activeBtn.classList.remove('btn-visible');
        activeBox.classList.remove('info-box-slide-visible')
        activeBtn.classList.add('btn-invisible');
        activeBox.classList.add('info-box-slide-invisible')
        setVisibleButton(hoveredBtn.id);
        setVisibleBox(hoveredBtn.id + '-box')
        hoveredBtn.classList.remove('btn-invisible');
        hoveredInfoBox.classList.remove('info-box-slide-invisible')
        hoveredBtn.classList.add('btn-visible');
        hoveredInfoBox.classList.add('info-box-slide-visible')
      }
    }
  }

  return (
    <Box id="elle-tools" className="info-element-container">
      <Box className="info-element-inner">
        <Box className="info-tool-title">
          <h2>ELLE tööriistad</h2>
        </Box>
        <Box className="elle-tools">
          <InfoElementTabCard toolID={"tekstihindaja-btn"} toolTitile={"Tekstihindaja"}
                              toolInnerId={"tekstihindaja-btn-box"} toolKey={1}
                              description={descriptionText[summaryKey]} toggleBtnClass={toggleBtnClass()}/>
          <InfoElementTabCard toolID={"tekstiparing-btn"} toolTitile={"Tekstipäring"}
                              toolInnerId={"tekstiparing-btn-box"} toolKey={2}
                              description={descriptionText[summaryKey]} toggleBtnClass={toggleBtnClass()}/>
          <InfoElementTabCard toolID={"sonaloend-btn"} toolTitile={"Sõnaloend"} toolInnerId={"sonaloend-btn-box"}
                              toolKey={3}
                              description={descriptionText[summaryKey]} toggleBtnClass={toggleBtnClass()}/>
          <InfoElementTabCard toolID={"word-context-btn"} toolTitile={"Sõna kontekstis"}
                              toolInnerId={"word-context-btn-box"} toolKey={4}
                              description={descriptionText[summaryKey]} toggleBtnClass={toggleBtnClass()}/>
          <InfoElementTabCard toolID={"neighbour-word-btn"} toolTitile={"Naabersõnad"}
                              toolInnerId={"neighbour-word-btn-box"} toolKey={5}
                              description={descriptionText[summaryKey]} toggleBtnClass={toggleBtnClass()}/>
          <InfoElementTabCard toolID={"cluster-finder-btn"} toolTitile={"Mustrileidja"}
                              toolInnerId={"cluster-finder-btn-box"} toolKey={6}
                              description={descriptionText[summaryKey]} toggleBtnClass={toggleBtnClass()}/>
          <InfoElementTabCard toolID={"word-analyser-btn"} toolTitile={"Sõnaanalüsaator"}
                              toolInnerId={"word-analyser-btn-box"} toolKey={7}
                              description={descriptionText[summaryKey]} toggleBtnClass={toggleBtnClass()}/>
        </Box>
        {/*<Box className="tool-buttons">
          <Box className="tool-button" bgcolor={"#ff758f80"} width={"13%"}>
            <p>Tekstihindaja</p>
          </Box>
          <Box className="tool-button" bgcolor={"#fb610780"}>
            <p>Tekstipäring</p>
          </Box>
          <Box className="tool-button" bgcolor={"#ffff3f80"}>
            <p>Sõnaloend</p>
          </Box>
          <Box className="tool-button" bgcolor={"#80b91880"}>
            <p>Sõna kontekstis</p>
          </Box>
          <Box className="tool-button" bgcolor={"#00b4d880"}>
            <p>Naabersõnad</p>
          </Box>
          <Box className="tool-button" bgcolor={"#deaaff80"}>
            <p>Mustrileidja</p>
          </Box>
          <Box className="tool-button" bgcolor={"#343a4080"}>
            <p>Sõnaanalüsaator</p>
          </Box>
        </Box>*/}
        <Box className="info-video">
          <video className={"info-video-styling"} controls src={word_analyzer_video} autoPlay width={"100%"}
                 preload></video>
          <Box className="video-overlay"><PlayCircleIcon className="play-button-info"/>
            <Box fontSize={"x-large"} position={"relative"} top={"20%"} fontWeight={"bold"}
                 color={"rgb(204, 168, 253)"}><p>VAATA TUTVUSTAVAT
              VIDEOT</p>
            </Box></Box>
        </Box>

      </Box>

    </Box>
  );
};

export default InfoElement;
