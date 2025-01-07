/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { BACKEND_SERVER_URL, BACKEND_SERVER_VERSION } from '../Appconfig';
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const getUserGoals = async ({queryKey}) => {
    const [_key, { page, size, groupBy, userId, partnerId, categoryId, month }] = queryKey;
     try{
        const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/usergoals`,
          {
            params: { page, size, groupBy, userId, partnerId,  categoryId, month  },
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
        const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/usergoals`, formData)
        return response
    }
    catch(error){
        throw error
    }
  }

export const updateUserGoal = async (formData) => {
  try {
    const response = await axiosInstance.put(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/usergoals/${formData.id}`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const updateUserGoalStatus = async(formData) =>{
  try {
    const response = await axiosInstance.patch(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/usergoals/${formData.id}/status`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const getUserMonthlyGoals = async () => {
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/monthlyGoals`);
    return response.data;
  }
  catch (err) {
    throw err
  }
}

