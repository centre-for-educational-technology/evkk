import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { replaceCombined } from '../../../const/Constants';
import {
  handleModelChange,
  processCorrectorText,
  processFetchText,
  processGrammarResponseIndexes
} from '../helperFunctions/helperFunctions';
import { Box, Tooltip } from '@mui/material';
import {
  useGetAbstractResult,
  useGetCorrectorResult,
  useGetGrammarResults,
  useGetSpellerResults
} from '../../../hooks/service/ToolsService';

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
  const {getGrammarResults} = useGetGrammarResults();
  const {getSpellerResults} = useGetSpellerResults();
  const {getCorrectorResult} = useGetCorrectorResult();
  const {getAbstractResult} = useGetAbstractResult();
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
            const fetchInputText = processFetchText(textBoxRef);
            setInputText(fetchInputText);
            getCorrectorResult(JSON.stringify({tekst: processCorrectorText(fetchInputText)})).then(setComplexityAnswer);
            getGrammarResults({
              language: 'et',
              text: fetchInputText
            }).then(v => processGrammarResponseIndexes(v, setGrammarAnswer));
            getSpellerResults({text: fetchInputText}).then(v => processGrammarResponseIndexes(v, setSpellerAnswer));
            getAbstractResult(JSON.stringify({
              identifier: '',
              language: 'estonian',
              text: fetchInputText
            })).then(setAbstractWords);
            setRequestingText(false);
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
