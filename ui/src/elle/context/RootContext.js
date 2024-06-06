import React, { createContext, useCallback, useEffect, useState } from 'react';
import { loadFetch } from '../service/util/LoadFetch';

const RootContext = createContext();

export const RootProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(true);
  const [integrationPaths, setIntegrationPaths] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(() => {
    setIsLoading(true);
    loadFetch('/api/status', {}, true)
      .then(res => res.json())
      .then(res => setDataSuccess(res))
      .catch(() => setStatus(false))
      .finally(() => setIsLoading(false));
  }, []);

  const setContext = () => {
    loadData();
  };

  const clearUserContext = () => {
    setUser(null);
  };

  const setDataSuccess = (res) => {
    setUser(res.user);
    setIntegrationPaths(res.integrationPaths);
    setStatus(true);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <RootContext.Provider value={{ user, status, integrationPaths, isLoading, setContext, clearUserContext }}>
      {children}
    </RootContext.Provider>
  );
};

export default RootContext;
