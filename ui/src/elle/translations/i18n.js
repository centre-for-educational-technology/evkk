import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import {TRANSLATIONS_ET} from "./et/translations";
import {TRANSLATIONS_EN} from "./en/translations";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      et: {
        translation: TRANSLATIONS_ET
      }
    },
    lng: localStorage.getItem('language') || 'et'
  });
