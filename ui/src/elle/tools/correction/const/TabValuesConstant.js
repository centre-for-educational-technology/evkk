export const accordionDetails = [
  { label: 'corrector_proficiency_level_overall_score', arrayValues: [0, 1, 2, 3] },
  { label: 'corrector_proficiency_level_evaluation_text_complexity', arrayValues: [4, 5, 6, 7] },
  { label: 'corrector_proficiency_level_evaluation_grammar', arrayValues: [8, 9, 10, 11] },
  { label: 'corrector_proficiency_level_evaluation_vocabulary', arrayValues: [12, 13, 14, 15] }
];

export const textLevels = [
  'corrector_proficiency_level_color_codes_A2',
  'corrector_proficiency_level_color_codes_B1',
  'corrector_proficiency_level_color_codes_B2',
  'corrector_proficiency_level_color_codes_C1'
];

export const complexityValues = [
  'complexity_level_very_simple',
  'complexity_level_simple',
  'complexity_level_average',
  'complexity_level_complex',
  'complexity_level_very_complex'
];

export const textLevelColors = ['hsl(0 66% 76%)', 'hsl(100 37% 75%)', 'hsl(50 37% 75%)', 'hsl(240 37% 75%)'];

export const errorTypes = {
  spellingError: { color: 'hsl(0 66% 76%)', label: 'corrector_grammar_errors_word_replacement' },
  extraPunctuation: { color: 'hsl(102.13 37% 75%)', label: 'corrector_grammar_errors_unnecessary_punctuation' },
  missingPunctuation: { color: 'hsl(102.13 37% 75%)', label: 'corrector_grammar_errors_missing_punctuation' },
  wrongPunctuation: { color: 'hsl(102.13 37% 75%)', label: 'corrector_grammar_errors_punctuation_replacement' },
  wordCountError: { color: 'hsl(44.71 100% 80%)', label: 'corrector_grammar_errors_compounding' },
  wordOrderError: { color: 'hsl(217.5 78% 90%)', label: 'corrector_grammar_errors_word_order' },
  multipleErrors: { color: 'hsl(31, 89%, 69%)', label: 'corrector_grammar_errors_other_correction' },
  missingWordError: { color: 'hsl(255, 37%, 73%)', label: 'corrector_grammar_errors_missing_word' },
  extraWordError: { color: 'hsl(255, 37%, 73%)', label: 'corrector_grammar_errors_unnecessary_word' }
};

export const correctorDocxType = {
  'longsentence': 'corrector_complexity_long_sentences',
  'longword': 'corrector_complexity_long_words',
  'nouns': 'corrector_complexity_nouns',
  'wordrepetition': 'corrector_vocabulary_word_repetitions',
  'uncommonwords': 'corrector_vocabulary_low_frequency_words',
  'abstractwords': 'corrector_vocabulary_abstract_words',
  'contentwords': 'corrector_vocabulary_content_words',
  'spellchecker': 'corrector_proficiency_level_spelling',
  'grammarchecker': 'corrector_proficiency_level_grammar'
};
