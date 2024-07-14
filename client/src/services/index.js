import axios from 'axios';
import Appconfig from '../Appconfig';

const AuthConnect = axios.create({
  baseURL: `${Appconfig.BACKEND_SERVER_URL}/api/v1`,
  withCredentials: true,
});


export default AuthConnect;
