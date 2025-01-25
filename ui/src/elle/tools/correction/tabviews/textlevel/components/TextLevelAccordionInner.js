import React from 'react';
import { levelAccordionValueCheck, setComplexityAnswerIndex } from '../../../util/Utils';
import { textLevelColors } from '../../../const/TabValuesConstant';

export default function TextLevelAccordionInner({ arrayValues, complexityAnswer }) {

  return (
    <div>
      {arrayValues.map((value, index) => (
        levelAccordionValueCheck(index, complexityAnswer, arrayValues) && (
          <div
            key={`textLevelKeys${setComplexityAnswerIndex(index, 1, complexityAnswer, arrayValues)}`}
          >
            {setComplexityAnswerIndex(index, 1, complexityAnswer, arrayValues)} - {(setComplexityAnswerIndex(index, 0, complexityAnswer, arrayValues) * 100).toFixed(0)}%
          </div>
        )
      ))}
      <div className="d-flex mt-3 rounded overflow-hidden">
        {arrayValues.map((value, index) => {
          return (<div
            key={`${setComplexityAnswerIndex(index, 1, complexityAnswer, arrayValues)}`}
            style={{
              height: '20px',
              backgroundColor: textLevelColors[index],
              width: levelAccordionValueCheck(index, complexityAnswer, arrayValues) ? `${setComplexityAnswerIndex(index, 0, complexityAnswer, arrayValues) * 100}%` : 0
            }}>
          </div>);
        })}
      </div>
    </div>
  );
};
