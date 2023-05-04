import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Tooltip,
  Typography
} from '@mui/material';
import '../styles/Query.css';
import {
  AccordionStyle,
  addedYearOptions,
  charactersOptions,
  MenuProps,
  sentencesOptions,
  textTypesOptions,
  usedMaterialsOptions,
  useStyles,
  wordsOptions
} from '../../utils/constants';
import QueryResults from './QueryResults';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';
import TextUpload from '../../components/TextUpload';
import CloseIcon from '@mui/icons-material/Close';
import { queryStore } from '../../store/QueryStore';
import { loadFetch } from '../../service/LoadFetch';

function Query() {

  const selectWidth = 290;
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(location.pathname === '/tools');
  const [results, setResults] = useState([]);
  const [addedYears, setAddedYears] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [textTypes, setTextTypes] = useState([]);
  const [usedMultiMaterials, setUsedMultiMaterials] = useState([]);
  const [alert, setAlert] = useState(false);
  const [noResultsError, setNoResultsError] = useState(false);
  const [resultsKey, setResultsKey] = useState(1);
  const [queryVisible, setQueryVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [corpusTextsSelected, setCorpusTextsSelected] = useState(0);
  const [ownTextsSelected, setOwnTextsSelected] = useState(false);
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
    domain: '',
    usedMaterials: '',
    age: '',
    gender: '',
    education: '',
    studyLevel: '',
    degree: '',
    nativeLang: '',
    otherLang: '',
    nationality: '',
    country: ''
  });

  // reset corpus-based filters
  useEffect(() => {
    let newSinglePropertyData = {...singlePropertyData};

    if (checkIfOnlySpecificCorpusIsChecked('clWmOIrLa')) {
      newSinglePropertyData.nativeLang = '';
    } else {
      newSinglePropertyData.nationality = '';
    }

    if (checkIfOnlySpecificCorpusIsChecked('cwUSEqQLt')) {
      newSinglePropertyData.level = '';
      newSinglePropertyData.education = '';
      newSinglePropertyData.usedMaterials = '';
    } else {
      newSinglePropertyData.studyLevel = '';
      newSinglePropertyData.degree = '';
      newSinglePropertyData.otherLang = '';
      newSinglePropertyData.domain = '';
      setUsedMultiMaterials([]);
    }

    setSinglePropertyData(newSinglePropertyData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corpusCheckboxStatus]);

  useEffect(() => {
    refreshChips();
  }, []);

  queryStore.subscribe(() => {
    refreshChips();
  });

  const refreshChips = () => {
    const storeState = queryStore.getState();
    setCorpusTextsSelected(storeState.corpusTextIds !== null
      ? storeState.corpusTextIds.length
      : 0
    );
    setOwnTextsSelected(storeState.ownTexts !== null);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55em',
    bgcolor: '#FCFCFC',
    boxShadow: 24,
    borderRadius: '12px',
    p: 4,
    maxHeight: '37.5em',
    overflow: 'auto'
  };

  const submitted = () => {
    setResultsKey(Math.random());
    const selectedCorpuses = getSelectedCorpusList();

    if (selectedCorpuses.length === 0) {
      setAlert(true);
    } else {
      setAlert(false);
      let params = {};

      params.corpuses = selectedCorpuses;

      Object.entries(singlePropertyData).forEach((entry) => {
        const [key, value] = entry;
        if (value !== '') {
          params[key] = value;
        }
      });

      if (textTypes.length > 0) {
        params.types = textTypes;
      }

      if (usedMultiMaterials.length > 0) {
        params.usedMultiMaterials = usedMultiMaterials;
      }

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

      loadFetch('/api/texts/detailneparing', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((result) => {
          if (result.length > 0) {
            setNoResultsError(false);
            setResults(result);
          } else {
            setNoResultsError(true);
            setResults([]);
          }
          setExpanded(false);
        });
    }
  }

  function getSelectedCorpusList() {
    let selectedCorpuses = [];
    Object.entries(corpusCheckboxStatus).forEach((entry) => {
      const [key, value] = entry;
      if (value && key !== 'all') {
        selectedCorpuses.push(key);
      }
    });
    return selectedCorpuses;
  }

  function checkIfOnlySpecificCorpusIsChecked(corpus) {
    let selectedCorpuses = getSelectedCorpusList();
    return selectedCorpuses.length === 1 && selectedCorpuses[0] === corpus;
  }

  function simplifyDropdowns(data) {
    let simplified = [];
    data.forEach((entry) => {
      let local;
      if (entry.includes('...')) {
        local = [parseInt(entry.split('...')[0]), currentYear];
      } else if (entry.includes('kuni')) {
        local = [1, parseInt(entry.split('kuni ')[1])];
      } else if (entry.includes('üle')) {
        local = [parseInt(entry.split('üle ')[1]), 2147483647]; //java int max value
      } else {
        local = [parseInt(entry.split('—')[0]), parseInt(entry.split('—')[1])];
      }
      simplified.push(local);
    });
    return simplified;
  }

  const findNestedKeys = (object, key) => key in object
    ? [[key]]
    : Object.entries(object).flatMap(([k, v]) => {
      if (!v || typeof v !== 'object') return [];
      const nestedKeys = findNestedKeys(v, key);
      return nestedKeys.length
        ? nestedKeys.map(a => [k, ...a])
        : [];
    });

  const alterCorpusCheckbox = (event) => {
    let newCorpusCheckboxStatus = {...corpusCheckboxStatus};
    let trueCount = 0;
    newCorpusCheckboxStatus[event.target.id] = event.target.checked;
    Object.entries(newCorpusCheckboxStatus).forEach((entry) => {
      const [key, value] = entry;
      if (value && key !== 'all') {
        trueCount++;
      }
    });
    newCorpusCheckboxStatus.all = trueCount === 7;
    setCorpusCheckboxStatus(newCorpusCheckboxStatus);

    // reset selected text types
    if (!event.target.checked) {
      setTextTypes(textTypes.filter((type) => findNestedKeys(textTypesOptions[event.target.id], type).length === 0));
    }
  };

  const alterAllCorpusCheckboxes = (event) => {
    let newCorpusCheckboxStatus = {...corpusCheckboxStatus};
    for (let checkbox in newCorpusCheckboxStatus) {
      newCorpusCheckboxStatus[checkbox] = event.target.checked;
    }
    setCorpusCheckboxStatus(newCorpusCheckboxStatus);

    // reset selected text types
    if (!event.target.checked) {
      setTextTypes([]);
    }
  };

  const alterSinglePropertyData = (event, fieldName) => {
    let newSinglePropertyData = {...singlePropertyData};
    newSinglePropertyData[fieldName] = (newSinglePropertyData[fieldName] === event.target.dataset.value || event.target.dataset.value === undefined)
      ? ''
      : event.target.dataset.value;
    setSinglePropertyData(newSinglePropertyData);
  };

  const changeAccordion = () => {
    setExpanded(!expanded);
  };

  const alterTextTypeHierarchyDropdown = (e, hierarchyLevel, corpus) => {
    // hierarchyLevel: true - standalone or hierarchy child, false - hierarchy parent
    let id = e.target.localName === 'span'
      ? e.target.offsetParent.children[1].id
      : e.target.id;
    if (hierarchyLevel) {
      if (textTypes.includes(id)) {
        setTextTypes(textTypes.filter(type => type !== id));
      } else {
        setTextTypes([...textTypes, id]);
      }
    } else {
      let childrenArray = Array.from(Object.keys(textTypesOptions[corpus][id]));
      let filteredTextTypes = textTypes.filter(type => !childrenArray.includes(type));
      if (childrenArray.every(child => textTypes.includes(child))) {
        setTextTypes(filteredTextTypes);
      } else {
        setTextTypes([...filteredTextTypes, ...childrenArray]);
      }
    }
  };

  const alterUsedMaterialsHierarchyDropdown = (e, hierarchyLevel) => {
    // hierarchyLevel: true - standalone or hierarchy child, false - hierarchy parent
    let id = e.target.localName === 'span'
      ? e.target.offsetParent.children[1].id
      : e.target.id;
    if (hierarchyLevel) {
      if (usedMultiMaterials.includes(id)) {
        setUsedMultiMaterials(usedMultiMaterials.filter(material => material !== id));
      } else {
        setUsedMultiMaterials([...usedMultiMaterials, id]);
      }
    } else {
      let childrenArray = Array.from(Object.keys(usedMaterialsOptions[id]));
      let filteredUsedMaterials = usedMultiMaterials.filter(material => !childrenArray.includes(material));
      if (childrenArray.every(child => usedMultiMaterials.includes(child))) {
        setUsedMultiMaterials(filteredUsedMaterials);
      } else {
        setUsedMultiMaterials([...filteredUsedMaterials, ...childrenArray]);
      }
    }
  };

  const checkTextTypeHierarchyCheckboxStatus = (name, corpus) => {
    let checked = true;
    Object.keys(textTypesOptions[corpus][name]).forEach(type => {
      if (!textTypes.includes(type)) {
        checked = false;
      }
    });
    return checked;
  };

  const checkUsedMaterialsHierarchyCheckboxStatus = (name) => {
    let checked = true;
    Object.keys(usedMaterialsOptions[name]).forEach(material => {
      if (!usedMultiMaterials.includes(material)) {
        checked = false;
      }
    });
    return checked;
  };

  const sendTextFromFile = (data) => {
    setTextInputValue(data);
  };

  const handleSubmitOwnTexts = () => {
    queryStore.dispatch({
      type: 'CHANGE_OWN_TEXTS',
      value: textInputValue
    });
    setModalOpen(false);
  };

  const handleChipDelete = (type) => {
    if (type === 'CORPUS_TEXTS') {
      queryStore.dispatch({
        type: 'CHANGE_CORPUS_TEXTS',
        value: null
      });
    } else {
      queryStore.dispatch({
        type: 'CHANGE_OWN_TEXTS',
        value: null
      });
    }
  };

  return (
    <div>
      <Alert severity="info">Otsi tekste EVKK tekstikogust ja analüüsi neid meie tööriistadega või sisesta
        analüüsimiseks oma tekstid.</Alert>
      <br/>
      {alert && <><Alert severity="error">Vali vähemalt üks alamkorpus!</Alert><br/></>}
      <div className="buttonBox">
        <Button variant="contained"
                onClick={() => {
                  setQueryVisible(true);
                  setExpanded(true);
                }}>Vali tekstid</Button>
        <Button variant="contained"
                onClick={() => setModalOpen(true)}
                className="buttonSecondLeft">Oma tekstid</Button>
        <Button variant="contained"
                onClick={() => navigate('adding')}
                className="buttonRight">Loovuta tekst</Button>
      </div>
      {(corpusTextsSelected > 0 || ownTextsSelected) && <>
        <br/>
        Analüüsiks salvestatud tekstid:
        {corpusTextsSelected > 0 &&
          <Chip label={`${corpusTextsSelected} korpuse tekst${corpusTextsSelected > 1 ? 'i' : ''}`}
                className="selected-text-chip" variant="outlined" onDelete={() => handleChipDelete('CORPUS_TEXTS')}/>
        }
        {ownTextsSelected > 0 &&
          <Chip label="oma tekstid" className="selected-text-chip" variant="outlined"
                onDelete={() => handleChipDelete('OWN_TEXTS')}/>
        }
      </>}
      {queryVisible && <span>
        <Accordion sx={AccordionStyle}
                   className="queryAccordion"
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
                  e.preventDefault();
                }}
                id="vorm">
            <div className="queryContainer">
              <div>
                <b>Alamkorpus</b>
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
                <Tooltip
                  title="Sisaldab eksamiväliselt kirjutatud A2-, B1-, B2- ja C1-taseme tekste, mille tase on määratud kolme tunnustatud hindamise spetsialisti ühise arvamuse põhjal"
                  followCursor>
                  <label className="corpustitle">
                    K2 keeleõpe
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
                <Tooltip
                  title="Sisaldab tekste eesti emakeelega õpilastelt, kes õpivad koolis vene keelt kolmanda keelena"
                  followCursor>
                  <label className="corpustitle">
                    K3 vene keel
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cwUSEqQLt"
                  checked={corpusCheckboxStatus.cwUSEqQLt}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip
                  title="Sisaldab emakeelekõneleja ja eesti keelt teise keelena kasutava üliõpilase akadeemilise keelekasutuse näiteid (referaadid, seminaritööd, lõputööd jm)"
                  followCursor>
                  <label className="corpustitle">
                    Akadeemiline eesti keel
                  </label>
                </Tooltip>
                <br/>
              </div>
              <div>
                <b>Teksti andmed</b>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="types-label">Liik</InputLabel>
                  <Select
                    labelId="types-label"
                    label="Liik"
                    multiple
                    value={textTypes}
                    name="types"
                    renderValue={(textType) => `Valitud ${textType.length} ${textType.length === 1 ? 'liik' : 'liiki'}`}
                    disabled={getSelectedCorpusList().length === 0}
                    MenuProps={MenuProps}
                  >
                    {Object.keys(textTypesOptions).map((corpus) => (
                      corpusCheckboxStatus[corpus] && Object.keys(textTypesOptions[corpus]).map((textType) => (
                        typeof textTypesOptions[corpus][textType] === 'string'
                          ? <MenuItem key={textType}
                                      id={textType}
                                      onClick={(e) => alterTextTypeHierarchyDropdown(e, true, null)}
                                      value={textType}>
                            <ListItemIcon>
                              <Checkbox id={textType}
                                        checked={textTypes.indexOf(textType) > -1}/>
                            </ListItemIcon>
                            <ListItemText id={textType}
                                          primary={textTypesOptions[corpus][textType]}/>
                          </MenuItem>
                          : <span key={`${textType}_span`}>
                            <MenuItem key={textType}
                                      id={textType}
                                      onClick={(e) => alterTextTypeHierarchyDropdown(e, false, corpus)}
                                      value={textType}>
                              <ListItemIcon>
                                <Checkbox id={textType}
                                          checked={checkTextTypeHierarchyCheckboxStatus(textType, corpus)}/>
                              </ListItemIcon>
                              <ListItemText id={textType}
                                            primary={textType}/>
                            </MenuItem>
                            {Object.keys(textTypesOptions[corpus][textType]).map((specificTextType) => (
                              <MenuItem key={specificTextType}
                                        id={specificTextType}
                                        onClick={(e) => alterTextTypeHierarchyDropdown(e, true, null)}
                                        value={specificTextType}
                                        sx={{paddingLeft: '2rem'}}>
                                <ListItemIcon>
                                  <Checkbox id={specificTextType}
                                            checked={textTypes.indexOf(specificTextType) > -1}/>
                                </ListItemIcon>
                                <ListItemText id={specificTextType}
                                              primary={textTypesOptions[corpus][textType][specificTextType]}/>
                              </MenuItem>
                            ))}
                          </span>
                      ))
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl size="small">
                  <InputLabel id="language-label">Keel</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="language-label"
                    name="language"
                    value={singlePropertyData.language}
                    label="Keel"
                    onClick={(e) => alterSinglePropertyData(e, 'language')}
                  >
                    <MenuItem value="eesti">eesti</MenuItem>
                    <MenuItem value="inglise">inglise</MenuItem>
                    <MenuItem value="soome">soome</MenuItem>
                    <MenuItem value="vene">vene</MenuItem>
                  </Select>
                </FormControl>
                <br/><br/>
                {checkIfOnlySpecificCorpusIsChecked('cwUSEqQLt')
                  ? <>
                    <FormControl size="small">
                      <InputLabel id="domain-label">Valdkond</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="domain-label"
                        name="domain"
                        value={singlePropertyData.domain}
                        label="Valdkond"
                        onClick={(e) => alterSinglePropertyData(e, 'domain')}
                      >
                        <MenuItem value="biojakeskkonnateadused">Bio- ja keskkonnateadused</MenuItem>
                        <MenuItem value="yhiskondjakultuur">Ühiskonnateadused ja kultuur</MenuItem>
                        <MenuItem value="terviseuuringud">Terviseuuringud</MenuItem>
                        <MenuItem value="loodustehnika">Loodusteadused ja tehnika</MenuItem>
                      </Select>
                    </FormControl>
                    <br/><br/>
                    <FormControl className={classes.formControl}
                                 size="small">
                      <InputLabel id="usedMultiMaterials-label">Kasutatud õppe- või abimaterjale</InputLabel>
                      <Select
                        labelId="usedMultiMaterials-label"
                        label="Kasutatud õppe- või abimaterjale"
                        multiple
                        value={usedMultiMaterials}
                        name="usedMultiMaterials"
                        renderValue={(material) => `Valitud ${material.length} ${material.length === 1 ? 'materjal' : 'materjali'}`}
                        MenuProps={MenuProps}
                      >
                        {Object.keys(usedMaterialsOptions).map((material) => (
                          typeof usedMaterialsOptions[material] === 'string'
                            ? <MenuItem key={material}
                                        id={material}
                                        onClick={(e) => alterUsedMaterialsHierarchyDropdown(e, true)}
                                        value={material}>
                              <ListItemIcon>
                                <Checkbox id={material}
                                          checked={usedMultiMaterials.indexOf(material) > -1}/>
                              </ListItemIcon>
                              <ListItemText id={material}
                                            primary={usedMaterialsOptions[material]}/>
                            </MenuItem>
                            : <span key={`${material}_span`}>
                                <MenuItem key={material}
                                          id={material}
                                          onClick={(e) => alterUsedMaterialsHierarchyDropdown(e, false)}
                                          value={material}>
                                  <ListItemIcon>
                                    <Checkbox id={material}
                                              checked={checkUsedMaterialsHierarchyCheckboxStatus(material)}/>
                                  </ListItemIcon>
                                  <ListItemText id={material}
                                                primary={material}/>
                                </MenuItem>
                              {Object.keys(usedMaterialsOptions[material]).map((subMaterial) => (
                                <MenuItem key={subMaterial}
                                          id={subMaterial}
                                          onClick={(e) => alterUsedMaterialsHierarchyDropdown(e, true)}
                                          value={subMaterial}
                                          sx={{paddingLeft: '2rem'}}>
                                  <ListItemIcon>
                                    <Checkbox id={subMaterial}
                                              checked={usedMultiMaterials.indexOf(subMaterial) > -1}/>
                                  </ListItemIcon>
                                  <ListItemText id={subMaterial}
                                                primary={usedMaterialsOptions[material][subMaterial]}/>
                                </MenuItem>
                              ))}
                              </span>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                  : <>
                    <FormControl size="small">
                      <InputLabel id="level-label">Tase</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="level-label"
                        name="level"
                        value={singlePropertyData.level}
                        label="Tase"
                        onClick={(e) => alterSinglePropertyData(e, 'level')}
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
                        onClick={(e) => alterSinglePropertyData(e, 'usedMaterials')}
                      >
                        <MenuItem value="jah">jah</MenuItem>
                        <MenuItem value="ei">ei</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                }
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="addedYears-label">Lisamise aasta</InputLabel>
                  <Select
                    labelId="addedYears-label"
                    label="Lisamise aasta"
                    multiple
                    value={addedYears}
                    name="addedYears"
                    onChange={(e) => setAddedYears(e.target.value)}
                    renderValue={(addedYear) => addedYear.join(', ')}
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
                    renderValue={(character) => character.join(', ')}
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
                    renderValue={(word) => word.join(', ')}
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
                    renderValue={(sentence) => sentence.join(', ')}
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
                <b>Autori andmed</b>
                <br/><br/>
                <FormControl size="small">
                  <InputLabel id="age-label">Vanus</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="age-label"
                    name="age"
                    value={singlePropertyData.age}
                    label="Vanus"
                    onClick={(e) => alterSinglePropertyData(e, 'age')}
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
                    onClick={(e) => alterSinglePropertyData(e, 'gender')}
                  >
                    <MenuItem value="mees">mees</MenuItem>
                    <MenuItem value="naine">naine</MenuItem>
                  </Select>
                </FormControl>
                <br/><br/>
                {checkIfOnlySpecificCorpusIsChecked('cwUSEqQLt')
                  ? <>
                    <FormControl size="small">
                      <InputLabel id="studyLevel-label">Õppeaste</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="studyLevel-label"
                        name="studyLevel"
                        value={singlePropertyData.studyLevel}
                        label="Õppeaste"
                        onClick={(e) => alterSinglePropertyData(e, 'studyLevel')}
                      >
                        <MenuItem value="bakalaureuseope">Bakalaureuseõpe</MenuItem>
                        <MenuItem value="magistriope">Magistriõpe</MenuItem>
                        <MenuItem value="doktoriope">Doktoriõpe</MenuItem>
                      </Select>
                    </FormControl>
                    <br/><br/>
                    <FormControl size="small">
                      <InputLabel id="degree-label">Teaduskraad</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="degree-label"
                        name="degree"
                        value={singlePropertyData.degree}
                        label="Teaduskraad"
                        onClick={(e) => alterSinglePropertyData(e, 'degree')}
                      >
                        <MenuItem value="ba">Bakalaureusekraad</MenuItem>
                        <MenuItem value="ma">Magistrikraad</MenuItem>
                        <MenuItem value="phd">Doktorikraad</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                  : <FormControl size="small">
                    <InputLabel id="education-label">Haridus</InputLabel>
                    <Select
                      sx={{minWidth: selectWidth}}
                      labelId="education-label"
                      name="education"
                      value={singlePropertyData.education}
                      label="Haridus"
                      onClick={(e) => alterSinglePropertyData(e, 'education')}
                    >
                      <MenuItem value="Alg-/põhiharidus,alg,pohi">algharidus/põhiharidus</MenuItem>
                      <MenuItem value="Keskharidus,kesk">keskharidus</MenuItem>
                      <MenuItem value="Keskeriharidus/kutseharidus,keskeri,kutse">keskeriharidus/kutseharidus</MenuItem>
                      <MenuItem value="Kõrgharidus,korg">kõrgharidus</MenuItem>
                    </Select>
                  </FormControl>}
                <br/><br/>
                {checkIfOnlySpecificCorpusIsChecked('clWmOIrLa')
                  ? <FormControl size="small">
                    <InputLabel id="nationality-label">Kodakondsus</InputLabel>
                    <Select
                      sx={{minWidth: selectWidth}}
                      labelId="nationality-label"
                      name="nationality"
                      value={singlePropertyData.nationality}
                      label="Kodakondsus"
                      onClick={(e) => alterSinglePropertyData(e, 'nationality')}
                    >
                      <MenuItem value="Eesti">Eesti</MenuItem>
                      <MenuItem value="Ameerika Ühendriigid">Ameerika Ühendriigid</MenuItem>
                      <MenuItem value="Brasiilia">Brasiilia</MenuItem>
                      <MenuItem value="Bulgaaria">Bulgaaria</MenuItem>
                      <MenuItem value="Egiptus">Egiptus</MenuItem>
                      <MenuItem value="Filipiinid">Filipiinid</MenuItem>
                      <MenuItem value="Hiina">Hiina</MenuItem>
                      <MenuItem value="Hispaania">Hispaania</MenuItem>
                      <MenuItem value="Holland">Holland</MenuItem>
                      <MenuItem value="Iirimaa">Iirimaa</MenuItem>
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="Kreeka">Kreeka</MenuItem>
                      <MenuItem value="Leedu">Leedu</MenuItem>
                      <MenuItem value="Läti">Läti</MenuItem>
                      <MenuItem value="Makedoonia">Makedoonia</MenuItem>
                      <MenuItem value="Määramata">Määramata</MenuItem>
                      <MenuItem value="Poola">Poola</MenuItem>
                      <MenuItem value="Prantsusmaa">Prantsusmaa</MenuItem>
                      <MenuItem value="Rumeenia">Rumeenia</MenuItem>
                      <MenuItem value="Saksamaa">Saksamaa</MenuItem>
                      <MenuItem value="Soome">Soome</MenuItem>
                      <MenuItem value="Suurbritannia">Suurbritannia</MenuItem>
                      <MenuItem value="Türgi">Türgi</MenuItem>
                      <MenuItem value="Ukraina">Ukraina</MenuItem>
                      <MenuItem value="Valgevene">Valgevene</MenuItem>
                      <MenuItem value="Venemaa">Venemaa</MenuItem>
                      <MenuItem value="Venezuela">Venezuela</MenuItem>
                    </Select>
                  </FormControl>
                  : <FormControl size="small">
                    <InputLabel id="nativeLang-label">Emakeel</InputLabel>
                    <Select
                      sx={{minWidth: selectWidth}}
                      labelId="nativeLang-label"
                      name="nativeLang"
                      value={singlePropertyData.nativeLang}
                      label="Emakeel"
                      onClick={(e) => alterSinglePropertyData(e, 'nativeLang')}
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
                }
                <br/><br/>
                {checkIfOnlySpecificCorpusIsChecked('cwUSEqQLt')
                  ? <>
                    <FormControl size="small">
                      <InputLabel id="otherLang-label">Muu õppe-, töö- või suhtluskeel</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="otherLang-label"
                        name="otherLang"
                        value={singlePropertyData.otherLang}
                        label="Muu õppe-, töö- või suhtluskeel"
                        onClick={(e) => alterSinglePropertyData(e, 'otherLang')}
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
                  </>
                  : <></>}
                <FormControl size="small">
                  <InputLabel id="country-label">Elukohariik</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="country-label"
                    name="country"
                    value={singlePropertyData.country}
                    label="Elukohariik"
                    onClick={(e) => alterSinglePropertyData(e, 'country')}
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
            <Button onClick={submitted}
                    variant="contained">Saada päring</Button>
          </form>
        </AccordionDetails>
      </Accordion>
        {noResultsError && <div><br/><Alert severity="error">Ei leitud ühtegi teksti!</Alert><br/></div>}
        <QueryResults key={resultsKey}
                      data={results}/>
        </span>
      }
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Box sx={modalStyle}>
          <div className="modal-head">
            Sisesta või laadi üles oma tekstid
          </div>
          <IconButton
            aria-label="close"
            onClick={() => {
              setModalOpen(false);
            }}
            className="closeButton"
          >
            <CloseIcon/>
          </IconButton>
          <br/><br/>
          <div>
            <TextUpload sendTextFromFile={sendTextFromFile}/>
            <textarea
              spellCheck="false"
              className="query-textinput"
              value={textInputValue}
              onChange={(e) => setTextInputValue(e.target.value)}
            ></textarea>
            <Button variant="contained"
                    style={{marginTop: '2.5em'}}
                    disabled={textInputValue === ''}
                    onClick={() => handleSubmitOwnTexts()}>
              Salvesta tekstid analüüsiks
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Query;
