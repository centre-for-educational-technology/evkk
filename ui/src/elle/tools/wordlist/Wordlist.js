import { queryStore } from '../../store/QueryStore';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import './Wordlist.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { AccordionStyle } from '../../utils/constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QuestionMark } from '@mui/icons-material';
import WordlistMenu from './menu/WordlistMenu';
import TableDownloadButton from '../../components/table/TableDownloadButton';
import GenericTable from '../../components/GenericTable';
import { toolAnalysisStore } from '../../store/ToolAnalysisStore';

export default function Wordlist() {

  const navigate = useNavigate();
  const [paramsExpanded, setParamsExpanded] = useState(true);
  const [typeValue, setTypeValue] = useState('');
  const [typeValueToDisplay, setTypeValueToDisplay] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [stopwordsChecked, setStopwordsChecked] = useState(false);
  const [customStopwords, setCustomStopwords] = useState('');
  const [capitalizationChecked, setCapitalizationChecked] = useState(false);
  const [minimumFrequency, setMinimumFrequency] = useState('');
  const [tableToDownload, setTableToDownload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const accessors = ['word', 'frequencyCount', 'frequencyPercentage'];
  const data = useMemo(() => response, [response]);

  useEffect(() => {
    const type = typeValueToDisplay === 'WORDS' ? 'Sõnavorm' : 'Algvorm';
    setTableToDownload([type, 'Sagedus', 'Osakaal']);
  }, [typeValueToDisplay]);

  useEffect(() => {
    const queryStoreState = queryStore.getState();
    const wordlistState = toolAnalysisStore.getState().wordlist;
    if (wordlistState !== null && wordlistState.analysis.length > 0) {
      setMinimumFrequency(wordlistState.parameters.minimumFrequency);
      setCapitalizationChecked(wordlistState.parameters.capitalizationChecked);
      setCustomStopwords(wordlistState.parameters.customStopwords);
      setStopwordsChecked(wordlistState.parameters.stopwordsChecked);
      setTypeValueToDisplay(wordlistState.parameters.typeValue);
      setTypeValue(wordlistState.parameters.typeValue);
      setResponse(wordlistState.analysis);

      setParamsExpanded(false);
      setShowTable(true);
    } else if (queryStoreState.corpusTextIds === null && queryStoreState.ownTexts === null) {
      navigate('..');
    }
  }, [navigate]);

  useEffect(() => {
    toolAnalysisStore.dispatch({
      type: 'CHANGE_WORDLIST_RESULT',
      value: {
        parameters: {
          typeValue: typeValue,
          stopwordsChecked: stopwordsChecked,
          customStopwords: customStopwords,
          capitalizationChecked: capitalizationChecked,
          minimumFrequency: minimumFrequency
        },
        analysis: response
      }
    });
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
      width: 20,
      disableSortBy: true,
      Cell: (cellProps) => {
        return cellProps.sortedFlatRows.findIndex(item => item.id === cellProps.row.id) + 1;
      }
    },
    {
      Header: () => {
        return typeValueToDisplay === 'WORDS' ? 'Sõnavorm' : 'Algvorm';
      },
      accessor: 'word',
      width: 140,
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Sagedus',
      accessor: 'frequencyCount',
      width: 20,
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Osakaal',
      accessor: 'frequencyPercentage',
      width: 20,
      Cell: (cellProps) => {
        return `${cellProps.value}%`;
      }
    },
    {
      Header: '',
      accessor: 'menu',
      width: 1,
      disableSortBy: true,
      Cell: (cellProps) => {
        return <WordlistMenu word={cellProps.row.original.word} type={typeValue}
                             keepCapitalization={capitalizationChecked}/>;
      }
    }
  ], [typeValue, typeValueToDisplay, capitalizationChecked]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTypeError(!typeValue);
    if (typeValue) {
      setParamsExpanded(false);
      setLoading(true);
      setShowTable(false);
      fetch('/api/tools/wordlist', {
        method: 'POST',
        body: generateRequestData(),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((result) => {
          setResponse(result);
          setShowTable(true);
          setLoading(false);
          setTypeValueToDisplay(typeValue);
        });
    }
  };

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
    setTypeError(false);
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
      excludeStopwords: stopwordsChecked,
      customStopwords: customStopwords === ''
        ? null
        : listifyCustomStopwords(customStopwords),
      keepCapitalization: capitalizationChecked,
      minFrequency: minimumFrequency === ''
        ? null
        : minimumFrequency
    });
  };

  const listifyCustomStopwords = (stopwords) => {
    return stopwords.replace(/ /g, '').split(',');
  };

  return (
    <div className="tool-wrapper">
      <h2 className="tool-title">Sõnaloend</h2>
      <Accordion sx={AccordionStyle}
                 expanded={paramsExpanded}
                 onChange={() => setParamsExpanded(!paramsExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="wordlist-filters-header"
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
                                      label="sõnavormid"/>
                    <FormControlLabel value="LEMMAS"
                                      control={<Radio/>}
                                      label="algvormid"/>
                  </RadioGroup>
                  {typeError && <FormHelperText>Väli on kohustuslik!</FormHelperText>}
                  <Button sx={{width: 130}}
                          className="wordlist-analyse-button"
                          type="submit"
                          variant="contained">
                    Analüüsi
                  </Button>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{m: 3}}
                             variant="standard">
                  <FormLabel id="stopwords">Välista stoppsõnad</FormLabel>
                  <FormControlLabel control={
                    <Checkbox
                      checked={stopwordsChecked}
                      onChange={(e) => setStopwordsChecked(e.target.checked)}
                    ></Checkbox>
                  }
                                    label={<>
                                      vaikimisi loendist
                                      <Tooltip title={<>Eesti keele stoppsõnade loendi on koostanud Kristel Uiboaed. See
                                        sisaldab sidesõnu, asesõnu, sisutühje tegusõnu ja määrsõnu. Nimekiri on
                                        kättesaadav Tartu Ülikooli andmerepositooriumis (vaata <a
                                          href={'https://datadoi.ee/handle/33/78'}
                                          target="_blank"
                                          rel="noopener noreferrer">siit</a>).</>}
                                               placement="right">
                                        <QuestionMark className="stopwords-tooltip-icon"/>
                                      </Tooltip></>}
                  />
                  <TextField label="Kirjuta siia oma stoppsõnad (nt koer, kodu)"
                             variant="outlined"
                             size="small"
                             value={customStopwords}
                             onChange={(e) => setCustomStopwords(e.target.value)}
                             style={{width: '350px'}}/>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{m: 7}}
                             variant="standard">
                  <FormControlLabel control={
                    <Checkbox
                      checked={capitalizationChecked}
                      onChange={(e) => setCapitalizationChecked(e.target.checked)}
                    ></Checkbox>
                  }
                                    label={<>
                                      säilita suurtähed
                                      <Tooltip
                                        title='Sõnad muudetakse vaikimisi väiketäheliseks, näiteks "kool" ja "Kool" loetakse samaks sõnaks. Märgi kasti linnuke, kui soovid, et suur- ja väiketähelisi sõnu arvestataks eraldi (nt "Eesti" ja "eesti").'
                                        placement="right">
                                        <QuestionMark className="stopwords-tooltip-icon"/>
                                      </Tooltip></>}
                  />
                  <TextField label={<>
                    Määra sõna minimaalne sagedus
                    <Tooltip
                      title="Kui soovid näiteks välistada sõnad, mida esineb tekstis vaid üks kord, siis määra sageduse alampiiriks 2. Mahukamaid tekstikogusid analüüsides jäetakse sageli kõrvale alla 5 korra esinevad sõnad."
                      placement="right">
                      <QuestionMark className="stopwords-tooltip-icon"/>
                    </Tooltip></>}
                             type="number"
                             inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: '1'}}
                             InputLabelProps={{style: {pointerEvents: 'auto'}}}
                             variant="outlined"
                             size="small"
                             value={minimumFrequency}
                             onChange={(e) => setMinimumFrequency(e.target.value)}
                             style={{width: '310px'}}/>
                </FormControl>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      {showTable && <>
        <TableDownloadButton data={data}
                             tableType={'Wordlist'}
                             headers={tableToDownload}
                             accessors={accessors}
                             marginTop={'2vh'}
                             marginRight={'20.25vw'}/>
        <GenericTable tableClassname={'wordlist-table'} columns={columns} data={data}
                      sortByColAccessor={'frequencyCount'}/>
      </>}
      <Backdrop
        open={loading}
      >
        <CircularProgress thickness={4}
                          size="8rem"/>
      </Backdrop>
    </div>
  );
}
