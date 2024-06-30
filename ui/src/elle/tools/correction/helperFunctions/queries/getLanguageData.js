import { loadFetch } from '../../../../service/LoadFetch';
import { replaceCombined } from '../../../../const/Constants';
import { isArray } from '../../../../../util/js-utils';

export const getLanguageData = (inputText, setterFunction) => {
  if (inputText === '') return;
  if (isArray(inputText)) inputText = inputText[0];
  loadFetch('/api/texts/keerukus-sonaliigid-mitmekesisus', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({tekst: inputText === '' ? inputText : inputText.replaceAll(replaceCombined, '').replaceAll('  ', ' ')})
  }).then(v => v.json()).then(t => {
    setterFunction(t);
  });
};
