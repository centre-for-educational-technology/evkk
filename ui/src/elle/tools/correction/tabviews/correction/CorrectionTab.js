import React, { useEffect, useState } from 'react';
import { Alert, Box } from '@mui/material';
import '../../styles/CorrectionTab.css';
import ErrorAccordion from './components/ErrorAccordion';
import CorrectionInput from '../../components/CorrectionInput';
import { resolveError } from '../../util/CorrectorErrorResolveFunctions';
import CorrectionInfoIcon from '../../components/CorrectionInfoIcon';
import { useTranslation } from 'react-i18next';
import CorrectionToggleButtonGroup from '../../components/CorrectionToggleButtonGroup';
import { CorrectionAndTextLevelToggleButtons } from '../../const/ToggleButtonConstants';
import { CORRECTION_TAB_LINK } from '../../const/PathConstants';
import { CORRECTION } from '../../const/Constants';

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
    complexityAnswer
  }) {
  const { t } = useTranslation();
  const [responseText, setResponseText] = useState();
  const [totalErrors, setTotalErrors] = useState(null);

  useEffect(() => {
    if (!errorList) return;
    const totalCorrections = Object.values(errorList).reduce((sum, currentArray) => sum + currentArray.length, 0);
    setTotalErrors(totalCorrections);
  }, [errorList]);

  return (
    <div className="corrector-border-box">
      <Box className="d-flex justify-content-between">
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
          setComplexityAnswer={setComplexityAnswer}
          setAbstractWords={setAbstractWords}
        />
        <CorrectionInfoIcon
          inputText={<div>{t('corrector_proofreading_infobox')} <a href={CORRECTION_TAB_LINK}>{t('common_here')}</a>.
          </div>}/>
      </Box>
      <div className="d-flex gap-2">
        <CorrectionInput
          requestingText={requestingText}
          setRequestingText={setRequestingText}
          textBoxRef={textBoxRef}
          newRef={newRef}
          setNewRef={setNewRef}
          inputText={inputText}
          setInputText={setInputText}
          model={correctionModel}
          responseText={responseText}
          setResponseText={setResponseText}
          errorList={errorList}
          setErrorList={setErrorList}
          setComplexityAnswer={setComplexityAnswer}
          grammarAnswer={grammarAnswer}
          spellerAnswer={spellerAnswer}
          setGrammarAnswer={setGrammarAnswer}
          setSpellerAnswer={setSpellerAnswer}
          setAbstractWords={setAbstractWords}
          tab={CORRECTION}
          complexityAnswer={complexityAnswer}
        />
        <div className="w-50 corrector-right">
          {errorList ?
            <>
              <Box className="h4">{t('corrector_errors_in_total')}: {totalErrors}</Box>
              <ErrorAccordion
                resolveError={resolveError}
                setErrorList={setErrorList}
                errorList={errorList}
                model={correctionModel}
                inputText={inputText}
                setInputText={setInputText}
                setSpellerAnswer={setSpellerAnswer}
                setGrammarAnswer={setGrammarAnswer}
                spellerAnswer={spellerAnswer}
                grammarAnswer={grammarAnswer}
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
