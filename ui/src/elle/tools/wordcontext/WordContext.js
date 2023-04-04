import { useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { queryStore } from '../../store/QueryStore';
import { AccordionStyle } from '../../utils/constants';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import {
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
import { usePagination, useTable } from 'react-table';
import TableDownloadButton from '../../components/table/TableDownloadButton';
import TablePagination from '../../components/table/TablePagination';

export default function WordContext() {

  // todo remove old sõnarakendus when this is done

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
  const tableToDownload = ['', 'Kontekst', ''];
  const accessors = ['contextBefore', 'keyword', 'contextAfter'];

  const columns = useMemo(() => [
    {
      Header: 'Jrk',
      accessor: 'id',
      width: 30,
      disableSortBy: true,
      Cell: (cellProps) => {
        return cellProps.row.index + 1;
      },
      className: 'text-center'
    },
    {
      Header: '',
      accessor: 'contextBefore',
      width: 100,
      Cell: (cellProps) => {
        return cellProps.value;
      },
      className: 'text-right'
    },
    {
      Header: 'Kontekst',
      accessor: 'keyword',
      width: 30,
      Cell: (cellProps) => {
        return cellProps.value;
      },
      className: 'wordcontext-keyword'
    },
    {
      Header: '',
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
  }, usePagination);

  useEffect(() => {
    if (!queryStore.getState()) {
      navigate(-1);
    }
  }, [navigate]);

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
    setTypeError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTypeError(!typeValue);
    if (typeValue) {
      setParamsExpanded(false);
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
          setResponse(result);
          setShowTable(true);
          setLoading(false);
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
    </div>
  );
}
