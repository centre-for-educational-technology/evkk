import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  corpusTextIds: null,
  ownTexts: null
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    changeCorpusTexts: (state, action) => {
      state.corpusTextIds = action.value !== null ? action.value.split(',') : null;
    },
    changeOwnTexts: (state, action) => {
      state.ownTexts = action.value;
    }
  }
});

export const { changeCorpusTexts, changeOwnTexts } = querySlice.actions;

export const queryStore = configureStore({
  reducer: querySlice.reducer
});
