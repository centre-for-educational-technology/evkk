import {useContext, useMemo} from "react";
import "./styles/LemmaView.css";
import {useFilters, usePagination, useSortBy, useTable} from "react-table";
import {v4 as uuidv4} from 'uuid';
import TablePagination from "./TablePagination";
import {useTranslation} from "react-i18next";
import "../../translations/i18n";
import DownloadButton from "./DownloadButton";
import {AnalyseContext, SetLemmaContext, SetWordContext} from "./Contexts";
import {Box} from "@mui/material";
import ToggleCell from "./ToggleCell";

function LemmaView() {

  const analyse = useContext(AnalyseContext)[0];
  const setLemma = useContext(SetLemmaContext);
  const setWord = useContext(SetWordContext);
  let lemmaArray = []
  const lemmas = analyse.lemmas
  const words = analyse.words
  const ids = analyse.ids

  const {t} = useTranslation();
  const tableToDownload = [t("common_lemma"), t("lemmas_header_wordforms"), t("common_header_frequency"), t("common_header_percentage")];

  const analyseLemmas = () => {
    for (let i = 0; i < lemmas.length; i++) {
      let lemmaIndex = lemmaArray.findIndex(element => element.lemma === lemmas[i])
      //kui sellist lemmat pole
      if (lemmaIndex === -1) {
        let newLemma = {
          lemma: lemmas[i],
          forms: [{
            form: words[i],
            ids: [ids[i]]
          }],
          count: 1

        }
        lemmaArray.push(newLemma);
      } else {
        let currentLemma = lemmaArray[lemmaIndex]
        let formIndex = currentLemma.forms.findIndex(element => element.form === words[i])
        //kui sellist sõnavormi pole
        if (formIndex === -1) {
          let newForm = {
            form: words[i],
            ids: [ids[i]]
          }
          lemmaArray[lemmaIndex].forms.push(newForm)
          lemmaArray[lemmaIndex].count += 1
        } else {
          lemmaArray[lemmaIndex].forms[formIndex].ids.push(ids[i])
          lemmaArray[lemmaIndex].count += 1
        }
      }
    }
    //lemmade sortimine
    lemmaArray.sort((a, b) => (a.count === b.count) ? ((a.lemma > b.lemma) ? -1 : 1) : ((a.count > b.count) ? -1 : 1))
    //vormide sortimine
    for (const element of lemmaArray) {
      element.forms.sort((a, b) => (a.ids.length === b.ids.length) ? ((a.form < b.form) ? -1 : 1) : ((a.ids.length > b.ids.length) ? -1 : 1))
    }
  }

  analyseLemmas()

  function fillData() {
    let tableVal = [];

    for (const element of lemmaArray) {
      let info = {
        col1: "",
        col2: [[], [], [], []],
        col3: 0,
        col4: 0
      }
      info.col1 = <span className="word"
                        onClick={() => setLemma(element.lemma)}>{element.lemma}</span>;
      for (let value of element.forms) {
        info.col2[0].push(value.form);
        info.col2[1].push("(" + value.ids.length + "), ");
        info.col2[3].push(value.ids[0]);
      }
      info.col3 = element.count;
      info.col2[1][info.col2[1].length - 1] = info.col2[1][info.col2[1].length - 1].slice(0, -2);
      info.col4 = (element.count * 100 / words.length).toFixed(2);
      tableVal.push(info);
    }
    return tableVal;
  }

  const columns = useMemo(() => [
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
            let id = items[3][i]
            let content = (
              <span key={uuidv4()}>
                    <span className="word"
                          onClick={() => setWord(id)}>{word}</span>{String.fromCharCode(160)}{count}
                    </span>
            )
            cellContent.push(content)
          }
          return <ToggleCell onCellContent={cellContent}/>
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
    [t, setWord]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => fillData(), []);

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
      sortBy: [
        {
          id: "sagedus",
          desc: true
        }
      ]
    }
  }, useFilters, useSortBy, usePagination);


  return (
    <>
      <Box>
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
  );
}

export default LemmaView;
