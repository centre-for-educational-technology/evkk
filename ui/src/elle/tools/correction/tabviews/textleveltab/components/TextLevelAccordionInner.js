import React from 'react';
import { levelAccordionValueCheck } from '../helperfunctions/helperFunctions';
import { textLevelColors } from '../constants/constants';

export default function TextLevelAccordionInner({arrayValues, complexityAnswer}) {
  const setComplexityAnswerIndex = (index, value) => {
    return complexityAnswer[arrayValues[index]][value];
  };

  return (
    <div>
      {arrayValues.map((value, index) => {
        if (levelAccordionValueCheck(index, complexityAnswer, arrayValues)) {
          return (
            <div
              key={`textLevelKeys${setComplexityAnswerIndex(index, 1)}`}
            >
              {setComplexityAnswerIndex(index, 1)} - {(setComplexityAnswerIndex(index, 0) * 100).toFixed(0)}%
            </div>
          );
        }
      })}
      <div className="d-flex mt-3 rounded overflow-hidden">
        {arrayValues.map((value, index) => {
          return (<div
            key={`${setComplexityAnswerIndex(index, 1)}`}
            style={{
              height: '20px',
              backgroundColor: textLevelColors[index],
              width: levelAccordionValueCheck(index, complexityAnswer, arrayValues) ? `${setComplexityAnswerIndex(index, 0) * 100}%` : 0
            }}>
          </div>);
        })}
      </div>
    </div>
  );
};
