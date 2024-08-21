import axios from 'axios';
import { BACKEND_SERVER_URL } from '../Appconfig';

const AuthConnect = axios.create({
  baseURL: `${BACKEND_SERVER_URL}/api/v1`,
  withCredentials: true,
});


export default AuthConnect;
