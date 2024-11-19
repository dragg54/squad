/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { BACKEND_SERVER_URL, BACKEND_SERVER_VERSION } from '../Appconfig';
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const getDonations = async () => {
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Donations`
    );
    return response.data;
  }
  catch (err) {
    console.log(err.message)
    throw err
  }
};

export const getDonationPayments = async (id) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Donations/${id}/payments`
    );
    return response.data;
  }
  catch (err) {
    throw err
  }
};


export const createDonation = async (formData) => {
  try {
    const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Donations`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const updateDonation = async (formData) => {
  try {
    const response = await axiosInstance.put(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Donations/${formData.id}`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}
export const getDonationLikes = async (formData) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Donations/${formData.DonationId}/likes`
    );
    return response.data;
  }
  catch (err) {
    throw err
  }
};

export const donate = async(formData) =>{
  try {
    const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Donations/${formData.donationId}/payment`, formData
    );
    return response.data;
  }
  catch (err) {
    throw err
  }
}
