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

  export const getAllNotifications = async() =>{
    try{
      const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/Notifications`)
      return response
    }
    catch(err){
      throw err
    }
  }

  export const getNotificationSummary = async() =>{
    try{
      const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/NotificationSummaries`)
      return response
    }
    catch(err){
      throw err
    }
  }

  export const readAllNotifications = async() =>{
    try{
      const response = await axiosInstance.patch(`${BACKEND_SERVER_URL}/Notifications/readAll`)
      return response
    }
    catch(err){
      throw err
    }
  }
  
  
