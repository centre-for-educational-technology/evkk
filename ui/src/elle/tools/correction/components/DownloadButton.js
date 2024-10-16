import React from 'react';
import { DefaultButtonStyle } from '../../../const/StyleConstants';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, Tooltip } from '@mui/material';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';
import { parseHtmlForDocx } from '../util/Utils';
import { correctorDocxType } from '../const/TabValuesConstant';
import { useTranslation } from 'react-i18next';


const DownloadButton = ({ innerHtml, modelValue }) => {
  const { t } = useTranslation();

  const download = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              spacing: { line: 300 },
              alignment: 'both',
              children: parseHtmlForDocx(innerHtml.current.innerHTML)
            })
          ]
        }
      ]
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${t(correctorDocxType[modelValue])}.docx`);
    });
  };

  return (
    <>
      <Tooltip
        title={t('corrector_download_docx')}
        placement="top"
      >
        <Button
          sx={DefaultButtonStyle}
          style={{ borderRadius: '5px', marginTop: '1rem' }}
          variant="contained"
          onClick={download}
        >
          <DownloadIcon sx={{ height: '30px' }}/>
        </Button>
      </Tooltip>
    </>
  );
};

export default DownloadButton;
