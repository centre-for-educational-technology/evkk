import { useEffect } from 'react';
import {
  resolveErrorMarks,
  resolvePunctuationMarks,
  returnMarkingColor
} from '../helperFunctions/textErrorMarkingFunctions';
import { checkAllErrors } from '../helperFunctions/textErrorTypeFunctions';
import { replaceCombined } from '../../../../../const/Constants';

const replaceSpans = /<\/?span[^>]*>/g;

const useProcessTextCorrections = (responseText, textBoxRef, textBoxValueRef, setErrorList, setInputText, spellerAnswer, grammarAnswer) => {
  useEffect(() => {
    // Avoid resetting input text on tab change
    if (!responseText) return;

    const corrections = {
      spellingError: [],
      wordOrderError: [],
      missingWordError: [],
      extraWordError: [],
      wordCountError: [],
      multipleErrors: [],
      wrongPunctuation: [],
      extraPunctuation: [],
      missingPunctuation: []
    };
    let innerText = textBoxRef.current.innerHTML.replace(replaceCombined, '');
    responseText.corrections.forEach((correction, index) => {
      const errorWord = correction.span.value;
      const correctedWord = correction.replacements[0].value;
      const errorTypes = checkAllErrors(errorWord, correctedWord);
      const {
        spellingError,
        wordOrderError,
        missingWordError,
        extraWordError,
        wordCountError,
        multipleErrors,
        wrongPunctuation,
        extraPunctuation,
        missingPunctuation
      } = errorTypes;

      correction.index = index;

      if (wrongPunctuation || extraPunctuation || missingPunctuation) {
        innerText = resolvePunctuationMarks(wrongPunctuation, extraPunctuation, missingPunctuation, correction, errorWord, innerText, index);
        correction.errorId = `punctuation_${index}`;
      }

      if (spellingError || wordOrderError || missingWordError || extraWordError || wordCountError || multipleErrors) {
        const errorColor = returnMarkingColor(spellingError, wordOrderError, missingWordError, extraWordError, wordCountError, multipleErrors);
        innerText = resolveErrorMarks(correction, innerText, errorWord, index, wrongPunctuation, extraPunctuation, errorColor);
        correction.errorId = `errorno_${index}`;
      }

      Object.entries(errorTypes).forEach(([errorType, isTrue]) => {
        if (isTrue) {
          corrections[errorType].push(correction);
        }
      });
    });

    setErrorList(corrections);
    textBoxValueRef.current = innerText;
    setInputText(innerText);
  }, [responseText]);
};

export default useProcessTextCorrections;
