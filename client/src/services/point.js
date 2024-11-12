/* eslint-disable no-useless-catch */
import AuthConnect from ".";
import { BACKEND_SERVER_URL } from "../Appconfig";

const axiosInstance = AuthConnect
export const getPoints = async () => {
    // const [{ page, size, groupBy }] = queryKey;
     try{
        const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/points`
        );
        return response.data;
     }
     catch(err){
      throw err
   }
  };