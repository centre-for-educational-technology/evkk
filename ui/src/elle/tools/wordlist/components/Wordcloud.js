import { DefaultButtonStyle } from '../../../const/Constants';
import BrushIcon from '@mui/icons-material/Brush';
import { Button, Tooltip } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Wordcloud() {

  const { t } = useTranslation();

  const handleClick = () => {
    console.log('asd');
  };

  return (
    <Tooltip title={t('wordlist_wordcloud_tooltip')}
             placement="top">
      <Button
        style={DefaultButtonStyle}
        variant="contained"
        onClick={handleClick}
      >
        <BrushIcon fontSize="large" />
      </Button>
    </Tooltip>
  );
}
