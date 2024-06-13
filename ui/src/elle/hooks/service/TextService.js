import { queryStore } from '../../store/QueryStore';
import { loadFetch } from './util/LoadFetch';
import { sanitizeTexts } from '../../util/TextUtils';

export const getSelectedTexts = (setStoreData) => {
  const queryStoreState = queryStore.getState();
  if (queryStoreState.corpusTextIds) {
    loadFetch('/api/texts/kysitekstid', {
      method: 'POST',
      body: JSON.stringify({ids: queryStoreState.corpusTextIds}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.text())
      .then(result => {
        if (queryStoreState.ownTexts) {
          result = result.concat(' ', queryStoreState.ownTexts);
        }
        setStoreData(sanitizeTexts(result));
      });
  } else if (queryStoreState.ownTexts) {
    setStoreData(queryStoreState.ownTexts);
  }
};
