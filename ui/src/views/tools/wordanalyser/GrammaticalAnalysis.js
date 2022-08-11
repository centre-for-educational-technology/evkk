import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {useFilters, usePagination, useSortBy, useTable} from 'react-table';
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Tooltip
} from "@mui/material";
import './styles/GrammaticalAnalysis.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {CSVLink} from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';
import ReactExport from "react-export-excel";
import CloseIcon from '@mui/icons-material/Close';
import {v4 as uuidv4} from 'uuid';

function GrammaticalAnalysis({ onTypeSelect, onFormSelect, onWordSelect, onAnalyse }) {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const [fileType, setFileType] = useState(false);
  const [sonaliik, setSonaliik] = useState('');
  const [sonad, setSonad] = useState('');
  const [vormiliik, setVormiliik] = useState('');
  const fileDownloadElement = React.createRef();

  useEffect(() => {
    setSonaliik(onAnalyse.wordtypes);
    setSonad(onAnalyse.words);
    setVormiliik(onAnalyse.wordforms);
  }, [onAnalyse]);

  let sonaList = new Map();
  let sonaList2 = new Map();
  let numbrid = new Map();
  let numbrid2 = new Map();
  let vormiList = new Map();
  let tableVal = [];

  const sonuSonaliigis = () => {
    for (let i = 0; i < sonaliik.length; i++) {
      if (!sonaList.has(sonaliik[i])) {
        sonaList.set(sonaliik[i], []);
        sonaList.get(sonaliik[i]).push(sonad[i]);
        numbrid.set(sonad[i], 1);
      } else if (sonaList.has(sonaliik[i])) {
        if (sonaList.get(sonaliik[i]).includes(sonad[i])) {
          numbrid.set(sonad[i], (numbrid.get(sonad[i]) + 1));
        } else {
          sonaList.get(sonaliik[i]).push(sonad[i]);
          numbrid.set(sonad[i], 1);
        }
      }
    }
  }

  const sonuSonavormis = () => {
    for (let i = 0; i < sonad.length; i++) {
      if (!sonaList2.has(vormiliik[i])) {
        sonaList2.set(vormiliik[i], []);
        sonaList2.get(vormiliik[i]).push(sonad[i]);
        numbrid2.set(sonad[i], 1);
      } else if (sonaList2.has(vormiliik[i])) {
        if (sonaList2.get(vormiliik[i]).includes(sonad[i])) {
          numbrid2.set(sonad[i], (numbrid.get(sonad[i]) + 1));
        } else {
          sonaList2.get(vormiliik[i]).push(sonad[i]);
          numbrid2.set(sonad[i], 1);
        }
      }
    }
  }

  const sonaVormeSonaliigis = () => {
    for (let i = 0; i < vormiliik.length; i++) {
      if (!vormiList.has(sonaliik[i])) {
        vormiList.set(sonaliik[i], []);
        vormiList.get(sonaliik[i]).push(vormiliik[i]);
      } else if (vormiList.has(sonaliik[i])) {
        if (vormiList.get(sonaliik[i]).includes(vormiliik[i])) {
        } else {
          vormiList.get(sonaliik[i]).push(vormiliik[i]);
        }
      }
    }
  }

  sonuSonaliigis();
  sonuSonavormis();
  sonaVormeSonaliigis();

  const mapSort3 = new Map([...numbrid.entries()].sort());
  const mapSort2 = new Map([...mapSort3.entries()].sort((a, b) => b[1] - a[1]));

  function fillData() {
    for (let i = 0; i < vormiList.size; i++) {
      const ajutineList2 = sonaList.get(Array.from(sonaList.keys())[i]);
      const ajutineList3 = vormiList.get(Array.from(vormiList.keys())[i]);
      let valueAjutine;
      for (let k = 0; k < sonaList2.size; k++) {
        const ajutineColvorm = Array.from(sonaList2.keys())[k];
        if (ajutineList3.includes(ajutineColvorm)) {
          let info = {
            col1: "",
            colvorm: "",
            col2: [[], []],
            col3: 0,
            col4: 0
          }
          info.col1 = Array.from(vormiList.keys())[i];
          const iterator1 = mapSort2.keys();
          info.colvorm = Array.from(sonaList2.keys())[k];
          const ajutineList = sonaList2.get(Array.from(sonaList2.keys())[k]);
          for (let j = 0; j < mapSort2.size; j++) {
            valueAjutine = iterator1.next().value;
            if (ajutineList.includes(valueAjutine) && ajutineList2.includes(valueAjutine)) {
              info.col2[0].push(String(valueAjutine));
              info.col2[1].push("(" + String(numbrid.get(valueAjutine)) + "), ");
              info.col3 = parseInt(info.col3) + parseInt(numbrid.get(String(valueAjutine)));
            }
          }
          info.col2[1][info.col2[1].length - 1] = info.col2[1][info.col2[1].length - 1].slice(0, -2);
          info.col4 = (info.col3 * 100 / sonad.length).toFixed(1);
          tableVal.push(info);
        }
      }
    }
    return tableVal;
  }

  const MultipleFilter = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
      if (filterValue.includes(val.original.col1)) arr.push(val);
    });
    return arr;
  };

  const MultipleFilter2 = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
      if (filterValue.includes(val.original.colvorm)) arr.push(val);
    });
    return arr;
  };

  function ShowDownload() {
    if (fileDownloadElement.current.style.display === "none") {
      fileDownloadElement.current.style.display = "block";
    } else if (fileDownloadElement.current.style.display === "block") {
      fileDownloadElement.current.style.display = "none";
    }
  }

  function setFilteredParams(filterArr, val) {
    if (filterArr.includes(val)) {
      filterArr = filterArr.filter((n) => {
        return n !== val;
      });
    } else filterArr.push(val);
    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
  }

  let data = useMemo(() =>
      fillData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sonad, sonaliik]
  );

  function LongMenu({ column: { filterValue = [], setFilter, preFilteredRows, id } }) {
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    }
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];

    }, [id, preFilteredRows,]);

    return (
      <Fragment>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FilterAltIcon />
        </IconButton>
        <FormControl>
          <Select
            multiple
            value={[]}
            open={open}
            style={{ zIndex: "-30", position: "absolute", transform: "translate(-6rem, -.5rem)" }}
            onClose={handleClose}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "right"
              }
            }}
          >
            {options.map((option, i) => (
              <MenuItem
                key={option}
                value={option}
                onClick={(e) => {
                  setFilter(setFilteredParams(filterValue, e.currentTarget.dataset.value));
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    id={option}
                    value={option}
                    checked={filterValue.includes(option)}
                  />
                </ListItemIcon>
                <ListItemText primary={option} id={option} value={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Fragment>
    );
  }

  const [buttonType, setButtonType] = useState(<Button variant='contained' disabled>Laadi alla</Button>);

  function ShowButton() {
    for (let i = 0; i < data.length; i++) {
      let a = "";
      for (let j = 0; j < data[i].col2[0].length; j++) {
        a += data[i].col2[0][j] + " ";
        a += data[i].col2[1][j];
      }
      data[i].col2[2] = a;
    }

    let csvData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
      csvData[i].col2.splice(0, 2);
    }

    if (fileType) {
      setButtonType(<Button className='CSVBtn' variant='contained' color='primary'>
        <CSVLink filename='gram_analyys' className='csvLink' headers={tableHeaders} data={csvData}>Laadi alla</CSVLink>
      </Button>);
      setFileType(false);
    } else if (!fileType) {
      setButtonType(<ExcelFile filename="gram_analyys" element={<Button variant='contained'>Laadi alla</Button>}>
        <ExcelSheet data={data} name="Sõnatabel">
          <ExcelColumn label="Sõnaliik" value="col1"/>
          <ExcelColumn label="Vorm" value="colvorm"/>
          <ExcelColumn label="Sõnad tekstis" value={(col) => col.col2[2]}/>
          <ExcelColumn label="Sagedus" value="col3"/>
          <ExcelColumn label="Osakaal (%)" value="col4"/>
        </ExcelSheet>
      </ExcelFile>);
      setFileType(true);
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: () => { return (<span>Sõnaliik</span>) },
        accessor: 'col1', // accessor is the "key" in the data
        Cell: (props) => {
          const word = props.value;
          return <span key={props.id} className="word" onClick={(e) => onTypeSelect(e.target.textContent)}>{word}</span>
        },
        className: 'user',
        width: 400,
        disableSortBy: true,
        sortable: false,
        Filter: LongMenu,
        filter: MultipleFilter
      },
      {
        Header: () => { return (<span>Vorm</span>) },
        accessor: 'colvorm',
        Cell: (props) => {
          const word = props.value;
          return <span className="word" onClick={(e) => onFormSelect(e.target.textContent)}>{word}</span>
        },
        width: 400,
        className: 'colvorm',
        disableSortBy: true,
        sortable: false,
        Filter: LongMenu,
        filter: MultipleFilter2
      },
      {
        Header: 'Sõnad tekstis',
        accessor: 'col2',
        Cell: (props) => {
          const items = props.value
          let cellContent = []
          for (let i = 0; i < items[0].length; i++) {
            let word = items[0][i];
            let count = items[1][i];
            let content = (
              <span key={uuidv4()}>
                <span key={props.id} className="word"
                      onClick={(e) => onWordSelect(e.target.textContent)}>{word}</span>{String.fromCharCode(160)}{count}
              </span>
            )
            cellContent.push(content);
          }
          return cellContent
        },
        width: 700,
        disableFilters: true,
        disableSortBy: true,
        sortable: false,
      },
      {
        Header: 'Sagedus',
        accessor: 'col3', // accessor is the "key" in the data
        width: 300,
        disableFilters: true,
      },
      {
        Header: 'Osakaal (%)',
        accessor: 'col4',
        width: 300,
        disableFilters: true,
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sonad, sonaliik, onWordSelect]
  );

  const tableHeaders = [
    { label: "Sõnaliik", key: "col1" },
    { label: 'Vorm', key: "colvorm" },
    { label: 'Sõnad tekstis', key: "col2" },
    { label: 'Sagedus', key: "col3" },
    { label: 'Osakaal (%)', key: "col4" },
  ]

  function closeDownload() {
    if (fileDownloadElement.current.style.display === "block") {
      fileDownloadElement.current.style.display = "none";
    }
  }

  const handleClickDownload = e => ShowButton();

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
    state: {pageIndex, pageSize},
  } = useTable({columns, data, initialState: {pageIndex: 0}}, useFilters, useSortBy, usePagination);

  return (
    <Fragment>
      <Tooltip title="Laadi alla" placement="top">
        <div className='downloadPopUp' onClick={ShowDownload} style={{marginBottom: "1.75rem", marginLeft: "4rem"}}>
          <DownloadIcon fontSize="large" />
        </div>
      </Tooltip>
      <div>
        <div id='fileDownload' className='fileDownload' style={{display: "none"}} ref={fileDownloadElement}>
          <div id='closeIcon' className='closeIcon' onClick={closeDownload}><CloseIcon/></div>
          <FormControl id="formId" fullWidth>
            <InputLabel id="demo-simple-select-label">Laadi alla</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="simple-select"
              label="Laadimine"
              onChange={handleClickDownload}
              size="medium"
              className='selectElement'
            >
              <MenuItem value="Excel">Excel</MenuItem>
              <MenuItem value="CSV">CSV</MenuItem>
            </Select>
          </FormControl>
          <div className='laadiBtn'>{buttonType}</div>
        </div>
      </div>
      <table className='analyserTable' {...getTableProps()}
             style={{marginRight: 'auto', marginLeft: 'auto', borderBottom: 'solid 1px', width: '100%'}}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr className='tableRow' {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                className='tableHead'
                {...column.getHeaderProps(column.getSortByToggleProps({title: ""}))}
                style={{
                  borderBottom: 'solid 1px',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                  {<span>{column.render('Header')} {column.canFilter ? column.render("Filter") : null}</span>}
                  <span className='sortIcon'>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ' ▼▲'}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr className='tableRow' {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        width: cell.column.width,
                      }}
                      className="border tableData"
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div className='buttongroup'>
          <ButtonGroup size='medium' fullWidth variant="contained" aria-label="outlined primary button group">
            <Button variant='contained' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {<FirstPageIcon />}
            </Button>{' '}
            <Button variant='contained' onClick={() => previousPage()} disabled={!canPreviousPage}>
              {<NavigateBeforeIcon />}
            </Button>{' '}
            <Button variant='contained' onClick={() => nextPage()} disabled={!canNextPage}>
              {<NavigateNextIcon />}
            </Button>{' '}
            <Button variant='contained' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {<LastPageIcon />}
            </Button>{' '}
          </ButtonGroup>
        </div>
        <span className='fontStyle'>
          Leht{' '}
          <strong>
            {pageIndex + 1} / {pageOptions.length}
          </strong>{' '}
        </span>
        <TextField
          size='small'
          id="outlined-number"
          label="Mine lehele nr:"
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Select
          size='small'
          value={pageSize}
          variant='outlined'
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50, 100].map(pageSize => (
            <MenuItem key={pageSize} value={pageSize}>{pageSize}</MenuItem>
          ))}
        </Select>
      </div>
    </Fragment>
  );
}

export default GrammaticalAnalysis;
