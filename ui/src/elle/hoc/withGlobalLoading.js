import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const withGlobalLoading = (WrappedComponent) => (props) => {
  const { isLoading } = useContext(AuthContext);

  return isLoading ? null : <WrappedComponent {...props} />;
};

export default withGlobalLoading;
