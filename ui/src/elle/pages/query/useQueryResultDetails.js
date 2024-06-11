import { useState } from 'react';
import { loadFetch } from '../../service/LoadFetch';

export default function useQueryResultDetails(id) {
  const [modalOpen, setModalOpen] = useState(false);
  const [metadata, setMetadata] = useState({
    title: '',
    korpus: '',
    tekstityyp: '',
    tekstikeel: '',
    keeletase: '',
    abivahendid: '',
    aasta: '',
    vanus: '',
    sugu: '',
    haridus: '',
    emakeel: '',
    riik: '',
  });
  const [text, setText] = useState('');
  const [sentence, setSentence] = useState('');

  function previewText(id, localSentence) {
    loadFetch('/api/texts/kysitekstjametainfo?id=' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        setText(res.text);
        res.properties.forEach(param => {
          setIndividualMetadata(param.propertyName, param.propertyValue);
        });
      });
    setSentence(localSentence);
    setModalOpen(true);
  }

  const setIndividualMetadata = (keyName, valueName) => {
    setMetadata(prevData => {
      return {
        ...prevData,
        [keyName]: valueName
      };
    });
  };

  return {previewText, metadata, text, sentence, modalOpen, setModalOpen};
}
