import React from 'react';
import { Alert, Box } from '@mui/material';
import '../../styles/CorrectionTab.css';
import CorrectionInput from '../../components/CorrectionInput';
import '../../styles/TextLevelTab.css';
import TextLevelAccordion from './components/TextLevelAccordion';
import TextLevelAccordionInner from './components/TextLevelAccordionInner';
import CorrectionInfoIcon from '../../components/CorrectionInfoIcon';
import CorrectionToggleButtonGroup from '../../components/CorrectionToggleButtonGroup';
import { useTranslation } from 'react-i18next';
import { CorrectionAndTextLevelToggleButtons } from '../../const/ToggleButtonConstants';
import { accordionDetails, textLevelColors, textLevels } from '../../const/TabValuesConstant';
import { GRAMMARCHECKER_TEST, TEXTLEVEL } from '../../const/Constants';

export default function TextLevelTab(
  {
    textBoxRef,
    requestingText,
    setRequestingText,
    newRef,
    setNewRef,
    setInputText,
    inputText,
    errorList,
    setErrorList,
    complexityAnswer,
    setComplexityAnswer,
    correctionModel,
    setCorrectionModel,
    spellerAnswer,
    grammarAnswer,
    setAbstractWords,
    setSpellerAnswer,
    setGrammarAnswer,
    setGrammarErrorList,
    setSpellerErrorList,
    setHoveredId,
    setGrammarTestAnswer,
    setGrammarTestErrorList,
    grammarTestAnswer
  }) {
  const { t } = useTranslation();

  return (
    <div className="corrector-border-box">
      <Box className="d-flex justify-content-between">
        {correctionModel !== GRAMMARCHECKER_TEST && <CorrectionToggleButtonGroup
          newRef={newRef}
          correctionModel={correctionModel}
          setCorrectionModel={setCorrectionModel}
          textBoxRef={textBoxRef}
          inputText={inputText}
          setInputText={setInputText}
          setRequestingText={setRequestingText}
          setGrammarAnswer={setGrammarAnswer}
          setSpellerAnswer={setSpellerAnswer}
          setComplexityAnswer={setComplexityAnswer}
          setAbstractWords={setAbstractWords}
          toggleButtons={CorrectionAndTextLevelToggleButtons}
          setGrammarErrorList={setGrammarErrorList}
          setSpellerErrorList={setSpellerErrorList}
          setGrammarTestAnswer={setGrammarTestAnswer}
          setGrammarTestErrorList={setGrammarTestErrorList}
        />}
        {correctionModel === GRAMMARCHECKER_TEST &&
          <Alert severity="warning" className="mb-2">
            <div>{t('corrector_test_version_text')}</div>
            <div>{t('corrector_test_version_thanks')}</div>
          </Alert>
        }
        <CorrectionInfoIcon
          inputText={
            <div>
              {t('corrector_proficiency_level_infobox_intro')}
              <br></br><br></br>
              {t('corrector_proficiency_level_infobox_list_header')}
              <ul>
                <li>
                  <b>{t('corrector_proficiency_level_infobox_list_bold_overall')}</b> – {t('corrector_proficiency_level_infobox_list_overall_value')}
                </li>
                <li>
                  <b>{t('corrector_proficiency_level_infobox_list_bold_grammar')}</b> – {t('corrector_proficiency_level_infobox_list_grammar_value')}
                </li>
                <li>
                  <b>{t('corrector_proficiency_level_infobox_list_bold_vocabulary')}</b> – {t('corrector_proficiency_level_infobox_list_vocabulary_value')}
                </li>
                <li>
                  <b>{t('corrector_proficiency_level_infobox_list_bold_overall_score')}</b> – {t('corrector_proficiency_level_infobox_list_overall_score_value')}
                </li>
              </ul>
              {t('corrector_proficiency_level_infobox_outro')}
            </div>}
        />
      </Box>
      <div className="d-flex gap-2 flex-wrap">
        <CorrectionInput
          requestingText={requestingText}
          setRequestingText={setRequestingText}
          textBoxRef={textBoxRef}
          newRef={newRef}
          setNewRef={setNewRef}
          inputText={inputText}
          setInputText={setInputText}
          model={correctionModel}
          errorList={errorList}
          setErrorList={setErrorList}
          setGrammarErrorList={setGrammarErrorList}
          setSpellerErrorList={setSpellerErrorList}
          setComplexityAnswer={setComplexityAnswer}
          spellerAnswer={spellerAnswer}
          grammarAnswer={grammarAnswer}
          setAbstractWords={setAbstractWords}
          setGrammarAnswer={setGrammarAnswer}
          setSpellerAnswer={setSpellerAnswer}
          tab={TEXTLEVEL}
          complexityAnswer={complexityAnswer}
          setHoveredId={setHoveredId}
          setGrammarTestAnswer={setGrammarTestAnswer}
          setGrammarTestErrorList={setGrammarTestErrorList}
          grammarTestAnswer={grammarTestAnswer}
        />
        <div className="corrector-right">
          {complexityAnswer && complexityAnswer?.keeletase.length !== 0 &&
            <div className="d-flex justify-content-between">
              <div style={{ fontSize: '1.5rem' }}>{t('corrector_proficiency_level_color_codes')}:</div>
              {textLevelColors.map((color, index) => {
                return (
                  <div className="d-flex align-items-center" key={t(textLevels[index])}>
                    <div className="text-level-tab-color-circle" style={{ backgroundColor: color }}></div>
                    -
                    {t(textLevels[index])}
                  </div>
                );
              })}
            </div>
          }
          {!complexityAnswer &&
            <Box className="corrector-right-inner">
              <Alert
                severity="info"
                className="level-tab-short-text-notice"
              >
                {t('corrector_proficiency_level_gray_box')}
              </Alert>
            </Box>
          }
          {complexityAnswer && complexityAnswer?.keeletase.length === 0 &&
            <Alert
              severity="info"
              className="level-tab-short-text-notice"
            >
              {t('corrector_proficiency_level_short_text')}
            </Alert>
          }
          {complexityAnswer && complexityAnswer?.keeletase.length !== 0 &&
            <>
              <div className="level-accordion-overall-value-container">
                <div className="level-accordion-overall-value-label">{t(accordionDetails[0].label)}</div>
                <TextLevelAccordionInner
                  complexityAnswer={complexityAnswer.keeletase}
                  arrayValues={accordionDetails[0].arrayValues}
                />
              </div>
              <div>
                {accordionDetails.map((detail, index) => (
                  index !== 0 && (
                    <TextLevelAccordion
                      key={detail.label}
                      label={t(detail.label)}
                      arrayValues={detail.arrayValues}
                      complexityAnswer={complexityAnswer.keeletase}
                    />
                  )
                ))}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};
