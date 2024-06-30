import React, { useEffect, useState } from 'react';
import { Alert, Box, Divider, Tooltip } from '@mui/material';
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
  calculateTotalWords,
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
import CorrectionInfoIcon from '../../components/CorrectionInfoIcon';

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
  }, [model, complexityAnswer]);

  const markText = () => {
    if (!complexityAnswer) return;
    let text = inputText.replaceAll(replaceCombined, '').replaceAll('  ', ' ');
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
        text = handleAbstractWords(text, abstractWords, complexityAnswer);
      } else if (model === 'contentwords') {
        text = handleContentWords(text, complexityAnswer);
      }
    });

    textBoxValueRef.current = text;
    setRenderTrigger(renderTrigger => !renderTrigger);
  };

  return (
    <div className="corrector-border-box">
      <Box className="d-flex justify-content-between">
        <Box className="d-flex">
          <ToggleButtonGroup
            color="primary"
            value={model}
            sx={{height: '1rem', marginBottom: '1rem'}}
            exclusive
            onChange={(e) => handleModelChange(setModel, e)}
            aria-label="Platform"
          >
            <Tooltip placement="top"
                     title={'Kuva samas lauses või kahes järjestikuses lauses korduvad sõnad. Liigsete sõnakorduste vältimiseks otsi sõnastikest sünonüüme, tagasi viitamiseks kasuta ka asesõnu.'}>
              <ToggleButton value="wordrepetition">Sõnakordused</ToggleButton>
            </Tooltip>
            <Tooltip placement="top"
                     title={'Kuva sõnad, mis ei kuulu eesti keele 5000 sagedama hulka. Harvaesinevad sõnad muudavad teksti keerukamaks, eriti algajate keeleõppijate jaoks.'}>
              <ToggleButton value="uncommonwords">Harvad sõnad</ToggleButton>
            </Tooltip>
            <Tooltip placement="top"
                     title={'Kuva sõnad, mis tähistavad meeltega tajumatuid nähtusi. Üldise tähendusega sõnu saab mitmeti tõlgendada ja abstraktsemat teksti on raskem mõista.'}>
              <ToggleButton value="abstractwords">Abstraktsed sõnad</ToggleButton>
            </Tooltip>
            <Tooltip placement="top"
                     title={'Kuva täistähenduslikud sõnad, mille suur osakaal muudab teksti sisutihedaks. Keskmisest tihedamat teksti on raskem ja aeganõudvam lugeda.'}>
              <ToggleButton value="contentwords">Sisusõnad</ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
        <CorrectionInfoIcon
          inputText={<div>Rakendus hindab sõnavara mitmekesisust, ulatust, abstraktsust ja tihedust järgmiste mõõdikute
            alusel.
            <br></br><br></br>
            <b>Erinevate ja kõigi sõnade juuritud suhtarv</b> (ingl root type-token ratio) iseloomustab unikaalse
            algvormiga sõnade hulka tekstis, sõltudes teksti pikkusest vähem kui juurimata suhtarv:
            <br></br><br></br>
            erinevate sõnade arv / √sõnade arv
            <br></br><br></br>
            <b>MTLD-indeks</b> mõõdab erinevate ja kõigi sõnade suhtarvu järjestikustes tekstiosades. Iga sõna juures
            arvutatakse suhtarv uuesti, kuni see on väiksem kui 0,72. Siis määratakse suhtarvu väärtuseks uuesti 1 ja
            tsükkel kordub. Teksti lõpus jagatakse sõnade arv tsüklite arvuga. Sarnane arvutuskäik tehakse läbi ka
            teksti lõpust algusse liikudes, viimaks leitakse kahe arvu keskmine.
            <br></br><br></br>
            <b>HDD-indeksi</b> arvutamiseks määratakse iga unikaalse sõna tõenäosus esineda juhuvalikuga leitud
            42-sõnalises tekstiosas. Tõenäosused arvutatakse hüpergeomeetrilise jaotuse funktsiooni abil ja liidetakse
            kokku. Kui tekst on lühem kui 42 sõna, siis HDD väärtust ei arvutata.
            <br></br><br></br>
            <b>Sõnavara ulatus</b> näitab võrdlemisi harva esineva sõnavara osakaalu tekstis. Siin on harvadeks loetud
            sõnad, mis ei kuulu 5000 enimkasutatud sõna hulka. Selliste sõnade esinemine eristab C1-taseme tekste
            (keskmiselt 6–7%) eelnevatest keeleoskustasemetest (keskmiselt 3–4%). Aluseks on võetud aja-, ilu- ja
            teaduskirjandust sisaldava Tasakaalus korpuse algvormipõhine sõnade sagedusloend (vt siit
            [<a
              href="https://keeleressursid.ee/et/256-sagedusloendid">https://keeleressursid.ee/et/256-sagedusloendid</a>]).
            <br></br><br></br>
            <b>Nimisõnade abstraktsust</b> mõõdetakse kolmeastmelisel skaalal: 1 – tähistavad meeltega vahetult
            tajutavaid esemeid ja olendeid (nt auto); 2 – tähistavad meeltega vahetult tajutavaid tegevusi ja nähtusi
            (nt jooks); 3 – tähistavad meeltega vahetult mittetajutavaid mõttekonstruktsioone (nt võrdsus). Nimisõnade
            keskmise abstraktsustaseme leidmiseks on kasutusel Tartu ülikoolis arendatud tööriist
            [<a href="http://prog.keeleressursid.ee/abstraktsus/">http://prog.keeleressursid.ee/abstraktsus/</a>], mille
            hinnangud põhinevad Jaan Miku jt (2003) koostatud
            andmetel [<a
              href="https://dspace.ut.ee/items/9f8b9511-2e2d-4a21-b566-b314ddf4c501/full">https://dspace.ut.ee/items/9f8b9511-2e2d-4a21-b566-b314ddf4c501/full</a>]
            (vt tabel 1).
            <br></br><br></br>
            <b>Leksikaalne tihedus</b> väljendab sisusõnade osakaalu tekstis. Nende eristamiseks sisutühjadest
            funktsioonisõnadest (nt ase-, side- ja kaassõnad, abimäärsõnad ja abitegusõnad) kasutatakse Kristel Uiboaia
            stoppsõnade loendit [<a href="https://datadoi.ee/handle/33/78">https://datadoi.ee/handle/33/78</a>].
            <br></br><br></br>
            Loe sõnavara keerukuse tunnuste kohta siit [<a
              href="http://arhiiv.rakenduslingvistika.ee/ajakirjad/index.php/lahivordlusi/article/view/LV31.01] ja siit [https://www.etera.ee/s/86HP71viN5">http://arhiiv.rakenduslingvistika.ee/ajakirjad/index.php/lahivordlusi/article/view/LV31.01]</a> ja
            siit [<a href="https://www.etera.ee/s/86HP71viN5">https://www.etera.ee/s/86HP71viN5</a>].
            <br></br><br></br>
            Tekstikastis on tähistatud sõnakordused, 5000 sagedama hulka mittekuuluvad sõnad, abstraktsed nimisõnad ja
            sisusõnad. Sõnakorduseks loetakse sama sõna vormide esinemine ühes või kahes järjestikuses lauses. Korduvate
            sõnadena ei arvestata sagedamaid sidesõnu (nt ja, et) ja eitussõna ei. Isikulistel asesõnadel (mina, sina,
            tema) tähistatakse kordus vaid siis, kui samas lauses esineb täpselt sama sõnavorm.</div>}/>
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
          {complexityAnswer ?
            <div>
              <Accordion square={true} style={{marginBottom: '0.5em'}} sx={CorrectorAccordionStyle} defaultExpanded>
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
                      <div>{calculateTotalWords(abstractWords)}</div>
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
                  {complexityAnswer.mitmekesisus[4] > -1 &&
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
                  {complexityAnswer.mitmekesisus[5] > 0 &&
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
            :
            <Box className="corrector-right-inner">
              {!complexityAnswer &&
                <Alert
                  severity="info"
                  className="level-tab-short-text-notice"
                >
                  Saa teada, kui keerukas on teksti sõnavara. Nagu teksti keerukus, võib see näidata nii autori
                  väljendusoskust kui ka teksti arusaadavust lugejale. Vajadusel saad sõnakasutust mitmekesisemaks muuta
                  või keerukaid sõnu vähendada.
                </Alert>
              }
            </Box>
          }
        </div>
      </div>
    </div>
  );
};
