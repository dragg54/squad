import axios from 'axios'
import dotenv from 'dotenv'
import crypto from 'crypto'
import { getUserById } from './UserService.js'
import { BadRequestError } from '../errors/BadRequestError.js'

dotenv.config()

export const intializePayment = async(req) =>{
    const { amount, userId, metadata } = req
    const user = await getUserById(userId)
    if (!user) {
        throw new BadRequestError("User des not exist")
    }
    const { email, squadId } = user
   try{
    const response = await axios.post(
        `${process.env.PAYSTACK_BASE_URI}/transaction/initialize`,
        {
          email,
          amount: amount * 100,
          metadata
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        })
        return response
   }
   catch(err){
    throw err
   }
}

export const verifyPayment = async(req) =>{
    const {id} = req.params
    try{
     const response = await axios.get(
         `${process.env.PAYSTACK_BASE_URI}/transaction/verify/${id}`,
         {
           headers: {
             Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
           },
         })
         return response
    }
    catch(err){
     throw err
    }
 }


export const getPaymentStatus = (req, res)=> {
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
    const event = req.body;
    console.log(event)
    return event
    }
};
