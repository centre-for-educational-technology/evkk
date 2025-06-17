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
    <Box className="searchbar-container">
      <TextField
        fullWidth
        placeholder={t('search')}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        variant="outlined"
        className="searchbar-input"
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        startIcon={<SearchIcon />}
        className="searchbar-button"
      >
        {t('search_button')}
      </Button>
    </Box>
  );
}
