import React from 'react';
import { toDecimalScale2OrInteger } from '../util/Utils';

export default function CorrectionScale({ title, startValue, endValue, value, startText, endText, percentage }) {
  const newEndValue = endValue < value ? Math.ceil(value / 5) * 5 : endValue;

  const sliderPercentageCorrection = () => {
    return (newEndValue - startValue) * startValue / 100;
  };

  const getSliderThumbPosition = () => {
    if (value < startValue) {
      return 0;
    }

    return 97 * (value - sliderPercentageCorrection()) / newEndValue;
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-2 font-weight-bold">
        <div>{title}</div>
        <div>{toDecimalScale2OrInteger(value)}{percentage && '%'}</div>
      </div>
      <div className="d-flex justify-content-around">
        <div className="slider-tip-indicator">{percentage ? `${startValue}%` : startValue}</div>
        <div className="slider-track">
          <div
            className="slider-thumb"
            style={{ left: `${getSliderThumbPosition()}%`, top: '-20%' }}
          />
          <div className="slider-labels">
            <div>{startText}</div>
            <div>{endText}</div>
          </div>
        </div>
        <div className="slider-tip-indicator">{percentage ? `${newEndValue}%` : newEndValue}</div>
      </div>
    </div>
  );
};
