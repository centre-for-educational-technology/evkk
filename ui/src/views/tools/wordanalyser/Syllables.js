import React, {useEffect, useMemo, useState} from "react";
import {usePagination, useSortBy, useTable} from 'react-table';
import './styles/Syllables.css';
import TablePagination from "./TablePagination";

function Syllables({onAnalyse, onSyllableSelect}) {
  const data = onAnalyse.syllables;
  const len = data.length;
  let baseSyllables = [];
  let syllables = [];

  function createList(value) {
    let cleanValue = value.toLowerCase();
    let tempSyllables = cleanValue.split('-');
    baseSyllables.push(tempSyllables);
  }

  function createSyllableList() {
    for (let i = 0; i < len; i++) {
      for (let y = 0; y < baseSyllables[i].length; y++) {
        let tempSyllables = [];
                if (y === 0) {
                  let syllableLocation = "algus";
                  tempSyllables.push(baseSyllables[i][y], syllableLocation);
                } else if (y === baseSyllables[i].length - 1) {
                  let syllableLocation = "lõpp";
                  tempSyllables.push(baseSyllables[i][y], syllableLocation);
                } else {
                  let syllableLocation = "keskmine";
                  tempSyllables.push(baseSyllables[i][y], syllableLocation);
                }
        syllables.push(tempSyllables);
            }
        }
        syllables.sort();
    }

  let formatedSyllables = [];
    function findDuplicates() {
        for (let i = 0; i < syllables.length; i++) {
          let tempList = [];
          let listCounter = [0, 0, 0];

          if (syllables[i][1] === 'algus') {
            listCounter[0] = listCounter[0] + 1;
          } else if (syllables[i][1] === 'keskmine') {
            listCounter[1] = listCounter[1] + 1;
          } else if (syllables[i][1] === 'lõpp') {
            listCounter[2] = listCounter[2] + 1;
          }

          tempList.push(syllables[i][0]);
            if (syllables[i][0] === syllables?.[i + 1]?.[0]) {
                while (syllables[i][0] === syllables?.[i + 1]?.[0]) {
                  if (syllables[i + 1][1] === 'algus') {
                    listCounter[0] = listCounter[0] + 1;
                  } else if (syllables[i + 1][1] === 'keskmine') {
                    listCounter[1] = listCounter[1] + 1;
                  } else if (syllables[i + 1][1] === 'lõpp') {
                    listCounter[2] = listCounter[2] + 1;
                  }
                  i++;
                }
            }
          tempList.push(listCounter[0], listCounter[1], listCounter[2]);
          formatedSyllables.push(tempList);
        }
    }

    const [formatedList, setFormatedList] = useState([]);

    function formating() {
        let output = (formatedSyllables.map((row) => {
            return {
                "silp": <span className="word" onClick={(e) => onSyllableSelect(e.target.textContent)}>{row[0]}</span>,
                "algus": row[1], "keskel": row[2], "lõpp": row[3], "sagedus": row[1] + row[2] + row[3], "osakaal": ((row[1] + row[2] + row[3])*100 / syllables.length).toFixed(2)
            }
        }))

        for (let i = 0; i < output.length; i++) {
            if (!output[i].algus) {
              delete output[i].algus;
            }
            if (output[i].keskel === 0) {
              delete output[i].keskel;
            }
            if (output[i]["lõpp"] === 0) {
              delete output[i]["lõpp"];
            }
        }
      setFormatedList(output);
    }

    // TABELI OSA
    const COLUMNS = [
        {
            Header: 'Silp',
            accessor: 'silp',
            disableSortBy: true,
        },
        {
            Header: 'Silbi asukoht sõnas',
            accessor: el => {
                let display = "";
                if (el.algus) {
                    display += "algus (" + el.algus + "), ";
                }
                if (el.keskel) {
                    display += "keskel (" + el.keskel + "), ";
                }
                if (el.lõpp) {
                    display += "lõpp (" + el.lõpp + "), ";
                }
                display = display.slice(0, -2);
              return display;
            },
          disableSortBy: true,
        },
      {
        Header: 'Sagedus',
        accessor: 'sagedus',
        id: 'sagedus'
      },
      {
        Header: 'Osakaal (%)',
        accessor: 'osakaal',
      }
    ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => COLUMNS, []);
  const tableData = formatedList;
  const tableInstance = useTable({
    columns: columns,
    data: tableData,
    initialState: {
      sortBy: [
        {
          id: 'sagedus',
          desc: true
        }
      ]
    }
  }, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    prepareRow
  } = tableInstance;

  return (
    <>
      {data.map((value, index) => {
                return <div key={index}>
                    {createList(value)}
                </div>
            })}

            {createSyllableList()}
            {findDuplicates()}
            {useEffect(() => {
                formating();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])}

      <table className="analyserTable" {...getTableProps()}>
        <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="tableRow" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "1px solid",
                    color: "black",
                    fontWeight: "bold"
                  }} className="tableHead headerbox">{column.render('Header')}
                <span className="sort">
                                        {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ' ▼▲'}
                                    </span>
              </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row)
                            return (
                              <tr className="tableRow" {...row.getRowProps()}>
                                {
                                  row.cells.map(cell => {
                                    return <td className="tableData" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                  })
                                }
                              </tr>
                            )
                        })
                    }
                </tbody>
      </table>
      <TablePagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        canPreviousPage={canPreviousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        pageIndex={state.pageIndex}
        pageOptions={pageOptions}
        pageSize={state.pageSize}
        setPageSize={setPageSize}
        pageCount={pageCount}
      />
    </>
    )
}

export default Syllables;
