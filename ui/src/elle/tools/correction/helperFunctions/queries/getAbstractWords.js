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
  })
    .then(response => {
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setAbstractAnswer(data);
    })
    .catch(error => {
      console.error('Error fetching abstract words:', error);
      setAbstractAnswer(null); // or handle the error appropriately in your UI
    });
};

