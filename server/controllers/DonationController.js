import * as DonationService from "../services/DonationService.js"

export const createDonation = async (req, res) => {
  try {
    const response = await DonationService.createDonation(req)
    res.json("Donation created")
  }
  catch (error) {
    res.status(error.statusCode || 500).send({
      message: error.message
    })
  }
}

export const createDonationPayment = async (req, res) => {
  try {
    const response = await DonationService.initializeDonationPayment(req)
    res.json(response)
  }
  catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).send({
      message: error.message
    })
  }
}

export const getDonationPaymentPerDonation = async(req, res) =>{
  try {
    const response = await DonationService.getTotalPaymentAmountPerDonation(req)
    res.json(response)
  }
  catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).send({
      message: error.message
    })
  }
}

export const getDonations = async(req, res) =>{
  try {
    const response = await DonationService.getDonations(req)
    res.json(response)
  }
  catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).send({
      message: error.message
    })
  }
}

export const getDonationPayments = async(req, res) =>{
  try {
    const response = await DonationService.getDonationPayments(req)
    res.json(response)
  }
  catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).send({
      message: error.message
    })
  }
}