import React, { Component } from "react";
import Nav from "./Nav";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { compose, connectedComponent } from "./util/redux-utils";
import rootReducer from "./rootReducer";
import { getStatusIfNeeded } from "./rootActions";
import { BrowserRouter as Router } from "react-router-dom";
import { selectStatusLoaded } from "./rootSelectors";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunkMiddleware))
);

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#9C27B0",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    custom: {
      light: "#ffa726",
      main: "#f57c00",
      dark: "#ef6c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

class AppWithStatus extends Component {
  componentDidMount() {
    this.props.getStatusIfNeeded();
  }

  render() {
    if (!this.props.statusLoaded) return null;
    return (
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Nav />
          <Routes />
          <footer className="footer">
            <div className="container">
              <span className="text-muted">
                <center>
                  <small>TLÜ EVKK {new Date().getFullYear()}</small>
                </center>
              </span>
            </div>
          </footer>
        </ThemeProvider>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  statusLoaded: selectStatusLoaded()(state),
});

const mapDispatchToProps = { getStatusIfNeeded };

const ConnectedAppWithStatus = connectedComponent(
  AppWithStatus,
  mapStateToProps,
  mapDispatchToProps
);

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <ConnectedAppWithStatus />
        </Provider>
      </Router>
    );
  }
}

export default App;
