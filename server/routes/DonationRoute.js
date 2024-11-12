import { Router } from "express";
import { addDonation } from "../controllers/DonationController.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

export const route = Router()

route.post("/", authMiddleware, addDonation)