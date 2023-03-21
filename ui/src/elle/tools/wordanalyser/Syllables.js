import React, {useContext, useEffect, useMemo, useState} from "react";
import {usePagination, useSortBy, useTable} from 'react-table';
import './styles/Syllables.css';
import TablePagination from "./TablePagination";
import {useTranslation} from "react-i18next";
import "../../translations/i18n";
import TableDownloadButton from "./TableDownloadButton";
import {v4 as uuidv4} from 'uuid';
import {AnalyseContext, SetSyllableContext, SetSyllableWordContext} from "./Contexts";
import {Box} from "@mui/material";
import ToggleCell from "./ToggleCell";

function Syllables() {

  const analyse = useContext(AnalyseContext)[0];
  const setSyllable = useContext(SetSyllableContext);
  const setSyllableWord = useContext(SetSyllableWordContext);
  const data = analyse.syllables;
  const len = data.length;
  const words = analyse.words;
  const {t} = useTranslation();
  let baseSyllables = [];
  let syllables = [];
  let infoList = [];
  const [infoListNew, setInfolistNew] = useState([]);

  const tableToDownload = [t("syllables_header_syllable"), t("syllables_table_beginning"), t("syllables_table_middle"), t("syllables_table_end"), t("common_words_in_text"), t("common_header_frequency"), t("common_header_percentage")];

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
          let syllableLocation = "l6pp";
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
      let syllableList = [[], []];
      let count = 0;
      let listCounter = [0, 0, 0];

      if (syllables[i][1] === 'algus') {
        listCounter[0] = listCounter[0] + 1;
      } else if (syllables[i][1] === 'keskmine') {
        listCounter[1] = listCounter[1] + 1;
      } else if (syllables[i][1] === 'l6pp') {
        listCounter[2] = listCounter[2] + 1;
      }

      for (const element of data) {
        if (element === syllables[i][2]) {
          count++;
        }
      }

      if (!syllableList[0].includes(syllables[i][2])) {
        syllableList[0].push(syllables[i][2]);
        syllableList[1].push(count);
      }

      tempList.push(syllables[i][0]);
      if (syllables[i][0] === syllables?.[i + 1]?.[0]) {
        while (syllables[i][0] === syllables?.[i + 1]?.[0]) {
          count = 0;
          if (!syllableList[0].includes(syllables[i + 1][2])) {
            syllableList[0].push(syllables[i + 1][2]);
            for (const element of data) {
              if (element === syllables[i + 1][2]) {
                count++;
              }
            }
            syllableList[1].push(count);
          }

          if (syllables[i + 1][1] === 'algus') {
            listCounter[0] = listCounter[0] + 1;
          } else if (syllables[i + 1][1] === 'keskmine') {
            listCounter[1] = listCounter[1] + 1;
          } else if (syllables[i + 1][1] === 'l6pp') {
            listCounter[2] = listCounter[2] + 1;
          }
          // this assignment is necessary!
          i++;
        }
      }
      tempList.push(listCounter[0], listCounter[1], listCounter[2], syllableList);
      formatedSyllables.push(tempList);
    }
  }

  const [formatedList, setFormatedList] = useState([]);

  function formating() {
    let output = formatedSyllables.map((row) => {
      let cellContent = []
      let info = {
        col1: "",
        col2: 0,
        col3: 0,
        col4: 0,
        col5: [[], []],
        col6: 0,
        col7: 0
      }

      info.col1 = row[0];
      info.col2 = row[1];
      info.col3 = row[2];
      info.col4 = row[3];
      info.col6 = row[1] + row[2] + row[3];
      info.col7 = ((row[1] + row[2] + row[3]) * 100 / syllables.length).toFixed(2);

      const syllableWords = () => {
        for (let i = 0; i < row[4][0].length; i++) {
          let word = row[4][0][i];
          let count = row[4][1][i];
          info.col5[0].push(row[4][0][i]);
          if (i === row[4][0].length - 1) {
            info.col5[1].push(`(${row[4][1][i]})`);
            cellContent.push(
              <span key={uuidv4()}>
                <span key={uuidv4()}
                      className="word"
                      onClick={(e) => setSyllableWord(e.target.textContent)}>
                  {word}
                </span>
                &nbsp;({count})
              </span>);
          } else if (i === 0) {
            info.col5[1].push(`(${row[4][1][i]}), `);
            cellContent.push(
              <span key={uuidv4()}>
                <span key={uuidv4()}
                      className="word"
                      onClick={(e) => setSyllableWord(e.target.textContent)}>
                  {word}
                </span>
                &nbsp;({count}),{' '}
              </span>);
          } else {
            info.col5[1].push(`(${row[4][1][i]}), `);
            cellContent.push(
              <span key={uuidv4()}>
                <span key={uuidv4()}
                      className="word"
                      onClick={(e) => setSyllableWord(e.target.textContent)}>
                  {word}
                </span>
                &nbsp;({count}),{' '}
              </span>)
          }
        }
        return <ToggleCell onCellContent={cellContent}/>
      }

      infoList.push(info);
      return {
        "silp": <span className="word"
                      onClick={(e) => setSyllable(e.target.textContent)}>{row[0]}</span>,
        "algus": row[1], "keskel": row[2], "l6pp": row[3], "sagedus": row[1] + row[2] + row[3],
        "sonadtekstis": syllableWords(),
        "osakaal": ((row[1] + row[2] + row[3]) * 100 / syllables.length).toFixed(2),
      }
    });

    for (const element of output) {
      if (!element.algus) {
        delete element.algus;
      }
      if (element.keskel === 0) {
        delete element.keskel;
      }
      if (element["l6pp"] === 0) {
        delete element["l6pp"];
      }
    }
    setInfolistNew(infoList);
    setFormatedList(output);
  }

  // TABELI OSA
  const COLUMNS = [
    {
      Header: t("syllables_header_syllable"),
      accessor: 'silp',
      width: 200,
    },
    {
      Header: t("syllables_header_location"),
      accessor: el => {
        let display = "";
        if (el.algus) {
          display += `${t("syllables_beginning")} (${el.algus}), `;
        }
        if (el.keskel) {
          display += `${t("syllables_middle")} (${el.keskel}), `;
        }
        if (el.l6pp) {
          display += `${t("syllables_end")} (${el.l6pp}), `;
        }
        display = display.slice(0, -2);
        return display;
      },
      disableSortBy: true,
      width: 400
    },
    {
      Header: t("common_words_in_text"),
      accessor: 'sonadtekstis',
      width: 700,
      disableSortBy: true,
      sortable: false
    },
    {
      Header: t("common_header_frequency"),
      accessor: 'sagedus',
      id: 'sagedus',
      width: 300
    },
    {
      Header: t("common_header_percentage"),
      accessor: 'osakaal',
      width: 300
    }
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable({
    columns: columns,
    data: formatedList,
    initialState: {
      sortBy: [
        {
          id: "sagedus",
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
  } = tableInstance;


  return (
    <>
      <Box>
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

        <TableDownloadButton data={infoListNew}
                             tableType={'Syllables'}
                             headers={tableToDownload}/>

        <table className="analyserTable" {...getTableProps()}
               style={{marginRight: 'auto', marginLeft: 'auto', borderBottom: 'solid 1px', width: '100%'}}>
          <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="tableRow" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={uuidv4()}
                  style={{
                    borderBottom: "1px solid",
                    color: "black",
                    fontWeight: "bold"
                  }}
                  className="tableHdr headerbox">{column.render('Header')}
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
                      return <td className="tableData" {...cell.getCellProps()}
                                 style={{padding: '10px', width: cell.column.width,}}>{cell.render('Cell')}</td>
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
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageCount={pageCount}
        />
      </Box>
    </>
  )
}

export default Syllables;
