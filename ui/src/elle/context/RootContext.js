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
  const [version, setVersion] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenRenewed, setTokenRenewed] = useState(false);

  const setDataSuccess = useCallback((res) => {
    setUser(res.user);
    setAccessToken(res.accessToken);
    setIntegrationPaths(res.integrationPaths);
    setVersion(res.version);
    setStatus(true);
  }, []);

  const { getStatus } = useGetStatus(setStatus, setDataSuccess);

  const loadData = useCallback(async (isTokenRenewed = false) => {
    setIsLoading(true);
    await getStatus();
    setIsLoading(false);
    setTokenRenewed(isTokenRenewed);
  }, [getStatus, setIsLoading, setTokenRenewed]);

  const setTestUser = () => {
    setUser(
      {
        userId: 1,
        emailAddress: 'test@test.com',
        firstName: 'test',
        lastName: 'user',
      }
    );
  };


  const setContext = (isTokenRenewed) => {
    loadData(isTokenRenewed);
  };

  const clearAuthContext = () => {
    setUser(null);
    setAccessToken(null);
  };

  const isLoggedIn = () => {
    return user ? true : false;
  }

  // uncomment when actual login system is implemented
  // useEffect(() => {
  //   loadData();
  // }, [loadData]);
  //
  // useEffect(() => {
  //   if (tokenRenewed === true && !isLoading) {
  //     successEmitter.emit(SuccessSnackbarEventType.SESSION_RENEW_SUCCESS);
  //     setTokenRenewed(false);
  //   }
  // }, [isLoading, tokenRenewed]);

  return (
    <RootContext.Provider
      value={{ user, accessToken, status, integrationPaths, version, isLoading, isLoggedIn, setContext, clearAuthContext, setTestUser }}>
      {children}
    </RootContext.Provider>
  );
};

export default RootContext;
