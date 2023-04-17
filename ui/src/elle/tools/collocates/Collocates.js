import './Collocates.css';
import React, { useEffect, useMemo, useState } from 'react';
import { AccordionStyle } from '../../utils/constants';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Alert,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
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
import { usePagination, useSortBy, useTable } from 'react-table';
import { queryStore } from '../../store/QueryStore';
import { useNavigate } from 'react-router-dom';
import WordlistMenu from '../wordlist/menu/WordlistMenu';
import TablePagination from '../../components/table/TablePagination';

export default function Collocates() {

  const navigate = useNavigate();
  const [paramsExpanded, setParamsExpanded] = useState(true);
  const [typeValue, setTypeValue] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [capitalizationChecked, setCapitalizationChecked] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchCount, setSearchCount] = useState(3);
  const [formula, setFormula] = useState('');
  const [lemmatizedKeywordResult, setLemmatizedKeywordResult] = useState(null);
  const [initialKeywordResult, setInitialKeywordResult] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const tableToDownload = ['Naabersõna', 'Skoor', 'Kasutuste arv', 'Osakaal'];
  const accessors = ['collocate', 'score', 'frequencyCount', 'frequencyPercentage'];
  const [response, setResponse] = useState([]);
  const data = useMemo(() => response, [response]);
  const [loading, setLoading] = useState(false);
  const [showNoResultsError, setShowNoResultsError] = useState(false);

  useEffect(() => {
    if (!queryStore.getState()) {
      navigate('..');
    }
  }, [navigate]);

  const columns = useMemo(() => [
    {
      Header: 'Jrk',
      accessor: 'id',
      width: 40,
      disableSortBy: true,
      Cell: (cellProps) => {
        return cellProps.sortedFlatRows.findIndex(item => item.id === cellProps.row.id) + 1;
      }
    },
    {
      Header: 'Naabersõna',
      accessor: 'collocate',
      width: 200,
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Skoor',
      accessor: 'score',
      width: 40,
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Kasutuste arv',
      accessor: 'frequencyCount',
      width: 40,
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Osakaal',
      accessor: 'frequencyPercentage',
      width: 40,
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
        return <WordlistMenu word={cellProps.row.original.collocate} type={typeValue}
                             keepCapitalization={capitalizationChecked}/>;
      }
    }
  ], [keyword, typeValue, capitalizationChecked]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize}
  } = useTable({
    columns, data, initialState: {
      sortBy: [
        {
          id: 'score',
          desc: true
        }
      ]
    }
  }, useSortBy, usePagination);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTypeError(!typeValue);
    if (typeValue) {
      setLoading(true);
      setShowTable(false);
      fetch('/api/tools/collocates', {
        method: 'POST',
        body: generateRequestData(),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((result) => {
          setLoading(false);
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
    return JSON.stringify({
      corpusTextIds: queryStore.getState().split(','),
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
                                 inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: '3', max: '5'}}
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
                    <MenuItem value="todo">todo</MenuItem>
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
                             marginRight={'17.25vw'}/>
        <table className="wordlist-table"
               {...getTableProps()}>
          <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {column.canSort &&
                    <span className="sortIcon"
                          {...column.getHeaderProps(column.getSortByToggleProps({title: ''}))}>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' ▼'
                            : ' ▲'
                          : ' ▼▲'}
                    </span>
                  }
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {page.map((row, _i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}
                        style={{
                          width: cell.column.width
                        }}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          </tbody>
        </table>
        <br/>
        <TablePagination
          gotoPage={gotoPage}
          previousPage={previousPage}
          canPreviousPage={canPreviousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageCount={pageCount}
        />
      </>}
      <Backdrop
        open={loading}
      >
        <CircularProgress thickness={4}
                          size="8rem"/>
      </Backdrop>
      {showNoResultsError &&
        <Alert severity="error">Tekstist ei leitud otsisõna. Muuda analüüsi valikuid ja proovi uuesti!</Alert>}
    </div>
  );
}
