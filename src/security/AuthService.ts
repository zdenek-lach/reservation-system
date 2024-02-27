import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import config from '../../config/config.json';

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

export const refreshCheck = () => {
  let user = getCurrentUser();

  if (user && user.access) {
    // Check if the token is expired
    const tokenExpiration = jwtDecode(user.access).exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (tokenExpiration < currentTimestamp) {
      console.log('Token needs a refresh');
      return axios
        .post(config.api.authApi.refreshToken, {
          refresh: user.refresh,
        })
        .then((response) => {
          if (response.data.access) {
            // Update the access token in local storage
            user.access = response.data.access;
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Token refreshed');
          }

          return response.data;
        })
        .catch((error) => {
          console.error(`Error while refreshing token:`, error);
        });
    } else console.log('Token is fresh :)');
  }

  return user;
};

export const authHeader = () => {
  let user = null;
  user = getCurrentUser();

  if (user && user.access) {
    return { Authorization: 'Bearer ' + user.access };
  } else {
    return { Authorization: '' };
  }
};
