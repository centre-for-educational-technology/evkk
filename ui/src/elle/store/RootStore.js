import { createStore } from 'redux';

export const RootStoreActionType = {
  STATUS_SUCCESS: 'STATUS_SUCCESS',
  STATUS_FAILED: 'STATUS_FAILED'
};

const reducer = (state = { status: null, data: null }, action) => {
  if (action.type === RootStoreActionType.STATUS_SUCCESS) {
    return { ...state, status: true, data: action.data };
  }
  if (action.type === RootStoreActionType.STATUS_FAILED) {
    return { ...state, status: false, data: null };
  }
};

export const rootStore = createStore(reducer);
