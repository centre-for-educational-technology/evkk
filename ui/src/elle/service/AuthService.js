import { loadFetch } from './util/LoadFetch';
import { clearContext, navigateTo } from '../util/LogoutFunctionUtils';
import { successEmitter } from '../../App';
import { SuccessSnackbarEventType } from '../components/SuccessSnackbar';

export const logout = () => {
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
    successEmitter.emit(SuccessSnackbarEventType.LOGOUT_SUCCESS);
  });
};
