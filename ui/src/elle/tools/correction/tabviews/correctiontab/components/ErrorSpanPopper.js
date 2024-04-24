import React from 'react';
import { Paper, Popper } from '@mui/material';
import '../styles/errorSpanPopper.css';
import SingleError from './SingleError';

export default function ErrorSpanPopper(
  {
    popperAnchor,
    popperValue,
    resolveError,
    errorList,
    setErrorList,
    inputText,
    setInputText,
    setGrammarAnswer,
    setSpellerAnswer,
    grammarAnswer,
    spellerAnswer
  }) {
  const open = Boolean(popperAnchor);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div className="error-span-popper">
      <Popper id={id} open={open} anchorEl={popperAnchor} placement="top">
        <Paper className="error-popper-container">
          {popperValue &&
            <SingleError
              error={popperValue.error}
              type={popperValue.type}
              resolveError={resolveError}
              errorList={errorList}
              setErrorList={setErrorList}
              inputText={inputText}
              setInputText={setInputText}
              setGrammarAnswer={setGrammarAnswer}
              setSpellerAnswer={setSpellerAnswer}
              grammarAnswer={grammarAnswer}
              spellerAnswer={spellerAnswer}
            />
          }
        </Paper>
      </Popper>
    </div>
  );
};
