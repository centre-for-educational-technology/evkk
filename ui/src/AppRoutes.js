import React, { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MasinoppeEnnustus, MinitornPikkus } from './views/tools';
import Correction from './elle/tools/correction/Correction';
import { Container } from '@mui/material';
import Home from './elle/pages/Home';
import Links from './elle/pages/Links';
import AboutUs from './elle/pages/AboutUs';
import FilledContacts from './elle/components/about/FilledContacts';
import Grants from './elle/components/about/Grants';
import ClusterFinder from './elle/tools/ClusterFinder';
import WordAnalyserParent from './elle/tools/wordanalyser/WordAnalyserParent';
import BreadcrumbLinks from './elle/components/BreadcrumbLinks';
import AboutUsText from './elle/components/about/AboutUsText';
import Publications from './elle/components/about/Publications';
import Adding from './elle/pages/Adding.component';
import Wordlist from './elle/tools/wordlist/Wordlist';
import WordContext from './elle/tools/wordcontext/WordContext';
import Collocates from './elle/tools/collocates/Collocates';
import { withTranslation } from 'react-i18next';
import Tools from './elle/pages/Tools';

class AppRoutes extends Component {

  render404 = () => {
    const { t } = this.props;

    return (
      <div className={'text-center pb-4'}>
        <p className={'lead'}>{t('error_404_page_not_found')}</p>
      </div>
    );
  };

  render() {
    return (
      <Container sx={{
        width: '80vw',
        marginTop: '20px'
      }}
                 disableGutters
                 maxWidth={false}>
        <BreadcrumbLinks />
        <Routes>
          <Route exact
                 path="/"
                 element={<Home />} />
          <Route path={RouteConstants.ABOUT}
                 element={<AboutUs />}>
            <Route index
                   element={<Navigate to={RouteConstants.US}
                                      replace />} />
            <Route path={RouteConstants.US}
                   element={<AboutUsText />} />
            <Route path={RouteConstants.PEOPLE}
                   element={<FilledContacts />} />
            <Route path={RouteConstants.GRANTS}
                   element={<Grants />} />
            <Route path={RouteConstants.PUBLICATIONS}
                   element={<Publications />} />
          </Route>
          <Route path={RouteConstants.ADDING}
                 element={<Adding />} />
          <Route path={RouteConstants.CORRECTOR}
                 element={<Correction />} />
          <Route path={RouteConstants.TOOLS}
                 element={<Tools />}>
            <Route index
                   element={<Navigate to={RouteConstants.WORDLIST}
                                      replace />} />
            <Route path={RouteConstants.WORDLIST}
                   element={<Wordlist />} />
            <Route path={RouteConstants.WORDCONTEXT}
                   element={<WordContext />} />
            <Route path={RouteConstants.COLLOCATES}
                   element={<Collocates />} />
            <Route path={RouteConstants.CLUSTERFINDER}
                   element={<ClusterFinder />} />
            <Route path={RouteConstants.WORDANALYSER}
                   element={<WordAnalyserParent />} />
            <Route path="minitorn-pikkus"
                   element={<MinitornPikkus />} />
            <Route path="masinoppe-ennustus"
                   element={<MasinoppeEnnustus />} />
          </Route>
          <Route path={RouteConstants.LINKS}
                 element={<Links />} />
          <Route path="*"
                 element={this.render404()} />
        </Routes>
      </Container>
    );
  }
}

export const RouteConstants = {
  ABOUT: 'about',
  ADDING: 'adding',
  CLUSTERFINDER: 'clusterfinder',
  COLLOCATES: 'collocates',
  CORRECTOR: 'corrector',
  GRANTS: 'grants',
  LINKS: 'links',
  PEOPLE: 'people',
  PUBLICATIONS: 'publications',
  TOOLS: 'tools',
  US: 'us',
  WORDANALYSER: 'wordanalyser',
  WORDCONTEXT: 'wordcontext',
  WORDLIST: 'wordlist'
};

export const RouteFullPathConstants = {
  WORDANALYSER: `/${RouteConstants.TOOLS}/${RouteConstants.WORDANALYSER}`,
  COLLOCATES: `/${RouteConstants.TOOLS}/${RouteConstants.COLLOCATES}`,
  WORDCONTEXT: `/${RouteConstants.TOOLS}/${RouteConstants.WORDCONTEXT}`,
  WORDLIST: `/${RouteConstants.TOOLS}/${RouteConstants.WORDLIST}`,
  CLUSTERFINDER: `/${RouteConstants.TOOLS}/${RouteConstants.CLUSTERFINDER}`
};

export const HashFragmentRouteConstants = {
  LINKS_ABIKS_OPETAJALE: 'abiks-õpetajale',
  LINKS_AUDIOVISUAALNE_MEEDIA: 'audiovisuaalne-meedia',
  LINKS_AUDIOVISUAALNE_MEEDIA_RAADIO_AUDIO_TASKUHAALINGUD: 'raadio-audio-taskuhäälingud',
  LINKS_AUDIOVISUAALNE_MEEDIA_SARJAD_FILMID_VIDEOD: 'sarjad-filmid-videod',
  LINKS_EESTIKEELSED_TEKSTID: 'eestikeelsed-tekstid',
  LINKS_EESTIKEELSED_TEKSTID_KIRJANDUS: 'kirjandus',
  LINKS_EESTIKEELSED_TEKSTID_MEEDIATEKSTID: 'meediatekstid',
  LINKS_EESTIKEELSED_TEKSTID_TEADUSTEKSTID: 'teadustekstid',
  LINKS_EESTI_KEELE_KORPUSED: 'eesti-keele-korpused',
  LINKS_KEELEOPPEKESKKONNAD_KURSUSED: 'keeleõppekeskkonnad-kursused',
  LINKS_KEELEOPPEKESKKONNAD_KURSUSED_KEELEOPPEKESKKONNAD: 'keeleõppekeskkonnad',
  LINKS_KEELEOPPEKESKKONNAD_KURSUSED_KURSUSED: 'kursused',
  LINKS_KEELEOPPEVARA: 'keeleõppevara',
  LINKS_KEELEOPPEVARA_KEELEOPPEMANGUD: 'keeleõppemangud',
  LINKS_KEELEOPPEVARA_OPPEMATERJALID_HARJUTUSED: 'õppematerjalid-harjutused',
  LINKS_SONASTIKUD: 'sõnastikud',
  LINKS_TOLKERAKENDUSED: 'tõlkerakendused',
  LINKS_TUTVUSTUS: 'tutvustus',
  PUBLICATIONS_ARTICLES: 'articles',
  PUBLICATIONS_CONFERENCES_AND_WORKSHOPS: 'conferences-and-workshops',
  PUBLICATIONS_GRADUATION_PAPERS: 'graduation-papers'
};

export default withTranslation()(AppRoutes);
