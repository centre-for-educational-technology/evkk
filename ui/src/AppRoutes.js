import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import {Employees, Login, Resources} from "./views";
import {MasinoppeEnnustus, MinitornPikkus} from "./views/tools";
import ClusterFinder from "./views/tools/ClusterFinder";
import {Files} from "./views/user";
import Resource from "./views/Resource.component";
import Correction from "./views/Correction.component";
import WordAnalyser from "./views/tools/wordanalyser/WordAnalyser";
import Tools from "./elle/pages/Tools";
import {Container} from "@mui/material";
import Corrector from "./elle/pages/Corrector";
import Home from "./elle/pages/Home";
import Links from "./elle/pages/Links";
import Contacts from "./elle/pages/Contacts";
import FilledContacts from "./elle/components/FilledContacts";
import Grants from "./elle/components/Grants";

class AppRoutes extends Component {

  render404 = () => {
    return (
      <div className={'text-center'}>
        <p className={"lead"}>404: lehte ei leitud</p>
      </div>
    );
  };

  render() {
    return (
      <Container sx={{mb: 10, marginBottom: 0}}
                 disableGutters
                 maxWidth={false}>
        <Routes>
          <Route exact
                 path='/'
                 element={<Home/>}/>
          <Route path="/about"
                 element={<Contacts/>}>
            <Route index element={<FilledContacts/>}/>
            <Route path="people" element={<FilledContacts/>}/>
            <Route path="grants" element={<Grants/>}/>
          </Route>
          <Route path="/employees"
                 element={<Employees/>}/>
          <Route path="/resources"
                 element={<Resources/>}/>
          <Route path="/resource"
                 element={<Resource/>}/>
          <Route path="/correction"
                 element={<Correction/>}/>
          <Route path="/login"
                 element={<Login/>}/>
          <Route path="/files"
                 element={<Files/>}/>
          <Route path="/tools/minitorn-pikkus"
                 element={<MinitornPikkus/>}/>
          <Route path="/tools/masinoppe-ennustus"
                 element={<MasinoppeEnnustus/>}/>
          <Route path="/tools/clusterfinder"
                 element={<ClusterFinder/>}/>
          <Route path="/tools/wordanalyser"
                 element={<WordAnalyser/>}/>
          <Route path="/corrector"
                 element={<Corrector/>}/>
          <Route path="/tools"
                 element={<Tools/>}/>
          <Route path="/links"
                 element={<Links/>}/>
          <Route element={() => this.render404()}/>
        </Routes>
      </Container>
    );
  }
}

export default AppRoutes;
