import { useTranslation } from 'react-i18next';
import React from 'react';

export const useComplexityConstants = () => {
  const {t} = useTranslation();

  const toggleButtons = [
    {
      title: t('corrector_long_phrases_tooltip'),
      value: 'longsentence',
      text: t('corrector_complexity_long_phrases')
    },
    {
      title: t('corrector_long_words_tooltip'),
      value: 'longword',
      text: t('corrector_complexity_long_words')
    },
    {
      title: t('corrector_nouns_tooltip'),
      value: 'nouns',
      text: t('corrector_complexity_nouns')
    }];

  const lixLink = <a href="https://kirj.ee/public/ESA/2011/esa_57-2011-162-217.pdf"> {t('common_here')}</a>;
  const smogLink = <a href="https://www.etera.ee/s/y4AfC43cJr"> {t('common_here')}</a>;
  const longWordLink = <a href="https://lepo.it.da.ut.ee/~jaanm/keelereeglid.htm"> {t('common_here')}</a>;

  return {toggleButtons, lixLink, smogLink, longWordLink};
};
