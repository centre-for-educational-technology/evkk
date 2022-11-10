import React, {Fragment, useContext, useEffect, useMemo, useState} from 'react';
import {useFilters, usePagination, useSortBy, useTable} from 'react-table';
import {Box, Checkbox, FormControl, IconButton, ListItemText, MenuItem, Select} from "@mui/material";
import DownloadButton from "./DownloadButton";
import './styles/GrammaticalAnalysis.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {v4 as uuidv4} from 'uuid';
import TablePagination from "./TablePagination";
import {useTranslation} from "react-i18next";
import "../../translations/i18n";
import {AnalyseContext, SetFormContext, SetTypeContext, SetWordContext} from "./Contexts";
import ToggleCell from "./ToggleCell";

function GrammaticalAnalysis() {
  const [sonaliik, setSonaliik] = useState('');
  const [sonad, setSonad] = useState('');
  const [vormiliik, setVormiliik] = useState('');
  const {t} = useTranslation();
  const setType = useContext(SetTypeContext);
  const setForm = useContext(SetFormContext);
  const setWord = useContext(SetWordContext);
  const [analyse, setAnalyse] = useContext(AnalyseContext);

  useEffect(() => {
    setSonaliik(analyse.wordtypes);
    setSonad(analyse.words);
    setVormiliik(analyse.wordforms);
  }, [analyse]);

  let sonaList = new Map();
  let sonaList2 = new Map();
  let numbrid = new Map();
  let vormiList = new Map();
  let tableVal = [];
  const tableToDownload = [t("common_wordtype"), t("common_form"), t("common_words_in_text"), t("common_header_frequency"), t("common_header_percentage")];

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
      } else if (sonaList2.has(vormiliik[i])) {
        if (!(sonaList2.get(vormiliik[i]).includes(sonad[i]))) {
          sonaList2.get(vormiliik[i]).push(sonad[i]);
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
        if (!(vormiList.get(sonaliik[i]).includes(vormiliik[i]))) {
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
            col2: "",
            col3: [[], []],
            col4: 0,
            col5: 0,
          }
          info.col1 = Array.from(vormiList.keys())[i];
          const iterator1 = mapSort2.keys();
          info.col2 = Array.from(sonaList2.keys())[k];
          const ajutineList = sonaList2.get(Array.from(sonaList2.keys())[k]);
          for (let j = 0; j < mapSort2.size; j++) {
            valueAjutine = iterator1.next().value;
            if (ajutineList.includes(valueAjutine) && ajutineList2.includes(valueAjutine)) {
              info.col3[0].push(String(valueAjutine));
              info.col3[1].push("(" + String(numbrid.get(valueAjutine)) + "), ");
              info.col4 = parseInt(info.col4) + parseInt(numbrid.get(String(valueAjutine)));
            }
          }
          info.col3[1][info.col3[1].length - 1] = info.col3[1][info.col3[1].length - 1].slice(0, -2);
          info.col5 = (info.col4 * 100 / sonad.length).toFixed(1);
          tableVal.push(info);
        }
      }
    }
    return tableVal;
  }

  const MultipleFilter = (rows, _filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
      if (filterValue.includes(val.original.col1)) arr.push(val);
    });
    return arr;
  };

  const MultipleFilter2 = (rows, _filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
      if (filterValue.includes(val.original.col2)) arr.push(val);
    });
    return arr;
  };

  const setFilteredParams = (filterArr, val) => {
    if (filterArr.includes(val)) {
      filterArr = filterArr.filter((n) => {
        return n !== val;
      });
    } else {
      filterArr.push(val);
      filterArr = filterArr.slice();
    }
    if (filterArr.length === 0) filterArr = [];
    return filterArr;
  }

  let data = useMemo(() =>
      fillData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sonad, sonaliik]
  );

  function LongMenu({column: {filterValue = [], setFilter, preFilteredRows, id}}) {
    const [newFilterValue, setNewFilterValue] = useState(filterValue);
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      if (newFilterValue.length < 1) {
        setFilter(options);
      } else {
        setFilter(newFilterValue);
      }
      setAnchorEl(null);
    }
    const options = useMemo(() => {
      const options2 = new Set();
      preFilteredRows.forEach((row) => {
        options2.add(row.values[id]);
      });
      return [...options2.values()];

    }, [id, preFilteredRows, newFilterValue]);

    if (newFilterValue.length > 0 && newFilterValue.length === options.length || options.length < newFilterValue.length) {
      setNewFilterValue([]);
    }

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
          <FilterAltIcon/>
        </IconButton>
        <FormControl>
          <Select
            multiple
            value={[]}
            open={open}
            style={{zIndex: "-30", position: "absolute", transform: "translate(-3.7rem, -.5rem)"}}
            onClose={handleClose}
            renderValue={() => ""}
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
            {options.map((option, _i) => (
              <MenuItem
                key={option}
                value={option}
                onClick={(e) => {
                  setNewFilterValue(setFilteredParams(newFilterValue, e.currentTarget.dataset.value))
                }}
              >
                <Checkbox
                  id={option}
                  value={option}
                  checked={newFilterValue.includes(option)}
                />
                <ListItemText primary={option}
                              id={option}
                              value={option}/>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Fragment>
    );
  }

  function handleTypeClick(e) {
    setType(e);
  }

  function handleFormClick(e) {
    setForm(e);
  }

  const columns = useMemo(
    () => [
      {
        Header: () => {
          return (<span>{t("common_wordtype")}</span>)
        },
        accessor: 'col1', // accessor is the "key" in the data
        Cell: (props) => {
          const word = props.value;
          return <span key={props.id}
                       className="word"
                       onClick={(e) => handleTypeClick(e.target.textContent)}>{word}</span>
        },
        className: 'user',
        width: 400,
        Filter: LongMenu,
        filter: MultipleFilter,
      },
      {
        Header: () => {
          return (<span>{t("common_form")}</span>)
        },
        accessor: 'col2',
        Cell: (props) => {
          const word = props.value;
          return <span className="word"
                       onClick={(e) => handleFormClick(e.target.textContent)}>{word}</span>
        },
        width: 400,
        className: 'col2',
        disableSortBy: true,
        sortable: false,
        Filter: LongMenu,
        filter: MultipleFilter2,
      },
      {
        Header: t("common_words_in_text"),
        accessor: 'col3',
        Cell: (props) => {
          const items = props.value
          let cellContent = []
          for (let i = 0; i < items[0].length; i++) {
            let word = items[0][i];
            let count = items[1][i];
            let content = (
              <span key={uuidv4()}>
                <span key={props.id}
                      className="word"
                      onClick={(e) => setWord(e.target.textContent)}>{word}
                </span>
                {String.fromCharCode(160)}{count}
              </span>
            )
            cellContent.push(content);
          }
          return <ToggleCell onCellContent={cellContent}/>
        },
        width: 700,
        disableFilters: true,
        disableSortBy: true,
        sortable: false,
      },
      {
        Header: t("common_header_frequency"),
        id: 'sagedus',
        accessor: 'col4', // accessor is the "key" in the data
        width: 300,
        disableFilters: true,
      },
      {
        Header: t("common_header_percentage"),
        accessor: 'col5',
        width: 300,
        disableFilters: true,
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sonad, sonaliik]
  );

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
  } = useTable({
    columns, data, initialState: {
      sortBy: [
        {
          id: "sagedus",
          desc: true
        }
      ]
    }
  }, useFilters, useSortBy, usePagination);


  return (
    <Fragment>
      <Box>
        <DownloadButton data={data}
                        headers={tableToDownload}/>
        <table className='analyserTable' {...getTableProps()}
               style={{marginRight: 'auto', marginLeft: 'auto', borderBottom: 'solid 1px', width: '100%'}}>
          <thead>
          {headerGroups.map(headerGroup => (
            <tr className='tableRow' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  className='tableHead'
                  key={uuidv4()}
                  style={{
                    borderBottom: 'solid 1px',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {<span>{column.render('Header')} {column.canFilter ? column.render("Filter") : null}</span>}
                  <span className='sortIcon'  {...column.getHeaderProps(column.getSortByToggleProps({title: ""}))}>
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
          {page.map((row, _i) => {
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
      </Box>
    </Fragment>
  );
}

export default GrammaticalAnalysis;
