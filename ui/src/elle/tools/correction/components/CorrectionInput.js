import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ContentEditableDiv } from '../../../const/StyleConstants';
import ErrorSpanPopper from '../tabviews/correction/components/ErrorSpanPopper';
import usePopUpHover from '../tabviews/correction/hooks/usePopUpHover';
import {
  getSpanIds,
  handleCopy,
  handlePaste,
  processTextCorrections,
  restoreCaretPosition,
  saveCaretPosition
} from '../util/Utils';
import { resolveError } from '../util/CorrectorErrorResolveFunctions';
import CorrectionButton from './CorrectionButton';
import { GRAMMARCHECKER, SPELLCHECKER, TEXTSPAN } from '../const/Constants';
import { removeEmptySpans } from '../../../util/TextUtils';

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
  const [children, setChildren] = useState(-1);

  useEffect(() => {
    if (model === SPELLCHECKER) setResponseText(spellerAnswer);
    if (model === GRAMMARCHECKER) setResponseText(grammarAnswer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, inputText, spellerAnswer, grammarAnswer]);

  useEffect(() => {
    processTextCorrections(responseText, inputText, setNewRef, setErrorList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseText, spellerAnswer, grammarAnswer, textBoxRef]);
  usePopUpHover(TEXTSPAN, newRef, errorList, setPopperAnchor, setPopperValue);

  const handleCorrectionPaste = (e) => {
    handlePaste(e, textBoxRef.current.innerHTML, setNewRef, setInputText);
    processTextCorrections(responseText, inputText, setNewRef, setErrorList, true);
  };

  useEffect(() => {
    setNewRef(newRef.replace(removeEmptySpans, ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textBoxRef.current.innerHTML]);

  useEffect(() => {
    if (!errorList) return;
    setChildren(Object.values(errorList).reduce((sum, currentArray) => sum + currentArray.length, 0));
  }, [errorList]);

  const handleContentChange = (e) => {
    const position = saveCaretPosition(textBoxRef.current);

    if (children > e.target.children.length) {
      const cleanedSpan = e.target.innerHTML.replace(removeEmptySpans, '');
      setNewRef(cleanedSpan);
      const spanIds = getSpanIds(cleanedSpan);
      setErrorList(Object.entries(errorList).reduce((acc, [key, array]) => {
        acc[key] = array.filter(error => spanIds.includes(error.errorId));
        return acc;
      }, {}));
    }
    setChildren(e.target.children.length);


    setTimeout(() => {
      restoreCaretPosition(textBoxRef.current, position);
    }, 0);
  };

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
        onPaste={(e) => handleCorrectionPaste(e)}
        onInput={handleContentChange}
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
