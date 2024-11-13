import * as DonationService from "../services/DonationService.js"

export const createDonation = async(req, res) =>{
    try{
        const response = await DonationService.createDonation(req)
        res.json(response.data)
    }
    catch (error) {
        res.status(error.statusCode || 500).send({
          message: error.message
        })
      }
}

