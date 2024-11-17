import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { initializePayment, getPaymentStatus } from "../controllers/PaymentController.js";

const route = Router()

route.post("/initialize", authMiddleware, initializePayment)
route.post("/webhook", getPaymentStatus)

export default route