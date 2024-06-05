import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function Can({ role, requireAuth = false, children }) {
  const { user } = useContext(AuthContext);

  const hasRole = () => user.roleName === role;

  if (requireAuth && !user) {
    return null;
  } else if (role && (!user || !hasRole())) {
    return null;
  }

  return (
    <>{children}</>
  );
}
