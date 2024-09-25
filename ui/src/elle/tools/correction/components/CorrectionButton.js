import React from 'react';
import { Button } from '@mui/material';
import { DefaultButtonStyle } from '../../../const/StyleConstants';
import { useTranslation } from 'react-i18next';
import { processCorrectorText, processFetchText, processGrammarResponseIndexes } from '../util/Utils';
import { useGetCorrectorResult } from '../../../hooks/service/ToolsService';

export default function CorrectionButton(
  {
    textBoxRef,
    setInputText,
    setComplexityAnswer,
    setGrammarAnswer,
    setSpellerAnswer,
    setAbstractWords,
    setRequestingText,
    newRef
  }) {
  const { t } = useTranslation();
  const { getCorrectorResult } = useGetCorrectorResult();

  const handleClick = () => {
    setRequestingText(newRef);
    const fetchInputText = processFetchText(textBoxRef);
    setInputText(fetchInputText);
    getCorrectorResult(JSON.stringify({ tekst: processCorrectorText(fetchInputText) }))
      .then(answer => {
        setComplexityAnswer(answer);
        processGrammarResponseIndexes(answer.grammatika, setGrammarAnswer);
        processGrammarResponseIndexes(answer.speller, setSpellerAnswer);
        setAbstractWords(answer.abstraktsus);
      });
    setRequestingText(null);
  };
  return (
    <div>
      <Button
        sx={DefaultButtonStyle}
        style={{ borderRadius: '5px', marginTop: '1rem' }}
        variant="contained"
        onClick={() => handleClick()}
      >
        {t('analyse_button')}
      </Button>
    </div>
  );
};
