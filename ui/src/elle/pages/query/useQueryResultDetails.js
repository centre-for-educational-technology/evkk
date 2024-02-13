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

  const previewText = async (id, localSentence) => {
    console.log(id, localSentence);

    await loadFetch('/api/texts/kysitekstimetainfo?id=' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let tempMetaData = metadata;
        result.forEach((param) => {
          tempMetaData = {
            ...tempMetaData,
            [param.property_name]: param.property_value,
          };
        });
        setMetadata(tempMetaData);
      });

    await loadFetch('/api/texts/kysitekst?id=' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.text())
      .then((result) => {
        setText(result);
      });
    setSentence(localSentence);
    setModalOpen(true);
  };

  return { previewText, metadata, text, sentence, modalOpen, setModalOpen };
}
