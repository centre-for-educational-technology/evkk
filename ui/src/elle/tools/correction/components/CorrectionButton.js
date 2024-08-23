import React from 'react';
import { Button } from '@mui/material';
import { DefaultButtonStyle } from '../../../const/Constants';
import { runFetches } from '../helperFunctions/queries/runFetches';
import { useTranslation } from 'react-i18next';

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
  const {t} = useTranslation();
  return (
    <div>
      <Button
        sx={DefaultButtonStyle}
        style={{borderRadius: '5px', marginTop: '1rem'}}
        variant="contained"
        onClick={() => runFetches(textBoxRef, setGrammarAnswer, setSpellerAnswer, setInputText, setComplexityAnswer, setAbstractWords, setRequestingText)}
      >
        {t('common_analyze')}
      </Button>
    </div>
  );
};
