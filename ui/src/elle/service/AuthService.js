import { loadFetch } from './util/LoadFetch';
import { navigateTo } from '../util/navigate';

export const logout = () => {
  loadFetch('/api/auth/logout', {
    method: 'DELETE',
    body: JSON.stringify({ token: localStorage.getItem('accessToken') }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    localStorage.removeItem('accessToken');
    navigateTo('/');
  });
};
