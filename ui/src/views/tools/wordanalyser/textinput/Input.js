import {InputText} from './InputText';
import {useEffect, useState} from 'react';
import {Alert, Button, Grid} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useTranslation} from "react-i18next";
import "../../../../translations/i18n";

export const Input = ({onInsert, onAnalyse, onMarkWords, onWordSelect, onWordInfo, onReset, textFromFile}) => {
  const [input, setInput] = useState('');
  const [selectedWords, setSelectedWords] = useState(onMarkWords);
  const [showAnalyseBtn, setShowAnalyseBtn] = useState(true);
  const [showResetBtn, setShowResetBtn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [textTooLong, setTextTooLong] = useState(false);
  const {t} = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
    setTextTooLong(false);
    setShowAlert(false);
    if (input.replaceAll(/[^a-zA-ZõäüöÕÄÖÜ0-9]/g, ' ').replaceAll(/\s+/g, ' ').split(' ').length > 1020) {
      setTextTooLong(true);
    } else if (input.length > 0) {
      setShowAnalyseBtn(false);
      onInsert(input);
      setShowLoading(true);
    } else {
      setShowAlert(true);
    }
  }

  useEffect(() => {
    if (JSON.stringify(selectedWords) !== JSON.stringify(onMarkWords)) {
      setSelectedWords(onMarkWords);
    }
  }, [onMarkWords, selectedWords]);

  useEffect(() => {
    setShowLoading(false);
    if (onAnalyse.ids[0].length > 0) {
      setShowResetBtn(true);
    }
  }, [onAnalyse]);

  const resetAnalyser = () => {
    setShowAnalyseBtn(true);
    setShowResetBtn(false);
    setInput('');
    onReset();
  }

  useEffect(() => {
    setInput(textFromFile);
  }, [textFromFile]);

  //Tekst on analüüsi kuvamiseks liiga pikk kui on üle 1000 sõna

  return (
    <div className="containerItem">
      {showAnalyseBtn ?
        <form>
          <label className="textInputContainer">
            <textarea className='textInput'
                      name='textInput'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}/>
          </label>
          <Button variant="contained"
                  onClick={onSubmit}>{t("analyse_button")}</Button>
          {showAlert &&
            <span>
              <br/><br/>
              <Alert severity="warning">{t("error_no_text")}</Alert>
            </span>
          }
          {textTooLong &&
            <Grid item
                  xs={12}
                  md={12}>
              <br/>
              <Alert severity="warning">{t("error_text_too_long")}</Alert>
            </Grid>
          }
        </form>
        :
        <InputText onMarkWords={onMarkWords}
                   onWordSelect={onWordSelect}
                   onAnalyse={onAnalyse}
                   onWordInfo={onWordInfo}/>
      }
      {showLoading && <LoadingButton loading
                                     variant="outlined">{t("analyse_button")}</LoadingButton>}
      {showResetBtn && <Button variant="contained"
                               className="mainBtn"
                               onClick={resetAnalyser}>{t("reset_button")}</Button>}
    </div>
  )
}
