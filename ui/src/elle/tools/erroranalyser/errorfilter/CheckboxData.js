export const languageLevelOptions = [
  {
    type: 'all',
    label: 'Kõik keeletasemed',
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
    label: 'Sõnavead',
    subtype: [
      {
        type: 'R:SPELL',
        label: 'error_analyser_error_type_r_spell',
      },
      {
        type: 'R:CASE',
        label: 'error_analyser_error_type_r_case',
      },
      {
        type: 'R:NOM:FORM',
        label: 'error_analyser_error_type_r_nom_form',
      },
      {
        type: 'R:VERB:FORM',
        label: 'error_analyser_error_type_r_verb_form',
      },
      {
        type: 'R:LEX',
        label: 'error_analyser_error_type_r_lex',
      },
      {
        type: 'M:LEX',
        label: 'error_analyser_error_type_m_lex',
      },
      {
        type: 'U:LEX',
        label: 'error_analyser_error_type_u_lex',
      },
    ],
  },
  {
    type: 'punctuation',
    label: 'Kirjavahemärgivead',

    subtype: [
      {
        type: 'R:PUNCT',
        label: 'error_analyser_error_type_r_punct',
      },
      {
        type: 'M:PUNCT',
        label: 'error_analyser_error_type_m_punct',
      },
      {
        type: 'U:PUNCT',
        label: 'error_analyser_error_type_u_punct',
      },
    ],
  },
  {
    type: 'R:WS',
    label: 'error_analyser_error_type_r_ws',
  },
  {
    type: 'R:WO',
    label: 'error_analyser_error_type_r_wo',
  },
];

// export const errorTypes = [
//   {
//     type: 'R',
//     label: 'asendused',
//     subtype: [
//       {
//         type: 'R:SPELL',
//         label: 'õigekirjaviga',
//       },
//       {
//         type: 'R:CASE',
//         label: 'algustäheviga',
//       },
//       {
//         type: 'R:WS',
//         label: 'kokku-lahkukirjutamise viga',
//       },
//       {
//         type: 'R:NOM:FORM',
//         label: 'käändsõna vormivaliku viga',
//       },
//       {
//         type: 'R:VERB:FORM',
//         label: 'tegusõna vormivaliku viga',
//       },
//       {
//         type: 'R:LEX',
//         label: 'sõnavalikuviga',
//       },
//       {
//         type: 'R:WO',
//         label: 'sõnajärjeviga',
//       },
//       {
//         type: 'R:PUNCT',
//         label: 'kirjavahemärgi valiku viga',
//       },
//     ],
//   },
//   {
//     type: 'M',
//     label: 'lisamised',
//     subtype: [
//       {
//         type: 'M:LEX',
//         label: 'puuduv sõna',
//       },
//       {
//         type: 'M:PUNCT',
//         label: 'puuduv kirjavahemärk',
//       },
//     ],
//   },
//   {
//     type: 'U',
//     label: 'kustutused',
//     subtype: [
//       {
//         type: 'U:LEX',
//         label: 'liigne sõna',
//       },
//       {
//         type: 'U:PUNCT',
//         label: 'liigne kirjavahemärk',
//       },
//     ],
//   },
// ];
