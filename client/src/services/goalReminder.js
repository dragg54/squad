/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { BACKEND_SERVER_URL, BACKEND_SERVER_VERSION } from '../Appconfig';
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const getGoalReminders = async ({ queryKey }) => {
    const [_key, { isSeen }] = queryKey;
    try {
        const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/GoalReminders`,
            {
                params: {isSeen}
            }
        );
        return response.data;
    }
    catch (err) {
        throw err
    }
};

export const getGoalReminder = async (id) => {
    try {
        const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/GoalReminders/${id}`,
    
        );
        return response.data;
    }
    catch (err) {
        throw err
    }
};


export const createGoalReminder = async (formData) => {
    try {
        const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/goalReminders`, formData)
        return response
    }
    catch (error) {
        throw error
    }
}

export const updateGoalReminderStatus = async({id}) =>{
    try {
        const response = await axiosInstance.patch(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/goalReminders/${id}`,)
        return response
    }
    catch (error) {
        throw error
    }
}
