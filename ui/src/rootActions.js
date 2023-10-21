import { selectStatusLoaded } from './rootSelectors';
import { loadFetch } from './elle/service/LoadFetch';

export const getStatus = () => async dispatch => {
  loadFetch('/api/status')
    .then(res => res.json())
    .then(response => dispatch({type: 'GET_STATUS_SUCCESS', data: response}))
    .catch(response => dispatch({type: 'GET_STATUS_SUCCESS', data: response}));
};

export const getStatusIfNeeded = () => (dispatch, getState) => {
  if (!selectStatusLoaded()(getState())) {
    dispatch(getStatus());
  }
};
