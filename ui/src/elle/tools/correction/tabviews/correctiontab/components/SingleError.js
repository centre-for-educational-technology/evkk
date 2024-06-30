import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { resolvePunctuation } from '../helperFunctions/correctorErrorResolveFunctions';

export default function SingleError(
  {
    error,
    resolveError,
    type,
    errorList,
    setErrorList,
    inputText,
    setInputText,
    setSpellerAnswer,
    setGrammarAnswer,
    spellerAnswer,
    grammarAnswer,
    model
  }) {
  const [isHovering, setIsHovering] = useState(false);
  const isFirstRender = useRef(true);
  const errorValue = type === 'extraPunctuation' || type === 'missingPunctuation' ? 'punctuation' : 'errorno';
  let acceptText = error.replacements[0].value;
  let declineText = error.span.value;

  if (type === 'extraPunctuation' || type === 'missingPunctuation' || type === 'wrongPunctuation') {
    const resolvedPunctuation = resolvePunctuation(type, error);
    acceptText = resolvedPunctuation.acceptText;
    declineText = resolvedPunctuation.declineText;
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }


    if ((type === 'missingPunctuation' || type === 'extraPunctuation') && document.querySelector(`#punctuation_${error.index}`)) {
      document.querySelector(`#punctuation_${error.index}`).classList.toggle(`${type}hovering`);
    } else if (document.querySelector(`#errorno_${error.index}`)) {
      document.querySelector(`#errorno_${error.index}`).classList.toggle(`${type}hovering`);
    }
  }, [isHovering]);

  return (
    <div
      className="correction-single-error"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="corrector-error-word">{error.span.value}</span>
      -
      <strong>{error.replacements[0].value}</strong>
      <IconButton
        className="corrector-error-icon-button"
        color="success"
        onClick={() => resolveError(error.index, errorValue, acceptText, type, setErrorList, errorList, inputText, setInputText, setSpellerAnswer, setGrammarAnswer, grammarAnswer, spellerAnswer, model)}
      >
        <CheckCircleIcon fontSize={'medium'}/>
      </IconButton>
      <IconButton
        className="corrector-error-icon-button"
        onClick={() => resolveError(error.index, errorValue, declineText, type, setErrorList, errorList, inputText, setInputText, setSpellerAnswer, setGrammarAnswer, grammarAnswer, spellerAnswer, model)}
        color={'error'}
      >
        <CancelIcon fontSize={'medium'}/>
      </IconButton>
    </div>
  );
};
