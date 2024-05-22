import { createStore } from 'redux';

export const UserStoreActionType = {
  SET_USER_DATA: 'SET_USER_DATA'
};

const reducer = (state, action) => {
  if (action.type === UserStoreActionType.SET_USER_DATA) {
    return action.value;
  }
  return state;
};

export const userDataStore = createStore(reducer);
