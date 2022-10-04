import React, {Component} from 'react';
import Nav from './Nav';
import Navbar from "./elle/components/Navbar"
import Routes from './Routes';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {compose, connectedComponent} from './util/redux-utils';
import rootReducer from './rootReducer';
import {getStatusIfNeeded} from './rootActions';
import {BrowserRouter as Router} from 'react-router-dom';
import {selectStatusLoaded} from './rootSelectors';

const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)));

class AppWithStatus extends Component {

  componentDidMount() {
    this.props.getStatusIfNeeded();
  }

  render() {
    if (!this.props.statusLoaded) return null;
    return (
      <>
        {/*<Nav/>*/}
        <Navbar/>
        <Routes/>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">
              <center>
                <small>TLÜ EVKK {new Date().getFullYear()}</small>
              </center>
            </span>
          </div>
        </footer>
      </>
    )
  }

}

const mapStateToProps = state => ({
  statusLoaded: selectStatusLoaded()(state)
});

const mapDispatchToProps = {getStatusIfNeeded};

const ConnectedAppWithStatus = connectedComponent(AppWithStatus, mapStateToProps, mapDispatchToProps);

class App extends Component {

  render() {
    return (
      <Router>
        <Provider store={store}>
          <ConnectedAppWithStatus/>
        </Provider>
      </Router>
    );
  }

}


export default App;
