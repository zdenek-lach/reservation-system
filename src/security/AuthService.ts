import axios from 'axios';
import config from '../../config/config.json'

export const login = (username: string, password: string) => {
  return axios
    .post(config.api.authApi.getToken, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};
