/* eslint-disable no-useless-catch */
import AuthConnect from ".";
import { BACKEND_SERVER_URL } from "../Appconfig";

const axiosInstance = AuthConnect

export const subscribeNotification = async (formData) => {
    try {
      const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/Notifications/subscribe`, formData)
      return response
    }
    catch (error) {
      throw error
    }
  }
  
