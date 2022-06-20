import React, { useEffect, useMemo } from "react";
import { useTable, useSortBy, usePagination } from 'react-table';
import './styles/Syllables.css';
import { useState } from 'react';
import { Button, ButtonGroup, Select, MenuItem, TextField } from "@mui/material";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function Syllables({onAnalyse}) {
    const data = onAnalyse.syllables;
    const len = data.length;
    let baseSyllables = []
    let syllables = []

    function createList(value) {
        let cleanValue = value.toLowerCase();
        let tempSyllables = cleanValue.split('-');
        baseSyllables.push(tempSyllables);
    }

    function createSyllableList() {
        for (let i = 0; i < len; i++) {
            for (let y = 0; y < baseSyllables[i].length; y++) {
        
                let tempSyllables = []
                if (y === 0) {
                    let syllableLocation = "algus"
                    tempSyllables.push(baseSyllables[i][y], syllableLocation)

                } else if (y === baseSyllables[i].length - 1) {
                    let syllableLocation = "lõpp"
                    tempSyllables.push(baseSyllables[i][y], syllableLocation)

                } else {
                    let syllableLocation = "keskmine"
                    tempSyllables.push(baseSyllables[i][y], syllableLocation)
                }
                syllables.push(tempSyllables)
            }
        }
        syllables.sort();
    }

    let formatedSyllables = []
    function findDuplicates() {
        for (let i = 0; i < syllables.length; i++) {

            let tempList = []
            let listCounter = [0, 0, 0]

            if (syllables[i][1] === 'algus') {
                listCounter[0] = listCounter[0] + 1

            } else if (syllables[i][1] === 'keskmine') {
                listCounter[1] = listCounter[1] + 1

            } else if (syllables[i][1] === 'lõpp') {
                listCounter[2] = listCounter[2] + 1
            }
            
            tempList.push(syllables[i][0])
            if (syllables[i][0] === syllables?.[i + 1]?.[0]) {
                while(syllables[i][0] === syllables?.[i + 1]?.[0]) {
                    if (syllables[i + 1][1] === 'algus') {
                        listCounter[0] = listCounter[0] + 1

                    } else if (syllables[i + 1][1] === 'keskmine') {
                        listCounter[1] = listCounter[1] + 1

                    } else if (syllables[i + 1][1] === 'lõpp') {
                        listCounter[2] = listCounter[2] + 1
                    }
                    i++
                }
            }
            tempList.push(listCounter[0], listCounter[1], listCounter[2])
            formatedSyllables.push(tempList)
        }
    }



    const [formatedList, setFormatedList] = useState([]);
    function formating() {
        let output = (formatedSyllables.map((row) => {
            return {
                "silp": row[0],
                "algus": row[1], "keskel": row[2], "lõpp": row[3], "sagedus": row[1] + row[2] + row[3]
            }
        }))

        for (let i = 0; i < output.length; i++) {
            if (!output[i].algus) {
                delete output[i].algus
            }
            if (output[i].keskel === 0) {
                delete output[i].keskel
            }
            if (output[i]["lõpp"] === 0) {
                delete output[i]["lõpp"]
            }
        }
        setFormatedList(output)
    }

    //TABELI OSA
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
        }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const columns = useMemo(() => COLUMNS, [])
    const tableData = formatedList
    const tableInstance = useTable({
        columns: columns,
        data: tableData
    }, useSortBy, usePagination)

    const { getTableProps, getTableBodyProps, headerGroups, page, state, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, pageCount, gotoPage, setPageSize, prepareRow } = tableInstance

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

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                style={{
                                    borderBottom: "1px solid",
                                    color: "black",
                                    fontWeight: "bold"
                                }} className="headerbox">{column.render('Header')}
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
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
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
            {state.pageIndex + 1} / {pageOptions.length}
          </strong>{' '}
        </span>
        <TextField
          size='small'
          id="outlined-number"
          label="Mine lehele nr:"
          type="number"
          defaultValue={state.pageIndex + 1}
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
          value={state.pageSize}
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
        </>
    )
}

export default Syllables;