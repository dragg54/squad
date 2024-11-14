import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleWare.js"
import { updateDonationPaymentStatus } from "../controllers/DonationController.js"

const route = Router()

route.get("/updateDonationPaymentStatus", authMiddleware, updateDonationPaymentStatus)

export default route