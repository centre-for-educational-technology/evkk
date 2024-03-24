import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { ContentEditableDiv, CorrectorAccordionStyle, replaceSpans } from '../../../../const/Constants';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import useTypeTimeout from '../correctiontab/hooks/useTypeTimeout';
import './style/vocabularyTab.css';
import {
  calculateAbstractnessAverage,
  calculateAbstractWords,
  calculateContentWord,
  calculateUncommonWords
} from './helperFunctions/vocabularyCalculations';
import CorrectionScale from '../../components/CorrectionScale';
import { handleInput, handleModelChange, handlePaste } from '../../helperFunctions/helperFunctions';
import {
  handleAbstractWords,
  handleContentWords,
  handleUncommonWords,
  handleWordRepetition
} from './helperFunctions/vocabularyMarkingHandlers';
import { getLanguageData } from '../../helperFunctions/queries/getLanguageData';

export default function VocabularyTab({inputText, setInputText}) {
  const [complexityAnswer, setComplexityAnswer] = React.useState(null);
  const [abstractAnswer, setAbstractAnswer] = React.useState();
  const [model, setModel] = useState('wordrepetition');
  const [timer, setTimer] = React.useState(setTimeout(() => {}, 0));
  const textBoxRef = React.useRef();
  const textBoxValueRef = React.useRef(inputText);
  const [, setRenderTrigger] = useState(false);
  const [firstRender, setFirstRender] = useState(true);


  useEffect(() => {
    if (inputText === '') return;
    if (firstRender) {
      getLanguageData(inputText, setComplexityAnswer);
      getAbstractWords();
      setFirstRender(false);
    }
  }, [inputText]);

  useEffect(() => {
    if (!abstractAnswer) return;
    markText();
  }, [abstractAnswer]);

  useEffect(() => {
    if (!complexityAnswer) return;
    getAbstractWords();
  }, [complexityAnswer]);

  useEffect(() => {
    markText();
  }, [model]);

  const markText = () => {
    if (!complexityAnswer) return;
    let text = textBoxValueRef.current.replaceAll(replaceSpans, '').replaceAll('  ', ' ');
    const sentences = text.split(/(?<=[.!?])\s+/);
    sentences.forEach((sentence, index) => {
      if (model === 'wordrepetition') {
        if (index < sentences.length - 1) {
          text = handleWordRepetition(sentence, sentences, index, text, complexityAnswer);
        }
      } else if (model === 'uncommonwords' && complexityAnswer) {
        text = handleUncommonWords(text, abstractAnswer, complexityAnswer);
      } else if (model === 'abstractwords' && abstractAnswer) {
        text = handleAbstractWords(text, abstractAnswer);
      } else if (model === 'contentwords') {
        text = handleContentWords(text, complexityAnswer);
      }
    });

    textBoxValueRef.current = text;
    setRenderTrigger(renderTrigger => !renderTrigger);
  };

  const getAbstractWords = () => {
    fetch('https://kiirlugemine.keeleressursid.ee/api/analyze', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: '',
        language: 'estonian',
        text: inputText === '' ? inputText : inputText.replaceAll(replaceSpans, '').replaceAll('  ', ' ')
      })
    }).then(v => v.json()).then(t => {
      setAbstractAnswer(t);
    });
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
          <ToggleButton value="wordrepetition">Sõnakordused</ToggleButton>
          <ToggleButton value="uncommonwords">Harvad sõnad</ToggleButton>
          <ToggleButton value="abstractwords">Abstraktsed sõnad</ToggleButton>
          <ToggleButton value="contentwords">Sisusõnad</ToggleButton>
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
                      <div>Arvestatud sõnu</div>
                      <div>{complexityAnswer.mitmekesisus[10]}</div>
                    </div>
                    <div className="tab-table">
                      <div>Lemmasid e. erinevaid sõnu</div>
                      <div>{complexityAnswer.mitmekesisus[11]}</div>
                    </div>
                    <div className="tab-table">
                      <div>Harvaesinevaid sõnu</div>
                      <div>{calculateUncommonWords(abstractAnswer)}</div>
                    </div>
                    <div className="tab-table">
                      <div>Sisusõnu</div>
                      <div>{calculateContentWord(abstractAnswer)}</div>
                    </div>
                    {abstractAnswer &&
                      <div className="tab-table">
                        <div>Abstraktseid nimisõnu</div>
                        <div>{calculateAbstractWords(abstractAnswer)}</div>
                      </div>
                    }
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
                <AccordionDetails className="index-row">
                  <CorrectionScale
                    title={'Erinevate ja kõigi sõnade juuritud suhtarv'}
                    startValue={0}
                    endValue={15}
                    value={complexityAnswer.mitmekesisus[1]}
                    startText={'Harvem sõnavara'}
                    endText={'Sagedam sõnavara'}
                  />
                  <Divider/>
                  {complexityAnswer[4] > -1 &&
                    <>
                      <CorrectionScale
                        title={'MTLD indeks'}
                        startValue={0}
                        endValue={400}
                        value={complexityAnswer.mitmekesisus[4]}
                        startText={'Konkreetsem sõnavara'}
                        endText={'Abstraktsem sõnavara'}
                      />
                      <Divider/>
                    </>
                  }
                  {complexityAnswer[5] > 0 &&
                    <>
                      <CorrectionScale
                        title={'HDD indeks'}
                        startValue={0.5}
                        endValue={1}
                        value={complexityAnswer.mitmekesisus[5]}
                        startText={'Vähem sisusõnu'}
                        endText={'Rohkem sisusõnu'}
                      />
                      <Divider/>
                    </>}
                  {abstractAnswer &&
                    <>
                      <CorrectionScale
                        title={'Nimisõnade abstraktsus'}
                        startValue={1}
                        endValue={3}
                        value={calculateAbstractnessAverage(abstractAnswer)}
                        startText={'Konkreetsem sõnavara'}
                        endText={'Abstraktsem sõnavara'}
                      />
                      <Divider/>
                    </>
                  }
                  <CorrectionScale
                    title={'Sõnavara ulatus'}
                    startValue={0}
                    endValue={10}
                    value={calculateUncommonWords(abstractAnswer) * 100 / complexityAnswer.mitmekesisus[10]}
                    startText={'Sagedam sõnavara'}
                    endText={'Harvem sõnavara'}
                    percentage={true}
                  />
                  <Divider/>
                  <CorrectionScale
                    title={'Leksikaalne tihedus'}
                    startValue={30}
                    endValue={70}
                    value={calculateContentWord(abstractAnswer) * 100 / complexityAnswer.mitmekesisus[10]}
                    startText={'Vähem sisusõnu'}
                    endText={'Rohkem sisusõnu'}
                    percentage={true}
                  />
                  <Divider/>
                </AccordionDetails>
              </Accordion>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
