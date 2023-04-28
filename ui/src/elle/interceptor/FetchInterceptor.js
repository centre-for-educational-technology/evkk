import { errorEmitter, loadingEmitter } from '../../App';

export const fetchInterceptor = async () => {

  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    loadingEmitter.emit('loader-start');
    const response = await originalFetch(...args);
    loadingEmitter.emit('loader-end');

    if (!response.ok) {
      errorEmitter.emit('generic-error');
      return Promise.reject(response);
    }

    return response;
  };
};
