import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import RequestFilter from './requestfilter/RequestFilter';
import ResultTable from './resulttable/ResultTable';
import { useTranslation } from 'react-i18next';
import ErrorAnalyserKey from './ErrorAnalyserKey';

export default function ErrorAnalyser() {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const {t} = useTranslation();

  const getData = async (
    errorTypeFilter,
    languageLevelFilter,
    optionalFilters
  ) => {
    let query = 'http://localhost:9090/api/errors/getErrors?';

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

    try {
      setIsLoading(true);
      const response = await fetch(query);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchChange = () => {
    setShowAllErrors(!showAllErrors);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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

      {isLoading && data && (
        <Box className="spinner-container">
          <CircularProgress />
        </Box>
      )}

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
