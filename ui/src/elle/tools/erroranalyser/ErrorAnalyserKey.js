import { List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export default function ErrorAnalyserKey() {
  const {t} = useTranslation();
  const legendOptions = [
    {
      label: 'error_analyser_word_errors',
      items:
        [{label: 'error_analyser_key_word_error_changed', class: 'word-error'}, {
          label: 'error_analyser_key_word_error_deleted',
          class: 'word-error-deleted'
        }]
    },
    {
      label: 'error_analyser_punctuation',
      items:
        [{label: 'error_analyser_key_punctuation_changed', class: 'punctuation'}, {
          label: 'error_analyser_key_punctuation_deleted',
          class: 'punctuation punctuation-deleted'
        }]
    },
    {
      label: 'error_analyser_r_ws', class: 'white-space'
    },
    {
      label: 'error_analyser_r_wo', class: 'word-order'
    },
    {label: 'error_analyser_compound_errors', class: 'compound-error'}

  ];
  return (
    <Paper sx={{my: '50px', px: '46px', py: '30px', backgroundColor: 'white'}}>
      <Typography variant="h6">{t('error_analyser_key_title')}</Typography>

      <List dense>
        {legendOptions.map((mainTypes, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText children={
              <span className={mainTypes.class}>
                  {t(mainTypes.label)}
                {mainTypes.items && ': '}
                {mainTypes.items && mainTypes.items.map((item, index) => (
                  <Fragment key={index}>
                      <span className={item.class}>
                        {t(item.label)}
                      </span>
                    {(index < mainTypes.items.length - 1) && ', '}
                  </Fragment>
                ))}
                </span>
            } />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
