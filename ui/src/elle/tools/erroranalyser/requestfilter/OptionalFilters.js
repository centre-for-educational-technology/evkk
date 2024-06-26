import {Typography} from '@mui/material';
import {Fragment, useEffect, useState} from 'react';
import Multiselect from './Multiselect';
import {
  ageOptions,
  educationOptions,
  nationalityOptions,
  textPublishSubTextTypesOptions,
} from '../../../const/Constants';
import {useTranslation} from 'react-i18next';

export default function OptionalFilters({
                                          filterOptions,
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
  const [citizenshipOptions, setCitizenshipOptions] = useState([]);
  const {t, i18n} = useTranslation();

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
    setCitizenshipOptions(sortFilterOptions(citizenshipOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const transformFilterOptions = (data) => {
    let filteredTextTypeOptions = filterFilterOptions(
      textPublishSubTextTypesOptions,
      data.textType
    );
    filteredTextTypeOptions = sortFilterOptions(filteredTextTypeOptions);
    setTextTypeOptions(filteredTextTypeOptions);

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
      target: {value},
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
