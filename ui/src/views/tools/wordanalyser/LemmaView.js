import React, {Fragment, useEffect, useState} from "react";
import "./styles/LemmaView.css";
import {useFilters, usePagination, useSortBy, useTable} from "react-table";
import {v4 as uuidv4} from 'uuid';
import TablePagination from "./TablePagination";
import {useTranslation} from "react-i18next";
import "../../../translations/i18n";
import DownloadButton from "./DownloadButton";


function LemmaView({
                     onLemmaSelect,
                     onWordSelect,
                     onAnalyse,
                     newPageSize,
                     setNewPageSize,
                     newPageIndex,
                     setPageIndex,
                     newSortHeader,
                     setNewSortHeader,
                     newSortDesc,
                     setNewSortDesc
                   }) {


  const lemmad = onAnalyse.lemmas;
  const sonad = onAnalyse.words;
  const {t} = useTranslation();
  const tableToDownload = [t("common_lemma"), t("lemmas_header_wordforms"), t("common_header_frequency"), t("common_header_percentage")];
  const [tempHeader, setTempHeader] = useState(newSortHeader);
  const [tempSortDesc, setTempSortDesc] = useState(newSortDesc);

  let sonaList = new Map();
  let numbrid = new Map();

  const sonuKasutuses = () => {
    for (let i = 0; i < sonad.length; i++) {
      if (!sonaList.has(lemmad[i])) {
        sonaList.set(lemmad[i], []);
        sonaList.get(lemmad[i]).push(sonad[i]);
        numbrid.set(sonad[i], 1);
      } else if (sonaList.has(lemmad[i])) {
        if (sonaList.get(lemmad[i]).includes(sonad[i])) {
          numbrid.set(sonad[i], (numbrid.get(sonad[i]) + 1));
        } else {
          sonaList.get(lemmad[i]).push(sonad[i]);
          numbrid.set(sonad[i], 1);
        }
      }
    }
    sonaList = new Map([...sonaList.entries()].sort());
  }

  sonuKasutuses();

  const mapSort3 = new Map([...numbrid.entries()].sort());
  const mapSort2 = new Map([...mapSort3.entries()].sort((a, b) => b[1] - a[1]));

  function fillData() {
    let tableVal = [];

    for (let i = 0; i < sonaList.size; i++) {
      const iterator1 = mapSort2.keys();
      let info = {
        col1: "",
        col2: [[], []],
        col3: 0,
        col4: 0
      }
      info.col1 = <span className="word"
                        onClick={(e) => onLemmaSelect(e.target.textContent)}>{Array.from(sonaList.keys())[i]}</span>;
      const ajutineList = sonaList.get(Array.from(sonaList.keys())[i]);

      for (let j = 0; j < mapSort2.size; j++) {
        let valueAjutine = iterator1.next().value;
        if (ajutineList.includes(valueAjutine)) {
          info.col2[0].push(String(valueAjutine));
          info.col2[1].push("(" + numbrid.get(valueAjutine) + "), ");
          info.col3 = parseInt(info.col3) + parseInt(numbrid.get(String(valueAjutine)));
        }
      }

      info.col2[1][info.col2[1].length - 1] = info.col2[1][info.col2[1].length - 1].slice(0, -2);
      info.col4 = (info.col3 * 100 / sonad.length).toFixed(2);
      tableVal.push(info);
    }
    return tableVal;
  }

  fillData();
  const columns = React.useMemo(() => [
      {
        Header: t("common_lemma"),
        accessor: 'col1',
        width: 400,
      },
      {
        Header: t("lemmas_header_wordforms"),
        accessor: 'col2',
        width: 700,
        Cell: (props) => {
          const items = props.value
          let cellContent = []
          for (let i = 0; i < items[0].length; i++) {
            let word = items[0][i]
            let count = items[1][i]
            let content = (
              <span key={uuidv4()}>
                    <span className="word"
                          onClick={(e) => onWordSelect(e.target.textContent)}>{word}</span>{String.fromCharCode(160)}{count}
                    </span>
            )
            cellContent.push(content)
          }
          return cellContent
        }
      },
      {
        Header: t("common_header_frequency"),
        id: 'sagedus',
        accessor: 'col3',
        width: 300,
      },
      {
        Header: t("common_header_percentage"),
        accessor: 'col4',
        width: 300,
      },
    ],
    [onWordSelect, t]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = React.useMemo(() => fillData(), []);

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
    state: {pageIndex, pageSize},
  } = useTable({
    columns, data, initialState: {
      pageSize: newPageSize,
      pageIndex: newPageIndex,
      sortBy: [
        {
          id: newSortHeader,
          desc: newSortDesc
        }
      ]
    }
  }, useFilters, useSortBy, usePagination);

  useEffect(() => {
    setNewPageSize(pageSize)
  }, [pageSize]);
  useEffect(() => {
    setPageIndex(pageIndex)
  }, [pageIndex]);
  useEffect(() => {
    setNewSortHeader(tempHeader)
  }, [tempHeader]);
  useEffect(() => {
    setNewSortDesc(tempSortDesc)
  }, [tempSortDesc]);

  return (
    <>
      <Fragment>
        <DownloadButton data={data}
                        headers={tableToDownload}/>
        <table className="analyserTable"
               {...getTableProps()}
               style={{
                 marginRight: 'auto',
                 marginLeft: 'auto',
                 borderBottom: 'solid 1px',
                 width: '100%'
               }}
        >
          <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="tableRow" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="tableHeader"
                    key={uuidv4()}
                    style={{
                      borderBottom: 'solid 1px',
                      color: 'black',
                      fontWeight: 'bold'
                    }}
                >
                  {column.render('Header')}
                  <span className="sort" {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.isSorted
                  ? column.isSortedDesc
                    ? ' ▼'
                    : ' ▲'
                  : '▼▲'}
                    {column.isSorted && tempHeader !== column.id ? setTempHeader(column.id) : null}
                    {column.isSorted && column.isSortedDesc && tempSortDesc !== true ? setTempSortDesc(true) : null}
                    {column.isSorted && !column.isSortedDesc && column.isSortedDesc !== undefined && tempSortDesc !== false ? setTempSortDesc(false) : null}
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
              <tr className="tableRow" {...row.getRowProps()}
                  key={row.id}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        width: cell.column.width
                      }}
                      className="border tableData"
                    >
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            );
          })}
          </tbody>
        </table>
      </Fragment>
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

export default LemmaView;
