import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  ageOptions,
  corpuses,
  countryOptions,
  educationOptions,
  genderOptions,
  languageOptions,
  modalStyle,
  textLanguageOptions,
  textTypes,
  usedMaterialsDisplayOptions,
} from '../../const/Constants';
import { useTranslation } from 'react-i18next';

export default function QueryResultDetails({
  metadata,
  text,
  sentence,
  modalOpen,
  setModalOpen,
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

  const transformSentence = () => {
    const punctuationPattern = /\s+([.,!?:;])/g;
    let transformedSentence = sentence.replace(punctuationPattern, '$1');
    const quotesPattern = /"(.*?)"/g;
    transformedSentence = transformedSentence.replace(
      quotesPattern,
      (match, capturedGroup) => `"${capturedGroup.slice(1, -1)}"`
    );
    return transformedSentence;
  };

  const TransformText = () => {
    const transformedSentence = sentence ? transformSentence() : null;
    return text.split(/\\n/g).map(function (item) {
      let transformedItem = item.replace(/&quot;/g, '"').trim();
      return (
        <span
          key={getParagraphKey(item)}
          style={{
            color: transformedItem === transformedSentence ? 'blue' : undefined,
          }}
        >
          {transformedItem}
          <br />
        </span>
      );
    });
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <Box sx={modalStyle}>
        <div className="modal-head">{metadata.title}</div>
        <IconButton
          aria-label="close"
          onClick={() => {
            setModalOpen(false);
          }}
          className="close-button"
        >
          <CloseIcon />
        </IconButton>
        <br />
        <div>
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
              <strong>{t('query_subcorpus')}:</strong>{' '}
              {t(corpuses[metadata.korpus]) || '-'}
              <br />
              <strong>{t('query_text_data_type')}:</strong>{' '}
              {t(textTypes[metadata.tekstityyp]) || '-'}
              <br />
              <strong>{t('query_text_data_language')}:</strong>{' '}
              {t(textLanguageOptions[metadata.tekstikeel]) || '-'}
              <br />
              <strong>{t('query_text_data_level')}:</strong>{' '}
              {metadata.keeletase || '-'}
              <br />
              <strong>
                {t('query_text_data_used_supporting_materials')}:
              </strong>{' '}
              {t(usedMaterialsDisplayOptions[metadata.abivahendid]) || '-'}
              <br />
              <strong>{t('query_text_data_year_of_publication')}:</strong>{' '}
              {metadata.aasta || '-'}
              <br />
              <br />
              <div className="metainfoSubtitle">{t('common_author_data')}</div>
              <strong>{t('query_author_data_age')}:</strong>{' '}
              {t(ageOptions[metadata.vanus]) || '-'}
              <br />
              <strong>{t('query_author_data_gender')}:</strong>{' '}
              {t(genderOptions[metadata.sugu]) || '-'}
              <br />
              <strong>{t('query_author_data_education')}:</strong>{' '}
              {t(educationOptions[metadata.haridus]) || '-'}
              <br />
              <strong>{t('query_author_data_native_language')}:</strong>{' '}
              {t(languageOptions[metadata.emakeel]) || '-'}
              <br />
              <strong>{t('query_author_data_country')}:</strong>{' '}
              {t(countryOptions[metadata.riik]) || '-'}
              <br />
            </AccordionDetails>
          </Accordion>
          <br />
          {<TransformText />}
        </div>
      </Box>
    </Modal>
  );
}
