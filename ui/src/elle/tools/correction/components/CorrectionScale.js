import React from 'react';

export default function CorrectionScale({ title, startValue, endValue, value, startText, endText, percentage }) {
  const newEndValue = endValue < value ? Math.ceil(value / 5) * 5 : endValue;

  const sliderPercentageCorrection = () => {
    return (newEndValue - startValue) * startValue / 100;
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-2 font-weight-bold">
        <div>{title}</div>
        <div>{parseFloat(value).toFixed(2)}{percentage && '%'}</div>
      </div>
      <div className="d-flex justify-content-around">
        <div>{percentage ? `${startValue}%` : startValue}</div>
        <div className="slider-track">
          <div className="slider-thumb"
               style={{ left: `${97 * (value - sliderPercentageCorrection()) / newEndValue}%`, top: '-20%' }}></div>
          <div className="slider-labels">
            <div>{startText}</div>
            <div>{endText}</div>
          </div>
        </div>
        <div>{percentage ? `${newEndValue}%` : newEndValue}</div>
      </div>
    </div>
  );
};
