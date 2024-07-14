import axios from "axios"
import { BACKEND_SERVER_URL } from "../Appconfig"

export const createUser = async (formData) =>{
    try{
        const response = await axios.post(`${BACKEND_SERVER_URL}/users`, formData)
        return response
    }
    catch(error){
        console.log(error.message)
        return error.message
    }
  }

  export const loginUser = async (formData) =>{
    try{
        const response = await axios.post(`${BACKEND_SERVER_URL}/users/login`, formData)
        return response.data
    }
    catch(error){
        console.log(error.message)
        return error.message
    }
  }