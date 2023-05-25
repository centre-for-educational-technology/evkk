import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((_theme) => ({
  formControl: {
    margin: 1,
    width: 300
  },
  indeterminateColor: {
    color: '#f50057'
  },
  selectAllText: {
    fontWeight: 500
  },
  selectedAll: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  }
}));

export const AccordionStyle = {
  '&:before': {
    backgroundColor: 'transparent !important'
  }
};

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 11.5 + ITEM_PADDING_TOP,
      width: 425
    }
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center'
  },
  variant: 'menu'
};

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  bgcolor: '#FCFCFC',
  boxShadow: 24,
  borderRadius: '12px',
  p: 4,
  maxHeight: '80vh',
  overflow: 'auto'
};

export const addedYearOptions = [
  '2000—2005',
  '2006—2010',
  '2011—2015',
  '2016—2020',
  '2021...'
];

export const charactersOptions = [
  'query_text_data_char_up_to_500',
  '501—1000',
  '1001—1500',
  '1501—2500',
  '2501—5000',
  'query_text_data_char_over_5000'
];

export const wordsOptions = [
  'query_text_data_words_up_to_100',
  '101—200',
  '201—300',
  '301—400',
  '401—600',
  '601—800',
  'query_text_data_words_over_800'
];

export const sentencesOptions = [
  'query_text_data_sentences_up_to_10',
  '11—20',
  '21—30',
  '31—60',
  '61—100',
  'query_text_data_sentences_over_100'
];

export const textLevelOptions = [
  'A',
  'B',
  'C',
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2'
];

export const corpuses = {
  'cFqPphvYi': 'query_subcoprus_L2_olympiade',
  'clWmOIrLa': 'query_subcorpus_L2_proficiency_examinations',
  'cFOoRQekA': 'query_subcorpus_L2_estonian',
  'cYDRkpymb': 'query_subcorpus_L1_estonian',
  'cgSRJPKTr': 'query_subcorpus_L1_russian',
  'cZjHWUPtD': 'query_subcorpus_L3_russian',
  'cwUSEqQLt': 'query_subcorpus_academic_estonian'
};

export const textTypes = {
  'k2eesti_riiklik_eksamitoo': 'common_text_data_type_L2_proficiency_examination',
  'k2eesti_ol_loovkirjutis': 'common_text_data_type_L2_olympiade_creative_writing',
  'k2eesti_kiri_isiklik': 'query_text_data_type_L2_letter_informal_full',
  'k2eesti_kiri_poolametlik': 'query_text_data_type_L2_letter_semi_formal_full',
  'k2eesti_loovkirjutis': 'query_text_data_type_L2_creative_writing',
  'k2eesti_harjutus_dialoog': 'query_text_data_type_L2_exercise_dialogue_full',
  'k2eesti_harjutus_etteutlus': 'query_text_data_type_L2_exercise_dictation_full',
  'k2eesti_harjutus_juhend': 'query_text_data_type_L2_exercise_instruction_full',
  'k2eesti_harjutus_kirjeldus': 'query_text_data_type_L2_exercise_description_full',
  'k2eesti_harjutus_kuulutus': 'query_text_data_type_L2_exercise_announcement_full',
  'k2eesti_harjutus_kone': 'query_text_data_type_L2_exercise_speech_full',
  'k2eesti_harjutus_laused': 'query_text_data_type_L2_exercise_sentence_construction_full',
  'k2eesti_harjutus_leping': 'query_text_data_type_L2_exercise_contract_full',
  'k2eesti_harjutus_lunktekst': 'query_text_data_type_L2_exercise_fill_in_the_blanks_full',
  'k2eesti_harjutus_menuu': 'query_text_data_type_L2_exercise_menu_full',
  'k2eesti_harjutus_reklaam': 'query_text_data_type_L2_exercise_ad_full',
  'k2eesti_harjutus_retsept': 'query_text_data_type_L2_exercise_recipe_full',
  'k2eesti_harjutus_teejuht': 'query_text_data_type_L2_exercise_guide_full',
  'k2eesti_harjutus_vastused': 'query_text_data_type_L2_exercise_answering_questions_full',
  'k2eesti_harjutus_umberjutustus': 'query_text_data_type_L2_exercise_retelling_full',
  'k2eesti_eksamitoo': 'query_text_data_type_L2_examination',
  'k2eesti_kontrolltoo_test': 'query_text_data_type_L2_test',
  'k2eesti_tolge': 'query_text_data_type_L2_translation',
  'k1eesti_arvamuslugu': 'query_text_data_type_L1_opinion_piece',
  'k1eesti_eksamitoo': 'query_text_data_type_L1_examination',
  'k1eesti_harjutus': 'query_text_data_type_L1_exercise',
  'k1vene_loovkirjutis': 'query_text_data_type_L1_russian_creative_writing',
  'k1vene_eksamitoo': 'query_text_data_type_L1_russian_examination',
  'ak_eriala_analuus': 'query_text_data_type_academic_studies_analysis_full',
  'ak_eriala_essee': 'query_text_data_type_academic_studies_essay_full',
  'ak_eriala_kursusetoo': 'query_text_data_type_academic_studies_course_paper_full',
  'ak_eriala_referaat': 'query_text_data_type_academic_studies_report_full',
  'ak_eriala_retsensioon': 'query_text_data_type_academic_studies_review_full',
  'ak_eriala_seminaritoo': 'query_text_data_type_academic_studies_seminar_paper_full',
  'ak_eriala_ulevaade': 'query_text_data_type_academic_studies_overview_full',
  'ak_uurimus_artikkel': 'query_text_data_type_academic_research_research_article_full',
  'ak_uurimus_ettekanne': 'query_text_data_type_academic_research_presentation_full',
  'ak_uurimus_kokkuvote': 'query_text_data_type_academic_research_summary_full',
  'ak_uurimus_batoo': 'query_text_data_type_academic_research_bachelors_thesis_full',
  'ak_uurimus_diplomitoo': 'query_text_data_type_academic_research_thesis_full',
  'ak_uurimus_matoo': 'query_text_data_type_academic_research_masters_thesis_full',
  'ak_uurimus_phdtoo': 'query_text_data_type_academic_research_doctoral_thesis_full'
};

