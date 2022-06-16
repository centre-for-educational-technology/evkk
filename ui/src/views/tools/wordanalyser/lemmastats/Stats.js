import { useTable, useSortBy, usePagination } from 'react-table'
import { useState, useEffect } from 'react'
import { WordCell } from './WordCell'

export const Stats = ({ onAnalyse, onLemmaSelect, onWordSelect }) => {
    const [lemmas, setLemmas] = useState('')
    const [words, setWords] = useState('')
    const [lemmaArray, setLemmaArray] = useState([{name: '', items: [['']], count: ''}])
    const [data, setData] = useState([{name: '', items: [['']], count: ''}])
    const [columns, setColumns] = useState([{Header: 'Algvormid', accessor: 'name', Cell: ''},{Header: 'Sõnavormid', accessor: 'items', Cell: [['']]},{Header: 'Sagedus', accessor: 'count'},{Header: 'Osakaal', accessor: 'ratio', Cell: ''}])

    useEffect(() => {
        setLemmas(onAnalyse.lemmas)
        setWords(onAnalyse.words)
      }, [onAnalyse]);

      useEffect(() => {
        const newLemmaArray = []
        for(let i=0; i<words.length; i++){
            
            const currentWord = words[i].toLowerCase()
            if(newLemmaArray.find(obj => obj.name ===lemmas[i])){
                const newObj = newLemmaArray.find((obj) => obj.name ===lemmas[i])
                if(newObj.items.find(item => item[0] === currentWord)){
                    let k = newObj.items.findIndex((item) => item[0] ===currentWord)
                    newObj.items[k][1]++
                } else {
                    let item = []
                    item[0]=currentWord
                    item[1]=1
                    newObj.items.push(item)
                }
                newObj.count++
                newObj.ratio = Math.round(newObj.count/words.length*100*100)/100
                let j = newLemmaArray.findIndex((obj) => obj.name ===lemmas[i])
                newLemmaArray[j] = newObj
            } else {
                const newObj = {name: "", items: [], count:0, ratio:0}
                newObj.name = lemmas[i]
                newObj.items[0] = [currentWord, 1]
                newObj.count = 1
                newObj.ratio = Math.round(newObj.count/words.length*100*100)/100
                newLemmaArray.push(newObj)
            }
        }
        setLemmaArray(newLemmaArray)

    }, [lemmas, words])
    
    useEffect(() => {
        let newLemmaArray = lemmaArray
         newLemmaArray.sort((a, b) => {
            if (a.count===b.count&&String(a.name).localeCompare(b.name)===0) {
                return 0;
            } else if(a.count!==b.count){
                return (b.count < a.count) ? -1 : 1;
            } else {
                return (String(a.name).localeCompare(b.name)<0) ? -1 : 1;
            }
        })
        setData(newLemmaArray)
    }, [lemmaArray])

    useEffect(() => {
        const newColumns = [
            {
                Header: 'Algvormid',
                accessor: 'name',
                Cell: (props: {value: string}) => {
                    const word= props.value
                    return <span  className="word" onClick={(e) =>  onLemmaSelect(e.target.textContent)}>{word}</span>
                },
            },
            {
                Header: 'Sõnavormid',
                accessor: 'items',
                Cell: (props: { value: Array }) => {
                    const items = props.value
                    const sortedItems = items.sort((a, b) => {
                        if (String(a[0]).localeCompare(b[0])===0) {
                            return 0;
                        } else {
                            return (String(a[0]).localeCompare(b[0])<0) ? -1 : 1;
                        }
                    })
                    let cellContent = []
                    for(let i=0; i<sortedItems.length; i++){
                        let word = sortedItems[i][0]
                        let count = sortedItems[i][1]
                        let content = (
                            <WordCell key={word} onWordSelect={onWordSelect} sendWord={word} sendCount={count} />
                        )
                        cellContent.push(content)
                    }
                    return cellContent
                },
            },
            {
                Header: 'Sagedus',
                accessor: 'count',
            },
            {
                Header: 'Osakaal',
                accessor: 'ratio',
                Cell: (props: {value: string}) => {
                    return props.value+"%"
                },
            }
        ]
        setColumns(newColumns)
    }, [words, onLemmaSelect, onWordSelect])
    
    const tableInstance = useTable({ columns, data }, useSortBy, usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
    } = tableInstance

    const { pageIndex, pageSize } = state

    const getTableDataForExport = (data: any[], columns: any[]) => data?.map((record: any) => columns
        .reduce((recordToDownload, column) => (
        { ...recordToDownload, [column.Header]: record[column.accessor] }
        ), {}));

    const makeCsv = async (rows: any[], filename: string) => {
        const separator: string = ';';
        const keys: string[] = Object.keys(rows[0]);
    
        const csvContent = `${keys.join(separator)}\n${
            rows.map((row) => keys.map((k) => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];       
            cell = Number.isNaN(Number.parseFloat(cell))
                ? cell.toString()
                : cell.toLocaleString()
            return cell;
        }).join(separator)).join('\n')}`;

    //data = data.map(row => ({...row, createdAt: moment(row.createdAt).format("YYYY-MM-DD")}))
 
        const blob = new Blob(["\ufeff", csvContent], { type: 'text/csv; charset=utf-8;' });
        if (navigator.msSaveBlob) { // In case of IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            }
        }
    };

    return (
    <>
        <button type="button" onClick={() => makeCsv(getTableDataForExport(data, columns), `${"ExportedLemmas"}.csv`)}>
            CSV
        </button>


        <table className="lemmaTable" {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {page.map(row => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return (
                    <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                    </td>
                    )
                })}
                </tr>
            )
            })}
        </tbody>
        </table>
        <div>
            <span>
                <strong>
                    {pageIndex+1}/{pageOptions.length}
                </strong>{' '}
            </span>
            <span>
                | Mine lehele: {' '}
                <input type="number" defaultValue={pageIndex+1}
                    onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }}
                    style={{width: '50px ', marginRight: '10px'}}
                    />
            </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {
                [10, 25, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Näita {pageSize} rida
                    </option>
                ))
                }

            </select>
            <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Eelmine</button>
            <button onClick={()=> nextPage()} disabled={!canNextPage}>Järgmine</button>
            <button onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
        </div>
    </>
  )
}
