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
    title: 'common_introduction',
    target: HashFragmentRouteConstants.LINKS_INTRODUCTION,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'common_dictionaries',
    target: HashFragmentRouteConstants.LINKS_DICTIONARIES,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'common_translation_tools',
    target: HashFragmentRouteConstants.LINKS_TRANSLATION_TOOLS,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'common_estonian_texts',
    target: HashFragmentRouteConstants.LINKS_ESTONIAN_TEXTS,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'common_audiovisual_media',
    target: HashFragmentRouteConstants.LINKS_AUDIOVISUAL_MEDIA,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'common_learning_resources',
    target: HashFragmentRouteConstants.LINKS_LEARNING_RESOURCES,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'common_learning_environments_and_courses',
    target: HashFragmentRouteConstants.LINKS_LEARNING_ENVIRONMENTS_AND_COURSES,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'common_for_teachers',
    target: HashFragmentRouteConstants.LINKS_FOR_TEACHERS,
    prefix: RouteConstants.LINKS,
    connector: '#'
  },
  {
    title: 'common_estonian_language_corpora',
    target: HashFragmentRouteConstants.LINKS_ESTONIAN_LANGUAGE_CORPORA,
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
