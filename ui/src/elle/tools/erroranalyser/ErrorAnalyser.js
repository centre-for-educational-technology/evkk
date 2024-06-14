import { useState } from 'react';
import {
  Alert,
  Box,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import RequestFilter from './requestfilter/RequestFilter';
import ResultTable from './resulttable/ResultTable';
import { useTranslation } from 'react-i18next';
import ErrorAnalyserKey from './ErrorAnalyserKey';
import LoadingSpinner from '../../components/LoadingSpinner';
import { loadFetch } from '../../service/LoadFetch';

export default function ErrorAnalyser() {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState([]);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const {t} = useTranslation();

  const getData = async (
    errorTypeFilter,
    languageLevelFilter,
    optionalFilters
  ) => {
    let query = '/api/errors/getErrors?';

    errorTypeFilter.forEach((element) => {
      query += 'errorType=' + element.type + '&';
    });

    languageLevelFilter.forEach((element) => {
      query += 'languageLevel=' + element.type + '&';
    });

    optionalFilters.forEach((element) => {
      Object.entries(element).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            query += `${key}=${item}&`;
          });
        }
      });
    });

    query = query.slice(0, -1);

    return loadFetch(query).then(res => res.json()).catch(error => console.error('Error:', error));
  };

  const handleSwitchChange = () => {
    setShowAllErrors(!showAllErrors);
  };

  return (
    <>
      <Typography variant="h3" sx={{mb: '50px'}}>{t('error_analyser_title')}</Typography>

      {!data && <Box sx={{my: '50px', maxWidth: '500px'}}>
        <Alert severity="info">
          {t('error_analyser_intro')}
        </Alert>
      </Box>}

      <RequestFilter
        getData={getData}
        setData={setData}
        setFilters={setFilters}
      />

      {/*false && isLoading && (
        <Box className="spinner-container">
          <CircularProgress />
        </Box>

      )*/}

      <LoadingSpinner />

      {data && (
        <>
          <ErrorAnalyserKey />
          <FormControlLabel
            control={
              <Switch checked={showAllErrors} onChange={handleSwitchChange} />
            }
            label={t('error_analyser_show_all_errors')}
          />
          <ResultTable
            data={data}
            filters={filters}
            showAllErrors={showAllErrors}
          />
        </>
      )}
    </>
  );
}
