import React, { useEffect, useState } from 'react';
import { Alert, Box, Divider } from '@mui/material';
import { ContentEditableDiv, CorrectorAccordionStyle } from '../../../../const/StyleConstants';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import '../../styles/VocabularyTab.css';
import {
  calculateAbstractnessAverage,
  calculateAbstractWords,
  calculateContentWord,
  calculateTotalWords,
  calculateUncommonWords
} from '../../util/VocabularyCalculations';
import CorrectionScale from '../../components/CorrectionScale';
import { handleCopy, handleInput, handlePaste } from '../../util/Utils';
import { markText } from '../../util/VocabularyMarkingHandlers';
import CorrectionButton from '../../components/CorrectionButton';
import CorrectionInfoIcon from '../../components/CorrectionInfoIcon';
import { MathJax } from 'better-react-mathjax';
import { useTranslation } from 'react-i18next';
import { useVocabularyConstants } from './constants/constants';
import CorrectionToggleButtonGroup from '../../components/CorrectionToggleButtonGroup';
import { VOCABULARY_TOOL_LINK } from '../../const/PathConstants';
import { VocabularyToggleButtons } from '../../const/ToggleButtonConstants';

export default function VocabularyTab(
  {
    textBoxRef,
    newRef,
    setNewRef,
    inputText,
    setInputText,
    complexityAnswer,
    setComplexityAnswer,
    abstractWords,
    setAbstractWords,
    setSpellerAnswer,
    setGrammarAnswer,
    setRequestingText
  }) {
  const {t} = useTranslation();
  const [model, setModel] = useState('wordrepetition');
  const [, setRenderTrigger] = useState(false);
  const {
    vocabularyRangeLink,
    dataLink,
    lexicalDensityLink,
    referenceLinkOne,
    referenceLinkTwo
  } = useVocabularyConstants();

  useEffect(() => {
    if (!inputText) return;
    markText(complexityAnswer, inputText, model, abstractWords, setNewRef, setRenderTrigger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, complexityAnswer]);

  return (
    <div className="corrector-border-box">
      <Box className="d-flex justify-content-between">
        <CorrectionToggleButtonGroup
          toggleButtons={VocabularyToggleButtons}
          correctionModel={model}
          setCorrectionModel={setModel}
          textBoxRef={textBoxRef}
          inputText={inputText}
          setInputText={setInputText}
          setRequestingText={setRequestingText}
          setGrammarAnswer={setGrammarAnswer}
          setSpellerAnswer={setSpellerAnswer}
          setComplexityAnswer={setComplexityAnswer}
          setAbstractWords={setAbstractWords}
        />
        <CorrectionInfoIcon
          inputText={<div>
            {t('corrector_vocabulary_infobox_intro')}
            <br></br><br></br>
            <ul>
              <li>
                <b>{t('corrector_vocabulary_infobox_root_type_token_bold')}</b> {t('corrector_vocabulary_infobox_root_type_token_value')}
                <MathJax
                  style={{padding: '0.5rem'}}>{`\\(\\frac{\\text{${t('common_different_word_count')}}}{\\sqrt{\\text{${t('common_word_count')}}}}\\)`}</MathJax>
              </li>
              <li>
                <b>{t('corrector_vocabulary_infobox_mtld_bold')}</b> {t('corrector_vocabulary_infobox_mtld_value')}
              </li>
              <li>
                <b>{t('corrector_vocabulary_infobox_hdd_bold')}</b> {t('corrector_vocabulary_infobox_hdd_value')}
              </li>
              <li>
                <b>{t('corrector_vocabulary_infobox_vocabulary_range_bold')}</b> {t('corrector_vocabulary_infobox_vocabulary_range_value')}{vocabularyRangeLink}).
              </li>
              <li>
                <b>{t('corrector_vocabulary_infobox_noun_abstractness_bold')}</b>&nbsp;
                {t('corrector_vocabulary_infobox_noun_abstractness_value')}&nbsp;
                {<a href={VOCABULARY_TOOL_LINK}> {t('common_tool')}</a>}&nbsp;
                {t('corrector_vocabulary_infobox_noun_abstractness_value_second')}&nbsp;
                {dataLink}&nbsp;
                {t('corrector_vocabulary_infobox_noun_abstractness_value_end')}
              </li>
              <li>
                <b>{t('corrector_vocabulary_infobox_lexical_density_bold')}</b> {t('corrector_vocabulary_infobox_lexical_density_value')}{lexicalDensityLink}
              </li>
            </ul>
            {t('corrector_vocabulary_infobox_reference_links')}{referenceLinkOne} {t('common_and')}{referenceLinkTwo}.
            <br></br><br></br>
            {t('corrector_vocabulary_infobox_outro')}
          </div>}/>
      </Box>
      <div className="d-flex gap-2">
        <div className="w-50 d-flex flex-column">
          <Box
            id={'error-text-box'}
            ref={textBoxRef}
            dangerouslySetInnerHTML={{__html: newRef}}
            spellCheck={false}
            suppressContentEditableWarning={true}
            sx={ContentEditableDiv}
            contentEditable={true}
            onCopy={(e) => handleCopy(e)}
            onPaste={(e) => handlePaste(e, textBoxRef.current.innerHTML, setNewRef, setInputText)}
            onChange={(e) => handleInput(e.target.innerText, e.target.innerHTML, setNewRef, setInputText)}
          >
          </Box>
          <CorrectionButton
            textBoxRef={textBoxRef}
            setInputText={setInputText}
            setComplexityAnswer={setComplexityAnswer}
            setGrammarAnswer={setGrammarAnswer}
            setSpellerAnswer={setSpellerAnswer}
            setAbstractWords={setAbstractWords}
            setRequestingText={setRequestingText}
          />
        </div>
        <div className="w-50 corrector-right">
          {complexityAnswer ?
            <div>
              <Accordion square={true} style={{marginBottom: '0.5em'}} sx={CorrectorAccordionStyle} defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {t('common_statistics')}
                </AccordionSummary>
                <AccordionDetails>
                  <div sx={{width: '100%'}}>
                    <div className="tab-table">
                      <div>{t('corrector_vocabulary_statistics_the_words_considered')}</div>
                      <div>{calculateTotalWords(abstractWords)}</div>
                    </div>
                    <div className="tab-table">
                      <div>{t('corrector_vocabulary_statistics_lemmas')}</div>
                      <div>{complexityAnswer.mitmekesisus[11]}</div>
                    </div>
                    <div className="tab-table">
                      <div>{t('corrector_vocabulary_statistics_low_frequency_words')}</div>
                      <div>{calculateUncommonWords(abstractWords)}</div>
                    </div>
                    <div className="tab-table">
                      <div>{t('corrector_vocabulary_statistics_content_words')}</div>
                      <div>{calculateContentWord(abstractWords)}</div>
                    </div>
                    {abstractWords &&
                      <div className="tab-table">
                        <div>{t('corrector_vocabulary_statistics_abstract_nouns')}</div>
                        <div>{calculateAbstractWords(abstractWords, complexityAnswer)}</div>
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
                  {t('common_indexes')}
                </AccordionSummary>
                <AccordionDetails className="index-row">
                  <CorrectionScale
                    title={t('corrector_vocabulary_indexes_root_type_token_ratio')}
                    startValue={0}
                    endValue={15}
                    value={complexityAnswer.mitmekesisus[1]}
                    startText={'Korduvam sõnavara'}
                    endText={'Mitmekesisem sõnavara'}
                  />
                  <Divider/>
                  {complexityAnswer.mitmekesisus[4] > -1 &&
                    <>
                      <CorrectionScale
                        title={t('corrector_vocabulary_mtld_index')}
                        startValue={0}
                        endValue={400}
                        value={complexityAnswer.mitmekesisus[4]}
                        startText={t('corrector_vocabulary_repetitive_vocabulary')}
                        endText={t('corrector_vocabulary_diverse_vocabulary')}
                      />
                      <Divider/>
                    </>
                  }
                  {complexityAnswer.mitmekesisus[5] > 0 &&
                    <>
                      <CorrectionScale
                        title={t('corrector_vocabulary_hdd_index')}
                        startValue={0.5}
                        endValue={1}
                        value={complexityAnswer.mitmekesisus[5]}
                        startText={t('corrector_vocabulary_repetitive_vocabulary')}
                        endText={t('corrector_vocabulary_diverse_vocabulary')}
                      />
                      <Divider/>
                    </>}
                  {abstractWords &&
                    <>
                      <CorrectionScale
                        title={t('corrector_vocabulary_noun_abstractness')}
                        startValue={1}
                        endValue={3}
                        value={calculateAbstractnessAverage(abstractWords)}
                        startText={t('corrector_vocabulary_more_concrete_vocabulary')}
                        endText={t('corrector_vocabulary_more_abstract_vocabulary')}
                      />
                      <Divider/>
                    </>
                  }
                  <CorrectionScale
                    title={t('corrector_vocabulary_range')}
                    startValue={0}
                    endValue={10}
                    value={calculateUncommonWords(abstractWords) * 100 / complexityAnswer.mitmekesisus[10]}
                    startText={t('corrector_vocabulary_repetitive_vocabulary')}
                    endText={t('corrector_vocabulary_diverse_vocabulary')}
                    percentage={true}
                  />
                  <Divider/>
                  <CorrectionScale
                    title={t('corrector_vocabulary_lexical_density')}
                    startValue={30}
                    endValue={70}
                    value={calculateContentWord(abstractWords) * 100 / complexityAnswer.mitmekesisus[10]}
                    startText={t('corrector_vocabulary_less_content_words')}
                    endText={t('corrector_vocabulary_more_content_words')}
                    percentage={true}
                  />
                  <Divider/>
                </AccordionDetails>
              </Accordion>
            </div>
            :
            <Box className="corrector-right-inner">
              {!complexityAnswer &&
                <Alert
                  severity="info"
                  className="level-tab-short-text-notice"
                >
                  {t('corrector_vocabulary_gray_box')}
                </Alert>
              }
            </Box>
          }
        </div>
      </div>
    </div>
  );
};
