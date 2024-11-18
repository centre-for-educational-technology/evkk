import React from 'react';
import { Button } from '@mui/material';
import { DefaultButtonStyle } from '../../../const/StyleConstants';
import { useTranslation } from 'react-i18next';
import { queryCaller } from '../util/Utils';
import { useGetCorrectorResult } from '../../../hooks/service/ToolsService';
import DownloadButton from './DownloadButton';

export default function CorrectionButton(
  {
    model,
    inputText,
    textBoxRef,
    setInputText,
    setComplexityAnswer,
    setGrammarAnswer,
    setSpellerAnswer,
    setAbstractWords,
    setRequestingText,
    newRef,
    errorList = null,
    tab = null,
    textLevel = null
  }) {
  const { t } = useTranslation();
  const { getCorrectorResult } = useGetCorrectorResult();

  const handleClick = () => {
    queryCaller(textBoxRef, inputText, setRequestingText, setGrammarAnswer, setSpellerAnswer, setInputText, newRef, setComplexityAnswer, setAbstractWords, getCorrectorResult, null, null, true);
  };
  return (
    <div className="d-flex justify-content-between">
      <Button
        sx={DefaultButtonStyle}
        style={{ borderRadius: '5px', marginTop: '1rem' }}
        variant="contained"
        onClick={() => handleClick()}
      >
        {t('analyse_button')}
      </Button>
      <DownloadButton innerHtml={textBoxRef} modelValue={model} newRef={newRef} errorList={errorList} tab={tab}
                      textLevel={textLevel}/>
    </div>
  );
};
