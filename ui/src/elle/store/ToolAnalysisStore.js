import { createStore } from 'redux';

export const ToolAnalysisStoreActionType = {
  CHANGE_WORDLIST_RESULT: 'CHANGE_WORDLIST_RESULT',
  CHANGE_WORD_CONTEXT_RESULT: 'CHANGE_WORD_CONTEXT_RESULT',
  CHANGE_COLLOCATES_RESULT: 'CHANGE_COLLOCATES_RESULT'
};

const reducer = (state = {wordlist: null, wordContext: null, collocates: null}, action) => {
  if (action.type === ToolAnalysisStoreActionType.CHANGE_WORDLIST_RESULT) {
    return {...state, wordlist: action.value};
  } else if (action.type === ToolAnalysisStoreActionType.CHANGE_WORD_CONTEXT_RESULT) {
    return {...state, wordContext: action.value};
  } else if (action.type === ToolAnalysisStoreActionType.CHANGE_COLLOCATES_RESULT) {
    return {...state, collocates: action.value};
  }
  return state;
};

export const toolAnalysisStore = createStore(reducer);
