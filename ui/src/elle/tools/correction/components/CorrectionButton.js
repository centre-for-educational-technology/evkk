import React from 'react';
import { Button } from '@mui/material';
import { DefaultButtonStyle, replaceCombined, replaceSpaces, replaceSpaceTags } from '../../../const/Constants';
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
    const textBoxValue = textBoxRef.current.innerHTML.replace(replaceCombined, '');
    const boxNoSpaceTags = textBoxValue.replace(replaceSpaceTags, ' ');
    const boxNoSpaces = boxNoSpaceTags.replace(replaceSpaces, ' ');
    await getCorrections(boxNoSpaces, setGrammarAnswer, setSpellerAnswer);
    setInputText(boxNoSpaces);
    getLanguageData(boxNoSpaces, setComplexityAnswer);
    getAbstractWords(boxNoSpaces, setAbstractWords);
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
