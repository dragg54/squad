/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { BACKEND_SERVER_URL } from '../Appconfig';
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const getPosts = async ({ queryKey }) => {
  const [_key, { page, size, groupBy }] = queryKey;
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/Posts`,
      {
        params: { page, size, groupBy },
      }
    );
    return response.data;
  }
  catch (err) {
    throw err
  }
};

export const getPost = async (id) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/Posts/${id}`
    );
    return response.data;
  }
  catch (err) {
    throw err
  }
};


export const createPost = async (formData) => {
  try {
    const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/Posts`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const updatePost = async (formData) => {
  try {
    const response = await axiosInstance.put(`${BACKEND_SERVER_URL}/Posts/${formData.id}`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const likePost = async(formData)=>{
  try {
    const response = await axiosInstance.put(`${BACKEND_SERVER_URL}/Posts/${formData.postId}/likes`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const unlikePost = async(formData)=>{
  try {
    const response = await axiosInstance.delete(`${BACKEND_SERVER_URL}/Posts/${formData.postId}/likes`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const getPostLikes = async (formData) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/Posts/${formData.postId}/likes`
    );
    return response.data;
  }
  catch (err) {
    throw err
  }
};
