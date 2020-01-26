import axios from 'axios';

const API_PG = axios.create({
  baseURL: `https://api.sandbox.checkout.com`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'pk_test_8c519a78-2704-49d1-97cf-eb5e23a14f25'
  },
});

API_PG.interceptors.request.use(
  config => {
    return config;
  },

  error => Promise.reject(error)
);

export default API_PG;
