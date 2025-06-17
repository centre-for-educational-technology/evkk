import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button variant="outlined" onClick={onPrev} disabled={currentPage === 1}>
        {t('paginator_previous')}
      </Button>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {t('paginator_page')} {currentPage} / {totalPages}
      </span>
      <Button variant="outlined" onClick={onNext} disabled={currentPage === totalPages}>
        {t('paginator_next')}
      </Button>
    </Box>
  );
}
