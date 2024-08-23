import { useFetch } from '../useFetch';
import { useCallback } from 'react';

export const useGetWordlistResult = () => {
  const { fetchData } = useFetch();

  const getWordlistResult = useCallback(body => {
    return fetchData('/api/tools/wordlist', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getWordlistResult };
};

export const useGetCollocatesResult = () => {
  const { fetchData } = useFetch();

  const getCollocatesResult = useCallback(body => {
    return fetchData('/api/tools/collocates', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getCollocatesResult };
};

export const useGetWordContextResult = () => {
  const { fetchData } = useFetch();

  const getWordContextResult = useCallback(body => {
    return fetchData('/api/tools/wordcontext', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getWordContextResult };
};

export const useGetWordAnalyserResult = () => {
  const { fetchData } = useFetch();

  const getWordAnalyserResult = useCallback(body => {
    return fetchData('/api/texts/sonad-lemmad-silbid-sonaliigid-vormimargendid', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getWordAnalyserResult };
};

export const useGetCorrectionResult = () => {
  const { fetchData } = useFetch();

  const getCorrectionResult = useCallback(body => {
    return fetchData('/api/texts/korrektuur', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getCorrectionResult };
};
