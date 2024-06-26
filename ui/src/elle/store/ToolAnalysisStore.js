import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  wordlist: null,
  wordContext: null,
  collocates: null
};

const toolAnalysisSlice = createSlice({
  name: 'toolAnalysis',
  initialState,
  reducers: {
    changeWordlistResult: (state, action) => {
      state.wordlist = action.value;
    },
    changeWordContextResult: (state, action) => {
      state.wordContext = action.value;
    },
    changeCollocatesResult: (state, action) => {
      state.collocates = action.value;
    }
  }
});

export const { changeWordlistResult, changeWordContextResult, changeCollocatesResult } = toolAnalysisSlice.actions;

export const toolAnalysisStore = configureStore({
  reducer: toolAnalysisSlice.reducer
});
