import { useTranslation } from 'react-i18next';
import '../../translations/i18n';

export const WordInfo = ({_onShowWordInfo, onWordInfo}) => {

  const {t} = useTranslation();

  return (
    <div className="containerItem wordInfo">
      <h2>{t('common_word_analysis')}</h2><br/>
      <p>{t('wordinfo_word')}: {onWordInfo.word}</p>
      <p>{t('common_lemma')}: {onWordInfo.lemma}</p>
      <p>{t('common_syllables')}: {onWordInfo.syllables}</p>
      <p>{t('common_wordtype')}: {onWordInfo.type}</p>
      <p>{t('common_form')}: {onWordInfo.form}</p>
    </div>
  )
}
