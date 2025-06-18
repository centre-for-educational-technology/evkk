import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  const { t } = useTranslation();

  return (
    <Box className="library-pagination">
      <Button
        variant="outlined"
        onClick={onPrev}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        {t('paginator_previous')}
      </Button>
      <span className="pagination-info">
        {t('paginator_page')} {currentPage} / {totalPages}
      </span>
      <Button
        variant="outlined"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        {t('paginator_next')}
      </Button>
    </Box>
  );
}
