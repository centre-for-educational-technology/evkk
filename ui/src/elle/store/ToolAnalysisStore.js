import { createStore } from 'redux';

const reducer = (state = {wordlist: null, wordContext: null, collocates: null}, action) => {
  if (action.type === 'CHANGE_WORDLIST_RESULT') {
    return {...state, wordlist: action.value};
  } else if (action.type === 'CHANGE_WORDCONTEXT_RESULT') {
    return {...state, wordContext: action.value};
  } else if (action.type === 'CHANGE_COLLOCATES_RESULT') {
    return {...state, collocates: action.value};
  }
  return state;
};

export const toolAnalysisStore = createStore(reducer);
