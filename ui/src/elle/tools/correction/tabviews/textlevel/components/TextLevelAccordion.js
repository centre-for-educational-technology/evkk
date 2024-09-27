import React from 'react';
import Accordion from '@mui/material/Accordion';
import { CorrectorAccordionStyle } from '../../../../../const/StyleConstants';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextLevelAccordionInner from './TextLevelAccordionInner';

export default function TextLevelAccordion({label, complexityAnswer, arrayValues}) {

  return (
    <div className="mb-2">
      <Accordion
        square={true}
        sx={CorrectorAccordionStyle}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {label}
        </AccordionSummary>
        <AccordionDetails>
          <TextLevelAccordionInner
            arrayValues={arrayValues}
            complexityAnswer={complexityAnswer}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
