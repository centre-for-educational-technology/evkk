import { loadFetch } from './util/LoadFetch';
import { rootStore, RootStoreActionType } from '../store/RootStore';

const getStatus = () => {
  loadFetch('/api/status', {}, true)
    .then(res => res.json())
    .then(res => rootStore.dispatch({ type: RootStoreActionType.STATUS_SUCCESS, data: res }))
    .catch(() => rootStore.dispatch({ type: RootStoreActionType.STATUS_FAILED }));
};

export const getStatusIfNeeded = () => {
  const state = rootStore.getState();
  if (!state || state.status !== null) {
    getStatus();
  }
};
