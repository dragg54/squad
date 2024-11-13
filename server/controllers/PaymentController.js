import * as PaymentService from '../services/PaymentService.js'


export const getPaymentStatus = (req, res) =>{
    try{
        const response = PaymentService.getPaymentStatus(req)
        res.json({data: response.data})
    }
    catch(err){
        res.status(500).json(err.message)
    }
}

export const initializePayment = async(req, res) =>{
    try{
        const response = await PaymentService.intializePayment(req)
        res.json({data: response.data})
    }
    catch(err){
        res.status(500).json(err.message)
    }
}