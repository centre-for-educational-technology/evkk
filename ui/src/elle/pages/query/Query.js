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
  ageOptions,
  charactersOptions,
  countryOptions,
  degreeOptions,
  domainOptions,
  educationOptions,
  genderOptions,
  languageOptions,
  MenuProps,
  modalStyle,
  nationalityOptions,
  sentencesOptions,
  studyLevelOptions,
  textLanguageOptions,
  textLevelOptions,
  textTypesOptions,
  usedMaterialsMultiOptions,
  usedMaterialsOptions,
  useStyles,
  wordsOptions
} from '../../const/Constants';
import QueryResults from './QueryResults';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import TextUpload from '../../components/TextUpload';
import CloseIcon from '@mui/icons-material/Close';
import { queryStore } from '../../store/QueryStore';
import { loadFetch } from '../../service/LoadFetch';
import { useTranslation } from 'react-i18next';

export default function Query() {

  const {t} = useTranslation();
  const selectWidth = 300;
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
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

  useEffect(() => {
    if (urlParams.get('openQuery')) {
      setQueryVisible(true);
      navigate('', {replace: true});
    }
  }, [urlParams, navigate]);

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
        params.addedYears = replaceDashes(addedYears);
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
  };

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

  function replaceDashes(data) {
    return data.map(function (item) {
      let parsed;
      if (item.includes('...')) {
        const splitValue = item.split('...')[0];
        parsed = splitValue + '-' + (parseInt(splitValue) + 4);
      } else {
        parsed = item.replace('—', '-');
      }
      return parsed;
    });
  }

  function simplifyDropdowns(data) {
    let results = [];
    data.forEach((e) => {
      const entry = t(e);
      let parsed;
      if (entry.includes(t('query_text_data_up_to'))) {
        parsed = [1, parseInt(entry.split(`${t('query_text_data_up_to')} `)[1])];
      } else if (entry.includes(t('query_text_data_over'))) {
        parsed = [parseInt(entry.split(`${t('query_text_data_over')} `)[1]), 2147483647]; //java int max value
      } else {
        parsed = [parseInt(entry.split('—')[0]), parseInt(entry.split('—')[1])];
      }
      results.push(parsed);
    });
    return results;
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
      let childrenArray = Array.from(Object.keys(usedMaterialsMultiOptions[id]));
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
    Object.keys(usedMaterialsMultiOptions[name]).forEach(material => {
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
      <Alert severity="info">{t('tools_infobox')}</Alert>
      <br/>
      {alert && <><Alert severity="error">{t('error_query_no_subcorpus_picked')}</Alert><br/></>}
      <div className="buttonBox">
        <Button variant="contained"
                onClick={() => {
                  setQueryVisible(true);
                  setExpanded(true);
                }}>{t('query_choose_texts')}</Button>
        <Button variant="contained"
                onClick={() => setModalOpen(true)}
                className="buttonSecondLeft">{t('query_own_texts')}</Button>
        <Button variant="contained"
                onClick={() => navigate('adding')}
                className="buttonRight">{t('common_publish_your_text')}</Button>
      </div>
      {(corpusTextsSelected > 0 || ownTextsSelected) && <>
        <br/>
        {t('query_results_saved_for_analysis')}
        {corpusTextsSelected > 0 &&
          <Chip
            label={corpusTextsSelected > 1 ? t('query_results_saved_for_analysis_corpus_plural', {amount: corpusTextsSelected}) : t('query_results_saved_for_analysis_corpus')}
            className="selected-text-chip" variant="outlined" onDelete={() => handleChipDelete('CORPUS_TEXTS')}/>
        }
        {ownTextsSelected > 0 &&
          <Chip label={t('query_results_saved_for_analysis_own_texts')}
                className="selected-text-chip"
                variant="outlined"
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
            {t('query_filters')}
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
                <b>{t('query_subcorpus')}</b>
                <br/><br/>
                <Checkbox
                  checked={corpusCheckboxStatus.all}
                  onChange={alterAllCorpusCheckboxes}
                />
                <label>{t('query_subcorpus_all')}</label>
                <br/>
                <Checkbox
                  id="clWmOIrLa"
                  checked={corpusCheckboxStatus.clWmOIrLa}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title={t('query_subcorpus_L2_proficiency_examinations_hover')}
                         followCursor>
                  <label className="corpustitle">
                    {t('query_subcorpus_L2_proficiency_examinations')}
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cFqPphvYi"
                  checked={corpusCheckboxStatus.cFqPphvYi}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title={t('query_subcoprus_L2_olympiade_hover')}
                         followCursor>
                  <label className="corpustitle">
                    {t('query_subcoprus_L2_olympiade')}
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cFOoRQekA"
                  checked={corpusCheckboxStatus.cFOoRQekA}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip
                  title={t('query_subcorpus_L2_estonian_hover')}
                  followCursor>
                  <label className="corpustitle">
                    {t('query_subcorpus_L2_estonian')}
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cYDRkpymb"
                  checked={corpusCheckboxStatus.cYDRkpymb}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title={t('query_subcorpus_L1_estonian_hover')}
                         followCursor>
                  <label className="corpustitle">
                    {t('query_subcorpus_L1_estonian')}
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cgSRJPKTr"
                  checked={corpusCheckboxStatus.cgSRJPKTr}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip title={t('query_subcorpus_L1_russian_hover')}
                         followCursor>
                  <label className="corpustitle">
                    {t('query_subcorpus_L1_russian')}
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cZjHWUPtD"
                  checked={corpusCheckboxStatus.cZjHWUPtD}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip
                  title={t('query_subcorpus_L3_russian_hover')}
                  followCursor>
                  <label className="corpustitle">
                    {t('query_subcorpus_L3_russian')}
                  </label>
                </Tooltip>
                <br/>
                <Checkbox
                  id="cwUSEqQLt"
                  checked={corpusCheckboxStatus.cwUSEqQLt}
                  onChange={alterCorpusCheckbox}
                />
                <Tooltip
                  title={t('query_subcorpus_academic_estonian_hover')}
                  followCursor>
                  <label className="corpustitle">
                    {t('query_subcorpus_academic_estonian')}
                  </label>
                </Tooltip>
                <br/>
              </div>
              <div>
                <b>{t('common_text_data')}</b>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="types-label">{t('query_text_data_type')}</InputLabel>
                  <Select
                    labelId="types-label"
                    label={t('query_text_data_type')}
                    multiple
                    value={textTypes}
                    name="types"
                    renderValue={(textType) => textType.length > 1 ? t('query_text_data_type_selected_plural', {amount: textType.length}) : t('query_text_data_type_selected')}
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
                                          primary={t(textTypesOptions[corpus][textType])}/>
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
                                            primary={t(textType)}/>
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
                                              primary={t(textTypesOptions[corpus][textType][specificTextType])}/>
                              </MenuItem>
                            ))}
                          </span>
                      ))
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl size="small">
                  <InputLabel id="language-label">{t('query_text_data_language')}</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="language-label"
                    name="language"
                    value={singlePropertyData.language}
                    label={t('query_text_data_language')}
                    onClick={(e) => alterSinglePropertyData(e, 'language')}
                  >
                    {Object.keys(textLanguageOptions).map((lang) => (
                      <MenuItem key={lang} value={lang}>{t(textLanguageOptions[lang])}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                {checkIfOnlySpecificCorpusIsChecked('cwUSEqQLt')
                  ? <>
                    <FormControl size="small">
                      <InputLabel id="domain-label">{t('common_text_data_field_of_research')}</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="domain-label"
                        name="domain"
                        value={singlePropertyData.domain}
                        label={t('common_text_data_field_of_research')}
                        onClick={(e) => alterSinglePropertyData(e, 'domain')}
                      >
                        {Object.keys(domainOptions).map((domain) => (
                          <MenuItem key={domain} value={domain}>{t(domainOptions[domain])}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <br/><br/>
                    <FormControl className={classes.formControl}
                                 size="small">
                      <InputLabel
                        id="usedMultiMaterials-label">{t('query_text_data_used_study_or_supporting_materials')}</InputLabel>
                      <Select
                        labelId="usedMultiMaterials-label"
                        label={t('query_text_data_used_study_or_supporting_materials')}
                        multiple
                        value={usedMultiMaterials}
                        name="usedMultiMaterials"
                        renderValue={(material) => material.length > 1 ? t('query_text_data_material_selected_plural', {amount: material.length}) : t('query_text_data_material_selected')}
                        MenuProps={MenuProps}
                      >
                        {Object.keys(usedMaterialsMultiOptions).map((material) => (
                          typeof usedMaterialsMultiOptions[material] === 'string'
                            ? <MenuItem key={material}
                                        id={material}
                                        onClick={(e) => alterUsedMaterialsHierarchyDropdown(e, true)}
                                        value={material}>
                              <ListItemIcon>
                                <Checkbox id={material}
                                          checked={usedMultiMaterials.indexOf(material) > -1}/>
                              </ListItemIcon>
                              <ListItemText id={material}
                                            primary={t(usedMaterialsMultiOptions[material])}/>
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
                                                primary={t(material)}/>
                                </MenuItem>
                              {Object.keys(usedMaterialsMultiOptions[material]).map((subMaterial) => (
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
                                                primary={t(usedMaterialsMultiOptions[material][subMaterial])}/>
                                </MenuItem>
                              ))}
                              </span>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                  : <>
                    <FormControl size="small">
                      <InputLabel id="level-label">{t('query_text_data_level')}</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="level-label"
                        name="level"
                        value={singlePropertyData.level}
                        label={t('query_text_data_level')}
                        onClick={(e) => alterSinglePropertyData(e, 'level')}
                      >
                        {textLevelOptions.map((level) => (
                          <MenuItem key={level} value={level}>{level}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <br/><br/>
                    <FormControl size="small">
                      <InputLabel id="usedMaterials-label">{t('query_text_data_used_supporting_materials')}</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="usedMaterials-label"
                        name="usedMaterials"
                        value={singlePropertyData.usedMaterials}
                        label={t('query_text_data_used_supporting_materials')}
                        onClick={(e) => alterSinglePropertyData(e, 'usedMaterials')}
                      >
                        {Object.keys(usedMaterialsOptions).map((material) => (
                          <MenuItem key={material} value={material}>{t(usedMaterialsOptions[material])}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                }
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="addedYears-label">{t('query_text_data_year_of_publication')}</InputLabel>
                  <Select
                    labelId="addedYears-label"
                    label={t('query_text_data_year_of_publication')}
                    multiple
                    value={addedYears}
                    name="addedYears"
                    onChange={(e) => setAddedYears(e.target.value)}
                    renderValue={(addedYear) => addedYear.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {addedYearOptions.map((year) => (
                      <MenuItem key={year}
                                value={t(year)}>
                        <ListItemIcon>
                          <Checkbox checked={addedYears.indexOf(t(year)) > -1}/>
                        </ListItemIcon>
                        <ListItemText primary={year}/>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="characters-label">{t('query_text_data_characters')}</InputLabel>
                  <Select
                    labelId="characters-label"
                    label={t('query_text_data_characters')}
                    multiple
                    value={characters}
                    name="characters"
                    onChange={(e) => setCharacters(e.target.value)}
                    renderValue={(character) => character.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {charactersOptions.map((item) => (
                      <MenuItem key={item}
                                value={t(item)}>
                        <ListItemIcon>
                          <Checkbox checked={characters.indexOf(t(item)) > -1}/>
                        </ListItemIcon>
                        <ListItemText primary={t(item)}/>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="words-label">{t('common_words')}</InputLabel>
                  <Select
                    labelId="words-label"
                    label={t('common_words')}
                    multiple
                    value={words}
                    name="words"
                    onChange={(e) => setWords(e.target.value)}
                    renderValue={(word) => word.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {wordsOptions.map((item) => (
                      <MenuItem key={item}
                                value={t(item)}>
                        <ListItemIcon>
                          <Checkbox checked={words.indexOf(t(item)) > -1}/>
                        </ListItemIcon>
                        <ListItemText primary={t(item)}/>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl className={classes.formControl}
                             size="small">
                  <InputLabel id="sentences-label">{t('common_sentences')}</InputLabel>
                  <Select
                    labelId="sentences-label"
                    label={t('common_sentences')}
                    multiple
                    value={sentences}
                    name="sentences"
                    onChange={(e) => setSentences(e.target.value)}
                    renderValue={(sentence) => sentence.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {sentencesOptions.map((item) => (
                      <MenuItem key={item}
                                value={t(item)}>
                        <ListItemIcon>
                          <Checkbox checked={sentences.indexOf(t(item)) > -1}/>
                        </ListItemIcon>
                        <ListItemText primary={t(item)}/>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <b>{t('common_author_data')}</b>
                <br/><br/>
                <FormControl size="small">
                  <InputLabel id="age-label">{t('query_author_data_age')}</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="age-label"
                    name="age"
                    value={singlePropertyData.age}
                    label={t('query_author_data_age')}
                    onClick={(e) => alterSinglePropertyData(e, 'age')}
                  >
                    {Object.keys(ageOptions).map((age) => (
                      <MenuItem key={age} value={age}>{t(ageOptions[age])}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                <FormControl size="small">
                  <InputLabel id="gender-label">{t('query_author_data_gender')}</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="gender-label"
                    name="gender"
                    value={singlePropertyData.gender}
                    label={t('query_author_data_gender')}
                    onClick={(e) => alterSinglePropertyData(e, 'gender')}
                  >
                    {Object.keys(genderOptions).map((gender) => (
                      <MenuItem key={gender} value={gender}>{t(genderOptions[gender])}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br/><br/>
                {checkIfOnlySpecificCorpusIsChecked('cwUSEqQLt')
                  ? <>
                    <FormControl size="small">
                      <InputLabel id="studyLevel-label">{t('query_author_data_level_of_study')}</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="studyLevel-label"
                        name="studyLevel"
                        value={singlePropertyData.studyLevel}
                        label={t('query_author_data_level_of_study')}
                        onClick={(e) => alterSinglePropertyData(e, 'studyLevel')}
                      >
                        {Object.keys(studyLevelOptions).map((level) => (
                          <MenuItem key={level} value={level}>{t(studyLevelOptions[level])}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <br/><br/>
                    <FormControl size="small">
                      <InputLabel id="degree-label">{t('query_author_data_degree')}</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="degree-label"
                        name="degree"
                        value={singlePropertyData.degree}
                        label={t('query_author_data_degree')}
                        onClick={(e) => alterSinglePropertyData(e, 'degree')}
                      >
                        {Object.keys(degreeOptions).map((degree) => (
                          <MenuItem key={degree} value={degree}>{t(degreeOptions[degree])}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                  : <FormControl size="small">
                    <InputLabel id="education-label">{t('query_author_data_education')}</InputLabel>
                    <Select
                      sx={{minWidth: selectWidth}}
                      labelId="education-label"
                      name="education"
                      value={singlePropertyData.education}
                      label={t('query_author_data_education')}
                      onClick={(e) => alterSinglePropertyData(e, 'education')}
                    >
                      {Object.keys(educationOptions).map((education) => (
                        <MenuItem key={education} value={education}>{t(educationOptions[education])}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>}
                <br/><br/>
                {checkIfOnlySpecificCorpusIsChecked('clWmOIrLa')
                  ? <FormControl size="small">
                    <InputLabel id="nationality-label">{t('query_author_data_nationality')}</InputLabel>
                    <Select
                      sx={{minWidth: selectWidth}}
                      labelId="nationality-label"
                      name="nationality"
                      value={singlePropertyData.nationality}
                      label={t('query_author_data_nationality')}
                      onClick={(e) => alterSinglePropertyData(e, 'nationality')}
                    >
                      {Object.keys(nationalityOptions).map((nationality) => (
                        <MenuItem key={nationality} value={nationality}>{t(nationalityOptions[nationality])}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  : <FormControl size="small">
                    <InputLabel id="nativeLang-label">{t('query_author_data_native_language')}</InputLabel>
                    <Select
                      sx={{minWidth: selectWidth}}
                      labelId="nativeLang-label"
                      name="nativeLang"
                      value={singlePropertyData.nativeLang}
                      label={t('query_author_data_native_language')}
                      onClick={(e) => alterSinglePropertyData(e, 'nativeLang')}
                    >
                      {Object.keys(languageOptions).map((lang) => (
                        <MenuItem key={lang} value={lang}>{t(languageOptions[lang])}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                }
                <br/><br/>
                {checkIfOnlySpecificCorpusIsChecked('cwUSEqQLt')
                  ? <>
                    <FormControl size="small">
                      <InputLabel id="otherLang-label">{t('query_author_data_other_languages')}</InputLabel>
                      <Select
                        sx={{minWidth: selectWidth}}
                        labelId="otherLang-label"
                        name="otherLang"
                        value={singlePropertyData.otherLang}
                        label={t('query_author_data_other_languages')}
                        onClick={(e) => alterSinglePropertyData(e, 'otherLang')}
                      >
                        {Object.keys(languageOptions).map((lang) => (
                          <MenuItem key={lang} value={lang}>{t(languageOptions[lang])}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <br/><br/>
                  </>
                  : <></>}
                <FormControl size="small">
                  <InputLabel id="country-label">{t('query_author_data_country')}</InputLabel>
                  <Select
                    sx={{minWidth: selectWidth}}
                    labelId="country-label"
                    name="country"
                    value={singlePropertyData.country}
                    label={t('query_author_data_country')}
                    onClick={(e) => alterSinglePropertyData(e, 'country')}
                  >
                    {Object.keys(countryOptions).map((country) => (
                      <MenuItem key={country} value={country}>{t(countryOptions[country])}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <br/><br/>
            <Button onClick={submitted}
                    variant="contained">{t('send_request_button')}</Button>
          </form>
        </AccordionDetails>
      </Accordion>
        {noResultsError && <div><br/><Alert severity="error">{t('query_results_no_texts_found')}</Alert><br/></div>}
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
        <Box sx={modalStyle} className="query-own-texts-modal">
          <div className="modal-head">
            {t('textupload_primary_modal_title')}
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
              {t('textupload_primary_modal_save')}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
