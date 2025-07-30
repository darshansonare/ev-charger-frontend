import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ev-charger-backend-production.up.railway.app',
  headers: {
    Authorization: localStorage.getItem('token')
  }
});

export default instance;
