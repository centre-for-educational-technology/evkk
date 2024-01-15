import { InputText } from './InputText';
import { useContext, useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { AnalyseContext, TabContext } from '../Contexts';
import { DefaultButtonStyle, DefaultCircularProgressStyle } from '../../../const/Constants';

export const Input = ({onInsert, onMarkWords, onWordSelect, onWordInfo, onReset, textFromFile}) => {
  const [input, setInput] = useState(textFromFile);
  const [selectedWords, setSelectedWords] = useState(onMarkWords);
  const [showAnalyseBtn, setShowAnalyseBtn] = useState(true);
  const [showResetBtn, setShowResetBtn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [textTooLong, setTextTooLong] = useState(false);
  const analyse = useContext(AnalyseContext)[0];
  const {t} = useTranslation();
  const setTableValue = useContext(TabContext)[1];

  const onSubmit = () => {
    setTextTooLong(false);
    setShowAlert(false);
    if (textFromFile.replaceAll(/[^a-zA-ZõäüöÕÄÖÜ0-9]/g, ' ').replaceAll(/\s+/g, ' ').split(' ').length > 1020) {
      setTextTooLong(true);
    } else if (textFromFile.length > 0) {
      setShowAnalyseBtn(false);
      onInsert(textFromFile);
      setShowLoading(true);
    } else {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (textFromFile) {
      onSubmit();
    }
  }, [textFromFile]);

  useEffect(() => {
    if (JSON.stringify(selectedWords) !== JSON.stringify(onMarkWords)) {
      setSelectedWords(onMarkWords);
    }
  }, [onMarkWords, selectedWords]);

  useEffect(() => {
    setShowLoading(false);
    if (analyse.ids[0].length > 0) {
      setShowResetBtn(true);
    }
  }, [analyse]);

  const resetAnalyser = () => {
    setTableValue(0);
    setShowAnalyseBtn(true);
    setShowResetBtn(false);
    setInput('');
    onReset();
  };

  useEffect(() => {
    setInput(textFromFile);
  }, [textFromFile]);

  //Tekst on analüüsi kuvamiseks liiga pikk kui on üle 1000 sõna

  return (
    <div className="containerItem">
      {/*<form hidden>
          <label className="textInputContainer">
            <textarea spellCheck="false"
                      className="textInput"
                      name="textInput"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}/>
          </label>
          <Button sx={DefaultButtonStyle}
                  variant="contained"
                  onClick={onSubmit}>{t('analyse_button')}</Button>
          {showAlert &&
            <span>
              <br/><br/>
              <Alert severity="warning">{t('error_no_text')}</Alert>
            </span>
          }
          {textTooLong &&
            <Grid item
                  xs={12}
                  md={12}>
              <br/>
              <Alert severity="warning">{t('error_text_too_long')}</Alert>
            </Grid>
          }
        </form>*/}
      {showLoading && !textTooLong ?
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <CircularProgress style={DefaultCircularProgressStyle} size={'5rem'}/></div>
        :
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
          <br/>
          <Alert severity="warning">{t('error_text_too_long')}</Alert>
        </Grid>
      }
      {showLoading && <LoadingButton hidden sx={DefaultButtonStyle}
                                     loading
                                     variant="outlined">{t('analyse_button')}</LoadingButton>}
      {showResetBtn && <Button hidden sx={DefaultButtonStyle}
                               variant="contained"
                               className="mainBtn"
                               onClick={resetAnalyser}>{t('reset_button')}</Button>}
    </div>
  );
};
