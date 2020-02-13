import {createReducer} from './util/redux-utils';
import {EMPTY_OBJECT} from "./util/js-utils";

export default createReducer({
  INIT: () => ({
    statusLoaded: false,
    status: EMPTY_OBJECT,
    filesLoading: false,
    files: [],
    fileUploading: false
  }),
  GET_STATUS_SUCCESS: (state, action) => {
    return {...state, status: action.data, statusLoaded: true};
  },
  GET_USER_FILES_INIT: (state) => {
    return {...state, filesLoading: true}
  },
  GET_USER_FILES_SUCCESS: (state, action) => {
    return {...state, files: action.data}
  },
  GET_USER_FILES_DONE: (state) => {
    return {...state, filesLoading: false}
  },
  POST_USER_FILE_INIT: (state) => {
    return {...state, fileUploading: true}
  },
  POST_USER_FILE_DONE: (state) => {
    return {...state, fileUploading: false}
  }
});
