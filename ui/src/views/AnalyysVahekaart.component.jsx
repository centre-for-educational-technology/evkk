import React, { Fragment, useMemo} from 'react'
import { useSortBy, useFilters, useTable, useGlobalFilter } from 'react-table'
import {matchSorter} from 'match-sorter'

export const MultipleFilter = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
      // console.log(val);
      if (filterValue.includes(val.original.col1)) arr.push(val);
      console.log(filterValue);
      console.log(val.original.col1);
    });
    console.log(arr);
    return arr;
  };

  function setFilteredParams(filterArr, val) {
    console.log(filterArr);
    console.log(val);
    // if (val === undefined) return undefined;
    if (filterArr.includes(val)) {
      filterArr = filterArr.filter((n) => {
        return n !== val;
      });
    } else filterArr.push(val);
  
    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
  }
 
function Analyysvahekaart() {
  const data = React.useMemo(
    () => [
      {
        sl: 'Hello',
        st: 'World',
        sag: 'a',
        ok: 1
      },
      {
        sl: 'Teine',
        st: 'World',
        sag: 'b',
        ok: 2
      },
      {
        sl: 'Kolmas',
        st: 'World',
        sag: 'c',
        ok: 4
      },
      {
        sl: 'Hello',
        st: 'World',
        sag: 'd',
        ok: 3
      },
      {
        sl: 'Hello',
        st: 'World',
        sag: 'e',
        ok: 5
      },
      {
        sl: 'Hello',
        st: 'World',
        sag: 'f',
        ok: 6
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sõnaliik ja vorm',
        accessor: 'sl', // accessor is the "key" in the data
        className: 'user',
        width: 600,
        Filter: SelectColumnFilter,
        filter: MultipleFilter

      },
      {
        Header: 'Sõnad tekstis',
        accessor: 'st',
        width: 600,
        disableFilters: true,
      },
      {
        Header: 'Sagedus',
        accessor: 'sag', // accessor is the "key" in the data
        width: 600,
        disableFilters: true,
      },
      {
        Header: 'Osakaal (%)',
        accessor: 'ok',
        width: 600,
        disableFilters: true,
      },
    ],
    []
  )

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
        <div className="block">
          <span className="block capitalize mb-4">{id}</span>
          {options.map((option, i) => {
            return (
              <Fragment key={i}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    id={option}
                    name={option}
                    value={option}
                    onChange={(e) => {
                      setFilter(setFilteredParams(filterValue, e.target.value));
                    }}
                  ></input>
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


  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  
  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  
  


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

  } = useTable({ columns, data, filterTypes}, useFilters, useSortBy)

  return (
    <table {...getTableProps()} style={{ marginRight: 'auto', marginLeft: 'auto', borderBottom: 'solid 1px', width:  '80%'}}>
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
                        : ' ▲'
                      : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
 
                      background: row.index % 2 === 0 ? "white" : "#EBECF0",
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
  )
}

export default Analyysvahekaart;

