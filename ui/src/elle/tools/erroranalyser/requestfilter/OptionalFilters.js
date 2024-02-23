import { Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import Multiselect from './Multiselect';
import {
  ageOptions,
  educationOptions,
  languageOptions,
  nationalityOptions,
  textTypesOptions,
} from '../../../const/Constants';
import { useTranslation } from 'react-i18next';

export default function OptionalFilters({
  filterOptions,
  setLanguageLevel,
  nativeLanguage,
  setNativeLanguage,
  citizenship,
  setCitizenship,
  education,
  setEducation,
  textType,
  setTextType,
  ageRange,
  setAgeRange,
}) {
  const [textTypeOptions, setTextTypeOptions] = useState([]);
  const [nativeLanguageOptions, setNativeLanguageOptions] = useState([]);
  const [citizenshipOptions, setCitizenshipOptions] = useState([]);
  const { t, i18n } = useTranslation();

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
      data.nativeLanguage
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

  useEffect(() => {
    transformFilterOptions(filterOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event, setValue) {
    const {
      target: { value },
    } = event;
    setValue(typeof value === 'string' ? value.split(',') : value);
  }
  return (
    <Fragment>
      <Typography variant="h6">{t('error_analyser_more_options')}</Typography>

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
        handleChange={(event) => handleChange(event, setNativeLanguage)}
        options={nativeLanguageOptions}
        label={t('error_analyser_authors_native_language')}
        id="authors-native-language"
      />
      <Multiselect
        selected={education}
        setSelected={setEducation}
        handleChange={(event) => handleChange(event, setEducation)}
        options={educationOptions}
        label={t('error_analyser_authors_education')}
        id="authors-education"
      />
      <Multiselect
        selected={citizenship}
        setSelected={setCitizenship}
        handleChange={(event) => handleChange(event, setCitizenship)}
        options={citizenshipOptions}
        label={t('error_analyser_authors_citizenship')}
        id="authors-citizenship"
      />
      <Multiselect
        selected={ageRange}
        setSelected={setAgeRange}
        handleChange={(event) => handleChange(event, setAgeRange)}
        options={ageOptions}
        label={t('error_analyser_authors_age')}
        id="autors-age"
      />
    </Fragment>
  );
}
