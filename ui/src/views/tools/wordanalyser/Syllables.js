import React, {useEffect, useMemo, useState} from "react";
import {usePagination, useSortBy, useTable} from 'react-table';
import './styles/Syllables.css';
import TablePagination from "./TablePagination";
import DownloadBtn from "./DownloadBtn";

function Syllables({onAnalyse, onSyllableSelect}) {
  const data = onAnalyse.syllables;
  const len = data.length;
  const words = onAnalyse.words;
  let baseSyllables = [];
  let syllables = [];
  let infoList = [];
  const [infoListNew, setInfolistNew] = useState([]);

  const tableToDwnld = ["Silp", "Asukoht(algus)", "Asukoht(keskel)", "Asukoht(lõpp)", "Sõnad tekstis", "Sagedus", "Osakaal (%)"]

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
                  tempSyllables.push(baseSyllables[i][y], syllableLocation, data[i], words[i]);
                } else if (y === baseSyllables[i].length - 1) {
                  let syllableLocation = "lõpp";
                  tempSyllables.push(baseSyllables[i][y], syllableLocation, data[i], words[i]);
                } else {
                  let syllableLocation = "keskmine";
                  tempSyllables.push(baseSyllables[i][y], syllableLocation, data[i], words[i]);
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
          let syllableList = [[],[]];
          let count = 0;
          let listCounter = [0, 0, 0];

          if (syllables[i][1] === 'algus') {
            listCounter[0] = listCounter[0] + 1;
          } else if (syllables[i][1] === 'keskmine') {
            listCounter[1] = listCounter[1] + 1;
          } else if (syllables[i][1] === 'lõpp') {
            listCounter[2] = listCounter[2] + 1;
          }

          for(var j = 0; j < data.length; ++j){
            if(data[j] === syllables[i][2]){
              count++;
            }
          }

          if (!syllableList[0].includes(syllables[i][2])){
            syllableList[0].push(syllables[i][2]);
            syllableList[1].push(count);
          }

          tempList.push(syllables[i][0]);
            if (syllables[i][0] === syllables?.[i + 1]?.[0]) {

              while (syllables[i][0] === syllables?.[i + 1]?.[0]) {
                count = 0;
                  if (!syllableList[0].includes(syllables[i+1][2])){
                    syllableList[0].push(syllables[i+1][2]);
                    for(var j = 0; j < data.length; ++j){
                      if(data[j] === syllables[i+1][2]){
                        count++;
                      }
                    }
                    syllableList[1].push(count);
                  }

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
          tempList.push(listCounter[0], listCounter[1], listCounter[2], syllableList);
          formatedSyllables.push(tempList);
        }
    }

    const [formatedList, setFormatedList] = useState([]);

    function formating() {
        let output = (formatedSyllables.map((row) => {

          let sonadTekstisOutput = "";
          let info = {
            col1: "",
            col2: 0,
            col3: 0,
            col4: 0,
            col5: [[],[]],
            col6: 0,
            col7: 0
          }

          info.col1 = row[0];
          info.col2 = row[1];
          info.col3 = row[2];
          info.col4 = row[3];
          info.col6 = row[1] + row[2] + row[3];
          info.col7 = ((row[1] + row[2] + row[3])*100 / syllables.length).toFixed(2);
          const syllableWords = () => {for (let i = 0; i < row[4][0].length; i++) {
            info.col5[0].push(row[4][0][i]);

            if(i === row[4][0].length - 1){
              info.col5[1].push("(" + row[4][1][i] + ")");
              sonadTekstisOutput += " " + row[4][0][i] + "&nbsp;" + "(" + row[4][1][i] + ")";
            }else if(i === 0){
              info.col5[1].push("(" + row[4][1][i] + "), ");
              sonadTekstisOutput += row[4][0][i] + "&nbsp;" + "(" + row[4][1][i] + "),";
            }
            else{
              info.col5[1].push("(" + row[4][1][i] + "), ");
              sonadTekstisOutput += " " + row[4][0][i] + "&nbsp;" + "(" + row[4][1][i] + "),";
            }
          }
            sonadTekstisOutput = sonadTekstisOutput.replaceAll("-", "&#8209;");
            return(<span style={{whiteSpace: "break-spaces"}} dangerouslySetInnerHTML={{__html: sonadTekstisOutput}}></span>);
          }


          infoList.push(info)

            return {
                "silp": <span className="word" onClick={(e) => onSyllableSelect(e.target.textContent)}>{row[0]}</span>,
                "algus": row[1], "keskel": row[2], "lõpp": row[3], "sagedus": row[1] + row[2] + row[3],
                "sonadtekstis": syllableWords(),
                "osakaal": ((row[1] + row[2] + row[3])*100 / syllables.length).toFixed(2),
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
      setInfolistNew(infoList);
      setFormatedList(output);
    }

    // TABELI OSA
    const COLUMNS = [
        {
            Header: 'Silp',
            accessor: 'silp',
            width: 200,
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
          width: 400
        },
      {
        Header: 'Sõnad tekstis',
        accessor: 'sonadtekstis',
        width: 700,
        disableSortBy: true,
        sortable: false
      },
      {
        Header: 'Sagedus',
        accessor: 'sagedus',
        id: 'sagedus',
        width: 300
      },
      {
        Header: 'Osakaal (%)',
        accessor: 'osakaal',
        width: 300
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

      <DownloadBtn data={infoListNew} headers={tableToDwnld}/>

      <table className="analyserTable" {...getTableProps()}
             style={{marginRight: 'auto', marginLeft: 'auto', borderBottom: 'solid 1px', width: '100%'}}>
        <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="tableRow" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                  style={{
                    borderBottom: "1px solid",
                    color: "black",
                    fontWeight: "bold"
                  }} className="tableHdr headerbox">{column.render('Header')}
                <span className="sort" {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                                    return <td className="tableData" {...cell.getCellProps()} style={{padding: '10px', width: cell.column.width,}}>{cell.render('Cell')}</td>
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
