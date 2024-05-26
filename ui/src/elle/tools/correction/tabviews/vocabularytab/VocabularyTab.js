import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { ContentEditableDiv, CorrectorAccordionStyle, replaceCombined } from '../../../../const/Constants';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
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
  handleSameWordRepetition,
  handleUncommonWords,
  handleWordRepetition
} from './helperFunctions/vocabularyMarkingHandlers';
import CorrectionButton from '../../components/CorrectionButton';

export default function VocabularyTab(
  {
    inputText,
    setInputText,
    complexityAnswer,
    setComplexityAnswer,
    abstractWords,
    setAbstractWords,
    setSpellerAnswer,
    setGrammarAnswer
  }) {
  const [model, setModel] = useState('wordrepetition');
  const textBoxRef = React.useRef();
  const textBoxValueRef = React.useRef(inputText);
  const [, setRenderTrigger] = useState(false);

  useEffect(() => {
    if (!inputText) return;
    markText();
  }, [model]);

  const markText = () => {
    if (!complexityAnswer) return;
    let text = textBoxValueRef.current.replaceAll(replaceCombined, '').replaceAll('  ', ' ');
    const sentences = text.split(/(?<=[.!?])\s+/);
    let currentWordIndex = 0;
    sentences.forEach((sentence, index) => {
      if (model === 'wordrepetition') {
        const usedIndexes = {start: currentWordIndex, end: currentWordIndex + sentence.split(' ').length};
        const tempSentence = text.split(/(?<=[.!?])\s+/)[index];
        text = handleSameWordRepetition(tempSentence, text, usedIndexes, complexityAnswer);
        if (index < sentences.length - 1) {
          currentWordIndex = usedIndexes.end;
          text = handleWordRepetition(tempSentence, sentences[index + 1], usedIndexes, text, complexityAnswer);
        }
      } else if (model === 'uncommonwords' && complexityAnswer) {
        text = handleUncommonWords(text, abstractWords, complexityAnswer);
      } else if (model === 'abstractwords' && abstractWords) {
        text = handleAbstractWords(text, abstractWords);
      } else if (model === 'contentwords') {
        text = handleContentWords(text, complexityAnswer);
      }
    });

    textBoxValueRef.current = text;
    setRenderTrigger(renderTrigger => !renderTrigger);
  };

  console.log(complexityAnswer);

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
            onCopy={() => {navigator.clipboard.writeText(textBoxValueRef.current.replaceAll(replaceCombined, '').replaceAll('  ', ' '));}}
            onPaste={(e) => handlePaste(e, textBoxValueRef, setInputText)}
            onChange={(e) => handleInput(e.target.innerText, e.target.innerHTML, textBoxValueRef)}
          >
          </Box>
          <CorrectionButton
            inputText={inputText}
            textBoxRef={textBoxRef}
            setInputText={setInputText}
            setComplexityAnswer={setComplexityAnswer}
            setGrammarAnswer={setGrammarAnswer}
            setSpellerAnswer={setSpellerAnswer}
            setAbstractWords={setAbstractWords}
          />
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
                      <div>{calculateUncommonWords(abstractWords)}</div>
                    </div>
                    <div className="tab-table">
                      <div>Sisusõnu</div>
                      <div>{calculateContentWord(abstractWords)}</div>
                    </div>
                    {abstractWords &&
                      <div className="tab-table">
                        <div>Abstraktseid nimisõnu</div>
                        <div>{calculateAbstractWords(abstractWords)}</div>
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
                  {abstractWords &&
                    <>
                      <CorrectionScale
                        title={'Nimisõnade abstraktsus'}
                        startValue={1}
                        endValue={3}
                        value={calculateAbstractnessAverage(abstractWords)}
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
                    value={calculateUncommonWords(abstractWords) * 100 / complexityAnswer.mitmekesisus[10]}
                    startText={'Sagedam sõnavara'}
                    endText={'Harvem sõnavara'}
                    percentage={true}
                  />
                  <Divider/>
                  <CorrectionScale
                    title={'Leksikaalne tihedus'}
                    startValue={30}
                    endValue={70}
                    value={calculateContentWord(abstractWords) * 100 / complexityAnswer.mitmekesisus[10]}
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