export const textTypesOptions = {
  'clWmOIrLa': {
    'k2eesti_riiklik_eksamitoo': 'common_text_data_type_L2_proficiency_examination'
  },
  'cFqPphvYi': {
    'k2eesti_ol_loovkirjutis': 'common_text_data_type_L2_olympiade_creative_writing'
  },
  'cFOoRQekA': {
    'query_text_data_type_L2_letter': {
      'k2eesti_kiri_isiklik': 'query_text_data_type_L2_letter_informal',
      'k2eesti_kiri_poolametlik': 'query_text_data_type_L2_letter_semi_formal'
    },
    'k2eesti_loovkirjutis': 'query_text_data_type_L2_creative_writing',
    'query_text_data_type_L2_exercise': {
      'k2eesti_harjutus_dialoog': 'query_text_data_type_L2_exercise_dialogue',
      'k2eesti_harjutus_etteutlus': 'query_text_data_type_L2_exercise_dictation',
      'k2eesti_harjutus_juhend': 'query_text_data_type_L2_exercise_instruction',
      'k2eesti_harjutus_kirjeldus': 'query_text_data_type_L2_exercise_description',
      'k2eesti_harjutus_kuulutus': 'query_text_data_type_L2_exercise_announcement',
      'k2eesti_harjutus_kone': 'query_text_data_type_L2_exercise_speech',
      'k2eesti_harjutus_laused': 'query_text_data_type_L2_exercise_sentence_construction',
      'k2eesti_harjutus_leping': 'query_text_data_type_L2_exercise_contract',
      'k2eesti_harjutus_lunktekst': 'query_text_data_type_L2_exercise_fill_in_the_blanks',
      'k2eesti_harjutus_menuu': 'query_text_data_type_L2_exercise_menu',
      'k2eesti_harjutus_reklaam': 'query_text_data_type_L2_exercise_ad',
      'k2eesti_harjutus_retsept': 'query_text_data_type_L2_exercise_recipe',
      'k2eesti_harjutus_teejuht': 'query_text_data_type_L2_exercise_guide',
      'k2eesti_harjutus_vastused': 'query_text_data_type_L2_exercise_answering_questions',
      'k2eesti_harjutus_umberjutustus': 'query_text_data_type_L2_exercise_retelling'
    },
    'k2eesti_eksamitoo': 'query_text_data_type_L2_examination',
    'k2eesti_kontrolltoo_test': 'query_text_data_type_L2_test',
    'k2eesti_tolge': 'query_text_data_type_L2_translation'
  },
  'cYDRkpymb': {
    'k1eesti_arvamuslugu': 'query_text_data_type_L1_opinion_piece',
    'k1eesti_eksamitoo': 'query_text_data_type_L1_examination',
    'k1eesti_harjutus': 'query_text_data_type_L1_exercise'
  },
  'cgSRJPKTr': {
    'k1vene_loovkirjutis': 'query_text_data_type_L1_russian_creative_writing',
    'k1vene_eksamitoo': 'query_text_data_type_L1_russian_examination'
  },
  'cZjHWUPtD': {
    'k3vene_loovkirjutis': 'query_text_data_type_L3_russian_creative_writing',
    'k3vene_eksamitoo': 'query_text_data_type_L3_russian_examination'
  },
  'cwUSEqQLt': {
    'query_text_data_type_academic_studies': {
      'ak_eriala_analuus': 'query_text_data_type_academic_studies_analysis',
      'ak_eriala_essee': 'query_text_data_type_academic_studies_essay',
      'ak_eriala_kursusetoo': 'query_text_data_type_academic_studies_course_paper',
      'ak_eriala_referaat': 'query_text_data_type_academic_studies_report',
      'ak_eriala_retsensioon': 'query_text_data_type_academic_studies_review',
      'ak_eriala_seminaritoo': 'query_text_data_type_academic_studies_seminar_paper',
      'ak_eriala_ulevaade': 'query_text_data_type_academic_studies_overview'
    },
    'query_text_data_type_academic_research': {
      'ak_uurimus_artikkel': 'query_text_data_type_academic_research_research_article',
      'ak_uurimus_ettekanne': 'query_text_data_type_academic_research_presentation',
      'ak_uurimus_kokkuvote': 'query_text_data_type_academic_research_summary',
      'ak_uurimus_batoo': 'query_text_data_type_academic_research_bachelors_thesis',
      'ak_uurimus_diplomitoo': 'query_text_data_type_academic_research_thesis',
      'ak_uurimus_matoo': 'query_text_data_type_academic_research_masters_thesis',
      'ak_uurimus_pdhtoo': 'query_text_data_type_academic_research_doctoral_thesis'
    }
  }
};

