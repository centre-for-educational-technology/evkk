import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function RequireAuth({ role }) {
  const { user } = useContext(AuthContext);

  if (user && user.roleName === role) return <Outlet />;

  return <Navigate to="/" />;
};
