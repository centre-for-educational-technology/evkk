import { queryStore } from '../../store/QueryStore';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import './Wordlist.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
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
import { AccordionStyle } from '../../const/Constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QuestionMark } from '@mui/icons-material';
import WordlistMenu from './menu/WordlistMenu';
import TableDownloadButton from '../../components/table/TableDownloadButton';
import GenericTable from '../../components/GenericTable';
import { toolAnalysisStore } from '../../store/ToolAnalysisStore';
import { loadFetch } from '../../service/LoadFetch';
import { useTranslation } from 'react-i18next';

export default function Wordlist() {

  const {t} = useTranslation();
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
  const [response, setResponse] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const accessors = ['word', 'frequencyCount', 'frequencyPercentage'];
  const data = useMemo(() => response, [response]);

  useEffect(() => {
    const type = typeValueToDisplay === 'WORDS' ? t('wordlist_word_column') : t('wordlist_lemma_column');
    setTableToDownload([type, t('common_header_frequency'), t('common_header_percentage')]);
  }, [typeValueToDisplay, t]);

  useEffect(() => {
    const wordlistState = toolAnalysisStore.getState().wordlist;
    if (wordlistState !== null && wordlistState.analysis.length > 0) {
      const params = wordlistState.parameters;
      setTypeValue(params.typeValue);
      setTypeValueToDisplay(params.typeValue);
      setStopwordsChecked(params.stopwordsChecked);
      setCustomStopwords(params.customStopwords);
      setCapitalizationChecked(params.capitalizationChecked);
      setMinimumFrequency(params.minimumFrequency);
      setResponse(wordlistState.analysis);
      setParamsExpanded(false);
      setShowTable(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  queryStore.subscribe(() => {
    toolAnalysisStore.dispatch({
      type: 'CHANGE_WORDLIST_RESULT',
      value: null
    });
    setResponse([]);
    setParamsExpanded(true);
    setShowTable(false);
  });

  const columns = useMemo(() => [
    {
      Header: t('common_header_number'),
      accessor: 'id',
      disableSortBy: true,
      Cell: (cellProps) => {
        return cellProps.sortedFlatRows.findIndex(item => item.id === cellProps.row.id) + 1;
      }
    },
    {
      Header: () => {
        return typeValueToDisplay === 'WORDS' ? t('wordlist_word_column') : t('wordlist_lemma_column');
      },
      accessor: 'word',
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: t('common_header_frequency'),
      accessor: 'frequencyCount',
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: t('common_header_percentage'),
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
        return <WordlistMenu word={cellProps.row.original.word} type={typeValue}
                             keepCapitalization={capitalizationChecked} showCollocatesButton={true}/>;
      }
    }
  ], [typeValue, typeValueToDisplay, capitalizationChecked, t]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTypeError(!typeValue);
    if (typeValue) {
      setShowTable(false);
      loadFetch('/api/tools/wordlist', {
        method: 'POST',
        body: generateRequestData(),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(result => {
          setResponse(result);
          setShowTable(true);
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
      <h2 className="tool-title">{t('common_wordlist')}</h2>
      <Accordion sx={AccordionStyle}
                 expanded={paramsExpanded}
                 onChange={() => setParamsExpanded(!paramsExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="wordlist-filters-header"
        >
          <Typography>
            {t('common_analysis_options')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <div className="queryContainer">
              <div>
                <FormControl sx={{m: 3}}
                             error={typeError}
                             variant="standard">
                  <FormLabel id="type-radios">{t('common_search')}</FormLabel>
                  <RadioGroup
                    aria-labelledby="type-radios"
                    name="type"
                    value={typeValue}
                    onChange={handleTypeChange}
                  >
                    <FormControlLabel value="WORDS"
                                      control={<Radio/>}
                                      label={t('wordlist_search_word_forms')}/>
                    <FormControlLabel value="LEMMAS"
                                      control={<Radio/>}
                                      label={t('wordlist_search_base_forms')}/>
                  </RadioGroup>
                  {typeError && <FormHelperText>{t('error_mandatory_field')}</FormHelperText>}
                  <Button sx={{width: 130}}
                          className="wordlist-analyse-button"
                          type="submit"
                          variant="contained">
                    {t('analyse_button')}
                  </Button>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{m: 3}}
                             variant="standard">
                  <FormLabel id="stopwords">{t('wordlist_exclude_stopwords')}</FormLabel>
                  <FormControlLabel control={
                    <Checkbox
                      checked={stopwordsChecked}
                      onChange={(e) => setStopwordsChecked(e.target.checked)}
                    ></Checkbox>
                  }
                                    label={<>
                                      {t('wordlist_stopwords_from_the_default_list')}
                                      <Tooltip title={<>{t('wordlist_stopwords_textbox_hover_1')}
                                        <a
                                          href={'https://datadoi.ee/handle/33/78'}
                                          target="_blank"
                                          rel="noopener noreferrer">
                                          {t('wordlist_stopwords_textbox_hover_2')}
                                        </a>
                                        {t('wordlist_stopwords_textbox_hover_3')}</>}
                                               placement="right">
                                        <QuestionMark className="tooltip-icon"/>
                                      </Tooltip></>}
                  />
                  <TextField label={t('wordlist_stopwords_textbox')}
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
                                      {t('wordlist_retain_uppercase_letters')}
                                      <Tooltip
                                        title={t('wordlist_retain_uppercase_letters_hover')}
                                        placement="right">
                                        <QuestionMark className="tooltip-icon"/>
                                      </Tooltip></>}
                  />
                  <TextField label={<>
                    {t('wordlist_set_minimum_word_frequency')}
                    <Tooltip
                      title={t('wordlist_set_minimum_word_frequency_hover')}
                      placement="right">
                      <QuestionMark className="tooltip-icon"/>
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
                             marginTop={'2vh'}/>
        <GenericTable tableClassname={'wordlist-table'} columns={columns} data={data}
                      sortByColAccessor={'frequencyCount'}/>
      </>}
    </div>
  );
}
