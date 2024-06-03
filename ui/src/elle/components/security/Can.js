import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function Can({ role, children }) {
  const { user } = useContext(AuthContext);

  const hasRole = () => user.roleName === role;

  if (role && (!user || !hasRole())) return null;

  return (
    <>{children}</>
  );
}
