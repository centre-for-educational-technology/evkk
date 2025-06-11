import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import '../../../styles/StudyMaterialTemplates.css';

export default function LinkTemplate({ url }) {
  if (!url) return null;

  const isValidUrl = /^https?:\/\//i.test(url);

  return (
    <div className="link-template">
      {isValidUrl ? (
        <div className="link-template-row">
          <LinkIcon className="link-template-icon" />
          <strong>Link:</strong>&nbsp;
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-template-anchor"
          >
            {url}
          </a>
        </div>
      ) : (
        <p>Vigane link</p>
      )}
    </div>
  );
}
