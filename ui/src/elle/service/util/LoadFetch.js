import { errorEmitter, loadingEmitter } from '../../../App';
import { LoadingSpinnerEventType } from '../../components/LoadingSpinner';
import { ErrorSnackbarEventType } from '../../components/ErrorSnackbar';

export const loadFetch = async (url, params, disableErrorHandling = false) => {
  loadingEmitter.emit(LoadingSpinnerEventType.LOADER_START);

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
      if (res.ok) return res;
      errorEmitter.emit(ErrorSnackbarEventType.GENERIC_ERROR);
      return Promise.reject(res);
    });
};
