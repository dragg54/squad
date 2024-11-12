import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const intializePayment = async(req) =>{
    const { email, amount } = req
   try{
    const response = await axios.post(
        `${process.env.PAYSTACK_BASE_URI}/transaction/initialize`,
        {
          email,
          amount: amount * 100,
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