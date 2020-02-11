import {selectStatusLoaded} from "./rootSelectors";

export const getStatus = () => async dispatch => {
  const response = await fetch('/api/status'); //TODO: error handling
  const json = await response.json();
  dispatch({type: 'GET_STATUS_SUCCESS', data: json});
};

export const getStatusIfNeeded = () => (dispatch, getState) => {
  if (!selectStatusLoaded()(getState())) {
    dispatch(getStatus());
  }
};
