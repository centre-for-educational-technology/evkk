import React, {Component} from 'react';
import IntegrationFrame from "../../components/IntegrationFrame";

class ClusterFinder extends Component {

  render() {
    return (
      <div className={'container'}>
        <IntegrationFrame integrationName={'clusterFinder'}/>
      </div>
    )
  }
}

export default ClusterFinder;
