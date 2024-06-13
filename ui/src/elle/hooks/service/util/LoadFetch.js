import { errorEmitter, loadingEmitter } from '../../../../App';
import { LoadingSpinnerEventType } from '../../../components/LoadingSpinner';
import { ErrorSnackbarEventType } from '../../../components/snackbar/ErrorSnackbar';
import { getAccessToken } from '../../../util/FunctionAndPropertyUtils';

export const loadFetch = async (url, params, disableErrorHandling = false) => {
  loadingEmitter.emit(LoadingSpinnerEventType.LOADER_START);

  if (hasNonExpiredToken()) {
    params.headers = {
      ...params.headers,
      Authorization: `Bearer ${getAccessToken()}`
    };
  }

  if (disableErrorHandling) {
    return fetch(url, params)
      .then(res => {
        loadingEmitter.emit(LoadingSpinnerEventType.LOADER_END);
        return res;
      });
  }

  return fetch(url, params)
    .then(res => {
      loadingEmitter.emit(LoadingSpinnerEventType.LOADER_END);
      if (res.ok) {
        return res;
      } else if (res.status === 401) {
        errorEmitter.emit(ErrorSnackbarEventType.UNAUTHORIZED);
      } else if (res.status === 403) {
        errorEmitter.emit(ErrorSnackbarEventType.FORBIDDEN);
      } else {
        errorEmitter.emit(ErrorSnackbarEventType.GENERIC_ERROR);
      }
      return Promise.reject(res);
    });
};

const hasNonExpiredToken = () => {
  const token = getAccessToken();
  if (!token) return false;

  return Date.now() < JSON.parse(atob(token.split('.')[1])).exp * 1000;
};
