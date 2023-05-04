import { errorEmitter, loadingEmitter } from '../../App';

export const loadFetch = async (url, params) => {
  loadingEmitter.emit('loader-start');

  return fetch(url, params)
    .then(res => {
      loadingEmitter.emit('loader-end');
      if (res.ok) return res;
      errorEmitter.emit('generic-error');
      return Promise.reject(res);
    });
};