export const textPublishSubTextTypesOptions = {
  'k2eesti_riiklik_eksamitoo': 'common_text_data_type_L2_proficiency_examination',
  'k2eesti_ol_loovkirjutis': 'common_text_data_type_L2_olympiade_creative_writing',
  'k2eesti_keeleope_disabled': 'query_subcorpus_L2_estonian',
  'k2eesti_tolge': 'common_text_data_type_translation',
  'k2eesti_eksamitoo': 'common_text_data_type_examination',
  'k2eesti_kontrolltoo_test': 'common_text_data_type_test',
  'k2eesti_loovkirjutis': 'common_text_data_type_creative_writing',
  'k2eesti_kiri_disabled': 'query_text_data_type_L2_letter',
  'k2eesti_kiri_isiklik': 'query_text_data_type_L2_letter_informal',
  'k2eesti_kiri_poolametlik': 'query_text_data_type_L2_letter_semi_formal',
  'k2eesti_harjutus_disabled': 'query_text_data_type_L2_exercise',
  'k2eesti_harjutus_dialoog': 'query_text_data_type_L2_exercise_dialogue',
  'k2eesti_harjutus_etteutlus': 'query_text_data_type_L2_exercise_dictation',
  'k2eesti_harjutus_juhend': 'query_text_data_type_L2_exercise_instruction',
  'k2eesti_harjutus_kirjeldus': 'query_text_data_type_L2_exercise_description',
  'k2eesti_harjutus_kuulutus': 'query_text_data_type_L2_exercise_announcement',
  'k2eesti_harjutus_kone': 'query_text_data_type_L2_exercise_speech',
  'k2eesti_harjutus_laused': 'query_text_data_type_L2_exercise_sentence_construction',
  'k2eesti_harjutus_leping': 'query_text_data_type_L2_exercise_contract',
  'k2eesti_harjutus_lunktekst': 'query_text_data_type_L2_exercise_fill_in_the_blanks',
  'k2eesti_harjutus_menuu': 'query_text_data_type_L2_exercise_menu',
  'k2eesti_harjutus_reklaam': 'query_text_data_type_L2_exercise_ad',
  'k2eesti_harjutus_retsept': 'query_text_data_type_L2_exercise_recipe',
  'k2eesti_harjutus_teejuht': 'query_text_data_type_L2_exercise_guide',
  'k2eesti_harjutus_vastused': 'query_text_data_type_L2_exercise_answering_questions',
  'k2eesti_harjutus_umberjutustus': 'query_text_data_type_L2_exercise_retelling',
  'k1eesti_disabled': 'query_subcorpus_L1_estonian',
  'k1eesti_arvamuslugu': 'common_text_data_type_opinion_piece',
  'k1eesti_eksamitoo': 'common_text_data_type_examination',
  'k1eesti_harjutus': 'common_text_data_type_exercise'
};

