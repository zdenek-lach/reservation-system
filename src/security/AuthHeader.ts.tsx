import { getCurrentUser } from './AuthService';

export default function authHeader() {
  const userStr = localStorage.getItem('user');
  let user = null;
  user = getCurrentUser();

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return { Authorization: '' };
  }
}
