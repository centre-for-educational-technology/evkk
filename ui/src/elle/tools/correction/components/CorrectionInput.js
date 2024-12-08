import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ContentEditableDiv } from '../../../const/StyleConstants';
import ErrorSpanPopper from '../tabviews/correction/components/ErrorSpanPopper';
import usePopUpHover from '../tabviews/correction/hooks/usePopUpHover';
import useProcessTextCorrections from '../tabviews/correction/hooks/useProcessTextCorrections';
import { handleCopy, handleInput, handlePaste } from '../util/Utils';
import { resolveError } from '../util/CorrectorErrorResolveFunctions';
import CorrectionButton from './CorrectionButton';
import { GRAMMARCHECKER, SPELLCHECKER, TEXTSPAN } from '../const/Constants';

export default function CorrectionInput(
  {
    requestingText,
    setRequestingText,
    textBoxRef,
    newRef,
    setNewRef,
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
    setAbstractWords,
    tab,
    complexityAnswer
  }) {
  const [popperAnchor, setPopperAnchor] = useState(null);
  const [popperValue, setPopperValue] = useState(null);

  useEffect(() => {
    if (model === SPELLCHECKER) setResponseText(spellerAnswer);
    if (model === GRAMMARCHECKER) setResponseText(grammarAnswer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, inputText, spellerAnswer, grammarAnswer]);

  useProcessTextCorrections(responseText, inputText, setNewRef, setErrorList, setInputText, spellerAnswer, grammarAnswer);
  usePopUpHover(TEXTSPAN, newRef, errorList, setPopperAnchor, setPopperValue);

  return (
    <div className="w-50 d-flex flex-column">
      <Box
        id={'error-text-box'}
        ref={textBoxRef}
        dangerouslySetInnerHTML={{ __html: requestingText || newRef }}
        spellCheck={false}
        suppressContentEditableWarning={true}
        sx={ContentEditableDiv}
        contentEditable={true}
        onCopy={(e) => handleCopy(e)}
        onPaste={(e) => handlePaste(e, textBoxRef.current.innerHTML, setNewRef, setInputText)}
        onChange={(e) => handleInput(e.target.innerText, e.target.innerHTML, setNewRef, setInputText)}
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
        model={model}
      />
      <CorrectionButton
        model={model}
        inputText={inputText}
        replacementText={newRef}
        setNewRef={setNewRef}
        textBoxRef={textBoxRef}
        setInputText={setInputText}
        setComplexityAnswer={setComplexityAnswer}
        setGrammarAnswer={setGrammarAnswer}
        setSpellerAnswer={setSpellerAnswer}
        setAbstractWords={setAbstractWords}
        setRequestingText={setRequestingText}
        errorList={errorList}
        tab={tab}
        textLevel={complexityAnswer}
      />
    </div>
  );
};
