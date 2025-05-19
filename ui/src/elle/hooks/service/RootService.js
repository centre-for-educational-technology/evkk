/* import { useFetch } from '../useFetch';
import { useCallback, useEffect } from 'react';

export const useGetStatus = (setStatus, setDataSuccess) => {
  const { fetchData, response } = useFetch();

  const getStatus = useCallback(async () => {
    await fetchData('/api/status', {}, { disableErrorHandling: true })
      .catch(() => setStatus(false));
  }, [fetchData, setStatus]);

  useEffect(() => {
    if (response) {
      setDataSuccess(response);
    }
  }, [response, setDataSuccess]);

  return { getStatus };
};
 */
import { useFetch } from '../useFetch';
import { useCallback, useEffect } from 'react';

export const useGetStatus = (setStatus, setDataSuccess) => {
  const { fetchData, response } = useFetch();

  const getStatus = useCallback(async () => {
    const mockResponse = { 
      status: true, 
      message: 'Mocked online', 
      user: null, 
      accessToken: null, 
      integrationPaths: [], 
      version: 'mocked' 
    };
    setStatus(true);          // Force online
    setDataSuccess(mockResponse);  // Match expected fields
    // await fetchData('/api/status', {}, { disableErrorHandling: true })
    //   .catch(() => setStatus(false));
  }, [fetchData, setStatus, setDataSuccess]);

  useEffect(() => {
    if (response) {
      setDataSuccess(response);
    }
  }, [response, setDataSuccess]);

  return { getStatus };
};