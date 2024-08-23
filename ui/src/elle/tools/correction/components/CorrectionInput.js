import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ContentEditableDiv } from '../../../const/Constants';
import ErrorSpanPopper from '../tabviews/correctiontab/components/ErrorSpanPopper';
import usePopUpHover from '../tabviews/correctiontab/hooks/usePopUpHover';
import useProcessTextCorrections from '../tabviews/correctiontab/hooks/useProcessTextCorrections';
import { handleCopy, handleInput, handlePaste } from '../helperFunctions/helperFunctions';
import { resolveError } from '../tabviews/correctiontab/helperFunctions/correctorErrorResolveFunctions';
import CorrectionButton from './CorrectionButton';
import { useTranslation } from 'react-i18next';

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
    setAbstractWords
  }) {
  const {t} = useTranslation();
  const [popperAnchor, setPopperAnchor] = useState(null);
  const [popperValue, setPopperValue] = useState(null);

  useEffect(() => {
    if (model === 'spellchecker') setResponseText(spellerAnswer);
    if (model === 'grammarchecker') setResponseText(grammarAnswer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, inputText, spellerAnswer, grammarAnswer]);

  useProcessTextCorrections(responseText, inputText, setNewRef, setErrorList, setInputText, spellerAnswer, grammarAnswer);
  usePopUpHover('text-span', newRef, errorList, setPopperAnchor, setPopperValue);

  return (
    <div className="w-50 d-flex flex-column">
      <Box
        id={'error-text-box'}
        ref={textBoxRef}
        dangerouslySetInnerHTML={{__html: requestingText ? t('common_analyzing_text') : newRef}}
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
        textBoxRef={textBoxRef}
        setInputText={setInputText}
        setComplexityAnswer={setComplexityAnswer}
        setGrammarAnswer={setGrammarAnswer}
        setSpellerAnswer={setSpellerAnswer}
        setAbstractWords={setAbstractWords}
        setRequestingText={setRequestingText}
      />
    </div>
  );
};
