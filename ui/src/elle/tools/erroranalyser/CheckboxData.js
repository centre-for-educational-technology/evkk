export const languageLevels = [
  {
    type: "all",
    label: "kõik",
    subtype: [
      { type: "A2", label: "A2" },
      { type: "B1", label: "B1" },
      { type: "B2", label: "B2" },
      { type: "C1", label: "C1" },
    ],
  },
];

export const errorTypes = [
  {
    type: "R",
    label: "asendused",
    subtype: [
      {
        type: "R:SPELL",
        label: "õigekirjaviga",
      },
      {
        type: "R:CASE",
        label: "algustäheviga",
      },
      {
        type: "R:WS",
        label: "kokku-lahkukirjutamise viga",
      },
      {
        type: "R:NOM:FORM",
        label: "käändsõna vormivaliku viga",
      },
      {
        type: "R:VERB:FORM",
        label: "tegusõna vormivaliku viga",
      },
      {
        type: "R:LEX",
        label: "sõnavalikuviga",
      },
      {
        type: "R:WO",
        label: "sõnajärjeviga",
      },
      {
        type: "R:PUNCT",
        label: "kirjavahemärgi valiku viga",
      },
    ],
  },
  {
    type: "M",
    label: "kustutused",
    subtype: [
      {
        type: "M:LEX",
        label: "puuduv sõna",
      },
      {
        type: "M:PUNCT",
        label: "puuduv kirjavahemärk",
      },
    ],
  },
  {
    type: "U",
    label: "lisamised",
    subtype: [
      {
        type: "U:LEX",
        label: "liigne sõna",
      },
      {
        type: "U:PUNCT",
        label: "liigne kirjavahemärk",
      },
    ],
  },
];
