import React, { Fragment, useMemo, useState } from 'react';
import { useSortBy, useFilters, useTable, usePagination } from 'react-table';
import { Button, Checkbox, ButtonGroup, Select, MenuItem, TextField } from "@mui/material";
import './AnalyysVahekaart.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';




function Analyysvahekaart() {

  const text = "Tallinna suurimas linnaosas Lasnamäel on alles vaid kaks eesti õppekeelega gümnaasiumi Laagna ja Kuristiku kus mõlemas peaaegu tuhat õpilast Parajasti on vahetund aga kui vähemaks jääb on Laagna gümnaasiumi juhtkond direktori asetäitjad õppe ja kasvatustöö alal ning direktor lahkelt nõus jagama rõõme ja muresid mis eri rahvuste koos õppimisega kaasas käivad"
  const sonad = text.split(" ")

  console.log(sonad)

  const [showFilter, setShowFilter] = useState(false);

  const MultipleFilter = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
      console.log(val);
      if (filterValue.includes(val.original.col1)) arr.push(val);
      console.log(filterValue);
      console.log(val.original.col1);
    });
    //console.log(arr);
    return arr;
  };

  function ShowPopup(){
    if(document.getElementById('filterDiv').style.display  == "none"){
      document.getElementById('filterDiv').style.display = "block"
    }else if(document.getElementById('filterDiv').style.display == "block"){
      document.getElementById('filterDiv').style.display = "none"
    }
    outsideClick();
      
  }

  function outsideClickFunc(e){
    console.log(e.target);
    var container = document.getElementById('filterDiv');
      if (!container.contains(e.target)) {
          container.style.display = 'none';
          document.removeEventListener('mouseup', outsideClickFunc)
      }
  }

  function outsideClick(){
    document.addEventListener('mouseup', outsideClickFunc);
  }


  function ShowFilter(){
    return (
      <div id='popUpClick' onClick={ShowPopup}><FilterAltIcon/></div>
  )
  }


  function setFilteredParams(filterArr, val) {
    setShowFilter(true);
    // if (val === undefined) return undefined;
    if (filterArr.includes(val)) {
      filterArr = filterArr.filter((n) => {
        return n !== val;
      });
    } else filterArr.push(val);

    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
  }

  function SelectColumnFilter({
    column: { filterValue = [], setFilter, preFilteredRows, id }
  }) {
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

      return (
        
        <Fragment>

          <div id='filterDiv' className='filterDiv' style={{display: "none"}}>
            {options.map((option, i) => {
              return (
                <Fragment key={i}>
                  <div className="flex items-center">
                    <Checkbox
                      id={option}
                      value={option}
                      onChange={(e) => {
                        setFilter(setFilteredParams(filterValue, e.target.value));
                      }}
                    />
                    <label
                      htmlFor={option}
                      className="ml-1.5 font-medium text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                </Fragment>
              );
            })}
          </div>

        </Fragment>
      );
  }



  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'a',
        col4: 1
      },
      {
        col1: 'Teine',
        col2: 'World',
        col3: 'b',
        col4: 2
      },
      {
        col1: 'Kolmas',
        col2: 'World',
        col3: 'c',
        col4: 4
      },
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'd',
        col4: 3
      },
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'e',
        col4: 5
      },
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'f',
        col4: 6
      },
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'a',
        col4: 1
      },
      {
        col1: 'Teine',
        col2: 'World',
        col3: 'b',
        col4: 2
      },
      {
        col1: 'Kolmas',
        col2: 'World',
        col3: 'c',
        col4: 4
      },
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'd',
        col4: 3
      },
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'e',
        col4: 5
      },
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'f',
        col4: 6
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "Sõnaliik ja vorm",
        accessor: 'col1', // accessor is the "key" in the data
        className: 'user',
        width: 400,
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: MultipleFilter

      },
      {
        className: "filter-tab",
        Header: <ShowFilter />,
        accessor: 'filterTab',
        width: 200,
        disableFilters: true,
        disableSortBy: true,
      },

      {
        Header: 'Sõnad tekstis',
        accessor: 'col2',
        width: 600,
        disableFilters: true,
      },
      {
        Header: 'Sagedus',
        accessor: 'col3', // accessor is the "key" in the data
        width: 600,
        disableFilters: true,
      },
      {
        Header: 'Osakaal (%)',
        accessor: 'col4',
        width: 600,
        disableFilters: true,
      }
    ],
    []
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
    state: { pageIndex, pageSize },
  } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useFilters, useSortBy, usePagination)

  return (
    <Fragment>
      <table {...getTableProps()} className="text-sm">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
      <table {...getTableProps()} style={{ marginRight: 'auto', marginLeft: 'auto', borderBottom: 'solid 1px', width: '80%' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: 'solid 1px',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : '  ▲'
                      : ' '}

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
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',

                        width: cell.column.width,
                      }}
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
          {<FirstPageIcon/>}
        </Button>{' '}
        <Button variant='contained' onClick={() => previousPage()} disabled={!canPreviousPage}>
          {<NavigateBeforeIcon/>}
        </Button>{' '}
        <Button variant='contained' onClick={() => nextPage()} disabled={!canNextPage}>
          {<NavigateNextIcon/>}
        </Button>{' '}
        <Button variant='contained' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {<LastPageIcon/>}
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
          {[10, 20, 30, 40, 50].map(pageSize => (
            <MenuItem key={pageSize} value={pageSize}>{pageSize}</MenuItem>

          ))}
        </Select>
      </div>
    </Fragment>
  )
}

export default Analyysvahekaart;

