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
      maxHeight: ITEM_HEIGHT * 11.5 + ITEM_PADDING_TOP,
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
  "2000—2005",
  "2006—2010",
  "2011—2015",
  "2016—2020",
  "2021..."
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
  'cFqPphvYi': 'K2 olümpiaaditööd',
  'clWmOIrLa': 'K2 riiklikud eksamitööd',
  'cFOoRQekA': 'K2 keeleõpe',
  'cYDRkpymb': 'K1 eesti keel',
  'cgSRJPKTr': 'K1 vene keel',
  'cZjHWUPtD': 'K3 vene keel',
  'cwUSEqQLt': 'Akadeemiline eesti keel'
};

export const textTypes = {
  'k2eesti_riiklik_eksamitoo': 'K2 riiklik eksamitöö',
  'k2eesti_ol_loovkirjutis': 'K2 OT loovkirjutis',
  'k2eesti_kiri_isiklik': 'K2 kiri: isiklik',
  'k2eesti_kiri_poolametlik': 'K2 kiri: (pool)ametlik',
  'k2eesti_loovkirjutis': 'K2 loovkirjutis',
  'k2eesti_harjutus_dialoog': 'K2 harjutus: dialoog',
  'k2eesti_harjutus_etteutlus': 'K2 harjutus: etteütlus',
  'k2eesti_harjutus_juhend': 'K2 harjutus: juhend',
  'k2eesti_harjutus_kirjeldus': 'K2 harjutus: kirjeldus',
  'k2eesti_harjutus_kuulutus': 'K2 harjutus: kuulutus',
  'k2eesti_harjutus_kone': 'K2 harjutus: kõne',
  'k2eesti_harjutus_laused': 'K2 harjutus: laused',
  'k2eesti_harjutus_leping': 'K2 harjutus: leping',
  'k2eesti_harjutus_lunktekst': 'K2 harjutus: lünktekst',
  'k2eesti_harjutus_menuu': 'K2 harjutus: menüü',
  'k2eesti_harjutus_reklaam': 'K2 harjutus: reklaam',
  'k2eesti_harjutus_retsept': 'K2 harjutus: retsept',
  'k2eesti_harjutus_teejuht': 'K2 harjutus: teejuht',
  'k2eesti_harjutus_vastused': 'K2 harjutus: vastused küsimustele',
  'k2eesti_harjutus_umberjutustus': 'K2 harjutus: ümberjutustus',
  'k2eesti_eksamitoo': 'K2 eksamitöö',
  'k2eesti_kontrolltoo_test': 'K2 kontrolltöö/test',
  'k2eesti_tolge': 'K2 tõlge',
  'k1eesti_arvamuslugu': 'K1 arvamuslugu',
  'k1eesti_eksamitoo': 'K1 eksamitöö',
  'k1eesti_harjutus': 'K1 harjutus',
  'k1vene_loovkirjutis': 'K1 vene loovkirjutis',
  'k1vene_eksamitoo': 'K1 vene eksamitöö',
  'ak_eriala_analuus': 'AK erialaõpingud: analüüs',
  'ak_eriala_essee': 'AK erialaõpingud: essee',
  'ak_eriala_kursusetoo': 'AK erialaõpingud: kursusetöö',
  'ak_eriala_referaat': 'AK erialaõpingud: referaat',
  'ak_eriala_retsensioon': 'AK erialaõpingud: retsensioon',
  'ak_eriala_seminaritoo': 'AK erialaõpingud: seminaritöö',
  'ak_eriala_ulevaade': 'AK erialaõpingud: ülevaade',
  'ak_uurimus_artikkel': 'AK uurimused: artikkel',
  'ak_uurimus_ettekanne': 'AK uurimused: ettekanne',
  'ak_uurimus_kokkuvote': 'AK uurimused: kokkuvõte',
  'ak_uurimus_batoo': 'AK uurimused: bakalaureusetöö',
  'ak_uurimus_diplomitoo': 'AK uurimused: diplomitöö',
  'ak_uurimus_matoo': 'AK uurimused: magistritöö',
  'ak_uurimus_phdtoo': 'AK uurimused: doktoritöö',
};

