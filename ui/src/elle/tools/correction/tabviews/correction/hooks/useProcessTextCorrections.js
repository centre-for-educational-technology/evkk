import { useEffect } from 'react';
import {
  resolveErrorMarks,
  resolvePunctuationMarks,
  returnMarkingColor
} from '../../../util/TextErrorMarkingFunctions';
import { checkAllErrors } from '../../../util/TextErrorTypeFunctions';
import { replaceCombined } from '../../../../../const/Constants';

const useProcessTextCorrections = (responseText, textBoxRef, textBoxValueRef, setErrorList, setInputText, spellerAnswer, grammarAnswer) => {
  useEffect(() => {
    // Avoid resetting input text on tab change
    if (!responseText) return;
    if (!textBoxRef) return;

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

    let innerText = textBoxRef.replace(replaceCombined, '');
    let mainIndex = 0;
    responseText.corrections.forEach((correction, _) => {
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

      if (wrongPunctuation || extraPunctuation || missingPunctuation) {
        const correctionCopy = {...correction};
        innerText = resolvePunctuationMarks(wrongPunctuation, extraPunctuation, missingPunctuation, correctionCopy, errorWord, innerText, mainIndex);
        correctionCopy.errorId = `punctuation_${mainIndex}`;
        correctionCopy.index = mainIndex;
        const punctuationErrors = [wrongPunctuation, extraPunctuation, missingPunctuation];
        const punctuationString = ['wrongPunctuation', 'extraPunctuation', 'missingPunctuation'];
        punctuationErrors.forEach((errorType, index) => {
          if (errorType) {
            corrections[punctuationString[index]].push(correctionCopy);
          }
        });
        mainIndex++;
      }

      if (spellingError || wordOrderError || missingWordError || extraWordError || wordCountError || multipleErrors) {
        const errorColor = returnMarkingColor(spellingError, wordOrderError, missingWordError, extraWordError, wordCountError, multipleErrors);
        if (spellingError && errorWord.split(' ').length !== 1) {
          const errorWords = errorWord.split(' ').reverse();
          let newSpan = correction.span.value.split(' ').reverse();
          const replaceWords = correction.replacements[0].value.split(' ').reverse();
          let endVal = correction.span.end;
          let wrongPunctuationCopy = wrongPunctuation;
          let extraPunctuationCopy = extraPunctuation;
          errorWords.forEach((word, errorIndex) => {
            if (errorIndex > 0) {
              wrongPunctuationCopy = false;
              extraPunctuationCopy = false;
            }
            const correctionCopy = {...correction};
            correctionCopy.span = {start: endVal - word.length, end: endVal, value: newSpan[errorIndex]};
            correctionCopy.replacements = [{value: replaceWords[errorIndex]}];
            innerText = resolveErrorMarks(correctionCopy, innerText, word, mainIndex, wrongPunctuationCopy, extraPunctuationCopy, errorColor);
            correctionCopy.errorId = `errorno_${mainIndex}`;
            correctionCopy.index = mainIndex;
            endVal = correctionCopy.span.end - word.length - 1;
            corrections['spellingError'].push(correctionCopy);
            mainIndex++;
          });
        } else {
          const correctionCopy = {...correction};
          innerText = resolveErrorMarks(correctionCopy, innerText, errorWord, mainIndex, wrongPunctuation, extraPunctuation, errorColor);
          correctionCopy.errorId = `errorno_${mainIndex}`;
          correctionCopy.index = mainIndex;
          const spellingErrors = [spellingError, wordOrderError, missingWordError, extraWordError, wordCountError, multipleErrors];
          const spellingString = ['spellingError', 'wordOrderError', 'missingWordError', 'extraWordError', 'wordCountError', 'multipleErrors'];
          spellingErrors.forEach((errorType, index) => {
            if (errorType) {
              corrections[spellingString[index]].push(correctionCopy);
            }
          });
          mainIndex++;
        }
      }
    });

    setErrorList(corrections);
    textBoxValueRef(innerText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseText, spellerAnswer, grammarAnswer, textBoxRef]);
};

export default useProcessTextCorrections;
