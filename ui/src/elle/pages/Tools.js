import React, {useEffect, useState} from 'react';
import {Alert, Box, Tab} from '@mui/material';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Query from './query/Query';
import {useTranslation} from 'react-i18next';
import './styles/Tools.css'
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {queryStore} from "../store/QueryStore";
import WordlistImg from '../resources/images/tools/sonaloend.png';
import WordContext from '../resources/images/tools/sona_kontekstis.png';
import NeighbourWord from '../resources/images/tools/naabersonad.png';
import WordPattern from '../resources/images/tools/mustrileidja.png';
import WordAnalyser from '../resources/images/tools/sonaanalyys.png'
import {TabStyle} from "../const/Constants";

export default function Tools() {
  const {state} = useLocation();
  const page = state && state.pageNo !== 'queryOpen' ? state.pageNo : '1';
  const queryOpen = state && state.pageNo === 'queryOpen' ? state.pageNo : null;
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [tabPage, setTabPage] = useState(page);
  const [textsSelected, setTextsSelected] = useState(false);

  const handleChange = (event, newValue) => {
    setTabPage(newValue);
  };

  queryStore.subscribe(() => {
    const storeState = queryStore.getState();
    setTextsSelected(storeState.corpusTextIds !== null || storeState.ownTexts !== null);
  });

  const ToolIconCard = (props) => {
    return (
      <>
        <Box
          className="tool-card-container"
          sx={{boxShadow: 3}}>
          <Box className="tool-card-icon">
            <img className="tool-icon-img" src={props.image} loading="lazy" alt="Tool logo"/>
          </Box>
          <Box className="tool-card-text">
            {t(props.text)}
          </Box>
        </Box>
      </>
    )
  }

  const TabOutlet = (props) => {
    return (
      <TabPanel value={props.value}>
        {textsSelected ? <Outlet/> :
          <Box>
            <ToolIconCard image={props.image} text={props.text}/>
            <Alert severity="warning">
              {t('tools_warning_text')}
            </Alert>
          </Box>}
      </TabPanel>
    )
  }

  function toolSelect(tool) {
    navigate(tool);
  }

  useEffect(() => {
    if (!state) {
      toolSelect('wordlist')
    }
  }, []);

  return (
    <Box className="outer-container-tools">
      <Box className="tool-page-container-outer">
        <Box className="outer-outer">
          <Query queryOpen={queryOpen}/>
        </Box>
        <Box className="tools-box-right">
          <TabContext value={tabPage} className="tab-context-class">
            <Box boxShadow={3} borderRadius={"25px"}>
              <TabList
                onChange={handleChange}
                TabIndicatorProps={{sx: {display: "none"}}}
                sx={TabStyle}
                aria-label="lab API tabs example"
              >
                <Tab label="Sõnaloend" onClick={() => toolSelect('wordlist')} value="1"/>
                <Tab label="Sõna kontekstis" onClick={() => toolSelect('wordcontext')} value="2"/>
                <Tab label="Naabersõnad" onClick={() => toolSelect('collocates')} value="3"/>
                <Tab label="Sõnaanalüsaator" onClick={() => toolSelect('wordanalyser')} value="4"/>
                <Tab label="Mustrileidja" onClick={() => toolSelect('clusterfinder')} value="5"/>
              </TabList>
            </Box>
            <TabOutlet image={WordlistImg} text={'tools_accordion_wordlist_explainer'} value="1"/>
            <TabOutlet image={WordContext} text={'tools_accordion_word_in_context_explainer'} value="2"/>
            <TabOutlet image={NeighbourWord} text={'tools_accordion_neighbouring_words_explainer'} value="3"/>
            <TabOutlet image={WordAnalyser} text={'tools_accordion_word_analysis_explainer'} value="4"/>
            <TabOutlet image={WordPattern} text={'tools_accordion_clusters_explainer'} value="5"/>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
}
