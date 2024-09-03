import React from 'react';
import { Button } from '@mui/material';
import { DefaultButtonStyle } from '../../../const/StyleConstants';
import { useTranslation } from 'react-i18next';
import { processCorrectorText, processFetchText, processGrammarResponseIndexes } from '../util/Utils';
import {
  useGetAbstractResult,
  useGetCorrectorResult,
  useGetGrammarResults,
  useGetSpellerResults
} from '../../../hooks/service/ToolsService';

export default function CorrectionButton(
  {
    textBoxRef,
    setInputText,
    setComplexityAnswer,
    setGrammarAnswer,
    setSpellerAnswer,
    setAbstractWords,
    setRequestingText
  }) {
  const { t } = useTranslation();
  const { getGrammarResults } = useGetGrammarResults();
  const { getSpellerResults } = useGetSpellerResults();
  const { getCorrectorResult } = useGetCorrectorResult();
  const { getAbstractResult } = useGetAbstractResult();

  const handleClick = () => {
    const fetchInputText = processFetchText(textBoxRef);
    setInputText(fetchInputText);
    getCorrectorResult(JSON.stringify({ tekst: processCorrectorText(fetchInputText) })).then(r => setComplexityAnswer(r));
    getGrammarResults(JSON.stringify({
      language: 'et',
      text: fetchInputText
    })).then(v => processGrammarResponseIndexes(v, setGrammarAnswer));
    getSpellerResults(JSON.stringify({ tekst: fetchInputText })).then(v => processGrammarResponseIndexes(v, setSpellerAnswer));
    getAbstractResult(JSON.stringify({
      identifier: '',
      language: 'estonian',
      text: fetchInputText
    })).then(r => setAbstractWords(r));
    setRequestingText(false);
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
