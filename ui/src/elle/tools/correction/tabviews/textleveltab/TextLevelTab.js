import React, { useState } from 'react';
import { Alert, Box, Tooltip } from '@mui/material';
import '../correctiontab/styles/correctionTab.css';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import CorrectionInput from '../../components/CorrectionInput';
import './style/textLevelTab.css';
import TextLevelAccordion from './components/TextLevelAccordion';
import { accordionDetails, textLevelColors, textLevels } from './constants/constants';
import { handleModelChange } from '../../helperFunctions/helperFunctions';
import TextLevelAccordionInner from './components/TextLevelAccordionInner';
import CorrectionInfoIcon from '../../components/CorrectionInfoIcon';

export default function TextLevelTab(
  {
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
    setGrammarAnswer
  }) {
  const [responseText, setResponseText] = useState();

  return (
    <div className="corrector-border-box">
      <Box className="d-flex justify-content-between">
        <Box className="d-flex">
          <ToggleButtonGroup
            color="primary"
            value={correctionModel}
            sx={{height: '1rem', marginBottom: '1rem'}}
            exclusive
            onChange={(e) => handleModelChange(setCorrectionModel, e)}
            aria-label="Platform"
          >
            <Tooltip placement="top" title="Paranda sõnade õigekirja.">
              <ToggleButton value="spellchecker">Õigekiri</ToggleButton>
            </Tooltip>
            <Tooltip placement="top" title="Paranda lausete grammatikat ja sõnastust.">
              <ToggleButton value="grammarchecker">Grammatika</ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
        <CorrectionInfoIcon
          inputText={<div>Keeleoskustaset ennustavad teksti klassifitseerimise mudelid on koostatud eesti keele
            tasemeeksamite loovkirjutiste (kirjeldused-jutustused, arutlused, isiklikud ja poolametlikud kirjad)
            keeleliste tunnuste alusel. Seega on siinsed masinõppemudelid õppinud eristama nelja riiklikult testitavat
            keeleoskustaset (A2–C1). A1-taseme tekstid liigitatakse kõige tõenäolisemalt A2-tasemele ja C2-taseme
            tekstid C1-tasemele.
            <br></br><br></br>
            Rakendus hindab järgmisi teksti omadusi:
            <br></br><br></br>
            <b>Üldine keerukus</b> – teksti, sõnade ja lausete pikkus
            <br></br><br></br>
            <b>Grammatika</b> – sõnaliikide ja grammatiliste vormide osakaalud, sõnavormide rohkus
            <br></br><br></br>
            <b>Sõnavara</b> – sõnade mitmekesisus (unikaalsete sõnade hulk kõigi teksti sõnade suhtes), ulatus (harvem
            esineva sõnavara osakaal) ja nimisõnade abstraktsus.
            <br></br><br></br>
            <b>Üldhinnang</b> võtab arvesse kõiki neid aspekte. Alamhinnangud võivad üksteisest ja üldhinnangust
            erineda.
            <br></br><br></br>
            Eesti emakeelega autori teksti puhul annab hinnang aimu, millise taseme keeleoskust oleks sellise teksti
            kirjutamiseks vaja. Lugemisteksti tasemekohasust saab hinnata vaid ligikaudselt, sest eri tasemetel
            loetavate ja kirjutatavate tekstide keerukus ei ole üks-ühele seotud.
          </div>}
        />
      </Box>
      <div className="d-flex gap-2">
        <CorrectionInput
          inputText={inputText}
          setInputText={setInputText}
          model={correctionModel}
          responseText={responseText}
          setResponseText={setResponseText}
          errorList={errorList}
          setErrorList={setErrorList}
          setComplexityAnswer={setComplexityAnswer}
          spellerAnswer={spellerAnswer}
          grammarAnswer={grammarAnswer}
          setAbstractWords={setAbstractWords}
          setGrammarAnswer={setGrammarAnswer}
          setSpellerAnswer={setSpellerAnswer}
        />
        <div className="w-50 corrector-right">
          <div className="d-flex justify-content-between">
            <div style={{fontSize: '1.5rem'}}>Tasemete värvikoodid:</div>
            {textLevelColors.map((color, index) => {
              return (
                <div className="d-flex align-items-center" key={textLevels[index]}>
                  <div className="text-level-tab-color-circle " style={{backgroundColor: color}}></div>
                  -
                  {textLevels[index]}
                </div>
              );
            })}
          </div>
          <Box className="corrector-right-inner">
            {!complexityAnswer &&
              <Alert
                severity="info"
                className="level-tab-short-text-notice"
              >
                Vaata, millisele keeleoskustasemele (A2–C1) tekst kõige tõenäolisemalt vastab. Üldhinnangule lisaks näed
                eraldi hinnangut teksti keerukuse, grammatika ja sõnavara alusel.
              </Alert>
            }
          </Box>
          {complexityAnswer && complexityAnswer?.keeletase.length === 0 &&
            <Alert
              severity="info"
              className="level-tab-short-text-notice"
            >
              Tasemehinnangu saamiseks sisesta pikem tekst
            </Alert>
          }
          {complexityAnswer && complexityAnswer?.keeletase.length !== 0 &&
            <>
              <div className="level-accordion-overall-value-container">
                <div className="level-accordion-overall-value-label">{accordionDetails[0].label}</div>
                <TextLevelAccordionInner
                  complexityAnswer={complexityAnswer.keeletase}
                  arrayValues={accordionDetails[0].arrayValues}
                />
              </div>
              <div>
                {accordionDetails.map((detail, index) => {
                  if (index === 0) return;
                  return (
                    <TextLevelAccordion
                      key={detail.label}
                      label={detail.label}
                      arrayValues={detail.arrayValues}
                      complexityAnswer={complexityAnswer.keeletase}
                    />
                  );
                })}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};
