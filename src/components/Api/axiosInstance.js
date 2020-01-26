import axios from 'axios';

const API = axios.create({
  baseURL: `http://localhost:3003`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('sessionToken');
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common.Authorization;
    }
    return config;
  },

  error => Promise.reject(error)
);

export default API;
