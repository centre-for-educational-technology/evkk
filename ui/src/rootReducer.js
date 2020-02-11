import {createReducer} from './util/redux-utils';
import {EMPTY_OBJECT} from "./util/js-utils";

export default createReducer({
  INIT: () => ({
    statusLoaded: false,
    status: EMPTY_OBJECT
  }),
  GET_STATUS_SUCCESS: (state, action) => {
    return {...state, status: action.data, statusLoaded: true};
  }
});
