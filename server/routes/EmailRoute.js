import { Router } from "express";
import { getDonationPaymentPerDonation } from "../controllers/DonationController.js";
import { verifyEmail } from "../controllers/UserController.js";
import { resendVerificationMail } from "../services/UserService.js";

const route = Router()

route.post("/", verifyEmail)
route.post('/resend', resendVerificationMail)

export default route
