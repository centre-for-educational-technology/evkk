import React, {Component} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {MasinoppeEnnustus, MinitornPikkus} from './views/tools';
import Correction from './elle/tools/correction/Correction.component';
import {Container} from '@mui/material';
import Home from './elle/pages/Home';
import Links from './elle/pages/Links';
import Contacts from './elle/pages/Contacts';
import FilledContacts from './elle/pages/FilledContacts';
import Grants from './elle/pages/Grants';
import ClusterFinder from './elle/tools/ClusterFinder';
import WordAnalyserParent from './elle/tools/wordanalyser/WordAnalyserParent';
import BreadcrumbLinks from './elle/components/BreadcrumbLinks';
import AboutUs from './elle/pages/AboutUs';
import Publications from './elle/pages/Publications';
import Adding from './elle/pages/Adding.component';
import Wordlist from './elle/tools/wordlist/Wordlist';
import WordContext from './elle/tools/wordcontext/WordContext';
import Collocates from './elle/tools/collocates/Collocates';
import {withTranslation} from 'react-i18next';
import ToolsNew from "./elle/pages/ToolsNew";

class AppRoutes extends Component {

  render404 = () => {
    const {t} = this.props;

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
        marginTop: '20px',
      }}
                 disableGutters
                 maxWidth={false}>
        <BreadcrumbLinks/>
        <Routes>
          <Route exact
                 path='/'
                 element={<Home/>}/>
          <Route path="/about"
                 element={<Contacts/>}>
            <Route index
                   element={<Navigate to="us"
                                      replace/>}/>
            <Route path="us"
                   element={<AboutUs/>}/>
            <Route path="people"
                   element={<FilledContacts/>}/>
            <Route path="grants"
                   element={<Grants/>}/>
            <Route path="publications"
                   element={<Publications/>}/>
          </Route>
          <Route path="/tools/minitorn-pikkus"
                 element={<MinitornPikkus/>}/>
          <Route path="/tools/masinoppe-ennustus"
                 element={<MasinoppeEnnustus/>}/>
          <Route path="/corrector"
                 element={<Correction/>}/>
          <Route path="/tools"
                 element={<ToolsNew/>}>
            <Route path="adding"
                   element={<Adding/>}/>
            <Route path="wordlist"
                   element={<Wordlist/>}/>
            <Route path="wordcontext"
                   element={<WordContext/>}/>
            <Route path="collocates"
                   element={<Collocates/>}/>
            <Route path="clusterfinder"
                   element={<ClusterFinder/>}/>
            <Route path="wordanalyser"
                   element={<WordAnalyserParent/>}/>
          </Route>
          <Route path="/links"
                 element={<Links/>}/>
          <Route path="/adding"
                 element={<Navigate to="/tools/adding"/>}/>
          <Route path="*"
                 element={this.render404()}/>
        </Routes>
      </Container>
    );
  }
}

export default withTranslation()(AppRoutes);
