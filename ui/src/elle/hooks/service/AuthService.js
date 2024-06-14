import { loadFetch } from './util/LoadFetch';
import { setContext } from '../../util/FunctionAndPropertyUtils';
import { successEmitter } from '../../../App';
import { SuccessSnackbarEventType } from '../../components/snackbar/SuccessSnackbar';
import { useFetch } from '../useFetch';
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RootContext from '../../context/RootContext';

const AUTH_PATH = '/api/auth';

export const useLogout = (forced = false) => {
  const { fetchData } = useFetch();
  const navigate = useNavigate();
  const { clearAuthContext, accessToken } = useContext(RootContext);

  const logout = useCallback(() => {
    fetchData(`${AUTH_PATH}/logout`, {
      method: 'DELETE',
      body: JSON.stringify({ token: accessToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    }, {
      disableResponseParsing: true
    }).then(() => {
      clearAuthContext();
      navigate('/');
      successEmitter.emit(forced ? SuccessSnackbarEventType.LOGOUT_FORCED_SUCCESS : SuccessSnackbarEventType.LOGOUT_SUCCESS);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { logout };
};

export const renew = async () => {
  await loadFetch(`${AUTH_PATH}/renew`, {
    method: 'POST'
  }).then(() => {
    setContext(true);
  });
};
