import TablePagination from './table/TablePagination';
import React from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

export default function GenericTable({tableClassname, columns, data, sortByColAccessor}) {

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
          id: sortByColAccessor,
          desc: true
        }
      ]
    }
  }, useSortBy, usePagination);

  return (
    <>
      <table className={tableClassname}
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
    </>
  );
}
