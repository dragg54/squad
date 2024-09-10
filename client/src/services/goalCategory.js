/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import AuthConnect from "."
import { BACKEND_SERVER_URL } from "../Appconfig"

const axiosInstance = AuthConnect

export const getAllGoalCategories = async() =>{
    try{
        const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/usergoalcategories`)
        return response
    }
    catch(error){
        throw error
    }
}