export const usedMaterialsMultiOptions = {
  'query_text_data_used_study_or_supporting_materials_yes': {
    'tolkesonastik': 'query_text_data_used_study_or_supporting_materials_translation_dictionary_or_machine_translation',
    'ykskeelnesonastik': 'query_text_data_used_study_or_supporting_materials_monolingual_dictionary',
    'terminisonastik': 'query_text_data_used_study_or_supporting_materials_term_glossary_or_base',
    'kasiraamat': 'query_text_data_used_study_or_supporting_materials_professional_handbook',
    'automaatkontroll': 'query_text_data_used_study_or_supporting_materials_automated_correction',
    'muu': 'common_other'
  },
  'ei': 'query_text_data_used_study_or_supporting_materials_no'
};

export const textLanguageOptions = {
  'eesti': 'query_common_language_et',
  'vene': 'query_common_language_ru'
};

export const domainOptions = {
  'biojakeskkonnateadused': 'common_text_data_field_of_research_biosciences_and_environment',
  'yhiskondjakultuur': 'common_text_data_field_of_research_culture_and_society',
  'terviseuuringud': 'common_text_data_field_of_research_health',
  'loodustehnika': 'common_text_data_field_of_research_natural_sciences_and_engineering'
};

export const usedMaterialsOptions = {
  'jah': 'query_text_data_used_supporting_materials_yes',
  'ei': 'query_text_data_used_supporting_materials_no'
};

export const ageOptions = {
  'kuni18': 'query_author_data_age_up_to_18',
  'kuni26': '18 - 26',
  'kuni40': '27 - 40',
  '41plus': '41 +'
};

export const genderOptions = {
  'mees': 'query_author_data_gender_male',
  'naine': 'query_author_data_gender_female'
};

export const studyLevelOptions = {
  'bakalaureuseope': 'query_author_data_level_of_study_bachelors_studies',
  'magistriope': 'query_author_data_level_of_study_masters_studies',
  'doktoriope': 'query_author_data_level_of_study_doctoral_studies'
};

export const degreeOptions = {
  'ba': 'query_author_data_degree_bachelors',
  'ma': 'query_author_data_degree_masters',
  'phd': 'query_author_data_degree_doctoral'
};

export const educationOptions = {
  'Alg-/põhiharidus': 'query_author_data_education_elementary',
  'Keskharidus': 'query_author_data_education_secondary',
  'Keskeriharidus/kutseharidus': 'query_author_data_education_vocational',
  'Kõrgharidus': 'query_author_data_education_higher'
};

export const textPublishEducationOptions = {
  'alusharidus': 'publish_your_text_author_data_education_elementary',
  'pohiharidus': 'publish_your_text_author_data_education_basic',
  'keskharidus': 'publish_your_text_author_data_education_secondary',
  'keskeriharidus': 'publish_your_text_author_data_education_secondary_special',
  'rakenduskorgharidus': 'publish_your_text_author_data_education_higher_applied',
  'korgharidus': 'publish_your_text_author_data_education_higher'
};

export const textPublishMainTextTypesOptions = {
  'akadeemiline': 'publish_your_text_text_data_main_text_type_academic',
  'mitteakadeemiline': 'publish_your_text_text_data_main_text_type_non_academic'
};

export const textPublishAcademicCategoryOptions = {
  'ak_erialaopingud': 'publish_your_text_text_data_academic_category_academic_studies',
  'ak_uurimused': 'publish_your_text_text_data_academic_category_research'
};

export const textPublishAcademicStudiesSubtypeOptions = {
  'ak_analuus': 'query_text_data_type_academic_studies_analysis',
  'ak_eriala_essee': 'query_text_data_type_academic_studies_essay',
  'ak_eriala_kursusetoo': 'query_text_data_type_academic_studies_course_paper',
  'ak_eriala_referaat': 'query_text_data_type_academic_studies_report',
  'ak_eriala_retsensioon': 'query_text_data_type_academic_studies_review',
  'ak_eriala_seminaritoo': 'query_text_data_type_academic_studies_seminar_paper',
  'ak_eriala_ulevaade': 'query_text_data_type_academic_studies_overview'
};

