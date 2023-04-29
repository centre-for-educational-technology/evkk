import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { queryStore } from '../../store/QueryStore';
import { AccordionStyle } from '../../utils/constants';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import './WordContext.css';
import TableDownloadButton from '../../components/table/TableDownloadButton';
import { QuestionMark } from '@mui/icons-material';
import GenericTable from '../../components/GenericTable';
import { toolAnalysisStore } from '../../store/ToolAnalysisStore';

export default function WordContext() {

  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const [paramsExpanded, setParamsExpanded] = useState(true);
  const [typeValue, setTypeValue] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [displayCount, setDisplayCount] = useState(5);
  const [displayType, setDisplayType] = useState('WORD');
  const [capitalizationChecked, setCapitalizationChecked] = useState(false);
  const [response, setResponse] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showNoResultsError, setShowNoResultsError] = useState(false);
  const [lemmatizedKeywordResult, setLemmatizedKeywordResult] = useState(null);
  const [initialKeywordResult, setInitialKeywordResult] = useState(null);
  const tableToDownload = ['Eelnev kontekst', 'Otsisõna', 'Järgnev kontekst'];
  const accessors = ['contextBefore', 'keyword', 'contextAfter'];
  const data = useMemo(() => response, [response]);

  useEffect(() => {
    if (urlParams.get('word') && urlParams.get('type') && urlParams.get('keepCapitalization')) {
      setKeyword(urlParams.get('word'));
      setTypeValue(urlParams.get('type'));
      if (urlParams.get('type') !== 'LEMMAS') {
        setCapitalizationChecked(urlParams.get('keepCapitalization') === 'true');
      }
      sendRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams, keyword, typeValue, capitalizationChecked]);

  useEffect(() => {
    const queryStoreState = queryStore.getState();
    const wordContextState = toolAnalysisStore.getState().wordContext;
    if (wordContextState !== null && wordContextState.analysis.length > 0) {
      const params = wordContextState.parameters;
      setTypeValue(params.typeValue);
      setKeyword(params.keyword);
      setDisplayCount(params.displayCount);
      setDisplayType(params.displayType);
      setCapitalizationChecked(params.capitalizationChecked);
      setResponse(wordContextState.analysis);
      setParamsExpanded(false);
      setShowTable(true);
    } else if (queryStoreState.corpusTextIds === null && queryStoreState.ownTexts === null) {
      navigate('..');
    }
  }, [navigate]);

  useEffect(() => {
    toolAnalysisStore.dispatch({
      type: 'CHANGE_WORDCONTEXT_RESULT',
      value: {
        parameters: {
          typeValue: typeValue,
          keyword: keyword,
          displayCount: displayCount,
          displayType: displayType,
          capitalizationChecked: capitalizationChecked
        },
        analysis: response
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  queryStore.subscribe(() => {
    const storeState = queryStore.getState();
    setResponse([]);
    setParamsExpanded(true);
    setShowTable(false);
    if (storeState.corpusTextIds === null && storeState.ownTexts === null) {
      navigate('..');
    }
  });

  const columns = useMemo(() => [
    {
      Header: 'Jrk',
      accessor: 'id',
      disableSortBy: true,
      Cell: (cellProps) => {
        return cellProps.sortedFlatRows.findIndex(item => item.id === cellProps.row.id) + 1;
      },
      className: 'text-center'
    },
    {
      Header: 'Eelnev kontekst',
      accessor: 'contextBefore',
      Cell: (cellProps) => {
        return cellProps.value;
      },
      className: 'text-right'
    },
    {
      Header: 'Otsisõna',
      accessor: 'keyword',
      Cell: (cellProps) => {
        return cellProps.value;
      },
      className: 'wordcontext-keyword'
    },
    {
      Header: 'Järgnev kontekst',
      accessor: 'contextAfter',
      Cell: (cellProps) => {
        return cellProps.value;
      },
      className: 'text-left'
    }
  ], []);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest();
  };

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
    setTypeError(false);
    if (event.target.value === 'LEMMAS') {
      setCapitalizationChecked(false);
    }
  };

  const sendRequest = () => {
    setTypeError(!typeValue);
    if (typeValue) {
      setShowTable(false);
      fetch('/api/tools/wordcontext', {
        method: 'POST',
        body: generateRequestData(),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(result => {
          removeUrlParams();
          setLemmatizedKeywordResult(null);
          setResponse(result.contextList);
          if (result.contextList.length === 0) {
            setShowTable(false);
            setParamsExpanded(true);
            setShowNoResultsError(true);
          } else {
            setShowTable(true);
            setParamsExpanded(false);
            setShowNoResultsError(false);
            if (result.lemmatizedKeyword) {
              setLemmatizedKeywordResult(result.lemmatizedKeyword);
              setInitialKeywordResult(result.initialKeyword);
            }
          }
        });
    }
  };

  const generateRequestData = () => {
    const storeState = queryStore.getState();
    return JSON.stringify({
      corpusTextIds: storeState.corpusTextIds
        ? storeState.corpusTextIds
        : null,
      ownTexts: storeState.ownTexts
        ? storeState.ownTexts
        : null,
      type: typeValue,
      keyword: keyword,
      displayCount: displayCount,
      displayType: displayType,
      keepCapitalization: capitalizationChecked
    });
  };

  const removeUrlParams = () => {
    navigate('', {replace: true});
  };

  return (
    <div className="tool-wrapper">
      <h2 className="tool-title">Sõna kontekstis</h2>
      <Accordion sx={AccordionStyle}
                 expanded={paramsExpanded}
                 onChange={() => setParamsExpanded(!paramsExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="wordcontext-filters-header"
        >
          <Typography>
            Analüüsi valikud
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <div className="wordcontext-param-container">
              <div>
                <FormControl sx={{m: 3}}
                             error={typeError}
                             variant="standard">
                  <FormLabel id="type-radios">Otsi</FormLabel>
                  <RadioGroup
                    aria-labelledby="type-radios"
                    name="type"
                    value={typeValue}
                    onChange={handleTypeChange}
                  >
                    <FormControlLabel value="WORDS"
                                      control={<Radio/>}
                                      label="sõnavormi alusel"/>
                    <FormControlLabel value="LEMMAS"
                                      control={<Radio/>}
                                      label="algvormi alusel"/>
                  </RadioGroup>
                  {typeError && <FormHelperText>Väli on kohustuslik!</FormHelperText>}
                  <Button sx={{width: 130}}
                          style={{marginTop: '10vh !important'}}
                          className="wordcontext-analyse-button"
                          type="submit"
                          variant="contained">
                    Analüüsi
                  </Button>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{m: 3}}
                             variant="standard">
                  <FormLabel id="keyword">Sisesta otsisõna</FormLabel>
                  <TextField variant="outlined"
                             size="small"
                             required
                             value={keyword}
                             onChange={(e) => setKeyword(e.target.value)}
                             style={{width: '250px'}}/>
                </FormControl>
                <br/>
                <FormControl sx={{m: 3}}
                             style={{marginTop: '-1vh'}}
                             variant="standard">
                  <FormLabel id="display">Kuva</FormLabel>
                  <Grid container>
                    <Grid item>
                      <TextField variant="outlined"
                                 type="number"
                                 inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: '1', max: '15'}}
                                 size="small"
                                 required
                                 value={displayCount}
                                 onChange={(e) => setDisplayCount(e.target.value)}
                                 className="wordcontext-display-count-textfield"/>
                    </Grid>
                    <Grid item>
                      <FormControl size="small">
                        <Select
                          sx={{width: '95px'}}
                          name="displayType"
                          value={displayType}
                          onChange={(e) => setDisplayType(e.target.value)}
                        >
                          <MenuItem value="WORD">sõna</MenuItem>
                          <MenuItem value="SENTENCE">lauset</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      className="wordcontext-display-explanation"
                    >
                      enne ja pärast valitud sõna
                    </Grid>
                  </Grid>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{m: 6}}
                             variant="standard">
                  <FormControlLabel control={
                    <Checkbox
                      checked={capitalizationChecked}
                      disabled={typeValue === 'LEMMAS'}
                      onChange={(e) => setCapitalizationChecked(e.target.checked)}
                    ></Checkbox>
                  }
                                    label={<>
                                      tõstutundlik
                                      <Tooltip
                                        title='Vaikimisi ei arvestata otsisõna suurt või väikest algustähte, nt "eesti" võimaldab leida nii "eesti" kui ka "Eesti" kasutuskontekstid. Märgi kasti linnuke, kui soovid ainult väike- või suurtähega algavaid vasteid.'
                                        placement="right">
                                        <QuestionMark className="stopwords-tooltip-icon"/>
                                      </Tooltip></>}
                  />
                </FormControl>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      {lemmatizedKeywordResult && <>
        <br/>
        <Alert severity="warning">Otsisõna "{initialKeywordResult}" vasteid ei leitud. Kasutasime automaatset algvormi
          tuvastust ja
          otsisime sõna "{lemmatizedKeywordResult}" vormide kasutusnäiteid.</Alert>
      </>}
      {showTable && <>
        <TableDownloadButton data={data}
                             tableType={'WordContext'}
                             headers={tableToDownload}
                             accessors={accessors}
                             marginTop={'2vh'}/>
        <GenericTable tableClassname={'wordcontext-table'} columns={columns} data={data}/>
      </>}
      {showNoResultsError &&
        <Alert severity="error">Tekstist ei leitud otsisõna. Muuda analüüsi valikuid ja proovi uuesti!</Alert>}
    </div>
  );
}
