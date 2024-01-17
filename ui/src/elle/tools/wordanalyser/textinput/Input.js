import { InputText } from './InputText';
import { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import '../../../translations/i18n';
import { AnalyseContext, TabContext } from '../Contexts';
import { DefaultCircularProgressStyle } from '../../../const/Constants';
import i18n from 'i18next';

export const Input = ({onInsert, onMarkWords, onWordSelect, onWordInfo, onReset, inputText, isTextTooLong}) => {
  const [selectedWords, setSelectedWords] = useState(onMarkWords);
  const [showLoading, setShowLoading] = useState(false);
  const analyse = useContext(AnalyseContext)[0];
  const setTableValue = useContext(TabContext)[1];

  const onSubmit = () => {
    setShowLoading(true);
    onInsert(inputText);
  };

  useEffect(() => {
    resubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, i18n.language]);

  useEffect(() => {
    if (JSON.stringify(selectedWords) !== JSON.stringify(onMarkWords)) {
      setSelectedWords(onMarkWords);
    }
  }, [onMarkWords, selectedWords]);

  useEffect(() => {
    setShowLoading(analyse.text.length === 0);
  }, [analyse]);

  const resubmit = () => {
    if (inputText) {
      resetAnalyser();
      onSubmit();
    }
  };

  const resetAnalyser = () => {
    setTableValue(0);
    onReset();
  };

  if (isTextTooLong) return null;

  return (
    <div>
      {showLoading ?
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <CircularProgress style={DefaultCircularProgressStyle} size={'5rem'} /></div>
        :
        <InputText
          onMarkWords={onMarkWords}
          onWordSelect={onWordSelect}
          onWordInfo={onWordInfo}
        />
      }
    </div>
  );
};
