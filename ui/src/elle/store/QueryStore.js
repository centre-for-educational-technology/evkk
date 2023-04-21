import { createStore } from 'redux';

const reducer = (state = {corpusTextIds: null, ownTexts: null}, action) => {
  if (action.type === 'CHANGE_CORPUS_TEXTS') {
    return {...state, corpusTextIds: action.value};
  } else if (action.type === 'CHANGE_OWN_TEXTS') {
    return {...state, ownTexts: action.value};
  }
  return state;
};

export const queryStore = createStore(reducer);