export const textPublishAcademicResearchSubtypeOptions = {
  'ak_uurimus_artikkel': 'query_text_data_type_academic_research_research_article',
  'ak_uurimus_ettekanne': 'query_text_data_type_academic_research_presentation',
  'ak_uurimus_kokkuvote': 'query_text_data_type_academic_research_summary',
  'ak_uurimus_batoo': 'query_text_data_type_academic_research_bachelors_thesis',
  'ak_uurimus_diplomitoo': 'query_text_data_type_academic_research_thesis',
  'ak_uurimus_matoo': 'query_text_data_type_academic_research_masters_thesis',
  'ak_uurimus_phdtoo': 'query_text_data_type_academic_research_doctoral_thesis'
};

export const textPublishUsedMaterialsOptions = {
  'tolkesonastik': 'query_text_data_used_study_or_supporting_materials_translation_dictionary_or_machine_translation',
  'ykskeelnesonastik': 'query_text_data_used_study_or_supporting_materials_monolingual_dictionary',
  'terminisonastik': 'query_text_data_used_study_or_supporting_materials_term_glossary_or_base',
  'kasiraamat': 'query_text_data_used_study_or_supporting_materials_professional_handbook',
  'automaatkontroll': 'query_text_data_used_study_or_supporting_materials_automated_correction',
  'muu': 'common_other'
};

export const nationalityOptions = {
  'Eesti': 'query_common_country_et',
  'Ameerika Ühendriigid': 'query_common_country_us',
  'Brasiilia': 'query_common_country_br',
  'Bulgaaria': 'query_common_country_bg',
  'Egiptus': 'query_common_country_eg',
  'Filipiinid': 'query_common_country_ph',
  'Hiina': 'query_common_country_ch',
  'Hispaania': 'query_common_country_es',
  'Holland': 'query_common_country_nl',
  'Iirimaa': 'query_common_country_ie',
  'India': 'query_common_country_in',
  'Kreeka': 'query_common_country_gr',
  'Leedu': 'query_common_country_lt',
  'Läti': 'query_common_country_lv',
  'Makedoonia': 'query_common_country_mk',
  'Määramata': 'query_common_country_unassigned',
  'Poola': 'query_common_country_pl',
  'Prantsusmaa': 'query_common_country_fr',
  'Rumeenia': 'query_common_country_ro',
  'Saksamaa': 'query_common_country_de',
  'Soome': 'query_common_country_fi',
  'Suurbritannia': 'query_common_country_gb',
  'Türgi': 'query_common_country_tr',
  'Ukraina': 'query_common_country_ua',
  'Valgevene': 'query_common_country_by',
  'Venemaa': 'query_common_country_ru',
  'Venezuela': 'query_common_country_ve'
};

export const languageOptions = {
  'eesti': 'query_common_language_et',
  'vene': 'query_common_language_ru',
  'soome': 'query_common_language_fi',
  'saksa': 'query_common_language_de',
  'ukraina': 'query_common_language_ua',
  'valgevene': 'query_common_language_by',
  'lati': 'query_common_language_lv',
  'leedu': 'query_common_language_lt',
  'rootsi': 'query_common_language_se',
  'inglise': 'query_common_language_en',
  'jidis': 'query_common_language_ji',
  'itaalia': 'query_common_language_it',
  'jaapani': 'query_common_language_jp',
  'poola': 'query_common_language_pl',
  'hollandi': 'query_common_language_nl',
  'sloveenia': 'query_common_language_sl',
  'heebrea': 'query_common_language_he',
  'prantsuse': 'query_common_language_fr',
  'katalaani': 'query_common_language_ca',
  'ungari': 'query_common_language_hu',
  'tsehhi': 'query_common_language_cz'
};

export const countryOptions = {
  'eesti': 'query_common_country_et',
  'soome': 'query_common_country_fi',
  'rootsi': 'query_common_country_se',
  'venemaa': 'query_common_country_ru',
  'lati': 'query_common_country_lv',
  'leedu': 'query_common_country_lt',
  'saksamaa': 'query_common_country_de',
  'muu': 'common_other'
};
