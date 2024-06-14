import { queryStore } from '../../store/QueryStore';
import { sanitizeTexts } from '../../util/TextUtils';
import { useFetch } from '../useFetch';
import { useCallback, useEffect } from 'react';

export const useGetSelectedTexts = (setStoreData) => {
  const { fetchData, response } = useFetch();

  const getSelectedTexts = useCallback(() => {
    const queryStoreState = queryStore.getState();
    if (queryStoreState.corpusTextIds) {
      fetchData('/api/texts/kysitekstid', {
        method: 'POST',
        body: JSON.stringify({ ids: queryStoreState.corpusTextIds }),
        headers: {
          'Content-Type': 'application/json'
        }
      }, {
        parseAsText: true
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
