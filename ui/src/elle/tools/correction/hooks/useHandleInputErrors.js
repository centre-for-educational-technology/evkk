import { useEffect } from 'react';
import { GRAMMARCHECKER, GRAMMARCHECKER_TEST, SPELLCHECKER } from '../const/Constants';
import { iterateCorrectionArray } from '../util/Utils';

export function useHandleInputErrors(inputType, hoveredId, errorsToRemove, setErrorList, setErrorsToRemove, model, setSpellerAnswer, setGrammarAnswer, setInnerValue, newRef, setHoveredId, setGrammarTestAnswer) {
  useEffect(() => {
    iterateCorrectionArray(inputType, hoveredId, setInnerValue, newRef, setHoveredId, setErrorList, model, setSpellerAnswer, setGrammarAnswer, setGrammarTestAnswer);
    if (!errorsToRemove) return;

    setErrorList((prevList) => {
      return Object.keys(prevList).reduce((newList, key) => {
        newList[key] = prevList[key].filter(
          (entry) =>
            !errorsToRemove.includes(entry.error_id) &&
            !errorsToRemove.includes(`${entry.error_id}_inner`)
        );
        return newList;
      }, {});
    });

    if (model === SPELLCHECKER) setSpellerAnswer(inputType);
    if (model === GRAMMARCHECKER) setGrammarAnswer(inputType);
    if (model === GRAMMARCHECKER_TEST) setGrammarTestAnswer(inputType);

    setErrorsToRemove(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputType, hoveredId]);
}

