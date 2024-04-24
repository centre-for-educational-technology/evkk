import React, { useState } from 'react';
import { Alert, Box } from '@mui/material';
import '../correctiontab/styles/correctionTab.css';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import CorrectionInput from '../../components/CorrectionInput';
import './style/textLevelTab.css';
import TextLevelAccordion from './components/TextLevelAccordion';
import { accordionDetails, textLevelColors, textLevels } from './constants/constants';
import { handleModelChange } from '../../helperFunctions/helperFunctions';
import TextLevelAccordionInner from './components/TextLevelAccordionInner';

export default function TextLevelTab(
  {
    setInputText,
    inputText,
    errorList,
    setErrorList,
    complexityAnswer,
    setComplexityAnswer,
    correctionModel,
    setCorrectionModel,
    spellerAnswer,
    grammarAnswer,
    setAbstractWords
  }) {
  const [responseText, setResponseText] = useState();

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
          spellerAnswer={spellerAnswer}
          grammarAnswer={grammarAnswer}
          setAbstractWords={setAbstractWords}
        />
        <div className="w-50 corrector-right">
          <div className="d-flex justify-content-between">
            <div style={{fontSize: '1.5rem'}}>Tasemete värvikoodid:</div>
            {textLevelColors.map((color, index) => {
              return (
                <div className="d-flex align-items-center" key={textLevels[index]}>
                  <div className="text-level-tab-color-circle " style={{backgroundColor: color}}></div>
                  -
                  {textLevels[index]}
                </div>
              );
            })}
          </div>
          {complexityAnswer && complexityAnswer?.keeletase.length === 0 &&
            <Alert
              severity="info"
              className="level-tab-short-text-notice"
            >
              Tasemehinnangu saamiseks sisesta pikem tekst
            </Alert>
          }
          {complexityAnswer && complexityAnswer?.keeletase.length !== 0 &&
            <>
              <div className="level-accordion-overall-value-container">
                <div className="level-accordion-overall-value-label">{accordionDetails[0].label}</div>
                <TextLevelAccordionInner
                  complexityAnswer={complexityAnswer.keeletase}
                  arrayValues={accordionDetails[0].arrayValues}
                />
              </div>
              <div>
                {accordionDetails.map((detail, index) => {
                  if (index === 0) return;
                  return (
                    <TextLevelAccordion
                      key={detail.label}
                      label={detail.label}
                      arrayValues={detail.arrayValues}
                      complexityAnswer={complexityAnswer.keeletase}
                    />
                  );
                })}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};
