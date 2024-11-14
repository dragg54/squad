import { Router } from "express";
import { createDonation, createDonationPayment } from "../controllers/DonationController.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

export const route = Router()

route.post("/", authMiddleware, createDonation)
route.post("/:id/payment", authMiddleware, createDonationPayment)