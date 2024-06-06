import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import RootContext from '../context/RootContext';

export default function Admin() {

  const { t } = useTranslation();
  const { user } = useContext(RootContext);

  return (
    <>
      {t('common_hello')}, {user.firstName}!
    </>
  );
}
