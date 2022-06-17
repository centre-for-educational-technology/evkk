import React, { useEffect, useMemo } from "react";
import { useTable, useSortBy, usePagination } from 'react-table';
import './styles/Syllables.css';
import { useState } from 'react';

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

            if (syllables[i][0] === syllables[i + 1][0]) {
                for (let y = 0; syllables[i][0] === syllables[i + 1][0]; y++) {
                    if (i + 1 <= syllables.length - 1) {
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
            } else {
                i++
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
                    display += "algus " + el.algus + " ";
                }
                if (el.keskel) {
                    display += "keskel " + el.keskel + " ";
                }
                if (el.lõpp) {
                    display += "lõpp " + el.lõpp;
                }
                return display;
            },
            disableSortBy: true,
        },
        {
            Header: 'Sagedus ↕',
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

    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, prepareRow } = tableInstance

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
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
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
            <div>
                <button onClick={() => previousPage()}>Eelmine</button>
                <button onClick={() => nextPage()}>Järgmine</button>
            </div>
        </>
    )
}

export default Syllables;