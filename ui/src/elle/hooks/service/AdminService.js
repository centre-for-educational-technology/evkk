import { useFetch } from '../useFetch';
import { useEffect } from 'react';

export const useGetTextsToReviewCount = () => {
  const { response, fetchData } = useFetch();

  useEffect(() => {
    fetchData('/api/admin/texts-to-review', {}, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return response;
};
