import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Admin() {

  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <>
      {t('common_hello')}, {user.firstName}!
    </>
  );
}
