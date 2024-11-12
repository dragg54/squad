import * as PaymentService from '../services/PaymentService.js'


export const verifyPayment = async(req, res) =>{
    try{
        const response = await PaymentService.verifyPayment(req)
        res.json({data: response.data})
    }
    catch(err){
        res.status(500).json(err.message)
    }
}