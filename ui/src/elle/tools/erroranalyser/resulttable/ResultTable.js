import { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TableFooter,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import TablePaginationActions from './TablePaginationActions';
import { usePagination } from './usePagination';
import CorrectedSentenceCell from './CorrectedSentenceCell';
import ErrorTypeCell from './ErrorTypeCell';
import './../ErrorAnalyser.css';
import useQueryResultDetails from '../../../pages/query/useQueryResultDetails';
import QueryResultDetails from '../../../pages/query/QueryResultDetails';
import { useTranslation } from 'react-i18next';
import {
  ageOptions,
  educationOptions,
  nationalityOptions,
  textPublishSubTextTypesOptions
} from '../../../const/Constants';
import { Sort } from '@mui/icons-material';

export default function ResultTable({ data: rows, filters, showAllErrors }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [isColumnVisible, setIsColumnVisible] = useState({
    sourceSentence: true,
    correctedSentence: true,
    errorType: false,
    languageLevel: false,
    textType: false,
    education: false,
    citizenship: false,
    age: false,
  });
  const {
    page,
    rowsPerPage,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(rows);
  const { previewText, metadata, text, sentence, modalOpen, setModalOpen } = useQueryResultDetails();
  const { t } = useTranslation();

  const headCells = [
    {
      id: 'sourceSentence',
      sortable: false,
      label: 'error_analyser_source_sentence',
    },
    {
      id: 'correctedSentence',
      sortable: false,
      label: 'error_analyser_corrected_sentence',
    },
    {
      id: 'errorType',
      sortable: true,
      label: 'error_analyser_error_type',
    },
    {
      id: 'languageLevel',
      sortable: true,
      label: 'error_analyser_language_level',
    },
    {
      id: 'textType',
      sortable: true,
      label: 'error_analyser_text_type',
    },
    {
      id: 'education',
      sortable: true,
      label: 'error_analyser_authors_education',
    },
    {
      id: 'citizenship',
      sortable: true,
      label: 'error_analyser_authors_citizenship',
    },
    {
      id: 'age',
      sortable: true,
      label: 'error_analyser_authors_age',
    },
  ];

  useEffect(() => {
    let visibility = { ...isColumnVisible };
    for (const key in visibility) {
      if (
        key === 'sourceSentence' ||
        key === 'correctedSentence'
      ) {
        visibility[key] = true;
      } else {
        visibility[key] = !!(filters[key] && filters[key].length > 1);
      }
    }
    setIsColumnVisible(visibility);
  }, []);

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (orderBy === 'errorType') {
      orderBy = 'queriedErrorTypeCount';
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
    }

    if (orderBy === 'languageLevel') {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
    }

    if (
      orderBy === 'textType' ||
      orderBy === 'education' ||
      orderBy === 'citizenship'
    ) {
      let options;
      switch (orderBy) {
        case 'education':
          options = educationOptions;
          break;
        case 'citizenship':
          options = nationalityOptions;
          break;
        default: //textType
          options = textPublishSubTextTypesOptions;
      }

      if (t(options[b[orderBy]]) < t(options[a[orderBy]])) {
        return -1;
      }
      if (t(options[b[orderBy]]) > t(options[a[orderBy]])) {
        return 1;
      }
      return 0;
    }

    if (orderBy === 'age') {
      const ageA = a['age'] ? a['age'] : t(ageOptions[a['ageRange']]);
      const ageB = b['age'] ? b['age'] : t(ageOptions[b['ageRange']]);

      if (ageB < ageA) {
        return -1;
      }
      if (ageB > ageA) {
        return 1;
      }
      return 0;
    }
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage]
  );

  const formatSentence = (sentence) => {
    const punctuationPattern = /\s+([.,!?:;])/g;
    let formattedSentence = sentence.replace(punctuationPattern, '$1');
    const quotesPattern = /"(.*?)"/g;
    formattedSentence = formattedSentence.replace(
      quotesPattern,
      (match, capturedGroup) => `"${capturedGroup.slice(1, -1)}"`
    );
    return formattedSentence;
  };

  return (
    <>
      <TableContainer component={Paper} className="result-table-container">
        <Table className="result-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map(
                (headCell) =>
                  isColumnVisible[headCell.id] && (
                    <TableCell
                      sx={{ fontWeight: '900' }}
                      key={headCell.id}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      {headCell.sortable ? (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={createSortHandler(headCell.id)}
                          hideSortIcon={true}
                        >
                          {t(headCell.label)}
                          {orderBy !== headCell.id && <Sort sx={{ mx: '4px', fontSize: '18px' }} />}
                        </TableSortLabel>
                      ) : (
                        <>{t(headCell.label)}</>
                      )}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => {
              const formattedSentence = formatSentence(row.sentence);
              return (
                <TableRow key={row.sentenceId} style={{ height: '100%', verticalAlign: 'top' }}>
                  <TableCell>
                    <Box
                      className="clickable"
                      onClick={() => previewText(row.textId, formattedSentence)}
                    >
                      {formattedSentence}
                    </Box>
                  </TableCell>
                  <TableCell style={{ height: '100%' }}>
                    <div className="nested-cell-wrapper">
                      {
                        <CorrectedSentenceCell
                          sentence={row.sentence}
                          annotationVersions={row.annotationVersions}
                          showAllErrors={showAllErrors}
                          filters={filters}
                        />
                      }
                    </div>
                  </TableCell>
                  {isColumnVisible['errorType'] && (
                    <TableCell style={{ height: '100%' }}>
                      <div className="nested-cell-wrapper">
                        {
                          <ErrorTypeCell
                            annotationVersions={row.annotationVersions}
                            showAllErrors={showAllErrors}
                            queriedErrorTypes={filters.errorType} />
                        }
                      </div>
                    </TableCell>
                  )}
                  {isColumnVisible['languageLevel'] && (
                    <TableCell>
                      {row.languageLevel}
                    </TableCell>
                  )}
                  {isColumnVisible['textType'] && (
                    <TableCell>
                      {row.textType
                        ? t(
                          textPublishSubTextTypesOptions[row.textType]
                        ).toLowerCase()
                        : '–'}
                    </TableCell>
                  )}
                  {isColumnVisible['education'] && (
                    <TableCell>
                      {row.education ? t(educationOptions[row.education]) : '–'}
                    </TableCell>
                  )}
                  {isColumnVisible['citizenship'] && (
                    <TableCell>
                      {row.citizenship
                        ? t(nationalityOptions[row.citizenship])
                        : '–'}
                    </TableCell>
                  )}
                  {isColumnVisible['age'] && (
                    <TableCell>
                      {row.age
                        ? row.age
                        : row.ageRange
                          ? t(ageOptions[row.ageRange])
                          : '–'}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: t('error_analyser_table_footer_all'), value: -1 }]}
                labelRowsPerPage={t('error_analyser_table_footer_rows_per_page')}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                labelDisplayedRows={function ({ from, to, count }) {
                  return `${from}–${to} / ${count !== -1 ? count : `more than ${to}`}`;
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <QueryResultDetails
        metadata={metadata}
        text={text}
        sentence={sentence}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
}
