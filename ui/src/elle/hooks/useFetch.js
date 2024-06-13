import { errorEmitter, loadingEmitter } from '../../App';
import { LoadingSpinnerEventType } from '../components/LoadingSpinner';
import { ErrorSnackbarEventType } from '../components/snackbar/ErrorSnackbar';
import { useContext, useState } from 'react';
import RootContext from '../context/RootContext';

const hasNonExpiredToken = (token) => {
  if (!token) return false;
  return Date.now() < JSON.parse(atob(token.split('.')[1])).exp * 1000;
};

export const useFetch = () => {
  const { accessToken } = useContext(RootContext);
  const [response, setResponse] = useState(null);

  const fetchData = async (url, params = {}, disableErrorHandling = false) => {
    loadingEmitter.emit(LoadingSpinnerEventType.LOADER_START);

    if (hasNonExpiredToken(accessToken)) {
      params.headers = {
        ...params.headers,
        Authorization: `Bearer ${accessToken}`
      };
    }

    const res = await fetch(url, params);
    loadingEmitter.emit(LoadingSpinnerEventType.LOADER_END);

    if (!disableErrorHandling && !res.ok) {
      if (res.status === 401) {
        errorEmitter.emit(ErrorSnackbarEventType.UNAUTHORIZED);
      } else if (res.status === 403) {
        errorEmitter.emit(ErrorSnackbarEventType.FORBIDDEN);
      } else {
        errorEmitter.emit(ErrorSnackbarEventType.GENERIC_ERROR);
      }
      throw new Error('blabla');
    }

    const result = await res.json();
    setResponse(result);
  };

  return { fetchData, response };
};
