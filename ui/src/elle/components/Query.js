import React, {useState} from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
  Typography
} from "@mui/material";
import "./styles/Query.css";
import {
  AccordionStyle,
  addedYearOptions,
  charactersOptions,
  MenuProps,
  sentencesOptions,
  textTypesOptions,
  useStyles,
  wordsOptions
} from "../utils/constants";
import QueryResults from "./QueryResults";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingButton from '@mui/lab/LoadingButton';

function Query() {

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
  const [singlePropertyData, setSinglePropertyData] = useState({
    language: 'eesti',
    level: '',
    usedMaterials: '',
    age: '',
    gender: '',
    education: '',
    nativeLang: '',
    country: ''
  });
  const [addedYears, setAddedYears] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [textTypes, setTextTypes] = useState([]);
  const [alert, setAlert] = useState(false);
  const [noResultsError, setNoResultsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsKey, setResultsKey] = useState(1);

  function submitted() {
    setResultsKey(Math.random());
    setIsLoading(true);
    let selectedCorpuses = [];
    Object.entries(corpusCheckboxStatus).forEach((entry) => {
      const [key, value] = entry;
      if (value && key !== "all") {
        selectedCorpuses.push(key);
      }
    });
    if (selectedCorpuses.length === 0) {
      setAlert(true);
      setIsLoading(false);
    } else {
      let params = {};

      params.corpuses = selectedCorpuses;

      Object.entries(singlePropertyData).forEach((entry) => {
        const [key, value] = entry;
        if (value !== "") {
          params[key] = value;
        }
      });

      if (addedYears.length > 0) {
        params.addedYears = simplifyDropdowns(addedYears);
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

      fetch("/api/texts/detailneparing", {
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
          setIsLoading(false);
        });
    }
  }

  function simplifyDropdowns(data) {
    let simplified = [];
    data.forEach((entry) => {
      let local;
      if (entry.includes("...")) {
        local = [parseInt(entry.split("...")[0]), currentYear];
      } else if (entry.includes("kuni")) {
        local = [1, parseInt(entry.split("kuni ")[1])];
      } else if (entry.includes("üle")) {
        local = [parseInt(entry.split("üle ")[1]), 2147483647]; //java int max value
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
    newCorpusCheckboxStatus.all = trueCount === 7;
    setCorpusCheckboxStatus(newCorpusCheckboxStatus);
  }

  const alterAllCorpusCheckboxes = (event) => {
    let newCorpusCheckboxStatus = {...corpusCheckboxStatus};
    for (let checkbox in newCorpusCheckboxStatus) {
      newCorpusCheckboxStatus[checkbox] = event.target.checked;
    }
    setCorpusCheckboxStatus(newCorpusCheckboxStatus);
  }

  const alterSinglePropertyData = (event, fieldName) => {
    let newSinglePropertyData = {...singlePropertyData};
    newSinglePropertyData[fieldName] = (newSinglePropertyData[fieldName] === event.target.dataset.value || event.target.dataset.value === undefined)
      ? ''
      : event.target.dataset.value;
    setSinglePropertyData(newSinglePropertyData);
  }

  const changeAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {alert ? <div><Alert severity="error">Vali vähemalt üks korpus!</Alert><br/></div> : <></>}
      <Accordion sx={AccordionStyle}
                 expanded={expanded}
                 onChange={changeAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="filters-header"
        >
          <Typography>
            Otsingu filtrid
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form action=""
                onSubmit={(e) => {
                  e.preventDefault()
                }}
                id="vorm">
            <div className="queryContainer">
              <div>
                <b>Korpus</b>
                <br/><br/>
                <span style={{fontSize: "smaller"}}>Hiirega korpuse nimele liikudes näeb selle selgitust</span>
                <br/><br/>
                <Checkbox
                  checked={corpusCheckboxStatus.all}
                  onChange={alterAllCorpusCheckboxes}
                />
                <label>kõik</label>
                <br/>
                <Checkbox
                  id="clWmOIrLa"
                  checked={corpusCheckboxStatus.clWmOIrLa}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title="Sisaldab riiklikke eksami- ja tasemetöid"
                         followCursor>
                  <label className="corpustitle">
                    K2 riiklikud eksamitööd
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cFqPphvYi"
                  checked={corpusCheckboxStatus.cFqPphvYi}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title="Sisaldab eri emakeelega õpilaste eesti keele olümpiaadi esseid"
                         followCursor>
                  <label className="corpustitle">
                    K2 olümpiaaditööd
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cFOoRQekA"
                  checked={corpusCheckboxStatus.cFOoRQekA}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title="Sisaldab eksamiväliselt kirjutatud A2-, B1-, B2- ja C1-taseme tekste, mille tase on määratud kolme tunnustatud hindamise spetsialisti ühise arvamuse põhjal"
                         followCursor>
                  <label className="corpustitle">
                    K2 keeleõpe
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cwUSEqQLt"
                  checked={corpusCheckboxStatus.cwUSEqQLt}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title="Sisaldab emakeelekõneleja ja eesti keelt teise keelena kasutava üliõpilase akadeemilise keelekasutuse näiteid (referaadid, seminaritööd, lõputööd jm)"
                         followCursor>
                  <label className="corpustitle">
                    Akadeemiline kirjutamine
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cYDRkpymb"
                  checked={corpusCheckboxStatus.cYDRkpymb}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title="Võrdluskorpus, sisaldab emakeelekõnelejate arvamuslugusid ajalehtedest"
                         followCursor>
                  <label className="corpustitle">
                    K1 eesti keel
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cgSRJPKTr"
                  checked={corpusCheckboxStatus.cgSRJPKTr}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title="Sisaldab põhikooli ja gümnaasiumi vene emakeelega õpilaste loomingulist laadi tekste"
                         followCursor>
                  <label className="corpustitle">
                    K1 vene keel
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cZjHWUPtD"
                  checked={corpusCheckboxStatus.cZjHWUPtD}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title="Sisaldab tekste eesti emakeelega õpilastelt, kes õpivad koolis vene keelt kolmanda keelena"
                         followCursor>
                  <label className="corpustitle">
                    K3 vene keel
                  </label>
                </Tooltip>
                <br/>
              </div>
              <div>
                <b>Teksti andmed</b>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="types-label">Teksti liik</InputLabel>
                  <Select
                    labelId="types-label"
                    label="Teksti liik"
                    multiple
                    value={textTypes}
                    name="types"
                    onClick={(e) => {
                      // setTextTypes(e.target.value)
                      // console.log(e.target.offsetParent.id);
                      // console.log(e.target);
                    }}
                    renderValue={(textType) => textType.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {Object.keys(textTypesOptions).map((corpus) => (
                      corpusCheckboxStatus[corpus] && Object.keys(textTypesOptions[corpus]).map((textType) => (
                        typeof textTypesOptions[corpus][textType] === 'string'
                          ? <MenuItem key={textType}
                                      id={textType}
                                      value={textType}>
                            <ListItemIcon>
                              <Checkbox checked={textTypes.indexOf(textType) > -1}/>
                            </ListItemIcon>
                            <ListItemText primary={textTypesOptions[corpus][textType]}/>
                          </MenuItem>
                          : <span>
                            <MenuItem key={textType}
                                      id={textType}
                                      value={textType}>
                              <ListItemIcon>
                                <Checkbox checked={textTypes.indexOf(textType) > -1}/>
                              </ListItemIcon>
                              <ListItemText primary={textType}/>
                            </MenuItem>
                            {Object.keys(textTypesOptions[corpus][textType]).map((specificTextType) => (
                              <MenuItem key={specificTextType}
                                        id={specificTextType}
                                        value={specificTextType}
                                        sx={{paddingLeft: "2rem"}}>
                                <ListItemIcon>
                                  <Checkbox checked={textTypes.indexOf(specificTextType) > -1}/>
                                </ListItemIcon>
                                <ListItemText primary={textTypesOptions[corpus][textType][specificTextType]}/>
                              </MenuItem>
                            ))}
                          </span>
                      ))
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl size="small">
                  <InputLabel id="language-label">Teksti keel</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="language-label"
                    name="language"
                    value={singlePropertyData.language}
                    label="Teksti keel"
                    onClick={(e) => alterSinglePropertyData(e, "language")}
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
                    sx={{minWidth: selectWidth}}
                    labelId="level-label"
                    name="level"
                    value={singlePropertyData.level}
                    label="Teksti tase"
                    onClick={(e) => alterSinglePropertyData(e, "level")}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
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
                    sx={{minWidth: selectWidth}}
                    labelId="usedMaterials-label"
                    name="usedMaterials"
                    value={singlePropertyData.usedMaterials}
                    label="Kasutatud õppematerjale"
                    onClick={(e) => alterSinglePropertyData(e, "usedMaterials")}
                  >
                    <MenuItem value="jah">jah</MenuItem>
                    <MenuItem value="ei">ei</MenuItem>
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="addedYears-label">Teksti lisamise aasta</InputLabel>
                  <Select
                    labelId="addedYears-label"
                    label="Teksti lisamise aasta"
                    multiple
                    value={addedYears}
                    name="addedYears"
                    onChange={(e) => setAddedYears(e.target.value)}
                    renderValue={(addedYear) => addedYear.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {addedYearOptions.map((year) => (
                      <MenuItem key={year}
                                value={year}>
                        <ListItemIcon>
                          <Checkbox checked={addedYears.indexOf(year) > -1}/>
                        </ListItemIcon>
                        <ListItemText primary={year}/>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="characters-label">Tähemärke</InputLabel>
                  <Select
                    labelId="characters-label"
                    label="Tähemärke"
                    multiple
                    value={characters}
                    name="characters"
                    onChange={(e) => setCharacters(e.target.value)}
                    renderValue={(character) => character.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {charactersOptions.map((item) => (
                      <MenuItem key={item}
                                value={item}>
                        <ListItemIcon>
                          <Checkbox checked={characters.indexOf(item) > -1}/>
                        </ListItemIcon>
                        <ListItemText primary={item}/>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="words-label">Sõnu</InputLabel>
                  <Select
                    labelId="words-label"
                    label="Sõnu"
                    multiple
                    value={words}
                    name="words"
                    onChange={(e) => setWords(e.target.value)}
                    renderValue={(word) => word.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {wordsOptions.map((item) => (
                      <MenuItem key={item}
                                value={item}>
                        <ListItemIcon>
                          <Checkbox checked={words.indexOf(item) > -1}/>
                        </ListItemIcon>
                        <ListItemText primary={item}/>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="sentences-label">Lauseid</InputLabel>
                  <Select
                    labelId="sentences-label"
                    label="Lauseid"
                    multiple
                    value={sentences}
                    name="sentences"
                    onChange={(e) => setSentences(e.target.value)}
                    renderValue={(sentence) => sentence.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {sentencesOptions.map((item) => (
                      <MenuItem key={item}
                                value={item}>
                        <ListItemIcon>
                          <Checkbox checked={sentences.indexOf(item) > -1}/>
                        </ListItemIcon>
                        <ListItemText primary={item}/>
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
                    sx={{minWidth: selectWidth}}
                    labelId="age-label"
                    name="age"
                    value={singlePropertyData.age}
                    label="Vanus"
                    onClick={(e) => alterSinglePropertyData(e, "age")}
                  >
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
                    sx={{minWidth: selectWidth}}
                    labelId="gender-label"
                    name="gender"
                    value={singlePropertyData.gender}
                    label="Sugu"
                    onClick={(e) => alterSinglePropertyData(e, "gender")}
                  >
                    <MenuItem value="mees">mees</MenuItem>
                    <MenuItem value="naine">naine</MenuItem>
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl size="small">
                  <InputLabel id="education-label">Haridus</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="education-label"
                    name="education"
                    value={singlePropertyData.education}
                    label="Haridus"
                    onClick={(e) => alterSinglePropertyData(e, "education")}
                  >
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
                    sx={{minWidth: selectWidth}}
                    labelId="nativeLang-label"
                    name="nativeLang"
                    value={singlePropertyData.nativeLang}
                    label="Emakeel"
                    onClick={(e) => alterSinglePropertyData(e, "nativeLang")}
                  >
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
                <br/><br/>
                <FormControl size="small">
                  <InputLabel id="country-label">Elukohariik</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="country-label"
                    name="country"
                    value={singlePropertyData.country}
                    label="Elukohariik"
                    onClick={(e) => alterSinglePropertyData(e, "country")}
                  >
                    <MenuItem value="eesti">Eesti</MenuItem>
                    <MenuItem value="soome">Soome</MenuItem>
                    <MenuItem value="rootsi">Rootsi</MenuItem>
                    <MenuItem value="venemaa">Venemaa</MenuItem>
                    <MenuItem value="lati">Läti</MenuItem>
                    <MenuItem value="leedu">Leedu</MenuItem>
                    <MenuItem value="saksamaa">Saksamaa</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <br/><br/>
            <LoadingButton onClick={() => {
              submitted();
            }}
                           loading={isLoading}
                           variant={isLoading ? "outlined" : "contained"}>Saada päring</LoadingButton>
          </form>
        </AccordionDetails>
      </Accordion>
      <br/>
      {noResultsError ? <div><Alert severity="error">Ei leitud ühtegi teksti!</Alert><br/></div> : <></>}
      <QueryResults key={resultsKey}
                    data={results}/>
    </div>
  );
}

export default Query;