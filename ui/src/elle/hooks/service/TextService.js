import { queryStore } from '../../store/QueryStore';
import { sanitizeTexts } from '../../util/TextUtils';
import { FetchParseType, useFetch } from '../useFetch';
import { useCallback, useEffect, useState } from 'react';
import { successEmitter } from '../../../App';
import { SuccessSnackbarEventType } from '../../components/snackbar/SuccessSnackbar';
import FileSaver from 'file-saver';

export const useGetSelectedTexts = (setStoreData) => {
  const { fetchData, response } = useFetch();

  const getSelectedTexts = useCallback(() => {
    const queryStoreState = queryStore.getState();
    if (queryStoreState.corpusTextIds) {
      fetchData('/api/texts/kysitekstid', {
        method: 'POST',
        body: JSON.stringify({ ids: queryStoreState.corpusTextIds })
      }, {
        parseType: FetchParseType.TEXT
      });
    } else if (queryStoreState.ownTexts) {
      setStoreData(queryStoreState.ownTexts);
    }
  }, [fetchData, setStoreData]);

  useEffect(() => {
    if (response) {
      const queryStoreState = queryStore.getState();
      let result = response;
      if (queryStoreState.ownTexts) {
        result = result.concat(' ', queryStoreState.ownTexts);
      }
      setStoreData(sanitizeTexts(result));
    }
  }, [response, setStoreData]);

  return { getSelectedTexts };
};

export const useGetTextFromFile = (sendTextFromFile) => {
  const { fetchData, response } = useFetch();

  const getTextFromFile = useCallback((body) => {
    fetchData('/api/textfromfile', {
      method: 'POST',
      body
    }, {
      parseType: FetchParseType.TEXT,
      disableContentTypeJson: true
    }).catch(() => {
      sendTextFromFile('');
    });
  }, [fetchData, sendTextFromFile]);

  useEffect(() => {
    if (response) sendTextFromFile(response);
  }, [response, sendTextFromFile]);

  return { getTextFromFile };
};

export const useAddText = () => {
  const { fetchData } = useFetch();

  const addText = useCallback((body, onComplete) => {
    fetchData('/api/texts/lisatekst', {
      method: 'POST',
      body
    }, {
      parseType: FetchParseType.TEXT
    }).then(() => {
      successEmitter.emit(SuccessSnackbarEventType.GENERIC_SUCCESS);
      if (onComplete) onComplete();
    });
  }, [fetchData]);

  return { addText };
};

export const useGetQueryResults = (setNoResultsError, setResults, setIsQueryAnswerPage) => {
  const { fetchData, response } = useFetch();

  const getQueryResults = useCallback((body) => {
    fetchData('/api/texts/detailneparing', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  useEffect(() => {
    if (response) {
      if (response.length > 0) {
        setNoResultsError(false);
        setResults(response);
        setIsQueryAnswerPage(true);
      } else {
        setNoResultsError(true);
        setResults([]);
      }
    }
  }, [response, setIsQueryAnswerPage, setNoResultsError, setResults]);

  return { getQueryResults };
};

export const useDownloadQueryResults = () => {
  const { fetchData, response } = useFetch();
  const [fileName, setFileName] = useState(null);
  const [fileExtension, setFileExtension] = useState(null);

  const downloadQueryResults = useCallback((form, fileType, fileList, fileName, fileExtension) => {
    setFileName(fileName);
    setFileExtension(fileExtension);

    fetchData('/api/texts/tekstidfailina', {
      method: 'POST',
      body: JSON.stringify({
        form,
        fileType,
        fileList: Array.from(fileList)
      })
    }, {
      parseType: FetchParseType.BLOB
    });
  }, [fetchData]);

  useEffect(() => {
    if (response) FileSaver.saveAs(response, `${fileName}.${fileExtension}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return { downloadQueryResults };
};

export const useGetTextAndMetadata = (setText, setIndividualMetadata) => {
  const { fetchData, response } = useFetch();

  const getTextAndMetadata = useCallback((textId) => {
    fetchData('/api/texts/kysitekstjametainfo?id=' + textId);
  }, [fetchData]);

  useEffect(() => {
    if (response) {
      setText(response.text);
      response.properties.forEach(param => {
        setIndividualMetadata(param.propertyName, param.propertyValue);
      });
    }
  }, [response, setText, setIndividualMetadata]);

  return { getTextAndMetadata };
};
