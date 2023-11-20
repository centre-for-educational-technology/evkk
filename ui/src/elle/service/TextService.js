import { queryStore } from '../store/QueryStore';
import { loadFetch } from './LoadFetch';
import { regExpReplaceAll } from '../util/TextUtils';

export const toolsPopulatePostQuery = async (setStoreData) => {
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
        setStoreData(regExpReplaceAll(result));
      });
  } else if (queryStoreState.ownTexts) {
    setStoreData(queryStoreState.ownTexts);
  }
};
