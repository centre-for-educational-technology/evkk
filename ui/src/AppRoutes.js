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
import Login from './elle/pages/Login';

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
          <Route path="/about"
                 element={<AboutUs />}>
            <Route index
                   element={<Navigate to="us"
                                      replace />} />
            <Route path="us"
                   element={<AboutUsText />} />
            <Route path="people"
                   element={<FilledContacts />} />
            <Route path="grants"
                   element={<Grants />} />
            <Route path="publications"
                   element={<Publications />} />
          </Route>
          <Route path="/adding"
                 element={<Adding />} />
          <Route path="/corrector"
                 element={<Correction />} />
          <Route path="/tools"
                 element={<Tools />}>
            <Route index
                   element={<Navigate to="wordlist"
                                      replace />} />
            <Route path="wordlist"
                   element={<Wordlist />} />
            <Route path="wordcontext"
                   element={<WordContext />} />
            <Route path="collocates"
                   element={<Collocates />} />
            <Route path="clusterfinder"
                   element={<ClusterFinder />} />
            <Route path="wordanalyser"
                   element={<WordAnalyserParent />} />
            <Route path="minitorn-pikkus"
                   element={<MinitornPikkus />} />
            <Route path="masinoppe-ennustus"
                   element={<MasinoppeEnnustus />} />
          </Route>
          <Route path="/links"
                 element={<Links />} />
          <Route path="/login"
                 element={<Login />} />
          <Route path="*"
                 element={this.render404()} />
        </Routes>
      </Container>
    );
  }
}

export default withTranslation()(AppRoutes);
