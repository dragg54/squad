import { Router } from "express";
import { createDonation, createDonationPayment, getDonationPayments, getDonations } from "../controllers/DonationController.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { validateRequest } from "../middlewares/validatorMiddleWare.js";
import { createDonationSchema, postDonationPaymentSchema } from "../schemas/donationSchema.js";

export const route = Router()

route.post("/", authMiddleware, validateRequest(createDonationSchema), createDonation)
route.get("/", authMiddleware, getDonations)
route.get("/:id/payments", authMiddleware, getDonationPayments)
route.post("/:id/payment", authMiddleware, validateRequest(postDonationPaymentSchema), createDonationPayment)