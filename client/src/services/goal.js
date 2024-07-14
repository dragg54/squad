import axios from 'axios'
import { BACKEND_SERVER_URL } from '../Appconfig';

export const getUserGoals = async () => {
     try{
        const response = await axios.get(`${BACKEND_SERVER_URL}/usergoals`);
        return response.data;
     }
     catch(err){
        console.log(err)
     }
  };

  export const createUserGoal = async (formData) =>{
    try{
        const response = await axios.post(`${BACKEND_SERVER_URL}/usergoals`, formData)
        return response
    }
    catch(error){
        console.log(error)
    }
  }