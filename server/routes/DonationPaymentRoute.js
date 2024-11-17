import { Router } from "express";
import { getDonationPaymentPerDonation } from "../controllers/DonationController.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

const route = Router()

route.get("/", authMiddleware, getDonationPaymentPerDonation)

export default route