export const textTypesOptions = {
  "clWmOIrLa": {
    "k2eesti_riiklik_eksamitoo": "K2 riiklik eksamitöö"
  },
  "cFqPphvYi": {
    "k2eesti_ol_loovkirjutis": "K2 OT loovkirjutis"
  },
  "cFOoRQekA": {
    "K2 kiri": {
      "k2eesti_kiri_isiklik": "Isiklik",
      "k2eesti_kiri_poolametlik": "(Pool)ametlik"
    },
    "k2eesti_loovkirjutis": "K2 loovkirjutis",
    "K2 harjutus": {
      "k2eesti_harjutus_dialoog": "Dialoog",
      "k2eesti_harjutus_etteutlus": "Etteütlus",
      "k2eesti_harjutus_juhend": "Juhend",
      "k2eesti_harjutus_kirjeldus": "Kirjeldus",
      "k2eesti_harjutus_kuulutus": "Kuulutus",
      "k2eesti_harjutus_kone": "Kõne",
      "k2eesti_harjutus_laused": "Laused",
      "k2eesti_harjutus_leping": "Leping",
      "k2eesti_harjutus_lunktekst": "Lünktekst",
      "k2eesti_harjutus_menuu": "Menüü",
      "k2eesti_harjutus_reklaam": "Reklaam",
      "k2eesti_harjutus_retsept": "Retsept",
      "k2eesti_harjutus_teejuht": "Teejuht",
      "k2eesti_harjutus_vastused": "Vastused",
      "k2eesti_harjutus_umberjutustus": "Ümberjutustus"
    },
    "k2eesti_eksamitoo": "K2 eksamitöö",
    "k2eesti_kontrolltoo_test": "K2 kontrolltöö/test",
    "k2eesti_tolge": "K2 tõlge"
  },
  "cYDRkpymb": {
    "k1eesti_arvamuslugu": "K1 arvamuslugu",
    "k1eesti_eksamitoo": "K1 eksamitöö",
    "k1eesti_harjutus": "K1 harjutus"
  },
  "cgSRJPKTr": {
    "k1vene_loovkirjutis": "K1 vene loovkirjutis",
    "k1vene_eksamitoo": "K1 vene eksamitöö",
  },
  "cZjHWUPtD": {
    "k3vene_loovkirjutis": "K3 vene loovkirjutis",
    "k3vene_eksamitoo": "K3 vene eksamitöö",
  },
  "cwUSEqQLt": {
    "AK erialaõpingud": {
      "ak_eriala_analuus": "Analüüs",
      "ak_eriala_essee": "Essee",
      "ak_eriala_kursusetoo": "Kursusetöö",
      "ak_eriala_referaat": "Referaat",
      "ak_eriala_retsensioon": "Retsensioon",
      "ak_eriala_seminaritoo": "Seminaritöö",
      "ak_eriala_ulevaade": "Ülevaade",
    },
    "AK uurimused": {
      "ak_uurimus_artikkel": "Artikkel",
      "ak_uurimus_ettekanne": "Ettekanne",
      "ak_uurimus_kokkuvote": "Kokkuvõte",
      "ak_uurimus_batoo": "Bakalaureusetöö",
      "ak_uurimus_diplomitoo": "Diplomitöö",
      "ak_uurimus_matoo": "Magistritöö",
      "ak_uurimus_pdhtoo": "Doktoritöö",
    }
  }
};

export const ages = {
  'kuni18': 'kuni 18',
  'kuni26': '18 - 26',
  'kuni40': '27 - 40',
  '41plus': '41 +'
};

export const genders = {
  'N': 'naine',
  'M': 'mees',
  'mees': 'mees',
  'naine': 'naine'
};

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
};

export const locations = "idaviru,tallinn,tartu";
