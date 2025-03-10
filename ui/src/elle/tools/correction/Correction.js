import React, { useRef, useState } from 'react';
import './Correction.css';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ElleOuterDivStyle } from '../../const/StyleConstants';
import CorrectionTab from './tabviews/correction/CorrectionTab';
import ComplexityTab from './tabviews/complexity/ComplexityTab';
import VocabularyTab from './tabviews/vocabulary/VocabularyTab';
import TextLevelTab from './tabviews/textlevel/TextLevelTab';
import { useTranslation } from 'react-i18next';
import { useGetCorrectorResult } from '../../hooks/service/ToolsService';
import { queryCaller } from './util/Utils';
import { GRAMMARCHECKER_TEST, SPELLCHECKER } from './const/Constants';

export default function Correction() {
  const { t } = useTranslation();
  const [value, setValue] = useState('1');
  const [inputText, setInputText] = useState('');
  const [grammarErrorList, setGrammarErrorList] = useState(null);
  const [spellerErrorList, setSpellerErrorList] = useState(null);
  const [grammarTestErrorList, setGrammarTestErrorList] = useState(null);
  const [complexityAnswer, setComplexityAnswer] = useState();
  const [grammarAnswer, setGrammarAnswer] = useState();
  const [spellerAnswer, setSpellerAnswer] = useState();
  const [grammarTestAnswer, setGrammarTestAnswer] = useState();
  const [abstractWords, setAbstractWords] = useState([]);
  const [correctionModel, setCorrectionModel] = useState(window.location.pathname === '/corrector-test' ? GRAMMARCHECKER_TEST : SPELLCHECKER);
  const [newRef, setNewRef] = useState(inputText);
  const [requestingText, setRequestingText] = useState(null);
  const textBoxRef = useRef(inputText);
  const { getCorrectorResult } = useGetCorrectorResult();
  const [hoveredId, setHoveredId] = useState(null);

  const handleChange = (event, newValue) => {
    queryCaller(textBoxRef, inputText, setRequestingText, setGrammarAnswer, setSpellerAnswer, setInputText, newRef, setComplexityAnswer, setAbstractWords, getCorrectorResult, newValue, setValue, false, setGrammarErrorList, setSpellerErrorList, setGrammarTestAnswer, setGrammarTestErrorList);
  };

  return (
    <Box sx={ElleOuterDivStyle} className="correction-container-outer">
      <div className="mouseaway-listener"></div>
      <div className="correction-container">
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box>
              <TabList centered onChange={handleChange}>
                <Tab label={t('corrector_proofreading')} value="1"/>
                <Tab label={t('corrector_proficiency_level')} value="2"/>
                <Tab label={t('corrector_complexity')} value="3"/>
                <Tab label={t('corrector_vocabulary')} value="4"/>
              </TabList>
            </Box>
            <TabPanel value="1">
              <CorrectionTab
                textBoxRef={textBoxRef}
                requestingText={requestingText}
                setRequestingText={setRequestingText}
                newRef={newRef}
                setNewRef={setNewRef}
                inputText={inputText}
                setInputText={setInputText}
                errorList={correctionModel === GRAMMARCHECKER_TEST ? grammarTestErrorList : correctionModel === SPELLCHECKER ? spellerErrorList : grammarErrorList}
                setErrorList={correctionModel === GRAMMARCHECKER_TEST ? setGrammarTestErrorList : correctionModel === SPELLCHECKER ? setSpellerErrorList : setGrammarErrorList}
                setGrammarErrorList={setGrammarErrorList}
                setSpellerErrorList={setSpellerErrorList}
                setGrammarTestErrorList={setGrammarTestErrorList}
                setComplexityAnswer={setComplexityAnswer}
                grammarAnswer={grammarAnswer}
                setGrammarAnswer={setGrammarAnswer}
                spellerAnswer={spellerAnswer}
                setSpellerAnswer={setSpellerAnswer}
                grammarTestAnswer={grammarTestAnswer}
                setGrammarTestAnswer={setGrammarTestAnswer}
                correctionModel={correctionModel}
                setCorrectionModel={setCorrectionModel}
                setAbstractWords={setAbstractWords}
                complexityAnswer={complexityAnswer}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              /></TabPanel>
            <TabPanel value="2">
              <TextLevelTab
                requestingText={requestingText}
                setRequestingText={setRequestingText}
                textBoxRef={textBoxRef}
                newRef={newRef}
                setNewRef={setNewRef}
                inputText={inputText}
                setInputText={setInputText}
                errorList={correctionModel === GRAMMARCHECKER_TEST ? grammarTestErrorList : correctionModel === SPELLCHECKER ? spellerErrorList : grammarErrorList}
                setErrorList={correctionModel === GRAMMARCHECKER_TEST ? setGrammarTestErrorList : correctionModel === SPELLCHECKER ? setSpellerErrorList : setGrammarErrorList}
                setGrammarErrorList={setGrammarErrorList}
                setSpellerErrorList={setSpellerErrorList}
                setGrammarTestErrorList={setGrammarTestErrorList}
                complexityAnswer={complexityAnswer}
                setComplexityAnswer={setComplexityAnswer}
                correctionModel={correctionModel}
                setCorrectionModel={setCorrectionModel}
                grammarAnswer={grammarAnswer}
                setGrammarAnswer={setGrammarAnswer}
                spellerAnswer={spellerAnswer}
                setSpellerAnswer={setSpellerAnswer}
                grammarTestAnswer={grammarTestAnswer}
                setGrammarTestAnswer={setGrammarTestAnswer}
                setAbstractWords={setAbstractWords}
                setHoveredId={setHoveredId}
              /></TabPanel>
            <TabPanel value="3">
              <ComplexityTab
                requestingText={requestingText}
                textBoxRef={textBoxRef}
                newRef={newRef}
                setNewRef={setNewRef}
                inputText={inputText}
                setInputText={setInputText}
                complexityAnswer={complexityAnswer}
                setComplexityAnswer={setComplexityAnswer}
                setAbstractWords={setAbstractWords}
                setSpellerAnswer={setSpellerAnswer}
                setGrammarAnswer={setGrammarAnswer}
                setGrammarTestAnswer={setGrammarTestAnswer}
                setRequestingText={setRequestingText}
                setErrorList={correctionModel === GRAMMARCHECKER_TEST ? setGrammarTestErrorList : correctionModel === SPELLCHECKER ? setSpellerErrorList : setGrammarErrorList}
                setGrammarErrorList={setGrammarErrorList}
                setSpellerErrorList={setSpellerErrorList}
                setGrammarTestErrorList={setGrammarTestErrorList}
              /></TabPanel>
            <TabPanel value="4">
              <VocabularyTab
                requestingText={requestingText}
                textBoxRef={textBoxRef}
                newRef={newRef}
                setNewRef={setNewRef}
                inputText={inputText}
                setInputText={setInputText}
                complexityAnswer={complexityAnswer}
                setComplexityAnswer={setComplexityAnswer}
                abstractWords={abstractWords}
                setAbstractWords={setAbstractWords}
                setSpellerAnswer={setSpellerAnswer}
                setGrammarAnswer={setGrammarAnswer}
                setGrammarTestAnswer={setGrammarTestAnswer}
                setRequestingText={setRequestingText}
                setErrorList={correctionModel === GRAMMARCHECKER_TEST ? setGrammarTestErrorList : correctionModel === SPELLCHECKER ? setSpellerErrorList : setGrammarErrorList}
                setGrammarErrorList={setGrammarErrorList}
                setSpellerErrorList={setSpellerErrorList}
                setGrammarTestErrorList={setGrammarTestErrorList}
              /></TabPanel>
          </TabContext>
        </Box>
      </div>
    </Box>
  );
};
