import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import RootContext from '../context/RootContext';
import { useGetTextsToReviewCount } from '../service/AdminService';

export default function Admin() {
  const { t } = useTranslation();
  const { user } = useContext(RootContext);
  const textsToReviewCount = useGetTextsToReviewCount();

  return (
    <>
      {t('common_hello')}, {user.firstName}!
      <br /><br />
      {t('admin_panel_texts_to_review')}: {textsToReviewCount}
    </>
  );
}
