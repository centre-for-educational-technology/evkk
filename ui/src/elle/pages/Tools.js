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

export default function Tools() {
  const current = useLocation();
  const queryOpen = current.state && current.state.pageNo === 'queryOpen' ? current.state.pageNo : null;
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [tabPage, setTabPage] = useState(current.pathname);
  const [textsSelected, setTextsSelected] = useState(false);

  useEffect(() => {
    setTabPage(current.pathname);
    if (current.pathname === '/tools') {
      navigate('wordlist', {replace: true});
    }
  }, [current.pathname]);

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
    );
  };

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
    );
  };

  return (
    <Box className="outer-container-tools">
      <Box className="tool-page-container-outer">
        <Box className="outer-outer">
          <Query queryOpen={queryOpen}/>
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
                  label={t('wordlist_filename')}
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
              image={WordlistImg}
              text={'tools_accordion_wordlist_explainer'}
              value="/tools/wordlist"
            />
            <TabOutlet
              image={WordContext}
              text={'tools_accordion_word_in_context_explainer'}
              value="/tools/wordcontext"
            />
            <TabOutlet
              image={NeighbourWord}
              text={'tools_accordion_neighbouring_words_explainer'}
              value="/tools/collocates"
            />
            <TabOutlet
              image={WordAnalyser}
              text={'tools_accordion_word_analysis_explainer'}
              value="/tools/wordanalyser"
            />
            <TabOutlet
              image={WordPattern}
              text={'tools_accordion_clusters_explainer'}
              value="/tools/clusterfinder"
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
}
