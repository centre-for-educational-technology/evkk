import { loadFetch } from './util/LoadFetch';
import { clearAuthContext, getAccessToken, navigateTo, setContext } from '../util/FunctionAndPropertyUtils';
import { successEmitter } from '../../App';
import { SuccessSnackbarEventType } from '../components/snackbar/SuccessSnackbar';

const AUTH_PATH = '/api/auth';

export const logout = (forced = false) => {
  loadFetch(`${AUTH_PATH}/logout`, {
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
  await loadFetch(`${AUTH_PATH}/renew`, {
    method: 'POST'
  }).then(() => {
    setContext(true);
  });
};
