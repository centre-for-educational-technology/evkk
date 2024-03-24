import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import '../correctiontab/styles/correctionTab.css';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import CorrectionInput from '../../components/CorrectionInput';
import './style/textLevelTab.css';
import TextLevelAccordion from './components/TextLevelAccordion';
import { accordionDetails, colors, textLevels } from './constants/constants';
import { handleModelChange } from '../../helperFunctions/helperFunctions';
import { getLanguageData } from '../../helperFunctions/queries/getLanguageData';

export default function TextLevelTab({setInputText, inputText, errorList, setErrorList}) {
  const [responseText, setResponseText] = useState();
  const [complexityAnswer, setComplexityAnswer] = useState(null);
  const [firstRender, setFirstRender] = useState(true);
  const [model, setModel] = useState('spellchecker');

  useEffect(() => {
    if (inputText === '') return;
    if (firstRender) {
      getLanguageData(inputText, setComplexityAnswer);
      setFirstRender(false);
    }
  }, [inputText]);

  return (
    <div className="corrector-border-box">
      <Box className="d-flex mb-2">
        <strong>Veaotsing:</strong>
        <ToggleButtonGroup
          color="primary"
          value={model}
          sx={{height: '1em', paddingLeft: '1em'}}
          exclusive
          onChange={(e) => handleModelChange(setModel, e)}
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
          model={model}
          responseText={responseText}
          setResponseText={setResponseText}
          errorList={errorList}
          setErrorList={setErrorList}
        />
        <div className="w-50 corrector-right">
          <div className="d-flex justify-content-between">
            <div style={{fontSize: '1.5rem'}}>Tesemete värvikoodid:</div>
            {colors.map((color, index) => {
              return (
                <div className="d-flex align-items-center" key={textLevels[index]}>
                  <div className="text-level-tab-color-circle " style={{backgroundColor: color}}></div>
                  -
                  {textLevels[index]}
                </div>
              );
            })}
          </div>
          {complexityAnswer &&
            <div>
              {accordionDetails.map((detail, index) => {
                return (
                  <TextLevelAccordion
                    key={detail.label}
                    label={detail.label}
                    arrayValues={detail.arrayValues}
                    complexityAnswer={complexityAnswer.keeletase}
                    colors={colors}
                  />
                );
              })}
            </div>
          }
        </div>
      </div>
    </div>
  );
};
