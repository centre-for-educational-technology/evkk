import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((_theme) => ({
  formControl: {
    margin: 1,
    width: 250
  },
  indeterminateColor: {
    color: "#f50057"
  },
  selectAllText: {
    fontWeight: 500
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
}));

export const AccordionStyle = {
  '&:before': {
    backgroundColor: 'transparent !important',
  },
};

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};

export const addedYearOptions = [
  "2000—2009",
  "2010—2019",
  "2020..."
];

export const charactersOptions = [
  "kuni 500",
  "501—1000",
  "1001—1500",
  "1501—2500",
  "2501—5000",
  "üle 5000"
];

export const wordsOptions = [
  "kuni 100",
  "101—200",
  "201—300",
  "301—400",
  "401—600",
  "601—800",
  "üle 800"
];

export const sentencesOptions = [
  "kuni 10",
  "11—20",
  "21—30",
  "31—60",
  "61—100",
  "üle 100"
];

export const corpuses = {
  'cFqPphvYi': 'K2 olümpiaadi tööd',
  'clWmOIrLa': 'K2 tasemeeksamite tekstid',
  'cFOoRQekA': 'K2 tuumkorpus',
  'cYDRkpymb': 'K1 eesti keel',
  'cgSRJPKTr': 'K1 vene keel',
  'cZjHWUPtD': 'K3 vene keel',
  'cwUSEqQLt': 'Akadeemiline õppijakeel'
}

export const types = {
  'isikiri': 'isiklik kiri',
  'amtkiri': 'ametlik kiri',
  'essee': 'essee',
  'referaat': 'referaat',
  'trilumunud': 'trükis ilmunud',
  'analyys': 'analüüs',
  'vastkys': 'vastus küsimusele',
  'ymberjutustus': 'ümberjutustus',
  'tolge': 'tõlge',
  'harjutus': 'harjutus',
  'teadus': 'teadusartikkel',
  'monograafia': 'monograafia',
  'vaitekiri': 'väitekiri',
  'ma': 'MA-töö',
  'batoo': 'BA-töö',
  'arvamuslugu': 'arvamuslugu',
  'muu': 'muu',
  'teade': 'teade',
  'kirjeldus/jutustus': 'kirjeldus/jutustus'
}

export const ages = {
  'kuni18': 'kuni 18',
  'kuni26': '18 - 26',
  'kuni40': '27 - 40',
  '41plus': '41 +'
}
export const genders = {
  'N': 'naine',
  'M': 'mees',
  'mees': 'mees',
  'naine': 'naine'
}
export const educations = {
  'Alg-/põhiharidus': 'algharidus/põhiharidus',
  'Keskharidus': 'keskharidus',
  'Keskeriharidus/kutseharidus': 'keskeriharidus/kutseharidus',
  'Kõrgharidus': 'kõrgharidus',
  'pohi': 'põhiharidus',
  'kesk': 'keskharidus',
  'alg': 'algharidus',
  'korg': 'kõrgharidus',
  'keskeri': 'keskeriharidus',
  'kutse': 'kutseharidus'
}
export const locations = "idaviru,tallinn,tartu";
