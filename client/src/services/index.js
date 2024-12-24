import axios from 'axios';
import { BACKEND_SERVER_URL } from '../Appconfig';

const AuthConnect = axios.create({
  baseURL: `${BACKEND_SERVER_URL}/api/v1`,
  withCredentials: true,
});

AuthConnect.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default AuthConnect;
