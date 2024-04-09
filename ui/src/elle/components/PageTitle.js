import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { breadcrumbNameMap } from '../const/Constants';

export default function PageTitle({ breadcrumbs }) {

  const { t } = useTranslation();

  useEffect(() => {
    const dynamicTitle = breadcrumbs
      .slice(1)
      .map(item => breadcrumbNameMap[item.key])
      .every(title => title !== undefined)
      ? breadcrumbs
        .slice(1)
        .map(item => t(breadcrumbNameMap[item.key]))
        .join(' > ')
      : t('error_page_not_found');

    document.title = (
      breadcrumbs.length === 1
        ? t('page_title_homepage')
        : dynamicTitle
    ) + ' | ELLE';
  }, [breadcrumbs, t]);

  return null;
}
