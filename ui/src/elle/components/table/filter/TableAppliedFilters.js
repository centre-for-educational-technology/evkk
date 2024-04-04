import { Box, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function TableAppliedFilters({ appliedFilters }) {

  const { t } = useTranslation();

  const getAppliedFilters = () => {
    if (appliedFilters !== []) {
      return appliedFilters.map((value) =>
        <Chip sx={{ marginRight: '5px' }}
              key={value}
              label={value} />
      );
    }
  };

  return appliedFilters !== [] ?
    <Box>
      {t('applied_filters')}: {getAppliedFilters()}
    </Box>
    : null;
}
