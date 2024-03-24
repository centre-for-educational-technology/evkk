import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { ContentEditableDiv, replaceSpans } from '../../../const/Constants';
import ErrorSpanPopper from '../tabviews/correctiontab/components/ErrorSpanPopper';
import { loadFetch } from '../../../service/LoadFetch';
import useTypeTimeout from '../tabviews/correctiontab/hooks/useTypeTimeout';
import usePopUpHover from '../tabviews/correctiontab/hooks/usePopUpHover';
import useProcessTextCorrections from '../tabviews/correctiontab/hooks/useProcessTextCorrections';
import { handleInput, handlePaste } from '../helperFunctions/helperFunctions';
import { resolveError } from '../tabviews/correctiontab/helperFunctions/correctorErrorResolveFunctions';

export default function CorrectionInput({
                                          inputText,
                                          setInputText,
                                          model,
                                          responseText,
                                          setResponseText,
                                          errorList,
                                          setErrorList
                                        }) {
  const [popperAnchor, setPopperAnchor] = useState(null);
  const [popperValue, setPopperValue] = useState(null);
  const [timer, setTimer] = useState(setTimeout(() => {}, 0));
  const textBoxRef = useRef();
  const textBoxValueRef = useRef(inputText);

  useEffect(() => {
    if (!inputText || !responseText) return;
    fetchCorrection(inputText, setResponseText);
  }, []);

  const fetchCorrection = (val, setterFunction) => {
    loadFetch(model === 'grammarchecker' ? 'https://api.tartunlp.ai/grammar' : '/api/texts/spellchecker', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model === 'grammarchecker' ? {
        language: 'et',
        text: val
      } : {tekst: val})
    }).then((response) => {return response.json();}).then(response => {
      setterFunction(response);
    });
  };

  useProcessTextCorrections(responseText, textBoxRef, textBoxValueRef, setErrorList, setInputText);
  usePopUpHover('text-span', inputText, errorList, setPopperAnchor, setPopperValue);

  useTypeTimeout(timer, setTimer, fetchCorrection, setResponseText, textBoxRef, setInputText);

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
        onCopy={() => {navigator.clipboard.writeText(textBoxValueRef.current.replaceAll(replaceSpans, '').replaceAll('  ', ' '));}}
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
      />
    </div>
  );
};
