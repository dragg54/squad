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


export const updateDonationPaymentStatus = async (req, res) => {
  try {
    const response = DonationService.updateDonationPaymentStatus(req)
    res.json({ data: response.data })
  }
  catch (err) {
    res.status(500).json(err.message)
  }
}
