import { useContext, useMemo, useState } from 'react';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { Box, Checkbox, FormControl, IconButton, ListItemText, MenuItem, Select } from '@mui/material';
import TableDownloadButton from './TableDownloadButton';
import './styles/GrammaticalAnalysis.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { v4 as uuidv4 } from 'uuid';
import TablePagination from './TablePagination';
import { useTranslation } from 'react-i18next';
import '../../translations/i18n';
import { AnalyseContext, SetFormContext, SetTypeContext, SetWordContext } from './Contexts';
import ToggleCell from './ToggleCell';

function GrammaticalAnalysis() {
  const {t} = useTranslation();
  const setType = useContext(SetTypeContext);
  const setForm = useContext(SetFormContext);
  const setWord = useContext(SetWordContext);
  const analysedInput = useContext(AnalyseContext)[0];

  let wordArray = [];
  const types = analysedInput.wordtypes;
  const forms = analysedInput.wordforms;
  const words = analysedInput.words;
  const ids = analysedInput.ids;

  const analyseInput = () => {
    for (let i = 0; i < words.length; i++) {
      let typeIndex = wordArray.findIndex(
        element => element.type === types[i] && element.form === forms[i]
      );
      //kui ei ole sama sõnaliigi ja -tüübiga objekti
      if (typeIndex === -1) {
        let content = {
          type: types[i],
          form: forms[i],
          words: [{
            word: words[i],
            ids: [ids[i]]
          }],
          count: 1
        };
        wordArray.push(content);
      } else {
        let wordIndex = wordArray[typeIndex].words.findIndex(element => element.word === words[i]);
        if (wordIndex === -1) {
          let newWord = {
            word: words[i],
            ids: [ids[i]]
          };
          wordArray[typeIndex].words.push(newWord);
          wordArray[typeIndex].count += 1;
        } else {
          wordArray[typeIndex].count += 1;
          wordArray[typeIndex].words[wordIndex].ids.push(ids[i]);
        }
      }
    }
    //liigi ja tüübi sortimine
    wordArray.sort((a, b) => (a.count === b.count) ? ((a.type > b.type) ? -1 : 1) : ((a.count > b.count) ? -1 : 1));
    //sõnade sortimine
    for (const element of wordArray) {
      element.words.sort((a, b) => (a.ids.length === b.ids.length) ? ((a.word < b.word) ? -1 : 1) : ((a.ids.length > b.ids.length) ? -1 : 1));
    }
  };

  analyseInput();

  const tableToDownload = [t('common_wordtype'), t('common_form'), t('common_words_in_text'), t('common_header_frequency'), t('common_header_percentage')];

  function fillData() {
    let tableVal = [];

    for (const element of wordArray) {
      let info = {
        col1: '',
        col2: '',
        col3: [[], [], [], []],
        col4: 0,
        col5: 0
      };
      info.col1 = element.type;
      info.col2 = element.form;
      for (let value of element.words) {
        info.col3[0].push(value.word);
        info.col3[1].push('(' + value.ids.length + '), ');
        info.col3[3].push(value.ids[0]);
      }
      info.col3[1][info.col3[1].length - 1] = info.col3[1][info.col3[1].length - 1].slice(0, -2);
      info.col4 = element.count;
      info.col5 = (element.count * 100 / words.length).toFixed(1);

      tableVal.push(info);
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
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let data = useMemo(() => fillData(), []);

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
    };
    const options = useMemo(() => {
      const options2 = new Set();
      preFilteredRows.forEach((row) => {
        options2.add(row.values[id]);
      });
      return [...options2.values()];

    }, [id, preFilteredRows]);

    if ((newFilterValue.length > 0 && newFilterValue.length === options.length) || (options.length < newFilterValue.length)) {
      setNewFilterValue([]);
    }

    return (
      <>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
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
            style={{zIndex: '-30', position: 'absolute', transform: 'translate(-3.7rem, -.5rem)'}}
            onClose={handleClose}
            renderValue={() => ''}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }
            }}
          >
            {options.map((option, _i) => (
              <MenuItem
                key={option}
                value={option}
                onClick={(e) => {
                  setNewFilterValue(setFilteredParams(newFilterValue, e.currentTarget.dataset.value));
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
      </>
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
          return (<span>{t('common_wordtype')}</span>);
        },
        accessor: 'col1', // accessor is the "key" in the data
        Cell: (props) => {
          const word = props.value;
          return <span key={props.id}
                       className="word"
                       onClick={() => handleTypeClick(word)}>{word}</span>;
        },
        className: 'user',
        width: 400,
        Filter: LongMenu,
        filter: MultipleFilter
      },
      {
        Header: () => {
          return (<span>{t('common_form')}</span>);
        },
        accessor: 'col2',
        Cell: (props) => {
          const word = props.value;
          return <span className="word"
                       onClick={() => handleFormClick(word)}>{word}</span>;
        },
        width: 400,
        className: 'col2',
        disableSortBy: true,
        sortable: false,
        Filter: LongMenu,
        filter: MultipleFilter2
      },
      {
        Header: t('common_words_in_text'),
        accessor: 'col3',
        Cell: (props) => {
          const items = props.value;
          let cellContent = [];
          for (let i = 0; i < items[0].length; i++) {
            let word = items[0][i];
            let count = items[1][i];
            let id = items[3][i];
            //console.log(items)
            let content = (
              <span key={uuidv4()}>
                <span key={props.id}
                      className="word"
                      onClick={() => setWord(id)}>{word}
                </span>
                {String.fromCharCode(160)}{count}
              </span>
            );
            cellContent.push(content);
          }
          return <ToggleCell onCellContent={cellContent}/>;
        },
        width: 700,
        disableFilters: true,
        disableSortBy: true,
        sortable: false
      },
      {
        Header: t('common_header_frequency'),
        id: 'sagedus',
        accessor: 'col4', // accessor is the "key" in the data
        width: 300,
        disableFilters: true
      },
      {
        Header: t('common_header_percentage'),
        accessor: 'col5',
        width: 300,
        disableFilters: true
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setWord]
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
    state: {pageIndex, pageSize}
  } = useTable({
    columns, data, initialState: {
      sortBy: [
        {
          id: 'sagedus',
          desc: true
        }
      ]
    }
  }, useFilters, useSortBy, usePagination);


  return (
    <Box>
      <TableDownloadButton data={data}
                           headers={tableToDownload}/>
      <table className="analyserTable" {...getTableProps()}
             style={{marginRight: 'auto', marginLeft: 'auto', borderBottom: 'solid 1px', width: '100%'}}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr className="tableRow" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                className="tableHead"
                key={uuidv4()}
                style={{
                  borderBottom: 'solid 1px',
                  color: 'black',
                  fontWeight: 'bold'
                }}
              >
                {<span>{column.render('Header')} {column.canFilter ? column.render('Filter') : null}</span>}
                <span className="sortIcon"  {...column.getHeaderProps(column.getSortByToggleProps({title: ''}))}>
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
          prepareRow(row);
          return (
            <tr className="tableRow" {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      width: cell.column.width
                    }}
                    className="border tableData"
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
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
  );
}

export default GrammaticalAnalysis;
