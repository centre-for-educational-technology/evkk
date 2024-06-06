import { loadFetch } from './util/LoadFetch';
import { clearContext, navigateTo } from '../util/LogoutFunctionUtils';
import { successEmitter } from '../../App';
import { SuccessSnackbarEventType } from '../components/snackbar/SuccessSnackbar';

export const logout = (forced = false) => {
  loadFetch('/api/auth/logout', {
    method: 'DELETE',
    body: JSON.stringify({ token: localStorage.getItem('accessToken') }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    localStorage.removeItem('accessToken');
    clearContext();
    navigateTo('/');
    successEmitter.emit(forced ? SuccessSnackbarEventType.LOGOUT_FORCED_SUCCESS : SuccessSnackbarEventType.LOGOUT_SUCCESS);
  });
};

export const renew = async () => {
  await loadFetch('/api/auth/renew', {
    method: 'POST'
  })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('accessToken', res.token);
      successEmitter.emit(SuccessSnackbarEventType.SESSION_RENEW_SUCCESS);
    });
};
