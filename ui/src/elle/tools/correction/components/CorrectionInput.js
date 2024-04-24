import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { ContentEditableDiv, replaceCombined } from '../../../const/Constants';
import ErrorSpanPopper from '../tabviews/correctiontab/components/ErrorSpanPopper';
import usePopUpHover from '../tabviews/correctiontab/hooks/usePopUpHover';
import useProcessTextCorrections from '../tabviews/correctiontab/hooks/useProcessTextCorrections';
import { handleInput, handlePaste } from '../helperFunctions/helperFunctions';
import { resolveError } from '../tabviews/correctiontab/helperFunctions/correctorErrorResolveFunctions';
import CorrectionButton from './CorrectionButton';

export default function CorrectionInput(
  {
    inputText,
    setInputText,
    model,
    responseText,
    setResponseText,
    errorList,
    setErrorList,
    setComplexityAnswer,
    spellerAnswer,
    grammarAnswer,
    setSpellerAnswer,
    setGrammarAnswer,
    setAbstractWords
  }) {
  const [popperAnchor, setPopperAnchor] = useState(null);
  const [popperValue, setPopperValue] = useState(null);
  const textBoxRef = useRef();
  const textBoxValueRef = useRef(inputText);

  useEffect(() => {
    if (model === 'spellchecker') setResponseText(spellerAnswer);
    if (model === 'grammarchecker') setResponseText(grammarAnswer);
  }, [model]);

  useProcessTextCorrections(responseText, textBoxRef, textBoxValueRef, setErrorList, setInputText, spellerAnswer, grammarAnswer);
  usePopUpHover('text-span', inputText, errorList, setPopperAnchor, setPopperValue);

  console.log(textBoxValueRef.current, inputText);

  return (
    <div className="w-50 d-flex flex-column">
      <Box
        id={'error-text-box'}
        ref={textBoxRef}
        dangerouslySetInnerHTML={{__html: textBoxValueRef.current}}
        spellCheck={false}
        suppressContentEditableWarning={true}
        sx={ContentEditableDiv}
        contentEditable={true}
        onCopy={() => {navigator.clipboard.writeText(textBoxValueRef.current.replaceAll(replaceCombined, '').replaceAll('  ', ' '));}}
        onPaste={(e) => handlePaste(e, textBoxValueRef, setInputText)}
        onChange={(e) => handleInput(e.target.innerText, e.target.innerHTML, textBoxValueRef)}
      >
      </Box>
      <ErrorSpanPopper
        popperAnchor={popperAnchor}
        popperValue={popperValue}
        resolveError={resolveError}
        inputText={inputText}
        setInputText={setInputText}
        setErrorList={setErrorList}
        errorList={errorList}
        setGrammarAnswer={setGrammarAnswer}
        setSpellerAnswer={setSpellerAnswer}
        grammarAnswer={grammarAnswer}
        spellerAnswer={spellerAnswer}
      />
      <CorrectionButton
        inputText={inputText}
        textBoxRef={textBoxRef}
        setInputText={setInputText}
        setComplexityAnswer={setComplexityAnswer}
        setGrammarAnswer={setGrammarAnswer}
        setSpellerAnswer={setSpellerAnswer}
        setAbstractWords={setAbstractWords}
      />
    </div>
  );
};
