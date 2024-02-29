import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from './TablePaginationActions';
import { Box, TableFooter, TablePagination } from '@mui/material';
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
  textTypesOptions,
  textPublishSubTextTypesOptions,
} from '../../../const/Constants';

export default function ResultTable({ data: rows }) {
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

  const extractErrorTypes = (annotations) => {
    return ['R:LEX'];
  };

  return (
    <>
      <TableContainer component={Paper} className="result-table-container">
        <Table className="result-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('error_analyser_source_sentence')}</TableCell>
              <TableCell>{t('error_analyser_corrected_sentence')}</TableCell>
              <TableCell>{t('error_analyser_error_type')}</TableCell>
              <TableCell>{t('error_analyser_language_level')}</TableCell>
              <TableCell>{t('error_analyser_text_type')}</TableCell>
              <TableCell>
                {t('error_analyser_authors_native_language')}
              </TableCell>
              <TableCell>{t('error_analyser_authors_education')}</TableCell>
              <TableCell>{t('error_analyser_authors_citizenship')}</TableCell>
              <TableCell>{t('error_analyser_authors_age')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow
                key={row.sentenceId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
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
                <TableCell>
                  {t('error_analyser_error_type')}
                  {extractErrorTypes(row.annotations)}
                </TableCell>
                <TableCell>{row.languageLevel}</TableCell>
                <TableCell>
                  {t(
                    textPublishSubTextTypesOptions[row.textType]
                  ).toLowerCase()}
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
            ))}
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
