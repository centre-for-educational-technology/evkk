import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {MasinoppeEnnustus, MinitornPikkus} from "./views/tools";
import Correction from "./elle/tools/correction/Correction.component";
import Tools from "./elle/pages/Tools";
import {Container} from "@mui/material";

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
      <Container sx={{
        mb: 10,
        marginBottom: '20px',
        width: '80vw',
        boxShadow: "0px 0px 20px -5px #CCA8FD",
        marginTop: '20px'
      }}
                 disableGutters
                 maxWidth={false}>
        <Switch>
          <Route exact
                 path='/'
                 component={Home}/>
          <Route path="/about"
                 component={Contacts}/>
          <Route path="/tools/minitorn-pikkus"
                 component={MinitornPikkus}/>
          <Route path="/tools/masinoppe-ennustus"
                 component={MasinoppeEnnustus}/>
          <Route path="/corrector"
                 component={Correction}/>
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
