import { useTranslation } from 'react-i18next';

export const useAccordionDetails = () => {
  const {t} = useTranslation();

  const accordionDetails = [
    {label: t('corrector_proficiency_level_overall_score'), arrayValues: [0, 1, 2, 3]},
    {label: t('corrector_proficiency_level_evaluation_text_complexity'), arrayValues: [4, 5, 6, 7]},
    {label: t('corrector_proficiency_level_evaluation_grammar'), arrayValues: [8, 9, 10, 11]},
    {label: t('corrector_proficiency_level_evaluation_vocabulary'), arrayValues: [12, 13, 14, 15]}
  ];

  const textLevels = [
    t('corrector_proficiency_level_color_codes_A2'),
    t('corrector_proficiency_level_color_codes_B1'),
    t('corrector_proficiency_level_color_codes_B2'),
    t('corrector_proficiency_level_color_codes_C1')
  ];

  const textLevelColors = ['hsl(0 66% 76%)', 'hsl(100 37% 75%)', 'hsl(50 37% 75%)', 'hsl(240 37% 75%)'];

  return {accordionDetails, textLevels, textLevelColors};
};
