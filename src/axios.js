import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ev-charger-backend-l1c8.onrender.com',
  headers: {
    Authorization: localStorage.getItem('token')
  }
});

export default instance;
