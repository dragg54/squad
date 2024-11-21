import db from "../configs/db.js"
import { transactionType } from "../constants/TransactionType.js"
import { BadRequestError } from "../errors/BadRequestError.js"
import { InternalServerError } from "../errors/InternalServerError.js"
import Donation from "../models/Donation.js"
import DonationPayment from "../models/DonationPayment.js"
import User from "../models/User.js"
import { getPaymentStatus, intializePayment, verifyPayment } from "./PaymentService.js"
import { getUserById } from "./UserService.js"

export const createDonation = async (req) => {
    const { reason, targetAmount, targetDate, status } = req.body
    const { id } = req.user
    const user = await getUserById(id)
    if (!user) {
        throw new BadRequestError("user does not exist")
    }
    if (new Date() < targetDate) {
        throw BadRequestError("Target date cannot be earlier than today's date")
    }
    await Donation.create({ reason, targetAmount, targetDate, status, squadId: user.squadId })
}

export const initializeDonationPayment = async (req) => {
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
            transactionType: transactionType.donation
        }
    }
    const initializePaymentResponse = await intializePayment(intializePaymentRequest)
    if (initializePaymentResponse.status) {
        await createDonationPayment({
            userId: req.user.id,
            donationId: req.params.id,
            squadId: squadId,
            paymentId: initializePaymentResponse?.data?.data?.reference,
            amount
        })
    }
    return initializePaymentResponse.data;
}

export const createDonationPayment = async (req) => {
    await DonationPayment.create(req)
}

export const updateDonationPaymentStatus = async (req) => {
    try {
        const { status, reference } = req

        await DonationPayment.update({
            status, reference
        }, { where: { paymentId: reference } })

    }
    catch (err) {
        console.log(err)
    }
}

export const updateDonationStatus = async (req) => {
    const { id } = req.params
    const { status } = req.body.status

    await Donation.update({ status }, { where: { id } })
}

// export const getDonations = async(req) =>{
//     return await Donation.findAll({where:{squadId: req.user.squadId}})
// }

export const getDonationPaymentAmountByDonation = async (req) => {
    return await DonationPayment.findOne({
        attributes: [
            [db.fn('SUM', db.col('amount')), 'totalAmount'],
            [db.fn('COUNT', db.col('id')), 'totalPayment']
        ], where: { donationId: req.donationId }
    })
}

export const getDonations = async (req) => {
    const { id } = req.user
    const user = await User.findByPk(id)
    const donations = await Donation.findAll({ squadId: req.user.squadId })
    const donationData = Promise.all(donations.map(async (donation) => {
        const donationPayment = await getDonationPaymentAmountByDonation({ donationId: donation.id })
        return (
            {
                ...donation.toJSON(), totalAmount: (donationPayment.toJSON()).totalAmount || 0, totalPayment: (donationPayment.toJSON()).totalPayment || 0
            }
        )
    }))

    return donationData
}

export const getDonationPayments = async (req) => {
    const { id } = req.user
    const user = await User.findByPk(id)
    // const donation = await Donation.findOne({where:{squadId: req.user.squadId, id: req.params.id}})
    const donationPayments = await DonationPayment.findAll({
        where: {
            donationId: req.params.id,
        },
        include: {
            model: Donation,
            attributes: ['targetAmount', 'targetDate']
        },
        include: {
            model: User,
            attributes: ['firstName', 'lastName', 'userName', 'profileAvatar']
        },
        order:[['amount', 'DESC']]
    })
    return donationPayments
}

export const getTotalPaymentAmountPerDonation = async (req) => {
    const { status } = req.query
    const queryOpt = {}
    if (status) {
        queryOpt["status"] = status
    }
    const result = DonationPayment.findAll({
        attributes: [
            [db.fn('SUM', db.col('amount')), 'totalAmount']
        ],
        include: [
            {
                model: Donation,
                attributes: ['id', 'reason', 'targetAmount, targetDate', 'status']
            }
        ],
        group: ['donation.id'],
        where: queryOpt
    }
    )
    return result
}