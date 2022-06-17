import React from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import { Fragment, useMemo } from "react";
import { Checkbox } from '@mui/material';

function Table({ columns, data }) {
    
    const { 
      getTableProps, 
      getTableBodyProps, 
      headerGroups, 
      page,
      state, 
      prepareRow,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize, } =
      useTable({
        columns,
        data,
      }, useFilters, useSortBy, usePagination,
      );
  
    return (
      <>
      <Fragment>
      {headerGroups.map((headerGroup) =>
        headerGroup.headers.map((column) =>
          column.Filter ? (
            <div key={column.id}>
              <label for={column.id} className="filterTxt">Filtreeri: </label>
              {column.render("Filter")}
            </div>
          ) : null
        )
      )}
      <table {...getTableProps()} >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' ↓'
                      : ' ↑'
                    : ''}
                </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </Fragment>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Leht{' '}
          <strong>
            {state.pageIndex + 1} / {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={state.pageSize}
          onChange={e => {
              setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
              Näita {pageSize}
            </option>
          ))}
        </select>
      </div>
      </>
    );
}

function showPopup() {
  if(document.getElementById('filterDiv').style.display  === "none"){
    document.getElementById('filterDiv').style.display = "block"
  }else if(document.getElementById('filterDiv').style.display === "block"){
    document.getElementById('filterDiv').style.display = "none"
  }
}

export const MultipleFilter = (rows, accessor, filterValue) => {
  const arr = [];
  rows.forEach((val) => {
    if (filterValue.includes(val.original[accessor])) arr.push(val);
  });
  return arr;
};

function setFilteredParams(filterArr, val) {
  if (filterArr.includes(val)) {
    filterArr = filterArr.filter((n) => {
      return n !== val;
    });
  } else filterArr.push(val);

  if (filterArr.length === 0) filterArr = undefined;
  return filterArr;
}

export function SelectColumnFilter({
  
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
    <>       
      <Fragment>
      <button onClick={showPopup} ><i class="fa fa-filter" aria-hidden="true"></i></button>
        <div id='filterDiv' className='filterDiv' style={{display: "none"}}>
          <div className="filterInner">
          <button className="closeBtn" onClick={showPopup}>X</button>
            {options.map((option, i) => {
              return (
                <Fragment key={i}>
                  <div className="checkbox">
                    <Checkbox
                      id={option}
                      name={option}
                      value={option}
                      onChange={(e) => {
                        setFilter(setFilteredParams(filterValue, e.target.value));
                      }}
                    >
                    </Checkbox>
                    <label
                      htmlFor={option}
                    >
                      {option}
                    </label>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default Table;