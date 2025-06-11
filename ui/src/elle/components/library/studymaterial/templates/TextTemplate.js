import React from 'react';

export default function TextTemplate({ html }) {
  const handleCopy = () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const plainText = tempElement.innerText;

    navigator.clipboard.writeText(plainText)
      .then(() => {
        alert('Tekst kopeeritud!');
      })
      .catch(err => {
        alert('Kopeerimine ebaõnnestus');
        console.error(err);
      });
  };

  return (
    <div className="rendered-quill-wrapper">
      <div
        className="rendered-quill-box"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <button className="copy-button" onClick={handleCopy}>
        Kopeeri tekst
      </button>
    </div>
  );
}
