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
import { processCorrectorText, processFetchText, processGrammarResponseIndexes } from './util/Utils';
import { replaceCombined } from '../../const/Constants';
import { SPELLCHECKER } from './const/Constants';

export default function Correction() {
  const { t } = useTranslation();
  const [value, setValue] = useState('1');
  const [inputText, setInputText] = useState('');
  const [errorList, setErrorList] = useState(null);
  const [complexityAnswer, setComplexityAnswer] = useState();
  const [grammarAnswer, setGrammarAnswer] = useState();
  const [spellerAnswer, setSpellerAnswer] = useState();
  const [abstractWords, setAbstractWords] = useState([]);
  const [correctionModel, setCorrectionModel] = useState(SPELLCHECKER);
  const [newRef, setNewRef] = useState(inputText);
  const [requestingText, setRequestingText] = useState(null);
  const textBoxRef = useRef(inputText);
  const { getCorrectorResult } = useGetCorrectorResult();

  const handleChange = (event, newValue) => {
    if (textBoxRef.current.innerText.replaceAll('\u00A0', ' ') !== inputText.replaceAll(replaceCombined, '').replaceAll('\n', ' ').replaceAll('\u00A0', ' ')) {
      setRequestingText(textBoxRef.current.innerHTML);
      setValue(newValue);
      setInputText(textBoxRef.current.innerText);
      const fetchInputText = processFetchText(textBoxRef);
      setInputText(fetchInputText);
      getCorrectorResult(JSON.stringify({ tekst: processCorrectorText(fetchInputText) }))
        .then(answer => {
          setComplexityAnswer(answer);
          processGrammarResponseIndexes(answer.grammatika, setGrammarAnswer);
          processGrammarResponseIndexes(answer.speller, setSpellerAnswer);
          setAbstractWords(answer.abstraktsus);
        }).then(() => setRequestingText(null));
    } else {
      setValue(newValue);
    }
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
                errorList={errorList}
                setErrorList={setErrorList}
                setComplexityAnswer={setComplexityAnswer}
                grammarAnswer={grammarAnswer}
                setGrammarAnswer={setGrammarAnswer}
                spellerAnswer={spellerAnswer}
                setSpellerAnswer={setSpellerAnswer}
                correctionModel={correctionModel}
                setCorrectionModel={setCorrectionModel}
                setAbstractWords={setAbstractWords}
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
                errorList={errorList}
                setErrorList={setErrorList}
                complexityAnswer={complexityAnswer}
                setComplexityAnswer={setComplexityAnswer}
                correctionModel={correctionModel}
                setCorrectionModel={setCorrectionModel}
                grammarAnswer={grammarAnswer}
                setGrammarAnswer={setGrammarAnswer}
                spellerAnswer={spellerAnswer}
                setSpellerAnswer={setSpellerAnswer}
                setAbstractWords={setAbstractWords}
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
                setRequestingText={setRequestingText}
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
                setRequestingText={setRequestingText}
              /></TabPanel>
          </TabContext>
        </Box>
      </div>
    </Box>
  );
};
