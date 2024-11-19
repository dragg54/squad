/* eslint-disable no-useless-catch */

import { BACKEND_SERVER_URL, BACKEND_SERVER_VERSION } from '../Appconfig.js';
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const getAvatars = async () => {
    try {
      const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/avatars`)
      return response.data
    }
    catch (error) {
      throw error
    }
  }
  