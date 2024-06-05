import React, { useContext, useEffect, useState } from 'react';
import Navbar from './elle/components/Navbar';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, useNavigate, useSearchParams } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import AppRoutes from './AppRoutes';
import { ThemeProvider } from '@mui/material';
import { EventEmitter } from 'events';
import ErrorSnackbar, { ErrorSnackbarEventType } from './elle/components/ErrorSnackbar';
import LoadingSpinner from './elle/components/LoadingSpinner';
import ServerOfflinePage from './elle/components/ServerOfflinePage';
import SuccessSnackbar from './elle/components/SuccessSnackbar';
import FooterElement from './elle/components/FooterElement';
import DonateText from './elle/components/DonateText';
import { getStatusIfNeeded } from './elle/service/RootService';
import { rootStore } from './elle/store/RootStore';
import { applyMiddleware, compose, createStore } from 'redux';
import { setLogoutFunctions } from './elle/util/LogoutFunctionUtils';
import AuthContext, { AuthProvider } from './elle/context/AuthContext';
import withGlobalLoading from './elle/hoc/withGlobalLoading';
import SessionExpirationModal from './elle/components/SessionExpirationModal';

export const errorEmitter = new EventEmitter();
export const loadingEmitter = new EventEmitter();
export const successEmitter = new EventEmitter();

const store = createStore(compose(applyMiddleware(thunkMiddleware)));

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

function AppWithStatus() {
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const [isOffline, setIsOffline] = useState(false);
  const { setContext, clearContext } = useContext(AuthContext);

  useEffect(() => {
    getStatusIfNeeded();
    const unsubscribe = rootStore.subscribe(() => {
      setIsOffline(rootStore.getState().status === false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (urlParams.get('accessToken')) {
      localStorage.setItem('accessToken', urlParams.get('accessToken'));
      setContext();
      navigate('', { replace: true });
    }

    if (urlParams.get('loginFailed')) {
      errorEmitter.emit(ErrorSnackbarEventType.LOGIN_FAILED);
      navigate('', { replace: true });
    }

    if (urlParams.get('idCodeMissing')) {
      errorEmitter.emit(ErrorSnackbarEventType.ID_CODE_MISSING);
      navigate('', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams]);

  useEffect(() => {
    setLogoutFunctions(navigate, clearContext);
  }, [navigate, clearContext]);

  if (isOffline) {
    return <ServerOfflinePage retry={getStatusIfNeeded} />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between">
      <div>
        <ErrorSnackbar />
        <SuccessSnackbar />
        <LoadingSpinner />
        <SessionExpirationModal />
        <Navbar />
        <DonateText />
        <AppRoutes />
      </div>
      <FooterElement />
    </div>
  );
}

const AppWithStatusAndLoading = withGlobalLoading(AppWithStatus);

export default function App() {

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AuthProvider>
            <AppWithStatusAndLoading />
          </AuthProvider>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}
