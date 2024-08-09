import { useFetch } from '../useFetch';
import { useCallback } from 'react';

export const useGetWordlistResult = () => {
  const { fetchData } = useFetch();

  const getWordlistResult = useCallback((body) => {
    return fetchData('/api/tools/wordlist', {
      method: 'POST',
      body
    });
  }, [fetchData]);

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
