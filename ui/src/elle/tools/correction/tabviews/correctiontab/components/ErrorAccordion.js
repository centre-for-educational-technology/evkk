import React from 'react';
import Accordion from '@mui/material/Accordion';
import { CorrectorAccordionStyle, CorrectorErrorCircle } from '../../../../../const/Constants';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import SingleError from './SingleError';
import { useCorrectionConstants } from '../constants/constants';

export default function ErrorAccordion(
  {
    errorList,
    model,
    resolveError,
    setErrorList,
    inputText,
    setInputText,
    setSpellerAnswer,
    setGrammarAnswer,
    spellerAnswer,
    grammarAnswer
  }) {
  const {errorTypes} = useCorrectionConstants();
  return (
    <>
      {/*
        Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs.
        In this instance [errorType, errorList] pairs are returned.
      */}
      {Object.entries(errorList).map((errorProperties) => {
        if (errorProperties[1].length === 0) return null;
        return (<Accordion key={errorProperties[0]} square={true} sx={CorrectorAccordionStyle}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box component="span"
                 sx={CorrectorErrorCircle(errorTypes[errorProperties[0]].color)}>
            </Box>
            {errorTypes[errorProperties[0]].label} ({errorProperties[1].length})
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {errorProperties[1].reverse().map((error, index) => (
                <SingleError
                  key={error.span.value + model + index}
                  error={error}
                  resolveError={resolveError}
                  errorList={errorList}
                  setErrorList={setErrorList}
                  type={errorProperties[0]}
                  inputText={inputText}
                  setInputText={setInputText}
                  setSpellerAnswer={setSpellerAnswer}
                  setGrammarAnswer={setGrammarAnswer}
                  spellerAnswer={spellerAnswer}
                  grammarAnswer={grammarAnswer}
                  model={model}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>);
      })}
    </>
  );
};
