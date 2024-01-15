import { InputText } from './InputText';
import { useContext, useEffect, useState } from 'react';
import { Alert, CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { AnalyseContext, TabContext } from '../Contexts';
import { DefaultCircularProgressStyle } from '../../../const/Constants';

export const Input = ({onInsert, onMarkWords, onWordSelect, onWordInfo, onReset, inputText}) => {
  const [selectedWords, setSelectedWords] = useState(onMarkWords);
  const [showLoading, setShowLoading] = useState(false);
  const [textTooLong, setTextTooLong] = useState(false);
  const analyse = useContext(AnalyseContext)[0];
  const {t} = useTranslation();
  const setTableValue = useContext(TabContext)[1];

  const onSubmit = () => {
    setTextTooLong(false);
    if (inputText.replaceAll(/[^a-zA-ZõäüöÕÄÖÜ0-9]/g, ' ').replaceAll(/\s+/g, ' ').split(' ').length > 1020) {
      setTextTooLong(true);
    } else if (inputText.length > 0) {
      setShowLoading(true);
      onInsert(inputText);
    }
  };

  useEffect(() => {
    if (inputText) {
      resetAnalyser();
      onSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  useEffect(() => {
    if (JSON.stringify(selectedWords) !== JSON.stringify(onMarkWords)) {
      setSelectedWords(onMarkWords);
    }
  }, [onMarkWords, selectedWords]);

  useEffect(() => {
    setShowLoading(analyse.text.length === 0);
  }, [analyse]);

  const resetAnalyser = () => {
    setTableValue(0);
    onReset();
  };

  return (
    <div className="containerItem">
      {showLoading && !textTooLong &&
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <CircularProgress style={DefaultCircularProgressStyle} size={'5rem'} /></div>
      }
      {!textTooLong && !showLoading &&
        <InputText
          onMarkWords={onMarkWords}
          onWordSelect={onWordSelect}
          onWordInfo={onWordInfo}
        />
      }
      {textTooLong &&
        <Grid item
              xs={12}
              md={12}>
          <br />
          <Alert severity="warning">{t('error_text_too_long')}</Alert>
        </Grid>
      }
    </div>
  );
};
