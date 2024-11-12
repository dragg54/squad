import { BadRequestError } from "../errors/BadRequestError.js"
import { InternalServerError } from "../errors/InternalServerError.js"
import User from "../models/User.js"
import { intializePayment } from "./PaymentService.js"
import { getUserById } from "./UserService.js"

export const createDonation = async (req) => {
    const { reason, target } = req.body
    const { id } = req.user.id
    const user = await getUserById(id)
    if (!user) {
        throw BadRequestError("user does not exist")
    }
    await Donation.create({ reason, target, squadId: user.squadId })
}

export const addDonation = async (req) => {
    const { amount } = req.body
    const user = await getUserById(req.user.id)
    if (!user) {
        throw new BadRequestError("User des not exist")
    }
    const intializePaymentRequest = {
        email: user.email,
        amount: req.body.amount
    }
    const intializePaymentResponse = await intializePayment(intializePaymentRequest)
    switch(intializePaymentResponse.status){
        case 200:
            
    }
    return intializePaymentResponse

}