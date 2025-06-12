import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Tooltip } from '@mui/material';
import '../../../styles/StudyMaterialTemplates.css';

export default function TextTemplate({ html }) {
  const handleCopy = () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const plainText = tempElement.innerText;

    navigator.clipboard.writeText(plainText).catch(err => {
      console.error('Kopeerimine ebaõnnestus:', err);
    });
  };

  const handleDownload = () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const plainText = tempElement.innerText;

    const blob = new Blob([plainText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'oppematerjal.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="rendered-quill-wrapper">
      <div className="copy-icon-wrapper">
        <Tooltip title="Kopeeri tekst">
          <IconButton size="small" onClick={handleCopy}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Lae alla .txt">
          <IconButton size="small" onClick={handleDownload}>
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

