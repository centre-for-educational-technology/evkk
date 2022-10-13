import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
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

class Routes extends Component {

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
        <Switch>
          <Route exact
                 path='/'
                 component={Home}/>
          <Route path="/about"
                 component={Contacts}/>
          <Route path="/employees"
                 component={Employees}/>
          <Route path="/resources"
                 component={Resources}/>
          <Route path="/resource"
                 component={Resource}/>
          <Route path="/correction"
                 component={Correction}/>
          <Route path="/login"
                 component={Login}/>
          <Route path="/files"
                 component={Files}/>
          <Route path="/tools/minitorn-pikkus"
                 component={MinitornPikkus}/>
          <Route path="/tools/masinoppe-ennustus"
                 component={MasinoppeEnnustus}/>
          <Route path="/tools/clusterfinder"
                 component={ClusterFinder}/>
          <Route path="/tools/wordanalyser"
                 component={WordAnalyser}/>
          <Route path="/corrector"
                 component={Corrector}/>
          <Route path="/tools"
                 component={Tools}/>
          <Route path="/links"
                 component={Links}/>
          <Route component={() => this.render404()}/>
        </Switch>
      </Container>
    );
  }
}

export default Routes;
