import { useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { queryStore } from '../../store/QueryStore';
import { AccordionStyle } from '../../utils/constants';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
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
  Typography
} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import './WordContext.css';
import { usePagination, useSortBy, useTable } from 'react-table';
import TableDownloadButton from '../../components/table/TableDownloadButton';
import TablePagination from '../../components/table/TablePagination';

export default function WordContext() {

  const navigate = useNavigate();
  const [paramsExpanded, setParamsExpanded] = useState(true);
  const [typeValue, setTypeValue] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [displayCount, setDisplayCount] = useState(5);
  const [displayType, setDisplayType] = useState('WORD');
  const [capitalizationChecked, setCapitalizationChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showNoResultsError, setShowNoResultsError] = useState(false);
  const [showLemmatizedResultWarning, setShowLemmatizedResultWarning] = useState(false);
  const tableToDownload = ['Eelnev kontekst', 'Otsisõna', 'Järgnev kontekst'];
  const accessors = ['contextBefore', 'keyword', 'contextAfter'];

  const columns = useMemo(() => [
    {
      Header: 'Jrk',
      accessor: 'id',
      width: 30,
      disableSortBy: true,
      Cell: (cellProps) => {
        return cellProps.sortedFlatRows.findIndex(item => item.id === cellProps.row.id) + 1;
      },
      className: 'text-center'
    },
    {
      Header: 'Eelnev kontekst',
      accessor: 'contextBefore',
      width: 100,
      Cell: (cellProps) => {
        return cellProps.value;
      },
      className: 'text-right'
    },
    {
      Header: 'Otsisõna',
      accessor: 'keyword',
      width: 30,
      Cell: (cellProps) => {
        return cellProps.value;
      },
      className: 'wordcontext-keyword'
    },
    {
      Header: 'Järgnev kontekst',
      accessor: 'contextAfter',
      width: 100,
      Cell: (cellProps) => {
        return cellProps.value;
      },
      className: 'text-left'
    }
  ], []);

  const data = useMemo(() => response, [response]);

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
    columns, data
  }, useSortBy, usePagination);

  useEffect(() => {
    if (!queryStore.getState()) {
      navigate(-1);
    }
  }, [navigate]);

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
    setTypeError(false);
    if (event.target.value === 'LEMMAS') {
      setCapitalizationChecked(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTypeError(!typeValue);
    if (typeValue) {
      setLoading(true);
      setShowTable(false);
      fetch('/api/tools/wordcontext', {
        method: 'POST',
        body: generateRequestData(),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((result) => {
          setLoading(false);
          setShowLemmatizedResultWarning(false);
          setResponse(result.contextList);
          if (result.contextList.length === 0) {
            setShowTable(false);
            setParamsExpanded(true);
            setShowNoResultsError(true);
          } else {
            setShowTable(true);
            setParamsExpanded(false);
            setShowNoResultsError(false);
            if (result.keywordLemmatized) {
              setShowLemmatizedResultWarning(true);
            }
          }
        });
    }
  };

  const generateRequestData = () => {
    return JSON.stringify({
      corpusTextIds: queryStore.getState().split(','),
      type: typeValue,
      keyword: keyword,
      displayCount: displayCount,
      displayType: displayType,
      keepCapitalization: capitalizationChecked
    });
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
                                    label="tõstutundlik"
                  />
                </FormControl>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      {showLemmatizedResultWarning && <>
        <br/>
        <Alert severity="warning">Algsele otsisõnale vasteid ei leitud. Kuna otsingu tüübiks valiti "algvormi alusel",
          siis toimus automaatne otsisõna algvormistamine ning vasted leiti.</Alert>
      </>}
      {showTable && <>
        <TableDownloadButton data={data}
                             tableType={'WordContext'}
                             headers={tableToDownload}
                             accessors={accessors}
                             marginTop={'2vh'}
                             marginRight={'11.5vw'}/>
        <table className="wordcontext-table"
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
                    <td {...cell.getCellProps({
                      className: cell.column.className
                    })}
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
        <Alert severity="error">Tekstist ei leitud otsisõnale ühtegi vastet! Muuda analüüsi valikuid ning proovi
          uuesti.</Alert>}
    </div>
  );
}
