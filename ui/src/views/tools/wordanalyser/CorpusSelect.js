import React, { useState } from "react";
import { Checkbox, Button, Alert, FormControl, InputLabel, MenuItem, Select, ListItemIcon, ListItemText, Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import "./styles/CorpusSelect.css";
import { MenuProps, useStyles, addedYearOptions, charactersOptions, wordsOptions, sentencesOptions } from "./utils";
import CorpusTexts from "./CorpusTexts";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CorpusSelect() {

    const selectWidth = 250;
    const classes = useStyles();
    const currentYear = new Date().getFullYear();

    const [expanded, setExpanded] = useState(true);

    const [results, setResults] = useState([]);

    const [corpusCheckboxStatus, setCorpusCheckboxStatus] = useState({
        all: false,
        cFqPphvYi: false,
        clWmOIrLa: false,
        cFOoRQekA: false,
        cYDRkpymb: false,
        cgSRJPKTr: false,
        cZjHWUPtD: false,
        cwUSEqQLt: false
    });

    const [textData, setTextData] = useState({
        type: 'teadmata',
        language: 'eesti',
        level: 'teadmata',
        usedMaterials: 'teadmata'
    });

    const [addedYear, setAddedYear] = useState([]);

    const [characters, setCharacters] = useState([]);

    const [words, setWords] = useState([]);

    const [sentences, setSentences] = useState([]);

    const [authorData, setAuthorData] = useState({
        age: 'teadmata',
        gender: 'teadmata',
        education: 'teadmata',
        nativeLang: 'teadmata',
        country: 'teadmata'
    });

    const [alert, setAlert] = useState(false);
    const [noResultsError, setNoResultsError] = useState(false);

    function submitted() {
        let selectedCorpuses = [];
        Object.entries(corpusCheckboxStatus).forEach((entry) => {
            const [key, value] = entry;
            if (value && key !== "all") {
                selectedCorpuses.push(key);
            }
        });
        if (selectedCorpuses.length === 0) {
            setAlert(true);
        } else {
            let params = {};

            let corpuses = [];
            Object.entries(corpusCheckboxStatus).forEach((entry) => {
                const [key, value] = entry;
                if (value) {
                    corpuses.push(key);
                }
            });
            params.corpuses = corpuses;

            Object.entries(textData).forEach((entry) => {
                const [key, value] = entry;
                if (value !== "teadmata") {
                    params[key] = value;
                }
            });

            Object.entries(authorData).forEach((entry) => {
                const [key, value] = entry;
                if (value !== "teadmata") {
                    params[key] = value;
                }
            });

            if (addedYear.length > 0) {
                params.addedYear = simplifyDropdowns(addedYear);
            }

            if (characters.length > 0) {
                params.characters = simplifyDropdowns(characters);
            }

            if (words.length > 0) {
                params.words = simplifyDropdowns(words);
            }

            if (sentences.length > 0) {
                params.sentences = simplifyDropdowns(sentences);
            }

            console.log(params);
            fetch("/api/texts/detailneparing2", {
                method: "POST",
                body: JSON.stringify(params),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then((result) => {
                if (result.length > 0) {
                    setAlert(false);
                    setNoResultsError(false);
                    setResults(result);
                } else {
                    setNoResultsError(true);
                    setResults([]);
                }
                setExpanded();
            })
        }
    }

    function simplifyDropdowns(data) {
        let simplified = [];
        data.forEach((entry) => {
            let local = [];
            if (entry.includes("...")) {
                local = [parseInt(entry.split("...")[0]), currentYear];
            } else if (entry.includes("kuni")) {
                local = [1, parseInt(entry.split("kuni ")[1])];
            } else if (entry.includes("üle")) {
                local = [parseInt(entry.split("üle ")[1]), 999999999];
            } else {
                local = [parseInt(entry.split("—")[0]), parseInt(entry.split("—")[1])];
            }
            simplified.push(local);
        })
        return simplified;
    }

    const alterCorpusCheckbox = (event) => {
        let newCorpusCheckboxStatus = {...corpusCheckboxStatus};
        let trueCount = 0;
        newCorpusCheckboxStatus[event.target.id] = event.target.checked;
        Object.entries(newCorpusCheckboxStatus).forEach((entry) => {
            const [key, value] = entry;
            if (value && key !== "all") {
                trueCount++;
            }
        });
        if (trueCount === 7) {
            newCorpusCheckboxStatus.all = true;
        } else {
            newCorpusCheckboxStatus.all = false;
        }
        setCorpusCheckboxStatus(newCorpusCheckboxStatus);
    }

    const alterAllCorpusCheckboxes = (event) => {
        let newCorpusCheckboxStatus = {...corpusCheckboxStatus};
        for (let checkbox in newCorpusCheckboxStatus) {
            newCorpusCheckboxStatus[checkbox] = event.target.checked;
        }
        setCorpusCheckboxStatus(newCorpusCheckboxStatus);
    }

    const alterTextData = (event) => {
        let newTextData = {...textData};
        newTextData[event.target.name] = event.target.value;
        setTextData(newTextData);
    }

    const alterAuthorData = (event) => {
        let newAuthorData = {...authorData};
        newAuthorData[event.target.name] = event.target.value;
        setAuthorData(newAuthorData);
    }

    const changeAccordion = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={"container"}>
            {alert ? <div><Alert severity="error">Vali vähemalt üks korpus!</Alert><br/></div> : <></>}
            <Accordion expanded={expanded} onChange={changeAccordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="filters-header"
                >
                    <Typography>
                        Otsingu filtrid
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form action="" onSubmit={(e) => {e.preventDefault()}} id="vorm">
                        <div className="queryContainer">
                            <div>
                                {/*<div id="cover-spin"></div>*/}
                                <b>Korpus</b>
                                <br/><br/>
                                <span style={{ fontSize: "smaller" }}>Hiirega korpuse nimele liikudes näeb selle selgitust</span>
                                <br/><br/>
                                <Checkbox
                                    checked={corpusCheckboxStatus.all}
                                    onChange={alterAllCorpusCheckboxes}
                                />
                                <label>kõik</label>
                                <br/>
                                <Checkbox
                                    id="cFqPphvYi"
                                    checked={corpusCheckboxStatus.cFqPphvYi}
                                    onChange={alterCorpusCheckbox}
                                />
                                <label className="corpustitle" data-hover="Sisaldab eri emakeelega õpilaste eesti keele olümpiaadi esseid">
                                K2 olümpiaadi tööd
                                </label>
                                <br/>
                                <Checkbox
                                    id="clWmOIrLa"
                                    checked={corpusCheckboxStatus.clWmOIrLa}
                                    onChange={alterCorpusCheckbox}
                                />
                                <label className="corpustitle" data-hover="Sisaldab riiklikke eksami- ja tasemetöid">
                                    K2 tasemeeksamite tekstid
                                </label>
                                <br/>
                                <Checkbox
                                    id="cFOoRQekA"
                                    checked={corpusCheckboxStatus.cFOoRQekA}
                                    onChange={alterCorpusCheckbox}
                                />
                                <label className="corpustitle" data-hover="Sisaldab eksamiväliselt kirjutatud A2-, B1-, B2- ja C1-taseme tekste, mille tase on määratud kolme tunnustatud hindamise spetsialisti ühise arvamuse põhjal">
                                    K2 tuumkorpus
                                </label>
                                <br/>
                                <Checkbox
                                    id="cYDRkpymb"
                                    checked={corpusCheckboxStatus.cYDRkpymb}
                                    onChange={alterCorpusCheckbox}
                                />
                                <label className="corpustitle" data-hover="Võrdluskorpus, sisaldab emakeelekõnelejate arvamuslugusid ajalehtedest">
                                    K1 eesti keel
                                </label>
                                <br/>
                                <Checkbox
                                    id="cgSRJPKTr"
                                    checked={corpusCheckboxStatus.cgSRJPKTr}
                                    onChange={alterCorpusCheckbox}
                                />
                                <label className="corpustitle" data-hover="Sisaldab põhikooli ja gümnaasiumi vene emakeelega õpilaste loomingulist laadi tekste">
                                    K1 vene keel
                                </label>
                                <br/>
                                <Checkbox
                                    id="cZjHWUPtD"
                                    checked={corpusCheckboxStatus.cZjHWUPtD}
                                    onChange={alterCorpusCheckbox}
                                />
                                <label className="corpustitle" data-hover="Sisaldab tekste eesti emakeelega õpilastelt, kes õpivad koolis vene keelt kolmanda keelena">
                                    K3 vene keel
                                </label>
                                <br/>
                                <Checkbox
                                    id="cwUSEqQLt"
                                    checked={corpusCheckboxStatus.cwUSEqQLt}
                                    onChange={alterCorpusCheckbox}
                                />
                                <label className="corpustitle" data-hover="Sisaldab emakeelekõneleja ja eesti keelt teise keelena kasutava üliõpilase akadeemilise keelekasutuse näiteid (referaadid, seminaritööd, lõputööd jm)">
                                    Akadeemiline õppijakeel
                                </label>
                                <br/>
                                {/* <Checkbox
                                    id="cwUprXCTL"
                                    checked={corpusCheckboxStatus.cwUprXCTL}
                                    onChange={alterCorpusCheckbox}
                                />
                                <label className="corpustitle">Eesti teaduskeel</label>
                                <br/> */}
                            </div>
                            <div>
                                <b>Teksti andmed</b>
                                <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="type-label">Teksti liik</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="type-label"
                                        name="type"
                                        value={textData.type}
                                        label="Teksti liik"
                                        onChange={alterTextData}
                                    >
                                        <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                        <MenuItem value="isikiri">isiklik kiri</MenuItem>
                                        <MenuItem value="amtkiri">ametlik kiri</MenuItem>
                                        <MenuItem value="essee">essee</MenuItem>
                                        <MenuItem value="referaat">referaat</MenuItem>
                                        <MenuItem value="trilumunud">trükis ilmunud</MenuItem>
                                        <MenuItem value="analyys">analüüs</MenuItem>
                                        <MenuItem value="vastkys">vastus küsimusele</MenuItem>
                                        <MenuItem value="ymberjutustus">ümberjutustus</MenuItem>
                                        <MenuItem value="tolge">tõlge</MenuItem>
                                        <MenuItem value="harjutus">harjutus</MenuItem>
                                        <MenuItem value="teadus">teadusartikkel</MenuItem>
                                        <MenuItem value="monograafia">monograafia</MenuItem>
                                        <MenuItem value="vaitekiri">väitekiri</MenuItem>
                                        <MenuItem value="ma">MA-töö</MenuItem>
                                        <MenuItem value="batoo">BA-töö</MenuItem>
                                        <MenuItem value="arvamuslugu">arvamuslugu</MenuItem>
                                        <MenuItem value="teade">teade</MenuItem>
                                        <MenuItem value="kirjeldus/jutustus">kirjeldus/jutustus</MenuItem>
                                        <MenuItem value="muu">muu</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="language-label">Teksti keel</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="language-label"
                                        name="language"
                                        value={textData.language}
                                        label="Teksti keel"
                                        onChange={alterTextData}
                                    >
                                        <MenuItem value="eesti">eesti</MenuItem>
                                        <MenuItem value="inglise">inglise</MenuItem>
                                        <MenuItem value="soome">soome</MenuItem>
                                        <MenuItem value="vene">vene</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="level-label">Teksti tase</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="level-label"
                                        name="level"
                                        value={textData.level}
                                        label="Teksti tase"
                                        onChange={alterTextData}
                                    >
                                        <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                        <MenuItem value="A">A</MenuItem>
                                        <MenuItem value="B">B</MenuItem>
                                        <MenuItem value="A">C</MenuItem>
                                        <MenuItem value="A1">A1</MenuItem>
                                        <MenuItem value="A2">A2</MenuItem>
                                        <MenuItem value="B1">B1</MenuItem>
                                        <MenuItem value="B2">B2</MenuItem>
                                        <MenuItem value="C1">C1</MenuItem>
                                        <MenuItem value="C2">C2</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="usedMaterials-label">Kasutatud õppematerjale</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="usedMaterials-label"
                                        name="usedMaterials"
                                        value={textData.usedMaterials}
                                        label="Kasutatud õppematerjale"
                                        onChange={alterTextData}
                                    >
                                        <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                        <MenuItem value="jah">jah</MenuItem>
                                        <MenuItem value="ei">ei</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl className={classes.formControl} size="small">
                                    <InputLabel id="addedYear-label">Teksti lisamise aasta</InputLabel>
                                    <Select
                                        labelId="addedYear-label"
                                        label="Teksti lisamise aasta"
                                        multiple
                                        value={addedYear}
                                        name="addedYear"
                                        onChange={(e) => {setAddedYear(e.target.value)}}
                                        renderValue={(addedYear) => addedYear.join(", ")}
                                        MenuProps={MenuProps}
                                    >
                                        {addedYearOptions.map((year) => (
                                            <MenuItem key={year} value={year}>
                                                <ListItemIcon>
                                                    <Checkbox checked={addedYear.indexOf(year) > -1} />
                                                </ListItemIcon>
                                                <ListItemText primary={year} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl className={classes.formControl} size="small">
                                    <InputLabel id="characters-label">Tähemärke</InputLabel>
                                    <Select
                                        labelId="characters-label"
                                        label="Tähemärke"
                                        multiple
                                        value={characters}
                                        name="characters"
                                        onChange={(e) => {setCharacters(e.target.value)}}
                                        renderValue={(characters) => characters.join(", ")}
                                        MenuProps={MenuProps}
                                    >
                                        {charactersOptions.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                <ListItemIcon>
                                                    <Checkbox checked={characters.indexOf(item) > -1} />
                                                </ListItemIcon>
                                                <ListItemText primary={item} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl className={classes.formControl} size="small">
                                    <InputLabel id="words-label">Sõnu</InputLabel>
                                    <Select
                                        labelId="words-label"
                                        label="Sõnu"
                                        multiple
                                        value={words}
                                        name="words"
                                        onChange={(e) => {setWords(e.target.value)}}
                                        renderValue={(words) => words.join(", ")}
                                        MenuProps={MenuProps}
                                    >
                                        {wordsOptions.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                <ListItemIcon>
                                                    <Checkbox checked={words.indexOf(item) > -1} />
                                                </ListItemIcon>
                                                <ListItemText primary={item} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl className={classes.formControl} size="small">
                                    <InputLabel id="sentences-label">Lauseid</InputLabel>
                                    <Select
                                        labelId="sentences-label"
                                        label="Lauseid"
                                        multiple
                                        value={sentences}
                                        name="sentences"
                                        onChange={(e) => {setSentences(e.target.value)}}
                                        renderValue={(sentences) => sentences.join(", ")}
                                        MenuProps={MenuProps}
                                    >
                                        {sentencesOptions.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                <ListItemIcon>
                                                    <Checkbox checked={sentences.indexOf(item) > -1} />
                                                </ListItemIcon>
                                                <ListItemText primary={item} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <b>Teksti autori andmed</b>
                                <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="age-label">Vanus</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="age-label"
                                        name="age"
                                        value={authorData.age}
                                        label="Vanus"
                                        onChange={alterAuthorData}
                                    >
                                        <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                        <MenuItem value="kuni18">- 18</MenuItem>
                                        <MenuItem value="kuni26">18 - 26</MenuItem>
                                        <MenuItem value="kuni40">27 - 40</MenuItem>
                                        <MenuItem value="41plus">41 +</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="gender-label">Sugu</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="gender-label"
                                        name="gender"
                                        value={authorData.gender}
                                        label="Sugu"
                                        onChange={alterAuthorData}
                                    >
                                        <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                        <MenuItem value="mees">mees</MenuItem>
                                        <MenuItem value="naine">naine</MenuItem>
                                        {/*<MenuItem value="muu">muu</MenuItem>*/}
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="education-label">Haridus</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="education-label"
                                        name="education"
                                        value={authorData.education}
                                        label="Haridus"
                                        onChange={alterAuthorData}
                                    >
                                        <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                        <MenuItem value="Alg-/põhiharidus,alg,pohi">algharidus/põhiharidus</MenuItem>
                                        <MenuItem value="Keskharidus,kesk">keskharidus</MenuItem>
                                        <MenuItem value="Keskeriharidus/kutseharidus,keskeri,kutse">keskeriharidus/kutseharidus</MenuItem>
                                        <MenuItem value="Kõrgharidus,korg">kõrgharidus</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="nativeLang-label">Emakeel</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="nativeLang-label"
                                        name="nativeLang"
                                        value={authorData.nativeLang}
                                        label="Emakeel"
                                        onChange={alterAuthorData}
                                    >
                                        <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                        <MenuItem value="eesti">eesti</MenuItem>
                                        <MenuItem value="vene">vene</MenuItem>
                                        <MenuItem value="soome">soome</MenuItem>
                                        <MenuItem value="saksa">saksa</MenuItem>
                                        <MenuItem value="ukraina">ukraina</MenuItem>
                                        <MenuItem value="valgevene">valgevene</MenuItem>
                                        <MenuItem value="lati">läti</MenuItem>
                                        <MenuItem value="leedu">leedu</MenuItem>
                                        <MenuItem value="rootsi">rootsi</MenuItem>
                                        <MenuItem value="inglise">inglise</MenuItem>
                                        <MenuItem value="jidis">jidiš</MenuItem>
                                        <MenuItem value="itaalia">itaalia</MenuItem>
                                        <MenuItem value="jaapani">jaapani</MenuItem>
                                        <MenuItem value="poola">poola</MenuItem>
                                        <MenuItem value="hollandi">hollandi</MenuItem>
                                        <MenuItem value="sloveenia">sloveenia</MenuItem>
                                        <MenuItem value="heebrea">heebrea</MenuItem>
                                        <MenuItem value="prantsuse">prantsuse</MenuItem>
                                        <MenuItem value="katalaani">katalaani</MenuItem>
                                        <MenuItem value="ungari">ungari</MenuItem>
                                        <MenuItem value="tsehhi">tšehhi</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="homeLang-label">Kodukeel</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="homeLang-label"
                                        name="homeLang"
                                        value={authorData.homeLang}
                                        label="Kodukeel"
                                        onChange={alterAuthorData}
                                    >
                                        <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                        <MenuItem value="eesti">eesti</MenuItem>
                                        <MenuItem value="vene">vene</MenuItem>
                                        <MenuItem value="soome">soome</MenuItem>
                                        <MenuItem value="saksa">saksa</MenuItem>
                                        <MenuItem value="ukraina">ukraina</MenuItem>
                                        <MenuItem value="valgevene">valgevene</MenuItem>
                                        <MenuItem value="lati">läti</MenuItem>
                                        <MenuItem value="leedu">leedu</MenuItem>
                                        <MenuItem value="rootsi">rootsi</MenuItem>
                                        <MenuItem value="inglise">inglise</MenuItem>
                                        <MenuItem value="jidis">jidiš</MenuItem>
                                        <MenuItem value="itaalia">itaalia</MenuItem>
                                        <MenuItem value="jaapani">jaapani</MenuItem>
                                        <MenuItem value="poola">poola</MenuItem>
                                        <MenuItem value="hollandi">hollandi</MenuItem>
                                        <MenuItem value="sloveenia">sloveenia</MenuItem>
                                        <MenuItem value="heebrea">heebrea</MenuItem>
                                        <MenuItem value="prantsuse">prantsuse</MenuItem>
                                        <MenuItem value="katalaani">katalaani</MenuItem>
                                        <MenuItem value="ungari">ungari</MenuItem>
                                        <MenuItem value="tsehhi">tšehhi</MenuItem>
                                    </Select>
                                </FormControl> */}
                                <br/><br/>
                                <FormControl size="small">
                                    <InputLabel id="country-label">Elukohariik</InputLabel>
                                    <Select
                                        sx={{ minWidth: selectWidth }}
                                        labelId="country-label"
                                        name="country"
                                        value={authorData.country}
                                        label="Elukohariik"
                                        onChange={alterAuthorData}
                                    >
                                        <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                        <MenuItem value="eesti">Eesti</MenuItem>
                                        <MenuItem value="soome">Soome</MenuItem>
                                        <MenuItem value="rootsi">Rootsi</MenuItem>
                                        <MenuItem value="venemaa">Venemaa</MenuItem>
                                        <MenuItem value="lati">Läti</MenuItem>
                                        <MenuItem value="leedu">Leedu</MenuItem>
                                        <MenuItem value="saksamaa">Saksamaa</MenuItem>
                                        {/*<MenuItem value="inglismaa">Suurbritannia</MenuItem>*/}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <br/><br/>
                        <Button variant="contained" onClick={() => {submitted()}}>Saada päring</Button>
                    </form>
                </AccordionDetails>
            </Accordion>
            <br/>
            {noResultsError ? <div><Alert severity="error">Ei leitud ühtegi teksti!</Alert><br/></div> : <></>}
            <CorpusTexts data={results} />
        </div>
    );
}

export default CorpusSelect;