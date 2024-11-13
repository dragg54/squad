import { Router } from "express";
import { createDonation } from "../controllers/DonationController.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

export const route = Router()

route.post("/", authMiddleware, createDonation)