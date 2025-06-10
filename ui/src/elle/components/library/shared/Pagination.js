import React from 'react';
import { Box, Button } from '@mui/material';

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button variant="outlined" onClick={onPrev} disabled={currentPage === 1}>
        Eelmine
      </Button>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        Leht {currentPage} / {totalPages}
      </span>
      <Button variant="outlined" onClick={onNext} disabled={currentPage === totalPages}>
        Järgmine
      </Button>
    </Box>
  );
}
