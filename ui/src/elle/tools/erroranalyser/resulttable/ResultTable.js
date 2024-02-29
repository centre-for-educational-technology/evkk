import { useMemo, useState } from 'react';
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
import { visuallyHidden } from '@mui/utils';
import TablePaginationActions from './TablePaginationActions';
import { usePagination } from './usePagination';
import CorrectedSentenceCell from './CorrectedSentenceCell';
import './../ErrorAnalyser.css';
import useQueryResultDetails from '../../../pages/query/useQueryResultDetails';
import QueryResultDetails from '../../../pages/query/QueryResultDetails';
import { useTranslation } from 'react-i18next';
import {
  ageOptions,
  educationOptions,
  languageOptions,
  nationalityOptions,
  textPublishSubTextTypesOptions,
  errorTypeOptionsShort,
} from '../../../const/Constants';

export default function ResultTable({ data: rows }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const {
    page,
    rowsPerPage,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(rows);
  const { previewText, metadata, text, sentence, modalOpen, setModalOpen } =
    useQueryResultDetails();
  const { t } = useTranslation();

  const headCells = [
    {
      id: 'source_sentence',
      sortable: false,
      label: 'error_analyser_source_sentence',
    },
    {
      id: 'corrected_sentence',
      sortable: false,
      label: 'error_analyser_corrected_sentence',
    },
    {
      id: 'error_type',
      sortable: false,
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
      id: 'nativeLanguage',
      sortable: true,
      label: 'error_analyser_authors_native_language',
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

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const displayErrorTypes = (errorTypes) => {
    const extractedErrorTypes = [];
    for (const [errorType, errorCount] of Object.entries(errorTypes)) {
      extractedErrorTypes.push(
        <div key={errorType}>
          {t(errorTypeOptionsShort[errorType]).toLowerCase()} ({errorCount}){' '}
        </div>
      );
    }
    return extractedErrorTypes;
  };

  function descendingComparator(a, b, orderBy) {
    if (orderBy === 'languageLevel') {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    if (
      orderBy === 'textType' ||
      orderBy === 'nativeLanguage' ||
      orderBy === 'education' ||
      orderBy === 'citizenship'
    ) {
      let options;
      switch (orderBy) {
        case 'nativeLanguage':
          options = languageOptions;
          break;
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

    /*
      
                    {row.age
                      ? row.age
                      : row.ageRange
                      ? t(ageOptions[row.ageRange])
    */

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
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <TableContainer component={Paper} className="result-table-container">
        <Table className="result-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {t(headCell.label)}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    <>{t(headCell.label)}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, index) => {
              return (
                <TableRow key={row.sentenceId}>
                  <TableCell component="th" scope="row">
                    <Box
                      className="clickable"
                      onClick={() => previewText(row.textId, row.sentence)}
                    >
                      {row.sentence}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {
                      <CorrectedSentenceCell
                        sentence={row.sentence}
                        annotations={row.annotations}
                      />
                    }
                  </TableCell>
                  <TableCell>{displayErrorTypes(row.errorTypes)}</TableCell>
                  <TableCell>{row.languageLevel}</TableCell>
                  <TableCell>
                    {row.textType
                      ? t(
                          textPublishSubTextTypesOptions[row.textType]
                        ).toLowerCase()
                      : '–'}
                  </TableCell>
                  <TableCell>
                    {row.nativeLanguage
                      ? t(languageOptions[row.nativeLanguage])
                      : '–'}
                  </TableCell>
                  <TableCell>
                    {row.education ? t(educationOptions[row.education]) : '–'}
                  </TableCell>
                  <TableCell>
                    {row.citizenship
                      ? t(nationalityOptions[row.citizenship])
                      : '–'}
                  </TableCell>
                  <TableCell>
                    {row.age
                      ? row.age
                      : row.ageRange
                      ? t(ageOptions[row.ageRange])
                      : '–'}
                  </TableCell>
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
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
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
