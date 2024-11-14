import { BadRequestError } from "../errors/BadRequestError.js"
import { InternalServerError } from "../errors/InternalServerError.js"
import Donation from "../models/Donation.js"
import DonationPayment from "../models/DonationPayment.js"
import User from "../models/User.js"
import { getPaymentStatus, intializePayment, verifyPayment } from "./PaymentService.js"
import { getUserById } from "./UserService.js"

export const createDonation = async (req) => {
    const { reason, target } = req.body
    const { id } = req.user
    const user = await getUserById(id)
    if (!user) {
        throw new BadRequestError("user does not exist")
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
        userId: req.user.id,
        amount: req.body.amount,
        metadata: {
            transactionType: "donation"
        }
    }
    const initializePaymentResponse = await intializePayment(intializePaymentRequest)
    if(initializePaymentResponse.status){
        await createDonationPayment({
            userId: req.user.id,
            donationId: req.params.id,
            squadId: squadId,
            paymentId: initializePaymentResponse?.data?.data?.reference,
            amount
        })
    }
    const responseData = {
        userId: req.user.id,
        donationId: req.params.id,
        status: 'PENDING'
    }
    return initializePaymentResponse.data;
}

export const createDonationPayment = async (req) => {
    await DonationPayment.create(req)
}

export const updateDonationPaymentStatus = async(req) =>{
    const donationPaymentStatusData = await getPaymentStatus(req)
    console.log(donationPaymentStatusData)
    if(donationPaymentStatusData.event == "charge.success"){
        const { id, status, amount, reference } = donationPaymentStatus.data
        const donationPaymentStatus = {
            id,
            status,
            amount,
            reference
        }
        console.log(donationPaymentStatus)
    }
}

export const getDonationPayments = async(req) =>{
    const {squadId} = req.params
    const verifyPayments = await verifyPayment(req)
}