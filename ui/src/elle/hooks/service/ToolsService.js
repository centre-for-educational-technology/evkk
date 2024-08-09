import { useFetch } from '../useFetch';
import { useCallback, useEffect } from 'react';

export const useGetWordlistResult = (setResponse, setShowTable, setTypeValueToDisplay, typeValue) => {
  const { fetchData, response } = useFetch();

  const getWordlistResult = useCallback((body) => {
    fetchData('/api/tools/wordlist', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  useEffect(() => {
    if (response) {
      setResponse(response.resultList);
      setShowTable(true);
      setTypeValueToDisplay(typeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setResponse, setShowTable, setTypeValueToDisplay]);

  return { getWordlistResult };
};

export const useGetCollocatesResult = (
  setLastKeyword,
  setLemmatizedKeywordResult,
  setResponse,
  setShowTable,
  setParamsExpanded,
  setShowNoResultsError,
  setInitialKeywordResult,
  keyword
) => {
  const { fetchData, response } = useFetch();

  const getCollocatesResult = useCallback((body) => {
    fetchData('/api/tools/collocates', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  useEffect(() => {
    if (response) {
      setLastKeyword(keyword);
      setLemmatizedKeywordResult(null);
      setResponse(response.collocateList);
      if (response.collocateList.length === 0) {
        setShowTable(false);
        setParamsExpanded(true);
        setShowNoResultsError(true);
      } else {
        setShowTable(true);
        setParamsExpanded(false);
        setShowNoResultsError(false);
        if (response.lemmatizedKeyword) {
          setLemmatizedKeywordResult(response.lemmatizedKeyword);
          setInitialKeywordResult(response.initialKeyword);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setLastKeyword, setLemmatizedKeywordResult, setResponse, setShowTable, setParamsExpanded, setShowNoResultsError, setInitialKeywordResult]);

  return { getCollocatesResult };
};
