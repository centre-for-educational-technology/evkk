import { Fragment, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './../ErrorAnalyser.css';
import {
  filterErrorTypeOptions,
  filterLanguageLevelOptions,
} from './CheckboxOptions';
import ErrorCheckbox from './Checkbox';
import { useTranslation } from 'react-i18next';
import OptionalFilters from './OptionalFilters';

export default function FilterAccordion({ getData, setData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState([]);
  const [languageLevel, setLanguageLevel] = useState([]);
  const [nativeLanguage, setNativeLanguage] = useState([]);
  const [citizenship, setCitizenship] = useState([]);
  const [education, setEducation] = useState([]);
  const [textType, setTextType] = useState([]);
  const [ageRange, setAgeRange] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  const [filterError, setFilterError] = useState({
    typeError: false,
    levelError: false,
  });
  const [isExpanded, setIsExpanded] = useState({
    accordion: true,
    optionalFilters: false,
  });
  const { t } = useTranslation();

  const getFilterOptions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'http://localhost:9090/api/errors/getFilterOptions'
      );
      const data = await response.json();
      // console.log(data);
      setFilterOptions(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFilterOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapFilterInput = (input) => {
    let mappedFilter = [];
    input.forEach((item) => {
      if (item.checked) {
        if (item.childrenNodes.length > 0) {
          mappedFilter.push(...item.childrenNodes);
        } else {
          mappedFilter.push(item);
        }
      } else {
        if (item.childrenNodes.length > 0) {
          item.childrenNodes.forEach((child) => {
            if (child.checked) {
              mappedFilter.push(child);
            }
          });
        }
      }
    });
    return mappedFilter;
  };

  const handleIsExpanded = (key) => {
    setIsExpanded({
      ...isExpanded,
      [key]: !isExpanded[key],
    });
  };

  const handleSubmit = () => {
    setData(null);
    let errorTypeFilter = mapFilterInput(errorType);
    let languageLevelFilter = mapFilterInput(languageLevel);
    let optinalFilters = [];
    if (nativeLanguage.length > 0) {
      optinalFilters.push({ nativeLanguage: nativeLanguage });
    }
    if (citizenship.length > 0) {
      optinalFilters.push({ citizenship: citizenship });
    }
    if (education.length > 0) {
      optinalFilters.push({ education: education });
    }
    if (textType.length > 0) {
      optinalFilters.push({ textType: textType });
    }
    if (ageRange.length > 0) {
      optinalFilters.push({ ageRange: ageRange });
    }

    if (errorTypeFilter.length === 0) {
      setFilterError((filterError) => ({
        ...filterError,
        typeError: true,
      }));
    }

    if (languageLevelFilter.length === 0) {
      setFilterError((filterError) => ({
        ...filterError,
        levelError: true,
      }));
    }

    if (errorTypeFilter.length > 0 && languageLevelFilter.length > 0) {
      if (errorTypeFilter.length === 12) {
        errorTypeFilter = [];
      }
      if (languageLevelFilter.length === 4) {
        languageLevelFilter = [];
      }
      getData(errorTypeFilter, languageLevelFilter, optinalFilters);
      handleIsExpanded('accordion');
    }
  };

  return (
    <>
      {isLoading ? (
        <Box className="spinner-container">
          <CircularProgress />
        </Box>
      ) : (
        <Accordion
          expanded={isExpanded.accordion}
          onChange={() => {
            handleIsExpanded('accordion');
          }}
          className="request-filter"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="request-filter-content"
            id="request-filter-header"
          >
            {t('error_analyser_select_error_type_and_language_level')}
          </AccordionSummary>

          <AccordionDetails>
            <Box className="request-filter-container">
              <Box className="request-filter-item-main">
                <Typography
                  variant="h6"
                  style={{ color: filterError.typeError ? 'red' : 'initial' }}
                >
                  {t('error_analyser_error_type')} *
                </Typography>
                <Paper
                  variant="outlined"
                  className={`checkbox-container ${
                    filterError.typeError ? 'checkbox-container-error' : ''
                  }`}
                >
                  <ErrorCheckbox
                    data={filterErrorTypeOptions}
                    setSelectedItems={setErrorType}
                    setFilterError={setFilterError}
                  />
                </Paper>
              </Box>

              <Box className="request-filter-item-side">
                <Typography
                  variant="h6"
                  style={{
                    color: filterError.levelError ? 'red' : 'initial',
                  }}
                >
                  {t('error_analyser_language_level')} *
                </Typography>
                <Paper
                  variant="outlined"
                  className={`checkbox-container ${
                    filterError.levelError ? 'checkbox-container-error' : ''
                  }`}
                >
                  <ErrorCheckbox
                    data={filterLanguageLevelOptions}
                    setSelectedItems={setLanguageLevel}
                    setFilterError={setFilterError}
                  />
                </Paper>

                {isExpanded.optionalFilters ? (
                  <Link
                    sx={{ my: 4 }}
                    component="button"
                    variant="body2"
                    onClick={() => {
                      handleIsExpanded('optionalFilters');
                    }}
                  >
                    {t('error_analyser_close_more_options')}
                  </Link>
                ) : (
                  <Link
                    sx={{ my: 4 }}
                    component="button"
                    variant="body2"
                    onClick={() => {
                      handleIsExpanded('optionalFilters');
                    }}
                  >
                    {t('error_analyser_open_more_options')}
                  </Link>
                )}

                {isExpanded.optionalFilters && (
                  <OptionalFilters
                    filterOptions={filterOptions}
                    languageLevel={languageLevel}
                    setLanguageLevel={setLanguageLevel}
                    nativeLanguage={nativeLanguage}
                    setNativeLanguage={setNativeLanguage}
                    citizenship={citizenship}
                    setCitizenship={setCitizenship}
                    education={education}
                    setEducation={setEducation}
                    textType={textType}
                    setTextType={setTextType}
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                  />
                )}
              </Box>
            </Box>
          </AccordionDetails>

          <AccordionActions>
            <Box>
              <Button variant="contained" onClick={handleSubmit}>
                {t('send_request_button')}
              </Button>
            </Box>
          </AccordionActions>
        </Accordion>
      )}
    </>
  );
}
