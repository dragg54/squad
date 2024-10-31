/* eslint-disable no-useless-catch */
import { BACKEND_SERVER_URL } from "../Appconfig"
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const createUser = async (formData) =>{
    try{
        const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/users`, formData)
        return response
    }
    catch(error){
        throw error
    }
  }

  export const loginUser = async (formData) =>{
    try{
        const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/users/login`, formData)
        return response.data
    }
    catch(error){
        throw error
    }
  }

  export const getAllUsers = async () =>{
    try{
        const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/users`)
        return response.data
    }
    catch(error){
        throw error
    }
  }

  export const getUserById = async (id) =>{
    try{
        const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/users/${id}`)
        return response.data
    }
    catch(error){
        throw error
    }
  }