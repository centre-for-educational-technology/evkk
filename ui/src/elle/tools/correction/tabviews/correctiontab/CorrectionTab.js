import React, { useEffect, useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import './styles/correctionTab.css';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import ErrorAccordion from './components/ErrorAccordion';
import { handleModelChange } from '../../helperFunctions/helperFunctions';
import CorrectionInput from '../../components/CorrectionInput';
import { resolveError } from './helperFunctions/correctorErrorResolveFunctions';
import CorrectionInfoIcon from '../../components/CorrectionInfoIcon';

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
  const link = <a href="https://arxiv.org/pdf/2402.11671">https://arxiv.org/pdf/2402.11671</a>;

  const correctErrorCount = (errorList) => {
    let spellingError = errorList.spellingError;
    let newErrorList = [];
    let mainIndex = 0;
    spellingError.forEach(error => {
      if (error.replacements[0].value.split(' ').length === 1) {
        const errorCopy = {...error};
        errorCopy.errorId = 'errorno_' + mainIndex;
        errorCopy.index = mainIndex;
        newErrorList.push(errorCopy);
        mainIndex++;
      } else {
        let newError = error.replacements[0].value.split(' ');
        let newSpan = error.span.value.split(' ');
        let newEnd = error.span.end;
        newError.forEach((word, index) => {
          let errorVal = {...error};
          errorVal.replacements = [{value: newError[index]}];
          errorVal.errorId = 'errorno_' + mainIndex;
          errorVal.index = mainIndex;
          errorVal.span = {start: newEnd - word.length, end: newEnd, value: newSpan[index]};
          newErrorList.push(errorVal);
          newEnd = newEnd - word.length - 1;
          mainIndex++;
        });
      }
    });
    errorList.spellingError = newErrorList;
    return errorList;
  };

  useEffect(() => {
    if (!errorList) return;
    console.log(errorList);
    const totalCorrections = Object.values(errorList).reduce((sum, currentArray) => sum + currentArray.length, 0);
    setTotalErrors(totalCorrections);
  }, [errorList]);

  return (
    <div className="corrector-border-box">
      <Box className="d-flex justify-content-between">
        <Box className="d-flex">
          <ToggleButtonGroup
            color="primary"
            value={correctionModel}
            sx={{height: '1rem', marginBottom: '1rem'}}
            exclusive
            onChange={(e) => handleModelChange(setCorrectionModel, e)}
            aria-label="Platform"
          >
            <Tooltip placement="top" title="Kirjavigade tekst">
              <ToggleButton value="spellchecker">Õigekiri</ToggleButton>
            </Tooltip>
            <Tooltip placement="top" title="Grammatika tekst">
              <ToggleButton value="grammarchecker">Grammatika</ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
        <CorrectionInfoIcon
          inputText={<div>Teksti parandamiseks saab kasutada kahte korrektorit, mis on loodud Tartu ülikooli ja
            Tallinna ülikooli koostöös. (Statistiline) õigekirjakontrollija otsib kirjavigu, arvestades sõnade
            lähikontekstiga. (Masintõlkel põhinev) grammatikakontrollija suudab leida lausevigu, näiteks eksimusi
            kirjavahemärkide kasutuses ja sõnajärjes. Vahel soovitab see ümbersõnastusi ka siis, kui tegemist pole
            veaga. Loe lähemalt siit [{link}].</div>}/>
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
              <Box className="h4">Parandusi kokku: {totalErrors}</Box>
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
