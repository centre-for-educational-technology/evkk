import { createStore } from 'redux';

export const QueryStoreActionType = {
  CHANGE_CORPUS_TEXTS: 'CHANGE_CORPUS_TEXTS',
  CHANGE_OWN_TEXTS: 'CHANGE_OWN_TEXTS'
};

const reducer = (state = { corpusTextIds: null, ownTexts: null }, action) => {
  if (action.type === QueryStoreActionType.CHANGE_CORPUS_TEXTS) {
    return { ...state, corpusTextIds: action.value !== null ? action.value.split(',') : null };
  } else if (action.type === QueryStoreActionType.CHANGE_OWN_TEXTS) {
    return { ...state, ownTexts: action.value };
  }
  return state;
};

export const queryStore = createStore(reducer);
