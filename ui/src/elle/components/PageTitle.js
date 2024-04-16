import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { breadcrumbNameMap } from '../const/Constants';

export default function PageTitle({ breadcrumbs }) {

  const { t } = useTranslation();

  useEffect(() => {
    const lastSegmentKey = breadcrumbs[breadcrumbs.length - 1].key;
    const dynamicTitle = t(breadcrumbNameMap[lastSegmentKey]) || t('error_page_not_found');

    document.title = (
      breadcrumbs.length === 1
        ? t('page_title_homepage')
        : dynamicTitle
    ) + ' | ELLE';
  }, [breadcrumbs, t]);

  return null;
}
