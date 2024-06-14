import { useFetch } from '../useFetch';
import { useEffect } from 'react';

export const useGetTextsToReviewCount = () => {
  const { fetchData, response } = useFetch();

  useEffect(() => {
    fetchData('/api/admin/texts-to-review');
  }, [fetchData]);

  return response;
};
