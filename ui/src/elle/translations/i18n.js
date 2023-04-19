import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { TRANSLATIONS_ET } from './et/translations';
import { TRANSLATIONS_EN } from './en/translations';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        translation: TRANSLATIONS_EN
      },
      ET: {
        translation: TRANSLATIONS_ET
      }
    },
    lng: localStorage.getItem('language') || 'ET'
  });
