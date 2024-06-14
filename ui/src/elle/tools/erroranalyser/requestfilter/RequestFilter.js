import { Fragment, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './../ErrorAnalyser.css';
import { filterErrorTypeOptions, filterLanguageLevelOptions, } from './CheckboxOptions';
import Checkbox from './Checkbox';
import { useTranslation } from 'react-i18next';
import OptionalFilters from './OptionalFilters';
import { loadFetch } from '../../../service/LoadFetch';

export default function RequestFilter({getData, setData, setFilters}) {
  const [errorType, setErrorType] = useState([]);
  const [languageLevel, setLanguageLevel] = useState([]);
  const [citizenship, setCitizenship] = useState([]);
  const [education, setEducation] = useState([]);
  const [textType, setTextType] = useState([]);
  const [ageRange, setAgeRange] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  const [requestFilterErrors, setRequestFilterErrors] = useState({
    typeError: false,
    levelError: false,
  });
  const [isExpanded, setIsExpanded] = useState({
    accordion: true,
    optionalFilters: false,
  });
  const {t} = useTranslation();

  const getFilterOptions = async () => {
//
    return loadFetch('/api/errors/getFilterOptions').then(res => res.json()).catch(error => console.error('Error:', error));

    /*try {
      setIsLoading(true);
      const response = await fetch(
        'http://localhost:9090/api/errors/getFilterOptions'
      );
      if (response.status === 200) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }*/
  };

  useEffect(() => {
    getFilterOptions().then(setFilterOptions);
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
    let optionalFilters = [];

    if (citizenship.length > 0) {
      optionalFilters.push({citizenship: citizenship});
    }
    if (education.length > 0) {
      optionalFilters.push({education: education});
    }
    if (textType.length > 0) {
      optionalFilters.push({textType: textType});
    }
    if (ageRange.length > 0) {
      optionalFilters.push({ageRange: ageRange});
    }

    if (errorTypeFilter.length === 0) {
      setRequestFilterErrors(prevState => ({
        typeError: true,
        levelError: prevState.typeError,
      }));
    }

    if (languageLevelFilter.length === 0) {
      setRequestFilterErrors(prevState => ({
        levelError: true,
        typeError: prevState.typeError,
      }));
    }

    if (errorTypeFilter.length > 0 && languageLevelFilter.length > 0) {

      let filters = {
        errorType: errorTypeFilter.map((item) => item.type),
        languageLevel: languageLevelFilter.map((item) => item.type),
        citizenship,
        education,
        textType,
        age: ageRange,
      };

      setFilters(filters);
      getData(errorTypeFilter, languageLevelFilter, optionalFilters).then(setData);
      handleIsExpanded('accordion');
    }
  };

  return (
    <>
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
          <Typography variant="h6">
            {t('error_analyser_select_error_type_and_language_level')}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box className="request-filter-container">
            <Box className="request-filter-item-main">
              <Typography
                variant="h6"
                style={{color: requestFilterErrors.typeError ? 'red' : 'initial'}}
              >
                {t('error_analyser_error_type')} *
              </Typography>
              <Paper
                variant="outlined"
                className={`checkbox-container ${
                  requestFilterErrors.typeError ? 'checkbox-container-error' : ''
                }`}
              >
                <Checkbox
                  data={filterErrorTypeOptions}
                  setSelectedItems={setErrorType}
                  setRequestFilterErrors={setRequestFilterErrors}
                />
              </Paper>
            </Box>

            <Box className="request-filter-item-side">
              <Typography
                variant="h6"
                style={{
                  color: requestFilterErrors.levelError ? 'red' : 'initial',
                }}
              >
                {t('error_analyser_language_level')} *
              </Typography>
              <Paper
                variant="outlined"
                className={`checkbox-container ${
                  requestFilterErrors.levelError ? 'checkbox-container-error' : ''
                }`}
              >
                <Checkbox
                  data={filterLanguageLevelOptions}
                  setSelectedItems={setLanguageLevel}
                  setRequestFilterErrors={setRequestFilterErrors}
                />
              </Paper>

              {isExpanded.optionalFilters ? (
                <Link
                  sx={{my: 4, fontSize: '16px'}}
                  component="button"
                  onClick={() => {
                    handleIsExpanded('optionalFilters');
                  }}
                >
                  {t('error_analyser_close_more_options')}
                </Link>
              ) : (
                <Link
                  sx={{my: 4, fontSize: '16px'}}
                  component="button"
                  onClick={() => {
                    handleIsExpanded('optionalFilters');
                  }}
                >
                  {t('error_analyser_open_more_options')}
                </Link>
              )}

              {isExpanded.optionalFilters && filterOptions && (
                <OptionalFilters
                  filterOptions={filterOptions}
                  languageLevel={languageLevel}
                  setLanguageLevel={setLanguageLevel}
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

    </>
  );
}
