/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { BACKEND_SERVER_URL, BACKEND_SERVER_VERSION } from "../Appconfig"
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const createUser = async (formData) => {
  try {
    const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/users`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}
//   ?inviteToken=d31ec0d7602fe4ffde59fdabc87be07b36ecc44c801d4b0fbc3242f8ccff114a&squad=1&inviteBy=1
export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/users/login`, formData)
    return response.data
  }
  catch (error) {
    throw error
  }
}

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/users/logout`)
    return response
  }
  catch (error) {
    throw error
  }
}

export const verifyEmail = async (formData) => {
  try {
    const response = await axiosInstance.put(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/emailVerifications?token=${formData.token}`, formData)
    return response.data
  }
  catch (error) {
    throw error
  }
}

export const sendVerificationMail = async (formData) => {
  try {
    const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/emailVerifications/resend`, formData)
    return response.data
  }
  catch (error) {
    throw error
  }
}

export const getAllUsers = async ({ queryKey } = null) => {
  const [_key, { limit, order }] = queryKey
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/users`, {
      params: {
        limit,
        order
      }
    })
    return response.data
  }
  catch (error) {
    throw error
  }
}

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/users/${id}`)
    return response.data
  }
  catch (error) {
    throw error
  }
}

export const updateUser = async(formData) =>{
  try {
    const response = await axiosInstance.put(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/users/${formData.id}`, formData)
    return response.data
  }
  catch (error) {
    throw error
  }
}
