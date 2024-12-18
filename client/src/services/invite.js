/* eslint-disable no-useless-catch */

import { BACKEND_SERVER_URL, BACKEND_SERVER_VERSION } from '../Appconfig.js';
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const createInvite = async () => {
    try {
      const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Invites`)
      return response.data
    }
    catch (error) {
      throw error
    }
  }
  