// File: src/utils/axios.js
import axios from 'axios';

// Create instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL
});

// Add token to headers dynamically before each request
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
