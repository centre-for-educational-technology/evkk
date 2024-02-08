import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./TablePaginationActions";
import { TableFooter, TablePagination } from "@mui/material";
import { usePagination } from "./usePagination";
import CorrectedSentenceCell from "./CorrectedSentenceCell";

export default function ErrorTable({ errorData: rows }) {
  const {
    page,
    rowsPerPage,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(rows);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Algne lause</TableCell>
            <TableCell>Parandatud lause</TableCell>
            <TableCell>Keeletase</TableCell>
            <TableCell>Emakeel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow
              key={row.sentenceId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sentence}
              </TableCell>
              <TableCell>
                {
                  <CorrectedSentenceCell
                    sentence={row.sentence}
                    annotations={row.annotations}
                  />
                }
              </TableCell>
              <TableCell>{row.languageLevel}</TableCell>
              <TableCell></TableCell>
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
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
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
  );
}
