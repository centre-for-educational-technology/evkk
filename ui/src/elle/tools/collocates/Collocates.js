import './Collocates.css';
import React, { useEffect, useMemo, useState } from 'react';
import { AccordionStyle } from '../../utils/constants';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { QuestionMark } from '@mui/icons-material';
import TableDownloadButton from '../../components/table/TableDownloadButton';
import { queryStore } from '../../store/QueryStore';
import { useNavigate } from 'react-router-dom';
import WordlistMenu from '../wordlist/menu/WordlistMenu';
import GenericTable from '../../components/GenericTable';
import { toolAnalysisStore } from '../../store/ToolAnalysisStore';

export default function Collocates() {

  const navigate = useNavigate();
  const [paramsExpanded, setParamsExpanded] = useState(true);
  const [typeValue, setTypeValue] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [capitalizationChecked, setCapitalizationChecked] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchCount, setSearchCount] = useState(3);
  const [formula, setFormula] = useState('LOGDICE');
  const [lemmatizedKeywordResult, setLemmatizedKeywordResult] = useState(null);
  const [initialKeywordResult, setInitialKeywordResult] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const tableToDownload = ['Naabersõna', 'Skoor', 'Kooskasutuste arv', 'Sagedus tekstis', 'Osakaal tekstis'];
  const accessors = ['collocate', 'score', 'coOccurrences', 'frequencyCount', 'frequencyPercentage'];
  const [response, setResponse] = useState([]);
  const data = useMemo(() => response, [response]);
  const [showNoResultsError, setShowNoResultsError] = useState(false);

  useEffect(() => {
    const queryStoreState = queryStore.getState();
    const collocateState = toolAnalysisStore.getState().collocates;
    if (collocateState !== null && collocateState.analysis.length > 0) {
      const params = collocateState.parameters;
      setTypeValue(params.typeValue);
      setKeyword(params.keyword);
      setSearchCount(params.searchCount);
      setFormula(params.formula);
      setCapitalizationChecked(params.capitalizationChecked);
      setResponse(collocateState.analysis);
      setParamsExpanded(false);
      setShowTable(true);
    } else if (queryStoreState.corpusTextIds === null && queryStoreState.ownTexts === null) {
      navigate('..');
    }
  }, [navigate]);

  useEffect(() => {
    toolAnalysisStore.dispatch({
      type: 'CHANGE_COLLOCATES_RESULT',
      value: {
        parameters: {
          typeValue: typeValue,
          keyword: keyword,
          searchCount: searchCount,
          formula: formula,
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
      }
    },
    {
      Header: 'Naabersõna',
      accessor: 'collocate',
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Skoor',
      accessor: 'score',
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Kooskasutuste arv',
      accessor: 'coOccurrences',
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Sagedus tekstis',
      accessor: 'frequencyCount',
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Osakaal tekstis',
      accessor: 'frequencyPercentage',
      Cell: (cellProps) => {
        return `${cellProps.value}%`;
      }
    },
    {
      Header: '',
      accessor: 'menu',
      disableSortBy: true,
      Cell: (cellProps) => {
        return <WordlistMenu word={cellProps.row.original.collocate} type={typeValue}
                             keepCapitalization={capitalizationChecked}/>;
      }
    }
  ], [typeValue, capitalizationChecked]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTypeError(!typeValue);
    if (typeValue) {
      setShowTable(false);
      fetch('/api/tools/collocates', {
        method: 'POST',
        body: generateRequestData(),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(result => {
          setLemmatizedKeywordResult(null);
          setResponse(result.collocateList);
          if (result.collocateList.length === 0) {
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

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
    setTypeError(false);
    if (event.target.value === 'LEMMAS') {
      setCapitalizationChecked(false);
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
      searchCount: searchCount,
      formula: formula,
      keepCapitalization: capitalizationChecked
    });
  };

  return (
    <div className="tool-wrapper">
      <h2 className="tool-title">Naabersõnad</h2>
      <Accordion sx={AccordionStyle}
                 expanded={paramsExpanded}
                 onChange={() => setParamsExpanded(!paramsExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="collocates-filters-header"
        >
          <Typography>
            Analüüsi valikud
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <div className="queryContainer">
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
                          className="collocates-analyse-button"
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
                  <FormLabel id="display">Otsi naabersõnu</FormLabel>
                  <Grid container>
                    <Grid item>
                      <TextField variant="outlined"
                                 type="number"
                                 inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: '1', max: '5'}}
                                 size="small"
                                 required
                                 value={searchCount}
                                 onChange={(e) => setSearchCount(e.target.value)}
                                 className="collocates-search-count-textfield"/>
                    </Grid>
                    <Grid
                      item
                      className="collocates-search-count-explanation"
                    >
                      eelneva ja järgneva sõna piires
                    </Grid>
                  </Grid>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{m: 3}} size="small">
                  <FormLabel id="formula">Vali valem</FormLabel>
                  <Select
                    sx={{width: '140px'}}
                    name="formula"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                  >
                    <MenuItem value="LOGDICE">logDice</MenuItem>
                    <MenuItem value="T_SCORE">T-skoor</MenuItem>
                    <MenuItem value="MI_SCORE">MI-skoor</MenuItem>
                  </Select>
                </FormControl>
                <br/>
                <FormControl sx={{m: 3}}
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
                                        title='Vaikimisi ei arvestata otsisõna suurt või väikest algustähte, nt "eesti" võimaldab leida nii "eesti" kui ka "Eesti" naabersõnad. Märgi kasti linnuke, kui soovid ainult väike- või suurtähega algavaid vasteid.'
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
          otsisime sõna "{lemmatizedKeywordResult}" naabersõnu.</Alert>
      </>}
      {showTable && <>
        <TableDownloadButton data={data}
                             tableType={'Collocates'}
                             headers={tableToDownload}
                             accessors={accessors}
                             marginTop={'2vh'}
                             marginRight={'19.25vw'}/>
        <GenericTable tableClassname={'wordlist-table'} columns={columns} data={data} sortByColAccessor={'score'}/>
      </>}
      {showNoResultsError &&
        <Alert severity="error">Tekstist ei leitud otsisõna. Muuda analüüsi valikuid ja proovi uuesti!</Alert>}
    </div>
  );
}
