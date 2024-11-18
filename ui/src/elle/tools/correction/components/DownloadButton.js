import React, { useEffect } from 'react';
import { DefaultButtonStyle } from '../../../const/StyleConstants';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, Tooltip } from '@mui/material';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';
import { parseHtmlForDocx, processErrorListForDocx } from '../util/Utils';
import { accordionDetails, correctorDocxType, errorTypes } from '../const/TabValuesConstant';
import { useTranslation } from 'react-i18next';


const DownloadButton = ({ innerHtml, modelValue, errorList, tab, textLevel }) => {
  const { t } = useTranslation();
  const labels = accordionDetails.map((detail) => t(detail.label));
  const [grammarLabel, setGrammarLabel] = React.useState(null);

  useEffect(() => {
    if (!errorList) return;
    setGrammarLabel(Object.entries(errorList).map((error) => t(errorTypes[error[0]].label)));
  }, [errorList]);

  const downloadCorrectorDocx = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [

            new Paragraph({
              spacing: { line: 300 },
              alignment: 'both',
              children: parseHtmlForDocx(innerHtml.current.innerHTML, 'normal')
            })
          ]
        }
      ]
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${t(correctorDocxType[modelValue])}.docx`);
    });
  };

  const downloadCorrectorGrammarDocx = () => {
    const doc = new Document({
      sections: [{
        children: processErrorListForDocx(tab, textLevel, errorList, innerHtml, labels, grammarLabel)
      }]
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${t(correctorDocxType[modelValue])}.docx`);
    });
  };

  const runDownloader = () => {
    if (modelValue === 'grammarchecker' || modelValue === 'spellchecker') {
      downloadCorrectorGrammarDocx();
    } else {
      downloadCorrectorDocx();
    }
  };

  return (
    <>
      <Tooltip
        title={t('corrector_download_docx')}
        placement="top"
      >
        <span>
          <Button
            sx={DefaultButtonStyle}
            style={{ borderRadius: '5px', marginTop: '1rem' }}
            variant="contained"
            disabled={!grammarLabel && (modelValue === 'grammarchecker' || modelValue === 'spellchecker')}
            onClick={runDownloader}
          >
            <DownloadIcon sx={{ height: '30px' }}/>
          </Button>
        </span>
      </Tooltip>
    </>
  );
};

export default DownloadButton;
