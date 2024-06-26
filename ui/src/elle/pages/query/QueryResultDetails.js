import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  ageOptions,
  corpuses, countryOptionsForQueryResults, educationOptions, genderOptions, languageOptionsForNativeLangs,
  textLanguageOptions,
  textTypeList,
  usedMaterialsDisplayOptions
} from '../../const/Constants';
import ModalBase from '../../components/ModalBase';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function QueryResultDetails({
                                             metadata,
                                             text,
                                             sentence,
                                             modalOpen,
                                             setModalOpen
                                           }) {

  const { t } = useTranslation();
  const [modalAccordionExpanded, setModalAccordionExpanded] = useState(false);
  let paragraphCount = 0;

  const changeModalAccordion = () => {
    setModalAccordionExpanded(!modalAccordionExpanded);
  };

  const getParagraphKey = (item) => {
    if (item) {
      return item;
    } else {
      paragraphCount++;
      return `empty_paragraph_${paragraphCount}`;
    }
  };

  const TransformText = () => {
    return text.split(/\\n/g).map(function (item) {
      let transformedItem = item.replace(/&quot;/g, '"').trim();
      return (
        <span
          key={getParagraphKey(item)}
          style={{
            color: transformedItem === sentence ? 'blue' : undefined,
          }}
        >
          {transformedItem}
          <br />
        </span>
      );
    });
  };

  return (
    <ModalBase
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      title={metadata.title}
    >
      <Accordion
        expanded={modalAccordionExpanded}
        onChange={changeModalAccordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="filters-header"
        >
          <Typography>
            {t('query_results_preview_metadata_modal_title')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="metainfo-subtitle">{t('common_text_data')}</div>
          <strong>{t('query_subcorpus')}:</strong> {t(corpuses[metadata.korpus]) || '-'}<br />
          <strong>{t('query_text_data_type')}:</strong> {t(textTypeList[metadata.tekstityyp]) || '-'}<br />
          <strong>{t('query_text_data_language')}:</strong> {t(textLanguageOptions[metadata.tekstikeel]) || '-'}<br />
          <strong>{t('query_text_data_level')}:</strong> {metadata.keeletase || '-'}<br />
          <strong>{t('query_text_data_used_supporting_materials')}:</strong> {t(usedMaterialsDisplayOptions[metadata.abivahendid]) || '-'}<br />
          <strong>{t('query_text_data_year_of_publication')}:</strong> {metadata.ajavahemik || '-'}<br />
          <br />
          <div className="metainfo-subtitle">{t('common_author_data')}</div>
          <strong>{t('query_author_data_age')}:</strong> {t(ageOptions[metadata.vanusevahemik]) || '-'}<br />
          <strong>{t('query_author_data_gender')}:</strong> {t(genderOptions[metadata.sugu]) || '-'}<br />
          <strong>{t('query_author_data_education')}:</strong> {t(educationOptions[metadata.haridus]) || '-'}<br />
          <strong>{t('query_author_data_native_language')}:</strong> {t(languageOptionsForNativeLangs[metadata.emakeel]) || '-'}<br />
          <strong>{t('query_author_data_country')}:</strong> {t(countryOptionsForQueryResults[metadata.riik]) || '-'}<br />
        </AccordionDetails>
      </Accordion>
      <br />
      {<TransformText />}
    </ModalBase>
  );
}
