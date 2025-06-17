import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next'

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (typeof onSearch === 'function') {
      onSearch(trimmed);
    }

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mt: 6,
        mb: 4,
        px: 2,
        width: '100%',
        maxWidth: '1000px',
        mx: 'auto',
      }}
    >
      <TextField
        fullWidth
        placeholder={t('search')}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        variant="outlined"
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2,
          maxWidth: 600,
          '& input': { fontSize: '1.2rem', textAlign: 'center' },
          '& .MuiOutlinedInput-root': {
            height: 56,
            borderRadius: 2,
            '& fieldset': { borderColor: '#a22bb9' },
            '&:hover fieldset': { borderColor: '#9025a1' },
            '&.Mui-focused fieldset': { borderColor: '#9025a1' },
          },
        }}
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          height: 56,
          px: 6,
          fontSize: '1rem',
          borderRadius: 2,
          textTransform: 'none',
          backgroundColor: '#a22bb9',
          '&:hover': { backgroundColor: '#9025a1' },
        }}
      >
        {t('search_button')}
      </Button>
    </Box>
  );
}
