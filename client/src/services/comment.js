/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { BACKEND_SERVER_URL, BACKEND_SERVER_VERSION } from '../Appconfig';
import AuthConnect from './index.js';

const axiosInstance = AuthConnect
export const getComments = async ({ queryKey }) => {
  const [_key, { page, size, groupBy, postId }] = queryKey;
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Comments`,
      {
        params: { page, size, groupBy, postId },
      }
    );
    return response.data;
  }
  catch (err) {
    console.log(err.message)
    throw err
  }
};

export const getComment = async (id) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Comments/${id}`
    );
    return response.data;
  }
  catch (err) {
    throw err
  }
};


export const createComment = async (formData) => {
  try {
    const response = await axiosInstance.post(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Comments`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const updateComment = async (formData) => {
  try {
    const response = await axiosInstance.put(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Comments/${formData.id}`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const likeComment = async(formData)=>{
  try {
    const response = await axiosInstance.Comment(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Comments/${formData.commentId}/likes`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const unlikeComment = async(formData)=>{
  try {
    const response = await axiosInstance.delete(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Comments/${formData.commentId}/likes`, formData)
    return response
  }
  catch (error) {
    throw error
  }
}

export const getCommentLikes = async (formData) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_SERVER_URL}/${BACKEND_SERVER_VERSION}/Comments/${formData.commentId}/likes`
    );
    return response.data;
  }
  catch (err) {
    throw err
  }
};
