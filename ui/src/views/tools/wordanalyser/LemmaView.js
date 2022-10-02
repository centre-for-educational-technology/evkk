import React, {Fragment} from "react";
import "./styles/LemmaView.css";
import {usePagination, useSortBy, useTable} from "react-table";
import {v4 as uuidv4} from 'uuid';
import TablePagination from "./TablePagination";
import DownloadBtn from "./DownloadBtn";

function Table({columns, data}) {

  const tableToDwnld = ["Algvormid", "Sõnavormid", "Sagedus", "Osakaal"]
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
    setPageSize,
  } =
    useTable({
      columns,
      data, initialState: {
          sortBy: [
            {
              id: 'sagedus',
              desc: true
            }
          ]
        }
    }, useSortBy, usePagination,
    );

  return (
    <>
    <Fragment>
      <DownloadBtn data={data} headers={tableToDwnld}/>
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
            <tr className="tableRow" {...row.getRowProps()} key={row.id}>
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
        pageIndex={state.pageIndex}
        pageOptions={pageOptions}
        pageSize={state.pageSize}
        setPageSize={setPageSize}
        pageCount={pageCount}
      />
    </>
  );
}

function LemmaView({onLemmaSelect, onWordSelect, onAnalyse}) {

  const lemmad = onAnalyse.lemmas;
  const sonad = onAnalyse.words;

  let sonaList = new Map();
  let numbrid = new Map();


  const sonuKasutuses = () => {

    for (let i = 0; i < sonad.length; i++) {
      if (!sonaList.has(lemmad[i])) {
        sonaList.set(lemmad[i],[]);
        sonaList.get(lemmad[i]).push(sonad[i]);
        numbrid.set(sonad[i], 1);
      } else if (sonaList.has(lemmad[i])) {
        if (sonaList.get(lemmad[i]).includes(sonad[i])) {
          numbrid.set(sonad[i],(numbrid.get(sonad[i]) + 1));
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

  function fillData(){
    let tableVal = [];

    for (let i = 0; i < sonaList.size; i++) {
      const iterator1 = mapSort2.keys();

      let info = {
        col1: "",
        col2: [[],[]],
        col3: 0,
        col4: 0
      }

      info.col1 = <span className="word" onClick={(e) => onLemmaSelect(e.target.textContent)}>{Array.from(sonaList.keys())[i]}</span>;
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
          Header: 'Algvormid',
          accessor: 'col1',
          width: 400,
        },
        {
            Header: 'Sõnavormid',
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
                    <span className="word" onClick={(e) => onWordSelect(e.target.textContent)}>{word}</span>{String.fromCharCode(160)}{count}
                    </span>
                  )
                  cellContent.push(content)
              }
              return cellContent
            }
        },
        {
            Header: 'Sagedus',
            id: 'sagedus',
            accessor: 'col3',
            width: 300,
        },
        {
            Header: 'Osakaal (%)',
            accessor: 'col4',
            width: 300,
        },
    ],
    [onWordSelect]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = React.useMemo(()=> fillData(), []);

    return (
        <>
          <div>
            <Table columns={columns} data={data}/>
          </div>
        </>
    );
}

export default LemmaView;
