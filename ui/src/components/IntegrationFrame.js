import React, {Component} from 'react';
import {connectedComponent} from "../util/redux-utils";
import {selectIntegrationPath} from "../rootSelectors";

class IntegrationFrame extends Component {

  render() {
    return (
      <div className="embed-responsive embed-responsive-21by9">
        <iframe src={this.props.path} title={this.props.integrationName}/>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
  path: selectIntegrationPath(ownProps.integrationName)(state)
});

export default connectedComponent(IntegrationFrame, mapStateToProps);
