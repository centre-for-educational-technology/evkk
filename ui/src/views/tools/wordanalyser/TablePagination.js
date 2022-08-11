import {Button, ButtonGroup, MenuItem, Select, TextField} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import React from "react";

function TablePagination({
                           gotoPage,
                           previousPage,
                           canPreviousPage,
                           nextPage,
                           canNextPage,
                           pageIndex,
                           pageOptions,
                           pageSize,
                           setPageSize,
                           pageCount
                         }) {
  return (
    <div className="pagination">
      <div className='buttongroup'>
        <ButtonGroup size='medium' fullWidth variant="contained" aria-label="outlined primary button group">
          <Button variant='contained' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {<FirstPageIcon/>}
          </Button>{' '}
          <Button variant='contained' onClick={() => previousPage()} disabled={!canPreviousPage}>
            {<NavigateBeforeIcon/>}
          </Button>{' '}
          <Button variant='contained' onClick={() => nextPage()} disabled={!canNextPage}>
            {<NavigateNextIcon/>}
          </Button>{' '}
          <Button variant='contained' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {<LastPageIcon/>}
          </Button>{' '}
        </ButtonGroup>
      </div>
      <span className='fontStyle'>
          Leht{' '}
        <strong>
            {pageIndex + 1} / {pageOptions.length}
          </strong>{' '}
        </span>
      <TextField
        size='small'
        id="outlined-number"
        label="Mine lehele nr:"
        type="number"
        defaultValue={pageIndex + 1}
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          gotoPage(page)
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Select
        size='small'
        value={pageSize}
        variant='outlined'
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[5, 10, 20, 30, 40, 50, 100].map(pageSize => (
          <MenuItem key={pageSize} value={pageSize}>{pageSize}</MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default TablePagination;
