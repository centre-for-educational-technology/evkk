import React, { useEffect, useState } from 'react';
import { Alert, Box, Divider, Tooltip } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { ContentEditableDiv, CorrectorAccordionStyle, replaceCombined } from '../../../../const/Constants';
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
import CorrectionButton from '../../components/CorrectionButton';
import CorrectionInfoIcon from '../../components/CorrectionInfoIcon';

export default function ComplexityTab(
  {
    inputText,
    setInputText,
    setComplexityAnswer,
    complexityAnswer,
    setSpellerAnswer,
    setGrammarAnswer,
    setAbstractWords
  }) {
  const [model, setModel] = useState('longsentence');
  const [nounCount, setNounCount] = useState(0);
  const textBoxRef = React.useRef();
  const textBoxValueRef = React.useRef(inputText);
  const [, setRenderTrigger] = useState(false);

  useEffect(() => {
    if (!complexityAnswer) return;
    calculateNounCount(complexityAnswer, setNounCount);
    markText();
  }, [complexityAnswer]);

  useEffect(() => {
    if (!inputText || !complexityAnswer) return;
    markText();
  }, [model, inputText]);

  const markText = () => {
    let text = inputText.replaceAll(replaceCombined, '').replaceAll('  ', ' ');
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
                     title={'Kuva laused, mis on pikemad kui 17 sõna. Liiga pikas lauses võib mõte kaduma minna, sest lugejal on raske loetut meelde jätta. Püüa jagada pikad laused mitmeks lühemaks ja väldi mõttekordusi.'}>
              <ToggleButton value="longsentence">Pikad laused</ToggleButton>
            </Tooltip>
            <Tooltip placement="top"
                     title={'Kuva sõnad, mis on pikemad kui 6 tähte. Kui selliseid keskmisest pikemaid sõnu esineb tihedalt, siis on teksti keerukam lugeda. Eelista võõrsõnadele eesti omasõnu ja mine-lõpuga nimisõnadele tegusõnu (nt Politsei teostas läbiotsimise -> Politsei otsis läbi).'}>
              <ToggleButton value="longword">Pikad sõnad</ToggleButton>
            </Tooltip>
            <Tooltip placement="top"
                     title={'Kuva tekstis leiduvad nimisõnad. Suur nimisõnade osakaal näitab teksti temaatilist tihedust ja võib muuta teksti raskesti mõistetavaks. Rohke tegusõnade kasutus seevastu soodustab tekstist arusaamist.'}>
              <ToggleButton value="nouns">Nimisõnad</ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
        <CorrectionInfoIcon inputText={<div>Rakendus hindab teksti keerukust järgmiste mõõdikute alusel.
          <br></br><br></br>
          <b>LIX-indeks</b> lähtub keskmisest lausepikkusest sõnades ja pikkade ehk vähemalt 7-täheliste sõnade
          osakaalust
          tekstis:
          <br></br><br></br>
          sõnade arv / lausete arv + pikkade sõnade arv * 100 / sõnade arv
          <br></br><br></br>
          <b>SMOG-indeks</b> arvestab paljusilbiliste ehk vähemalt 3-silbiliste sõnade suhtelise sagedusega 30 lause
          kohta:
          <br></br><br></br>
          1,043 * √paljusilbiliste sõnade arv * 30 / lausete arv + 3,1291
          <br></br><br></br>
          <b>Flesch-Kincaidi indeks</b> (ingl Flesch-Kincaid grade level) võtab arvesse keskmist lausepikkust sõnades ja
          keskmist sõnapikkust silpides:
          <br></br><br></br>
          0,39 * sõnade arv / lausete arv + 11,8 * silpide arv / sõnade arv - 15,59
          <br></br><br></br>
          <b>Nimi- ja tegusõnade suhtarv</b> väljendab teksti temaatilist tihedust. Kirjalikes tekstides on nimisõnu
          keskmiselt
          1,9 korda rohkem kui tegusõnu.
          <br></br><br></br>
          Sõnaline hinnang põhineb LIX-indeksil, mille seost teksti tajutava keerukusega on uurinud Helin Puksand
          (2004). Loe LIX-i ja nimisõnalisuse kohta siit [<a
            href="https://kirj.ee/public/ESA/2011/esa_57-2011-162-217.pdf">https://kirj.ee/public/ESA/2011/esa_57-2011-162-217.pdf</a>],
          SMOG- ja Flesch-Kincaidi indeksi kohta siit [<a
            href="https://www.etera.ee/s/y4AfC43cJr">https://www.etera.ee/s/y4AfC43cJr</a>]. Viimasest allikast leiad
          infot ka indeksite väärtuse kohta eri keeleoskustasemetel.
          <br></br><br></br>
          Selleks, et aidata teksti toimetada ja lihtsustada, on tekstikastis esile toodud pikad sõnad ja laused ning
          nimisõnad. Jaan Miku eeskujul loetakse pikaks lauseid, mis koosnevad rohkem kui 17 sõnast. Selliseid lauseid
          ei jõua lugeja tõenäoliselt tervikuna lühiajalisse mällu talletada (loe lähemalt siit
          [<a
            href="https://lepo.it.da.ut.ee/~jaanm/keelereeglid.htm">https://lepo.it.da.ut.ee/~jaanm/keelereeglid.htm</a>]).
        </div>}/>
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
              <div
                style={{marginBottom: '0.5em', fontSize: '1.5em'}}>Keerukustase: {complexityAnswer.keerukus[11]}</div>
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
                      <div>Lauseid</div>
                      <div>{complexityAnswer.keerukus[0]}</div>
                    </div>
                    <div className="tab-table">
                      <div>Sõnu</div>
                      <div>{complexityAnswer.sonad.length}</div>
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
            :
            <Box className="corrector-right-inner">
              {!complexityAnswer &&
                <Alert
                  severity="info"
                  className="level-tab-short-text-notice"
                >
                  Teksti keerukuse põhjal saab hinnata nii autori keeleoskuse arengut kui ka teksti lugemise lihtsust.
                  Vaata, kus paikneb tekst skaalal lihtsast raskeni, ja kui vaja, siis paranda selle loetavust.
                </Alert>
              }
            </Box>
          }
        </div>
      </div>
    </div>
  );
};
