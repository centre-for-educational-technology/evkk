import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { ContentEditableDiv, CorrectorAccordionStyle, replaceSpans } from '../../../../const/Constants';
import useTypeTimeout from '../correctiontab/hooks/useTypeTimeout';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import './style/complexityTab.css';
import { calculateNounCount, verbAndNounRelation } from './helperFunctions/complexityCalculations';
import { handleInput, handleModelChange, handlePaste } from '../../helperFunctions/helperFunctions';
import {
  handleLongSentenceMarking,
  handleLongWordMarking,
  handleNounMarking
} from './helperFunctions/complexityMarkingHandlers';
import CorrectionScale from '../../components/CorrectionScale';
import { getLanguageData } from '../../helperFunctions/queries/getLanguageData';

export default function ComplexityTab({inputText, setInputText}) {
  const [complexityAnswer, setComplexityAnswer] = React.useState(null);
  const [model, setModel] = useState('longsentence');
  const [nounCount, setNounCount] = useState(0);
  const [timer, setTimer] = React.useState(setTimeout(() => {}, 0));
  const textBoxRef = React.useRef();
  const textBoxValueRef = React.useRef(inputText);
  const [, setRenderTrigger] = useState(false);
  const [firstRender, setFirstRender] = useState(true);


  useEffect(() => {
    if (inputText === '') return;
    if (firstRender) {
      getLanguageData(inputText, setComplexityAnswer);
      setFirstRender(false);
    }
  }, [inputText]);

  useEffect(() => {
    if (!complexityAnswer) return;
    calculateNounCount(complexityAnswer, setNounCount);
    markText();
  }, [complexityAnswer]);

  useEffect(() => {
    markText();
  }, [model]);

  const markText = () => {
    let text = textBoxValueRef.current.replaceAll(replaceSpans, '').replaceAll('  ', ' ');
    const sentences = text.split(/(?<=[.!?])\s+/);
    sentences.forEach((sentence) => {
      const words = sentence.split(' ');
      if (words.length > 15 && model === 'longsentence') {
        text = handleLongSentenceMarking(text, sentence);
      }
      if (model === 'longword') {
        text = handleLongWordMarking(text, complexityAnswer);
      }
      if (model === 'nouns') {
        text = handleNounMarking(text, complexityAnswer);
      }
    });
    textBoxValueRef.current = text;
    setRenderTrigger(renderTrigger => !renderTrigger);
  };

  useTypeTimeout(timer, setTimer, getLanguageData, setComplexityAnswer, textBoxRef, setInputText);

  return (
    <div className="corrector-border-box">
      <Box className="d-flex mb-2">
        <strong>Märgi tekstis:</strong>
        <ToggleButtonGroup
          color="primary"
          value={model}
          sx={{height: '1em', paddingLeft: '1em'}}
          exclusive
          onChange={(e) => handleModelChange(setModel, e)}
          aria-label="Platform"
        >
          <ToggleButton value="longsentence">Pikad laused</ToggleButton>
          <ToggleButton value="longword">Pikad sõnad</ToggleButton>
          <ToggleButton value="nouns">Nimisõnad</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <div className="d-flex gap-2">
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
        </div>
        <div className="w-50 corrector-right">
          {complexityAnswer &&
            <div>
              <div style={{marginBottom: '0.5em', fontSize: '1.5em'}}>Keerukustase: {complexityAnswer[11]}</div>
              <Accordion square={true} style={{marginBottom: '0.5em'}} sx={CorrectorAccordionStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Statistika
                </AccordionSummary>
                <AccordionDetails>
                  <div sx={{width: '100%'}}>
                    <div className="tab-table">
                      <div>Lauseid</div>
                      <div>{complexityAnswer.keerukus[0]}</div>
                    </div>
                    <div className="tab-table">
                      <div>Sõnu</div>
                      <div>{complexityAnswer.keerukus[1]}</div>
                    </div>
                    <div className="tab-table">
                      <div>Silpe</div>
                      <div>{complexityAnswer.keerukus[3]}</div>
                    </div>
                    <div className="tab-table">
                      <div>Paljusilblilisi sõnu</div>
                      <div>{complexityAnswer.keerukus[2]}</div>
                    </div>
                    <div className="tab-table">
                      <div>Pikki sõnu</div>
                      <div>{complexityAnswer.keerukus[4]}</div>
                    </div>
                    <div className="tab-table">
                      <div>Nimisõnu</div>
                      <div>{nounCount}</div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion square={true} sx={CorrectorAccordionStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Indeksid
                </AccordionSummary>
                <AccordionDetails className="index-row pb-lg-5">
                  <CorrectionScale
                    title={'SMOG indeks'}
                    startValue={0}
                    endValue={25}
                    value={complexityAnswer.keerukus[5]}
                    startText={'kerge'}
                    endText={'raske'}
                  />
                  <Divider/>
                  <CorrectionScale
                    title={'Flesh-Kincaidi indeks'}
                    startValue={0}
                    endValue={30}
                    value={complexityAnswer.keerukus[6]}
                    startText={'kerge'}
                    endText={'raske'}
                  />
                  <Divider/>
                  <CorrectionScale
                    title={'LIX indeks'}
                    startValue={20}
                    endValue={80}
                    value={complexityAnswer.keerukus[7]}
                    startText={'kerge'}
                    endText={'raske'}
                  />
                  <Divider/>
                  <CorrectionScale
                    title={'Nimi- ja tegusõnade suhe'}
                    startValue={0}
                    endValue={3}
                    value={verbAndNounRelation(complexityAnswer)}
                    startText={'Tegusõnalisem'}
                    endText={'Nimisõnalisem'}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
