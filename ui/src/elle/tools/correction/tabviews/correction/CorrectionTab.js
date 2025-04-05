import React, { useEffect, useState } from 'react';
import { Alert, Box } from '@mui/material';
import '../../styles/CorrectionTab.css';
import ErrorAccordion from './components/ErrorAccordion';
import CorrectionInput from '../../components/CorrectionInput';
import CorrectionInfoIcon from '../../components/CorrectionInfoIcon';
import { useTranslation } from 'react-i18next';
import CorrectionToggleButtonGroup from '../../components/CorrectionToggleButtonGroup';
import { CorrectionAndTextLevelToggleButtons } from '../../const/ToggleButtonConstants';
import { CORRECTION_TAB_LINK } from '../../const/PathConstants';
import { CORRECTION, GRAMMARCHECKER_TEST, SPELLCHECKER } from '../../const/Constants';

export default function CorrectionTab(
  {
    requestingText,
    setRequestingText,
    textBoxRef,
    newRef,
    setNewRef,
    setInputText,
    inputText,
    errorList,
    setErrorList,
    grammarAnswer,
    setGrammarAnswer,
    spellerAnswer,
    setSpellerAnswer,
    setComplexityAnswer,
    correctionModel,
    setCorrectionModel,
    setAbstractWords,
    complexityAnswer,
    setGrammarErrorList,
    setSpellerErrorList,
    hoveredId,
    setHoveredId,
    grammarTestAnswer,
    setGrammarTestErrorList,
    setGrammarTestAnswer,
    noQuery,
    setNoQuery
  }) {
  const { t } = useTranslation();
  const [totalErrors, setTotalErrors] = useState(null);

  useEffect(() => {
    if (!errorList) return;
    const totalCorrections = Object.values(errorList).reduce((sum, currentArray) => sum + currentArray.length, 0);
    setTotalErrors(totalCorrections);
  }, [errorList]);

  return (
    <div className="corrector-border-box">
      <Box className="d-flex justify-content-between">
        {correctionModel !== GRAMMARCHECKER_TEST ?
          <CorrectionToggleButtonGroup
            newRef={newRef}
            toggleButtons={CorrectionAndTextLevelToggleButtons}
            correctionModel={correctionModel}
            setCorrectionModel={setCorrectionModel}
            textBoxRef={textBoxRef}
            inputText={inputText}
            setInputText={setInputText}
            setRequestingText={setRequestingText}
            setGrammarAnswer={setGrammarAnswer}
            setSpellerAnswer={setSpellerAnswer}
            setGrammarTestAnswer={setGrammarTestAnswer}
            setComplexityAnswer={setComplexityAnswer}
            setAbstractWords={setAbstractWords}
            setGrammarErrorList={setGrammarErrorList}
            setSpellerErrorList={setSpellerErrorList}
            setGrammarTestErrorList={setGrammarTestErrorList}
            noQuery={noQuery}
          />
          :
          <Alert severity="warning" className="mb-2">
            <div>{t('corrector_test_version_text')}</div>
            <div>{t('corrector_test_version_thanks')}</div>
          </Alert>
        }
        <div className="d-flex align-items-center">
          <CorrectionInfoIcon
            inputText={correctionModel === GRAMMARCHECKER_TEST ?
              <div>{t('corrector_test_version_info')}</div>
              :
              <div>{t('corrector_proofreading_infobox')} <a href={CORRECTION_TAB_LINK}>{t('common_here')}</a>.
              </div>} />
        </div>
      </Box>
      <div className="d-flex gap-2 flex-wrap">
        <CorrectionInput
          requestingText={requestingText}
          setRequestingText={setRequestingText}
          textBoxRef={textBoxRef}
          newRef={newRef}
          setNewRef={setNewRef}
          inputText={inputText}
          setInputText={setInputText}
          model={correctionModel}
          errorList={errorList}
          setErrorList={setErrorList}
          setGrammarErrorList={setGrammarErrorList}
          setSpellerErrorList={setSpellerErrorList}
          setComplexityAnswer={setComplexityAnswer}
          grammarAnswer={grammarAnswer}
          spellerAnswer={spellerAnswer}
          setGrammarAnswer={setGrammarAnswer}
          setSpellerAnswer={setSpellerAnswer}
          setAbstractWords={setAbstractWords}
          tab={CORRECTION}
          complexityAnswer={complexityAnswer}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          setGrammarTestAnswer={setGrammarTestAnswer}
          setGrammarTestErrorList={setGrammarTestErrorList}
          grammarTestAnswer={grammarTestAnswer}
          setNoQuery={setNoQuery}
        />
        <div className="corrector-right">
          {errorList ?
            <>
              <Box className="h4">{t('corrector_errors_in_total')}: {totalErrors}</Box>
              <ErrorAccordion
                setErrorList={setErrorList}
                errorList={errorList}
                inputText={inputText}
                setHoveredId={setHoveredId}
                setInputType={correctionModel === GRAMMARCHECKER_TEST ? setGrammarTestAnswer : correctionModel === SPELLCHECKER ? setSpellerAnswer : setGrammarAnswer}
                correctionModel={correctionModel}
              />
            </>
            :
            <Box className="corrector-right-inner">
              <Alert severity="info">{t('corrector_proofreading_gray_box')}</Alert>
            </Box>
          }
        </div>
      </div>
    </div>
  );
};
