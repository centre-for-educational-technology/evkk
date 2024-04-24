import React from 'react';
import { Button } from '@mui/material';
import { DefaultButtonStyle, replaceCombined } from '../../../const/Constants';
import { getLanguageData } from '../helperFunctions/queries/getLanguageData';
import { getCorrections } from '../helperFunctions/queries/getCorrections';
import { getAbstractWords } from '../helperFunctions/queries/getAbstractWords';

export default function CorrectionButton(
  {
    textBoxRef,
    inputText,
    setInputText,
    setComplexityAnswer,
    setGrammarAnswer,
    setSpellerAnswer,
    setAbstractWords
  }) {
  const runFetches = async () => {
    await getCorrections(textBoxRef.current.innerHTML.replace(replaceCombined, ''), setGrammarAnswer, setSpellerAnswer);
    setInputText(textBoxRef.current.innerHTML.replace(replaceCombined, ''));
    getLanguageData(textBoxRef.current.innerHTML.replace(replaceCombined, ''), setComplexityAnswer);
    getAbstractWords(textBoxRef.current.innerHTML.replace(replaceCombined, ''), setAbstractWords);
  };
  return (
    <div>
      <Button
        sx={DefaultButtonStyle}
        style={{borderRadius: '5px', marginTop: '1rem'}}
        variant="contained"
        onClick={() => runFetches()}
      >
        Analüüsi
      </Button>
    </div>
  );
};
