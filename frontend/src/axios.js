import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  withCredentials: true, // if using cookies/auth
});

export default instance;
