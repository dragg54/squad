import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { verifyPayment } from "../controllers/PaymentController.js";

const route = Router()

route.get("/verify/:id", authMiddleware, verifyPayment)

export default route