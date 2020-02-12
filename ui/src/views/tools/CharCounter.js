import React, {Component} from 'react';
import IntegrationFrame from "../../components/IntegrationFrame";

class CharCounter extends Component {

  render() {
    return (
      <div className={'container'}>
        <IntegrationFrame integrationName={'charCounter'}/>
      </div>
    )
  }

}

export default CharCounter;
