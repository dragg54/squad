import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleWare"
import { verifyPayment } from "../controllers/TransactionController"

const route = Router()

route.get("/:id/verify", authMiddleware, verifyPayment)

export default route