import { Router } from "express";
import { getDonationPaymentPerDonation } from "../controllers/DonationController.js";
import { resendVerificationMail, verifyEmail } from "../controllers/UserController.js";

const route = Router()

route.put("/", verifyEmail)
route.post('/resend', resendVerificationMail)

export default route
