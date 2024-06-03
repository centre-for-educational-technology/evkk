import React, { createContext, useEffect, useState } from 'react';
import { loadFetch } from '../service/util/LoadFetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = () => {
    setIsLoading(true);
    loadFetch('/api/user/me', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => setUser(res))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const setContext = () => {
    loadUser();
  };

  const clearContext = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setContext, clearContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
