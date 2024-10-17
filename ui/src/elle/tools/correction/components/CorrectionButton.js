import React from 'react';
import { Button } from '@mui/material';
import { DefaultButtonStyle } from '../../../const/StyleConstants';
import { useTranslation } from 'react-i18next';
import { queryCaller } from '../util/Utils';
import { useGetCorrectorResult } from '../../../hooks/service/ToolsService';

export default function CorrectionButton(
  {
    inputText,
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
    queryCaller(textBoxRef, inputText, setRequestingText, setGrammarAnswer, setSpellerAnswer, setInputText, newRef, setComplexityAnswer, setAbstractWords, getCorrectorResult, null, null, true);
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
