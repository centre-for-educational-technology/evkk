import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { replaceCombined } from '../../../const/Constants';
import { processCorrectorText, processFetchText, processGrammarResponseIndexes } from '../util/Utils';
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
    setAbstractWords
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
          if (textBoxRef.current.innerText.replaceAll('\u00A0', ' ') !== inputText.replaceAll(replaceCombined, '').replaceAll('\n', ' ').replaceAll('\u00A0', ' ')) {
            setRequestingText(newRef);
            setInputText(textBoxRef.current.innerText);
            const fetchInputText = processFetchText(textBoxRef);
            setInputText(fetchInputText);
            getCorrectorResult(JSON.stringify({ tekst: processCorrectorText(fetchInputText) }))
              .then(answer => {
                setComplexityAnswer(answer);
                processGrammarResponseIndexes(answer.grammatika, setGrammarAnswer);
                processGrammarResponseIndexes(answer.speller, setSpellerAnswer);
                setAbstractWords(answer.abstraktsus);
                setRequestingText(null);
              });
          }
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
