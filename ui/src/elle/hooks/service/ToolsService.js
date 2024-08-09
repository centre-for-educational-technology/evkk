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

export const useGetCollocatesResult = () => {
  const { fetchData } = useFetch();

  const getCollocatesResult = useCallback((body) => {
    return fetchData('/api/tools/collocates', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getCollocatesResult };
};
