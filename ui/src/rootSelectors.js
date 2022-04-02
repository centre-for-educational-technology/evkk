import {EMPTY_ARRAY, EMPTY_OBJECT} from './util/js-utils';

export const selectStatus = () => state => state.status || EMPTY_OBJECT;

export const selectStatusLoaded = () => state => !!state.statusLoaded;

export const selectIntegrationPath = integrationName => state => {
  const status = selectStatus()(state);
  const {integrationPaths = EMPTY_OBJECT} = status;
  return integrationPaths[integrationName] || null;
};

export const selectFiles = () => state => state.files || EMPTY_ARRAY;

export const selectFileUploading = () => state => state.fileUploading;
