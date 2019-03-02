import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Files} from './views';

class App extends Component {
    render() {
        return (
            <Router>
                <Route path={'/files'} component={Files}/>
            </Router>
        );
    }
}

export default App;
