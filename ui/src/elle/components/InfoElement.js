import React, {useState} from 'react';
import './styles/InfoElement.css'
import {Box, Button} from "@mui/material";
import word_analyzer_video from '../resources/videos/word_analyzer_full.webm'
import {useTranslation} from "react-i18next";

const InfoElement = () => {
  const {t} = useTranslation();
  const [visibleButton, setVisibleButton] = useState("tekstihindaja-btn")
  const [visibleBox, setVisibleBox] = useState("tekstihindaja-btn-box")
  const summaryTexts = ['homepage_summary_text_1', 'homepage_summary_text_2', 'homepage_summary_text_3', 'homepage_summary_text_4'];
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
    <Box className="info-element-container">
      <Box className="info-element-inner">
        <Box className="info-tool-title">
          <h2>ELLE tööriistad</h2>
        </Box>
        <Box className="tool-description">
          {descriptionText[summaryKey]}
          <Button variant={"contained"} size={"small"}>Uuri lähemalt</Button>
        </Box>
        <Box className="elle-tools">
          <Box id="tekstihindaja-btn" onMouseEnter={(e) => toggleBtnClass(e, 1)}
               className="btn-visible">
            <p className="tool-button-text">Tekstihindaja</p>
            <Box id="tekstihindaja-btn-box" className="info-box-slide-visible" style={{top: "5%"}}>
              <Box className="btn-box-inner">
                <Box className="btn-box-inner-inner"></Box>
              </Box>
            </Box>
          </Box>
          <Box id="tekstiparing-btn" onMouseEnter={(e) => toggleBtnClass(e, 2)} className="btn-invisible"
          >
            <p className="tool-button-text">Tekstipäring</p>
            <Box id="tekstiparing-btn-box" className="info-box-slide-invisible">
              <Box className="btn-box-inner">
                <Box className="btn-box-inner-inner"></Box>
              </Box>
            </Box>
          </Box>
          <Box id="sonaloend-btn" onMouseEnter={(e) => toggleBtnClass(e, 3)} className="btn-invisible"
          >
            <p className="tool-button-text">Sõnaloend</p>
            <Box id="sonaloend-btn-box" className="info-box-slide-invisible">
              <Box className="btn-box-inner">
                <Box className="btn-box-inner-inner"></Box>
              </Box>
            </Box>
          </Box>
          <Box id="word-context-btn" onMouseEnter={(e) => toggleBtnClass(e, 4)} className="btn-invisible">
            <p className="tool-button-text">Sõna kontekstis</p>
            <Box id="word-context-btn-box" className="info-box-slide-invisible">
              <Box className="btn-box-inner">
                <Box className="btn-box-inner-inner"></Box>
              </Box>
            </Box>
          </Box>
          <Box id="neighbour-word-btn" onMouseEnter={(e) => toggleBtnClass(e, 5)} className="btn-invisible">
            <p className="tool-button-text">Naabersõnad</p>
            <Box id="neighbour-word-btn-box" className="info-box-slide-invisible">
              <Box className="btn-box-inner">
                <Box className="btn-box-inner-inner"></Box>
              </Box>
            </Box>
          </Box>
          <Box id="cluster-finder-btn" onMouseEnter={(e) => toggleBtnClass(e, 6)} className="btn-invisible">
            <p className="tool-button-text">Mustrileidja</p>
            <Box id="cluster-finder-btn-box" className="info-box-slide-invisible">
              <Box className="btn-box-inner">
                <Box className="btn-box-inner-inner"></Box>
              </Box>
            </Box>
          </Box>
          <Box id="word-analyser-btn" onMouseEnter={(e) => toggleBtnClass(e, 7)} className="btn-invisible">
            <p className="tool-button-text">Sõnaanalüsaator</p>
            <Box id="word-analyser-btn-box" className="info-box-slide-invisible"
                 style={{top: "-150%"}}>
              <Box className="btn-box-inner">
                <Box className="btn-box-inner-inner"></Box>
              </Box>
            </Box>
          </Box>
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
        </Box>

      </Box>

    </Box>
  );
};

export default InfoElement;