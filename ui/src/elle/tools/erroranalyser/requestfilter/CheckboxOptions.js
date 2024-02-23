export const languageLevelOptions = [
  {
    type: 'all',
    label: 'error_analyser_all_language_levels',
    subtype: [
      { type: 'A2', label: 'A2' },
      { type: 'B1', label: 'B1' },
      { type: 'B2', label: 'B2' },
      { type: 'C1', label: 'C1' },
    ],
  },
];

export const errorTypeOptions = [
  {
    type: 'word_errors',
    label: 'error_analyser_word_errors',
    subtype: [
      {
        type: 'R:SPELL',
        label: 'error_analyser_r_spell',
      },
      {
        type: 'R:CASE',
        label: 'error_analyser_r_case',
      },
      {
        type: 'R:NOM:FORM',
        label: 'error_analyser_r_nom_form',
      },
      {
        type: 'R:VERB:FORM',
        label: 'error_analyser_r_verb_form',
      },
      {
        type: 'R:LEX',
        label: 'error_analyser_r_lex',
      },
      {
        type: 'M:LEX',
        label: 'error_analyser_m_lex',
      },
      {
        type: 'U:LEX',
        label: 'error_analyser_u_lex',
      },
    ],
  },
  {
    type: 'punctuation',
    label: 'error_analyser_punctuation',

    subtype: [
      {
        type: 'R:PUNCT',
        label: 'error_analyser_r_punct',
      },
      {
        type: 'M:PUNCT',
        label: 'error_analyser_m_punct',
      },
      {
        type: 'U:PUNCT',
        label: 'error_analyser_u_punct',
      },
    ],
  },
  {
    type: 'R:WS',
    label: 'error_analyser_r_ws',
  },
  {
    type: 'R:WO',
    label: 'error_analyser_r_wo',
  },
];
