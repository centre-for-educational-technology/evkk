import React, {useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Modal,
  Typography
} from '@mui/material';
import {usePagination, useTable} from 'react-table';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/QueryResults.css';
import {
  ageOptions,
  corpuses,
  countryOptions,
  educationOptions,
  genderOptions,
  languageOptions,
  modalStyle,
  textLanguageOptions,
  textTypes,
  usedMaterialsOptions
} from '../../utils/constants';
import TablePagination from '../../components/table/TablePagination';
import QueryDownloadButton from './QueryDownloadButton';
import LoadingButton from '@mui/lab/LoadingButton';
import {queryStore} from '../../store/QueryStore';
import {loadFetch} from '../../service/LoadFetch';
import {useTranslation} from 'react-i18next';

export default function QueryResults(props) {

  const {t} = useTranslation();
  const response = props.data;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAccordionExpanded, setModalAccordionExpanded] = useState(false);
  const [resultAccordionExpanded, setResultAccordionExpanded] = useState(false);
  const [text, setText] = useState('');
  const [isLoadingSelectAllTexts, setIsLoadingSelectAllTexts] = useState(false);
  const checkboxStatuses = useRef(new Set());
  const [update, forceUpdate] = useReducer(x => x + 1, 0);
  const data = useMemo(() => response, [response]);
  let paragraphCount = 0;

  const [metadata, setMetadata] = useState({
    title: '',
    korpus: '',
    tekstityyp: '',
    tekstikeel: '',
    keeletase: '',
    abivahendid: '',
    aasta: '',
    vanus: '',
    sugu: '',
    haridus: '',
    emakeel: '',
    elukohariik: ''
  });

  const columns = useMemo(() => [
      {
        Header: '',
        accessor: 'text_id',
        Cell: (cellProps) => {
          return <Checkbox style={{color: "#9C27B0"}}
                           checked={checkboxStatuses.current.has(cellProps.value)}
                           id={cellProps.value}
                           onChange={() => alterCheckbox(cellProps.value)}/>;
        },
        className: 'checkbox-row'
      },
      {
        Header: '',
        accessor: 'property_value',
        Cell: (cellProps) => {
          return <span className="clickable-row"
                       onClick={() => previewText(cellProps.row.original.text_id)}>{cellProps.value}</span>;
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
    state: {pageIndex, pageSize}
  } =
    useTable({columns, data}, usePagination);

  const allTextIds = data.map(item => {
    return item.text_id;
  });

  const changeModalAccordion = () => {
    setModalAccordionExpanded(!modalAccordionExpanded);
  };

  const changeResultAccordion = () => {
    setResultAccordionExpanded(!resultAccordionExpanded);
  };

  const alterCheckbox = (id) => {
    if (checkboxStatuses.current.has(id)) {
      checkboxStatuses.current.delete(id);
    } else {
      checkboxStatuses.current.add(id);
    }
    forceUpdate();
  };

  function previewText(id) {
    loadFetch('/api/texts/kysitekstimetainfo?id=' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((result) => {
        result.forEach(param => {
          setIndividualMetadata(param.property_name, param.property_value);
        });
      });

    loadFetch('/api/texts/kysitekst?id=' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.text())
      .then((result) => {
        setText(result);
      });

    setModalOpen(true);
  }

  const setIndividualMetadata = (keyName, valueName) => {
    setMetadata(prevData => {
      return {
        ...prevData,
        [keyName]: valueName
      };
    });
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

  useEffect(() => {
    setResultAccordionExpanded(response.length > 0);
  }, [response]);

  function allTextsSelected() {
    return allTextIds.every(v => Array.from(checkboxStatuses.current).includes(v));
  }

  const saveTexts = () => {
    queryStore.dispatch({
      type: 'CHANGE_CORPUS_TEXTS',
      value: Array.from(checkboxStatuses.current).join(',')
    });
    setResultAccordionExpanded(false);
  };

  const getParagraphKey = (item) => {
    if (item) {
      return item;
    } else {
      paragraphCount++;
      return `empty_paragraph_${paragraphCount}`;
    }
  };

  return (
    <>
      {response.length > 0 ? <h4><strong>{t('query_results_found_texts')}</strong> {response.length}</h4> : <></>}
      {response.length > 0 &&
        <>
          <LoadingButton
            variant="outlined"
            loadingIndicator={<CircularProgress disableShrink color="inherit" size={16}/>}
            loading={isLoadingSelectAllTexts}
            disabled={isLoadingSelectAllTexts}
            className="select-all-button"
            onClick={() => setIsLoadingSelectAllTexts(true)}
          >
            {allTextsSelected() ? t('query_results_unselect_all') : t('query_results_select_all')}
          </LoadingButton>
          <Button
            variant="contained"
            disabled={checkboxStatuses.current.size === 0}
            onClick={() => {
              saveTexts();
              props.setFilterBoxClass()
            }}
            className="save-texts-button"
          >
            {t('query_results_save_texts_for_analysis')}
          </Button>
          <QueryDownloadButton selected={checkboxStatuses.current}/>
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
                      <td {...cell.getCellProps({
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
          <br/>
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
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Box sx={modalStyle}>
          <div className="modal-head">
            {metadata.title}
          </div>
          <IconButton
            aria-label="close"
            onClick={() => {
              setModalOpen(false);
            }}
            className="close-button"
          >
            <CloseIcon/>
          </IconButton>
          <br/>
          <div>
            <Accordion
              expanded={modalAccordionExpanded}
              onChange={changeModalAccordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                id="filters-header"
              >
                <Typography>
                  {t('query_results_preview_metadata_modal_title')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="metainfo-subtitle">{t('common_text_data')}</div>
                <strong>{t('query_subcorpus')}:</strong> {t(corpuses[metadata.korpus]) || '-'}<br/>
                <strong>{t('query_text_data_type')}:</strong> {t(textTypes[metadata.tekstityyp]) || '-'}<br/>
                <strong>{t('query_text_data_language')}:</strong> {t(textLanguageOptions[metadata.tekstikeel]) || '-'}<br/>
                <strong>{t('query_text_data_level')}:</strong> {metadata.keeletase || '-'}<br/>
                <strong>{t('query_text_data_used_supporting_materials')}:</strong> {t(usedMaterialsOptions[metadata.abivahendid]) || '-'}<br/>
                <strong>{t('query_text_data_year_of_publication')}:</strong> {metadata.aasta || '-'}<br/>
                <br/>
                <div className="metainfoSubtitle">{t('common_author_data')}</div>
                <strong>{t('query_author_data_age')}:</strong> {t(ageOptions[metadata.vanus]) || '-'}<br/>
                <strong>{t('query_author_data_gender')}:</strong> {t(genderOptions[metadata.sugu]) || '-'}<br/>
                <strong>{t('query_author_data_education')}:</strong> {t(educationOptions[metadata.haridus]) || '-'}<br/>
                <strong>{t('query_author_data_native_language')}:</strong> {t(languageOptions[metadata.emakeel]) || '-'}<br/>
                <strong>{t('query_author_data_country')}:</strong> {t(countryOptions[metadata.elukohariik]) || '-'}<br/>
              </AccordionDetails>
            </Accordion>
            <br/>
            {text.split(/\\n/g).map(function (item) {
              return (
                <span key={getParagraphKey(item)}>
                    {item}
                  <br/>
                  </span>
              );
            })}
          </div>
        </Box>
      </Modal>
    </>
  );
}
