import { Alert, Button } from '@mui/material';
import './styles/ServerErrorPage.css';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ServerDownPage() {

  const {t} = useTranslation();

  return (
    <>
      <Navbar/>
      <span className="server-error-page">
        <Alert severity="error">
          {t('server_down_page_error')}
        </Alert>
        <Button variant="contained"
                onClick={() => window.location.reload()}>
          {t('try_again')}
        </Button>
      </span>
      <Footer/>
    </>
  );
}
