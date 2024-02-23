import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import FilterAccordion from './requestfilter/RequestFilter';
import ErrorTable from './errortable/ErrorTable';
import { useTranslation } from 'react-i18next';

export default function ErrorAnalyser() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

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

    console.log(query);

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

  // useEffect(() => {
  //   // getErrors(["LEX"], ["B1"]);
  //   getFilterEnums();
  // }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Typography variant="h3">{t('error_analyser_title')}</Typography>

      <FilterAccordion getData={getData} setData={setData} />

      {isLoading && (
        <Box className="spinner-container">
          <CircularProgress />
        </Box>
      )}

      {data && <ErrorTable errorData={data} />}
    </>
  );
}
