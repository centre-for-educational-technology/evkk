import { errorEmitter, loadingEmitter } from '../../App';
import { LoadingSpinnerEventType } from '../components/LoadingSpinner';
import { ErrorSnackbarEventType } from '../components/snackbar/ErrorSnackbar';
import { useCallback, useContext, useState } from 'react';
import RootContext from '../context/RootContext';

const hasNonExpiredToken = (token) => {
  if (!token) return false;
  return Date.now() < JSON.parse(atob(token.split('.')[1])).exp * 1000;
};

export const useFetch = () => {
  const { accessToken } = useContext(RootContext) || {};
  const [response, setResponse] = useState(null);

  const fetchData = useCallback(async (url, params = {}, options = {}) => {
    const defaultOptions = {
      disableErrorHandling: false,
      disableResponseParsing: false,
      parseAsText: false,
      ignoreNotFoundError: false
    };
    const finalOptions = { ...defaultOptions, ...options };

    loadingEmitter.emit(LoadingSpinnerEventType.LOADER_START);

    if (hasNonExpiredToken(accessToken)) {
      params.headers = {
        ...params.headers,
        Authorization: `Bearer ${accessToken}`
      };
    }

    const res = await fetch(url, params);
    loadingEmitter.emit(LoadingSpinnerEventType.LOADER_END);

    if (!finalOptions.disableErrorHandling && !res.ok) {
      if (res.status === 401) {
        errorEmitter.emit(ErrorSnackbarEventType.UNAUTHORIZED);
      } else if (res.status === 403) {
        errorEmitter.emit(ErrorSnackbarEventType.FORBIDDEN);
      } else if (res.status === 429) {
        errorEmitter.emit(ErrorSnackbarEventType.TOO_MANY_REQUESTS);
      } else if (!(finalOptions.ignoreNotFoundError && res.status === 404)) {
        errorEmitter.emit(ErrorSnackbarEventType.GENERIC_ERROR);
      }
      return Promise.reject();
    }

    const result = finalOptions.disableResponseParsing
      ? res
      : finalOptions.parseAsText
        ? await res.text()
        : await res.json();
    setResponse(result);
  }, [accessToken]);

  return { fetchData, response };
};
