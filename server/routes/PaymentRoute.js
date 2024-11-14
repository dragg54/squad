import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { initializePayment } from "../controllers/PaymentController.js";
import { getPaymentStatus } from "../services/PaymentService.js";
import { updateDonationPaymentStatus } from "../controllers/DonationController.js";

const route = Router()

route.post("/initialize", authMiddleware, initializePayment)
route.post("/webhook", getPaymentStatus)

export default route