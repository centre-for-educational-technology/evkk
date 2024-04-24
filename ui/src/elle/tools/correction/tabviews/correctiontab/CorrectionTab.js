import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import './styles/correctionTab.css';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import ErrorAccordion from './components/ErrorAccordion';
import { handleModelChange } from '../../helperFunctions/helperFunctions';
import CorrectionInput from '../../components/CorrectionInput';
import { resolveError } from './helperFunctions/correctorErrorResolveFunctions';

export default function CorrectionTab(
  {
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
    setAbstractWords
  }) {
  const [responseText, setResponseText] = useState();
  const [totalErrors, setTotalErrors] = useState(null);

  useEffect(() => {
    if (!errorList) return;
    const totalCorrections = Object.values(errorList).reduce((sum, currentArray) => sum + currentArray.length, 0);
    setTotalErrors(totalCorrections);
  }, [errorList]);

  return (
    <div className="corrector-border-box">
      <Box className="d-flex mb-2">
        <strong>Veaotsing:</strong>
        <ToggleButtonGroup
          color="primary"
          value={correctionModel}
          sx={{height: '1em', paddingLeft: '1em'}}
          exclusive
          onChange={(e) => handleModelChange(setCorrectionModel, e)}
          aria-label="Platform"
        >
          <ToggleButton value="spellchecker">Tähevead</ToggleButton>
          <ToggleButton value="grammarchecker">Grammatikavead</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <div className="d-flex gap-2">
        <CorrectionInput
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
        />
        <div className="w-50 corrector-right">
          {errorList &&
            <>
              <Box className="h4">Vigu kokku: {totalErrors}</Box>
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
          }
        </div>
      </div>
    </div>
  );
};
