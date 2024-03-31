import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import config from '../../config/config.json';

export const login = (
  username: string,
  password: string,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return axios
    .post(config.api.authApi.getToken, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        decodeAndSetTimer(response.data.access, setIsLoggedIn);
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

function isRefreshTokenRotten(refreshToken) {
  if (refreshToken == null) return false;
  const decodedToken = jwtDecode(refreshToken);
  if (decodedToken && decodedToken.exp) {
    const currentTimeMs = Date.now();
    const expirationMs = decodedToken.exp * 1000;
    const timeOffset = 1000;
    console.log('Exp: ' + expirationMs + ', time: ' + currentTimeMs);
    if (expirationMs <= currentTimeMs + timeOffset) {
      return true;
    } else return false;
  }
  return false;
}

//First, check if the refresh token is not rotten (invalid), if it is -> log out
//Then if the refresh token is valid -> refresh access token and set of timer for another refresh
export const startRefreshing = async function refreshAccessToken(
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (isRefreshTokenRotten(localStorage.getItem('refreshToken'))) {
    logout();
    if (setIsLoggedIn != null) {
      setIsLoggedIn(false);
    }
    console.log('Loged session expired');
    return;
  }
  return axios
    .post(config.api.authApi.refreshToken, {
      refresh: localStorage.getItem('refreshToken'),
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        decodeAndSetTimer(response.data.access, setIsLoggedIn);
        console.log('Token refreshed');
      }

      return response.data;
    })
    .catch((error) => {
      console.error(`Error while refreshing token:`, error);
    });
};

//sets timer for refresh of access token, refresh is called one second before the access token expires
function decodeAndSetTimer(
  accessToken: string,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) {
  const decodedToken = jwtDecode(accessToken);
  if (decodedToken && decodedToken.exp) {
    const timeOffset = 1000;
    const delta = decodedToken.exp * 1000 - Date.now() - timeOffset;
    if (delta <= 0) {
      startRefreshing(setIsLoggedIn);
    } else {
      setTimeout(startRefreshing, delta, setIsLoggedIn);
    }
  }
}

//for tester api purposes
export const refreshCheck = () => {
  startRefreshing(null);
};

export const authHeader = () => {
  return { Authorization: 'Bearer ' + localStorage.getItem('accessToken') };
};

export const fetchLoggedDoctor = async () => {
  if (localStorage.getItem('accessToken') != null) {
    try {
      const response = await axios.get(config.api.authApi.loggedUser, {
        headers: authHeader(),
      });
      if (response.data.doctor != null) {
        return response.data.doctor;
      }
    } catch (err: any) {
      console.error('Failed to retrieve logged doctor' + err);
    }
  }
};

export const fetchLoggedUserData = async () => {
  if (localStorage.getItem('accessToken') != null) {
    try {
      const response = await axios.get(config.api.authApi.loggedUser, {
        headers: authHeader(),
      });
      if (response.data.doctor != null) {
        return response.data;
      }
    } catch (err: any) {
      console.error('Failed to retrieve logged doctor' + err);
    }
  }
};
