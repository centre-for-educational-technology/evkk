import React, { useEffect, useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import './Correction.css';
import { Alert, Box, Button, Card, CircularProgress, Tab, Tooltip, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import WordClick from './WordClick';
import TextUpload from '../../components/TextUpload';
import { loadFetch } from '../../service/LoadFetch';

const Correction = () => {
    const [history, setHistory] = useState(['']);
    const [currentHistory, setCurrentHistory] = useState(0);
    const [content, setContent] = useState('');
    const [levelAnswer, setLevelAnswer] = useState([]);
    const [levelText, setLevelText] = useState('');
    const [replyCode, setReplyCode] = useState([]);
    const [changesCode, setChangesCode] = useState(false);
    const [singleChange, setSingleChange] = useState(false);
    const [openCard, setOpenCard] = useState('correction');
    const [repeats, setRepeats] = useState(false);
    const [contentWords, setContentWords] = useState([]);
    const [responseWords, setResponseWords] = useState([]);
    const [queryFinished, setQueryFinished] = useState(false);
    const [complexityAnswer, setComplexityAnswer] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [diversityAnswer, setDiversityAnswer] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const clean = (word) => {
        if (word) {
            return word.replace(/[^0-9a-zA-ZõäöüÕÄÖÜ]+$/, '');
        }
    };

    const repeating = () => {
        setRepeats(true);
        repeat();
    };

    const repeat = () => {
        if (content.replace(/(\r\n|\n|\r)/gm, '') === levelText.replace(/(\r\n|\n|\r)/gm, '')) {
            return;
        }
        getCorrections();
        getLanguageLevel();
        getLanguageComplexity();
        getLanguageDiversity();
    };

    const subChange = (event) => {
        setContent(event.target.value.replace(/(\r\n|\n|\r)/gm, ''));
        keepHistory();
    };

    const replacerLogic = (content, answer, index) => {
        const joinedContent = content.join(' ');
        setContent(joinedContent);
        setContentWords(content);
        setResponseWords(answer);
        const tempArray = replyCode.map((value) => {
            if (value.key === 's' + index) {
                return <span key={`s${index}`}>{content[index] + ' '}</span>;
            } else {
                return value;
            }
        });
        setReplyCode(tempArray);
        loadErrors();
        fillData(content, answer);
        getLanguageLevel();
        getLanguageComplexity();
        getLanguageDiversity();
    };

    const replace = (content, answer, index) => {
        content[index] = answer[index];
        replacerLogic(content, answer, index);
    };

    const noReplace = (content, answer, index) => {
        answer[index] = content[index];
        replacerLogic(content, answer, index);
    };

    const getLanguageLevel = () => {
        if (content === levelText) {
            return;
        }
        fetch('/api/texts/keeletase', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tekst: content})
        }).then(v => v.json()).then(t => {
            setLevelAnswer(t);
            setLevelText(content);
        });
    };

    const getLanguageComplexity = () => {
        fetch('/api/texts/keerukus', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tekst: content})
        }).then(v => v.json()).then(t => {
            setComplexityAnswer(t);
        });
    };

    const getLanguageDiversity = () => {
        fetch('/api/texts/mitmekesisus', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tekst: content})
        }).then(v => v.json()).then(t => {
            setDiversityAnswer(t);
        });
    };

    const handleTabChange = (event, newValue) => {
        setOpenCard(newValue);
    };

    const getCorrections = () => {
        loadFetch('/api/texts/korrektuur', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tekst: content
            })
        }).then(v => v.json()).then(t => {
            const sm = t[1].split(' ');
            const vm = t[0].split(' ');
            setContentWords(sm);
            setResponseWords(vm);
            fillData(sm, vm);
        });
    };

    const fillData = (content, answer) => {
        const answerText = replyCode;
        const changes = [];
        if (content !== answer) {
            for (let i = 0; i < answer.length; i++) {
                if (content[i] === answer[i]) {
                    answerText[i] = <span key={'s' + i}>{answer[i] + ' '}</span>;
                } else {
                    changes[i] = (<span key={'sm' + i}>
                        <span style={{backgroundColor: 'lightpink'}}>
                            {content[i]}
                        </span> - <span>{answer[i]}</span>{' '}
                        <button onClick={() => replace(content, answer, i)}>
                            Asenda
                        </button>
                        <br/>
                    </span>);
                    answerText[i] = (<WordClick content={content} answer={answer} index={i} replace={replace}
                                                noReplace={noReplace}/>);
                }
            }
        }
        setChangesCode(<div>{changes.length > 0 ? changes : false}</div>);
        setReplyCode(answerText);
        setSingleChange(false);
        setQueryFinished(true);
    };

    const generatePieChart = (value) => {
        return parseInt((value * 100 * 3.6).toFixed(0), 10);
    };

    const renderLevel = () => {
        let degreeValue;
        if (levelAnswer.length !== 1 && levelAnswer[0]) {
            const val1 = generatePieChart(levelAnswer[0][0]);
            const val2 = generatePieChart(levelAnswer[1][0]);
            const val3 = generatePieChart(levelAnswer[2][0]);
            const val4 = generatePieChart(levelAnswer[3][0]);
            degreeValue = `conic-gradient(#b7e4c7 ${val1}deg,  #90e0ef ${val1}deg ${val2 + val1}deg, #ffb3c1 ${val2 + val1}deg ${val2 + val1 + val3}deg, #90e0ef ${val2 + val1 + val3}deg ${val2 + val1 + val3 + val4}deg)`;
        }

        return (<Box>
            <Box component="span" width="auto">
                {repeats && parseInt(diversityAnswer[10]) > 14 ? (<Box component="span" width="auto">
                    {content.length > 0 ? (levelAnswer.length > 0 ? (levelAnswer.length === 1 ? ('') : (
                        <Box className="w-100">
                            <Box className="d-flex w-100 h-100 align-items-center justify-content-center px-sm-5">
                                <Box
                                    className="fd-flex flex-column justify-content-center align-items-start language-level-box-inner">
                                    <Box className="d-flex justify-content-start align-items-center" width={'100%'}>
                                        <Box className="sector-dot"></Box>
                                        <h2>{levelAnswer[0][1]}: {(levelAnswer[0][0] * 100).toFixed(0)}%</h2>
                                    </Box>
                                    <Box className="other-percentage-values">
                                        {levelAnswer.slice(1, 4).map((vastus) => {
                                            if ((vastus[0] * 100).toFixed(0) > 0) {
                                                return (<Box className="d-flex align-items-center justify-content-start"
                                                             key={vastus[0]}>
                                                    {' '}
                                                    <Box className="sector-dot"></Box>
                                                    <h2>{vastus[1]}: {(vastus[0] * 100).toFixed(0)}%</h2>
                                                </Box>);
                                            }
                                        })}
                                    </Box>
                                </Box>
                                {levelAnswer[1][0] * 100 > 0 ? (
                                    <Box className="d-flex w-50 justify-content-center">
                                        <Box className="sector-diagram"
                                             style={{background: degreeValue}}></Box>
                                    </Box>) : null}
                            </Box>
                            <Box className="w-100 h-auto p-lg-5 d-flex flex-column">
                                <Box>
                                    <Typography>
                                        <h2>Lisainfo</h2>
                                    </Typography>
                                </Box>
                                <Box className="mt-4">
                                    <b>Teksti üldine keerukus: <br/> {levelAnswer[4][1]} </b>
                                    (tõenäosus {(levelAnswer[4][0] * 100).toFixed(0)}%)<br/>
                                    Arvesse on võetud teksti, sõnade ja lausete pikkus.
                                </Box>
                                <Box className="mt-4">
                                    <b>Morfoloogia ehk vormikasutus: <br/>{levelAnswer[8][1]} </b>
                                    (tõenäosus {(levelAnswer[8][0] * 100).toFixed(0)}%)<br/>
                                    Arvesse on võetud sõnaliikide ja muutevormide osakaalud ning sõnade
                                    vormirohkus.
                                </Box>
                                <Box className="mt-4">
                                    <b>Sõnavara: <br/>{levelAnswer[12][1]} </b>
                                    {levelAnswer[12][0] > 0 && (
                                        <span>(tõenäosus {(levelAnswer[12][0] * 100).toFixed(0)} %)<br/></span>)}
                                    Arvesse on võetud sõnavaliku mitmekesisus ja ulatus (unikaalsete
                                    sõnade hulk, harvem esineva
                                    sõnavara osakaal),
                                    sõnavara tihedus (sisusõnade osakaal) ja nimisõnade abstraktsus.
                                </Box>
                            </Box>
                        </Box>)) : (<div></div>)) : ('')}
                </Box>) : queryFinished && levelAnswer[1] ? 'Tekst on liiga lühike' :
                    <div className="w-100 mt-5 d-flex justify-content-center"><CircularProgress/></div>
                }
            </Box>
        </Box>);
    };

    const loadErrors = () => {
        let errorList = [];
        contentWords.forEach((word, index) => {
            if (word !== responseWords[index]) {
                errorList.push([word, responseWords[index], index]);
            }
        });
        return (<Box>
            {errorList.map((error) => {
                return (<Box className="d-flex justify-content-center" key={error[0]}>
                    <Box id={error[0]}
                         className="replacement-popup">
                        <Box
                            id={error[0]}
                            className="popup-container"
                        >
              <span
                  style={{
                      backgroundColor: 'lightpink'
                  }}
                  className="error-word-container"
              >
                {clean(error[0])}
              </span>{' '}
                            <EastIcon/>{' '}
                            <span
                                style={{
                                    backgroundColor: 'lightgreen'
                                }}
                                className="error-word-container"
                            >
                                {clean(error[1])}
                            </span>{' '}
                            <span className="bold-font-20-corrector-bubble">|</span>
                            <Box display="flex" gap="15px">
                                <Button
                                    size="30px"
                                    color="success"
                                    className="popup-icon-button-big"
                                    variant="contained"
                                    onClick={() => {
                                        replace(contentWords, responseWords, error[2]);
                                    }}
                                >
                                    <DoneIcon fontSize="medium"/>
                                </Button>
                                <Button
                                    size="30px"
                                    color="error"
                                    className="popup-icon-button-big"
                                    variant="contained"
                                    onClick={() => {
                                        noReplace(contentWords, responseWords, error[2]);
                                    }}
                                >
                                    <CloseIcon fontSize="medium"/>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>);
            })}
        </Box>);
    };

    const customTooltip = (data) => {
        return (<Tooltip
            placement="top"
            title={data}>
            <QuestionMarkIcon fontSize="small"/>
        </Tooltip>);
    };

    //upload text to alasisu
    const sendTextFromFile = (data) => {
        setContent(data, () => {
            keepHistory();
        });
    };

    //history for undo and redo
    //called by subChange when a change is made
    const keepHistory = () => {
        setCurrentHistory(currentHistory + 1);
        setHistory(oldHistory => [...oldHistory, content]);
    };

    //undo and redo
    //TODO: panna handle undo ja redo uuesti tööle?
    const handleUndo = () => {
        if (currentHistory === 0) {
            return;
        }
        setCurrentHistory(currentHistory + 1);
        const previousFromHistory = history[currentHistory];
        setContent(previousFromHistory);
    };

    const handleRedo = () => {
        //if on last change then nothing to redo
        if (currentHistory === history.length - 1) {
            return;
        }
        setCurrentHistory(currentHistory + 1);
        const nextFromHistory = history[currentHistory];
        setContent(nextFromHistory);
    };

    return (<Card raised={true}
                  square={true}
                  elevation={2}
                  style={{marginBottom: '100px'}}
    >
        <p/>
        <div className="correction-container">
            <div>
                <br/><br/>
                <Box>
                    <TextUpload sendTextFromFile={sendTextFromFile}/>
                    {!queryFinished ? <textarea id="corrector-textarea"
                                                onChange={(event) => subChange(event)}
                                                value={content}
                                                spellCheck={false}
                                                placeholder={'Kopeeri või kirjuta siia analüüsitav tekst'}

                    /> : <Box contentEditable="true" className="editable-div-container" id="corrector-textarea-div"
                              suppressContentEditableWarning={true}
                              onInput={event => setContent(event.currentTarget.textContent.replace(/(\r\n|\n|\r)/gm, ''))}
                              spellCheck={false}
                              placeholder={'Kopeeri või kirjuta siia analüüsitav tekst'}
                    >
                        <Box className="input-container" id="input-container">
                            {replyCode.map((vaste) => {
                                return (vaste);
                            })}
                        </Box>
                    </Box>}
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => repeating()}>Analüüsi
                    </Button>
                </Box>
            </div>
            <div className="corrector-tab-container">
                <TabContext value={openCard}>
                    <TabList centered={true} onChange={handleTabChange}>
                        <Tab
                            value="correction"
                            label="korrektuur"
                        />
                        <Tab
                            value="evaluation"
                            label="hindamine"
                        />
                        <Tab
                            value="complexity"
                            label="keerukus"
                        />
                        <Tab
                            value="diversity"
                            label="mitmekesisus"
                        />
                    </TabList>
                    {!repeats && <div>
                        <Box marginTop="50px">
                            <Alert severity="info">Rakenduse abil saad parandada oma teksti õigekirja ja
                                vaadata,
                                mis keeleoskustasemele see vastab (A2–C1).
                                Loe lähemalt <a
                                    href={'https://github.com/centre-for-educational-technology/evkk/wiki/Demos'}
                                    target="_blank"
                                    rel="noreferrer">siit</a>.</Alert>
                        </Box>
                    </div>}
                    <TabPanel value="correction">
                        {repeats && queryFinished && changesCode.props.children === false ? <span>
                            <div className="no-error-text-div">
                                <h3>Vigu ei leitud!</h3>
                            </div>
                        </span> : <span>
                            {repeats && !queryFinished &&
                                <Box
                                    className="d-flex align-items-center justify-content-center w-100 loading-animation-height-200px"><CircularProgress/>
                                </Box>}<br/>
                            {(singleChange) || ''}<br/>
                            {repeats && queryFinished ? loadErrors() : ''}
                        </span>}
                    </TabPanel>
                    <TabPanel value="evaluation">
                        {repeats && <div>
                            <span>{renderLevel()}</span></div>}
                    </TabPanel>
                    <TabPanel value="complexity">
                        <div>
                            {repeats && <div>
                                {(!complexityAnswer[0] > 0) ?
                                    <Box className="d-flex align-items-center justify-content-center w-100 height-200px"
                                    ><CircularProgress/> </Box> : ''}</div>}
                            {repeats && complexityAnswer[0] > 0 &&
                                <div className="w-100"><h3>Keerukuse andmed</h3>
                                    <table className="w-100">
                                        <tbody className="w-100">
                                        <tr className="complexity-table-values">
                                            <td>Lauseid</td>
                                            <td>{complexityAnswer[0]}</td>
                                        </tr>
                                        <tr className="complexity-table-values">
                                            <td>Sõnu</td>
                                            <td>{complexityAnswer[1]}</td>
                                        </tr>
                                        <tr className="complexity-table-values">
                                            <td>Paljusilbilisi
                                                sõnu {customTooltip('Paljusilbiliseks loetake sõnad, mis sisaldavad vähemalt kolme silpi.')}</td>
                                            <td>{complexityAnswer[2]}</td>
                                        </tr>
                                        <tr className="complexity-table-values">
                                            <td>Silpe</td>
                                            <td>{complexityAnswer[3]}</td>
                                        </tr>
                                        <tr className="complexity-table-values">
                                            <td>Pikki
                                                sõnu {customTooltip('Pikaks loetakse sõnad, milles on vähemalt seitse tähte.')}</td>
                                            <td>{complexityAnswer[4]}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/><br/>
                                    <Box><h5>
                                        SMOG indeks: {parseFloat(complexityAnswer[5]).toFixed()}
                                    </h5>
                                    </Box>
                                    <Box>
                                        <h5>
                                            Flesch-Kincaidi indeks: {parseFloat(complexityAnswer[6]).toFixed()}
                                        </h5>
                                    </Box>
                                    <Box>
                                        <h5>
                                            LIX indeks: {complexityAnswer[7]}
                                        </h5>
                                    </Box>

                                    {/*  TODO      <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"} marginTop={"20px"}
                                gutterBottom>
                      SMOG INDEX
                    </Typography>
                    <Box width={"80%"} height={"50px"} display={"flex"} justifyContent={"center"}>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>0</Typography>
                      </Box>
                      <Box width={"80%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <this.customSlider
                          valueLabelDisplay="on"
                          track={false}
                          disabled={true}
                          min={0}
                          max={25}
                          step={1}
                          defaultValue={parseFloat(this.state.keerukusvastus[5]).toFixed()}
                        />
                      </Box>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>20</Typography>
                      </Box>
                    </Box>
                    <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"} marginTop={"20px"}
                                gutterBottom>
                      Flesch-Kincaidi indeks
                    </Typography>
                    <Box width={"80%"} height={"50px"} display={"flex"} justifyContent={"center"}>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>0</Typography>
                      </Box>
                      <Box width={"80%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <this.customSlider
                          valueLabelDisplay="on"
                          track={false}
                          disabled={true}
                          min={0}
                          max={30}
                          step={1}
                          defaultValue={parseFloat(this.state.keerukusvastus[6]).toFixed()}
                        />
                      </Box>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>100</Typography>
                      </Box>
                    </Box>
                    <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"} marginTop={"20px"}
                                gutterBottom>
                      LIX INDEX
                    </Typography>
                    <Box width={"80%"} height={"50px"} display={"flex"} justifyContent={"center"}>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>20</Typography>
                      </Box>
                      <Box width={"80%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <this.customSlider
                          valueLabelDisplay="on"
                          track={false}
                          disabled={true}
                          min={0}
                          max={80}
                          step={1}
                          defaultValue={this.state.keerukusvastus[7]}
                        />
                      </Box>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>60</Typography>
                      </Box>
                    </Box>*/}
                                    <div className="complexity-font">Pakutav
                                        keerukustase: {complexityAnswer[11]}</div>
                                </div>}
                        </div>
                    </TabPanel>
                    <TabPanel value="diversity">
                        <div>
                            {repeats && diversityAnswer[10] === 0 ?
                                <Box className="d-flex align-items-center justify-content-center w-100"
                                     height={'200px'}><CircularProgress/> </Box> : ''}
                            {diversityAnswer[10] > 0 &&
                                <div className="diversity-font-box"><h3>Sõnavara mitmekesisuse
                                    andmed</h3>
                                    <table width={'80%'}>
                                        <tbody>
                                        <tr className="corrector-border-bottom">
                                            <td style={{width: '90%'}}>Arvestatud
                                                sõnu {customTooltip('Sõnavara rikkust mõõtes jäetakse kõrvale nimed ja numbritega kirjutatud arvud.')}
                                            </td>
                                            <td style={{width: '10%'}}>{diversityAnswer[10]}</td>
                                        </tr>
                                        <tr className="corrector-border-bottom">
                                            <td>Lemmasid ehk erinevaid sõnu</td>
                                            <td>{diversityAnswer[11]}</td>
                                        </tr>
                                        <tr className="corrector-border-bottom">
                                            <td>Erinevate ja kõigi sõnade
                                                korrigeeritud suhtarv -
                                                KLSS <br/>(ingl Corrected Type-Token
                                                Ratio) {customTooltip('lemmade arv / √(2 * sõnade arv) \n(Carroll, 1964)')}
                                            </td>
                                            <td>{diversityAnswer[0]}</td>
                                        </tr>
                                        <tr className="corrector-border-bottom">
                                            <td>Erinevate ja kõigi sõnade juuritud
                                                suhtarv -
                                                JLSS <br/>(ingl Root Type-Token
                                                Ratio) {customTooltip('lemmade arv / √(sõnade arv) \n(Guiraud, 1960)')}
                                            </td>
                                            <td>{diversityAnswer[1]}</td>
                                        </tr>
                                        {diversityAnswer[4] !== -1 &&
                                            <tr className="corrector-border-bottom">
                                                <td>
                                                    MTLD indeks <br/>(ingl Measure of Textual Lexical
                                                    Diversity) {customTooltip('MTLD indeks (ingl Measure of Textual Lexical Diversity) mõõdab lemmade ja sõnade suhtarvu järjestikustes tekstiosades. Algul on suhtarv 1. Iga sõna juures arvutatakse see uuesti, kuni väärtus langeb alla piirarvu 0,72. Tsükkel kordub, kuni teksti lõpus jagatakse sõnade arv selliste tsüklite arvuga. Seejärel korratakse sama, liikudes tekstis tagantpoolt ettepoole. MTLD on nende kahe teksti keskväärtus. (McCarthy & Jarvis, 2010)')}
                                                </td>
                                                <td>{diversityAnswer[4]}</td>
                                            </tr>
                                        }
                                        {diversityAnswer[5] > 0 &&
                                            <tr className="corrector-border-bottom">
                                                <td>
                                                    HDD indeks <br/>(ingl Hypergeometric Distribution
                                                    D) {customTooltip('HDD indeksi (ingl Hypergeometric Distribution D) arvutamiseks leitakse iga tekstis sisalduva lemma esinemistõenäosus juhuslikus 42-sõnalises tekstiosas. Kuna kõigi võimalike tekstikatkete arv on enamasti väga suur, arvutatakse tõenäosused hüpergeomeetrilise jaotuse funktsiooni abil. Kõigi lemmade esinemistõenäosused summeeritakse. (McCarthy & Jarvis, 2007)')}
                                                </td>
                                                <td>{diversityAnswer[5]}</td>
                                            </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>}
                        </div>
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    </Card>);
};

export default Correction;
