import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {About, Employees, Login, Resources} from "./views";
import {MasinoppeEnnustus, MinitornPikkus} from "./views/tools";
import ClusterFinder from "./views/tools/ClusterFinder";
import {Files} from "./views/user";
import Resource from "./views/Resource.component";
import Correction from "./views/Correction.component";
import Query from './views/tools/Query';

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
      <div className={'mt-4'}>
        <Switch>
          <Route exact path={'/'} render={() => <Redirect to={'/about'}/>}/>
          <Route path="/about" component={About}/>
          <Route path="/employees" component={Employees}/>
          <Route path="/resources" component={Resources}/>
          <Route path="/resource" component={Resource}/>
          <Route path="/correction" component={Correction}/>
          <Route path="/login" component={Login}/>
          <Route path="/files" component={Files}/>
          <Route path="/tools/minitorn-pikkus" component={MinitornPikkus}/>
          <Route path="/tools/masinoppe-ennustus" component={MasinoppeEnnustus}/>
          <Route path="/tools/clusterfinder" component={ClusterFinder}/>
          <Route path="/query" component={Query}/>
          <Route component={() => this.render404()}/>
        </Switch>
      </div>
    );
  }

}

export default Routes;
