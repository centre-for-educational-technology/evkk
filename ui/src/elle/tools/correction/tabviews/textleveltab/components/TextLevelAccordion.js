import React from 'react';
import Accordion from '@mui/material/Accordion';
import { CorrectorAccordionStyle } from '../../../../../const/Constants';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';

export default function TextLevelAccordion({label, complexityAnswer, arrayValues, colors}) {
  const valueCheck = (value) => {
    return complexityAnswer[arrayValues[value]][0] < 1.01 && complexityAnswer[arrayValues[value]][0] > 0.009;
  };

  return (
    <div className="mb-2">
      <Accordion square={true} sx={CorrectorAccordionStyle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {label}
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {arrayValues.map((value, index) => {
              if (valueCheck(index)) {
                return (
                  <div
                    key={`textLevelKeys${complexityAnswer[arrayValues[index]][1]}`}>{complexityAnswer[arrayValues[index]][1]} - {(complexityAnswer[arrayValues[index]][0] * 100).toFixed(0)}%</div>);
              }
            })}
            <div className="d-flex mt-3 rounded overflow-hidden">
              {arrayValues.map((value, index) => {
                return (<div
                  key={`${complexityAnswer[arrayValues[index]][1]}`}
                  style={{
                    height: '20px',
                    backgroundColor: colors[index],
                    width: valueCheck(index) ? `${complexityAnswer[arrayValues[index]][0] * 100}%` : 0
                  }}>
                </div>);
              })}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
