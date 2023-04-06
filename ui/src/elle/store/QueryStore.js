import {createStore} from "redux";

const reducer = (state = null, action) => {
  if (action.type === 'CHANGE') {
    return action.value;
  }
  return state;
}

export const queryStore = createStore(reducer);
