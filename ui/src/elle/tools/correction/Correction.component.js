import React, {useState} from 'react';
import EastIcon from '@mui/icons-material/East';
import "./Correction.css";
import {Alert, Box, Button, Card, CircularProgress, Tab, Tooltip, Typography} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import TextUpload from "../../components/textupload/TextUpload";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import WordClick from "./WordClick";
//history to keep all changes step-by-step made to alasisu
let history = [
    "",
]
//integer for indexing history with undo and redo
let currentHistory = 0

const Correction = () => {
    const [alasisu, setAlasisu] = useState('');
    const [tasemevastus, setTasemevastus] = useState(['algusväärtus']);
    const [tasemetekst, setTasemetekst] = useState('');
    const [korrektorivastus, setKorrektorivastus] = useState(['', '']);
    const [vastuskood, setVastuskood] = useState([]);
    const [vastusnahtav, setVastusnahtav] = useState(false);
    const [muutuskood, setMuutuskood] = useState('');
    const [yksikmuutus, setYksikmuutus] = useState(false);
    const [taselisa, setTaselisa] = useState(false);
    const [avatudkaart, setAvatudkaart] = useState('korrektuur');
    const [kordab, setKordab] = useState(false);
    const [sisukohad, setSisukohad] = useState([]);
    const [sisusonad, setSisusonad] = useState([]);
    const [vastussonad, setVastussonad] = useState([]);
    const [paringlopetatud, setParinglopetatud] = useState(false);
    const [keerukusvastus, setKeerukusvastus] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [mitmekesisusvastus, setMitmekesisusvastus] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [korrektuur, setKorrektuur] = useState('');

    const puhasta = (sona) => {
        if (sona !== undefined && sona !== "") {
            return sona.replace(/^[^0-9a-zA-ZõäöüÕÄÖÜ]+/, '').replace(/[^0-9a-zA-ZõäöüÕÄÖÜ]+$/, '');
        }
    };

    const puhasta2 = (sona) => {
        let re = /(^[^0-9a-zA-ZõäöüÕÄÖÜ]*)(.*[0-9a-zA-ZõäöüÕÄÖÜ]+)([^0-9a-zA-ZõäöüÕÄÖÜ]*)/;
        return re.exec(sona);
    };

    const kordama = () => {
        setKordab(true);
        korda();
    };

    const korda = () => {
        if (alasisu.replace(/(\r\n|\n|\r)/gm, "") === tasemetekst.replace(/(\r\n|\n|\r)/gm, "")) {
            return;
        }
        kysi3();
        kysi4();
        kysi5();
        kysi6();
    };

    const alaMuutus = (event) => {
        setAlasisu(event.target.value.replace(/(\r\n|\n|\r)/gm, ""));
        keepHistory();
    };

    const asenda = async (sisu, vastus, kohanr) => {
        sisu[kohanr] = vastus[kohanr];
        let tempString = "";
        for (let i = 0; i < sisu.length; i++) {
            if (i !== sisu.length - 1) {
                tempString += sisu[i] + " ";
            } else {
                tempString += sisu[i];
            }
        }
        setAlasisu(tempString);
        setSisusonad(sisu);
        setVastussonad(vastus);
        let tempArray = vastuskood.map((value) => {
            if (value.key === "s" + kohanr) {
                return <span key={`s${kohanr}`}>{sisu[kohanr] + " "}</span>
            } else {
                return value
            }
        })
        setVastuskood(tempArray);
        loadErrors();
        fillData(sisu, vastus);
        kysi4();
        kysi5();
        kysi6();
    };

    const eiAsenda = (sisu, vastus, kohanr) => {
        vastus[kohanr] = sisu[kohanr];
        let tempString = "";
        for (let i = 0; i < sisu.length; i++) {
            if (i !== sisu.length - 1) {
                tempString += sisu[i] + " ";
            } else {
                tempString += sisu[i];
            }
        }
        setAlasisu(tempString);
        setSisusonad(sisu);
        setVastussonad(vastus);
        let tempArray = vastuskood.map((value) => {
            if (value.key === "s" + kohanr) {
                return <span key={`s${kohanr}`}>{sisu[kohanr] + " "}</span>
            } else {
                return value
            }
        })
        setVastuskood(tempArray);
        loadErrors();
        fillData(sisu, vastus);
        kysi4();
        kysi5();
        kysi6();
    };

    const kysi4 = () => {
        if (alasisu === tasemetekst) {
            return;
        }
        let obj = {};
        obj["tekst"] = alasisu;
        const asisu = alasisu;
        fetch("/api/texts/keeletase", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(v => v.json()).then(t => {
            setTasemevastus(t);
            setTasemetekst(asisu);
        });
    };

    const kysi5 = () => {
        let obj = {};
        obj["tekst"] = alasisu;
        fetch("/api/texts/keerukus", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(v => v.json()).then(t => {
            setKeerukusvastus(t);
        });
    };

    const kysi6 = () => {
        let obj = {};
        obj["tekst"] = alasisu;
        fetch("/api/texts/mitmekesisus", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(v => v.json()).then(t => {
            setMitmekesisusvastus(t);
        });
    };

    const handleTabChange = (event, newValue) => {
        setAvatudkaart(newValue);
    };

    const kysi3 = async () => {
        if (alasisu === korrektorivastus[1]) {
            return;
        }
        const obj = {
            tekst: alasisu
        };
        try {
            const response = await fetch("/api/texts/korrektuur", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            let sm = data[1].split(" ");
            let vm = data[0].split(" ");
            await setSisusonad(sm);
            await setVastussonad(vm);
            await fillData(sm, vm);
        } catch (error) {
            console.error(error);
        }
    };

    const fillData = (sisu, vastus) => {
        const vastustekst = vastuskood;
        let sisutekst = "";
        const muutused = [];
        const sisukohad = [];
        if (sisu === vastus) {
            setKorrektuur("Kõik korras");
        } else {
            for (let i = 0; i < vastus.length; i++) {
                if (sisu[i] === vastus[i]) {
                    vastustekst[i] = <span key={"s" + i}>{vastus[i] + " "}</span>;
                } else {
                    muutused[i] = (
                        <span key={"sm" + i}>
              <span style={{backgroundColor: 'lightpink'}}>
                {sisu[i]}
              </span> - <span>{vastus[i]}</span>{" "}
                            <button onClick={() => asenda(sisu, vastus, i)}>
                Asenda
              </button>
              <br/>
            </span>
                    );
                    vastustekst[i] = (
                        <WordClick sisu={sisu} vastus={vastus} jrk={i} asenda={asenda}
                                   eiAsenda={eiAsenda}/>
                    );
                }
                sisutekst += sisu[i] + " ";
                sisukohad[i] = sisutekst.length;
            }
        }
        setMuutuskood(<div>{muutused.length > 0 ? muutused : "puuduvad"}</div>);
        setVastuskood(vastustekst);
        setSisukohad(sisukohad);
        setYksikmuutus(false);
        setParinglopetatud(true);
    }

    const renderTase = () => {
        let degreeValue;
        if (tasemevastus.length !== 1 && tasemevastus[0] !== undefined) {
            let val1 = parseInt((tasemevastus[0][0] * 100 * 3.6).toFixed(0), 10);
            let val2 = parseInt((tasemevastus[1][0] * 100 * 3.6).toFixed(0), 10);
            let val3 = parseInt((tasemevastus[2][0] * 100 * 3.6).toFixed(0), 10);
            let val4 = parseInt((tasemevastus[3][0] * 100 * 3.6).toFixed(0), 10);
            degreeValue = `conic-gradient(#b7e4c7 ${val1}deg,  #90e0ef ${val1}deg ${val2 + val1}deg, #ffb3c1 ${val2 + val1}deg ${val2 + val1 + val3}deg, #90e0ef ${val2 + val1 + val3}deg ${val2 + val1 + val3 + val4}deg)`;
        }
        return (
            <Box>
                <Box component="span" width="auto">
                    {kordab && parseInt(mitmekesisusvastus[10]) > 14 ? (
                        <Box component="span" width="auto">
                            {alasisu.length > 0 ? (
                                tasemevastus.length > 0 ? (
                                    tasemevastus.length === 1 ? (
                                        ""
                                    ) : (
                                        <Box width="100%">
                                            <Box className="tase-box-1">
                                                <Box marginRight="10%" width="80%" display="flex" flexDirection="column"
                                                     justifyContent="center"
                                                     paddingLeft="20%">
                                                    <Box display="flex" alignItems="center" justifyContent="start">
                                                        <Box width={15} height={15} borderRadius="50px"
                                                             bgcolor="#b7e4c7" marginRight="10px"></Box>
                                                        <h2>{tasemevastus[0][1]}: {(tasemevastus[0][0] * 100).toFixed(0)}%</h2>
                                                    </Box>
                                                    <Box className="other-percentage-values">
                                                        {tasemevastus.slice(1, 4).map((vastus) => {
                                                            if ((vastus[0] * 100).toFixed(0) > 0) {
                                                                return (
                                                                    <Box display="flex" alignItems="center"
                                                                         justifyContent="start">
                                                                        {" "}
                                                                        <Box width={15} height={15} borderRadius="50px"
                                                                             marginRight="10px"></Box>
                                                                        <h2>{vastus[1]}: {(vastus[0] * 100).toFixed(0)}%</h2>
                                                                    </Box>
                                                                );
                                                            }
                                                        })}
                                                    </Box>
                                                </Box>
                                                {tasemevastus[1][0] * 100 > 0 ? (
                                                    <Box display="flex" width="40%" justifyContent="center">
                                                        <Box height={150} width={150} borderRadius={50}
                                                             paddingRight="50px"
                                                             style={{background: degreeValue}}></Box>
                                                    </Box>
                                                ) : null}
                                            </Box>
                                            <Box paddingLeft="50px" marginTop="30px" width="100%">
                                                <Box marginBottom="20px">
                                                    <Typography>
                                                        <h2>Lisainfo</h2>
                                                    </Typography>
                                                </Box>
                                                <Box marginBottom="20px">
                                                    <b>Teksti üldine keerukus: <br/> {tasemevastus[4][1]} </b>
                                                    (tõenäosus {(tasemevastus[4][0] * 100).toFixed(0)}%)<br/>
                                                    Arvesse on võetud teksti, sõnade ja lausete pikkus.
                                                </Box>
                                                <Box marginBottom="20px">
                                                    <b>Morfoloogia ehk vormikasutus: <br/>{tasemevastus[8][1]} </b>
                                                    (tõenäosus {(tasemevastus[8][0] * 100).toFixed(0)}%)<br/>
                                                    Arvesse on võetud sõnaliikide ja muutevormide osakaalud ning sõnade
                                                    vormirohkus.
                                                </Box>
                                                <Box marginBottom="20px">
                                                    <b>Sõnavara: <br/>{tasemevastus[12][1]} </b>
                                                    {tasemevastus[12][0] > 0 && (
                                                        <span>(tõenäosus {(tasemevastus[12][0] * 100).toFixed(0)} %)<br/></span>
                                                    )}
                                                    Arvesse on võetud sõnavaliku mitmekesisus ja ulatus (unikaalsete
                                                    sõnade hulk, harvem esineva
                                                    sõnavara osakaal),
                                                    sõnavara tihedus (sisusõnade osakaal) ja nimisõnade abstraktsus.
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                ) : (
                                    <div></div>
                                )
                            ) : (
                                ""
                            )}
                        </Box>
                    ) : (
                        "Tekst on liiga lühike"
                    )}
                </Box>
            </Box>
        );
    }

    const loadErrors = () => {
        let errorList = [];
        for (let i = 0; i < sisusonad.length; i++) {
            if (sisusonad[i] !== vastussonad[i]) {
                errorList.push([sisusonad[i], vastussonad[i], sisukohad[i], i]);
            }
        }
        return (
            <Box>
                {errorList.map((error) => {
                    return (
                        <Box display="flex" justifyContent="center">
                            <Box id={error[0]} display="inline-flex" borderRadius="10px" maxWidth="min-content"
                                 justifyContent="center">
                                <Box
                                    id={error[0]}
                                    className="error-list-box-1"
                                >
                  <span
                      style={{
                          backgroundColor: "lightpink"
                      }}
                      className="error-word-container"
                  >
                    {puhasta(error[0])}
                  </span>{" "}
                                    <EastIcon/>{" "}
                                    <span
                                        style={{
                                            backgroundColor: "lightgreen",
                                        }}
                                        className="error-word-container"
                                    >
                    {puhasta(error[1])}
                  </span>{" "}
                                    <span style={{fontSize: "20px", fontWeight: "bold"}}>|</span>
                                    <Box display="flex" gap="15px">
                                        <Button
                                            size="30px"
                                            color="success"
                                            sx={{borderRadius: 30, padding: 0, minHeight: 30, minWidth: 30}}
                                            variant="contained"
                                            onClick={() => {
                                                asenda(sisusonad, vastussonad, error[3])
                                            }}
                                        >
                                            <DoneIcon fontSize="medium"/>
                                        </Button>
                                        <Button
                                            size="30px"
                                            color="error"
                                            sx={{borderRadius: 30, padding: 0, minHeight: 30, minWidth: 30}}
                                            variant="contained"
                                            onClick={() => {
                                                eiAsenda(sisusonad, vastussonad, error[3])
                                            }}
                                        >
                                            <CloseIcon fontSize="medium"/>
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        );
    }

    const customTooltip = (data) => {
        return (
            <Tooltip
                placement="top"
                title={data}>
                <QuestionMarkIcon fontSize="small"/>
            </Tooltip>
        )
    }

    //upload text to alasisu
    const sendTextFromFile = (data) => {
        setAlasisu(data, () => {
            keepHistory();
        });
    }

    //history for undo and redo
    //called by alaMuutus when a change is made
    const keepHistory = () => {
        currentHistory += 1;
        history.push(alasisu);
    }

    //undo and redo
    //TODO: panna handle undo ja redo uuesti tööle?
    const handleUndo = () => {
        if (currentHistory === 0) {
            return;
        }
        currentHistory -= 1
        const previousFromHistory = history[currentHistory]
        setAlasisu(previousFromHistory)
    }

    const handleRedo = () => {
        //if on last change then nothing to redo
        if (currentHistory === history.length - 1) {
            return;
        }
        currentHistory += 1
        const nextFromHistory = history[currentHistory]
        setAlasisu(nextFromHistory)
    }

    return (
        <Card raised={true}
              square={true}
              elevation={2}>
            <p/>
            {/*<Box display="flex">
                <div>
            <span className="material-symbols-outlined"
                  onClick={this.handleUndo}>undo</span>
                    <span className="material-symbols-outlined"
                          onClick={this.handleRedo}>redo</span>
                </div>
            </Box>*/}
            <div className="correction-container">
                <div>
                    <br/><br/>
                    <Box>
                        <TextUpload sendTextFromFile={sendTextFromFile}/>
                        {!paringlopetatud ? <textarea id="corrector-textarea"
                                                      onChange={(event) => alaMuutus(event)}
                                                      value={alasisu}
                                                      spellCheck={false}
                                                      placeholder={"Kopeeri või kirjuta siia analüüsitav tekst"}

                            /> :
                            <Box contentEditable="true" className="editable-div-container" id="corrector-textarea-div"
                                 suppressContentEditableWarning={true}
                                 onInput={event => setAlasisu(event.currentTarget.textContent.replace(/(\r\n|\n|\r)/gm, ""))}
                                 spellCheck={false}
                                 placeholder={"Kopeeri või kirjuta siia analüüsitav tekst"}
                            >
                                <Box className="input-container" id="input-container">
                                    {vastuskood.map((vaste) => {
                                        return (vaste)
                                    })}
                                </Box>
                            </Box>}
                    </Box>
                    <Box>
                        {!paringlopetatud ?
                            <Button
                                variant="contained"
                                onClick={() => kordama()}>Analüüsi
                            </Button>
                            :
                            <Button
                                variant="contained"
                                onClick={() => kordama()}>Analüüsi
                            </Button>
                        }
                    </Box>
                </div>
                <div className="corrector-tab-container">
                    <TabContext value={avatudkaart}>
                        <TabList centered={true} onChange={handleTabChange}>
                            <Tab
                                value="korrektuur"
                                label="korrektuur"
                            />
                            <Tab
                                value="hindamine"
                                label="hindamine"
                            />
                            <Tab
                                value="keerukus"
                                label="keerukus"
                            />
                            <Tab
                                value="mitmekesisus"
                                label="mitmekesisus"
                            />
                        </TabList>
                        {!kordab &&
                            <div>
                                <Box marginTop="50px">
                                    <Alert severity="info">Rakenduse abil saad parandada oma teksti õigekirja ja
                                        vaadata,
                                        mis keeleoskustasemele see vastab (A2–C1).
                                        Loe lähemalt <a
                                            href={"https://github.com/centre-for-educational-technology/evkk/wiki/Demos"}
                                            target="_blank"
                                            rel="noreferrer">siit</a>.</Alert>
                                </Box>
                            </div>
                        }
                        <TabPanel value="korrektuur">
                            {kordab && paringlopetatud &&
                            muutuskood.props.children === "puuduvad" ?
                                <span>
                  <div className="no-error-text-div">
                    <h3>Vigu ei leitud!</h3>
                  </div>
                </span>
                                :
                                <span>
                  {kordab && !paringlopetatud && alasisu !== korrektorivastus[1] &&
                      <Box display={"flex"} height={"200px"} alignItems={"center"} justifyContent={"center"}
                           width={"100%"}><CircularProgress/> </Box>}<br/>
                                    {(yksikmuutus) ? yksikmuutus : ""
                                    }<br/>
                                    {vastusnahtav &&
                                        <span>{tasemevastus ? vastuskood : "algus"}</span>}
                                    {kordab && paringlopetatud ? loadErrors() : ""}
                </span>
                            }
                        </TabPanel>
                        <TabPanel value="hindamine">
                            {kordab && <div>
                                <span>{renderTase()}</span></div>}
                        </TabPanel>
                        <TabPanel value="keerukus">
                            <div>
                                {kordab && <div>
                                    {(!keerukusvastus[0] > 0) ?
                                        <Box display={"flex"} height={"200px"} alignItems={"center"}
                                             justifyContent={"center"}
                                             width={"100%"}><CircularProgress/> </Box> : ""}</div>}
                                {kordab && keerukusvastus[0] > 0 &&
                                    <div style={{marginLeft: "10%", width: "100%"}}><h3>Keerukuse andmed</h3>
                                        <table width={"80%"}>
                                            <tbody>
                                            <tr className="corrector-border-bottom">
                                                <td style={{width: "90%"}}>Lauseid</td>
                                                <td style={{width: "10%"}}>{keerukusvastus[0]}</td>
                                            </tr>
                                            <tr className="corrector-border-bottom">
                                                <td>Sõnu</td>
                                                <td>{keerukusvastus[1]}</td>
                                            </tr>
                                            <tr className="corrector-border-bottom">
                                                <td>Paljusilbilisi
                                                    sõnu {customTooltip("Paljusilbiliseks loetake sõnad, mis sisaldavad vähemalt kolme silpi.")}</td>
                                                <td>{keerukusvastus[2]}</td>
                                            </tr>
                                            <tr className="corrector-border-bottom">
                                                <td>Silpe</td>
                                                <td>{keerukusvastus[3]}</td>
                                            </tr>
                                            <tr className="corrector-border-bottom">
                                                <td>Pikki
                                                    sõnu {customTooltip("Pikaks loetakse sõnad, milles on vähemalt seitse tähte.")}</td>
                                                <td>{keerukusvastus[4]}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <br/><br/>
                                        <Box><Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"}
                                                         marginTop={"20px"}
                                                         gutterBottom>
                                            SMOG indeks: {parseFloat(keerukusvastus[5]).toFixed()}
                                        </Typography>
                                        </Box>
                                        <Box>
                                            <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"}
                                                        marginTop={"20px"}
                                                        gutterBottom>
                                                Flesch-Kincaidi indeks: {parseFloat(keerukusvastus[6]).toFixed()}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"}
                                                        marginTop={"20px"}
                                                        gutterBottom>
                                                LIX indeks: {keerukusvastus[7]}
                                            </Typography>
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
                                        <div style={{fontSize: "20px", marginTop: "20px"}}>Pakutav
                                            keerukustase: {keerukusvastus[11]}</div>
                                    </div>
                                }
                            </div>
                        </TabPanel>
                        <TabPanel value="mitmekesisus">
                            <div>
                                {kordab && mitmekesisusvastus[10] === 0 ?
                                    <Box display={"flex"} height={"200px"} alignItems={"center"}
                                         justifyContent={"center"}
                                         width={"100%"}><CircularProgress/> </Box> : ""}
                                {mitmekesisusvastus[10] > 0 &&
                                    <div style={{marginLeft: "10%", width: "100%"}}><h3>Sõnavara mitmekesisuse
                                        andmed</h3>
                                        <table width={"80%"}>
                                            <tbody>
                                            <tr className="corrector-border-bottom">
                                                <td style={{width: "90%"}}>Arvestatud
                                                    sõnu {customTooltip("Sõnavara rikkust mõõtes jäetakse kõrvale nimed ja numbritega kirjutatud arvud.")}
                                                </td>
                                                <td style={{width: "10%"}}>{mitmekesisusvastus[10]}</td>
                                            </tr>
                                            <tr className="corrector-border-bottom">
                                                <td>Lemmasid ehk erinevaid sõnu</td>
                                                <td>{mitmekesisusvastus[11]}</td>
                                            </tr>
                                            <tr className="corrector-border-bottom">
                                                <td>Erinevate ja kõigi sõnade
                                                    korrigeeritud suhtarv -
                                                    KLSS <br/>(ingl Corrected Type-Token
                                                    Ratio) {customTooltip("lemmade arv / √(2 * sõnade arv) \n(Carroll, 1964)")}
                                                </td>
                                                <td>{mitmekesisusvastus[0]}</td>
                                            </tr>
                                            <tr className="corrector-border-bottom">
                                                <td>Erinevate ja kõigi sõnade juuritud
                                                    suhtarv -
                                                    JLSS <br/>(ingl Root Type-Token
                                                    Ratio) {customTooltip("lemmade arv / √(sõnade arv) \n(Guiraud, 1960)")}
                                                </td>
                                                <td>{mitmekesisusvastus[1]}</td>
                                            </tr>
                                            <tr className="corrector-border-bottom">
                                                <td>
                                                    MTLD indeks <br/>(ingl Measure of Textual Lexical
                                                    Diversity) {customTooltip("MTLD indeks (ingl Measure of Textual Lexical Diversity) mõõdab lemmade ja sõnade suhtarvu järjestikustes tekstiosades. Algul on suhtarv 1. Iga sõna juures arvutatakse see uuesti, kuni väärtus langeb alla piirarvu 0,72. Tsükkel kordub, kuni teksti lõpus jagatakse sõnade arv selliste tsüklite arvuga. Seejärel korratakse sama, liikudes tekstis tagantpoolt ettepoole. MTLD on nende kahe teksti keskväärtus. (McCarthy & Jarvis, 2010)")}
                                                </td>
                                                <td>{mitmekesisusvastus[4]}</td>
                                            </tr>
                                            <tr className="corrector-border-bottom">
                                                <td>
                                                    HDD indeks <br/>(ingl Hypergeometric Distribution
                                                    D) {customTooltip("HDD indeksi (ingl Hypergeometric Distribution D) arvutamiseks leitakse iga tekstis sisalduva lemma esinemistõenäosus juhuslikus 42-sõnalises tekstiosas. Kuna kõigi võimalike tekstikatkete arv on enamasti väga suur, arvutatakse tõenäosused hüpergeomeetrilise jaotuse funktsiooni abil. Kõigi lemmade esinemistõenäosused summeeritakse. (McCarthy & Jarvis, 2007)")}
                                                </td>
                                                <td>{mitmekesisusvastus[5]}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>}
                            </div>
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
        </Card>
    );
}

export default Correction;
