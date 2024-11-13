import { BadRequestError } from "../errors/BadRequestError.js"
import { InternalServerError } from "../errors/InternalServerError.js"
import Donation from "../models/Donation.js"
import DonationPayment from "../models/DonationPayment.js"
import User from "../models/User.js"
import { intializePayment, verifyPayment } from "./PaymentService.js"
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

export const initializeDonationPayment = async(req) =>{
    const { amount } = req.body
    const user = await getUserById(req.user.id)
    if (!user) {
        throw new BadRequestError("User des not exist")
    }
    const { email, squadId } = user
    const intializePaymentRequest = {
        email: user.email,
        amount: req.body.amount
    }
    const initializePaymentResponse = await intializePayment(intializePaymentRequest)
}

export const createDonationPayment = async (req) => {
    const { amount } = req.body
    const user = await getUserById(req.user.id)
    if (!user) {
        throw new BadRequestError("User des not exist")
    }
    const { email, squadId } = user
    const intializePaymentRequest = {
        email: user.email,
        amount: req.body.amount
    }
    const paymentEvents = await intializePayment(intializePaymentRequest)
    return intializePaymentResponse.data
}

export const getDonationPayments = async(req) =>{
    const {squadId} = req.params
    const verifyPayments = await verifyPayment(req)
}