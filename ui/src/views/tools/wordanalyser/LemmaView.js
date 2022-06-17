import React, { Fragment } from "react";
import "./styles/LemmaView.css";
import { useTable, useSortBy, usePagination } from "react-table";
import { v4 as uuidv4 } from 'uuid';

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
    }, useSortBy, usePagination,
    );

  return (
    <>
    <Fragment>
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
            <tr {...row.getRowProps()} key={row.id}>
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

function LemmaView({onLemmaSelect, onWordSelect, onAnalyse}) {

  const lemmad = onAnalyse.lemmas;
  const sonad = onAnalyse.words;

  let sonaList = new Map();
  let numbrid = new Map();

  const sonuKasutuses = () => {

    for (let i = 0; i < sonad.length; i++) {

      if(!sonaList.has(lemmad[i])){
        sonaList.set(lemmad[i],[]);
        sonaList.get(lemmad[i]).push(sonad[i]);
        numbrid.set(sonad[i], 1);
      }else if(sonaList.has(lemmad[i])){

        if(sonaList.get(lemmad[i]).includes(sonad[i])){
          
          numbrid.set(sonad[i],(numbrid.get(sonad[i]) + 1)) ;
        }else{
          sonaList.get(lemmad[i]).push(sonad[i]);
          numbrid.set(sonad[i], 1);
        }
      }
    }
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
        if(ajutineList.includes(valueAjutine)){
          info.col2[0].push(String(valueAjutine))
          info.col2[1].push("(" + numbrid.get(valueAjutine) + "), ")
          info.col3 = parseInt(info.col3) + parseInt(numbrid.get(String(valueAjutine)))
        }
        
      }

      info.col2[1][info.col2[1].length - 1] = info.col2[1][info.col2[1].length - 1].slice(0, -2)
      info.col4 = (info.col3 * 100 / sonad.length).toFixed(2)
      tableVal.push(info);
    }

    return tableVal;
  }

  fillData();

    const columns = React.useMemo(() => [
        {
            Header: 'Algvorm',
            accessor: 'col1',
            disableSortBy: true, 
            sortable: false,
        },
        {
            Header: 'Sõnavormid',
            accessor: 'col2',
            disableSortBy: true,
            sortable: false,
            Cell: (props) => {
              const items = props.value
    
              let cellContent = []
              for(let i=0; i<items[0].length; i++){
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
            Header: 'Sagedus ↕',
            accessor: 'col3',
        },
        {
            Header: 'Osakaal (%) ↕',
            accessor: 'col4',
        },
    ],
    [onWordSelect]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = React.useMemo(()=> fillData(), []);

    return (
        <>
        <div> 
            <Table columns={columns} data={data} />
        </div>
        </>
    );
}

export default LemmaView;