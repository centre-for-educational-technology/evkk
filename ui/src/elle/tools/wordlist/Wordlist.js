import {queryStore} from "../../store/QueryStore";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import "./Wordlist.css";
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
} from "@mui/material";
import {AccordionStyle} from "../../utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {QuestionMark} from "@mui/icons-material";
import {usePagination, useSortBy, useTable} from "react-table";
import TablePagination from "../wordanalyser/TablePagination";
import WordlistMenu from "./menu/WordlistMenu";
import TableDownloadButton from "../wordanalyser/TableDownloadButton";

export default function Wordlist() {

  const navigate = useNavigate();
  const [paramsExpanded, setParamsExpanded] = useState(true);
  const [typeValue, setTypeValue] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [stopwordsChecked, setStopwordsChecked] = useState(false);
  const [customStopwords, setCustomStopwords] = useState('');
  const [capitalizationChecked, setCapitalizationChecked] = useState(false);
  const [minimumFrequency, setMinimumFrequency] = useState('');
  const [tableToDownload, setTableToDownload] = useState([]);
  const accessors = ["word", "freq_count", "freq_percentage"];

  const columns = useMemo(() => [
    {
      Header: 'Jrk',
      accessor: 'id',
      width: 40,
      disableSortBy: true,
      Cell: (cellProps) => {
        return cellProps.sortedRows.findIndex(item => item.original.word === cellProps.row.original.word) + 1;
      }
    },
    {
      Header: () => {
        return typeValue === 'sonad' ? 'Sõnavorm' : 'Algvorm';
      },
      accessor: 'word',
      width: 200,
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Kasutuste arv',
      accessor: 'freq_count',
      width: 40,
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: 'Osakaal',
      accessor: 'freq_percentage',
      width: 40,
      Cell: (cellProps) => {
        return cellProps.value;
      }
    },
    {
      Header: '',
      accessor: 'menu',
      width: 1,
      disableSortBy: true,
      Cell: (cellProps) => {
        return <WordlistMenu cellProps={cellProps}/>;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [typeValue]);

  // todo replace with real data when done testing!
  const data = useMemo(() => [{word: 'asd', freq_count: 3, freq_percentage: '55%'}, {
    word: 'tore',
    freq_count: 1,
    freq_percentage: '21.2%'
  }, {word: 'arvuti', freq_count: 2, freq_percentage: '0.55%'}], []);

  useEffect(() => {
    const type = typeValue === 'sonad' ? 'Sõnavorm' : 'Algvorm';
    setTableToDownload([type, 'Kasutuste arv', 'Osakaal']);
  }, [typeValue]);

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
          id: "freq_count",
          desc: true
        }
      ]
    }
  }, useSortBy, usePagination);

  useEffect(() => {
    if (!queryStore.getState()) {
      navigate(-1);
    }
  }, [navigate]);

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
    setTypeError(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTypeError(!typeValue);
    if (typeValue) {
      setParamsExpanded(false);
    }
  }

  return (
    <div className="wordlist-wrapper">
      <h2 className="tool-title">Sõnaloend</h2>
      <Accordion sx={AccordionStyle}
                 expanded={paramsExpanded}
                 onChange={() => setParamsExpanded(!paramsExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="wordlist-filters-header"
        >
          <Typography>
            Analüüsi parameetrid
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
                    <FormControlLabel value="sonad"
                                      control={<Radio/>}
                                      label="sõnavormid"/>
                    <FormControlLabel value="lemmad"
                                      control={<Radio/>}
                                      label="algvormid"/>
                  </RadioGroup>
                  {typeError && <FormHelperText>Väli on kohustuslik!</FormHelperText>}
                  <Button sx={{mt: 1, mr: 1}}
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
                                      <Tooltip title={<>Stoppsõnadena kasutatakse Kristel Uiboaedi loodud listi. See
                                        sisaldab sidesõnu, asesõnu, grammatilise tähendusega tegusõnu, sisutühjasid
                                        määrsõnu jms. Täielik nimekiri on kättesaadav Tartu Ülikooli
                                        andmerepositooriumis klikkides <a href={"https://datadoi.ee/handle/33/78"}
                                                                          target="_blank"
                                                                          rel="noopener noreferrer">siia</a>.</>}
                                               placement="right">
                                        <QuestionMark className="stopwords-tooltip-icon"/>
                                      </Tooltip></>}
                  />
                  <TextField label="Kirjuta siia oma stoppsõnad (nt koer, kodu)"
                             variant="outlined"
                             size="small"
                             value={customStopwords}
                             onChange={(e) => setCustomStopwords(e.target.value)}
                             style={{width: "350px"}}/>
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
                                    label="säilita suurtähed"
                  />
                  <TextField label="Määra minimaalne sõna esinemise sagedus"
                             type="number"
                             inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: '1'}}
                             variant="outlined"
                             size="small"
                             value={minimumFrequency}
                             onChange={(e) => setMinimumFrequency(e.target.value)}
                             style={{width: "350px"}}/>
                </FormControl>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      <TableDownloadButton data={data}
                           tableType={'Wordlist'}
                           headers={tableToDownload}
                           accessors={accessors}
                           marginRight={'18vw'}/>
      <table className='wordlist-table'
             {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
                {column.canSort &&
                  <span className='sortIcon'
                        {...column.getHeaderProps(column.getSortByToggleProps({title: ""}))}>
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
                )
              })}
            </tr>
          )
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
    </div>
  );
}
