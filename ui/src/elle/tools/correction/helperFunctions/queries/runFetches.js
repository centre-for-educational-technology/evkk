import { replaceCombined, replaceSpaces, replaceSpaceTags } from '../../../../const/Constants';
import { getCorrections } from './getCorrections';
import { getLanguageData } from './getLanguageData';
import { getAbstractWords } from './getAbstractWords';

export const runFetches = async (textBoxRef, setGrammarAnswer, setSpellerAnswer, setInputText, setComplexityAnswer, setAbstractWords, setRequestingText) => {
  const textBoxValue = textBoxRef.current.innerText.replace(replaceCombined, '');
  const boxNoSpaceTags = textBoxValue.replace(replaceSpaceTags, ' ');
  const boxNoSpaces = boxNoSpaceTags.replace(replaceSpaces, ' ');
  await getCorrections(boxNoSpaces, setGrammarAnswer, setSpellerAnswer);
  setInputText(boxNoSpaces);
  getLanguageData(boxNoSpaces, setComplexityAnswer);
  getAbstractWords(boxNoSpaces, setAbstractWords);
  setRequestingText(false);
};
