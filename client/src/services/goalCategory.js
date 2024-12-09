/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import AuthConnect from "."
import { BACKEND_SERVER_URL, BACKEND_SERVER_VERSION } from "../Appconfig"

const axiosInstance = AuthConnect

export const getAllGoalCategories = async({queryKey}) =>{
    try{
        const [_key, {showGroupGoal}] = queryKey
        const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/usergoalcategories`,{
            params:{showGroupGoal}
        })
        return response
    }
    catch(error){
        throw error
    }
}