import { loadFetch } from './util/LoadFetch';
import { clearAuthContext, getAccessToken, navigateTo, setContext } from '../util/FunctionAndPropertyUtils';
import { successEmitter } from '../../App';
import { SuccessSnackbarEventType } from '../components/snackbar/SuccessSnackbar';

export const logout = (forced = false) => {
  loadFetch('/api/auth/logout', {
    method: 'DELETE',
    body: JSON.stringify({ token: getAccessToken() }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    clearAuthContext();
    navigateTo('/');
    successEmitter.emit(forced ? SuccessSnackbarEventType.LOGOUT_FORCED_SUCCESS : SuccessSnackbarEventType.LOGOUT_SUCCESS);
  });
};

export const renew = async () => {
  await loadFetch('/api/auth/renew', {
    method: 'POST'
  }).then(() => {
    setContext(true);
  });
};
