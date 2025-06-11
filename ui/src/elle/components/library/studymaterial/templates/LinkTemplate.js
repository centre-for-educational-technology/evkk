import React from 'react';

export default function LinkTemplate({ url }) {
  if (!url) return null;

  const isValidUrl = /^https?:\/\//i.test(url);

  return (
    <div className="link-template" style={{ marginTop: 12 }}>
      {isValidUrl ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#1a0dab',
            textDecoration: 'underline',
            wordBreak: 'break-all'
          }}
        >
          {url}
        </a>
      ) : (
        <p>Vigane link</p>
      )}
    </div>
  );
}
