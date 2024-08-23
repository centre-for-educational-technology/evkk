import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { replaceCombined } from '../../../const/Constants';
import { runFetches } from '../helperFunctions/queries/runFetches';
import { handleModelChange } from '../helperFunctions/helperFunctions';
import { Box, Tooltip } from '@mui/material';

export default function CorrectionToggleButtonGroup(
  {
    toggleButtons,
    correctionModel,
    textBoxRef,
    inputText,
    setInputText,
    setRequestingText,
    setCorrectionModel,
    setGrammarAnswer,
    setSpellerAnswer,
    setComplexityAnswer,
    setAbstractWords
  }) {
  return (
    <Box className="d-flex">
      <ToggleButtonGroup
        color="primary"
        value={correctionModel}
        sx={{height: '1rem', marginBottom: '1rem'}}
        exclusive
        onChange={(e) => {
          if (textBoxRef.current.innerText.replaceAll('\u00A0', ' ') !== inputText.replaceAll(replaceCombined, '').replaceAll('\n', ' ').replaceAll('\u00A0', ' ')) {
            setRequestingText(true);
            setInputText(textBoxRef.current.innerText);
            runFetches(textBoxRef, setGrammarAnswer, setSpellerAnswer, setInputText, setComplexityAnswer, setAbstractWords, setRequestingText);
          }
          handleModelChange(setCorrectionModel, e);
        }}
        aria-label="Platform"
      >
        {toggleButtons.map((button) => (
          <Tooltip key={button.title} placement="top" title={button.title}>
            <ToggleButton value={button.value}>{button.text}</ToggleButton>
          </Tooltip>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
