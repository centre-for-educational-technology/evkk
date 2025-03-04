import React from 'react';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ACCEPT_ERROR, DECLINE_ERROR } from '../../../const/Constants';

export default function SingleError(
  {
    error,
    setErrorList,
    setHoveredId,
    setInputType
  }) {

  const resolveErrors = (decision) => {
    setErrorList((prevList) => {
      return Object.keys(prevList).reduce((newList, key) => {
        newList[key] = prevList[key].filter((entry) => entry.error_id !== error.error_id);
        return newList;
      }, {});
    });

    setInputType(prevData =>
      prevData.map(entry =>
        entry.error_id === error.error_id ? {
          ...entry, ...{
            corrected: false,
            text: decision === ACCEPT_ERROR ? error.corrected_text : error.text
          }
        } : entry
      )
    );
  };

  return (
    <div
      className="correction-single-error"
      onMouseOver={() => setHoveredId(error.error_id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <span className="corrector-error-word">{error.text}</span>
      <KeyboardArrowRightIcon fontStyle={'small'}/>
      <strong>{error.corrected_text}</strong>
      <IconButton
        className="corrector-error-icon-button"
        color="success"
        onClick={() => resolveErrors(ACCEPT_ERROR)}
      >
        <CheckCircleIcon fontSize={'medium'}/>
      </IconButton>
      <IconButton
        className="corrector-error-icon-button"
        onClick={() => resolveErrors(DECLINE_ERROR)}
        color={'error'}
      >
        <CancelIcon fontSize={'medium'}/>
      </IconButton>
    </div>
  );
};
