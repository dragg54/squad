/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { BACKEND_SERVER_URL } from '../Appconfig';
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const getUserGoals = async ({queryKey}) => {
    const [_key, { page, size, groupBy }] = queryKey;
     try{
        const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/usergoals`,
          {
            params: { page, size, groupBy },
          }
        );
        return response.data;
     }
     catch(err){
      throw err
   }
  };

  export const createUserGoal = async (formData) =>{
    try{
        const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/usergoals`, formData)
        return response
    }
    catch(error){
        throw error
    }
  }

  export const editUserGoal = async(formData) =>{
    try{
      const response = await axiosInstance.put(`${BACKEND_SERVER_URL}/usergoals/${formData.id}`, formData)
      return response
  }
  catch(error){
      throw error
  }
  }