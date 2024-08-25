import React, { createContext, useCallback, useEffect, useState } from 'react';
import { successEmitter } from '../../App';
import { SuccessSnackbarEventType } from '../components/snackbar/SuccessSnackbar';
import { useGetStatus } from '../hooks/service/RootService';

const RootContext = createContext();

export const RootProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [status, setStatus] = useState(true);
  const [integrationPaths, setIntegrationPaths] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tokenRenewed, setTokenRenewed] = useState(false);

  const setDataSuccess = useCallback((res) => {
    setUser(res.user);
    setAccessToken(res.accessToken);
    setIntegrationPaths(res.integrationPaths);
    setStatus(true);
  }, []);

  const { getStatus } = useGetStatus(setStatus, setDataSuccess);

  const loadData = useCallback(async (isTokenRenewed = false) => {
    setIsLoading(true);
    await getStatus();
    setIsLoading(false);
    setTokenRenewed(isTokenRenewed);
  }, [getStatus, setIsLoading, setTokenRenewed]);

  const setContext = (isTokenRenewed) => {
    loadData(isTokenRenewed);
  };

  const clearAuthContext = () => {
    setUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (tokenRenewed === true && !isLoading) {
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
