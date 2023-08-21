import React, {Component} from 'react';
import Navbar from './elle/components/Navbar';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {compose, connectedComponent} from './util/redux-utils';
import rootReducer from './rootReducer';
import {getStatusIfNeeded} from './rootActions';
import {BrowserRouter as Router} from 'react-router-dom';
import {selectStatusLoaded} from './rootSelectors';
import {createTheme} from '@mui/material/styles';
import AppRoutes from './AppRoutes';
import {ThemeProvider} from '@mui/material';
import {EventEmitter} from 'events';
import ErrorSnackbar from './elle/components/ErrorSnackbar';
import LoadingSpinner from './elle/components/LoadingSpinner';
import ServerOfflinePage from './elle/components/ServerOfflinePage';
import SuccessSnackbar from './elle/components/SuccessSnackbar';
import FooterElement from "./elle/components/FooterElement";

export const errorEmitter = new EventEmitter();
export const loadingEmitter = new EventEmitter();
export const successEmitter = new EventEmitter();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunkMiddleware))
);

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#2196F3'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00'
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  },
  typography: {
    fontFamily: `"Mulish", "sans-serif"`
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1rem',
          maxWidth: '400px'
        }
      }
    }
  }
});

class AppWithStatus extends Component {

  componentDidMount() {
    this.props.getStatusIfNeeded();
  }

  render() {
    if (!this.props.statusLoaded) return <ServerOfflinePage/>;
    return (
      <>
        <ErrorSnackbar/>
        <SuccessSnackbar/>
        <LoadingSpinner/>
        <Navbar/>
        <AppRoutes/>
        <FooterElement/>
      </>
    );
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
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ConnectedAppWithStatus/>
          </Provider>
        </ThemeProvider>
      </Router>
    );
  }

}

export default App;
