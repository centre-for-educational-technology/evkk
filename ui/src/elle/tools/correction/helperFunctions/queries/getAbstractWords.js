import { replaceCombined } from '../../../../const/Constants';

export const getAbstractWords = (inputText, setAbstractAnswer) => {
  fetch('https://kiirlugemine.keeleressursid.ee/api/analyze', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      identifier: '',
      language: 'estonian',
      text: inputText === '' ? inputText : inputText.replaceAll(replaceCombined, '').replaceAll('  ', ' ')
    })
  }).then(v => v.json()).then(t => {
    setAbstractAnswer(t);
  });
};
