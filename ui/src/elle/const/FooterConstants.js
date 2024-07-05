import { CC_BY_4_0_LICENSE_PATH, EVKK_GITHUB_PATH, EVKK_VERS1_PATH, MIT_LICENSE_PATH } from './PathConstants';
import { HashFragmentRouteConstants, RouteConstants } from '../../AppRoutes';

export const referencesValues = [
  {
    title: 'footer_references_evkk',
    target: EVKK_VERS1_PATH,
    newTab: true
  },
  {
    title: 'footer_references_elle_github',
    target: EVKK_GITHUB_PATH,
    newTab: true
  },
  {
    title: 'footer_references_elle_license',
    target: MIT_LICENSE_PATH,
    newTab: true
  },
  {
    title: 'footer_references_evkk_license',
    target: CC_BY_4_0_LICENSE_PATH,
    newTab: true
  },
  {
    title: 'common_donate_text',
    target: RouteConstants.ADDING
  }
];

export const textsAndToolsValues = [
  {
    title: 'common_wordlist',
    target: RouteConstants.WORDLIST,
    prefix: RouteConstants.TOOLS,
    connector: '/'
  },
  {
    title: 'common_word_in_context',
    target: RouteConstants.WORDCONTEXT,
    prefix: RouteConstants.TOOLS,
    connector: '/'
  },
  {
    title: 'common_neighbouring_words',
    target: RouteConstants.COLLOCATES,
    prefix: RouteConstants.TOOLS,
    connector: '/'
  },
  {
    title: 'common_word_analyser',
    target: RouteConstants.WORDANALYSER,
    prefix: RouteConstants.TOOLS,
    connector: '/'
  },
  {
    title: 'common_clusters',
    target: RouteConstants.CLUSTERFINDER,
    prefix: RouteConstants.TOOLS,
    connector: '/'
  }
];

export const linksValues = [
  {
    title: 'footer_resources_introduction',
    target: HashFragmentRouteConstants.LINKS_TUTVUSTUS,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'footer_resources_dictionaries',
    target: HashFragmentRouteConstants.LINKS_SONASTIKUD,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'footer_resources_translate_tools',
    target: HashFragmentRouteConstants.LINKS_TOLKERAKENDUSED,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'footer_resources_estonian',
    target: HashFragmentRouteConstants.LINKS_EESTIKEELSED_TEKSTID,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'footer_resources_audiovisual',
    target: HashFragmentRouteConstants.LINKS_AUDIOVISUAALNE_MEEDIA,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'footer_resources_language_tools',
    target: HashFragmentRouteConstants.LINKS_KEELEOPPEVARA,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'footer_resources_environments_courses',
    target: HashFragmentRouteConstants.LINKS_KEELEOPPEKESKKONNAD_KURSUSED,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'footer_resources_teacher_aid',
    target: HashFragmentRouteConstants.LINKS_ABIKS_OPETAJALE,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'footer_resources_language_corp',
    target: HashFragmentRouteConstants.LINKS_EESTI_KEELE_KORPUSED,
    prefix: RouteConstants.LINKS,
    connector: '#'
  }
];

export const aboutValues = [
  {
    title: 'common_us',
    target: RouteConstants.US,
    prefix: RouteConstants.ABOUT,
    connector: '/'
  },
  {
    title: 'common_people',
    target: RouteConstants.PEOPLE,
    prefix: RouteConstants.ABOUT,
    connector: '/'
  },
  {
    title: 'common_grants',
    target: RouteConstants.GRANTS,
    prefix: RouteConstants.ABOUT,
    connector: '/'
  },
  {
    title: 'common_publications',
    target: RouteConstants.PUBLICATIONS,
    prefix: RouteConstants.ABOUT,
    connector: '/'
  }
];
