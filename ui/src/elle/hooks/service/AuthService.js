import { successEmitter } from '../../../App';
import { SuccessSnackbarEventType } from '../../components/snackbar/SuccessSnackbar';
import { useFetch } from '../useFetch';
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RootContext from '../../context/RootContext';

const AUTH_PATH = '/api/auth';

export const useLogout = () => {
  const { fetchData } = useFetch();
  const navigate = useNavigate();
  const { clearAuthContext, accessToken  } = useContext(RootContext);

  const logoutTestUser = () => {
    clearAuthContext();
  };

  const logout = useCallback((forced = false) => {
    fetchData(`${AUTH_PATH}/logout`, {
      method: 'DELETE',
      body: JSON.stringify({ token: accessToken })
    }, {
      disableResponseParsing: true
    }).then(() => {
      clearAuthContext();
      navigate('/');
      successEmitter.emit(forced ? SuccessSnackbarEventType.LOGOUT_FORCED_SUCCESS : SuccessSnackbarEventType.LOGOUT_SUCCESS);
    });
  }, [accessToken, clearAuthContext, fetchData, navigate]);

  return { logout, logoutTestUser };
};

export const useLogin = () => {
  const { setTestUser } = useContext(RootContext);
  const loginTestUser = () => {
    setTestUser();
  };

  return { loginTestUser };
}

export const useRenew = () => {
  const { fetchData } = useFetch();
  const { setContext } = useContext(RootContext);

  const renew = useCallback(() => {
    fetchData(`${AUTH_PATH}/renew`, {
      method: 'POST'
    }, {
      disableResponseParsing: true
    }).then(() => setContext(true));
  }, [fetchData, setContext]);

  return { renew };
};
