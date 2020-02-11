import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {About, Login} from "./views";
import {MasinoppeEnnustus, MinitornPikkus} from "./views/tools";

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
          <Route path="/login" component={Login}/>
          <Route path="/tools/minitorn-pikkus" component={MinitornPikkus}/>
          <Route path="/tools/masinoppe-ennustus" component={MasinoppeEnnustus}/>
          <Route component={() => this.render404()}/>
        </Switch>
      </div>
    );
  }

}

export default Routes;
