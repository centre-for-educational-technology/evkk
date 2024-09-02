import { useTranslation } from 'react-i18next';

export const useCorrectionConstants = () => {
  const { t } = useTranslation();

  const errorTypes = {
    spellingError: { color: 'hsl(0 66% 76%)', label: t('corrector_grammar_errors_word_replacement') },
    extraPunctuation: { color: 'hsl(102.13 37% 75%)', label: t('corrector_grammar_errors_unnecessary_punctuation') },
    missingPunctuation: { color: 'hsl(102.13 37% 75%)', label: t('corrector_grammar_errors_missing_punctuation') },
    wrongPunctuation: { color: 'hsl(102.13 37% 75%)', label: t('corrector_grammar_errors_punctuation_replacement') },
    wordCountError: { color: 'hsl(44.71 100% 80%)', label: t('corrector_grammar_errors_compounding') },
    wordOrderError: { color: 'hsl(217.5 78% 90%)', label: t('corrector_grammar_errors_word_order') },
    multipleErrors: { color: 'hsl(31, 89%, 69%)', label: t('corrector_grammar_errors_other_correction') },
    missingWordError: { color: 'hsl(255, 37%, 73%)', label: t('corrector_grammar_errors_missing_word') },
    extraWordError: { color: 'hsl(255, 37%, 73%)', label: t('corrector_grammar_errors_unnecessary_word') }
  };

  const toggleButtons = [
    {
      title: t('corrector_spelling_errors_tooltip'),
      value: 'spellchecker',
      text: t('corrector_proficiency_level_spelling')
    },
    {
      title: t('corrector_grammar_errors_tooltip'),
      value: 'grammarchecker',
      text: t('corrector_proficiency_level_grammar')
    }];

  return { errorTypes, toggleButtons };
};
