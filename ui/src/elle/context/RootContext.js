import React, { createContext, useCallback, useEffect, useState } from 'react';
import { loadFetch } from '../service/util/LoadFetch';
import { successEmitter } from '../../App';
import { SuccessSnackbarEventType } from '../components/snackbar/SuccessSnackbar';

const RootContext = createContext();

export const RootProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [status, setStatus] = useState(true);
  const [integrationPaths, setIntegrationPaths] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tokenRenewed, setTokenRenewed] = useState(false);

  const loadData = useCallback((isTokenRenewed = false) => {
    setIsLoading(true);
    loadFetch('/api/status', {}, true)
      .then(res => res.json())
      .then(res => setDataSuccess(res))
      .catch(() => setStatus(false))
      .finally(() => {
        setIsLoading(false);
        setTokenRenewed(isTokenRenewed);
      });
  }, []);

  const setContext = (isTokenRenewed) => {
    loadData(isTokenRenewed);
  };

  const clearAuthContext = () => {
    setUser(null);
  };

  const setDataSuccess = (res) => {
    setUser(res.user);
    setAccessToken(res.accessToken);
    setIntegrationPaths(res.integrationPaths);
    setStatus(true);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (tokenRenewed && !isLoading) {
      successEmitter.emit(SuccessSnackbarEventType.SESSION_RENEW_SUCCESS);
      setTokenRenewed(false);
    }
  }, [isLoading, tokenRenewed]);

  return (
    <RootContext.Provider
      value={{ user, accessToken, status, integrationPaths, isLoading, setContext, clearAuthContext }}>
      {children}
    </RootContext.Provider>
  );
};

export default RootContext;
