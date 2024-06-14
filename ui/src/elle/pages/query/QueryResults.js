import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { usePagination, useTable } from 'react-table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/QueryResults.css';
import {
  DefaultButtonStyle,
} from '../../const/Constants';
import TablePagination from '../../components/table/TablePagination';
import QueryDownloadButton from './QueryDownloadButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { queryStore, QueryStoreActionType } from '../../store/QueryStore';
import { useTranslation } from 'react-i18next';
import QueryResultDetails from './QueryResultDetails';
import useQueryResultDetails from './useQueryResultDetails';

export default function QueryResults(props) {
  const { t } = useTranslation();
  const response = props.data;
  const [isLoadingSelectAllTexts, setIsLoadingSelectAllTexts] = useState(false);
  const checkboxStatuses = useRef(new Set());
  const [update, forceUpdate] = useReducer(x => x + 1, 0);
  const data = useMemo(() => response, [response]);


  const { previewText, metadata, text, modalOpen, setModalOpen } =
    useQueryResultDetails();

  useEffect(() => {
    if (props.previousSelectedIds.size > 0) {
      props.data.forEach((d) => {
        if (props.previousSelectedIds.has(d.text_id)) {
          checkboxStatuses.current.add(d.text_id);
        }
      });
    }
    forceUpdate();
  }, [props.data, props.previousSelectedIds]);

  const columns = useMemo(() => [
      {
        Header: '',
        accessor: 'text_id',
        Cell: (cellProps) => {
          return (
            <Checkbox
              style={{ color: '#9C27B0' }}
              checked={checkboxStatuses.current.has(cellProps.value)}
              id={cellProps.value}
              onChange={() => alterCheckbox(cellProps.value)}
            />
          );
        },
        className: 'checkbox-row'
      },
      {
        Header: '',
        accessor: 'property_value',
        Cell: (cellProps) => {
          return (
            <span className="clickable-row"
                  onClick={() => previewText(cellProps.row.original.text_id)}>{cellProps.value}</span>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
    state: { pageIndex, pageSize }
  } =
    useTable({ columns, data }, usePagination);

  const allTextIds = data.map(item => {
    return item.text_id;
  });

  const alterCheckbox = (id) => {
    if (checkboxStatuses.current.has(id)) {
      checkboxStatuses.current.delete(id);
    } else {
      checkboxStatuses.current.add(id);
    }
    forceUpdate();
  };

  useEffect(() => {
    setIsLoadingSelectAllTexts(false);
  }, [update]);

  useEffect(() => {
    if (isLoadingSelectAllTexts) {
      if (allTextsSelected()) {
        checkboxStatuses.current.clear();
      } else {
        checkboxStatuses.current.clear();
        allTextIds.forEach(item => {
          checkboxStatuses.current.add(item);
        });
      }
      forceUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingSelectAllTexts]);

  function allTextsSelected() {
    return allTextIds.every(v => Array.from(checkboxStatuses.current).includes(v));
  }

  const saveTexts = () => {
    queryStore.dispatch({
      type: QueryStoreActionType.CHANGE_CORPUS_TEXTS,
      value: Array.from(checkboxStatuses.current).join(',')
    });
  };

  return (
    <>
      {response.length > 0 ? <h4><strong>{t('query_results_found_texts')}</strong> {response.length}</h4> : <></>}
      {response.length > 0 &&
        <>
          <div>
            <Button style={{ color: 'white' }} startIcon={<ArrowBackIcon />} sx={DefaultButtonStyle}
                    onClick={() => {
                      props.setIsQueryAnswerPage(prevState => !prevState);
                      props.setPreviousSelectedIds(checkboxStatuses.current);
                    }}>{t('query_change_chosen_corpuses')}</Button>
          </div>
          <LoadingButton
            variant="outlined"
            loadingIndicator={<CircularProgress disableShrink color="inherit" size={16} />}
            loading={isLoadingSelectAllTexts}
            disabled={isLoadingSelectAllTexts}
            className="select-all-button"
            onClick={() => setIsLoadingSelectAllTexts(true)}
          >
            {allTextsSelected() ? t('query_results_unselect_all') : t('query_results_select_all')}
          </LoadingButton>
          <Button
            sx={DefaultButtonStyle}
            variant="contained"
            disabled={checkboxStatuses.current.size === 0}
            onClick={() => {
              saveTexts();
              props.setFilterBoxClass();
            }}
            className="save-texts-button"
          >
            {t('query_results_save_texts_for_analysis')}
          </Button>
          <QueryDownloadButton selected={checkboxStatuses.current} />
          <table className="result-table"
                 {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row, _i) => {
              prepareRow(row);
              return (
                <tr
                  className="query-table-row border"
                  {...row.getRowProps()}
                  key={row.values.text_id}
                  id={row.values.text_id}>
                  {row.cells.map(cell => {
                    return (
                      <td{...cell.getCellProps({
                        className: cell.column.className
                      })}>

                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            </tbody>
          </table>
          <br />
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
      }
      <QueryResultDetails
        metadata={metadata}
        text={text}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
}
