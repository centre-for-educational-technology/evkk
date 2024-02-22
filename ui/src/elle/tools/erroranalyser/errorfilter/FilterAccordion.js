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
import { errorTypeOptions, languageLevelOptions } from './CheckboxData';
import ErrorCheckbox from './Checkbox';
import Multiselect from './Multiselect';
import {
  ageOptions,
  educationOptions,
  languageOptions,
  nationalityOptions,
  textTypesOptions,
} from '../../../const/Constants';
import { useTranslation } from 'react-i18next';

export default function FilterAccordion({ getData, setData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState([]);
  const [languageLevel, setLanguageLevel] = useState([]);
  const [nativeLanguage, setNativeLanguage] = useState([]);
  const [citizenship, setCitizenship] = useState([]);
  const [education, setEducation] = useState([]);
  const [textType, setTextType] = useState([]);
  const [age, setAge] = useState([]);

  const [textTypeOptions, setTextTypeOptions] = useState([]);
  const [nativeLanguageOptions, setNativeLanguageOptions] = useState([]);
  const [citizenshipOptions, setCitizenshipOptions] = useState([]);

  const [filterError, setFilterError] = useState({
    typeError: false,
    levelError: false,
  });
  const [isExpanded, setIsExpanded] = useState({
    accordion: true,
    optionalFilters: false,
  });
  const { t, i18n } = useTranslation();

  function handleChange(event, setValue) {
    const {
      target: { value },
    } = event;
    setValue(typeof value === 'string' ? value.split(',') : value);
  }

  const filterFilterOptions = (options, filter) => {
    return Object.keys(options)
      .filter((key) => filter.includes(key))
      .reduce((newObj, key) => {
        newObj[key] = options[key];
        return newObj;
      }, {});
  };

  const sortFilterOptions = (options) => {
    return Object.entries(options)
      .sort(([keyA, valueA], [keyB, valueB]) => {
        const collator = new Intl.Collator(i18n.language, {
          sensitivity: 'base',
        });
        return collator.compare(t(valueA), t(valueB));
      })
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  };

  useEffect(() => {
    setTextTypeOptions(sortFilterOptions(textTypeOptions));
    setNativeLanguageOptions(sortFilterOptions(nativeLanguageOptions));
    setCitizenshipOptions(sortFilterOptions(citizenshipOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const transformFilterOptions = (data) => {
    let filteredTextTypeOptions = filterFilterOptions(
      textTypesOptions.cFOoRQekA.query_text_data_type_L2_exercise,
      data.textType
    );
    filteredTextTypeOptions = sortFilterOptions(filteredTextTypeOptions);
    setTextTypeOptions(filteredTextTypeOptions);

    let filteredLanguageOptions = filterFilterOptions(
      languageOptions,
      data.nativeLanguages
    );
    filteredLanguageOptions = sortFilterOptions(filteredLanguageOptions);
    setNativeLanguageOptions(filteredLanguageOptions);

    let filteredCitizenshipOptions = filterFilterOptions(
      nationalityOptions,
      data.citizenship
    );
    filteredCitizenshipOptions = sortFilterOptions(filteredCitizenshipOptions);
    setCitizenshipOptions(filteredCitizenshipOptions);
  };

  const getFilterOptions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'http://localhost:9090/api/errors/getFilterEnums'
      );
      const data = await response.json();
      transformFilterOptions(data);
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
    const errorTypeFilter = mapFilterInput(errorType);
    // console.log(errorType, errorTypeFilter);
    let languageLevelFilter = mapFilterInput(languageLevel);
    // console.log(languageLevel, languageLevelFilter);
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
    if (age.length > 0) {
      optinalFilters.push({ age: age });
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

    console.log(errorTypeFilter);

    if (errorTypeFilter.length > 0 && languageLevelFilter.length > 0) {
      // console.log(languageLevelFilter);
      if (languageLevelFilter.length === 4) {
        languageLevelFilter = [];
      }
      // console.log(errorTypeFilter);

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
          onChange={() => handleIsExpanded('accordion')}
          className="error-filter"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="error-filter-content"
            id="error-filter-header"
          >
            Vali veatüüp ja keeletase
          </AccordionSummary>

          <AccordionDetails>
            <Box className="filter-container">
              <Box className="filter-item-main">
                <Typography
                  variant="h6"
                  style={{ color: filterError.typeError ? 'red' : 'initial' }}
                >
                  Veatüüp *
                </Typography>
                <Paper
                  variant="outlined"
                  className={`checkbox-container ${
                    filterError.typeError ? 'checkbox-container-error' : ''
                  }`}
                >
                  <ErrorCheckbox
                    data={errorTypeOptions}
                    setSelectedItems={setErrorType}
                    setFilterError={setFilterError}
                  />
                </Paper>
              </Box>

              <Box className="filter-item-side">
                <Typography
                  variant="h6"
                  style={{
                    color: filterError.levelError ? 'red' : 'initial',
                  }}
                >
                  Keeletase *
                </Typography>
                <Paper
                  variant="outlined"
                  className={`checkbox-container ${
                    filterError.levelError ? 'checkbox-container-error' : ''
                  }`}
                >
                  <ErrorCheckbox
                    data={languageLevelOptions}
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
                    Sulge täpsem valik
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
                    Ava täpsem valik
                  </Link>
                )}

                {isExpanded.optionalFilters && (
                  <Fragment>
                    <Typography variant="h6">Täpsem valik</Typography>

                    <Multiselect
                      selected={textType}
                      setSelected={setTextType}
                      handleChange={(event) => handleChange(event, setTextType)}
                      options={textTypeOptions}
                      label={t('error_analyser_text_type')}
                      id="text-type"
                    />
                    <Multiselect
                      selected={nativeLanguage}
                      setSelected={setNativeLanguage}
                      handleChange={(event) =>
                        handleChange(event, setNativeLanguage)
                      }
                      options={nativeLanguageOptions}
                      label={t('error_analyser_authors_native_language')}
                      id="authors-native-language"
                    />
                    <Multiselect
                      selected={education}
                      setSelected={setEducation}
                      handleChange={(event) =>
                        handleChange(event, setEducation)
                      }
                      options={educationOptions}
                      label={t('error_analyser_authors_education')}
                      id="authors-education"
                    />
                    <Multiselect
                      selected={citizenship}
                      setSelected={setCitizenship}
                      handleChange={(event) =>
                        handleChange(event, setCitizenship)
                      }
                      options={citizenshipOptions}
                      label={t('error_analyser_authors_citizenship')}
                      id="authors-citizenship"
                    />
                    <Multiselect
                      selected={age}
                      setSelected={setAge}
                      handleChange={(event) => handleChange(event, setAge)}
                      options={ageOptions}
                      label={t('error_analyser_authors_age')}
                      id="autors-age"
                    />
                  </Fragment>
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
