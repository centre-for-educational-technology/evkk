import { FetchParseType, useFetch } from '../useFetch';
import { useCallback } from 'react';

export const useGetLanguageSynth = () => {
  const { fetchData } = useFetch();

  const getSynthData = useCallback(body => {
    return fetchData('/api/texts/neurokone', {
      method: 'POST',
      body: JSON.stringify(body)
    }, {
      parseType: FetchParseType.TEXT
    });
  }, [fetchData]);

  return { getSynthData };
};
