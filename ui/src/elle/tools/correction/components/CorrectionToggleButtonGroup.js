import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { queryCaller } from '../util/Utils';
import { Box, Tooltip } from '@mui/material';
import { useGetCorrectorResult } from '../../../hooks/service/ToolsService';
import { useTranslation } from 'react-i18next';

export default function CorrectionToggleButtonGroup(
  {
    newRef,
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
    setAbstractWords,
    setGrammarErrorList,
    setSpellerErrorList,
    setGrammarTestErrorList,
    setGrammarTestAnswer,
    noQuery
  }) {

  const { getCorrectorResult } = useGetCorrectorResult();
  const { t } = useTranslation();

  return (
    <Box className="d-flex">
      <ToggleButtonGroup
        color="primary"
        value={correctionModel}
        sx={{ height: '1rem', marginBottom: '1rem' }}
        exclusive
        onChange={(e) => {
          if (!noQuery) {
            queryCaller(textBoxRef, inputText, setRequestingText, setGrammarAnswer, setSpellerAnswer, setInputText, newRef, setComplexityAnswer, setAbstractWords, getCorrectorResult, false, setGrammarErrorList, setSpellerErrorList, setGrammarTestAnswer, setGrammarTestErrorList);
          }
          ;
          setCorrectionModel(e.target.value);
        }}
        aria-label="Platform"
      >
        {toggleButtons.map((button) => (
          <Tooltip key={button.title} placement="top" title={t(button.title)}>
            <ToggleButton value={button.value}>{t(button.text)}</ToggleButton>
          </Tooltip>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
