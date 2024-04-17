import React, { useEffect, useState } from 'react';
import { Alert, Box, Tab } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Query from './query/Query';
import { useTranslation } from 'react-i18next';
import './styles/Tools.css';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { queryStore } from '../store/QueryStore';
import WordlistImg from '../resources/images/tools/sonaloend.png';
import WordContext from '../resources/images/tools/sona_kontekstis.png';
import NeighbourWord from '../resources/images/tools/naabersonad.png';
import WordPattern from '../resources/images/tools/mustrileidja.png';
import WordAnalyser from '../resources/images/tools/sonaanalyys.png';
import { TabStyle } from '../const/Constants';

const ToolIconCard = (props) => {
  const {t} = useTranslation();
  return (
    <Box
      className="tool-card-container"
      sx={{boxShadow: 3}}>
      <Box className="tool-card-icon">
        <img className="tool-icon-img" src={props.image} loading="lazy" alt="Tool logo" />
      </Box>
      <Box className="tool-card-text">
        {t(props.text)}
      </Box>
    </Box>
  );
};

const TabOutlet = (props) => {
  const {t} = useTranslation();
  return (
    <TabPanel value={props.value}>
      <Box className={props.hideBackground ? 'tools-tab-overlay' : ''}>
        {props.textsSelected
          ?
          <div className="tool-wrapper">
            <Outlet />
          </div>
          :
          <Box>
            <ToolIconCard image={props.image} text={props.text} />
            <Alert severity="warning">
              {t('tools_warning_text')}
            </Alert>
          </Box>}
      </Box>
    </TabPanel>
  );
};

export default function Tools() {
  const current = useLocation();
  const queryOpen = current.state && current.state.pageNo === 'queryOpen' ? current.state.pageNo : null;
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [tabPage, setTabPage] = useState(current.pathname);
  const [textsSelected, setTextsSelected] = useState(false);
  const [hideBackground, setHideBackground] = useState(false);

  useEffect(() => {
    setTabPage(current.pathname);
    if (current.pathname === '/tools') {
      navigate('wordlist', {replace: true});
    }
  }, [current.pathname, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storeState = queryStore.getState();
    setTextsSelected(storeState.corpusTextIds !== null || storeState.ownTexts !== null);
  }, []);

  const handleChange = (event, newValue) => {
    setTabPage(newValue);
  };

  queryStore.subscribe(() => {
    const storeState = queryStore.getState();
    setTextsSelected(storeState.corpusTextIds !== null || storeState.ownTexts !== null);
  });

  return (
    <Box className="outer-container-tools">
      <Box className="tool-page-container-outer">
        <Box className="outer-outer">
          <Query queryOpen={queryOpen}
                 setHideBackground={setHideBackground} />
        </Box>
        <Box className="tools-box-right">
          <TabContext value={tabPage} className="tab-context-class">
            <Box boxShadow={3} borderRadius={'25px'}>
              <TabList
                onChange={handleChange}
                TabIndicatorProps={{sx: {display: 'none'}}}
                sx={TabStyle}
              >
                <Tab
                  label={t('common_wordlist')}
                  onClick={() => navigate('/tools/wordlist')}
                  value="/tools/wordlist"
                />
                <Tab
                  label={t('common_word_in_context')}
                  onClick={() => navigate('/tools/wordcontext')}
                  value="/tools/wordcontext"
                />
                <Tab
                  label={t('common_neighbouring_words')}
                  onClick={() => navigate('/tools/collocates')}
                  value="/tools/collocates"
                />
                <Tab
                  label={t('common_word_analyser')}
                  onClick={() => navigate('/tools/wordanalyser')}
                  value="/tools/wordanalyser"
                />
                <Tab
                  label={t('common_clusters')}
                  onClick={() => navigate('/tools/clusterfinder')}
                  value="/tools/clusterfinder"
                />
              </TabList>
            </Box>
            <TabOutlet
              textsSelected={textsSelected}
              image={WordlistImg}
              text={'tools_accordion_wordlist_explainer'}
              value="/tools/wordlist"
              hideBackground={hideBackground}
            />
            <TabOutlet
              textsSelected={textsSelected}
              image={WordContext}
              text={'tools_accordion_word_in_context_explainer'}
              value="/tools/wordcontext"
              hideBackground={hideBackground}
            />
            <TabOutlet
              textsSelected={textsSelected}
              image={NeighbourWord}
              text={'tools_accordion_neighbouring_words_explainer'}
              value="/tools/collocates"
              hideBackground={hideBackground}
            />
            <TabOutlet
              textsSelected={textsSelected}
              image={WordAnalyser}
              text={'tools_accordion_word_analysis_explainer'}
              value="/tools/wordanalyser"
              hideBackground={hideBackground}
            />
            <TabOutlet
              textsSelected={textsSelected}
              image={WordPattern}
              text={'tools_accordion_clusters_explainer'}
              value="/tools/clusterfinder"
              hideBackground={hideBackground}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
}
